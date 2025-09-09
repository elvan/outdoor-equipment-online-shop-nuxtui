<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Social Media Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-share-2" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Social Media Manager</h1>
              <p class="text-xs text-gray-600">Content Scheduling & Indonesian Social Strategy</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UButton color="emerald" @click="showCreatePostModal = true">
              <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
              Create Post
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Social Media Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="platform in socialStats" :key="platform.name" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div :class="['p-3 rounded-lg', platform.bgColor]">
              <UIcon :name="platform.icon" :class="['w-6 h-6', platform.iconColor]" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ platform.name }}</p>
              <p class="text-xl font-semibold text-gray-900">{{ platform.followers }}</p>
              <p :class="['text-xs', platform.growth >= 0 ? 'text-green-600' : 'text-red-600']">
                <UIcon :name="platform.growth >= 0 ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="w-3 h-3 mr-1 inline-block" />
                {{ platform.growth >= 0 ? '+' : '' }}{{ platform.growth }}% growth
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in socialTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <UIcon :name="tab.icon" class="w-4 h-4 mr-2 inline-block" />
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Content Calendar -->
      <div v-if="activeTab === 'calendar'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Content Calendar</h3>
            <div class="flex items-center space-x-3">
              <USelect v-model="selectedMonth" :options="monthOptions" />
              <UButton color="emerald" variant="outline" @click="generateContentPlan">
                <UIcon name="i-lucide-calendar-plus" class="w-4 h-4 mr-2" />
                Auto Generate
              </UButton>
            </div>
          </div>

          <!-- Weekly Calendar View -->
          <div class="grid grid-cols-8 gap-4 mb-6">
            <!-- Days Header -->
            <div class="text-sm font-medium text-gray-700 p-2">Time</div>
            <div v-for="day in weekDays" :key="day" class="text-sm font-medium text-gray-700 p-2 text-center">
              {{ day }}
            </div>

            <!-- Time Slots -->
            <template v-for="hour in timeSlots" :key="hour.time">
              <div class="text-xs text-gray-500 p-2">{{ hour.time }}</div>
              <div v-for="day in weekDays" :key="`${hour.time}-${day}`" class="border border-gray-200 rounded p-2 min-h-20">
                <div v-for="post in getScheduledPosts(day, hour.time)" :key="post.id" class="mb-2">
                  <div :class="[
                    'text-xs p-2 rounded border-l-4 cursor-pointer',
                    getPlatformColor(post.platform)
                  ]" @click="editScheduledPost(post)">
                    <div class="font-medium truncate">{{ post.content }}</div>
                    <div class="text-gray-500 flex items-center mt-1">
                      <UIcon :name="getPlatformIcon(post.platform)" class="w-3 h-3 mr-1" />
                      {{ post.platform }}
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Scheduled Posts -->
      <div v-if="activeTab === 'scheduled'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Scheduled Posts</h3>
          
          <div class="space-y-4">
            <div v-for="post in scheduledPosts" :key="post.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <UIcon :name="getPlatformIcon(post.platform)" :class="['w-5 h-5 mr-2', getPlatformIconColor(post.platform)]" />
                    <span class="font-medium text-gray-900">{{ post.platform }}</span>
                    <span :class="[
                      'ml-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                      post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      post.status === 'published' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ post.status }}
                    </span>
                  </div>
                  
                  <div class="mb-3">
                    <p class="text-gray-800 mb-2">{{ post.content }}</p>
                    <div v-if="post.media" class="flex items-center text-sm text-gray-600">
                      <UIcon name="i-lucide-image" class="w-4 h-4 mr-1" />
                      {{ post.media.length }} media file(s)
                    </div>
                  </div>

                  <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <div class="flex items-center">
                      <UIcon name="i-lucide-calendar" class="w-4 h-4 mr-1" />
                      {{ formatIndonesianDateTime(new Date(post.scheduledTime)) }}
                    </div>
                    <div class="flex items-center" v-if="post.hashtags.length">
                      <UIcon name="i-lucide-hash" class="w-4 h-4 mr-1" />
                      {{ post.hashtags.length }} hashtags
                    </div>
                  </div>
                </div>

                <div class="flex items-center space-x-2">
                  <UButton color="blue" variant="ghost" size="sm" @click="editPost(post)">
                    <UIcon name="i-lucide-edit" class="w-4 h-4" />
                  </UButton>
                  <UButton color="red" variant="ghost" size="sm" @click="deletePost(post)">
                    <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indonesian Content Templates -->
      <div v-if="activeTab === 'templates'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Content Templates -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Content Templates</h3>
            
            <div class="space-y-4">
              <div v-for="template in contentTemplates" :key="template.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" @click="useTemplate(template)">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ template.title }}</h4>
                  <span :class="[
                    'text-xs px-2 py-1 rounded',
                    template.category === 'product' ? 'bg-blue-100 text-blue-800' :
                    template.category === 'adventure' ? 'bg-green-100 text-green-800' :
                    template.category === 'educational' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ template.category }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ template.description }}</p>
                <div class="bg-gray-100 rounded p-3 mb-3">
                  <p class="text-sm text-gray-700 italic">{{ template.sampleContent }}</p>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">Engagement Rate:</span>
                  <span class="text-emerald-600 font-medium">{{ template.engagementRate }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Hashtag Library -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Hashtag Library</h3>
            
            <div class="space-y-6">
              <div v-for="category in hashtagCategories" :key="category.name">
                <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <UIcon :name="category.icon" class="w-4 h-4 mr-2" />
                  {{ category.name }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="hashtag in category.tags" 
                    :key="hashtag" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-emerald-100 hover:text-emerald-800 cursor-pointer"
                    @click="addHashtag(hashtag)"
                  >
                    #{{ hashtag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Selected Hashtags -->
            <div v-if="selectedHashtags.length" class="mt-6 p-4 bg-emerald-50 rounded-lg">
              <h4 class="text-sm font-medium text-emerald-800 mb-2">Selected Hashtags ({{ selectedHashtags.length }})</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="hashtag in selectedHashtags" 
                  :key="hashtag" 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-200 text-emerald-800"
                >
                  #{{ hashtag }}
                  <button @click="removeHashtag(hashtag)" class="ml-1 hover:text-emerald-600">
                    <UIcon name="i-lucide-x" class="w-3 h-3" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics -->
      <div v-if="activeTab === 'analytics'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Platform Performance -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h3>
            
            <div class="space-y-4">
              <div v-for="platform in platformAnalytics" :key="platform.name" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <UIcon :name="platform.icon" :class="['w-6 h-6 mr-3', platform.iconColor]" />
                    <h4 class="font-medium text-gray-900">{{ platform.name }}</h4>
                  </div>
                  <span class="text-sm text-gray-600">{{ platform.followers }} followers</span>
                </div>

                <div class="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p class="text-lg font-semibold text-gray-900">{{ platform.metrics.posts }}</p>
                    <p class="text-xs text-gray-600">Posts</p>
                  </div>
                  <div>
                    <p class="text-lg font-semibold text-gray-900">{{ platform.metrics.engagement }}%</p>
                    <p class="text-xs text-gray-600">Engagement</p>
                  </div>
                  <div>
                    <p class="text-lg font-semibold text-gray-900">{{ platform.metrics.reach }}</p>
                    <p class="text-xs text-gray-600">Avg Reach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Best Performing Content -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Best Performing Content</h3>
            
            <div class="space-y-4">
              <div v-for="post in bestPosts" :key="post.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center">
                    <UIcon :name="getPlatformIcon(post.platform)" :class="['w-4 h-4 mr-2', getPlatformIconColor(post.platform)]" />
                    <span class="text-sm font-medium text-gray-900">{{ post.platform }}</span>
                  </div>
                  <span class="text-xs text-gray-500">{{ formatIndonesianDate(new Date(post.publishedDate)) }}</span>
                </div>
                
                <p class="text-sm text-gray-700 mb-3 truncate">{{ post.content }}</p>
                
                <div class="grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <p class="font-medium text-gray-900">{{ post.metrics.likes }}</p>
                    <p class="text-gray-600">Likes</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ post.metrics.shares }}</p>
                    <p class="text-gray-600">Shares</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ post.metrics.comments }}</p>
                    <p class="text-gray-600">Comments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <div v-if="showCreatePostModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Create Social Media Post</h3>
        
        <form @submit.prevent="createPost" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="platform in availablePlatforms"
                :key="platform.name"
                type="button"
                @click="togglePlatform(platform.name)"
                :class="[
                  'p-3 border-2 rounded-lg flex flex-col items-center transition-colors',
                  newPost.platforms.includes(platform.name) 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <UIcon :name="platform.icon" :class="['w-6 h-6 mb-1', platform.iconColor]" />
                <span class="text-xs font-medium">{{ platform.name }}</span>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea 
              v-model="newPost.content" 
              rows="4" 
              placeholder="Apa yang ingin kamu bagikan tentang petualangan outdoor?"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ newPost.content.length }}/280 characters</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Schedule Date</label>
              <input 
                v-model="newPost.scheduledDate" 
                type="date" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
              <input 
                v-model="newPost.scheduledTime" 
                type="time" 
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hashtags</label>
            <input 
              v-model="newPost.hashtags" 
              type="text" 
              placeholder="#outdoor #adventure #indonesia"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
            <p class="text-xs text-gray-500 mt-1">Separate hashtags with spaces</p>
          </div>

          <div class="flex items-center justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="showCreatePostModal = false">
              Cancel
            </UButton>
            <UButton color="emerald" type="submit">
              Schedule Post
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIndonesianDate } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Social Media Manager - Puncak Adventura',
  description: 'Indonesian social media content management and scheduling'
})

// Component state
const activeTab = ref('calendar')
const showCreatePostModal = ref(false)
const selectedMonth = ref('august-2024')
const selectedHashtags = ref<string[]>([])

// Tab navigation
const socialTabs = [
  { id: 'calendar', name: 'Content Calendar', icon: 'i-lucide-calendar' },
  { id: 'scheduled', name: 'Scheduled Posts', icon: 'i-lucide-clock' },
  { id: 'templates', name: 'Templates', icon: 'i-lucide-layout-template' },
  { id: 'analytics', name: 'Analytics', icon: 'i-lucide-bar-chart-3' },
]

// Platform statistics
const socialStats = ref([
  {
    name: 'Instagram',
    followers: '45.2K',
    growth: 15.2,
    icon: 'i-lucide-instagram',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600'
  },
  {
    name: 'TikTok',
    followers: '28.5K',
    growth: 28.7,
    icon: 'i-lucide-music',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-800'
  },
  {
    name: 'Facebook',
    followers: '32.1K',
    growth: 8.3,
    icon: 'i-lucide-facebook',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'YouTube',
    followers: '15.8K',
    growth: 12.1,
    icon: 'i-lucide-youtube',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }
])

// Calendar data
const monthOptions = [
  { label: 'August 2024', value: 'august-2024' },
  { label: 'September 2024', value: 'september-2024' },
  { label: 'October 2024', value: 'october-2024' }
]

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = [
  { time: '09:00' },
  { time: '12:00' },
  { time: '15:00' },
  { time: '18:00' },
  { time: '21:00' }
]

// Scheduled posts
const scheduledPosts = ref([
  {
    id: 'post-1',
    platform: 'Instagram',
    content: 'Petualangan seru di Gunung Semeru bersama gear terbaik dari Puncak Adventura! 🏔️ #Adventure #Semeru #OutdoorGear',
    scheduledTime: '2024-08-20T09:00:00',
    status: 'scheduled',
    hashtags: ['Adventure', 'Semeru', 'OutdoorGear'],
    media: ['mountain-1.jpg', 'gear-showcase.jpg']
  },
  {
    id: 'post-2',
    platform: 'TikTok',
    content: 'Tips memilih sepatu hiking yang tepat untuk medan Indonesia 👟 Tutorial lengkap!',
    scheduledTime: '2024-08-20T15:00:00',
    status: 'scheduled',
    hashtags: ['HikingTips', 'Indonesia', 'Tutorial'],
    media: ['hiking-boots-video.mp4']
  }
])

// Content templates
const contentTemplates = ref([
  {
    id: 'template-1',
    title: 'Product Showcase',
    category: 'product',
    description: 'Template untuk menampilkan produk baru atau unggulan',
    sampleContent: 'Introducing our latest camping gear! Perfect for your next adventure in Indonesia 🇮🇩 #NewProduct #Camping',
    engagementRate: 12.5
  },
  {
    id: 'template-2',
    title: 'Adventure Story',
    category: 'adventure',
    description: 'Template untuk berbagi cerita petualangan customer',
    sampleContent: 'Customer story: Amazing hiking experience at Mount Bromo with our premium backpack! 🎒 #CustomerStory #Bromo',
    engagementRate: 18.3
  },
  {
    id: 'template-3',
    title: 'Educational Tips',
    category: 'educational',
    description: 'Template untuk konten edukatif outdoor',
    sampleContent: 'Pro tip: Always check the weather forecast before your hiking trip! Stay safe out there 🌤️ #OutdoorTips #Safety',
    engagementRate: 15.8
  },
  {
    id: 'template-4',
    title: 'Indonesian Destinations',
    category: 'destination',
    description: 'Template untuk promosi destinasi outdoor Indonesia',
    sampleContent: 'Discover the beauty of Raja Ampat! Perfect destination for underwater adventures 🏝️ #RajaAmpat #Indonesia',
    engagementRate: 22.1
  }
])

// Hashtag categories
const hashtagCategories = ref([
  {
    name: 'Outdoor Activities',
    icon: 'i-lucide-mountain',
    tags: ['hiking', 'camping', 'climbing', 'adventure', 'outdoor', 'nature', 'exploration', 'trekking']
  },
  {
    name: 'Indonesian Locations',
    icon: 'i-lucide-map-pin',
    tags: ['indonesia', 'semeru', 'bromo', 'rinjani', 'rajaampat', 'lombok', 'bali', 'jogja', 'bandung']
  },
  {
    name: 'Products',
    icon: 'i-lucide-shopping-bag',
    tags: ['gear', 'equipment', 'backpack', 'tent', 'boots', 'jacket', 'sleeping bag', 'compass']
  },
  {
    name: 'Community',
    icon: 'i-lucide-users',
    tags: ['adventurer', 'explorer', 'community', 'friends', 'team', 'together', 'sharing', 'experience']
  }
])

// Platform analytics
const platformAnalytics = ref([
  {
    name: 'Instagram',
    followers: '45.2K',
    icon: 'i-lucide-instagram',
    iconColor: 'text-pink-600',
    metrics: {
      posts: 128,
      engagement: 5.2,
      reach: '12.5K'
    }
  },
  {
    name: 'TikTok',
    followers: '28.5K',
    icon: 'i-lucide-music',
    iconColor: 'text-gray-800',
    metrics: {
      posts: 89,
      engagement: 8.7,
      reach: '25.3K'
    }
  },
  {
    name: 'Facebook',
    followers: '32.1K',
    icon: 'i-lucide-facebook',
    iconColor: 'text-blue-600',
    metrics: {
      posts: 156,
      engagement: 3.8,
      reach: '8.9K'
    }
  }
])

// Best performing posts
const bestPosts = ref([
  {
    id: 'best-1',
    platform: 'TikTok',
    content: 'Tutorial setup tenda dalam 60 detik! 🏕️ Life hack untuk camper pemula',
    publishedDate: '2024-08-10',
    metrics: {
      likes: 12500,
      shares: 890,
      comments: 234
    }
  },
  {
    id: 'best-2',
    platform: 'Instagram',
    content: 'Sunrise di Puncak Semeru bersama gear terpercaya! 🌅 #SemeruAdventure',
    publishedDate: '2024-08-08',
    metrics: {
      likes: 8900,
      shares: 456,
      comments: 189
    }
  }
])

// Available platforms for posting
const availablePlatforms = ref([
  { name: 'Instagram', icon: 'i-lucide-instagram', iconColor: 'text-pink-600' },
  { name: 'TikTok', icon: 'i-lucide-music', iconColor: 'text-gray-800' },
  { name: 'Facebook', icon: 'i-lucide-facebook', iconColor: 'text-blue-600' },
  { name: 'YouTube', icon: 'i-lucide-youtube', iconColor: 'text-red-600' }
])

// New post form data
const newPost = ref({
  platforms: [] as string[],
  content: '',
  scheduledDate: '',
  scheduledTime: '',
  hashtags: ''
})

// Utility functions
const formatIndonesianDateTime = (date: Date) => {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getPlatformIcon = (platform: string) => {
  const icons: Record<string, string> = {
    'Instagram': 'i-lucide-instagram',
    'TikTok': 'i-lucide-music',
    'Facebook': 'i-lucide-facebook',
    'YouTube': 'i-lucide-youtube'
  }
  return icons[platform] || 'i-lucide-share-2'
}

const getPlatformIconColor = (platform: string) => {
  const colors: Record<string, string> = {
    'Instagram': 'text-pink-600',
    'TikTok': 'text-gray-800',
    'Facebook': 'text-blue-600',
    'YouTube': 'text-red-600'
  }
  return colors[platform] || 'text-gray-600'
}

const getPlatformColor = (platform: string) => {
  const colors: Record<string, string> = {
    'Instagram': 'bg-pink-50 border-pink-200',
    'TikTok': 'bg-gray-50 border-gray-200',
    'Facebook': 'bg-blue-50 border-blue-200',
    'YouTube': 'bg-red-50 border-red-200'
  }
  return colors[platform] || 'bg-gray-50 border-gray-200'
}

const getScheduledPosts = (day: string, time: string) => {
  // Mock function - in real app would filter actual scheduled posts
  return []
}

// Actions
const generateContentPlan = () => {
  console.log('Generate content plan for:', selectedMonth.value)
}

const editScheduledPost = (post: any) => {
  console.log('Edit scheduled post:', post)
}

const editPost = (post: any) => {
  console.log('Edit post:', post)
}

const deletePost = (post: any) => {
  console.log('Delete post:', post)
}

const useTemplate = (template: any) => {
  newPost.value.content = template.sampleContent
  showCreatePostModal.value = true
}

const addHashtag = (hashtag: string) => {
  if (!selectedHashtags.value.includes(hashtag)) {
    selectedHashtags.value.push(hashtag)
  }
}

const removeHashtag = (hashtag: string) => {
  selectedHashtags.value = selectedHashtags.value.filter(h => h !== hashtag)
}

const togglePlatform = (platform: string) => {
  const index = newPost.value.platforms.indexOf(platform)
  if (index > -1) {
    newPost.value.platforms.splice(index, 1)
  } else {
    newPost.value.platforms.push(platform)
  }
}

const createPost = () => {
  console.log('Create post:', newPost.value)
  showCreatePostModal.value = false
  // Reset form
  newPost.value = {
    platforms: [],
    content: '',
    scheduledDate: '',
    scheduledTime: '',
    hashtags: ''
  }
}
</script>