import request from '@/utils/request'
export default {
    //1 根据课程id查询章节和小节
    getAllChapterVideo(courseId) {
        return request({
            url: '/eduservice/chapter/getChapterVideo/' + courseId,
            method: 'GET'
        })
    },
    //2 根据课程id查询章节和小节
    addChapter(chapter) {
        return request({
            url: '/eduservice/chapter/addChapter',
            method: 'post',
            data: chapter
        })
    },
    getChapter(id) {
        return request({
            url: '/eduservice/chapter/getChapter/' + id,
            method: 'GET'
        })
    },
    updateChapter(chapter) {
        return request({
            url: '/eduservice/chapter/updateChapter',
            method: 'post',
            data: chapter
        })
    },
    deleteChapter(id) {
        return request({
            url: `/eduservice/chapter/${id}`,
            method: 'delete'
        })
    }
}