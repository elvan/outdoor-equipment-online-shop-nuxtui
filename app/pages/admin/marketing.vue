<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Marketing Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-megaphone" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Marketing Dashboard</h1>
              <p class="text-xs text-gray-600">Campaign Management & Promotions</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UButton color="emerald" @click="showCreateCampaignModal = true">
              <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
              Buat Kampanye
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Marketing Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in marketingTabs"
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

      <!-- Campaign Overview -->
      <div v-if="activeTab === 'campaigns'">
        <!-- Campaign Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in campaignStats" :key="stat.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div :class="['p-3 rounded-lg', stat.bgColor]">
                <UIcon :name="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">{{ stat.label }}</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                <p :class="['text-xs', stat.trend.isPositive ? 'text-green-600' : 'text-red-600']">
                  <UIcon :name="stat.trend.isPositive ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="w-3 h-3 mr-1 inline-block" />
                  {{ stat.trend.value }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Active Campaigns -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Kampanye Aktif</h3>
          <div class="space-y-4">
            <div v-for="campaign in activeCampaigns" :key="campaign.id" class="border border-gray-200 rounded-lg p-6 hover:bg-gray-50">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h4 class="text-lg font-medium text-gray-900">{{ campaign.name }}</h4>
                  <p class="text-sm text-gray-600">{{ campaign.description }}</p>
                </div>
                <div class="flex items-center space-x-3">
                  <span :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ getCampaignStatusLabel(campaign.status) }}
                  </span>
                  <UButton color="gray" variant="ghost" size="sm">
                    <UIcon name="i-lucide-more-horizontal" class="w-4 h-4" />
                  </UButton>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</p>
                  <p class="text-sm text-gray-900">{{ formatDateRange(campaign.startDate, campaign.endDate) }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Target</p>
                  <p class="text-sm text-gray-900">{{ campaign.targetAudience }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</p>
                  <p class="text-sm text-gray-900">{{ formatIDR(campaign.budget) }}</p>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</p>
                  <p class="text-sm text-gray-900">{{ formatIDR(campaign.spent) }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="text-center">
                  <p class="text-2xl font-semibold text-gray-900">{{ campaign.metrics.impressions.toLocaleString() }}</p>
                  <p class="text-xs text-gray-600">Impressions</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-semibold text-gray-900">{{ campaign.metrics.clicks.toLocaleString() }}</p>
                  <p class="text-xs text-gray-600">Clicks</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-semibold text-gray-900">{{ campaign.metrics.conversions }}</p>
                  <p class="text-xs text-gray-600">Conversions</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-semibold text-gray-900">{{ campaign.metrics.roi }}%</p>
                  <p class="text-xs text-gray-600">ROI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Promotions -->
      <div v-if="activeTab === 'promotions'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Flash Sales -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Flash Sale & Promo</h3>
              <UButton color="emerald" size="sm">
                <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
                Tambah Promo
              </UButton>
            </div>

            <div class="space-y-4">
              <div v-for="promo in activePromotions" :key="promo.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ promo.title }}</h4>
                    <p class="text-sm text-gray-600">{{ promo.description }}</p>
                  </div>
                  <div class="text-right">
                    <span :class="[
                      'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                      promo.type === 'flash-sale' ? 'bg-red-100 text-red-800' :
                      promo.type === 'discount' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    ]">
                      {{ promo.discount }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center text-gray-500">
                    <UIcon name="i-lucide-clock" class="w-4 h-4 mr-1" />
                    <span>{{ formatDateRange(promo.startDate, promo.endDate) }}</span>
                  </div>
                  <div class="text-gray-900">
                    <span class="font-medium">{{ promo.usage }}</span> / {{ promo.limit }} digunakan
                  </div>
                </div>

                <div class="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    :class="['bg-emerald-600 h-1.5 rounded-full']" 
                    :style="{ width: (promo.usage / promo.limit * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Indonesian Seasonal Campaigns -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Kampanye Musiman</h3>
            
            <div class="space-y-4">
              <div v-for="seasonal in seasonalCampaigns" :key="seasonal.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center mb-3">
                  <UIcon :name="seasonal.icon" :class="['w-8 h-8 mr-3', seasonal.iconColor]" />
                  <div>
                    <h4 class="font-medium text-gray-900">{{ seasonal.name }}</h4>
                    <p class="text-xs text-gray-600">{{ seasonal.period }}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ seasonal.description }}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">Target Sales</span>
                  <span class="font-medium text-gray-900">{{ formatIDR(seasonal.targetSales) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Marketing -->
      <div v-if="activeTab === 'content'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Adventure Blog Content -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Adventure Blog</h3>
              <UButton color="emerald" size="sm">
                <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
                New Article
              </UButton>
            </div>

            <div class="space-y-4">
              <div v-for="article in blogArticles" :key="article.id" class="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <img :src="article.image" :alt="article.title" class="w-16 h-16 rounded-lg object-cover">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 mb-1">{{ article.title }}</h4>
                  <p class="text-sm text-gray-600 mb-2">{{ article.excerpt }}</p>
                  <div class="flex items-center text-xs text-gray-500">
                    <span>{{ article.author }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ formatIndonesianDate(new Date(article.publishedAt)) }}</span>
                    <span class="mx-2">•</span>
                    <span class="text-emerald-600">{{ article.views }} views</span>
                  </div>
                </div>
                <UButton color="gray" variant="ghost" size="sm">
                  <UIcon name="i-lucide-edit" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>

          <!-- Social Media Content -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Social Media</h3>
              <UButton color="emerald" size="sm">
                <UIcon name="i-lucide-calendar" class="w-4 h-4 mr-2" />
                Schedule Post
              </UButton>
            </div>

            <!-- Platform Stats -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div v-for="platform in socialPlatforms" :key="platform.name" class="text-center p-4 border border-gray-200 rounded-lg">
                <UIcon :name="platform.icon" :class="['w-8 h-8 mx-auto mb-2', platform.color]" />
                <p class="text-sm font-medium text-gray-900">{{ platform.name }}</p>
                <p class="text-xs text-gray-600">{{ platform.followers }} followers</p>
                <p class="text-xs text-green-600">+{{ platform.growth }}%</p>
              </div>
            </div>

            <!-- Recent Posts -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Postingan Terbaru</h4>
              <div class="space-y-3">
                <div v-for="post in recentPosts" :key="post.id" class="flex items-center space-x-3">
                  <img :src="post.image" :alt="post.content" class="w-12 h-12 rounded-lg object-cover">
                  <div class="flex-1">
                    <p class="text-sm text-gray-900">{{ post.content }}</p>
                    <p class="text-xs text-gray-500">{{ post.platform }} • {{ post.engagement }} engagements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indonesian Community -->
      <div v-if="activeTab === 'community'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Community Stats -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Komunitas Adventurer</h3>
            
            <div class="space-y-4">
              <div class="text-center p-4 bg-emerald-50 rounded-lg">
                <UIcon name="i-lucide-users" class="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                <p class="text-2xl font-semibold text-emerald-900">2,450</p>
                <p class="text-sm text-emerald-600">Total Members</p>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div class="text-center p-3 border border-gray-200 rounded-lg">
                  <p class="text-lg font-semibold text-gray-900">156</p>
                  <p class="text-xs text-gray-600">Hiking Groups</p>
                </div>
                <div class="text-center p-3 border border-gray-200 rounded-lg">
                  <p class="text-lg font-semibold text-gray-900">89</p>
                  <p class="text-xs text-gray-600">Climbing Teams</p>
                </div>
                <div class="text-center p-3 border border-gray-200 rounded-lg">
                  <p class="text-lg font-semibold text-gray-900">234</p>
                  <p class="text-xs text-gray-600">Active Trips</p>
                </div>
                <div class="text-center p-3 border border-gray-200 rounded-lg">
                  <p class="text-lg font-semibold text-gray-900">45</p>
                  <p class="text-xs text-gray-600">Guides</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Popular Destinations -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Destinasi Populer</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="destination in popularDestinations" :key="destination.id" class="border border-gray-200 rounded-lg overflow-hidden">
                <img :src="destination.image" :alt="destination.name" class="w-full h-32 object-cover">
                <div class="p-4">
                  <h4 class="font-medium text-gray-900 mb-1">{{ destination.name }}</h4>
                  <p class="text-sm text-gray-600 mb-2">{{ destination.location }}</p>
                  <div class="flex items-center justify-between text-sm">
                    <div class="flex items-center text-gray-500">
                      <UIcon name="i-lucide-users" class="w-4 h-4 mr-1" />
                      <span>{{ destination.visitors }} visitors</span>
                    </div>
                    <div class="flex items-center text-emerald-600">
                      <UIcon name="i-lucide-star" class="w-4 h-4 mr-1" />
                      <span>{{ destination.rating }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Campaign Modal -->
    <div v-if="showCreateCampaignModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Buat Kampanye Baru</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kampanye</label>
            <input type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipe Kampanye</label>
            <select class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
              <option>Social Media</option>
              <option>Email Marketing</option>
              <option>Influencer</option>
              <option>SEO/Content</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
              <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Berakhir</label>
              <input type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <input type="number" placeholder="Rp 0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          </div>
        </div>
        <div class="flex items-center justify-end space-x-3 mt-6">
          <UButton color="gray" variant="outline" @click="showCreateCampaignModal = false">
            Batal
          </UButton>
          <UButton color="emerald" @click="showCreateCampaignModal = false">
            Buat Kampanye
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR, formatIndonesianDate } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Marketing Dashboard - Puncak Adventura',
  description: 'Marketing campaign management and promotions'
})

// Tab navigation
const activeTab = ref('campaigns')
const showCreateCampaignModal = ref(false)

const marketingTabs = [
  { id: 'campaigns', name: 'Kampanye', icon: 'i-lucide-megaphone' },
  { id: 'promotions', name: 'Promosi', icon: 'i-lucide-tag' },
  { id: 'content', name: 'Konten', icon: 'i-lucide-file-text' },
  { id: 'community', name: 'Komunitas', icon: 'i-lucide-users' },
]

// Campaign stats
const campaignStats = ref([
  {
    id: 'reach',
    label: 'Total Reach',
    value: '125K',
    icon: 'i-lucide-eye',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: { isPositive: true, value: '+18.2%' }
  },
  {
    id: 'engagement',
    label: 'Engagement Rate',
    value: '4.8%',
    icon: 'i-lucide-heart',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
    trend: { isPositive: true, value: '+0.7%' }
  },
  {
    id: 'conversions',
    label: 'Conversions',
    value: '89',
    icon: 'i-lucide-target',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: { isPositive: true, value: '+12.5%' }
  },
  {
    id: 'roas',
    label: 'ROAS',
    value: '3.2x',
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: { isPositive: false, value: '-0.3x' }
  }
])

// Active campaigns
const activeCampaigns = ref([
  {
    id: 'camp-1',
    name: 'Petualangan Gunung Semeru',
    description: 'Campaign untuk mountaineering equipment dengan fokus pendakian Semeru',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    targetAudience: 'Pendaki Gunung 25-40 tahun',
    budget: 15000000,
    spent: 8500000,
    metrics: {
      impressions: 125000,
      clicks: 3200,
      conversions: 89,
      roi: 320
    }
  },
  {
    id: 'camp-2',
    name: 'Camping Gear Sale',
    description: 'Flash sale peralatan camping untuk liburan akhir tahun',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-01-30',
    targetAudience: 'Keluarga & Camping Enthusiasts',
    budget: 8000000,
    spent: 4200000,
    metrics: {
      impressions: 89000,
      clicks: 2100,
      conversions: 56,
      roi: 285
    }
  }
])

// Active promotions
const activePromotions = ref([
  {
    id: 'promo-1',
    title: 'Flash Sale Tenda Camping',
    description: 'Diskon 40% untuk semua tenda camping',
    type: 'flash-sale',
    discount: '40% OFF',
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    usage: 156,
    limit: 200
  },
  {
    id: 'promo-2',
    title: 'Free Shipping Indonesia',
    description: 'Gratis ongkir untuk pembelian minimal Rp 500K',
    type: 'shipping',
    discount: 'FREE SHIPPING',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    usage: 423,
    limit: 1000
  }
])

// Seasonal campaigns
const seasonalCampaigns = ref([
  {
    id: 'seasonal-1',
    name: 'Musim Kemarau Adventure',
    period: 'April - September',
    description: 'Kampanye khusus peralatan untuk musim kemarau dan pendakian',
    icon: 'i-lucide-sun',
    iconColor: 'text-yellow-600',
    targetSales: 250000000
  },
  {
    id: 'seasonal-2',
    name: 'Persiapan Musim Hujan',
    period: 'Oktober - Maret',
    description: 'Fokus pada peralatan tahan air dan indoor camping',
    icon: 'i-lucide-cloud-rain',
    iconColor: 'text-blue-600',
    targetSales: 180000000
  },
  {
    id: 'seasonal-3',
    name: 'Kemerdekaan Adventure',
    period: '17 Agustus',
    description: 'Kampanye spesial HUT RI dengan tema petualangan Nusantara',
    icon: 'i-lucide-flag',
    iconColor: 'text-red-600',
    targetSales: 85000000
  }
])

// Blog articles
const blogArticles = ref([
  {
    id: 'article-1',
    title: 'Panduan Lengkap Mendaki Gunung Semeru',
    excerpt: 'Tips dan persiapan untuk pendakian tertinggi di Pulau Jawa',
    author: 'Ahmad Outdoor Guide',
    publishedAt: '2024-01-10',
    views: 12500,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: 'article-2',
    title: '10 Destinasi Camping Terbaik di Indonesia',
    excerpt: 'Rekomendasi lokasi camping dengan pemandangan menakjubkan',
    author: 'Sari Adventure Writer',
    publishedAt: '2024-01-08',
    views: 8900,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
  }
])

// Social media platforms
const socialPlatforms = ref([
  {
    name: 'Instagram',
    icon: 'i-lucide-instagram',
    color: 'text-pink-600',
    followers: '45.2K',
    growth: 12
  },
  {
    name: 'TikTok',
    icon: 'i-lucide-music',
    color: 'text-black',
    followers: '28.5K',
    growth: 25
  },
  {
    name: 'YouTube',
    icon: 'i-lucide-youtube',
    color: 'text-red-600',
    followers: '15.8K',
    growth: 8
  },
  {
    name: 'Facebook',
    icon: 'i-lucide-facebook',
    color: 'text-blue-600',
    followers: '32.1K',
    growth: 5
  }
])

// Recent posts
const recentPosts = ref([
  {
    id: 'post-1',
    content: 'Petualangan seru di Bromo bersama gear dari Puncak Adventura!',
    platform: 'Instagram',
    engagement: 156,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: 'post-2',
    content: 'Tips memilih sepatu hiking yang tepat untuk medan Indonesia',
    platform: 'TikTok',
    engagement: 89,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'
  }
])

// Popular destinations
const popularDestinations = ref([
  {
    id: 'dest-1',
    name: 'Gunung Semeru',
    location: 'Jawa Timur',
    visitors: 1250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: 'dest-2',
    name: 'Raja Ampat',
    location: 'Papua Barat',
    visitors: 890,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400'
  },
  {
    id: 'dest-3',
    name: 'Bromo Tengger',
    location: 'Jawa Timur',
    visitors: 2100,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1555400082-0ad5a21fb0d4?w=400'
  },
  {
    id: 'dest-4',
    name: 'Gunung Rinjani',
    location: 'Lombok',
    visitors: 1680,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
  }
])

// Utility functions
const getCampaignStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: 'Aktif',
    scheduled: 'Terjadwal',
    completed: 'Selesai',
    paused: 'Dijeda'
  }
  return labels[status] || status
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = formatIndonesianDate(new Date(startDate))
  const end = formatIndonesianDate(new Date(endDate))
  return `${start} - ${end}`
}
</script>