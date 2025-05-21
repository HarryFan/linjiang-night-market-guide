<template>
  <div class="food-list">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="沒有更多了"
        @load="onLoad"
      >
        <div class="stall-grid">
          <StallCard
            v-for="stall in stalls"
            :key="stall.id"
            :stall="stall"
            class="stall-card"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import StallCard from '../components/StallCard.vue'

interface Stall {
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

const stalls = ref<Stall[]>([])
const loading = ref(false)
const finished = ref(false)
const isRefreshing = ref(false)
const currentPage = ref(1)
const pageSize = 10

const loadStalls = async (page: number) => {
  try {
    const response = await fetch('/src/assets/stalls.json')
    const data = await response.json()
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  } catch (error) {
    showToast('加載數據失敗')
    return []
  }
}

const onLoad = async () => {
  loading.value = true
  const newStalls = await loadStalls(currentPage.value)
  if (newStalls.length < pageSize) {
    finished.value = true
  }
  stalls.value.push(...newStalls)
  currentPage.value++
  loading.value = false
}

const onRefresh = async () => {
  try {
    currentPage.value = 1
    finished.value = false
    stalls.value = await loadStalls(1)
    showToast('刷新成功')
  } catch (error) {
    showToast('刷新失敗')
  } finally {
    isRefreshing.value = false
  }
}

onMounted(async () => {
  stalls.value = await loadStalls(1)
})
</script>

<style scoped>
.food-list {
  background-color: var(--van-background);
  min-height: 100vh;
  padding: 12px;
}

.stall-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 16px;
}

.stall-card {
  height: 100%;
}

@media (max-width: 768px) {
  .stall-grid {
    grid-template-columns: 1fr;
  }

  .food-list {
    padding: 8px;
  }
}
</style>
