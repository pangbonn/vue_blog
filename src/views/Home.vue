<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 transition-all duration-200 hover:scale-[1.001] transform">
      <div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <!-- Left Content -->
        <div class="flex-1 max-w-4xl transition-all duration-200 hover:scale-[1.002] transform">
          <!-- Tabs -->
          <div class="sticky top-0 z-10 bg-white flex space-x-4 sm:space-x-8 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto scrollbar-hide py-2">
            <!-- Tabs Loading Skeleton -->
            <div v-if="categories.length === 0" class="flex space-x-4 sm:space-x-8 transition-all duration-200 hover:scale-105 transform">
              <div v-for="n in 4" :key="n" class="pb-3 sm:pb-4">
                <div class="h-4 w-16 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
              </div>
            </div>
            
            <!-- Tabs -->
            <button 
              @click="setActiveTab('all')"
              :disabled="isLoading"
              :class="[
                'pb-3 sm:pb-4 text-sm font-medium whitespace-nowrap transition-all duration-200 transform',
                isLoading ? 'opacity-50 cursor-not-allowed' : '',
                activeTab === 'all' 
                  ? 'text-black border-b-2 border-black hover:scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:scale-105'
              ]"
            >
              ทั้งหมด
            </button>
            <button 
              v-for="category in categories" 
              :key="category.name"
              @click="setActiveTab(category.name)"
              :disabled="isLoading"
              :class="[
                'pb-3 sm:pb-4 text-sm font-medium whitespace-nowrap transition-all duration-200 transform',
                isLoading ? 'opacity-50 cursor-not-allowed' : '',
                activeTab === category.name 
                  ? 'text-black border-b-2 border-black hover:scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:scale-105'
              ]"
            >
              {{ category.name }}
            </button>
          </div>

          <!-- Banner -->
          <!-- <div class="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
            <p class="text-xs sm:text-sm text-gray-700">
              Following and your topics are now part of the new Following page, which you can find from the sidebar.
            </p>
            <button class="mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
              Okay, got it
            </button>
          </div> -->

          <!-- Loading State - Skeleton -->
          <div v-if="isLoading" class="space-y-4 sm:space-y-8">
            <div v-for="n in 6" :key="n" class="flex flex-col sm:flex-row gap-4 sm:gap-6 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-[1.01] transform">
              <!-- Image Skeleton -->
              <div class="w-full sm:w-48 h-32 sm:h-32 bg-gray-200 rounded-lg animate-pulse flex-shrink-0 transition-transform duration-200 hover:scale-105"></div>
              
              <!-- Content Skeleton -->
              <div class="flex-1 space-y-3 transition-all duration-200 hover:scale-[1.005] transform">
                <!-- Author Skeleton -->
                <div class="flex items-center gap-2 transition-all duration-200 hover:scale-105 transform">
                  <div class="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded-full animate-pulse transition-transform duration-200 hover:scale-125"></div>
                  <div class="h-3 w-20 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                </div>
                
                <!-- Title Skeleton -->
                <div class="space-y-2 transition-all duration-200 hover:scale-105 transform">
                  <div class="h-5 w-full bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  <div class="h-5 w-3/4 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                </div>
                
                <!-- Summary Skeleton -->
                <div class="space-y-2 transition-all duration-200 hover:scale-105 transform">
                  <div class="h-4 w-full bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                </div>
                
                <!-- Meta Info Skeleton -->
                <div class="flex items-center gap-3 sm:gap-4">
                  <div class="h-3 w-16 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  <div class="h-3 w-12 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  <div class="h-3 w-12 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                </div>
                
                <!-- Action Icons Skeleton -->
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 bg-gray-200 rounded-full animate-pulse transition-transform duration-200 hover:scale-125"></div>
                  <div class="w-6 h-6 bg-gray-200 rounded-full animate-pulse transition-transform duration-200 hover:scale-125"></div>
                  <div class="w-6 h-6 bg-gray-200 rounded-full animate-pulse transition-transform duration-200 hover:scale-125"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 transition-all duration-200 hover:scale-[1.01] transform">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400 transition-transform duration-200 hover:scale-125" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800 transition-all duration-200 hover:scale-105 transform">Error loading articles</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p class="transition-all duration-200 hover:scale-105 transform">{{ error }}</p>
                  <p class="mt-1 transition-all duration-200 hover:scale-105 transform">Using fallback data...</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Articles -->
          <div v-else class="space-y-4 sm:space-y-8">
            <article 
              v-for="article in displayedArticles" 
              :key="article.id"
              class="flex flex-col sm:flex-row gap-4 sm:gap-6 cursor-pointer hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] transform"
              @click="goToArticle(article.id)"
            >
              <div class="flex-1 order-2 sm:order-1">
                <div class="flex items-center gap-2 mb-2">
                  <img 
                    src="https://res.cloudinary.com/dkxpnkf7a/image/upload/v1760340617/Screenshot_2025-10-13_142718_eo7pyv.png" 
                    alt="Author Profile" 
                    class="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0 transition-transform duration-200 hover:scale-110"
                  />
                  <span class="text-xs sm:text-sm text-gray-600">{{ article.author }}</span>
                </div>
                <h2 class="text-lg sm:text-xl font-bold text-black mb-2 hover:text-gray-700 line-clamp-2 transition-all duration-200 hover:scale-105 transform">
                  {{ article.title }}
                </h2>
                <p class="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                  {{ article.summary }}
                </p>
                <div class="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-2">
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 text-yellow-500 transition-transform duration-200 hover:scale-125" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>{{ article.date }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 transition-transform duration-200 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ article.likes }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-3 h-3 transition-transform duration-200 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span>{{ article.comments }}</span>
                  </div>
                </div>
                <!-- Action Icons -->
                <div class="flex items-center gap-2">
                  <button class="p-1 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110 transform">
                    <svg class="w-4 h-4 text-gray-400 transition-transform duration-200 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                    </svg>
                  </button>
                  <button class="p-1 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110 transform">
                    <svg class="w-4 h-4 text-gray-400 transition-transform duration-200 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="w-full sm:w-32 h-48 sm:h-32 bg-gray-200 rounded-lg flex-shrink-0 relative overflow-hidden order-1 sm:order-2">
                <!-- Loading State -->
                <div v-if="imageLoadingStates[article.id]" class="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-4 h-4 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div class="w-4 h-4 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
                
                <!-- Default Image -->
                <div v-if="imageErrorStates[article.id]" class="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                
                <!-- Actual Image -->
                <img 
                  v-if="!imageErrorStates[article.id]"
                  :src="article.image" 
                  :alt="article.title" 
                  class="w-full h-full object-cover rounded-lg transition-transform duration-200 hover:scale-110"
                  @load="onImageLoad(article.id)"
                  @error="onImageError(article.id)"
                >
              </div>
            </article>
          </div>

          <!-- Load More Button -->
          <div v-if="hasMore" class="text-center py-6 sm:py-8">
            <button 
              @click="loadMoreArticles"
              :disabled="isLoading"
              :class="[
                'px-6 py-3 bg-black text-white rounded-lg font-medium transition-all duration-200 transform',
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800 hover:scale-105'
              ]"
            >
              <span v-if="isLoading" class="flex items-center space-x-2">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin transition-transform duration-200 hover:scale-125"></div>
                <span>กำลังโหลด...</span>
              </span>
              <span v-else>โหลดบทความเพิ่มเติม</span>
            </button>
          </div>

          <!-- End of Articles -->
          <div v-if="!hasMore && !isLoading" class="text-center py-6 sm:py-8">
            <p class="text-gray-500 text-xs sm:text-sm">ไม่มีบทความเพิ่มเติมแล้ว</p>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="hidden lg:block w-80 space-y-8 transition-all duration-200 hover:scale-[1.003] transform">
          <!-- Staff Picks -->
          <div class="transition-all duration-200 hover:scale-[1.01] transform">
            <h3 class="text-sm font-bold text-black mb-4 transition-all duration-200 hover:scale-105 transform">บทความที่แนะนำ</h3>
            <div class="space-y-4">
              <!-- Recommended Articles Loading Skeleton -->
              <div v-if="recommendedArticles.length === 0" class="space-y-3">
                <div v-for="n in 3" :key="n" class="flex gap-3 p-2 rounded-lg transition-all duration-200 hover:scale-105 transform">
                  <div class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-4 w-full bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                    <div class="h-3 w-3/4 bg-gray-200 rounded animate-pulse transition-transform duration-200 hover:scale-105"></div>
                  </div>
                </div>
              </div>
              
              <!-- Recommended Articles -->
              <div 
                v-for="recommendedArticle in recommendedArticles" 
                :key="recommendedArticle.id"
                @click="goToArticle(recommendedArticle.id)"
                class="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-200 hover:scale-105 transform"
              >
                <div class="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    :src="recommendedArticle.image" 
                    :alt="recommendedArticle.title"
                    class="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                    @error="onRecommendedImageError"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-800 mb-1 line-clamp-2 leading-tight transition-all duration-200 hover:scale-105 transform">{{ recommendedArticle.title }}</p>
                  <p class="text-xs text-gray-500">{{ recommendedArticle.date }} · {{ recommendedArticle.author }}</p>
                </div>
              </div>
            </div>
            <!-- <button @click="setActiveTab('all')" class="text-sm text-green-600 hover:text-green-800 mt-4">ดูบทความทั้งหมด</button> -->
          </div>

          <!-- Recommended Topics -->
          <div class="transition-all duration-200 hover:scale-[1.01] transform">
            <h3 class="text-sm font-bold text-black mb-4 transition-all duration-200 hover:scale-105 transform">Topics</h3>
            <div class="flex flex-wrap gap-2">
              <!-- Categories Loading Skeleton -->
              <div v-if="categories.length === 0" class="flex flex-wrap gap-2 transition-all duration-200 hover:scale-105 transform">
                <div v-for="n in 6" :key="n" class="px-3 py-1 bg-gray-200 rounded-full animate-pulse transition-transform duration-200 hover:scale-110">
                  <div class="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
              
              <!-- Categories -->
              <span 
                v-for="category in categories" 
                :key="category.name"
                class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer flex items-center gap-1 transition-all duration-200 hover:scale-110 transform"
                :title="category.description"
              >
                <span class="text-xs transition-transform duration-200 hover:scale-125">{{ category.icon }}</span>
                {{ category.name }}
              </span>
            </div>
            <!-- <button class="text-sm text-green-600 hover:text-green-800 mt-4">See more topics</button> -->
          </div>

          <!-- Who to Follow -->
          <!-- <div>
            <h3 class="text-sm font-bold text-black mb-4">Who to follow</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">uxplanet.org</p>
                    <p class="text-xs text-gray-500">http://uxplanet.org</p>
                  </div>
                </div>
                <button class="text-sm text-green-600 hover:text-green-800 font-medium">Follow</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">ProAndroidDev</p>
                    <p class="text-xs text-gray-500">Publication, The latest posts from Android Professionals an...</p>
                  </div>
                </div>
                <button class="text-sm text-green-600 hover:text-green-800 font-medium">Follow</button>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">Web Designer Depot</p>
                    <p class="text-xs text-gray-500">Web Designer Depot is the ultimate resource for...</p>
                  </div>
                </div>
                <button class="text-sm text-green-600 hover:text-green-800 font-medium">Follow</button>
              </div>
            </div>
            <button class="text-sm text-green-600 hover:text-green-800 mt-4">See more suggestions</button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCache } from '../composables/useCache'
import Header from '../components/Header.vue'

// Types
interface Article {
  id: number
  author: string
  title: string
  summary: string
  date: string
  likes: string
  comments: string
  image: string
  category?: string
  tags?: string[]
}

interface Category {
  name: string
  description: string
  icon: string
}

const router = useRouter()
const { initializeCache } = useCache()

// API Configuration
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbypRIQNNHsHJqqZeK_NwHYFk8YbHx3IOzBrQXPqbEOOnYDcK4KId8nlIdfNkcj2Z2Pi/exec'

// Articles data
const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const recommendedArticles = ref<Article[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const activeTab = ref('all')

// Fetch articles from Google Apps Script API
const fetchArticles = async (category?: string, page: number = 1) => {
  try {
    isLoading.value = true
    error.value = null
    
    // ใช้ API ใหม่สำหรับดึงบทความตาม category พร้อม pagination
    const url = category && category !== 'all' 
      ? `${API_BASE_URL}?action=getArticlesByCategory&category=${encodeURIComponent(category)}&page=${page}&limit=${articlesPerPage}`
      : `${API_BASE_URL}?action=getArticles&page=${page}&limit=${articlesPerPage}`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.success && data.data) {
      // Transform API data to match our component structure
      const newArticles = data.data.map((article: any) => ({
        id: article.id,
        author: article.author || 'Unknown',
        title: article.title || 'Untitled',
        summary: article.content ? article.content.substring(0, 150) + '...' : 'No content available',
        date: formatDate(article.created_date),
        likes: formatNumber(article.likes || 0),
        comments: formatNumber(article.views || 0),
        image: article.image_url || 'https://picsum.photos/128/128?random=' + article.id,
        category: article.category || 'General',
        tags: article.tags || []
      }))
      
      if (page === 1) {
        // หน้าแรก - แทนที่ข้อมูลทั้งหมด
        articles.value = newArticles
      } else {
        // หน้าถัดไป - เพิ่มข้อมูลเข้าไป
        articles.value.push(...newArticles)
      }
      
      // อัปเดต hasMore จาก API response
      hasMore.value = data.hasMore || false
    } else {
      throw new Error(data.error || 'Failed to fetch articles')
    }
  } catch (err) {
    console.error('Error fetching articles:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
    
    // Fallback to sample data if API fails
    articles.value = sampleArticles
  } finally {
    isLoading.value = false
  }
}

// Fetch recommended articles from Google Apps Script API
const fetchRecommendedArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?action=getRecommendedArticles&limit=3`)
    const data = await response.json()
    
    if (data.success && data.data) {
      recommendedArticles.value = data.data.map((article: any) => ({
        id: article.id,
        author: article.author || 'Unknown',
        title: article.title || 'Untitled',
        summary: article.content ? article.content.substring(0, 100) + '...' : 'No content available',
        date: formatDate(article.created_date),
        likes: formatNumber(article.likes || 0),
        comments: formatNumber(article.views || 0),
        image: article.image_url || 'https://picsum.photos/300/200?random=' + article.id,
        category: article.category || 'General',
        tags: article.tags || []
      }))
    } else {
      throw new Error(data.error || 'Failed to fetch recommended articles')
    }
  } catch (err) {
    console.error('Error fetching recommended articles:', err)
    // Fallback to sample data
    recommendedArticles.value = [
      {
        id: 1,
        author: 'Medium Staff',
        title: 'How this brand strategist uses Medium to explore ideas, repurpose content, and land clients',
        summary: 'Learn how to leverage Medium for business growth and content strategy.',
        date: '2d ago',
        likes: '1.2K',
        comments: '45',
        image: 'https://picsum.photos/300/200?random=1',
        category: 'Business',
        tags: ['strategy', 'content']
      },
      {
        id: 2,
        author: 'Jud Brewer MD PhD',
        title: 'From "I Have To" to "I Get To": How One Word Change Rewires Your Brain',
        summary: 'Discover the power of language in shaping your mindset and behavior.',
        date: '6d ago',
        likes: '856',
        comments: '23',
        image: 'https://picsum.photos/300/200?random=2',
        category: 'Psychology',
        tags: ['mindset', 'neuroscience']
      },
      {
        id: 3,
        author: 'Linh Nguyen',
        title: 'Golden Design Lessons from Tokyo Metro',
        summary: 'Explore the elegant design principles behind Tokyo\'s metro system.',
        date: 'Sep 3',
        likes: '2.1K',
        comments: '67',
        image: 'https://picsum.photos/300/200?random=3',
        category: 'Design',
        tags: ['design', 'transportation']
      }
    ]
  }
}

// Fetch categories from Google Apps Script API
const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?action=getCategories`)
    const data = await response.json()
    
    if (data.success && data.data) {
      categories.value = data.data.map((category: any) => ({
        name: category.name,
        description: category.description,
        icon: category.icon || '📝'
      }))
    } else {
      // Fallback categories
      categories.value = [
        { name: 'เทคโนโลยี', description: 'บทความเกี่ยวกับเทคโนโลยี', icon: '💻' },
        { name: 'สุขภาพ', description: 'บทความเกี่ยวกับสุขภาพ', icon: '🏥' },
        { name: 'การศึกษา', description: 'บทความเกี่ยวกับการศึกษา', icon: '📚' },
        { name: 'บันเทิง', description: 'บทความเกี่ยวกับบันเทิง', icon: '🎬' },
        { name: 'กีฬา', description: 'บทความเกี่ยวกับกีฬา', icon: '⚽' },
        { name: 'อาหาร', description: 'บทความเกี่ยวกับอาหาร', icon: '🍽️' }
      ]
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
    // Fallback categories
    categories.value = [
      { name: 'เทคโนโลยี', description: 'บทความเกี่ยวกับเทคโนโลยี', icon: '💻' },
      { name: 'สุขภาพ', description: 'บทความเกี่ยวกับสุขภาพ', icon: '🏥' },
      { name: 'การศึกษา', description: 'บทความเกี่ยวกับการศึกษา', icon: '📚' },
      { name: 'บันเทิง', description: 'บทความเกี่ยวกับบันเทิง', icon: '🎬' },
      { name: 'กีฬา', description: 'บทความเกี่ยวกับกีฬา', icon: '⚽' },
      { name: 'อาหาร', description: 'บทความเกี่ยวกับอาหาร', icon: '🍽️' }
    ]
  }
}

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1d ago'
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)}w ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  } catch {
    return 'Unknown date'
  }
}

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Tab functionality
const setActiveTab = async (tabName: string) => {
  activeTab.value = tabName
  // รีเซ็ตหน้าเมื่อเปลี่ยน category
  currentPage.value = 1
  // ดึงข้อมูลบทความใหม่ตาม category ที่เลือก
  await fetchArticles(tabName)
  updateDisplayedArticles()
}


const displayedArticles = ref<Article[]>([])
const hasMore = ref(true)
const currentPage = ref(1)
const articlesPerPage = 10

// Image loading states
const imageLoadingStates = ref<Record<string, boolean>>({})
const imageErrorStates = ref<Record<string, boolean>>({})

// Update displayed articles when articles change
const updateDisplayedArticles = () => {
  // แสดงบทความทั้งหมดที่ได้รับจาก API
  displayedArticles.value = [...articles.value]
}

// Sample articles for pagination testing (fallback)
const generateSampleArticles = (count: number) => {
  const categories = ['เทคโนโลยี', 'สุขภาพ', 'การศึกษา', 'บันเทิง', 'กีฬา', 'อาหาร']
  const authors = ['TechCrunch', 'Design Weekly', 'Code Daily', 'Startup News', 'Health Today', 'Edu Weekly']
  
  return Array.from({ length: count }, (_, index) => ({
    id: index + 5,
    author: authors[index % authors.length] || 'Unknown Author',
    title: `บทความตัวอย่าง ${index + 1}: ${categories[index % categories.length]}`,
    summary: `นี่คือเนื้อหาตัวอย่างของบทความที่ ${index + 1} ซึ่งจะใช้สำหรับทดสอบระบบ pagination`,
    date: `Sep ${10 - Math.floor(index / 5)}`,
    likes: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}K`,
    comments: `${Math.floor(Math.random() * 200) + 50}`,
    image: `https://picsum.photos/128/128?random=${index + 5}`,
    category: categories[index % categories.length] || 'General'
  }))
}

const sampleArticles = generateSampleArticles(25) // สร้าง 25 บทความสำหรับทดสอบ

// Image loading handlers
const onImageLoad = (articleId: number) => {
  imageLoadingStates.value[articleId] = false
  imageErrorStates.value[articleId] = false
}

const onImageError = (articleId: number) => {
  imageLoadingStates.value[articleId] = false
  imageErrorStates.value[articleId] = true
}

// Initialize image loading states
const initializeImageStates = (articles: Article[]) => {
  articles.forEach(article => {
    imageLoadingStates.value[article.id] = true
    imageErrorStates.value[article.id] = false
  })
}

// Navigate to article detail
const goToArticle = (articleId: number) => {
  router.push(`/article/${articleId}`)
}

// Recommended image error handler
const onRecommendedImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://picsum.photos/48/48?random=' + Math.random()
}

// Load more articles
const loadMoreArticles = async () => {
  if (isLoading.value || !hasMore.value) return
  
  try {
    // เพิ่มหน้า
    currentPage.value += 1
    
    // ดึงข้อมูลจาก API
    await fetchArticles(activeTab.value === 'all' ? undefined : activeTab.value, currentPage.value)
    
    // Initialize image states for new articles
    const newArticles = articles.value.slice(-articlesPerPage)
    initializeImageStates(newArticles)
    
  } catch (error) {
    console.error('Error loading more articles:', error)
    // ถ้า error ให้ลดหน้า
    currentPage.value -= 1
  }
}

// Initialize cache on app start
onMounted(async () => {
  await initializeCache()
  
  // Fetch articles, categories, and recommended articles from API
  await Promise.all([
    fetchArticles(),
    fetchCategories(),
    fetchRecommendedArticles()
  ])
  updateDisplayedArticles()
  
  // Initialize image states for initial articles
  initializeImageStates(displayedArticles.value)
})
</script>
