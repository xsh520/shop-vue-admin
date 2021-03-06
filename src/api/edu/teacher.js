import request from '@/utils/request'

export default {
  // 分页条件查询讲师方法
  getPageList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      data: teacherQuery
    })
  },
  // 删除讲师
  deleteTeacher(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },
  // 添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 添加讲师
  updateTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data: teacher
    })
  },
  // 根据Id查询信息
  getTeacherInfo(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'get'
    })
  }
}
