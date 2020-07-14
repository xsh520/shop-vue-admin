/* eslint-disable vue/attributes-order */
/* eslint-disable vue/attributes-order */
<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="seachObject.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="seachObject.level" placeholder="讲师头衔">
          <el-option label="高级讲师" :value="1" />
          <el-option label="首席讲师" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-col :span="11">
          <el-date-picker
            v-model="seachObject.begin"
            type="date"
            placeholder="选择开始日期"
            format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-col>
        <el-col class="line" :span="2" style="text-align: center">-</el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="seachObject.end"
            placeholder="选择结束时间"
            format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList(1)">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="level" label="头衔" width="120">
        <template slot-scope="scope">{{ scope.row.level ===1 ? '高级教师' : '首席教师'}}</template>
      </el-table-column>
      <el-table-column prop="career" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button size="mini">修改</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="deleteTeacher(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      layout="total, prev, pager, next, jumper"
      :total="total"
      @current-change="getList"
    />
  </div>
</template>
<script>
import teacher from '@/api/edu/teacher'
export default {
  data() {
    return {
      list: null,
      current: 1,
      limit: 3,
      total: 0,
      seachObject: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(current = 1) {
      this.current = current
      teacher
        .getPageList(this.current, this.limit, this.seachObject)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
        })
    },

    resetData() {
      this.seachObject = {}
      this.getList()
    },

    deleteTeacher(id) {
      this.$confirm(
        '此操作将会把该讲师放入回收站(30天后会被删除), 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        teacher.deleteTeacher(id).then(response => {
          if (response.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message.error('删除失败，请刷新后重试')
          }
        })
      })
    }
  }
}
</script>
