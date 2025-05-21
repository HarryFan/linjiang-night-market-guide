<template>
  <div class="mobile-layout">
    <div class="mobile-content">
      <router-view />
    </div>
    <div class="mobile-nav">
      <van-tabbar v-model="activeTab" route>
        <van-tabbar-item icon="home-o" to="/">首頁</van-tabbar-item>
        <van-tabbar-item icon="location-o" to="/map">地圖</van-tabbar-item>
        <van-tabbar-item icon="shop-o" to="/food-list">美食</van-tabbar-item>
        <van-tabbar-item icon="star-o" to="/favorites">收藏</van-tabbar-item>
        <van-tabbar-item icon="info-o" to="/about">關於</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tabbar, TabbarItem } from 'vant'

const activeTab = ref(0)
</script>

<style scoped lang="scss">
.mobile-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.mobile-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 50px;
}

.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
