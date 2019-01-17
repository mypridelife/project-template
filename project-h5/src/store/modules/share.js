const share = {
  state: {
    startDate: '',
    endDate: '',
    indexCurrentPage: 1,
    leafCurrentPage: 1
  },
  mutations: {
    SET_INDEXCURRENTPAGE: (state, indexCurrentPage) => {
      state.indexCurrentPage = indexCurrentPage
    },
    SET_LEAFCURRENTPAGE: (state, leafCurrentPage) => {
      state.leafCurrentPage = leafCurrentPage
    }
  },
  actions: {}
}
export default share
