import { defineStore } from 'pinia'
import { articleSeed } from '../data/personal.js'

// 文章 Store：管理文章数据的增删改查，文章列表、文章详情、后台管理跨页面共享
// 持久化策略：state 初始化时从 localStorage 读取，actions 修改后同步写回
const KEY = 'vue01_articles'

function loadArticles() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved) && saved.length > 0) {
      return saved
    }
  } catch (e) {
    /* 数据损坏时回退到种子数据 */
  }
  return JSON.parse(JSON.stringify(articleSeed))
}

export const useArticleStore = defineStore('article', {
  state: () => ({
    articles: loadArticles()
  }),

  getters: {
    // 文章总数
    totalCount: (state) => state.articles.length,

    // 按 id 查找文章（文章详情页使用）
    getById: (state) => (id) => state.articles.find((a) => a.id === Number(id)),

    // 全部文章分类（列表页分类标签用）
    allCategories: (state) => [...new Set(state.articles.map((a) => a.category))]
  },

  actions: {
    // 写回 localStorage
    persist() {
      localStorage.setItem(KEY, JSON.stringify(this.articles))
    },

    // 新增文章
    addArticle({ title, category, date, summary, content }) {
      const newId = Math.max(0, ...this.articles.map((a) => a.id)) + 1
      this.articles.unshift({
        id: newId,
        title,
        category,
        date,
        summary,
        content,
        likes: 0
      })
      this.persist()
      return newId
    },

    // 更新文章
    updateArticle(id, { title, category, date, summary, content }) {
      const target = this.articles.find((a) => a.id === id)
      if (target) {
        Object.assign(target, { title, category, date, summary, content })
        this.persist()
      }
      return !!target
    },

    // 删除文章
    removeArticle(id) {
      const index = this.articles.findIndex((a) => a.id === id)
      if (index > -1) {
        this.articles.splice(index, 1)
        this.persist()
        return true
      }
      return false
    },

    // 文章点赞
    likeArticle(id) {
      const target = this.articles.find((a) => a.id === Number(id))
      if (target) {
        target.likes += 1
        this.persist()
      }
    }
  }
})
