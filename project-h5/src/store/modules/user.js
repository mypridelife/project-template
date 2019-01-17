// 导入API.js的 login
import { login } from '@/api/api'

// 创建user数据模型
const user = {
  state: {
    userInfo: null // 用户信息数据
  },
  mutations: {
    // 保存用户信息
    SET_USERINFO_DATA(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    login({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        // 调用API.js的 login方法
        login(parameterData).then(
          response => {
            // 保存到状态机中去
            commit('SET_USERINFO_DATA', parameterData)
            resolve(response)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
export default user
