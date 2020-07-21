import request from '@/utils/request'
export default {
    //1 根据课程id查询章节和小节
    addVideo(video) {
        return request({
            url: '/eduservice/video/addVideo',
            method: 'post',
            data: video
        })
    },
    deleteVideo(id) {
        return request({
            url: `/eduservice/video/${id}`,
            method: 'delete'
        })
    },
    deleteAliyunvod(id) {
        return request({
            url: `/eduvod/video/removeAlyVideo/${id}`,
            method: 'delete'
        })
    }
}