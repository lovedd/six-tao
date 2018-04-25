const user = {
  state: {
    isLogin: false,
    userName: ''
  },
  mutations: {
    LOG_IN: (state, payload) => {
      state.isLogin = true
      state.userName = payload.userName
    },
    LOG_OUT: (state, payload) => {
      state.isLogin = false
      state.userName = ''
    }
  }
}

export default user
