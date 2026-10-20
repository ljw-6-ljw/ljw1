<template>
  <div class="profile-edit card">
    <h3>编辑个人简介</h3>
    <p class="form-sub">修改后点击保存，个人主页、关于页等内容将同步更新</p>

    <form class="edit-form" @submit.prevent="save">
      <label class="form-label">
        姓名
        <input v-model.trim="form.name" type="text" placeholder="请输入姓名" />
      </label>
      <label class="form-label">
        学号
        <input v-model.trim="form.stuId" type="text" placeholder="请输入学号" />
      </label>
      <label class="form-label">
        班级
        <input v-model.trim="form.className" type="text" placeholder="请输入班级" />
      </label>
      <label class="form-label">
        专业
        <input v-model.trim="form.major" type="text" placeholder="请输入专业" />
      </label>
      <label class="form-label">
        学习方向
        <input v-model.trim="form.direction" type="text" placeholder="请输入学习方向" />
      </label>
      <label class="form-label">
        邮箱
        <input v-model.trim="form.email" type="text" placeholder="请输入邮箱" />
      </label>
      <label class="form-label">
        个人简介
        <textarea v-model.trim="form.desc" rows="3" placeholder="请输入个人简介"></textarea>
      </label>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="tip" class="tip">{{ tip }}</p>

      <div class="form-actions">
        <button class="btn primary" type="submit">保存修改</button>
        <button class="btn" type="button" @click="cancel">取消修改</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'

const router = useRouter()
const profileStore = useProfileStore()

// 表单使用副本编辑：未保存前不影响页面展示的数据
const form = reactive({ ...profileStore.person })
const tip = ref('')
const errorMsg = ref('')

// 保存：先做基础表单校验，通过后调用 Profile Store 的 action 写回并持久化
const save = () => {
  errorMsg.value = ''
  if (!form.name.trim() || !form.stuId.trim()) {
    errorMsg.value = '姓名与学号不能为空'
    return
  }
  profileStore.updateProfile({ ...form })
  tip.value = '保存成功！个人主页内容已更新，即将返回首页…'
  setTimeout(() => {
    tip.value = ''
    router.push({ name: 'home' })
  }, 1200)
}

// 取消修改：还原表单并返回上一页
const cancel = () => {
  Object.assign(form, profileStore.person)
  tip.value = '已取消修改'
  router.go(-1)
}
</script>

<style scoped>
.profile-edit {
  margin-top: 18px;
}

.profile-edit h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 18px;
}

.profile-edit h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.form-sub {
  margin: 0 0 18px;
  color: var(--text-sub);
  font-size: 13px;
}

.edit-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.edit-form .form-label:nth-last-child(-n + 3) {
  grid-column: 1 / -1;
}

@media (max-width: 560px) {
  .edit-form {
    grid-template-columns: 1fr;
  }
}
</style>
