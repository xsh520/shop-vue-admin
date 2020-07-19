import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/addCourseInfo',
            method: 'post',
            data: courseInfo
        })
    },
    //2 查询所有讲师
    getListTeacher() {
        return request({
            url: '/eduservice/teacher/findAll',
            method: 'get'
        })
    },
    // 根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/'+id,
            method: 'get'
        })
    },
   // 修改课程信息
   updateCourseInfo(courseInfo) {
    return request({
        url: '/eduservice/course/updateCourseInfo',
        method: 'post',
        data: courseInfo
      })
    },
    getPublihCourseInfo(courseId) {
        return request({
            url:`/eduservice/course/getPublihCourseInfo/${courseId}`,
            method: 'get'
        })
    },
    publihCourse(courseId) {
        return request({
            url:`/eduservice/course/publihCourse/${courseId}`,
            method: 'get'
        })
    },
    getListCourse(current,size,query) {
        return request({
            url:`/eduservice/course/page/${current}/${size}`,
            method: 'post',
            data: query
        })
    },
    deleteByCourse(courseId) {
        return request({
            url:`/eduservice/course/${courseId}`,
            method: 'delete'
        })
    }

}
