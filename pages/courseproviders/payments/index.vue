<template>
  <div id="company-management">
    <div class="content">

        <div class="site-title-wrapper">
          <h1 class="site-title">Provider payments</h1>
        </div>

      <div class="row">
        <el-table :data="table">
          <el-table-column label="Product">
            <template slot-scope="el">
              {{ (el.row.product || {}).title }}
            </template>
          </el-table-column>
          <el-table-column label="Total">
            <template slot-scope="el">
              ${{ el.row.total }}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="Date" />
        </el-table>
      </div>

    </div>
  </div>
</template>

<script src="./script.js"></script>
