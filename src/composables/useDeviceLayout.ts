import { ref, onMounted, onUnmounted, computed } from 'vue'

export type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large'

/**
 * 裝置類型判斷 composable
 * 自動偵測視窗尺寸並返回對應的裝置類型
 * - mobile: < 768px
 * - tablet: 768px ~ 1023px
 * - desktop: 1024px ~ 1439px
 * - large: >= 1440px
 */
export default function useDeviceLayout() {
  const windowWidth = ref(window.innerWidth)
  
  const updateWidth = () => {
    windowWidth.value = window.innerWidth
  }
  
  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })
  
  const deviceType = computed<DeviceType>(() => {
    if (windowWidth.value < 768) return 'mobile'
    if (windowWidth.value < 1024) return 'tablet'
    if (windowWidth.value < 1440) return 'desktop'
    return 'large'
  })
  
  return {
    windowWidth,
    deviceType
  }
}
