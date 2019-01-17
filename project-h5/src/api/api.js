import Http from '@/utils/Http'

// 登录
export const login = params =>
  new Http().require({ api: '/user/login', param: params })
