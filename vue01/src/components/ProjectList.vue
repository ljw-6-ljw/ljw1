<template>
  <div class="project-list">
    <!-- 作用域插槽：把子组件遍历得到的当前项目 project 与序号 index 提供给父组件模板 -->
    <slot
      v-for="(project, index) in projects"
      :key="project.id"
      :project="project"
      :index="index"
    ></slot>
  </div>
</template>

<script setup>
// 可复用项目列表组件：只负责遍历数据并通过作用域插槽对外暴露数据，
// 每个项目渲染成什么结构完全由父组件决定
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 18px;
  margin-top: 18px;
}

@media (max-width: 560px) {
  .project-list {
    grid-template-columns: 1fr;
  }
}
</style>
