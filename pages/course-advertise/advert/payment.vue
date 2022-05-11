<template>
  <div>

    <el-dialog
      class="add-more-credits"
      title="Add more credits"
      width="400px"
      :visible.sync="!!$parent.addCredits"
      :before-close="() => $parent.addCredits = false"
    >

      <template v-if="this.form">
        <el-select v-model="type" @change="changeType">
          <el-option label="Silver" :value="2" />
          <el-option label="Platinum" :value="4" />
          <el-option label="Featured Provider" :value="5" v-if="!$parent.disableFPC" />
          <el-option label="Featured Provider not available now" :value="5" :disabled="true" v-if="$parent.disableFPC" />
        </el-select>

        <el-input-number v-model="count" controls-position="right" :min="1" :max="payMax" :precision="0" />

        <div class="message-wrapper" v-if="showMess">
          <div class="message message_warning icon-before" data-icon="!" role="alert">
            Featured provider expires in one month
          </div>
        </div>

        <button type="button" class="button button_brand button_larger" @click="addBtn">Send</button>
      </template>

      <template v-else>
        Waiting...
      </template>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      form: true,
      types: this.$parent.prices,
      type: null,
      count: 1,
      handler: null,
      showMess: false
    }
  },
  computed: {
    payMax() { return this.type === 5 ? 1 : undefined }
  },
  methods: {
    addBtn() {
      let count = parseInt(this.count);
      if ( !this.handler || !this.types['t'+this.type] || isNaN(count) || count < 1 ) return;
      this.handler.open({
        name: 'Add more credits',
        amount: this.types['t'+this.type] * count * 100
      });
      this.form = false;
    },
    changeType() {
      this.showMess = this.type === 5;
      if ( this.type === 5 ) this.count = 1;
    }
  },
  created() {
    let el = this;

    this.handler = window.StripeCheckout.configure({
      key: 'pk_live_kSJZY8Ilm38Cq98vsKD5hCWD00zeNlkwhi',
      currency: 'gbp',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        if (token.id) {
          el.http.post('user/credits', { product_id: el.type, quantity: el.type, token: token.id }).then( r => {
            if ( el.$error(r.data) ) {
              el.$parent.get(true);
              el.$parent.addCredits = false
            } else {
              this.form = true;
            }
          })
        }
      }
    });
  },
  beforeDestroy() {
    this.handler.close();
  }
}
</script>
<style lang="scss">
.add-more-credits {
  .el-select, .el-input-number {
    margin-bottom: 20px;
    width: 100%;
  }
}
</style>
