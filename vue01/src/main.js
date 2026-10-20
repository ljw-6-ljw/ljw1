import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 注册 Pinia：createPinia 必须先于 router 安装，保证路由守卫内可以正常调用 useXxxStore
const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')
