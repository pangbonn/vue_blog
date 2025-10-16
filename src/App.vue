<template>
  <div class="min-h-screen bg-white">
    <!-- Splash Screen -->
    <SplashScreen />
    
    <!-- Router View -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import SplashScreen from './components/SplashScreen.vue'
import { useCache } from './composables/useCache'

const { initializeCache } = useCache()

// Initialize cache on app start
onMounted(async () => {
  await initializeCache()
})
</script>