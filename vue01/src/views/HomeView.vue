<template>
  <div class="home-view">
    <PersonCard :person="person" />
    <SkillSearch :skill-list="skillList" v-model="searchKey" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import PersonCard from '../components/PersonCard.vue'
import SkillSearch from '../components/SkillSearch.vue'
import { useProfileStore } from '../stores/profile.js'

const profileStore = useProfileStore()
// storeToRefs：解构 Store 的 state，保持响应式
const { person, skillList } = storeToRefs(profileStore)

// 首页 = 个人名片 + 技能搜索（数据来自 Profile Store）
const searchKey = ref('')
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
