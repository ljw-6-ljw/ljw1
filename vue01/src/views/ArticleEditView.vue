<template>
  <div class="article-edit">
    <article class="card ae-head">
      <h3>编辑文章信息</h3>
      <button class="btn primary" @click="startCreate">＋ 新增文章</button>
    </article>

    <!-- 现有文章列表 -->
    <ul class="ae-list">
      <li v-for="a in articles" :key="a.id" class="ae-item card">
        <div class="ae-info">
          <b>{{ a.title }}</b>
          <span class="ae-sub">{{ a.category }} · {{ a.date }} · 赞 {{ a.likes }}</span>
        </div>
        <div class="ae-ops">
          <button class="btn small" @click="startEdit(a)">编辑</button>
          <button class="btn small danger" @click="remove(a.id)">删除</button>
        </div>
      </li>
    </ul>

    <!-- 新增 / 编辑表单 -->
    <article v-if="editing" class="card ae-form">
      <h3>{{ form.id ? '编辑文章' : '新增文章' }}</h3>
      <form class="edit-form" @submit.prevent="save">
        <label class="form-label">
          文章标题
          <input v-model.trim="form.title" type="text" placeholder="请输入文章标题" />
        </label>
        <label class="form-label">
          分类
          <input v-model.trim="form.category" type="text" placeholder="如 前端框架" />
        </label>
        <label class="form-label">
          日期
          <input v-model.trim="form.date" type="text" placeholder="如 2026-10-13" />
        </label>
        <label class="form-label">
          摘要
          <input v-model.trim="form.summary" type="text" placeholder="一句话概括文章内容" />
        </label>
        <label class="form-label full">
          正文
          <textarea v-model.trim="form.content" rows="6" placeholder="请输入文章正文"></textarea>
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
import { useArticleStore } from '../stores/article.js'

const articleStore = useArticleStore()
// storeToRefs 解构 Store 数据，保持响应式
const { articles } = storeToRefs(articleStore)

const editing = ref(false)
const form = reactive({ id: 0, title: '', category: '', date: '', summary: '', content: '', likes: 0 })
const tip = ref('')
const errorMsg = ref('')

const resetForm = () => {
  Object.assign(form, { id: 0, title: '', category: '', date: '', summary: '', content: '', likes: 0 })
  errorMsg.value = ''
  tip.value = ''
}

const startCreate = () => {
  resetForm()
  editing.value = true
}

const startEdit = (a) => {
  Object.assign(form, {
    id: a.id,
    title: a.title,
    category: a.category,
    date: a.date,
    summary: a.summary,
    content: a.content,
    likes: a.likes
  })
  errorMsg.value = ''
  tip.value = ''
  editing.value = true
}

// 保存：表单校验通过后调用 Store 的 action 新增或更新文章
const save = () => {
  errorMsg.value = ''
  if (!form.title.trim() || !form.content.trim()) {
    errorMsg.value = '文章标题与正文不能为空'
    return
  }
  const payload = {
    title: form.title.trim(),
    category: form.category.trim() || '未分类',
    date: form.date.trim() || '2026-10-13',
    summary: form.summary.trim(),
    content: form.content.trim()
  }

  if (form.id) {
    articleStore.updateArticle(form.id, payload)
    tip.value = '保存成功！文章信息已更新'
  } else {
    articleStore.addArticle(payload)
    tip.value = '新增成功！文章已添加到列表'
  }
  editing.value = false
}

const remove = (id) => {
  articleStore.removeArticle(id)
  tip.value = '已删除该文章'
  setTimeout(() => {
    tip.value = ''
  }, 1500)
}

const cancel = () => {
  editing.value = false
  resetForm()
}
</script>

<style scoped>
.ae-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.ae-head h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
}

.ae-head h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.ae-list {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ae-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px 20px;
}

.ae-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ae-info b {
  font-size: 15px;
}

.ae-sub {
  font-size: 12px;
  color: var(--text-sub);
}

.ae-ops {
  display: flex;
  gap: 8px;
}

.ae-form {
  margin-top: 16px;
}

.ae-form h3 {
  margin: 0 0 16px;
  font-size: 17px;
}

.edit-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.edit-form .form-label.full {
  grid-column: 1 / -1;
}

@media (max-width: 560px) {
  .edit-form {
    grid-template-columns: 1fr;
  }
}
</style>
