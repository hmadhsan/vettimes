<template>
  <div>

    <h2>Attachments</h2>

    <button class="button button_brand" @click="add">Add attachment</button>

    <el-table :data="array" class="m-top">

      <el-table-column prop="media.name" label="File name" />

      <el-table-column prop="media.description" label="Description"/>

      <el-table-column label="Actions" width="160">
        <template slot-scope="el">
          <a :href="el.row.media.url" target="_blank">
            <button class="button button_secondary button_compact button_in-link">View</button>
          </a> &nbsp;
          <button class="button button_secondary button_compact" @click="remove(el.row.id, el.row.media_id)">Delete</button>
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

    <Media />

  </div>
</template>

<script src="./script.js"></script>
