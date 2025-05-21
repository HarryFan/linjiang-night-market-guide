import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/pages/Map.vue')
  },
  {
    path: '/food-list',
    name: 'FoodList',
    component: () => import('@/pages/FoodList.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/pages/Favorites.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
