<template>
  <div class="project-stats">
    <article class="card">
      <h3>项目统计</h3>
      <p class="stat-sub">基于共享项目数据实时计算（嵌套子路由 /projects/stats）</p>

      <ul class="stat-list">
        <li>
          <span>项目总数</span>
          <b>{{ projects.length }}</b>
        </li>
        <li>
          <span>累计点赞</span>
          <b>{{ totalLikes }}</b>
        </li>
        <li v-for="(count, status) in statusCount" :key="status">
          <span>{{ status }}</span>
          <b>{{ count }}</b>
        </li>
        <li>
          <span>使用技术栈数量</span>
          <b>{{ tagCount }}</b>
        </li>
      </ul>

      <div class="stat-tags">
        <span v-for="tag in allTags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </article>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project.js'

const projectStore = useProjectStore()
// storeToRefs：同时解构 state 与 getters，保持响应式
// 统计值均由 Store 的 getters 基于 state 派生计算（带缓存）
const { projects, totalLikes, statusCount, allTags, tagCount } = storeToRefs(projectStore)
</script>

<style scoped>
.project-stats {
  margin-top: 18px;
}

.project-stats h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 18px;
}

.project-stats h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.stat-sub {
  margin: 0 0 16px;
  color: var(--text-sub);
  font-size: 13px;
}

.stat-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.06);
  font-size: 14px;
}

.stat-list span {
  color: var(--text-sub);
}

.stat-list b {
  font-size: 20px;
  color: var(--primary);
}

.stat-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed var(--border);
}

.tag {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.1);
  color: var(--primary);
}

@media (max-width: 560px) {
  .stat-list {
    grid-template-columns: 1fr;
  }
}
</style>
