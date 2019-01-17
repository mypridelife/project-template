import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}
// export function login(username, password) {

//     return request({
//         url: 'http://wenda-api.hzhengji.cn/admin/login',
//         method: 'post',
//         params: {
//             username: username,
//             password: password
//         }
//     })
// }

// export function getInfo(token) {
//     return request({
//         url: 'http://wenda-api.hzhengji.cn/user/info',
//         method: 'get',
//         params: { token }
//     })
// }
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
