<template>
  <div>

    <div class="tracked">
      <img src="../../img/time.svg" alt="" />
      <span><span>{{ spent }}</span> tracked <span>CPD</span> time {{ from }}</span>
    </div>

    <table>
      <thead><th>Activity</th><th>Time spent</th><th></th></thead>
      <tbody>
        <tr v-for="item in tracked" :key="item.id" v-if="item.tracked">
          <td>
            <div>
              <router-link v-if="item.course" :to="`/course-details/`+item.course_id+'/'+item.course.slug">{{ getTitle(item) }}</router-link>
              <template v-else>{{ getTitle(item) }}</template>
            </div>
            <small v-if="item.description">{{ item.description }}</small>
          </td>
          <td>
            <span style="margin-right:5px">{{ item.spent }} mins</span>
            <el-popover width="100" popper-class="pp-tracker" @show="spentTime = item.spent">
              <div>Edit time spent to</div>
              <el-input-number v-model="spentTime" controls-position="right" size="mini" :min="0"></el-input-number>
              <button type="button" class="button button_brand upd-time" @click="updTime(item.created)">UPDATE</button>
              <template slot="reference">
                <img class="setting" src="../../img/settings.svg" alt="" />
              </template>
            </el-popover>

          </td>
          <td>
            <span class="remove" @click="changeTrack(item.created, !item.tracked)">Remove</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="text-r">
      <button type="button" class="button button_brand reset" @click="resetTrack">reset tracked CPD</button>
      <button type="button" class="button button_brand" @click="certificate">Archive and create certificate</button>
    </p>


    <div class="h1">Booked Courses</div>

    <table class="book">
      <thead><th>Activity</th><th>Time spent</th><th></th></thead>
      <tbody>
      <tr v-for="item in tracked" :key="item.id" v-if="item.course_id">
        <td>
          <router-link v-if="item.course" :to="`/course-details/`+item.course_id+'/'+item.course.slug">{{ getTitle(item) }}</router-link>
          <template v-else>{{ getTitle(item) }}</template>
        </td>
        <td>{{ item.spent }} mins</td>
        <td>
          <button
            type="button"
            class="button button_brand"
            @click="changeTrack(item.created, !item.tracked)"
          >{{ item.tracked ? "Tracked" : "Track" }} as CPD</button>
          <button type="button" class="button button_brand reset" @click="deleteBook(item.created)">X</button>
        </td>
      </tr>
      </tbody>
    </table>

    <p class="text-r">
      <button type="button" class="button button_brand reset" @click="resetBook">Remove All</button>
    </p>


    <div class="h1">Add your OWN CPD</div>
    <p>Undertaken in-house CPD? Read an article elsewhere and want to add it to your CPD total? Simply add it here. ALL FIELDS REQUIRED</p>

    <el-row :gutter="20" class="cpd-form">
      <el-col :md="16">
        <el-input v-model="form.title" placeholder="Title: Enter short title here" />
      </el-col>
      <el-col :md="8">
        <el-input-number v-model="form.minutes" placeholder="Add Time in minutes" controls-position="right" :min="0"></el-input-number>
      </el-col>
      <el-col :md="24">
        <el-input v-model="form.description" placeholder="Short description" type="textarea" />
      </el-col>
    </el-row>

    <p class="text-r">
      <button type="button" class="button button_brand reset" @click="addTrack">Add to CPD Tracker</button>
    </p>


  </div>
</template>

<script>
export default {
  data() {
    return {
      from: null,
      time: '',
      tracked: [],
      form: {},
      spentTime: null
    }
  },
  computed: {
    spent() {
      let hour = '', min = 0;
      if ( typeof this.tracked !== "object" ) return "";
      this.tracked.forEach(item => { min += item.tracked ? item.spent : 0 });
      if ( min > 60 ) hour = parseInt(min / 60) + " hours ";
      min = min % 60;
      if ( min > 0 ) min += " mins ";
      return hour + min;
    }
  },
  methods: {
    getTitle(item) {
      if ( item.title ) return item.title;
      if ( item.course ) return item.course.title;
      return '';
    },
    getData(data) {
      this.$error(data) && (this.tracked = data.array) && (this.from = data.from);
    },
    get() {
      this.tracked = [];
      this.http.get('tracker?_path=' + this.$route.path ).then( r => {
        this.getData(r.data);
      })
    },
    changeTrack(created, value) {
      this.http.put('tracker', { created, value }).then( r => {
        this.getData(r.data);
      });
    },
    resetTrack() {
      this.http.delete('tracker').then( r => {
        this.getData(r.data);
      });
    },
    deleteBook(created) {
      this.http.delete('tracker/book?created='+created).then( r => {
        this.getData(r.data);
      });
    },
    resetBook() {
      this.http.delete('tracker/booked').then( r => {
        this.getData(r.data);
      });
    },
    addTrack() {
      this.http.post('tracker', this.form).then( r => {
        this.getData(r.data);
        this.$error(r.data) && (this.form = {});
      });
    },
    updTime(created) {
      this.http.put('tracker/time', { created, minutes: this.spentTime }).then( r => {
        this.getData(r.data);
      });
    },
    certificate() {
      this.$confirm("", "Archive and create certificate?", {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then(() => {
        this.http.post('tracker/certificate').then( r => {
          this.$error(r.data) && (this.$parent.$parent.$parent.tab = 2);
        });
      }).catch(() => {});
    }
  },
  created() {
    this.get();
  }
}
</script>
