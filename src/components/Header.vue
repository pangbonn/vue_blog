<template>
  <header class="sticky top-0 z-40 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Left Side - Back Button & Logo -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Back Button - Show when showBackButton is true -->
          <button 
            v-if="showBackButton" 
            @click="goBack" 
            class="text-gray-600 hover:text-gray-900"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <!-- Hamburger Menu - Mobile only, show when no back button -->
          <button v-else class="md:hidden text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          <router-link to="/" class="flex items-center gap-2">
            <img src="/navibar.png" alt="WongShare" class="h-10 w-auto" />
          </router-link>
        </div>
        
        <!-- Search Bar - Hidden on mobile -->
        <!-- <div class="hidden md:flex flex-1 max-w-lg mx-8">
          <div class="relative w-full">
            <input 
              type="text" 
              placeholder="Search..." 
              class="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <svg class="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div> -->
        
        <!-- Right Side -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Search Icon - Mobile only -->
          <!-- <button class="md:hidden text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button> -->
          
          <!-- Write Button - Hidden on mobile -->
          <!-- <button class="hidden sm:block text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </button> -->
          
          <!-- Notifications -->
          <!-- <button class="text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 13h6v-2H4v2zM4 7h6V5H4v2z"></path>
            </svg>
          </button> -->
          
          <!-- Theme Toggle -->
          <!-- <button class="text-gray-600 hover:text-gray-900">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button> -->
          
          <!-- Profile -->
          <img 
            src="/spashscreen.png" 
            alt="Profile" 
            class="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

// Props
defineProps<{
  showBackButton?: boolean
}>()

const router = useRouter()

// Methods
const goBack = () => {
  router.back()
}
</script>
