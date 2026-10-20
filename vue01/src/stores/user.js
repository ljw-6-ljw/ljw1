import { defineStore } from 'pinia'

// 用户 Store：管理登录状态，配合路由守卫实现后台访问控制
// 持久化策略：state 初始化时从 localStorage 读取，actions 修改后同步写回
const KEY = 'vue01_user'

export const useUserStore = defineStore('user', {
  state: () => ({
    // 从 localStorage 恢复登录状态，保证刷新后仍保持
    isAuthenticated: localStorage.getItem(KEY) === 'true',
    account: localStorage.getItem(`${KEY}_account`) || ''
  }),

  getters: {
    // 派生值：是否已登录（与 isAuthenticated 同义，便于语义化使用）
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    // 登录：校验演示账号，成功则写入状态并持久化
    login(account, password) {
      if (account === 'admin' && password === '123456') {
        this.isAuthenticated = true
        this.account = account
        localStorage.setItem(KEY, 'true')
        localStorage.setItem(`${KEY}_account`, account)
        return true
      }
      return false
    },

    // 退出登录：清除状态与持久化数据
    logout() {
      this.isAuthenticated = false
      this.account = ''
      localStorage.removeItem(KEY)
      localStorage.removeItem(`${KEY}_account`)
    }
  }
})
