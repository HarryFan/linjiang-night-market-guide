<template>
  <div class="map-page">
    <div class="map-container" ref="mapContainer"></div>
    
    <div class="map-controls">
      <div class="search-box">
        <el-input
          v-model="searchKeyword"
          placeholder="搜尋攤位"
          clearable
          prefix-icon="el-icon-search"
          @input="filterStalls"
        />
      </div>
      
      <div class="filter-options">
        <el-select v-model="categoryFilter" placeholder="分類" @change="filterStalls" clearable>
          <el-option label="小吃" value="snack" />
          <el-option label="飲料" value="drink" />
          <el-option label="甜點" value="dessert" />
          <el-option label="特色料理" value="specialty" />
        </el-select>
        
        <el-select v-model="areaFilter" placeholder="區域" @change="filterStalls" clearable>
          <el-option label="入口區" value="entrance" />
          <el-option label="中段區" value="middle" />
          <el-option label="尾段區" value="end" />
        </el-select>
      </div>
    </div>
    
    <div class="stall-preview" v-if="selectedStall">
      <div class="stall-preview-header">
        <h3>{{ selectedStall.name }}</h3>
        <el-button type="text" @click="closePreview">
          <i class="el-icon-close"></i>
        </el-button>
      </div>
      
      <div class="stall-preview-body">
        <div class="stall-image" :style="{ backgroundImage: `url(${selectedStall.image})` }"></div>
        
        <div class="stall-info">
          <div class="rating">
            <el-rate v-model="selectedStall.rating" disabled text-color="#ff9900" />
          </div>
          
          <div class="tags">
            <el-tag v-for="tag in selectedStall.tags" :key="tag" size="small" class="tag">{{ tag }}</el-tag>
          </div>
          
          <p class="description">{{ selectedStall.description }}</p>
          
          <div class="detail-item">
            <strong>營業時間：</strong> {{ selectedStall.openHours }}
          </div>
          
          <div class="detail-item">
            <strong>地址：</strong> {{ selectedStall.address }}
          </div>
          
          <div class="actions">
            <el-button type="primary" size="small" @click="goToDetail(selectedStall)">
              查看詳情
            </el-button>
            <el-button size="small" @click="toggleFavorite(selectedStall)">
              <i :class="isFavorite(selectedStall.id) ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
              {{ isFavorite(selectedStall.id) ? '已收藏' : '收藏' }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import type { Stall } from '@/types/stall'
import stallsData from '@/assets/stalls.json'

// 初始化路由和收藏攤位 store
const router = useRouter()
const route = useRoute()
const favoritesStore = useFavoritesStore()

// 地圖相關參考
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<google.maps.Map | null>(null)
const markers = ref<{ [key: string]: google.maps.Marker }>({})

// 搜尋與過濾
const searchKeyword = ref('')
const categoryFilter = ref('')
const areaFilter = ref('')
const filteredStalls = ref<Stall[]>([...stallsData])
const selectedStall = ref<Stall | null>(null)

// 監聽 URL 參數
watchEffect(() => {
  if (route.query.stallId) {
    const stallId = route.query.stallId as string
    const stall = stallsData.find(s => s.id === stallId)
    if (stall) {
      selectedStall.value = stall
      if (map.value && markers.value[stallId]) {
        map.value.setCenter({
          lat: stall.location.lat,
          lng: stall.location.lng
        })
        map.value.setZoom(19)
        // 觸發 marker 的點擊事件
        google.maps.event.trigger(markers.value[stallId], 'click')
      }
    }
  }
})

// 初始化地圖
const initMap = () => {
  // 模擬 Google Maps API，實際使用時需要替換為真實的 API 實現
  // 注意：這只是一個簡單的演示，實際專案需要整合真實的地圖 API
  
  // 創建地圖中心點（通化夜市中心）
  const nightMarketCenter = {
    lat: 25.0327,
    lng: 121.5603
  }
  
  // 初始化地圖
  if (mapContainer.value) {
    // 這裡只是示意，實際需要使用 Google Maps 或 OpenStreetMap API
    console.log('初始化地圖，中心點：', nightMarketCenter)
    
    // 設置攤位標記
    initMarkers()
  }
}

// 初始化地圖標記
const initMarkers = () => {
  stallsData.forEach(stall => {
    // 這裡只是示意，實際需要創建真實的地圖標記
    console.log('添加標記：', stall.name, stall.location)
    
    // 將 marker 添加到 markers 物件中
    markers.value[stall.id] = {} as google.maps.Marker
  })
}

// 過濾攤位
const filterStalls = () => {
  filteredStalls.value = stallsData.filter(stall => {
    // 搜尋關鍵字過濾
    const keywordMatch = !searchKeyword.value || 
      stall.name.includes(searchKeyword.value) || 
      stall.description.includes(searchKeyword.value) ||
      stall.tags.some(tag => tag.includes(searchKeyword.value))
    
    // 分類過濾
    const categoryMatch = !categoryFilter.value || stall.category === categoryFilter.value
    
    // 區域過濾
    const areaMatch = !areaFilter.value || stall.area === areaFilter.value
    
    return keywordMatch && categoryMatch && areaMatch
  })
  
  // 更新地圖上的標記顯示
  updateMarkers()
}

// 更新地圖標記顯示
const updateMarkers = () => {
  // 實際專案中需要處理標記的顯示/隱藏
  console.log('更新地圖標記', filteredStalls.value.length)
}

// 關閉攤位預覽
const closePreview = () => {
  selectedStall.value = null
}

// 導航到攤位詳情頁
const goToDetail = (stall: Stall) => {
  router.push({ 
    path: '/food-list',
    query: { stallId: stall.id }
  })
}

// 切換收藏狀態
const toggleFavorite = (stall: Stall) => {
  favoritesStore.toggleFavorite(stall.id)
}

// 檢查是否已收藏
const isFavorite = (id: string) => {
  return favoritesStore.isFavorite(id)
}

// 生命週期鉤子
onMounted(() => {
  favoritesStore.initializeFavorites()
  initMap()
  
  // 監聽視窗大小變化，調整地圖大小
  window.addEventListener('resize', updateMapSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateMapSize)
})

// 更新地圖大小
const updateMapSize = () => {
  if (map.value) {
    google.maps.event.trigger(map.value, 'resize')
  }
}
</script>

<style scoped lang="scss">
.map-page {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.map-container {
  flex: 1;
  width: 100%;
  background-color: #f5f5f5;
  // 實際專案中移除這些佔位樣式
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbb;
  font-size: 20px;
  &::after {
    content: '這裡將顯示通化夜市地圖';
  }
}

.map-controls {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 350px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  
  .search-box {
    margin-bottom: 10px;
  }
  
  .filter-options {
    display: flex;
    gap: 10px;
    
    .el-select {
      width: 100%;
    }
  }
}

.stall-preview {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 10;
  
  .stall-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background-color: #f5f7fa;
    
    h3 {
      margin: 0;
      font-size: 16px;
    }
  }
  
  .stall-preview-body {
    .stall-image {
      height: 150px;
      background-size: cover;
      background-position: center;
    }
    
    .stall-info {
      padding: 15px;
      
      .rating {
        margin-bottom: 10px;
      }
      
      .tags {
        margin-bottom: 10px;
        
        .tag {
          margin-right: 4px;
          margin-bottom: 4px;
        }
      }
      
      .description {
        font-size: 14px;
        margin-bottom: 10px;
        color: #666;
      }
      
      .detail-item {
        font-size: 14px;
        margin-bottom: 8px;
      }
      
      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }
    }
  }
}

@media (max-width: 767px) {
  .map-controls {
    width: calc(100% - 40px);
    
    .filter-options {
      flex-direction: column;
    }
  }
  
  .stall-preview {
    width: calc(100% - 40px);
    left: 20px;
    right: 20px;
  }
}
</style>
