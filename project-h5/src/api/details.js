import request from '@/utils/request'

// 查
export function getmetricHistory(startDate, endDate, metricId) {
  return request({
    url: '/mobile/getmetricHistory',
    method: 'GET',
    params: { startDate, endDate, metricId }
  })
}
