import request from '@/utils/request'
export function deletePaper(id) {
    return request({
        url: '/paper/delete',
        // url: "http://192.168.0.187:8080/paper/delete",
        method: 'post',
        params: {
            id
        }
    })
}