<template>
  <div class="project-list-view">
    <!-- StatusFilter 通过 v-model 双向同步筛选条件 -->
    <StatusFilter v-model="filterStatus" :statuses="statuses" />
    <p class="result-count">共 {{ filteredProjects.length }} 个项目</p>

    <!-- ProjectList 通过作用域插槽暴露项目与序号，父组件定制每个卡片的渲染结构 -->
    <ProjectList :projects="filteredProjects" v-slot="{ project, index }">
      <ProjectCard :project="project">
        <template #title>
          <span class="pc-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="pc-name">{{ project.title }}</span>
          <em class="pc-year">{{ project.year }}</em>
        </template>

        <p class="pc-desc">{{ project.desc }}</p>

        <template #actions>
          <div class="actions">
            <button class="like-btn" @click="onLike(project)">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              赞 {{ project.likes }}
            </button>
            <!-- 命名路由 + 动态参数：跳转到项目详情页 /projects/:id -->
            <RouterLink class="detail-link" :to="{ name: 'project-detail', params: { id: project.id } }">
              查看详情 →
            </RouterLink>
          </div>
        </template>
      </ProjectCard>
    </ProjectList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import StatusFilter from '../components/StatusFilter.vue'
import ProjectList from '../components/ProjectList.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useProjectStore } from '../stores/project.js'

const projectStore = useProjectStore()
// storeToRefs：解构 Store 的 state，保持响应式
const { projects } = storeToRefs(projectStore)

const statuses = ['全部', '已完成', '进行中', '规划中']
const filterStatus = ref('全部')

const filteredProjects = computed(() => {
  if (filterStatus.value === '全部') {
    return projects.value
  }
  return projects.value.filter(p => p.status === filterStatus.value)
})

// 点赞：调用 Store 的 action 修改共享数据，列表、详情、统计页面数据实时同步并持久化
const onLike = (project) => {
  projectStore.likeProject(project.id)
}
</script>

<style scoped>
.project-list-view {
  margin-top: 18px;
}

.result-count {
  margin: 10px 2px 0;
  font-size: 12px;
  color: var(--text-sub);
}

.pc-num {
  font-size: 12px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  color: #fff;
}

.pc-name {
  font-size: 17px;
}

.pc-year {
  font-style: normal;
  font-size: 12px;
  color: var(--text-sub);
  background: rgba(127, 127, 127, 0.1);
  padding: 2px 8px;
  border-radius: 999px;
}

.pc-desc {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.8;
  text-align: justify;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.like-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.like-btn:hover {
  border-color: #ef4444;
  color: #ef4444;
  background: rgba(239, 68, 68, 0.06);
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 15px;
  border-radius: 999px;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.detail-link:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}
</style>
