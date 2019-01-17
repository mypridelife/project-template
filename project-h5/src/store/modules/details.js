import { getmetricHistory } from '@/api/details'

const details = {
  state: {
    metric: JSON.parse(localStorage.getItem('metric'))
  },
  mutations: {
    SET_METRIC: (state, metric) => {
      state.metric = metric
      localStorage.setItem('metric', JSON.stringify(metric))
    }
  },

  actions: {
    // 获取到要展示的数据
    GetMetricHistory({ commit }, metricInfo) {
      return new Promise((resolve, reject) => {
        getmetricHistory(
          metricInfo.startDate,
          metricInfo.endDate,
          metricInfo.metricId
        )
          .then(res => {
            commit('SET_METRIC', res.data)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default details
