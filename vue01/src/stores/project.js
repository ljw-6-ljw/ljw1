import { defineStore } from 'pinia'
import { projectSeed } from '../data/personal.js'

// 项目 Store：管理项目数据的增删改查与统计，跨页面（列表/详情/统计/后台编辑）共享
// 持久化策略：state 初始化时从 localStorage 读取，actions 修改后同步写回
const KEY = 'vue01_projects'

// 读取持久化数据，没有则使用种子数据（深拷贝，避免污染模块级种子）
function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved) && saved.length > 0) {
      return saved
    }
  } catch (e) {
    /* 数据损坏时回退到种子数据 */
  }
  return JSON.parse(JSON.stringify(projectSeed))
}

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: loadProjects()
  }),

  getters: {
    // 项目总数
    totalCount: (state) => state.projects.length,

    // 累计点赞
    totalLikes: (state) => state.projects.reduce((sum, p) => sum + p.likes, 0),

    // 各状态项目数
    statusCount: (state) => {
      const map = { 已完成: 0, 进行中: 0, 规划中: 0 }
      state.projects.forEach((p) => {
        if (p.status in map) {
          map[p.status] += 1
        }
      })
      return map
    },

    // 使用过的全部技术栈
    allTags: (state) => [...new Set(state.projects.flatMap((p) => p.tags))],

    // 技术栈种类数
    tagCount: (state) => new Set(state.projects.flatMap((p) => p.tags)).size,

    // 按 id 查找项目（动态路由详情页使用）
    getById: (state) => (id) => state.projects.find((p) => p.id === Number(id))
  },

  actions: {
    // 写回 localStorage
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.projects))
    },

    // 新增项目：自动生成新 id，likes 从 0 开始
    addProject({ title, desc, status, tags, year }) {
      const newId = Math.max(0, ...this.projects.map((p) => p.id)) + 1
      this.projects.push({
        id: newId,
        title,
        desc,
        status,
        tags,
        year,
        likes: 0
      })
      this.persist()
      return newId
    },

    // 更新项目：按 id 找到目标后合并新值
    updateProject(id, { title, desc, status, tags, year }) {
      const target = this.projects.find((p) => p.id === id)
      if (target) {
        Object.assign(target, { title, desc, status, tags, year })
        this.persist()
      }
      return !!target
    },

    // 删除项目
    removeProject(id) {
      const index = this.projects.findIndex((p) => p.id === id)
      if (index > -1) {
        this.projects.splice(index, 1)
        this.persist()
        return true
      }
      return false
    },

    // 点赞：修改共享数据，列表、详情、统计页面实时同步并持久化
    likeProject(id) {
      const target = this.projects.find((p) => p.id === Number(id))
      if (target) {
        target.likes += 1
        this.persist()
      }
    }
  }
})
