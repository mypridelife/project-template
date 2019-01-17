import { getBoard } from '@/api/board'
const board = {
  state: {
    board: JSON.parse(localStorage.getItem('board')),

    password: localStorage.getItem('password'),
    boardId: localStorage.getItem('boardId'),
    startDate: localStorage.getItem('startDate'),
    endDate: localStorage.getItem('endDate'),
    boardTitle: ''
  },
  mutations: {
    SET_Board: (state, board) => {
      state.board = board
      localStorage.setItem('board', JSON.stringify(board))
    },
    SET_Password(state, password) {
      state.password = password
      localStorage.setItem('password', password)
    },
    SET_BoardId: (state, boardId) => {
      state.boardId = boardId
      localStorage.setItem('boardId', boardId)
    },
    SET_BOARDTITLE: (state, boardTitle) => {
      state.boardTitle = boardTitle
      // localStorage.setItem('boardName', boardName)
    },
    SET_StartDate: (state, startDate) => {
      state.startDate = startDate
      localStorage.setItem('startDate', startDate)
    },
    SET_EndDate: (state, endDate) => {
      state.endDate = endDate
      localStorage.setItem('endDate', endDate)
    }
  },

  actions: {
    // 获取到要展示的数据
    GetBoard({ commit }, boardInfo) {
      return new Promise((resolve, reject) => {
        getBoard(
          boardInfo.startDate,
          boardInfo.endDate,
          boardInfo.boardId,
          boardInfo.password
        )
          .then(res => {
            console.log('传过去的值', boardInfo)
            console.log('大接口', res.data)
            if (res.data.msg === 0) {
              localStorage.setItem('msg', res.data.msg)
            } else {
              localStorage.setItem('msg', 1)
              commit('SET_Board', res.data)
              commit('SET_BOARDTITLE', res.data.boardName)
              commit('SET_Password', boardInfo.password)
              commit('SET_BoardId', boardInfo.boardId)
              commit('SET_StartDate', boardInfo.startDate)
              //   router.push({
              //     name: 'Board'
              //   })
            }

            console.log('store:', board.state)
            console.log('localStorage:', localStorage)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default board
