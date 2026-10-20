<template>
  <div class="project-edit">
    <article class="card pe-head">
      <h3>编辑项目信息</h3>
      <button class="btn primary" @click="startCreate">＋ 新增项目</button>
    </article>

    <!-- 现有项目列表 -->
    <ul class="pe-list">
      <li v-for="p in projects" :key="p.id" class="pe-item card">
        <div class="pe-info">
          <b>{{ p.title }}</b>
          <span class="pe-sub">{{ p.tags.join(' / ') }} · {{ p.year }} · {{ p.status }}</span>
        </div>
        <div class="pe-ops">
          <button class="btn small" @click="startEdit(p)">编辑</button>
          <button class="btn small danger" @click="remove(p.id)">删除</button>
        </div>
      </li>
    </ul>

    <!-- 新增 / 编辑表单 -->
    <article v-if="editing" class="card pe-form">
      <h3>{{ form.id ? '编辑项目' : '新增项目' }}</h3>
      <form class="edit-form" @submit.prevent="save">
        <label class="form-label">
          项目名称
          <input v-model.trim="form.title" type="text" placeholder="请输入项目名称" />
        </label>
        <label class="form-label">
          状态
          <select v-model="form.status">
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </label>
        <label class="form-label">
          项目简介
          <textarea v-model.trim="form.desc" rows="3" placeholder="请输入项目简介"></textarea>
        </label>
        <label class="form-label">
          技术栈（多个用逗号分隔）
          <input v-model.trim="tagsText" type="text" placeholder="如 Vue3, Vite" />
        </label>
        <label class="form-label">
          年份
          <input v-model.trim="form.year" type="text" placeholder="如 2026" />
        </label>

        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
        <p v-if="tip" class="tip">{{ tip }}</p>

        <div class="form-actions">
          <button class="btn primary" type="submit">保存</button>
          <button class="btn" type="button" @click="cancel">取消修改</button>
        </div>
      </form>
    </article>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProjectStore } from '../stores/project.js'

const projectStore = useProjectStore()
// storeToRefs 解构 Store 数据，保持响应式
const { projects } = storeToRefs(projectStore)

const statuses = ['已完成', '进行中', '规划中']
const editing = ref(false)
const form = reactive({ id: 0, title: '', desc: '', status: '进行中', tags: [], year: '', likes: 0 })
const tagsText = ref('')
const tip = ref('')
const errorMsg = ref('')

const resetForm = () => {
  Object.assign(form, { id: 0, title: '', desc: '', status: '进行中', tags: [], year: '', likes: 0 })
  tagsText.value = ''
  errorMsg.value = ''
  tip.value = ''
}

const startCreate = () => {
  resetForm()
  editing.value = true
}

const startEdit = (p) => {
  Object.assign(form, {
    id: p.id,
    title: p.title,
    desc: p.desc,
    status: p.status,
    tags: [...p.tags],
    year: p.year,
    likes: p.likes
  })
  tagsText.value = p.tags.join(', ')
  errorMsg.value = ''
  tip.value = ''
  editing.value = true
}

// 保存：表单校验通过后调用 Store 的 action 新增或更新项目
const save = () => {
  errorMsg.value = ''
  if (!form.title.trim() || !form.desc.trim()) {
    errorMsg.value = '项目名称与项目简介不能为空'
    return
  }
  const tags = tagsText.value.split(/[,，]/).map(t => t.trim()).filter(Boolean)
  const payload = {
    title: form.title.trim(),
    desc: form.desc.trim(),
    status: form.status,
    tags,
    year: form.year.trim()
  }

  if (form.id) {
    projectStore.updateProject(form.id, payload)
    tip.value = '保存成功！项目信息已更新'
  } else {
    projectStore.addProject(payload)
    tip.value = '新增成功！项目已添加到列表'
  }
  editing.value = false
}

const remove = (id) => {
  projectStore.removeProject(id)
  tip.value = '已删除该项目'
  setTimeout(() => { tip.value = '' }, 1500)
}

// 取消修改：关闭表单，不保存任何改动
const cancel = () => {
  editing.value = false
  resetForm()
}
</script>

<style scoped>
.pe-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.pe-head h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
}

.pe-head h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.pe-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pe-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 20px;
}

.pe-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pe-info b {
  font-size: 15px;
}

.pe-sub {
  font-size: 12px;
  color: var(--text-sub);
}

.pe-ops {
  display: flex;
  gap: 8px;
}

.pe-form {
  margin-top: 16px;
}

.pe-form h3 {
  margin: 0 0 16px;
  font-size: 17px;
}

.edit-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.edit-form .form-label:nth-child(3) {
  grid-column: 1 / -1;
}

@media (max-width: 560px) {
  .edit-form {
    grid-template-columns: 1fr;
  }
}
</style>
