<template>
  <div id="cpd-tracker" class="">

    <div class="row">

      <el-row :gutter="20">
        <el-col :span="17" :xs="24">

          <div class="h1">CPD Tracker</div>
          <p>This section of the site is provided to help record your online reading and other CPD activities at Vet Times, and elsewhere. Hours logged here can be counted toward your mandatory CPD requirements – as set out by the RCVS – and gathered together in a single, convenient certificate.</p>
          <p>Activities must be archived to count towards your total.</p>

          <button type="button" class="button button_brand" @click="tab = 1">This period</button>
          <button type="button" class="button button_brand" @click="tab = 2">Archive</button>

          <template v-if="!$auth()">
            <div class="no-auth">You must be logged in to view this page.</div>
          </template>

          <div v-else style="margin-top:20px">

            <TabTracker v-if="tab === 1" />
            <TabArchive v-if="tab === 2" />

          </div>

        </el-col>

        <el-col :span="7" :xs="24">

        </el-col>
      </el-row>

    </div>



  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
