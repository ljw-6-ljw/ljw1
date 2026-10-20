<template>
  <section class="project-center">
    <div class="page-head">
      <h2 class="page-title">项目展示</h2>
      <p class="page-sub">项目中心共享布局：列表、详情、统计作为嵌套子路由，渲染在下方的 RouterView 中</p>
    </div>

    <!-- 嵌套子路由导航 -->
    <nav class="sub-nav">
      <RouterLink class="sub-link" :to="{ name: 'project-list' }">项目列表</RouterLink>
      <RouterLink class="sub-link" :to="{ name: 'project-stats' }">项目统计</RouterLink>
    </nav>

    <!-- 子路由出口：/projects 渲染列表，/projects/stats 渲染统计，/projects/:id 渲染详情 -->
    <RouterView />
  </section>
</template>

<script setup>
</script>

<style scoped>
.project-center {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
