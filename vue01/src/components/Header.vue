<template>
  <header class="page-header">
    <div class="brand">
      <span class="brand-dot"></span>
      <h1>个人主页</h1>
    </div>

    <nav class="page-nav">
      <!-- RouterLink 声明式导航：通过命名路由跳转，路由路径修改时导航代码无需变动 -->
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        class="nav-link"
        :to="{ name: item.name }"
      >
        {{ item.label }}
      </RouterLink>

      <!-- 后台管理入口：与普通访客浏览功能区分，未认证访问会被路由守卫拦到登录页 -->
      <RouterLink class="nav-link admin-link" :to="{ name: 'admin' }">
        管理后台
      </RouterLink>
    </nav>

    <button class="theme-btn" @click="theme.toggleTheme">
      <svg v-if="theme.isDark.value" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span>{{ theme.isDark.value ? '浅色模式' : '深色模式' }}</span>
    </button>
  </header>
</template>

<script setup>
import { inject } from 'vue'

// 命名路由组织导航数据：name 与路由表中的 name 一一对应
const navItems = [
  { name: 'home', label: '个人主页' },
  { name: 'project-list', label: '项目展示' },
  { name: 'article-list', label: '文章展示' },
  { name: 'about', label: '关于我' }
]

const theme = inject('theme')
</script>

<style scoped>
.page-header {
  position: sticky;
  top: 12px;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: var(--radius);
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  transition: background 0.35s ease, color 0.35s ease;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.12);
}

.brand h1 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-nav {
  display: flex;
  gap: 4px;
  align-items: center;
  background: rgba(127, 127, 127, 0.08);
  padding: 4px;
  border-radius: 999px;
  flex-wrap: wrap;
}

/* 导航链接基础样式 */
.nav-link {
  color: var(--text-sub);
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--text);
}

/* 导航高亮一：router-link-active
   当前路由是目标路由的路径前缀时生效，
   例如访问 /projects/1 项目详情时，“项目展示”仍保持高亮色 */
.nav-link.router-link-active {
  color: var(--primary);
}

/* 导航高亮二：router-link-exact-active
   当前路由与目标路由完全匹配时生效，显示为渐变胶囊高亮 */
.nav-link.router-link-exact-active {
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  color: #fff;
  font-weight: 600;
}

/* 管理后台入口：弱化样式，与普通导航区分 */
.admin-link {
  border: 1px dashed var(--border);
  background: transparent;
}

.admin-link.router-link-exact-active {
  background: linear-gradient(135deg, #f59e0b, #f97316);
}

.theme-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 15px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: rgba(14, 165, 233, 0.08);
}
</style>
