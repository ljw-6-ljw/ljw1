<template>
  <section class="login-view">
    <article class="card login-card">
      <h2>身份认证</h2>
      <p class="login-sub">登录后进入后台管理页面（演示账号 admin / 密码 123456）</p>

      <form class="login-form" @submit.prevent="onSubmit">
        <label class="form-label">
          账号
          <input v-model.trim="account" type="text" placeholder="请输入账号" />
        </label>
        <label class="form-label">
          密码
          <input v-model="password" type="password" placeholder="请输入密码" />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="form-actions">
          <button class="btn primary" type="submit">登 录</button>
          <button class="btn" type="button" @click="router.push({ name: 'home' })">取消</button>
        </div>
      </form>
    </article>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const account = ref('')
const password = ref('')
const error = ref('')

const onSubmit = () => {
  // 身份认证：调用 User Store 的 login action 校验并持久化登录状态
  if (userStore.login(account.value, password.value)) {
    // 登录成功：replace 跳转到原目标地址（路由守卫记录的 redirect），
    // 避免回退时重新回到登录页
    router.replace(route.query.redirect || { name: 'admin' })
  } else {
    error.value = '账号或密码错误，请重试'
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 420px;
}

.login-card h2 {
  margin: 0 0 8px;
  font-size: 22px;
  text-align: center;
}

.login-sub {
  margin: 0 0 20px;
  color: var(--text-sub);
  font-size: 13px;
  text-align: center;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
