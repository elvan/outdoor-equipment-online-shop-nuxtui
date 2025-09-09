<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Reports Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-file-bar-chart" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Advanced Reports</h1>
              <p class="text-xs text-gray-600">Comprehensive Business Intelligence</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <USelect v-model="reportPeriod" :options="periodOptions" />
            <UButton color="emerald" @click="generateReport">
              <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
              Export Report
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Report Navigation -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in reportTabs"
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

      <!-- Sales Performance Reports -->
      <div v-if="activeTab === 'sales'">
        <!-- Executive Summary -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Executive Summary</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="metric in executiveMetrics" :key="metric.id" class="text-center">
              <div :class="['w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3', metric.bgColor]">
                <UIcon :name="metric.icon" :class="['w-8 h-8', metric.iconColor]" />
              </div>
              <p class="text-sm font-medium text-gray-600">{{ metric.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metric.value }}</p>
              <p :class="['text-xs', metric.trend >= 0 ? 'text-green-600' : 'text-red-600']">
                {{ metric.trend >= 0 ? '+' : '' }}{{ metric.trend }}% YoY
              </p>
            </div>
          </div>
        </div>

        <!-- Sales Trends -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Revenue by Month -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Revenue Trend (IDR)</h3>
            <div class="h-80 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
              <div class="text-center">
                <UIcon name="i-lucide-trending-up" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p class="text-gray-500 font-medium">Monthly Revenue Chart</p>
                <p class="text-sm text-gray-400">12-month revenue trend visualization</p>
              </div>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div class="text-center">
                <p class="text-gray-600">Highest Month</p>
                <p class="font-semibold text-gray-900">Desember</p>
                <p class="text-emerald-600">{{ formatIDR(156750000) }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600">Lowest Month</p>
                <p class="font-semibold text-gray-900">Februari</p>
                <p class="text-red-600">{{ formatIDR(89250000) }}</p>
              </div>
              <div class="text-center">
                <p class="text-gray-600">Average</p>
                <p class="font-semibold text-gray-900">{{ formatIDR(125400000) }}</p>
                <p class="text-blue-600">Monthly</p>
              </div>
            </div>
          </div>

          <!-- Sales by Category -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
            <div class="space-y-4">
              <div v-for="category in categorySales" :key="category.name" class="flex items-center justify-between">
                <div class="flex items-center">
                  <UIcon :name="category.icon" :class="['w-8 h-8 mr-4', category.iconColor]" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ category.name }}</p>
                    <p class="text-xs text-gray-500">{{ category.items }} items sold</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">{{ formatIDR(category.revenue) }}</p>
                  <div class="flex items-center mt-1">
                    <div class="w-20 bg-gray-200 rounded-full h-1.5 mr-2">
                      <div 
                        :class="['bg-emerald-600 h-1.5 rounded-full']" 
                        :style="{ width: category.percentage + '%' }"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600">{{ category.percentage }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Regional Sales Analysis -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Regional Sales Performance</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div v-for="region in regionalPerformance" :key="region.region" class="text-center">
              <div class="w-24 h-24 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-lg font-bold text-gray-700">{{ region.percentage }}%</span>
              </div>
              <p class="text-sm font-medium text-gray-900">{{ region.region }}</p>
              <p class="text-xs text-gray-600">{{ formatIDR(region.revenue) }}</p>
              <p class="text-xs text-gray-500">{{ region.orders }} orders</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Analytics -->
      <div v-if="activeTab === 'customers'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Customer Segmentation -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Customer Segmentation Analysis</h3>
            
            <!-- RFM Analysis -->
            <div class="mb-8">
              <h4 class="text-sm font-medium text-gray-700 mb-4">RFM Analysis (Recency, Frequency, Monetary)</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="segment in customerSegments" :key="segment.name" class="border border-gray-200 rounded-lg p-4 text-center">
                  <div :class="['w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2', segment.bgColor]">
                    <UIcon :name="segment.icon" :class="['w-6 h-6', segment.iconColor]" />
                  </div>
                  <p class="text-sm font-medium text-gray-900">{{ segment.name }}</p>
                  <p class="text-lg font-semibold text-gray-900">{{ segment.count }}</p>
                  <p class="text-xs text-gray-600">{{ segment.percentage }}%</p>
                </div>
              </div>
            </div>

            <!-- Customer Journey -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Customer Journey Funnel</h4>
              <div class="space-y-3">
                <div v-for="stage in customerJourney" :key="stage.stage" class="flex items-center">
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-sm font-medium text-gray-900">{{ stage.stage }}</span>
                      <span class="text-sm text-gray-600">{{ stage.count.toLocaleString() }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        :class="['bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full']" 
                        :style="{ width: stage.percentage + '%' }"
                      ></div>
                    </div>
                  </div>
                  <div class="ml-4 text-right">
                    <span class="text-xs text-gray-500">{{ stage.percentage }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Insights -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Customer Insights</h3>
            
            <!-- Demographics -->
            <div class="mb-8">
              <h4 class="text-sm font-medium text-gray-700 mb-4">Demographics</h4>
              
              <!-- Age Distribution -->
              <div class="mb-6">
                <p class="text-xs font-medium text-gray-600 mb-2">Age Groups</p>
                <div class="space-y-2">
                  <div v-for="age in ageDistribution" :key="age.range" class="flex items-center justify-between">
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

              <!-- Geographic Distribution -->
              <div>
                <p class="text-xs font-medium text-gray-600 mb-2">Top Provinces</p>
                <div class="space-y-2">
                  <div v-for="province in topProvinces" :key="province.name" class="flex items-center justify-between">
                    <span class="text-xs text-gray-600">{{ province.name }}</span>
                    <span class="text-xs font-medium text-gray-900">{{ province.customers }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Loyalty Metrics -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Loyalty Program</h4>
              <div class="space-y-3">
                <div v-for="tier in loyaltyTiers" :key="tier.name" class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div :class="['w-3 h-3 rounded-full mr-2', tier.color]"></div>
                    <span class="text-xs text-gray-600">{{ tier.name }}</span>
                  </div>
                  <span class="text-xs font-medium text-gray-900">{{ tier.members }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Business Intelligence -->
      <div v-if="activeTab === 'business'">
        <!-- Financial Overview -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Financial Performance</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="metric in financialMetrics" :key="metric.label" class="text-center">
              <div :class="['w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3', metric.bgColor]">
                <UIcon :name="metric.icon" :class="['w-8 h-8', metric.iconColor]" />
              </div>
              <p class="text-sm font-medium text-gray-600">{{ metric.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ metric.value }}</p>
              <p class="text-xs text-gray-500">{{ metric.description }}</p>
            </div>
          </div>
        </div>

        <!-- Operational Metrics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Inventory Analysis -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Inventory Analysis</h3>
            <div class="space-y-4">
              <div v-for="metric in inventoryMetrics" :key="metric.label" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <UIcon :name="metric.icon" :class="['w-8 h-8 mr-4', metric.iconColor]" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ metric.label }}</p>
                    <p class="text-xs text-gray-600">{{ metric.description }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">{{ metric.value }}</p>
                  <p :class="['text-xs', metric.status === 'good' ? 'text-green-600' : metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600']">
                    {{ metric.statusText }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Marketing ROI -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibent text-gray-900 mb-6">Marketing ROI</h3>
            <div class="space-y-4">
              <div v-for="channel in marketingChannels" :key="channel.name" class="flex items-center justify-between">
                <div class="flex items-center">
                  <UIcon :name="channel.icon" :class="['w-6 h-6 mr-3', channel.iconColor]" />
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ channel.name }}</p>
                    <p class="text-xs text-gray-600">{{ channel.campaigns }} campaigns</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">{{ channel.roi }}x ROI</p>
                  <p class="text-xs text-gray-600">{{ formatIDR(channel.spent) }} spent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Indonesian Market Trends -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Market Trends</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="trend in marketTrends" :key="trend.title" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <UIcon :name="trend.icon" :class="['w-8 h-8 mr-3', trend.iconColor]" />
                <h4 class="font-medium text-gray-900">{{ trend.title }}</h4>
              </div>
              <p class="text-sm text-gray-600 mb-3">{{ trend.description }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Impact</span>
                <span :class="[
                  'text-xs font-medium',
                  trend.impact === 'high' ? 'text-red-600' :
                  trend.impact === 'medium' ? 'text-yellow-600' :
                  'text-green-600'
                ]">
                  {{ trend.impact.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Competitive Analysis -->
      <div v-if="activeTab === 'competitive'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Competitive Landscape</h3>
          
          <!-- Market Position -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Market Position Analysis</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="competitor in competitors" :key="competitor.name" class="border border-gray-200 rounded-lg p-4 text-center">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span class="text-sm font-bold text-gray-700">{{ competitor.rank }}</span>
                </div>
                <p class="text-sm font-medium text-gray-900">{{ competitor.name }}</p>
                <p class="text-xs text-gray-600">{{ competitor.marketShare }}% market share</p>
                <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      :class="[
                        'h-1.5 rounded-full',
                        competitor.name === 'Puncak Adventura' ? 'bg-emerald-600' : 'bg-gray-400'
                      ]" 
                      :style="{ width: competitor.marketShare + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Analysis -->
          <div class="mb-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Pricing Comparison</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Category</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Our Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Competitor Avg</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="category in pricingComparison" :key="category.category" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ category.category }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatIDR(category.ourPrice) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatIDR(category.competitorAvg) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        category.position === 'competitive' ? 'bg-green-100 text-green-800' :
                        category.position === 'premium' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      ]">
                        {{ category.position }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Feature Comparison -->
          <div>
            <h4 class="text-sm font-medium text-gray-700 mb-4">Feature Comparison</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 class="text-sm font-medium text-gray-900 mb-3">Our Advantages</h5>
                <ul class="space-y-2">
                  <li v-for="advantage in ourAdvantages" :key="advantage" class="flex items-center text-sm text-gray-600">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-green-600 mr-2" />
                    {{ advantage }}
                  </li>
                </ul>
              </div>
              <div>
                <h5 class="text-sm font-medium text-gray-900 mb-3">Areas for Improvement</h5>
                <ul class="space-y-2">
                  <li v-for="improvement in ourImprovements" :key="improvement" class="flex items-center text-sm text-gray-600">
                    <UIcon name="i-lucide-alert-circle" class="w-4 h-4 text-yellow-600 mr-2" />
                    {{ improvement }}
                  </li>
                </ul>
              </div>
            </div>
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
  title: 'Advanced Reports - Puncak Adventura',
  description: 'Comprehensive business intelligence and analytics reports'
})

// Report configuration
const activeTab = ref('sales')
const reportPeriod = ref('quarterly')

const periodOptions = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Custom Range', value: 'custom' }
]

const reportTabs = [
  { id: 'sales', name: 'Sales Performance', icon: 'i-lucide-trending-up' },
  { id: 'customers', name: 'Customer Analytics', icon: 'i-lucide-users' },
  { id: 'business', name: 'Business Intelligence', icon: 'i-lucide-brain' },
  { id: 'competitive', name: 'Competitive Analysis', icon: 'i-lucide-target' },
]

// Executive metrics
const executiveMetrics = ref([
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: formatIDR(1505800000),
    icon: 'i-lucide-dollar-sign',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: 18.5
  },
  {
    id: 'orders',
    label: 'Total Orders',
    value: '4,127',
    icon: 'i-lucide-shopping-bag',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: 22.1
  },
  {
    id: 'customers',
    label: 'Active Customers',
    value: '2,891',
    icon: 'i-lucide-users',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: 12.8
  },
  {
    id: 'aov',
    label: 'Avg Order Value',
    value: formatIDR(875000),
    icon: 'i-lucide-calculator',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: 8.7
  }
])

// Category sales data
const categorySales = ref([
  {
    name: 'Mountaineering',
    icon: 'i-lucide-mountain',
    iconColor: 'text-emerald-600',
    revenue: 452300000,
    items: 1245,
    percentage: 30
  },
  {
    name: 'Camping',
    icon: 'i-lucide-tent',
    iconColor: 'text-blue-600',
    revenue: 387500000,
    items: 1087,
    percentage: 26
  },
  {
    name: 'Hiking',
    icon: 'i-lucide-backpack',
    iconColor: 'text-green-600',
    revenue: 321000000,
    items: 956,
    percentage: 21
  },
  {
    name: 'Apparel',
    icon: 'i-lucide-shirt',
    iconColor: 'text-purple-600',
    revenue: 189000000,
    items: 687,
    percentage: 13
  },
  {
    name: 'Accessories',
    icon: 'i-lucide-compass',
    iconColor: 'text-orange-600',
    revenue: 156000000,
    items: 512,
    percentage: 10
  }
])

// Regional performance
const regionalPerformance = ref([
  { region: 'Jawa Barat', revenue: 481740000, percentage: 32, orders: 1320 },
  { region: 'DKI Jakarta', revenue: 421624000, percentage: 28, orders: 1156 },
  { region: 'Jawa Timur', revenue: 271044000, percentage: 18, orders: 742 },
  { region: 'Jawa Tengah', revenue: 180696000, percentage: 12, orders: 495 },
  { region: 'Other Islands', revenue: 150696000, percentage: 10, orders: 414 }
])

// Customer segmentation
const customerSegments = ref([
  {
    name: 'Champions',
    count: '234',
    percentage: '8.1',
    icon: 'i-lucide-crown',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    name: 'Loyal Customers',
    count: '567',
    percentage: '19.6',
    icon: 'i-lucide-heart',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    name: 'Potential Loyalists',
    count: '892',
    percentage: '30.9',
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'At Risk',
    count: '456',
    percentage: '15.8',
    icon: 'i-lucide-alert-triangle',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  }
])

// Customer journey funnel
const customerJourney = ref([
  { stage: 'Website Visitors', count: 125000, percentage: 100 },
  { stage: 'Product Views', count: 89500, percentage: 72 },
  { stage: 'Add to Cart', count: 23750, percentage: 19 },
  { stage: 'Checkout Started', count: 8500, percentage: 7 },
  { stage: 'Purchase Completed', count: 4127, percentage: 3.3 }
])

// Demographics
const ageDistribution = ref([
  { range: '18-25', percentage: 28 },
  { range: '26-35', percentage: 42 },
  { range: '36-45', percentage: 22 },
  { range: '46+', percentage: 8 }
])

const topProvinces = ref([
  { name: 'Jawa Barat', customers: 892 },
  { name: 'DKI Jakarta', customers: 756 },
  { name: 'Jawa Timur', customers: 634 },
  { name: 'Banten', customers: 423 },
  { name: 'Jawa Tengah', customers: 378 }
])

const loyaltyTiers = ref([
  { name: 'Bronze', members: 1456, color: 'bg-orange-400' },
  { name: 'Silver', members: 789, color: 'bg-gray-400' },
  { name: 'Gold', members: 423, color: 'bg-yellow-400' },
  { name: 'Platinum', members: 123, color: 'bg-purple-400' }
])

// Financial metrics
const financialMetrics = ref([
  {
    label: 'Gross Profit',
    value: formatIDR(429674000),
    icon: 'i-lucide-dollar-sign',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    description: '28.5% margin'
  },
  {
    label: 'Operating Costs',
    value: formatIDR(312450000),
    icon: 'i-lucide-credit-card',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    description: '20.7% of revenue'
  },
  {
    label: 'Net Profit',
    value: formatIDR(117224000),
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: '7.8% net margin'
  },
  {
    label: 'Cash Flow',
    value: formatIDR(89567000),
    icon: 'i-lucide-banknote',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    description: 'Positive flow'
  }
])

// Inventory metrics
const inventoryMetrics = ref([
  {
    label: 'Inventory Turnover',
    value: '4.2x',
    icon: 'i-lucide-refresh-cw',
    iconColor: 'text-green-600',
    description: 'Annual turnover rate',
    status: 'good',
    statusText: 'Optimal'
  },
  {
    label: 'Stock Coverage',
    value: '87 days',
    icon: 'i-lucide-calendar',
    iconColor: 'text-blue-600',
    description: 'Days of inventory',
    status: 'good',
    statusText: 'Healthy'
  },
  {
    label: 'Dead Stock',
    value: '12%',
    icon: 'i-lucide-alert-triangle',
    iconColor: 'text-yellow-600',
    description: 'Non-moving inventory',
    status: 'warning',
    statusText: 'Attention needed'
  },
  {
    label: 'Stock Accuracy',
    value: '94%',
    icon: 'i-lucide-check-circle',
    iconColor: 'text-green-600',
    description: 'Inventory accuracy',
    status: 'good',
    statusText: 'Excellent'
  }
])

// Marketing channels
const marketingChannels = ref([
  {
    name: 'Instagram',
    roi: 3.2,
    spent: 25000000,
    campaigns: 12,
    icon: 'i-lucide-instagram',
    iconColor: 'text-pink-600'
  },
  {
    name: 'Google Ads',
    roi: 2.8,
    spent: 35000000,
    campaigns: 8,
    icon: 'i-lucide-search',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Facebook',
    roi: 2.1,
    spent: 18000000,
    campaigns: 6,
    icon: 'i-lucide-facebook',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Influencer',
    roi: 4.1,
    spent: 15000000,
    campaigns: 4,
    icon: 'i-lucide-users',
    iconColor: 'text-purple-600'
  }
])

// Market trends
const marketTrends = ref([
  {
    title: 'E-wallet Growth',
    description: 'Indonesian e-wallet adoption increasing 35% YoY, affecting payment preferences',
    icon: 'i-lucide-smartphone',
    iconColor: 'text-green-600',
    impact: 'high'
  },
  {
    title: 'Outdoor Tourism',
    description: 'Domestic outdoor tourism recovering post-pandemic, driving equipment demand',
    icon: 'i-lucide-mountain',
    iconColor: 'text-blue-600',
    impact: 'high'
  },
  {
    title: 'Supply Chain',
    description: 'Global supply chain normalization improving product availability',
    icon: 'i-lucide-truck',
    iconColor: 'text-orange-600',
    impact: 'medium'
  }
])

// Competitive analysis
const competitors = ref([
  { name: 'Puncak Adventura', rank: 3, marketShare: 15 },
  { name: 'Eiger Adventure', rank: 1, marketShare: 35 },
  { name: 'Consina Outdoor', rank: 2, marketShare: 22 },
  { name: 'Others', rank: 4, marketShare: 28 }
])

const pricingComparison = ref([
  {
    category: 'Tents',
    ourPrice: 1250000,
    competitorAvg: 1350000,
    position: 'competitive'
  },
  {
    category: 'Backpacks',
    ourPrice: 875000,
    competitorAvg: 825000,
    position: 'premium'
  },
  {
    category: 'Hiking Boots',
    ourPrice: 450000,
    competitorAvg: 475000,
    position: 'competitive'
  },
  {
    category: 'Sleeping Bags',
    ourPrice: 320000,
    competitorAvg: 350000,
    position: 'value'
  }
])

const ourAdvantages = ref([
  'Indonesian market focus and localization',
  'Comprehensive loyalty program',
  'Strong social media presence',
  'WhatsApp customer service integration',
  'Free shipping nationwide above 500K'
])

const ourImprovements = ref([
  'Mobile app development',
  'Same-day delivery in major cities',
  'Extended product warranty programs',
  'B2B corporate sales channel',
  'International shipping capabilities'
])

// Functions
const generateReport = () => {
  // Simulate report generation
  console.log(`Generating ${reportPeriod.value} report for ${activeTab.value} analytics`)
}
</script>