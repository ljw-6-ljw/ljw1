<template>
  <div class="status-filter">
    <button
      v-for="s in statuses"
      :key="s"
      class="filter-btn"
      :class="{ active: modelValue === s }"
      @click="$emit('update:modelValue', s)"
    >
      {{ s }}
    </button>
  </div>
</template>

<script setup>
// 状态筛选组件：通过 defineModel 实现父子组件双向绑定，
// 父组件使用 v-model 即可同步筛选条件，无需手动监听事件
const modelValue = defineModel()

const props = defineProps({
  statuses: {
    type: Array,
    default: () => ['全部']
  }
})
</script>

<style scoped>
.status-filter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
}

.filter-btn {
  padding: 7px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-sub);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}
</style>
