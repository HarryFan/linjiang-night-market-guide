<template>
  <div class="desktop-layout">
    <el-container>
      <el-header height="60px">
        <div class="header-content">
          <div class="logo">通化夜市導覽</div>
          <el-menu
            mode="horizontal"
            router
            default-active="/"
            class="header-menu"
          >
            <el-menu-item index="/">首頁</el-menu-item>
            <el-menu-item index="/map">地圖</el-menu-item>
            <el-menu-item index="/food-list">美食</el-menu-item>
            <el-menu-item index="/favorites">收藏</el-menu-item>
            <el-menu-item index="/about">關於</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// ElementPlus 組件已在 main.ts 中全局註冊
</script>

<style scoped lang="scss">
.desktop-layout {
  height: 100vh;
  
  .el-container {
    height: 100%;
  }
  
  .el-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    padding: 0;
    
    .header-content {
      display: flex;
      align-items: center;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      
      .logo {
        font-size: 20px;
        font-weight: bold;
        margin-right: 40px;
      }
      
      .header-menu {
        border-bottom: none;
      }
    }
  }
  
  .el-main {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    overflow-y: auto;
  }
}
</style>
