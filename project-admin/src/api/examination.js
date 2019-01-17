import request from '@/utils/request'

//任务列表
export function getList(pageNum,pageSize) {
    return request({
        url: '/paper/geUserTaskVOs',
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    })
}
//获取任务
export function getTask(taskId) {
    return request({
        url: '/task/get',
        method: 'get',
        params: {
            taskId
        }
    })
}


