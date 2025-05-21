<template>
  <div>
    <StallCard v-for="stall in stalls" :key="stall.id" :stall="stall" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StallCard from '../components/StallCard.vue'

interface Stall {
  id: number
  name: string
  description: string
  image: string
  category: string
}

const stalls = ref<Stall[]>([])

onMounted(async () => {
  const response = await fetch('/src/assets/stalls.json')
  stalls.value = await response.json()
})
</script>
