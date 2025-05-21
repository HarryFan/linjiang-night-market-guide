import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 收藏攤位的狀態管理
 */
export const useFavoritesStore = defineStore('favorites', () => {
  // 儲存收藏的攤位ID
  const favoriteIds = ref<string[]>([])

  // 從 localStorage 初始化收藏清單
  const initializeFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      favoriteIds.value = JSON.parse(savedFavorites)
    }
  }

  // 添加收藏
  const addFavorite = (id: string) => {
    if (!favoriteIds.value.includes(id)) {
      favoriteIds.value.push(id)
      saveFavorites()
    }
  }

  // 移除收藏
  const removeFavorite = (id: string) => {
    const index = favoriteIds.value.indexOf(id)
    if (index !== -1) {
      favoriteIds.value.splice(index, 1)
      saveFavorites()
    }
  }

  // 切換收藏狀態
  const toggleFavorite = (id: string) => {
    if (favoriteIds.value.includes(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  // 檢查是否已收藏
  const isFavorite = (id: string) => {
    return favoriteIds.value.includes(id)
  }

  // 儲存到 localStorage
  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
  }

  return {
    favoriteIds,
    initializeFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  }
})
