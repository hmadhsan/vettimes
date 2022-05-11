<template>
  <div>


    <h2>Additional dates</h2>

    <button
      class="button button_brand"
      @click="dialog = {}, dataUpdateError=false, dataUpdateSuccess = false"
    >Add additional date</button>

    <el-table :data="array" class="m-top" stripe>

      <el-table-column label="Location \ Delivery">
        <template slot-scope="el">
          <el-button type="text" @click="dialog = el.row">
            {{ el.row.method }}
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="Booking URL">
        <template slot-scope="el" v-if="el.row.booking_url">
          <a :href="el.row.booking_url" target="_blank">{{ el.row.booking_url }}</a>
        </template>
      </el-table-column>

      <el-table-column label="Start Date" >
        <template slot-scope="el">
          {{ el.row.startDate ? el.row.startDate : '-' }}
        </template>
      </el-table-column>

      <el-table-column label="Actions">
        <template slot-scope="el">
          <button class="button button_secondary button_compact" @click="remove(el.row)">Delete</button>
        </template>
      </el-table-column>

    </el-table>


    <div class="cm-btn-container cf" >
      <el-row :gutter="30">
        <el-col :md="8">&nbsp;</el-col>
        <el-col :md="8">&nbsp;</el-col>
        <el-col :md="8">
          <button type="button" class="button button_brand button_larger" @click="next">Next</button>
        </el-col>
      </el-row>
    </div>

    <Popup v-if="dialog" />

  </div>
</template>

<script src="./script.js"></script>
