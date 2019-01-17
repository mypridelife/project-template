import request from '@/utils/request'

//任务列表
export function taskList(pageNum,pageSize) {
    return request({
        url: '/task/taskList',
        method: 'post',
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
//编辑任务
export function updateTask(task) {
    return request({
        url: '/task/update',
        method: 'post',
        data: task
    })
}
//录入任务
export function addTask(task) {
    return request({
        url: '/task/task',
        method: 'post',
        data: task
    })
}
//任务模糊搜索
export function selectByTaskName(pageNum,pageSize,taskName) {
    return request({
        url: '/task/selectByName',
        method: 'post',
        params: {
            pageNum,pageSize,taskName
        }
    })
}
//发布(撤回)任务
export function releaseTask(taskId,taskType) {
    return request({
        url: '/task/updateType',
        method: 'post',
        params: {
            taskId,taskType
        }
    })
}
//编辑试卷
export function setPaper(taskId) {
    return request({
        url: '/paper/setPaper',
        method: 'post',
        params: {
            taskId
        }
    })
}
//删除任务
export function deleteTask(taskId) {
    return request({
        url: '/task/delete',
        method: 'post',
        params: {
            taskId
        }
    })
}
//任务新增重名判断
export function getByName(taskName) {
    return request({
        url: '/task/getByName',
        method: 'post',
        params: {
            taskName
        }
    })
}
//任务新增重名判断
export function getByIdAndName(taskId,taskName) {
    return request({
        url: '/task/getByIdAndName',
        method: 'post',
        params: {
            taskId,
            taskName
        }
    })
}

