<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>通化夜市導覽</h1>
      <p class="subtitle">美食、文化與人情味的集合</p>
    </div>
    
    <div class="intro-section">
      <h2>關於通化夜市</h2>
      <p>通化夜市位於台北市大安區，是在地人與觀光客的美食天堂，提供豐富的台灣小吃、特色餐點與各式商品。</p>
    </div>
    
    <div class="featured-section">
      <h2>推薦美食</h2>
      <div class="stall-list">
        <div v-for="stall in featuredStalls" :key="stall.id" class="stall-card">
          <div class="stall-image" :style="{ backgroundImage: `url(${stall.image})` }"></div>
          <div class="stall-info">
            <h3>{{ stall.name }}</h3>
            <div class="rating">
              <el-rate v-model="stall.rating" disabled text-color="#ff9900" />
            </div>
            <p class="stall-description">{{ stall.description }}</p>
            <div class="stall-tags">
              <el-tag v-for="tag in stall.tags" :key="tag" size="small" class="tag">{{ tag }}</el-tag>
            </div>
            <div class="stall-actions">
              <el-button size="small" type="primary" @click="goToMap(stall)">地圖位置</el-button>
              <el-button size="small" @click="goToDetail(stall)">詳細資訊</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="info-section">
      <h2>夜市資訊</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-icon">
            <i class="el-icon-time"></i>
          </div>
          <h3>營業時間</h3>
          <p>週一至週日 17:00 - 01:00</p>
        </div>
        <div class="info-item">
          <div class="info-icon">
            <i class="el-icon-location"></i>
          </div>
          <h3>位置</h3>
          <p>台北市大安區通化街（通化夜市）</p>
        </div>
        <div class="info-item">
          <div class="info-icon">
            <i class="el-icon-guide"></i>
          </div>
          <h3>交通方式</h3>
          <p>捷運：信義安和站（1號出口）</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Stall } from '@/types/stall'
import stallsData from '@/assets/stalls.json'

const router = useRouter()
const featuredStalls = ref<Stall[]>([])

onMounted(() => {
  // 選取評分最高的攤位作為推薦
  featuredStalls.value = [...stallsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)
})

const goToMap = (stall: Stall) => {
  router.push({ 
    path: '/map',
    query: { stallId: stall.id }
  })
}

const goToDetail = (stall: Stall) => {
  router.push({ 
    path: '/food-list',
    query: { stallId: stall.id }
  })
}
</script>

<style scoped lang="scss">
.home-page {
  padding-bottom: 30px;
}

.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 80px 20px;
  margin-bottom: 30px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
  }
}

.intro-section {
  max-width: 800px;
  margin: 0 auto 40px;
  text-align: center;
  padding: 0 20px;
  
  h2 {
    margin-bottom: 15px;
    font-size: 1.8rem;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

.featured-section, .info-section {
  max-width: 1000px;
  margin: 0 auto 50px;
  padding: 0 20px;
  
  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.8rem;
  }
}

.stall-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.stall-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .stall-image {
    height: 180px;
    background-size: cover;
    background-position: center;
  }
  
  .stall-info {
    padding: 15px;
    
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .rating {
      margin-bottom: 10px;
    }
    
    .stall-description {
      margin-bottom: 15px;
      font-size: 0.9rem;
      color: #666;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .stall-tags {
      margin-bottom: 15px;
      
      .tag {
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    
    .stall-actions {
      display: flex;
      justify-content: space-between;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  
  .info-item {
    background-color: #f5f7fa;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    
    .info-icon {
      font-size: 2rem;
      color: #409eff;
      margin-bottom: 10px;
    }
    
    h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    p {
      margin: 0;
      color: #666;
    }
  }
}

@media (max-width: 767px) {
  .hero-section {
    padding: 60px 15px;
    
    h1 {
      font-size: 2rem;
    }
  }
  
  .stall-list {
    grid-template-columns: 1fr;
  }
}
</style>
