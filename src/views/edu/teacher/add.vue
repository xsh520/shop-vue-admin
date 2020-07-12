<template>
  <div class="app-container">
    <el-form
      :model="teacherObj"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="讲师名称" prop="name">
        <el-input type="text" v-model="teacherObj.name"></el-input>
      </el-form-item>
      <el-form-item label="讲师排序" prop="sort">
        <el-input type="number" v-model="teacherObj.sort" style="width:100px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherObj.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1"></el-option>
          <el-option label="首席讲师" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input type="text" v-model="teacherObj.career"></el-input>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input type="textarea" v-model="teacherObj.intro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from "@/api/edu/teacher";
export default {
  data() {
    var checkSort = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("不能为空"));
      }
      if (value < 0) {
        callback(new Error("不能小于0"));
      } else {
        callback();
      }
    };
    return {
      teacherObj: {
        name: "",
        sort: 0,
        level: 1,
        career: "",
        intro: ""
      },
      rules: {
        name: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        sort: [{ validator: checkSort, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.teacherObj);
          teacher.addTeacher(this.teacherObj).then(response=> {
              if (response.success) {
                 this.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                this.$router.push({ path: '/teacher/list' })
              }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>