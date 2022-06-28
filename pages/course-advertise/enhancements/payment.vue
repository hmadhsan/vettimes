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

        <!-- <el-input-number v-model="count" controls-position="right" :min="1" :max="payMax" :precision="0" /> -->

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
      type: this.$parent.subscription_plan,
      count: 1,
      handler: null
    }
  },
  mounted() {       
    this.addBtn();
  },
  computed: {
    payMax() { return this.type === 5 ? 1 : undefined },    
  },
  methods: {
    addBtn() {
      console.log('inside method');
        if ( !this.handler || !this.types['t' + this.type] ) return;
        this.handler.open({
            name: 'Add more credits',
            amount: this.types['t' + this.type] * 100
        });
        this.form = false;
    },
    setStatus(value) {
      this.$axios.$put("/rest/course/status", { id: this.$parent.course_id, value: value }).then( r => {
        if(r) {
          this.$router.push('/courseproviders/courses');
          process.browser ? window.location.reload() : null ;
        }
      }).catch(e => {
          console.log(e);
      });
    }
  },
  created() {    
    let el = this;    
    this.handler = window.StripeCheckout.configure({      
      // pk_live_kSJZY8Ilm38Cq98vsKD5hCWD00zeNlkwhi
      key: 'pk_test_0PA9VM8o1d6aLbMIvtQ9vhCP00dM96abyo',
      currency: 'gbp',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        if (token.id) {
          el.$axios.$post('/rest/user/credits', { product_id: el.type, quantity: 1, token: token.id, course_id: this.$parent.course_id }).then( r => {
            if ( r ) {
              el.$parent.get(true);
              this.setStatus(1);
            } else {
              this.form = true;
            }
          })
        }
        el.$parent.addCredits = false;
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
