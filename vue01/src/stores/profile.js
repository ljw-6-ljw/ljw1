import { defineStore } from 'pinia'
import { personSeed, skillListSeed } from '../data/personal.js'

// 个人简介 Store：管理个人信息与技能列表，首页、关于页、后台编辑跨页面共享
// 持久化策略：state 初始化时从 localStorage 读取，actions 修改后同步写回
const KEY = 'vue01_profile'

function loadPerson() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (saved && saved.person) {
      // 与种子数据合并，保证新增字段时也有默认值
      return { ...JSON.parse(JSON.stringify(personSeed)), ...saved.person }
    }
  } catch (e) {
    /* 数据损坏时回退到种子数据 */
  }
  return JSON.parse(JSON.stringify(personSeed))
}

export const useProfileStore = defineStore('profile', {
  state: () => ({
    person: loadPerson(),
    skillList: JSON.parse(JSON.stringify(skillListSeed))
  }),

  getters: {
    // 姓名（可直接在模板中展示）
    name: (state) => state.person.name,
    // 学号
    stuId: (state) => state.person.stuId
  },

  actions: {
    // 保存个人简介：合并字段并持久化
    updateProfile(payload) {
      Object.assign(this.person, payload)
      this.persist()
    },

    persist() {
      localStorage.setItem(KEY, JSON.stringify({ person: this.person }))
    }
  }
})
