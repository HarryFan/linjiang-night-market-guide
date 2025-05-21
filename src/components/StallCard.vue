<template>
  <div class="stall-card-container">
    <div class="stall-image">
      <img :src="stall.image" :alt="stall.name" />
      <span class="category-tag">{{ stall.category }}</span>
    </div>
    <div class="stall-content">
      <h3 class="stall-name">{{ stall.name }}</h3>
      <div class="rating-container">
        <van-rate v-model="stall.rating" readonly allow-half void-icon="star" void-color="#eee" />
        <span class="rating-text">{{ stall.rating }}分</span>
      </div>
      <div class="tags-container">
        <van-tag v-for="tag in stall.tags" :key="tag" type="primary" plain class="tag">{{ tag }}</van-tag>
      </div>
      <p class="description">{{ stall.description }}</p>
      <div class="business-info">
        <p><van-icon name="clock-o" /> {{ stall.openHours }}</p>
        <p><van-icon name="location-o" /> {{ stall.address }}</p>
      </div>
      <div class="actions">
        <van-button size="small" type="primary" icon="like-o" @click="onFavorite">收藏</van-button>
        <van-button size="small" icon="share-o" @click="onShare">分享</van-button>
        <van-button size="small" type="info" icon="eye-o" @click="onViewDetail">查看詳情</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { Button, Icon, Rate, Tag } from 'vant'

interface StallProps {
  id: number
  name: string
  description: string
  image: string
  category: string
  rating: number
  tags: string[]
  openHours: string
  address: string
}

const props = defineProps<{
  stall: StallProps
}>()

const emit = defineEmits(['favorite', 'share', 'view-detail'])

const onFavorite = () => {
  emit('favorite', props.stall)
}

const onShare = () => {
  emit('share', props.stall)
}

const onViewDetail = () => {
  emit('view-detail', props.stall)
}
</script>

<style scoped>
.stall-card-container {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.stall-card-container:hover {
  transform: translateY(-4px);
}

.stall-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.stall-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.stall-content {
  padding: 16px;
}

.stall-name {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
  color: #323233;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.rating-text {
  margin-left: 8px;
  color: #ff9900;
  font-size: 14px;
}

.tags-container {
  margin-bottom: 12px;
}

.tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

.description {
  margin: 0 0 12px;
  font-size: 14px;
  color: #646566;
  line-height: 1.5;
}

.business-info {
  margin-bottom: 16px;
}

.business-info p {
  display: flex;
  align-items: center;
  margin: 4px 0;
  font-size: 13px;
  color: #969799;
}

.business-info .van-icon {
  margin-right: 6px;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions .van-button {
  flex: 1;
}
</style>
