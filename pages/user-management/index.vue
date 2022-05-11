<template>
  <div id="user-management">

    <div class="content">
      <Loader v-if="loader" />
      <template v-if="!notAuth">
        <div class="site-title-wrapper">
          <h1 class="site-title">User management</h1>
        </div>

        <div class="row">
          <el-table
            class="users-table"
            stripe
            :data="data.array">

            <el-table-column fixed="left" prop="email" label="Email address" width="240" />
            <el-table-column prop="first_name" label="First Name" />
            <el-table-column prop="last_name" label="Last Name" />
            <el-table-column prop="date_reg" label="Role" />
            <el-table-column label="Role">
              <template slot-scope="el">
                {{ roles[el.row.role] }}<span v-if="el.row.userStatus !== null"> - {{el.row.userStatus}}</span>
              </template>
            </el-table-column>

            <el-table-column label="Actions" width="120" class-name="actions">
              <template slot-scope="el">
                <button v-if="el.row.userStatus === null" class="button button_secondary button_compact" @click="doExpire(el.row.id)">Expire</button>
              </template>
            </el-table-column>

          </el-table>


          <el-pagination v-if="data.total > 20"
              @current-change="toPage"
              class="text-c margin-t"
              layout="prev, pager, next"
              :total="data.total"
              :current-page="page"
              :page-size="20" />
        </div>
      </template>
      <ProvidersOnly v-else />
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
