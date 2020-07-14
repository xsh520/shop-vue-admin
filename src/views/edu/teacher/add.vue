<template>
  <div class="app-container">
    <el-form
      ref="ruleForm"
      :model="teacherObj"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="讲师名称" prop="name">
        <el-input v-model="teacherObj.name" type="text" />
      </el-form-item>
      <el-form-item label="讲师排序" prop="sort">
        <el-input v-model="teacherObj.sort" type="number" style="width:100px" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherObj.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacherObj.career" type="text" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacherObj.intro" type="textarea" />
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacherObj.avatar" />
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
        </el-button>

        <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调
        <input type="file" name="file"/>
      -->
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="300"
          :height="300"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :disabled="saveBtnDisabled" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    var checkSort = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('不能为空'))
      }
      if (value < 0) {
        callback(new Error('不能小于0'))
      } else {
        callback()
      }
    }
    return {
      teacherObj: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        sort: [{ validator: checkSort, trigger: 'blur' }]
      },
      // 上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, // 上传组件key值
      BASE_API: process.env.VUE_APP_BASE_API, // 获取dev.env.js里面地址
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  watch: { // 监听
    $route(to, from) { // 路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    close() { // 关闭上传弹框的方法
      this.imagecropperShow = false
      // 上传组件初始化
      this.imagecropperKey = this.imagecropperKey + 1
    },
    // 上传成功方法
    cropSuccess(data) {
      this.imagecropperShow = false
      // 上传之后接口返回图片地址
      this.teacherObj.avatar = data.url
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      }
    },
    // 根据讲师id查询的方法
    getInfo(id) {
      teacher.getTeacherInfo(id)
        .then(response => {
          this.teacherObj = response.data.teacher
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.teacherObj)
          this.saveOrUpdate()
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  saveOrUpdate() {
    // 判断修改还是添加
    // 根据teacher是否有id
    if (!this.teacherObj.id) {
      // 添加
      this.saveTeacher()
    } else {
      // 修改
      this.updateTeacher()
    }
  },
  updateTeacher() {
    teacher.updateTeacher(this.teacherObj).then(response => {
      if (response.success) {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({ path: '/teacher/list' })
      }
    })
  },
  saveTeacher() {
    teacher.addTeacher(this.teacherObj).then(response => {
      if (response.success) {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.$router.push({ path: '/teacher/list' })
      }
    })
  }
}
</script>
