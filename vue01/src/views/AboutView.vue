<template>
  <section class="about-view">
    <div class="page-head">
      <h2 class="page-title">关于我</h2>
      <p class="page-sub">通过基础路由 /about 访问的独立页面，介绍个人情况与联系方式</p>
    </div>

    <article class="card about-card">
      <h3>个人简介</h3>
      <p class="bio">{{ person.desc }}</p>
    </article>

    <article class="card about-card">
      <h3>基本信息</h3>
      <ul class="about-list">
        <li><span>姓名</span><b>{{ person.name }}</b></li>
        <li><span>学号</span><b>{{ person.stuId }}</b></li>
        <li><span>班级</span><b>{{ person.className }}</b></li>
        <li><span>专业</span><b>{{ person.major }}</b></li>
        <li><span>学习方向</span><b>{{ person.direction }}</b></li>
        <li><span>邮箱</span><b>{{ person.email }}</b></li>
        <li><span>家乡</span><b>{{ person.hometown }}</b></li>
        <li><span>兴趣爱好</span><b>{{ person.hobby }}</b></li>
      </ul>
    </article>

    <div class="about-actions">
      <!-- 命名路由 + 编程式导航示例：返回首页 -->
      <button class="btn primary" @click="router.push({ name: 'home' })">返回首页</button>
      <button class="btn" @click="router.go(-1)">返回上一页</button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '../stores/profile.js'

const router = useRouter()
const profileStore = useProfileStore()
const { person } = storeToRefs(profileStore)
</script>

<style scoped>
.about-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-card h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  font-size: 16px;
}

.about-card h3::before {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--primary-2), var(--primary));
}

.bio {
  margin: 0;
  color: var(--text-sub);
  font-size: 14px;
  line-height: 1.9;
  text-align: justify;
}

.about-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.about-list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.06);
  font-size: 14px;
}

.about-list span {
  color: var(--text-sub);
}

.about-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .about-list {
    grid-template-columns: 1fr;
  }
}
</style>
