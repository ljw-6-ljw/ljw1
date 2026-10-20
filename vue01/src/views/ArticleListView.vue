<template>
  <section class="article-list-view">
    <div class="page-head">
      <h2 class="page-title">文章展示</h2>
      <p class="page-sub">文章数据来自 Pinia 文章 Store，跨页面共享并持久化到 localStorage</p>
    </div>

    <!-- 分类筛选：分类列表来自 Store 的 getter -->
    <div class="cat-bar">
      <button
        v-for="cat in allCategories"
        :key="cat"
        class="cat-btn"
        :class="{ active: filterCategory === cat }"
        @click="filterCategory = cat"
      >
        {{ cat }}
      </button>
      <button
        class="cat-btn"
        :class="{ active: filterCategory === '' }"
        @click="filterCategory = ''"
      >
        全部
      </button>
    </div>

    <p class="result-count">共 {{ filteredArticles.length }} 篇文章</p>

    <ul class="article-list">
      <li v-for="article in filteredArticles" :key="article.id" class="card article-item">
        <div class="ai-head">
          <span class="ai-cat">{{ article.category }}</span>
          <h3 class="ai-title">{{ article.title }}</h3>
        </div>
        <p class="ai-summary">{{ article.summary }}</p>
        <div class="ai-foot">
          <span class="ai-date">{{ article.date }}</span>
          <span class="ai-likes">赞 {{ article.likes }}</span>
          <!-- 命名路由 + 动态参数：跳转到文章详情页 /articles/:id -->
          <RouterLink class="btn small primary" :to="{ name: 'article-detail', params: { id: article.id } }">
            阅读全文 →
          </RouterLink>
        </div>
      </li>
    </ul>

    <div v-if="filteredArticles.length === 0" class="card empty-tip">
      该分类下暂无文章，可在后台管理中添加。
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article.js'

const articleStore = useArticleStore()

// storeToRefs：把 Store 的 state 与 getters 包装为 ref，解构后保持响应式
const { articles, allCategories } = storeToRefs(articleStore)

const filterCategory = ref('')

const filteredArticles = computed(() => {
  if (!filterCategory.value) {
    return articles.value
  }
  return articles.value.filter((a) => a.category === filterCategory.value)
})
</script>

<style scoped>
.article-list-view {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cat-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 6px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-sub);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cat-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.cat-btn.active {
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}

.result-count {
  margin: 0;
  font-size: 12px;
  color: var(--text-sub);
}

.article-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.article-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 22px;
}

.ai-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ai-cat {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
}

.ai-title {
  margin: 0;
  font-size: 17px;
}

.ai-summary {
  margin: 0;
  color: var(--text-sub);
  font-size: 13px;
  line-height: 1.8;
  text-align: justify;
}

.ai-foot {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--text-sub);
}

.ai-likes {
  color: var(--primary);
}

.empty-tip {
  color: var(--text-sub);
  font-size: 13px;
  text-align: center;
  padding: 28px;
}
</style>
