<template>
  <div class="project-detail">
    <!-- 通过动态路由参数查找到项目时，展示详情 -->
    <article v-if="project" class="card detail-card">
      <header class="dc-head">
        <h3>{{ project.title }}</h3>
        <StatusBadge :status="project.status" />
      </header>

      <p class="dc-desc">{{ project.desc }}</p>

      <ul class="dc-meta">
        <li><span>项目编号</span><b>{{ route.params.id }}</b></li>
        <li><span>年份</span><b>{{ project.year }}</b></li>
        <li><span>技术栈</span><b>{{ project.tags.join(' / ') }}</b></li>
        <li><span>点赞数</span><b>{{ project.likes }}</b></li>
      </ul>

      <!-- 编程式导航三种方法演示 -->
      <div class="dc-actions">
        <button class="btn" @click="router.go(-1)">← 返回上一页（go）</button>
        <button class="btn primary" @click="router.push({ name: 'project-list' })">返回项目列表（push）</button>
        <button class="btn" @click="router.replace({ name: 'project-stats' })">查看统计（replace）</button>
      </div>
    </article>

    <!-- 无效详情地址处理：参数匹配不到项目时，给出提示并自动返回列表 -->
    <article v-else class="card detail-empty">
      <h3>未找到编号为 {{ route.params.id }} 的项目</h3>
      <p>地址中的项目编号无效，2 秒后将自动返回项目列表…</p>
      <button class="btn primary" @click="backToList">立即返回列表</button>
    </article>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusBadge from '../components/StatusBadge.vue'
import { useProjectStore } from '../stores/project.js'

// useRoute：获取当前路由信息（路径、参数、query 等）
const route = useRoute()
// useRouter：获取路由实例，进行编程式导航
const router = useRouter()
const projectStore = useProjectStore()

// 动态路由参数是字符串，按数字编号匹配数据前先执行 Number() 转换
// 通过 Store 的 getById getter 查找项目（getter 返回函数，按 id 精确匹配）
const id = Number(route.params.id)
const project = computed(() => projectStore.getById(id))

// 无效详情地址处理：replace 替换当前历史记录，避免无效地址残留在历史栈中
const backToList = () => {
  router.replace({ name: 'project-list' })
}

onMounted(() => {
  if (!project.value) {
    setTimeout(backToList, 2000)
  }
})
</script>

<style scoped>
.project-detail {
  margin-top: 18px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dc-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.dc-head h3 {
  margin: 0;
  font-size: 22px;
}

.dc-desc {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.9;
  text-align: justify;
}

.dc-meta {
  list-style: none;
  margin: 0;
  padding: 16px 0 0;
  border-top: 1px dashed var(--border);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.dc-meta li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.06);
  font-size: 14px;
}

.dc-meta span {
  color: var(--text-sub);
}

.dc-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.detail-empty h3 {
  margin: 0;
}

.detail-empty p {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
}

@media (max-width: 560px) {
  .dc-meta {
    grid-template-columns: 1fr;
  }
}
</style>
