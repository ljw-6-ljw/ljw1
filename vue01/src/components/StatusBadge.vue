<template>
  <span class="status-badge" :class="'st-' + status">{{ status }}</span>
</template>

<script setup>
// 可复用状态徽章组件：只接收 status 属性，根据状态值切换样式
const props = defineProps({
  status: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

.st-已完成 {
  background: linear-gradient(135deg, #10b981, #059669);
}

.st-进行中 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.st-规划中 {
  background: linear-gradient(135deg, #94a3b8, #64748b);
}
</style>
