<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Analytics Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Analytics & Reporting</h1>
              <p class="text-xs text-gray-600">Indonesian Market Insights</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <USelect v-model="dateRange" :options="dateRangeOptions" />
            <UButton color="emerald" variant="outline">
              <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
              Export Report
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Revenue Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Revenue Chart -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Tren Pendapatan</h2>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600">Total:</span>
              <span class="text-2xl font-bold text-emerald-600">{{ formatIDR(totalRevenue) }}</span>
            </div>
          </div>
          
          <!-- Simulated Chart Area -->
          <div class="h-80 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
            <div class="text-center">
              <UIcon name="i-lucide-trending-up" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p class="text-gray-500 font-medium">Revenue Chart</p>
              <p class="text-sm text-gray-400">Interactive chart would be displayed here</p>
            </div>
          </div>

          <!-- Monthly Breakdown -->
          <div class="mt-6 grid grid-cols-3 gap-4">
            <div v-for="month in revenueData" :key="month.month" class="text-center">
              <p class="text-sm font-medium text-gray-600">{{ month.month }}</p>
              <p class="text-lg font-semibold text-gray-900">{{ formatIDR(month.revenue) }}</p>
              <p :class="[
                'text-xs',
                month.growth >= 0 ? 'text-green-600' : 'text-red-600'
              ]">
                {{ month.growth >= 0 ? '+' : '' }}{{ month.growth }}%
              </p>
            </div>
          </div>
        </div>

        <!-- Indonesian Market Insights -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Market Insights</h3>
          
          <!-- Payment Methods Distribution -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Metode Pembayaran Populer</h4>
            <div class="space-y-3">
              <div v-for="payment in paymentDistribution" :key="payment.method" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div :class="['w-3 h-3 rounded-full mr-3', payment.color]"></div>
                  <span class="text-sm text-gray-600">{{ payment.method }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ payment.percentage }}%</span>
              </div>
            </div>
          </div>

          <!-- Regional Sales -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Penjualan per Wilayah</h4>
            <div class="space-y-3">
              <div v-for="region in regionalSales" :key="region.region" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ region.region }}</span>
                <div class="flex items-center">
                  <div class="w-20 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      :class="['bg-emerald-600 h-2 rounded-full']" 
                      :style="{ width: region.percentage + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900">{{ region.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Seasonal Trends -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-4">Tren Musiman</h4>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-blue-50 rounded-lg p-3 text-center">
                <UIcon name="i-lucide-sun" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p class="text-xs font-medium text-blue-600">Musim Kemarau</p>
                <p class="text-lg font-semibold text-blue-900">+25%</p>
              </div>
              <div class="bg-green-50 rounded-lg p-3 text-center">
                <UIcon name="i-lucide-cloud-rain" class="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p class="text-xs font-medium text-green-600">Musim Hujan</p>
                <p class="text-lg font-semibold text-green-900">-15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Performance -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Top Products -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Produk Terlaris</h3>
          <div class="space-y-4">
            <div v-for="(product, index) in topProducts" :key="product.id" class="flex items-center">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4',
                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                index === 1 ? 'bg-gray-100 text-gray-800' :
                index === 2 ? 'bg-orange-100 text-orange-800' :
                'bg-gray-50 text-gray-600'
              ]">
                {{ index + 1 }}
              </div>
              <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover mr-4">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                <p class="text-xs text-gray-500">{{ product.category }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ product.unitsSold }} terjual</p>
                <p class="text-xs text-gray-500">{{ formatIDR(product.revenue) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Category Performance -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Performa Kategori</h3>
          <div class="space-y-4">
            <div v-for="category in categoryPerformance" :key="category.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <UIcon :name="category.icon" :class="['w-8 h-8 mr-4', category.iconColor]" />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
                  <p class="text-xs text-gray-500">{{ category.products }} produk</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ formatIDR(category.revenue) }}</p>
                <p :class="[
                  'text-xs',
                  category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ category.growth >= 0 ? '+' : '' }}{{ category.growth }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Customer Acquisition -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Akuisisi Pelanggan</h3>
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600">Pelanggan Baru</span>
              <span class="text-sm font-medium text-gray-900">156</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-emerald-600 h-2 rounded-full" style="width: 78%"></div>
            </div>
          </div>
          
          <div class="space-y-3">
            <div v-for="source in acquisitionSources" :key="source.name" class="flex items-center justify-between">
              <span class="text-xs text-gray-600">{{ source.name }}</span>
              <span class="text-xs font-medium text-gray-900">{{ source.count }}</span>
            </div>
          </div>
        </div>

        <!-- Customer Retention -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Retensi Pelanggan</h3>
          <div class="text-center mb-6">
            <div class="w-24 h-24 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span class="text-2xl font-bold text-white">72%</span>
            </div>
            <p class="text-sm text-gray-600">Tingkat Retensi</p>
          </div>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-600">Pelanggan Kembali</span>
              <span class="text-xs font-medium text-gray-900">+18%</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-600">Rata-rata Pembelian</span>
              <span class="text-xs font-medium text-gray-900">3.2x</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-600">Customer LTV</span>
              <span class="text-xs font-medium text-gray-900">{{ formatIDR(2650000) }}</span>
            </div>
          </div>
        </div>

        <!-- Demographics -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Demografi Pelanggan</h3>
          <div class="space-y-4">
            <!-- Age Groups -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Kelompok Usia</h4>
              <div class="space-y-2">
                <div v-for="age in ageGroups" :key="age.range" class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">{{ age.range }}</span>
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        :class="['bg-emerald-600 h-1.5 rounded-full']" 
                        :style="{ width: age.percentage + '%' }"
                      ></div>
                    </div>
                    <span class="text-xs font-medium text-gray-900">{{ age.percentage }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Gender -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Gender</h4>
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-600">Laki-laki</span>
                </div>
                <span class="text-xs font-medium text-gray-900">65%</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-600">Perempuan</span>
                </div>
                <span class="text-xs font-medium text-gray-900">35%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Intelligence -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Business Intelligence</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Profit Margin -->
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-lucide-percent" class="w-8 h-8 text-green-600" />
            </div>
            <p class="text-sm font-medium text-gray-600">Profit Margin</p>
            <p class="text-2xl font-semibold text-gray-900">28.5%</p>
            <p class="text-xs text-green-600">+2.1% from last month</p>
          </div>

          <!-- Inventory Turnover -->
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-lucide-refresh-cw" class="w-8 h-8 text-blue-600" />
            </div>
            <p class="text-sm font-medium text-gray-600">Inventory Turnover</p>
            <p class="text-2xl font-semibold text-gray-900">4.2x</p>
            <p class="text-xs text-blue-600">Optimal range</p>
          </div>

          <!-- Average Order Value -->
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-lucide-shopping-cart" class="w-8 h-8 text-purple-600" />
            </div>
            <p class="text-sm font-medium text-gray-600">AOV</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatIDR(875000) }}</p>
            <p class="text-xs text-purple-600">+12% growth</p>
          </div>

          <!-- Conversion Rate -->
          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <UIcon name="i-lucide-target" class="w-8 h-8 text-yellow-600" />
            </div>
            <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p class="text-2xl font-semibold text-gray-900">3.2%</p>
            <p class="text-xs text-red-600">-0.3% needs improvement</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Analytics Dashboard - Puncak Adventura',
  description: 'Indonesian market analytics and insights'
})

// Date range filter
const dateRange = ref('30-days')
const dateRangeOptions = [
  { label: '7 Hari Terakhir', value: '7-days' },
  { label: '30 Hari Terakhir', value: '30-days' },
  { label: '3 Bulan Terakhir', value: '3-months' },
  { label: 'Tahun Ini', value: 'year' }
]

// Revenue data
const totalRevenue = ref(125750000)
const revenueData = ref([
  { month: 'Nov', revenue: 98500000, growth: 8.2 },
  { month: 'Des', revenue: 112300000, growth: 14.1 },
  { month: 'Jan', revenue: 125750000, growth: 11.9 }
])

// Indonesian market insights
const paymentDistribution = ref([
  { method: 'GoPay', percentage: 35, color: 'bg-green-500' },
  { method: 'Bank Transfer', percentage: 28, color: 'bg-blue-500' },
  { method: 'Cash on Delivery', percentage: 22, color: 'bg-yellow-500' },
  { method: 'OVO', percentage: 15, color: 'bg-purple-500' }
])

const regionalSales = ref([
  { region: 'Jawa Barat', percentage: 32 },
  { region: 'DKI Jakarta', percentage: 28 },
  { region: 'Jawa Timur', percentage: 18 },
  { region: 'Jawa Tengah', percentage: 12 },
  { region: 'Sumatra', percentage: 10 }
])

// Product performance
const topProducts = ref([
  {
    id: 1,
    name: 'Tenda Eiger Adventure 2P',
    category: 'Camping',
    unitsSold: 145,
    revenue: 15650000,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400'
  },
  {
    id: 2,
    name: 'Carrier Consina Expedition 75L',
    category: 'Hiking',
    unitsSold: 98,
    revenue: 12250000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
  },
  {
    id: 3,
    name: 'Sepatu Hiking Salewa Alpine',
    category: 'Apparel',
    unitsSold: 87,
    revenue: 8950000,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'
  }
])

const categoryPerformance = ref([
  {
    name: 'Mountaineering',
    products: 45,
    revenue: 45200000,
    growth: 18.5,
    icon: 'i-lucide-mountain',
    iconColor: 'text-emerald-600'
  },
  {
    name: 'Camping',
    products: 38,
    revenue: 38750000,
    growth: 12.3,
    icon: 'i-lucide-tent',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Hiking',
    products: 52,
    revenue: 32100000,
    growth: 8.7,
    icon: 'i-lucide-backpack',
    iconColor: 'text-green-600'
  },
  {
    name: 'Apparel',
    products: 29,
    revenue: 18900000,
    growth: -2.1,
    icon: 'i-lucide-shirt',
    iconColor: 'text-purple-600'
  }
])

// Customer analytics
const acquisitionSources = ref([
  { name: 'Instagram', count: 45 },
  { name: 'Google Search', count: 38 },
  { name: 'Referral', count: 28 },
  { name: 'Facebook', count: 22 },
  { name: 'Direct', count: 18 },
  { name: 'WhatsApp', count: 15 }
])

const ageGroups = ref([
  { range: '18-25', percentage: 35 },
  { range: '26-35', percentage: 45 },
  { range: '36-45', percentage: 15 },
  { range: '46+', percentage: 5 }
])
</script>