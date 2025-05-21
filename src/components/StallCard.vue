<template>
  <van-card
    :title="stall.name"
    :desc="stall.description"
    :thumb="stall.image"
    :tag="stall.category"
  >
    <template #footer>
      <van-button size="mini" type="primary" @click="onFavorite">收藏</van-button>
      <van-button size="mini" @click="onShare">分享</van-button>
    </template>
  </van-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Button, Card } from 'vant'

defineProps<{
  stall: {
    name: string
    description: string
    image: string
    category: string
  }
}>()

const onFavorite = () => {
  // 收藏邏輯
}

const onShare = () => {
  // 分享邏輯
}
</script>

<style scoped>
.van-card {
  margin: 16px;
}
</style>
