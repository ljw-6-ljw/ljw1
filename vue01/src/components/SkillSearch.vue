<template>
  <section class="card skill-box">
    <div class="section-head">
      <h3>技能标签</h3>
      <span class="count">{{ filterSkillList.length }} / {{ skillList.length }}</span>
    </div>

    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input type="text" v-model="searchKey" placeholder="输入关键词筛选技能，如 vue / java" />
      <button v-if="searchKey" class="clear-btn" @click="searchKey = ''" aria-label="清空搜索">×</button>
    </div>

    <div v-if="filterSkillList.length" class="skill-list">
      <span
        class="skill-tag"
        v-for="(item, i) in filterSkillList"
        :key="item.name"
        :style="{ background: tagColors[i % tagColors.length] }"
      >
        {{ item.name }}
        <em class="level">{{ item.level }}</em>
      </span>
    </div>
    <div v-else class="empty">没有匹配的技能，换个关键词试试～</div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const searchKey = defineModel()

const props = defineProps({
  skillList: {
    type: Array,
    required: true
  }
})

const tagColors = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#f97316', '#3b82f6']

const filterSkillList = computed(() => {
  if (!searchKey.value) {
    return props.skillList
  }
  const key = searchKey.value.toLowerCase()
  return props.skillList.filter(s => s.name.toLowerCase().includes(key))
})
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 26px;
  transition: background 0.35s ease, color 0.35s ease;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.section-head h3 {
  margin: 0;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-head h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.count {
  font-size: 12px;
  color: var(--text-sub);
  background: rgba(127, 127, 127, 0.12);
  padding: 3px 10px;
  border-radius: 999px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(127, 127, 127, 0.05);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-bar:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

.search-icon {
  flex-shrink: 0;
  color: var(--text-sub);
}

input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 14px;
}

input::placeholder {
  color: var(--text-sub);
}

.clear-btn {
  flex-shrink: 0;
  border: none;
  background: none;
  color: var(--text-sub);
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
  cursor: pointer;
}

.clear-btn:hover {
  color: var(--text);
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-tag:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.22);
}

.level {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  opacity: 0.9;
  border-left: 1px solid rgba(255, 255, 255, 0.45);
  padding-left: 6px;
}

.empty {
  margin-top: 18px;
  padding: 20px;
  text-align: center;
  color: var(--text-sub);
  font-size: 14px;
  border: 1px dashed var(--border);
  border-radius: 10px;
}
</style>
