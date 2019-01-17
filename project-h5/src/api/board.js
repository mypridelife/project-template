import request from '@/utils/request'

// 查
export function getBoard(startDate, endDate, id, password) {
  return request({
    url: '/mobile/board',
    method: 'GET',
    params: { startDate, endDate, id, password }
  })
}
export function getForms(metricId, endDate) {
  return request({
    url: '/mobile/getForm',
    method: 'GET',
    params: { metricId, endDate }
  })
}
export function getFormAll(cardId, endDate) {
  // return request({
  //   url: '/getFormAll',
  //   method: 'GET',
  //   params: { metricId, endDate}
  // })
  return request({
    url: '/mobile/getTables',
    method: 'GET',
    params: { cardId, endDate }
  })
}
export function getRank(metricId, endDate) {
  return request({
    url: '/mobile/getFormAll',
    method: 'GET',
    params: { metricId, endDate }
  })
}

export function getTables(cardIds, endDate) {
  return request({
    url: 'http://47.92.25.101:3000/mock/41/getTables',
    method: 'GET',
    params: { cardIds, endDate }
  })
}
