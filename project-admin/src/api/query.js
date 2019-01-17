import request from '@/utils/request'
export function queryQuestion(questionType, pageNum, pageSize) {
    return request({
        url: '/question/questionList',
        // url: "http://192.168.0.187:8080/questions/type/list",
        method: 'post',
        params: {
            questionType,
            pageNum,
            pageSize
        }
    })
}

export function queryPaper(pageSize, pageNum, job) {
    return request({
        url: '/test/paper/list',
        // url: "http://192.168.0.193:8080/test/paper/list",
        method: 'get',
        params: {
            pageSize,
            pageNum,
            job
        }
    })
}

export function queryPaperDetail(id) {
    return request({
        url: '/test/paper/detail',
        // url: "http://192.168.0.193:8080/test/paper/detail",
        method: 'get',
        params: {
            id
        }
    })
}

export function deleteQuestion(id) {
    return request({
        url: '/questions/delete',
        // url: "http://192.168.0.187:8080/questions/delete",
        method: 'post',
        params: {
            id
        }
    })
}

export function queryEvery(id) {
    return request({
        url: '/questions/search',
        // url: "http://192.168.0.187:8080/questions/search",
        method: 'get',
        params: {
            id
        }
    })
}

export function queryRecord(pageNum, pageSize) {
    return request({
        url: '/paper/record/list',
        // url: "http://192.168.0.187:8080/paper/record/list",
        method: 'get',
        params: {
            pageNum,
            pageSize
        }
    })
}

export function queryRecordStart(pageNum, pageSize, sort, orderBy) {
    return request({
        url: '/paper/record/list',
        // url: "http://192.168.0.187:8080/paper/record/list",
        method: 'get',
        params: {
            pageNum,
            pageSize,
            sort,
            orderBy
        }
    })
}

export function queryRecord1(pageNum, pageSize, parameter) {
    return request({
        url: '/paper/record/list',
        // url: "http://192.168.0.187:8080/paper/record/list",
        method: 'get',
        params: {
            pageNum,
            pageSize,
            parameter
        }
    })
}

export function exportR(ids) {
    return request({
        url: '/test/export/record',
        // url: "http://192.168.0.193:8080/test/export/record",
        method: 'post',
        data: ids
    })
}

export function queryCountQuestion() {
    return request({
        url: '/paper/all/count',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/paper/all/count",
        method: 'get'
    })
}


export function queryEveryQuestion() {
    return request({
        url: '/questions/count',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/paper/all/count",
        method: 'get'
    })
}

export function queryjobList(pageNum, pageSize, jobParams) {
    return request({
        url: '/job/list',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/job/list",
        method: 'get',
        params: {
            pageNum,
            pageSize,
            jobParams
        }
    })
}


export function jobDelete(id) {
    return request({
        url: '/job/delete',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/job/delete",
        method: 'post',
        params: {
            id
        }
    })
}


export function jobCreate(job) {
    return request({
        url: '/job/create',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/job/create",
        method: 'post',
        params: {
            job
        }
    })
}

export function queryJobQuestion(pageNum, pageSize) {
    return request({
        url: '/paper/count',
        // url: "http://192.168.0.193:8080/test/export/record",
        // url: "http://192.168.0.187:8080/job/create",
        method: 'get',
        params: {
            pageNum,
            pageSize
        }
    })
}




//首页试题总数
export function questionCount() {
    return request({
        url: '/first/question/count',
        method: 'GET'
    })
}
//首页试卷数量
export function paperCount() {
    return request({
        url: '/first/paper/count',
        method: 'GET'
    })
}
//首页显示考试人数
export function peopleCount() {
    return request({
        url: '/first/people/count',
        method: 'GET'
    })
}

//首页不同类型试题数量
export function questionTypeCount() {
    return request({
        url: '/first/type/count',
        method: 'GET',
    })
}

//录入试题
export function addOneQuestion(questionDto) {
    return request({
        url: '/question/question',
        method: 'post',
        data: questionDto,
    })
}
//录入试卷
export function subAllQuestion(paperDto) {
    return request({
        url: '/paper/update',
        method: 'post',
        data: paperDto,
    })
}
//编辑试卷
export function upPaper(taskId) {
    return request({
        url: '/paper/setPaper',
        method: 'post',
        params: {taskId:taskId},
    })
}
//修改试卷规则
export function updateRule(paperDto) {
    return request({
        url: '/paper/updateRule',
        method: 'post',
        data: paperDto,
    })
}
//修改试卷信息
export function updateInfo(paperDto) {
    return request({
        url: '/paper/updateInfo',
        method: 'post',
        data: paperDto,
    })
}



