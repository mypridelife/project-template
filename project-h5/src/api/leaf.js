import request from '../utils/request'

export function getBoardList(pageSize, pageNo, projectId) {
  return request({
    url: '/board/page1',
    params: {
      pageSize,
      pageNo,
      projectId
    },
    method: 'POST'
  })
}
