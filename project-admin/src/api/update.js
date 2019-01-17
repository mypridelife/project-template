import request from '@/utils/request'
export function questionUpdate(id, jobId, question, answer, questionType, score) {
    return request({
        url: '/questions/update',
        // url: "http://192.168.0.187:8080/questions/update",
        method: 'post',
        params: {
            id, jobId, question, answer, questionType, score
        }
    })
}

export function paperUpdate(time, paperContent, id, question) {
    return request({
        url: '/paper/update',
        // url: "http://192.168.0.187:8080/paper/update",
        method: 'post',
        data: {
            time, paperContent, id, question
        }
    })
}