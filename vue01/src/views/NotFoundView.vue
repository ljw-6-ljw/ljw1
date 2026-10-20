<template>
  <section class="not-found-view">
    <article class="card not-found-card">
      <h2 class="nf-code">404</h2>
      <p class="nf-text">您访问的页面不存在或已被移除</p>
      <p class="nf-url">当前地址：{{ route.fullPath }}</p>
      <!-- 编程式导航：push 返回首页 -->
      <button class="btn primary" @click="router.push({ name: 'home' })">返回首页</button>
    </article>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<style scoped>
.not-found-view {
  display: flex;
  justify-content: center;
}

.not-found-card {
  width: 100%;
  max-width: 460px;
  text-align: center;
}

.nf-code {
  margin: 0;
  font-size: 72px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.1;
}

.nf-text {
  margin: 10px 0 4px;
  font-size: 16px;
}

.nf-url {
  margin: 0 0 18px;
  font-size: 12px;
  color: var(--text-sub);
  word-break: break-all;
}
</style>
