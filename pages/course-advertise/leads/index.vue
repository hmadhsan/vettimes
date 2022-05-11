<template>
  <div id="leads">

    <h2><strong>Leads found: {{ data.total }}</strong></h2>

    <el-button type="default" class="button button_secondary" size="mini" @click="doExport('course-leads')">Export result</el-button>

    <el-form label-position="top" :model="filter" @submit.native.prevent="submit">
      <el-row :gutter="20" class="filter shadow">

        <el-col :span="6" :xs="24">
          <el-form-item label="Type">
            <el-select v-model="filter.lead">
              <el-option label="All" value="-1" />
              <el-option label="Book" value="1" />
              <el-option label="Email" value="2" />
              <el-option label="Phone" value="3" />
              <el-option label="Web" value="4" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" :xs="12">
          <el-form-item label="Leads from">
            <div class="position-relative">
              <el-date-picker
                  v-model="filter.from"
                  format="dd/MM/yyyy"
                  value-format="dd/MM/yyyy"
                  :editable="false"/>
              <i data-icon="" class="date-picker__icon icon-before"></i>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="6" :xs="12">
          <el-form-item label="Leads to">
            <div class="position-relative">
              <el-date-picker
                  v-model="filter.to"
                  format="dd/MM/yyyy"
                  value-format="dd/MM/yyyy"
                  :editable="false"/>
              <i data-icon="" class="date-picker__icon icon-before"></i>
            </div>
          </el-form-item>
        </el-col>

        <el-col :span="6" :xs="24">
          <el-form-item>
            <span slot="label">&nbsp;</span>
            <el-button native-type="submit" class="button button_block button_compact button_tertiary">Filter</el-button>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>



    <el-table stripe :data="data.array">

      <el-table-column label="Type">
        <template slot-scope="el">
          {{ $leads[el.row.type] }}
        </template>
      </el-table-column>

      <el-table-column label="Name">
        <template slot-scope="el">
          <template v-if="!el.row.with_user">–</template>
          <template v-else class="el-button--text">
            {{ el.row.with_user.first_name + ' ' + el.row.with_user.last_name }}
          </template>
        </template>
      </el-table-column>

      <el-table-column label="User">
        <template slot-scope="el">
          <!-- <template v-if="!el.row.with_user">–</template>
          <template v-else class="el-button--text">
            {{ el.row.with_user.email }}
          </template> -->
          <template class="el-button--text">
            {{ (el.row.with_user) ? el.row.with_user.email : (el.row.email) ? el.row.email : '-' }}
          </template>
        </template>
      </el-table-column>      

      <el-table-column prop="created" label="When" />

    </el-table>


    <el-pagination v-if="data.total > 20"
        @current-change="toPage"
        class="text-c margin-t"
        layout="prev, pager, next"
        :total="data.total"
        :current-page="search.page"
        :page-size="20" />

  </div>
</template>

<script src="./script.js"></script>