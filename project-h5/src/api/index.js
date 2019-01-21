import request from '../utils/request'

export function getMaterialList(pageSize, pageNo) {
  return request({
    url: '/material/page',
    params: {
      pageSize,
      pageNo
    },
    method: 'POST'
  })
}
