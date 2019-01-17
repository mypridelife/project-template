import request from '@/utils/request'

export function enterQuestion(value, question, radio, type, value1) {
    return request({
        url: '/questions/create',
        // url: "http://192.168.0.187:8080/questions/create",
        method: 'post',
        params: {
            jobId: value,
            question: question,
            answer: radio,
            questionType: type,
            score: value1,
        }
    })
}

export function fixTemplate(jobId) {
    return request({
        url: '/paper/fixed/create',
        method: 'post',
        params: {
            jobId
        }
    })
}

export function autoTemplate(testTime, jobId, single, singleScore, multiple, multipleScore, judgment, judgmentScore, answer, answerScore) {
    return request({
        url: '/paper/create',
        method: 'post',
        params: {
            testTime,
            jobId,
            single,
            singleScore,
            multiple,
            multipleScore,
            judgment,
            judgmentScore,
            answer,
            answerScore,
        }
    })
}
