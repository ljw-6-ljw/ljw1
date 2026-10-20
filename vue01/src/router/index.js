import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.js'

// 路由表：基础路由 + 动态路由 + 嵌套路由 + 404 通配符路由
// 每个路由通过 name 命名，便于编程式导航与 redirect 引用；meta 保存页面标题与权限
const routes = [
  {
    path: '/',
    // redirect：访问根路径时默认跳转到首页
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '个人主页' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: '关于我' }
  },
  {
    // 项目中心：父路由只提供共享布局，子路由渲染在父组件内部的 RouterView 中
    path: '/projects',
    name: 'project-center',
    component: () => import('../views/ProjectCenterView.vue'),
    redirect: { name: 'project-list' },
    meta: { title: '项目展示' },
    children: [
      {
        // 空路径子路由：访问 /projects 时直接渲染项目列表
        path: '',
        name: 'project-list',
        component: () => import('../views/ProjectListView.vue'),
        meta: { title: '项目列表' }
      },
      {
        path: 'stats',
        name: 'project-stats',
        component: () => import('../views/ProjectStatsView.vue'),
        meta: { title: '项目统计' }
      },
      {
        // 动态路由：:id 为动态片段，一条规则匹配所有项目详情地址
        path: ':id',
        name: 'project-detail',
        component: () => import('../views/ProjectDetailView.vue'),
        meta: { title: '项目详情' }
      }
    ]
  },
  {
    // 文章中心：文章列表与文章详情
    path: '/articles',
    name: 'article-list',
    component: () => import('../views/ArticleListView.vue'),
    meta: { title: '文章展示' }
  },
  {
    // 文章详情：动态路由匹配文章编号
    path: '/articles/:id',
    name: 'article-detail',
    component: () => import('../views/ArticleDetailView.vue'),
    meta: { title: '文章详情' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '身份认证' }
  },
  {
    // 后台管理：requiresAuth 标记需要认证，由 beforeEach 守卫控制访问
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    redirect: { name: 'profile-edit' },
    meta: { title: '后台管理', requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'profile-edit',
        component: () => import('../views/ProfileEditView.vue'),
        meta: { title: '编辑个人简介', requiresAuth: true }
      },
      {
        path: 'projects',
        name: 'project-edit',
        component: () => import('../views/ProjectEditView.vue'),
        meta: { title: '编辑项目信息', requiresAuth: true }
      },
      {
        path: 'articles',
        name: 'article-edit',
        component: () => import('../views/ArticleEditView.vue'),
        meta: { title: '编辑文章信息', requiresAuth: true }
      }
    ]
  },
  {
    // 404 通配符路由：匹配所有未定义路径（:pathMatch(.*)* 捕获剩余路径）
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]

const router = createRouter({
  // History 模式：URL 简洁无 #；如需 Hash 模式改为 createWebHashHistory() 即可
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 切换页面后回到页面顶部
  scrollBehavior() {
    return { top: 0 }
  }
})

// 全局前置守卫 beforeEach：每次路由跳转前执行
router.beforeEach((to) => {
  // 注意：在守卫函数内部调用 useUserStore，而不是模块顶层，
  // 确保 Pinia 已完成初始化（main.js 中 createPinia 先于 router 安装）
  const userStore = useUserStore()

  // 1. 后台访问控制：访问 requiresAuth 页面且未登录时，跳转到登录页并记录原目标
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // 2. 页面标题更新：根据目标路由 meta.title 动态修改浏览器标题
  document.title = to.meta.title
    ? `${to.meta.title} - 李建望的个人主页`
    : '李建望的个人主页'
})

export default router
