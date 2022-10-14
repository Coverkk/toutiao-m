import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem, removeItem} from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem(TOKEN_KEY, state.user)
    },
    logout (state) {
      // 将登录状态置空
      state.user = null
      // 将用户从本地存储删除
      removeItem(TOKEN_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
