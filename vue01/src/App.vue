<template>
  <div class="app-wrap" :class="isDark ? 'dark' : 'light'">
    <Header />

    <main class="main-content">
      <!-- 路由出口：根据当前 URL 匹配到的路由，渲染对应的页面组件 -->
      <RouterView />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// 主题状态：仍由 App.vue 统一管理，通过 provide/inject 提供给所有子页面
const isDark = ref(false)
const toggleTheme = () => {
  isDark.value = !isDark.value
}
provide('theme', {
  isDark,
  toggleTheme
})
</script>

<style>
:root {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  --radius: 16px;
}

/* 主题变量：class 加在 .app-wrap 上，通过 CSS 变量传递给所有子组件 */
.light {
  --bg: #eef2f7;
  --bg-grad: linear-gradient(160deg, #f4f7fb 0%, #e3eaf3 100%);
  --bg-card: #ffffff;
  --text: #1f2d3d;
  --text-sub: #7b8794;
  --border: #e6eaf2;
  --primary: #0ea5e9;
  --primary-2: #10b981;
  --shadow: 0 4px 20px rgba(31, 45, 61, 0.08);
}

.dark {
  --bg: #0f172a;
  --bg-grad: linear-gradient(160deg, #101b33 0%, #0b1222 100%);
  --bg-card: #1b2437;
  --text: #e2e8f0;
  --text-sub: #94a3b8;
  --border: #2c3a52;
  --primary: #38bdf8;
  --primary-2: #34d399;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
}

.app-wrap {
  max-width: 920px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  min-height: 100vh;
  background-color: var(--bg);
  background-image: var(--bg-grad);
  color: var(--text);
  transition: background-color 0.35s ease, color 0.35s ease;
}

.main-content {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ===== 各路由页面共用的基础样式 ===== */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 26px;
  transition: background 0.35s ease, color 0.35s ease;
}

.page-head {
  padding: 6px 2px 2px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-title::before {
  content: '';
  width: 6px;
  height: 24px;
  border-radius: 3px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.page-sub {
  margin: 10px 0 0;
  color: var(--text-sub);
  font-size: 13px;
}

/* 嵌套子路由导航（项目中心 / 后台管理共用） */
.sub-nav {
  display: flex;
  gap: 8px;
  margin-top: 18px;
  flex-wrap: wrap;
}

.sub-link {
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-sub);
  font-size: 13px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.sub-link:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.sub-link.router-link-exact-active {
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}

/* 通用按钮 */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid var(--primary);
  background: transparent;
  color: var(--primary);
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn:hover {
  filter: brightness(1.08);
  transform: translateY(-1px);
}

.btn.primary {
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}

.btn.small {
  padding: 5px 13px;
  font-size: 12px;
}

.btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

/* 表单 */
.form-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--text-sub);
}

.form-label input,
.form-label textarea,
.form-label select {
  margin-top: 2px;
  padding: 9px 13px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.05);
  color: var(--text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-label input:focus,
.form-label textarea:focus,
.form-label select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.tip {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--primary-2);
}

.error {
  margin: 10px 0 0;
  font-size: 13px;
  color: #ef4444;
}
</style>
