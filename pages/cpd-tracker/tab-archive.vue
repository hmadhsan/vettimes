<template>
  <div>

    <div class="tracked">
      <img src="../../img/time.svg" alt="" />
      <span><span>{{ spent }}</span> tracked <span>CPD</span> time</span>
    </div>


    <table class="cert">
      <thead><th>Date</th><th>Time spent</th><th></th></thead>
      <tbody>
      <tr v-for="item in tracked" :key="item.created">
        <td>{{ item.title }}</td>
        <td>
          <span style="margin-right:5px">{{ item.spent }}</span>
        </td>
        <td>
          <span class="remove" @click="remove(item.created)">Remove</span>
          <a
            :href="`${$store.state.base}certificates/${item.user_id}/vet-certificate-${item.user_id}-${item.created}.pdf`"
            target="_blank"
            class="button button_brand"
          >PDF certificate</a>
        </td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
export default {
  data() {
    return {
      tracked: []
    }
  },
  computed: {
    spent() {
      let hour = '', min = 0;
      if (typeof this.tracked !== "object") return "";
      this.tracked.forEach(item => { min += item.time });
      if (min > 60) hour = parseInt(min / 60) + " hours ";
      min = min % 60;
      if (min > 0) min += " mins ";
      return hour + min;
    }
  },
  methods: {
    get() {
      this.tracked = [];
      this.http.get('tracker/certificates').then( r => {
        this.$error(r.data) && (this.tracked = r.data.array);
      })
    },
    remove(created) {
      this.$confirm("", "Are you sure?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.http.delete('tracker/certificate?created='+created).then( r => {
          this.$error(r.data) && this.get();
        })
      }).catch(() => {});
    }
  },
  created() {
    this.get();
  }
}
</script>
