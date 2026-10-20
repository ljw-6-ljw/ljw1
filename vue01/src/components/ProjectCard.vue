<template>
  <article class="project-card card">
    <header class="pc-head">
      <!-- 具名插槽 title：定制标题区，未提供时显示项目标题 -->
      <h3 class="pc-title">
        <slot name="title">{{ project.title }}</slot>
      </h3>
      <!-- 作用域插槽 badge：把子组件内部的 status 暴露给父组件，父组件可按需定制状态区 -->
      <slot name="badge" :status="project.status">
        <StatusBadge :status="project.status" />
      </slot>
    </header>

    <!-- 默认插槽：定制卡片主体内容，未提供时显示项目简介 -->
    <div class="pc-body">
      <slot>{{ project.desc }}</slot>
    </div>

    <footer class="pc-foot">
      <div class="pc-tags">
        <span v-for="tag in project.tags" :key="tag" class="pc-tag">{{ tag }}</span>
      </div>
      <!-- 具名插槽 actions：定制操作区，未提供时显示查看项目链接 -->
      <slot name="actions">
        <a v-if="project.link" class="btn" :href="project.link" target="_blank" rel="noopener">查看项目</a>
      </slot>
    </footer>
  </article>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'

// 可复用项目卡片组件：通过 props 接收项目数据，通过插槽接收父组件定制的模板内容
const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 22px 24px;
  transition: background 0.35s ease, color 0.35s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(31, 45, 61, 0.12);
}

.pc-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pc-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pc-body {
  margin-top: 12px;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
}

.pc-foot {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pc-tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(14, 165, 233, 0.1);
  color: var(--primary);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
</style>
