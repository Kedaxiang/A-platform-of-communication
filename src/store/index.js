import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isChangeAvatar: false
  },
  mutations: {
    changeAvatar(state) {
      state.isChangeAvatar = true
    },
    changeAvatarFinish(state) {
      state.isChangeAvatar = false
    }
  },
  actions: {
  },
  modules: {
  }
})
