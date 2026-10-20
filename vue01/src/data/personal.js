import avatarImg from '../assets/avatar.jpg'

// ===== 种子数据模块（实验四） =====
// 本文件只提供 Store 初始化用的默认数据，组件一律通过 Pinia Store 读取与修改。
// 各 Store 首次创建时以这里的种子数据为默认值，之后优先从 localStorage 恢复用户改动。

// 个人信息种子数据：首页、关于页与后台管理页共享
export const personSeed = {
  avatar: avatarImg,
  name: '李建望',
  stuId: '249980614',
  className: '24计科2班',
  major: '计算机科学与技术',
  direction: 'Web 前端开发',
  email: '1903842913@qq.com',
  phone: '15803020575',
  hometown: '重庆云阳',
  hobby: '编程实践、听音乐',
  desc: '热爱编程，正在学习 Vue 前端框架，对 Web 开发有浓厚兴趣，期待成为一名专业的前端工程师。'
}

// 技能列表种子数据：首页技能搜索使用
export const skillListSeed = [
  { name: 'HTML', level: '熟练' },
  { name: 'CSS', level: '熟练' },
  { name: 'JavaScript', level: '进阶' },
  { name: 'Vue3', level: '入门' },
  { name: 'Java', level: '进阶' },
  { name: 'MySQL', level: '入门' }
]

// 项目数据种子：项目列表、项目详情、项目统计、后台编辑共用
export const projectSeed = [
  {
    id: 1,
    title: '个人主页网站',
    desc: '基于 Vue3 + Vite 搭建的个人信息展示网站，支持深色/浅色主题切换、技能搜索，并通过组件化与插槽完成页面组织。',
    status: '进行中',
    tags: ['Vue3', 'Vite', 'CSS'],
    year: '2026',
    likes: 12
  },
  {
    id: 2,
    title: '进销存管理系统',
    desc: '使用 Java + MySQL 实现的进销存管理系统，支持商品信息维护、入库出库、库存统计与销售管理等核心功能。',
    status: '已完成',
    tags: ['Java', 'MySQL'],
    year: '2025',
    likes: 8
  },
  {
    id: 3,
    title: '校园二手书交易系统',
    desc: '使用原生 JavaScript 实现的校园二手书交易系统，支持图书发布、浏览检索、购买留言等交易功能。',
    status: '已完成',
    tags: ['JavaScript', 'HTML', 'CSS'],
    year: '2026',
    likes: 5
  },
  {
    id: 4,
    title: '天气查询小程序',
    desc: '调用第三方天气接口的查询工具，展示实时天气、未来七天预报与生活指数等信息。',
    status: '规划中',
    tags: ['Vue3', 'Axios', 'API'],
    year: '2026',
    likes: 3
  }
]

// 文章数据种子：文章列表、文章详情、后台管理共用
export const articleSeed = [
  {
    id: 1,
    title: 'Vue Router 路由配置实战',
    category: '前端框架',
    date: '2026-10-09',
    summary: '结合个人主页项目，梳理基础路由、命名路由、动态路由、嵌套路由与 beforeEach 守卫的配置方法。',
    content: 'Vue Router 是 Vue 官方路由库。本次实践在个人主页项目中完成了 /home、/about、/projects 与 /admin 的路由配置：根路径通过 redirect 重定向到首页；项目详情使用 :id 动态路由匹配不同编号；项目中心与后台管理通过 children 嵌套子路由共享父级布局；访问不存在的地址由 /:pathMatch(.*)* 通配符路由渲染 404 页面。全局前置守卫 beforeEach 负责两件事：一是根据 meta.requiresAuth 拦截未登录用户并重定向到登录页，二是根据 meta.title 动态更新浏览器标题。',
    likes: 6
  },
  {
    id: 2,
    title: 'Pinia 状态管理入门',
    category: '前端框架',
    date: '2026-10-13',
    summary: '介绍 Pinia 的 state、getters、actions 三大核心，以及 storeToRefs 与 localStorage 持久化的实践用法。',
    content: 'Pinia 是 Vue 3 官方推荐的全局状态管理库。Store 由 state（响应式数据）、getters（基于 state 的派生计算值，具有缓存特性）、actions（修改 state 的唯一推荐入口，支持同步与异步）三部分构成。组件中直接解构 Store 会丢失响应性，需使用 storeToRefs 将 state 与 getters 包装为 ref 后再解构。Pinia 本身不提供持久化能力，本实验采用手动方案：state 初始化时从 localStorage 读取已保存数据作为默认值，actions 修改 state 后同步写回 localStorage，从而实现刷新后数据恢复。',
    likes: 4
  },
  {
    id: 3,
    title: '组件化开发与插槽实践',
    category: '工程实践',
    date: '2026-06-22',
    summary: '通过个人主页项目体会组件拆分、作用域插槽与自定义事件在复用场景中的配合方式。',
    content: '个人主页项目将页面拆分为 Header、Footer、PersonCard、SkillSearch、ProjectCard、StatusFilter 等组件。ProjectList 通过作用域插槽把项目与序号暴露给父组件，由父组件决定每个卡片的渲染结构；StatusFilter 通过 v-model 与 defineModel 实现筛选条件的双向同步；主题切换通过 provide/inject 由 App.vue 统一提供给所有子组件。',
    likes: 3
  }
]
