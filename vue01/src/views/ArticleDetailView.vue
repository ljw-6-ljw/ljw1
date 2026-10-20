<template>
  <div class="article-detail">
    <article v-if="article" class="card detail-card">
      <div class="ad-head">
        <span class="ad-cat">{{ article.category }}</span>
        <h3 class="ad-title">{{ article.title }}</h3>
      </div>
      <p class="ad-meta">{{ article.date }} · 赞 {{ article.likes }}</p>

      <!-- 文章正文：Store 中保存的多段内容 -->
      <p class="ad-content">{{ article.content }}</p>

      <div class="ad-actions">
        <button class="btn" @click="router.go(-1)">← 返回列表（go）</button>
        <button class="btn" @click="onLike">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          点赞 {{ article.likes }}
        </button>
      </div>
    </article>

    <!-- 无效文章地址处理 -->
    <article v-else class="card detail-empty">
      <h3>未找到编号为 {{ route.params.id }} 的文章</h3>
      <button class="btn primary" @click="router.replace({ name: 'article-list' })">返回文章列表</button>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '../stores/article.js'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

// 通过 Store 的 getById getter 查找文章（getter 返回函数，按 id 精确匹配）
const article = computed(() => articleStore.getById(route.params.id))

const onLike = () => {
  if (article.value) {
    articleStore.likeArticle(article.value.id)
  }
}
</script>

<style scoped>
.article-detail {
  margin-top: 18px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ad-head {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ad-cat {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.12);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
}

.ad-title {
  margin: 0;
  font-size: 21px;
}

.ad-meta {
  margin: 0;
  color: var(--text-sub);
  font-size: 12px;
}

.ad-content {
  margin: 0;
  color: var(--text);
  font-size: 14px;
  line-height: 2;
  text-align: justify;
  border-top: 1px dashed var(--border);
  padding-top: 14px;
}

.ad-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.detail-empty h3 {
  margin: 0;
}
</style>
