<template>
  <section class="card person-card">
    <div class="hero">
      <div class="avatar-wrap">
        <img class="avatar" :src="person.avatar" alt="头像" @error="$event.target.src='https://picsum.photos/id/64/120/120'" />
      </div>
      <div class="hero-info">
        <div class="name-row">
          <h2 class="name">{{ person.name }}</h2>
          <span class="badge">{{ person.className }}</span>
        </div>
        <p class="major">{{ person.major }}</p>
        <p class="meta-line">
          <span>学号 {{ person.stuId }}</span>
          <span class="dot">·</span>
          <span>{{ person.direction }}</span>
        </p>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-item">
        <span class="label">学号</span>
        <span class="value">{{ person.stuId }}</span>
      </div>
      <div class="info-item">
        <span class="label">班级</span>
        <span class="value">{{ person.className }}</span>
      </div>
      <div class="info-item">
        <span class="label">专业</span>
        <span class="value">{{ person.major }}</span>
      </div>
      <div class="info-item">
        <span class="label">学习方向</span>
        <span class="value">{{ person.direction }}</span>
      </div>
    </div>

    <button class="detail-btn" @click="handleToggle">
      <span>{{ isShowDetail ? '收起详情' : '展开详情' }}</span>
      <svg :class="{ rotated: isShowDetail }" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <transition name="fade">
      <div v-if="isShowDetail" class="detail">
        <div class="detail-block">
          <h4>个人简介</h4>
          <p class="bio">{{ person.desc }}</p>
        </div>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="label">邮箱</span>
            <span class="value">{{ person.email }}</span>
          </div>
          <div class="detail-item">
            <span class="label">电话</span>
            <span class="value">{{ person.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="label">家乡</span>
            <span class="value">{{ person.hometown }}</span>
          </div>
          <div class="detail-item wide">
            <span class="label">兴趣爱好</span>
            <span class="value">{{ person.hobby }}</span>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  person: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-detail'])
const isShowDetail = ref(false)

const handleToggle = () => {
  isShowDetail.value = !isShowDetail.value
  emit('toggle-detail', isShowDetail.value)
}
</script>

<style scoped>
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 26px;
  transition: background 0.35s ease, color 0.35s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.hero {
  display: flex;
  gap: 22px;
  align-items: center;
  flex-wrap: wrap;
}

.avatar-wrap {
  flex-shrink: 0;
  width: 118px;
  height: 118px;
  padding: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #fff;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.name {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
}

.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary-2), var(--primary));
}

.major {
  margin: 8px 0 4px;
  color: var(--text-sub);
  font-size: 14px;
}

.meta-line {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-sub);
  font-size: 13px;
}

.dot {
  opacity: 0.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px dashed var(--border);
}

.info-item,
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(127, 127, 127, 0.06);
}

.label {
  font-size: 12px;
  color: var(--text-sub);
}

.value {
  font-size: 14px;
  font-weight: 600;
  word-break: break-all;
}

.detail-btn {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--primary);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.detail-btn:hover {
  color: #fff;
  background: var(--primary);
  border-color: var(--primary);
}

.detail-btn svg {
  transition: transform 0.25s ease;
}

.detail-btn svg.rotated {
  transform: rotate(180deg);
}

.detail {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--border);
}

.detail-block h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  font-size: 15px;
}

.detail-block h4::before {
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

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.detail-item.wide {
  grid-column: 1 / -1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 560px) {
  .hero {
    justify-content: center;
    text-align: center;
  }

  .name-row,
  .meta-line {
    justify-content: center;
  }

  .info-grid,
  .detail-grid {
    grid-template-columns: 1fr;
  }}
</style>
