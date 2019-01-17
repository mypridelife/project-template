import request from '@/utils/request'

// 查
export function isVerify(id) {
  return request({
    url: '/board/isVerify',
    method: 'POST',
    params: { id }
  })
}
