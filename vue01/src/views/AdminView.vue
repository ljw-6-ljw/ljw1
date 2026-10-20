<template>
  <section class="admin-view">
    <div class="page-head">
      <h2 class="page-title">后台管理</h2>
      <p class="page-sub">仅认证用户可访问（由 beforeEach 路由守卫控制），可修改个人简介与项目信息</p>
    </div>

    <!-- 后台管理嵌套子路由导航 -->
    <nav class="sub-nav">
      <RouterLink class="sub-link" :to="{ name: 'profile-edit' }">编辑个人简介</RouterLink>
      <RouterLink class="sub-link" :to="{ name: 'project-edit' }">编辑项目信息</RouterLink>
      <RouterLink class="sub-link" :to="{ name: 'article-edit' }">编辑文章信息</RouterLink>
    </nav>

    <!-- 子路由出口：/admin/profile 与 /admin/projects -->
    <RouterView />

    <div class="admin-foot">
      <button class="btn danger" @click="logout">退出登录</button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const router = useRouter()
const userStore = useUserStore()

// 退出登录：调用 User Store 的 action 清除登录状态并返回首页
const logout = () => {
  userStore.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.admin-view {
  display: flex;
  flex-direction: column;
}

.admin-foot {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
}
</style>
