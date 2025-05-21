<template>
  <div class="large-layout">
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
      <el-container class="main-container">
        <el-aside width="240px">
          <el-menu
            default-active="/"
            class="sidebar-menu"
            router
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><i-ep-location /></el-icon>
                <span>區域導覽</span>
              </template>
              <el-menu-item index="/area/entrance">入口區</el-menu-item>
              <el-menu-item index="/area/middle">中段區</el-menu-item>
              <el-menu-item index="/area/end">尾段區</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><i-ep-shop /></el-icon>
                <span>美食分類</span>
              </template>
              <el-menu-item index="/category/snack">小吃</el-menu-item>
              <el-menu-item index="/category/drink">飲料</el-menu-item>
              <el-menu-item index="/category/dessert">甜點</el-menu-item>
              <el-menu-item index="/category/specialty">特色料理</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
        <el-aside width="300px" class="info-panel">
          <div class="info-panel-content">
            <h3>夜市資訊</h3>
            <div class="info-item">
              <p><strong>營業時間</strong>：每日 17:00-01:00</p>
              <p><strong>交通方式</strong>：搭乘捷運信義線至「信義安和站」下車</p>
              <p><strong>地址</strong>：台北市大安區通化街</p>
            </div>
            <div class="activity-box">
              <h4>近期活動</h4>
              <p>暫無活動</p>
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
// ElementPlus 組件已在 main.ts 中全局註冊
</script>

<style scoped lang="scss">
.large-layout {
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
      max-width: 1600px;
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
  
  .main-container {
    .el-aside {
      background-color: #fff;
      border-right: 1px solid #e6e6e6;
      
      &.info-panel {
        padding: 15px;
        
        .info-panel-content {
          h3 {
            font-size: 18px;
            margin-top: 0;
            margin-bottom: 15px;
          }
          
          .info-item {
            margin-bottom: 20px;
            
            p {
              margin: 8px 0;
            }
          }
          
          .activity-box {
            border: 1px solid #eee;
            padding: 12px;
            border-radius: 4px;
            
            h4 {
              margin-top: 0;
              margin-bottom: 10px;
            }
          }
        }
      }
      
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
}
</style>
