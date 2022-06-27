<template>
  <div>

    <h2>Categorisation</h2>

    <p>Assigning your course to the correct categories will help ensure it's displayed to the most relevant audience.
    </p>

    <el-form v-model="form" :model="form" :rules="rules" ref="form" class="form-validate form-responsive">
      <br>

      <el-form-item label="Speciality" prop="speciality">
        <el-select v-model="form.speciality" multiple filterable placeholder="Select">
          <el-option v-for="item in vars.speciality" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Location" prop="location">
        <el-select v-model="form.location" filterable clearable placeholder="Select">
          <el-option v-for="item in vars.location" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Course type" prop="course_type">
        <el-select v-model="form.course_type" filterable placeholder="Select">
          <el-option v-for="item in vars.course_type" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Job Role/Target Audience" prop="audience">
        <el-select v-model="form.audience" multiple filterable placeholder="Select">
          <el-option v-for="item in vars.audience" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Skill Level" prop="skill_level">
        <el-select v-model="form.skill_level" multiple filterable placeholder="Select">
          <el-option v-for="item in vars.skill_level" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="Price" prop="price">
        <el-select v-model="form.price" filterable placeholder="Select">
          <el-option v-for="item in vars.price" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="CPD Hours" prop="cpd_hours">
        <el-select v-model="form.cpd_hours" filterable placeholder="Select">
          <el-option v-for="item in vars.cpd_hours" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <div class="cf cm-btn-container">
        <el-row :gutter="30">
          <el-col :md="8">&nbsp;</el-col>
          <el-col :md="8">
            <el-button class="button button_brand button_larger" @click="submitForm('form')">Save</el-button>
          </el-col>
          <el-col :md="8">
            <button type="button" class="button button_brand button_larger"
              @click="submitForm('form', true)">Next</button>
          </el-col>
        </el-row>

      </div>


    </el-form>

  </div>
</template>

<script src="./script.js"></script>
