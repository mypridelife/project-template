import request from '../utils/request'

export function getProjectList(pageSize, pageNo) {
  return request({
    url: '/project/page',
    params: {
      pageSize,
      pageNo
    },
    method: 'POST'
  })
}
