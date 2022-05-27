<template>
  <div>

    <el-table stripe
       :data="$parent.data.array" @sort-change="$parent.toOrder"
       :default-sort="{ prop: $parent.order_by, order: $parent.order }"
    >

      <el-table-column fixed="left" prop="id" label="#" width="60" sortable="custom" />

      <el-table-column prop="title" label="Title" sortable="custom">
        <template slot-scope="el">
          <router-link :to="`/courseproviders/courses/${el.row.id}/details`" class="el-button--text">
            {{ el.row.title }}
          </router-link>
          <div>Ref: {{ el.row.course_ref }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="alerts" label="Alerts" width="99" sortable="custom">
        <template slot-scope="el">{{ el.row.with_cbes_count }}</template>
      </el-table-column>

      <el-table-column prop="views" label="Views" width="99" sortable="custom">
        <template slot-scope="el">{{ el.row.with_views_count }}</template>
      </el-table-column>

      <el-table-column prop="leads" label="Leads" width="99" sortable="custom">
        <template slot-scope="el">{{ el.row.with_leads_count }}</template>
      </el-table-column>

      <el-table-column prop="posting_from" label="Start" width="120" sortable="custom">
        <template slot-scope="el">{{ el.row.postFrom }}</template>
      </el-table-column>

      <el-table-column prop="posting_to" label="End" width="120" sortable="custom">
        <template slot-scope="el">{{ el.row.postTo }}</template>
      </el-table-column>

      <el-table-column label="Actions" width="240" class-name="actions">
        <template slot-scope="el">
          <el-button size="mini" v-if="el.row.status === 1" @click="$parent.gotoCourse(el.row.id)">Edit</el-button>
          <el-button size="mini" @click="$parent.doCopy(el.row.id)">Copy</el-button>
          <el-button v-if="el.row.product_id === 8" size="mini" @click="$parent.gotoLeads(el.row.id)">Leads</el-button>
          <el-button v-if="el.row.status === 1" size="mini" @click="$parent.setStatus(el.row.id, 4)">Expire</el-button>
          <el-button v-if="el.row.status === 2" size="mini" @click="$parent.doDelete(el.row.id)">Delete</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      @current-change="$parent.toPage"
      class="text-c margin-t"
      layout="prev, pager, next"
      :total="$parent.data.total"
      :current-page="$parent.page"
      :page-size="20" />

  </div>
</template>
