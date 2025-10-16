<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <Header :show-back-button="true" />

    <!-- Loading State - Skeleton -->
    <ArticleDetailSkeleton v-if="isLoading" />

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading article</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
              <p class="mt-1">Using fallback data...</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else-if="article" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <!-- Article Header -->
      <div class="mb-6 sm:mb-8">
        <div class="flex items-center gap-3 mb-4">
          <!-- Profile Image with Skeleton Loading -->
          <div class="relative w-8 h-8 sm:w-10 sm:h-10">
            <!-- Skeleton Loading -->
            <div 
              v-if="profileImageLoading" 
              class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full animate-pulse"
            ></div>
            
            <!-- Error State -->
            <div 
              v-else-if="profileImageError" 
              class="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            
            <!-- Actual Image -->
            <img 
              v-show="!profileImageLoading && !profileImageError"
              src="https://res.cloudinary.com/dkxpnkf7a/image/upload/v1760340617/Screenshot_2025-10-13_142718_eo7pyv.png" 
              alt="Author Profile" 
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              @load="onProfileImageLoad"
              @error="onProfileImageError"
            />
          </div>
          
          <div>
            <p class="text-xs sm:text-sm font-medium text-gray-900">{{ article.author }}</p>
            <p class="text-xs sm:text-sm text-gray-500">{{ article.date }}</p>
          </div>
        </div>
        
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
          {{ article.title }}
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed">
          {{ article.summary }}
        </p>
        
        <!-- Category and Tags -->
        <div v-if="article.category || article.tags" class="flex flex-wrap gap-2 mb-4 sm:mb-6">
          <span v-if="article.category" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {{ article.category }}
          </span>
          <span 
            v-for="tag in article.tags" 
            :key="tag" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>{{ article.likes }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>{{ article.comments }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
            </svg>
            <span>Share</span>
          </div>
        </div>
      </div>

      <!-- Article Image -->
      <div class="mb-6 sm:mb-8">
        <div class="w-full h-64 sm:h-80 lg:h-96 bg-gray-200 rounded-lg overflow-hidden relative">
          <!-- Loading State -->
          <div v-if="imageLoading" class="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-gray-400 rounded-full animate-bounce"></div>
              <div class="w-6 h-6 bg-gray-400 rounded-full animate-bounce delay-100"></div>
              <div class="w-6 h-6 bg-gray-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
          
          <!-- Default Image -->
          <div v-if="imageError" class="absolute inset-0 flex items-center justify-center bg-gray-200">
            <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          
          <!-- Actual Image -->
          <img 
            v-if="article && !imageError"
            :src="article.image" 
            :alt="article.title" 
            class="w-full h-full object-contain"
            @load="onImageLoad"
            @error="onImageError"
          >
          
          <!-- Debug Info -->
          <div v-if=" imageError" class="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs p-2">
            Loading: {{ imageLoading }}, Error: {{ imageError }}, URL: {{ article.image }}
          </div>
        </div>
      </div>
      <div class="prose prose-sm sm:prose-lg max-w-none">
        <div v-if="article.content" class="text-sm sm:text-base prose prose-sm sm:prose-lg max-w-none" v-html="article.content">
        </div>
      </div>
      

      <!-- Article Body -->
      <!-- <div class="prose prose-sm sm:prose-lg max-w-none">
        <div class="text-gray-800 leading-relaxed space-y-4 sm:space-y-6">
          <div v-if="article.content" class="text-sm sm:text-base whitespace-pre-wrap">
            {{ article.content }}
          </div>
          <div v-else>
            <p class="text-sm sm:text-base">
              {{ article.summary }}
            </p>
            
          </div>
          
          <p class="text-sm sm:text-base">
            You can also use <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">inline code</code> within your text. For example, the <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">useState</code> hook in React or <code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">ref()</code> in Vue.js.
          </p>
          
          <div class="my-6 sm:my-8">
            <h3 class="text-lg sm:text-xl font-semibold text-black mb-3">CSS Example</h3>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <div class="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span class="text-gray-400 text-xs">CSS</span>
              </div>
              <pre class="p-4 text-sm text-gray-100 overflow-x-auto"><code class="language-css">/* Responsive Design with Tailwind CSS */
.article-card {
  @apply flex flex-col sm:flex-row gap-4 sm:gap-6;
  @apply cursor-pointer hover:bg-gray-50;
  @apply p-3 sm:p-4 rounded-lg transition-colors;
}

.article-image {
  @apply w-full sm:w-32 h-48 sm:h-32;
  @apply bg-gray-200 rounded-lg flex-shrink-0;
  @apply relative overflow-hidden;
}

.article-content {
  @apply flex-1 order-2 sm:order-1;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}</code></pre>
            </div>
          </div>
          
          <blockquote class="border-l-4 border-gray-300 pl-4 sm:pl-6 italic text-sm sm:text-base text-gray-600 my-6 sm:my-8">
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident."
          </blockquote>
          
          <div class="my-6 sm:my-8">
            <h3 class="text-lg sm:text-xl font-semibold text-black mb-3">Python Example</h3>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
              <div class="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span class="text-gray-400 text-xs">Python</span>
              </div>
              <pre class="p-4 text-sm text-gray-100 overflow-x-auto"><code class="language-python"># Data processing with Python
import pandas as pd
import numpy as np

def process_data(data):
    """Process and clean the dataset"""
    # Remove null values
    cleaned_data = data.dropna()
    
    # Calculate statistics
    mean_value = cleaned_data.mean()
    std_value = cleaned_data.std()
    
    # Create summary
    summary = {
        'count': len(cleaned_data),
        'mean': mean_value,
        'std': std_value
    }
    
    return summary

# Usage example
data = pd.Series([1, 2, 3, 4, 5, None, 7, 8, 9, 10])
result = process_data(data)
print(f"Summary: {result}")</code></pre>
            </div>
          </div>
          
          <p class="text-sm sm:text-base">
            Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.
          </p>
        </div>
      </div> -->

     
      <!-- Article Footer -->
      <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3 sm:gap-4">
            <button class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Like
            </button>
            <button @click="shareArticle" class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-xs sm:text-sm font-medium transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
              </svg>
              Share
            </button>
          </div>
          
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <span>Reading time: 5 min</span>
          </div>
        </div>
      </div>

       <!-- Related Articles Section -->
       <div v-if="relatedArticles.length > 0 || relatedLoading" class="mt-8 sm:mt-12">
        <h2 class="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">บทความที่เกี่ยวข้อง</h2>
        
        <!-- Loading State -->
        <div v-if="relatedLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div v-for="i in 4" :key="i" class="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div class="w-full h-32 bg-gray-300 rounded-lg mb-3"></div>
            <div class="h-4 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded mb-2"></div>
            <div class="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        
        <!-- Related Articles Grid -->
        <div v-else-if="relatedArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <article 
            v-for="relatedArticle in relatedArticles" 
            :key="relatedArticle.id"
            @click="goToArticle(relatedArticle.id)"
            class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <!-- Article Image -->
            <div class="relative w-full h-32 sm:h-40 bg-gray-200">
              <img 
                :src="relatedArticle.image" 
                :alt="relatedArticle.title"
                class="w-full h-full object-cover"
                @error="onRelatedImageError"
              />
            </div>
            
            <!-- Article Content -->
            <div class="p-3 sm:p-4">
              <h3 class="text-sm sm:text-base font-semibold text-black mb-2 line-clamp-2 leading-tight">
                {{ relatedArticle.title }}
              </h3>
              
              <p class="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">
                {{ relatedArticle.summary }}
              </p>
              
              <!-- Article Meta -->
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>{{ relatedArticle.author }}</span>
                <span>{{ relatedArticle.date }}</span>
              </div>
              
              <!-- Stats -->
              <div class="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>{{ relatedArticle.likes }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                  <span>{{ relatedArticle.comments }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
        
        <!-- No Related Articles -->
        <div v-else-if="relatedError" class="text-center py-8">
          <p class="text-gray-500 text-sm">ไม่สามารถโหลดบทความที่เกี่ยวข้องได้</p>
        </div>
      </div>


      <!-- Related Articles -->
      <!-- <div class="mt-12 sm:mt-16">
        <h3 class="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">Related Articles</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div 
            v-for="relatedArticle in relatedArticles" 
            :key="relatedArticle.id"
            class="cursor-pointer hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-colors"
            @click="goToArticle(relatedArticle.id)"
          >
            <div class="flex gap-3 sm:gap-4">
              <div class="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div class="flex-1">
                <h4 class="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2">{{ relatedArticle.title }}</h4>
                <p class="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{{ relatedArticle.author }}</p>
                <p class="text-xs text-gray-500">{{ relatedArticle.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github-dark.css'
import Header from '../components/Header.vue'
import ArticleDetailSkeleton from '../components/ArticleDetailSkeleton.vue'

// Register languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)

const router = useRouter()

// Props
const props = defineProps<{
  id: string
}>()

// Types
interface Article {
  id: number
  author: string
  title: string
  summary: string
  content?: string
  date: string
  likes: string
  comments: string
  image: string
  category?: string
  tags?: string[]
}

// API Configuration
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbypRIQNNHsHJqqZeK_NwHYFk8YbHx3IOzBrQXPqbEOOnYDcK4KId8nlIdfNkcj2Z2Pi/exec'

// State
const article = ref<Article | null>(null)
const imageLoading = ref(true)
const imageError = ref(false)
const profileImageLoading = ref(false)
const profileImageError = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

// Related Articles
const relatedArticles = ref<Article[]>([])
const relatedLoading = ref(false)
const relatedError = ref<string | null>(null)

// Fetch article from API
const fetchArticle = async (id: string) => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE_URL}?action=getArticle&id=${id}`)
    const data = await response.json()
    
    if (data.success && data.data) {
      const apiArticle = data.data
      article.value = {
        id: apiArticle.id,
        author: apiArticle.author || 'Unknown',
        title: apiArticle.title || 'Untitled',
        summary: apiArticle.summary ? apiArticle.summary : 'No content available',
        content: apiArticle.content || '',
        date: formatDate(apiArticle.created_date),
        likes: formatNumber(apiArticle.likes || 0),
        comments: formatNumber(apiArticle.views || 0),
        image: apiArticle.image_url || 'https://picsum.photos/800/400?random=' + apiArticle.id,
        category: apiArticle.category || 'General',
        tags: apiArticle.tags || []
      }
      
      // Reset image loading state when article data is loaded
      imageLoading.value = true
      imageError.value = false
      
      // Debug: Log the image URL
      console.log('Article image URL:', article.value.image)
      
      // ดึง Related Articles หลังจากโหลดบทความหลักเสร็จ
      fetchRelatedArticles(article.value.id)
    } else {
      throw new Error(data.error || 'Failed to fetch article')
    }
  } catch (err) {
    console.error('Error fetching article:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
    
    // Fallback to sample data
    const sampleArticle = getSampleArticle(parseInt(id))
    if (sampleArticle) {
      article.value = sampleArticle
    }
  } finally {
    isLoading.value = false
  }
}

// Fetch related articles
const fetchRelatedArticles = async (articleId: number) => {
  try {
    relatedLoading.value = true
    relatedError.value = null
    
    const response = await fetch(`${API_BASE_URL}?action=getRelatedArticles&id=${articleId}&limit=4`)
    const data = await response.json()
    
    if (data.success && data.data) {
      relatedArticles.value = data.data.map((relatedArticle: any) => ({
        id: relatedArticle.id,
        author: relatedArticle.author || 'Unknown',
        title: relatedArticle.title || 'Untitled',
        summary: relatedArticle.summary ? relatedArticle.summary.substring(0, 100) + '...' : 'No content available',
        content: relatedArticle.content || '',
        date: formatDate(relatedArticle.created_date),
        likes: formatNumber(relatedArticle.likes || 0),
        comments: formatNumber(relatedArticle.views || 0),
        image: relatedArticle.image_url || 'https://picsum.photos/300/200?random=' + relatedArticle.id,
        category: relatedArticle.category || 'General',
        tags: relatedArticle.tags || []
      }))
    } else {
      throw new Error(data.error || 'Failed to fetch related articles')
    }
  } catch (err) {
    console.error('Error fetching related articles:', err)
    relatedError.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    relatedLoading.value = false
  }
}

// Navigation function
const goToArticle = (articleId: number) => {
  router.push(`/article/${articleId}`)
}

// Related image error handler
const onRelatedImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://picsum.photos/300/200?random=' + Math.random()
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

// Sample articles data (fallback)
const articlesData = [
  {
    id: 1,
    author: 'Devlink Tips',
    title: 'Apple is quietly rewriting iOS and it\'s not in Swift or Objective-C',
    summary: 'The hidden language shift happening inside Cupertino, why it matters, and what it means for your future apps.',
    content: 'Apple has been quietly working on a new programming language for iOS development that is neither Swift nor Objective-C. This revolutionary approach could change how we build mobile applications in the future. The company has been investing heavily in this new technology, which promises better performance and easier maintenance.',
    date: 'Sep 15',
    likes: '1.3K',
    comments: '40',
    image: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 2,
    author: 'In Bootcamp by Supreeth Kashyap',
    title: 'Rediscovering Figma AI: How I Built a Full UX Prototype in 20 Minutes',
    summary: 'Figma + AI = UX at Light speed',
    content: 'Figma AI has revolutionized the way we approach UX design. With its powerful AI capabilities, designers can now create full prototypes in record time. This article explores the various AI features and how they can be leveraged to speed up the design process.',
    date: '5d ago',
    likes: '19',
    comments: '8',
    image: 'https://picsum.photos/800/400?random=2'
  },
  {
    id: 3,
    author: 'UX Movement',
    title: 'How to Simplify a Very Long, Complex Menu',
    summary: '3 ways to reduce menu complexity',
    content: 'Complex menus can overwhelm users and hurt the overall user experience. This article presents three proven strategies to simplify navigation menus and improve usability. Learn how to organize information hierarchically and create intuitive navigation patterns.',
    date: 'Sep 11',
    likes: '281',
    comments: '3',
    image: 'https://picsum.photos/800/400?random=3'
  },
  {
    id: 4,
    author: 'Tosny',
    title: '7 Subscriptions I Will Never Cancel',
    summary: 'Some subscriptions are just too useful for me to consider cancelling.',
    content: 'In a world full of subscription services, some stand out as truly essential. This article reviews seven subscriptions that provide exceptional value and have become indispensable tools for productivity and entertainment.',
    date: 'Sep 11',
    likes: '895',
    comments: '33',
    image: 'https://picsum.photos/800/400?random=4'
  }
]

const getSampleArticle = (id: number) => {
  return articlesData.find(article => article.id === id) || null
}


// Image handlers
const onImageLoad = () => {
  console.log('Image loaded successfully')
  imageLoading.value = false
  imageError.value = false
}

const onImageError = () => {
  console.log('Image failed to load')
  imageLoading.value = false
  imageError.value = true
}

// Profile image handlers
const onProfileImageLoad = () => {
  profileImageLoading.value = false
  profileImageError.value = false
}

const onProfileImageError = () => {
  profileImageLoading.value = false
  profileImageError.value = true
}

// Navigation - goBack function is now handled in Header component

// Share functionality
const shareArticle = async () => {
  if (!article.value) return
  
  const shareData = {
    title: article.value.title,
    text: article.value.summary,
    url: window.location.href
  }
  
  try {
    // Check if Web Share API is supported
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์บทความถูกคัดลอกไปยังคลิปบอร์ดแล้ว!')
    }
  } catch (error) {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์บทความถูกคัดลอกไปยังคลิปบอร์ดแล้ว!')
    } catch (clipboardError) {
      console.error('ไม่สามารถแชร์หรือคัดลอกลิงก์ได้:', clipboardError)
      alert('ไม่สามารถแชร์บทความได้ในขณะนี้')
    }
  }
}

// Load article data
const loadArticle = () => {
  const articleId = props.id
  fetchArticle(articleId)
}

// Highlight code blocks
const highlightCode = () => {
  nextTick(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  })
}

// Initialize
onMounted(() => {
  profileImageLoading.value = true
  loadArticle()
  highlightCode()
  
  // ดึง Related Articles หลังจากโหลดบทความหลัก
  if (article.value) {
    fetchRelatedArticles(article.value.id)
  }
})
</script>
