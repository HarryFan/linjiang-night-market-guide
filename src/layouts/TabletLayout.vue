<template>
  <div class="tablet-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="/"
          class="sidebar-menu"
          router
        >
          <el-menu-item index="/">
            <el-icon><i-ep-home /></el-icon>
            <span>首頁</span>
          </el-menu-item>
          <el-menu-item index="/map">
            <el-icon><i-ep-location /></el-icon>
            <span>地圖</span>
          </el-menu-item>
          <el-menu-item index="/food-list">
            <el-icon><i-ep-shop /></el-icon>
            <span>美食</span>
          </el-menu-item>
          <el-menu-item index="/favorites">
            <el-icon><i-ep-star /></el-icon>
            <span>收藏</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <el-icon><i-ep-info-filled /></el-icon>
            <span>關於</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// ElementPlus 組件已在 main.ts 中全局註冊
</script>

<style scoped lang="scss">
.tablet-layout {
  height: 100vh;
  
  .el-container {
    height: 100%;
  }
  
  .el-aside {
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
    
    .sidebar-menu {
      height: 100%;
      border-right: none;
    }
  }
  
  .el-main {
    padding: 20px;
    overflow-y: auto;
  }
}
</style>
