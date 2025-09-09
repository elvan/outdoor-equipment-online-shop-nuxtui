<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Promotions Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-tag" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Promotions & Discounts</h1>
              <p class="text-xs text-gray-600">Indonesian Marketing Campaigns</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UButton color="emerald" @click="showCreatePromoModal = true">
              <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
              Create Promotion
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Promotion Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in promotionStats" :key="stat.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

      <!-- Promotion Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in promotionTabs"
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

      <!-- Active Promotions -->
      <div v-if="activeTab === 'active'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Active Promotions</h3>
          
          <div class="space-y-6">
            <div v-for="promo in activePromotions" :key="promo.id" class="border border-gray-200 rounded-lg p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center mb-2">
                    <h4 class="text-lg font-medium text-gray-900 mr-3">{{ promo.title }}</h4>
                    <span :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      promo.type === 'flash-sale' ? 'bg-red-100 text-red-800' :
                      promo.type === 'discount' ? 'bg-green-100 text-green-800' :
                      promo.type === 'shipping' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    ]">
                      {{ getPromoTypeLabel(promo.type) }}
                    </span>
                  </div>
                  <p class="text-gray-600 mb-3">{{ promo.description }}</p>
                  <div class="flex items-center space-x-6 text-sm text-gray-500">
                    <div class="flex items-center">
                      <UIcon name="i-lucide-calendar" class="w-4 h-4 mr-1" />
                      <span>{{ formatDateRange(promo.startDate, promo.endDate) }}</span>
                    </div>
                    <div class="flex items-center">
                      <UIcon name="i-lucide-users" class="w-4 h-4 mr-1" />
                      <span>{{ promo.usage }} / {{ promo.limit }} used</span>
                    </div>
                    <div class="flex items-center">
                      <UIcon name="i-lucide-dollar-sign" class="w-4 h-4 mr-1" />
                      <span>{{ formatIDR(promo.totalSavings) }} saved</span>
                    </div>
                  </div>
                </div>
                <div class="ml-6 text-right">
                  <div class="text-2xl font-bold text-emerald-600 mb-2">{{ promo.discount }}</div>
                  <div class="flex items-center space-x-2">
                    <UButton color="blue" variant="ghost" size="sm" @click="editPromotion(promo)">
                      <UIcon name="i-lucide-edit" class="w-4 h-4" />
                    </UButton>
                    <UButton color="red" variant="ghost" size="sm" @click="pausePromotion(promo)">
                      <UIcon name="i-lucide-pause" class="w-4 h-4" />
                    </UButton>
                  </div>
                </div>
              </div>

              <!-- Usage Progress -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Usage Progress</span>
                  <span class="text-sm text-gray-500">{{ Math.round((promo.usage / promo.limit) * 100) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    :class="[
                      'h-2 rounded-full',
                      (promo.usage / promo.limit) > 0.8 ? 'bg-red-600' :
                      (promo.usage / promo.limit) > 0.6 ? 'bg-yellow-600' :
                      'bg-emerald-600'
                    ]" 
                    :style="{ width: Math.min((promo.usage / promo.limit) * 100, 100) + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Performance Metrics -->
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
                <div class="text-center">
                  <p class="text-lg font-semibold text-gray-900">{{ promo.metrics.orders }}</p>
                  <p class="text-xs text-gray-600">Orders</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-semibold text-gray-900">{{ formatIDR(promo.metrics.revenue) }}</p>
                  <p class="text-xs text-gray-600">Revenue</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-semibold text-gray-900">{{ promo.metrics.conversionRate }}%</p>
                  <p class="text-xs text-gray-600">Conversion</p>
                </div>
                <div class="text-center">
                  <p class="text-lg font-semibold text-gray-900">{{ promo.metrics.roi }}x</p>
                  <p class="text-xs text-gray-600">ROI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indonesian Seasonal Campaigns -->
      <div v-if="activeTab === 'seasonal'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Upcoming Seasonal Events -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Seasonal Events</h3>
            
            <div class="space-y-4">
              <div v-for="event in seasonalEvents" :key="event.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <UIcon :name="event.icon" :class="['w-8 h-8 mr-3', event.iconColor]" />
                    <div>
                      <h4 class="font-medium text-gray-900">{{ event.name }}</h4>
                      <p class="text-sm text-gray-600">{{ event.date }}</p>
                    </div>
                  </div>
                  <UButton 
                    :color="event.campaignReady ? 'emerald' : 'gray'" 
                    :variant="event.campaignReady ? 'solid' : 'outline'"
                    size="sm"
                    @click="createSeasonalCampaign(event)"
                  >
                    {{ event.campaignReady ? 'Launch Campaign' : 'Prepare Campaign' }}
                  </UButton>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ event.description }}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">Target Sales:</span>
                  <span class="font-medium text-gray-900">{{ formatIDR(event.targetSales) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Campaign Templates -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Campaign Templates</h3>
            
            <div class="space-y-4">
              <div v-for="template in campaignTemplates" :key="template.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" @click="useTemplate(template)">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
                  <span :class="[
                    'text-xs px-2 py-1 rounded',
                    template.category === 'discount' ? 'bg-green-100 text-green-800' :
                    template.category === 'bundle' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  ]">
                    {{ template.category }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ template.description }}</p>
                <div class="grid grid-cols-2 gap-4 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Expected ROI:</span>
                    <span class="font-medium text-gray-900">{{ template.expectedROI }}x</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Duration:</span>
                    <span class="font-medium text-gray-900">{{ template.duration }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Coupon Management -->
      <div v-if="activeTab === 'coupons'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Coupon Management</h3>
            <UButton color="emerald" @click="showCreateCouponModal = true">
              <UIcon name="i-lucide-ticket" class="w-4 h-4 mr-2" />
              Create Coupon
            </UButton>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="coupon in coupons" :key="coupon.code" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ coupon.code }}</div>
                    <div class="text-sm text-gray-500">{{ coupon.description }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ coupon.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm font-medium text-gray-900">
                      {{ coupon.type === 'percentage' ? coupon.value + '%' : formatIDR(coupon.value) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ coupon.used }} / {{ coupon.limit }}</div>
                    <div class="w-20 bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        :class="['bg-emerald-600 h-1 rounded-full']" 
                        :style="{ width: Math.min((coupon.used / coupon.limit) * 100, 100) + '%' }"
                      ></div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatIndonesianDate(new Date(coupon.validUntil)) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      coupon.status === 'active' ? 'bg-green-100 text-green-800' :
                      coupon.status === 'expired' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    ]">
                      {{ coupon.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <UButton color="blue" variant="ghost" size="sm" @click="editCoupon(coupon)">
                      <UIcon name="i-lucide-edit" class="w-4 h-4" />
                    </UButton>
                    <UButton color="red" variant="ghost" size="sm" @click="deactivateCoupon(coupon)">
                      <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                    </UButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Email Marketing -->
      <div v-if="activeTab === 'email'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Email Campaign List -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Email Campaigns</h3>
              <UButton color="emerald" @click="showCreateEmailModal = true">
                <UIcon name="i-lucide-mail" class="w-4 h-4 mr-2" />
                New Campaign
              </UButton>
            </div>

            <div class="space-y-4">
              <div v-for="campaign in emailCampaigns" :key="campaign.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ campaign.subject }}</h4>
                    <p class="text-sm text-gray-600">{{ campaign.description }}</p>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                    campaign.status === 'sent' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ campaign.status }}
                  </span>
                </div>

                <div class="grid grid-cols-4 gap-4 text-sm mb-3">
                  <div class="text-center">
                    <p class="font-medium text-gray-900">{{ campaign.metrics.sent.toLocaleString() }}</p>
                    <p class="text-xs text-gray-600">Sent</p>
                  </div>
                  <div class="text-center">
                    <p class="font-medium text-gray-900">{{ campaign.metrics.opened }}%</p>
                    <p class="text-xs text-gray-600">Opened</p>
                  </div>
                  <div class="text-center">
                    <p class="font-medium text-gray-900">{{ campaign.metrics.clicked }}%</p>
                    <p class="text-xs text-gray-600">Clicked</p>
                  </div>
                  <div class="text-center">
                    <p class="font-medium text-gray-900">{{ campaign.metrics.converted }}</p>
                    <p class="text-xs text-gray-600">Converted</p>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">
                    {{ campaign.status === 'scheduled' ? 'Scheduled for' : 'Sent on' }}: 
                    {{ formatIndonesianDate(new Date(campaign.scheduledDate)) }}
                  </span>
                  <div class="flex items-center space-x-2">
                    <UButton color="blue" variant="ghost" size="sm" v-if="campaign.status === 'draft'">
                      <UIcon name="i-lucide-send" class="w-4 h-4" />
                    </UButton>
                    <UButton color="gray" variant="ghost" size="sm">
                      <UIcon name="i-lucide-eye" class="w-4 h-4" />
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email Templates -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Email Templates</h3>
            
            <div class="space-y-4">
              <div v-for="template in emailTemplates" :key="template.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" @click="useEmailTemplate(template)">
                <div class="flex items-center mb-2">
                  <UIcon :name="template.icon" :class="['w-6 h-6 mr-3', template.iconColor]" />
                  <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
                </div>
                <p class="text-sm text-gray-600 mb-2">{{ template.description }}</p>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">{{ template.category }}</span>
                  <span class="text-emerald-600">{{ template.openRate }}% avg open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Promotion Modal -->
    <div v-if="showCreatePromoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-screen overflow-y-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Create New Promotion</h3>
        
        <form @submit.prevent="createPromotion" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Promotion Title</label>
              <input v-model="newPromo.title" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Promotion Type</label>
              <select v-model="newPromo.type" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="discount">Discount</option>
                <option value="flash-sale">Flash Sale</option>
                <option value="shipping">Free Shipping</option>
                <option value="bundle">Bundle Offer</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="newPromo.description" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
              <input v-model="newPromo.discount" type="text" placeholder="50% or Rp 100000" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input v-model="newPromo.startDate" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input v-model="newPromo.endDate" type="datetime-local" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
              <input v-model="newPromo.limit" type="number" min="1" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Order (IDR)</label>
              <input v-model="newPromo.minOrder" type="number" min="0" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="showCreatePromoModal = false">
              Cancel
            </UButton>
            <UButton color="emerald" type="submit">
              Create Promotion
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR, formatIndonesianDate } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Promotions Management - Puncak Adventura',
  description: 'Indonesian marketing promotions and discount management'
})

// Component state
const activeTab = ref('active')
const showCreatePromoModal = ref(false)
const showCreateCouponModal = ref(false)
const showCreateEmailModal = ref(false)

// Navigation tabs
const promotionTabs = [
  { id: 'active', name: 'Active Promotions', icon: 'i-lucide-zap' },
  { id: 'seasonal', name: 'Seasonal Campaigns', icon: 'i-lucide-calendar' },
  { id: 'coupons', name: 'Coupon Management', icon: 'i-lucide-ticket' },
  { id: 'email', name: 'Email Marketing', icon: 'i-lucide-mail' },
]

// Promotion statistics
const promotionStats = ref([
  {
    id: 'active',
    label: 'Active Promotions',
    value: '8',
    icon: 'i-lucide-zap',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: { isPositive: true, value: '+2 this month' }
  },
  {
    id: 'revenue',
    label: 'Promotion Revenue',
    value: formatIDR(245000000),
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: { isPositive: true, value: '+18.5%' }
  },
  {
    id: 'usage',
    label: 'Coupon Usage',
    value: '1,234',
    icon: 'i-lucide-ticket',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: { isPositive: true, value: '+12.3%' }
  },
  {
    id: 'savings',
    label: 'Customer Savings',
    value: formatIDR(89500000),
    icon: 'i-lucide-heart',
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600',
    trend: { isPositive: true, value: '+8.7%' }
  }
])

// Active promotions data
const activePromotions = ref([
  {
    id: 'promo-1',
    title: 'Flash Sale Hari Kemerdekaan',
    description: 'Special discount for Indonesian Independence Day celebration',
    type: 'flash-sale',
    discount: '45% OFF',
    startDate: '2024-08-15',
    endDate: '2024-08-20',
    usage: 456,
    limit: 1000,
    totalSavings: 125000000,
    metrics: {
      orders: 234,
      revenue: 189000000,
      conversionRate: 12.5,
      roi: 3.2
    }
  },
  {
    id: 'promo-2',
    title: 'Free Shipping Nasional',
    description: 'Free shipping across Indonesia for orders above 300K',
    type: 'shipping',
    discount: 'FREE SHIPPING',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    usage: 789,
    limit: 2000,
    totalSavings: 45000000,
    metrics: {
      orders: 456,
      revenue: 298000000,
      conversionRate: 8.9,
      roi: 2.8
    }
  }
])

// Indonesian seasonal events
const seasonalEvents = ref([
  {
    id: 'event-1',
    name: 'Ramadan Adventure Sale',
    date: 'March 2024',
    description: 'Special discount for outdoor equipment during Ramadan season',
    icon: 'i-lucide-moon',
    iconColor: 'text-purple-600',
    targetSales: 180000000,
    campaignReady: true
  },
  {
    id: 'event-2',
    name: 'Idul Fitri Family Adventure',
    date: 'April 2024',
    description: 'Family camping gear promotion for Eid celebration',
    icon: 'i-lucide-users',
    iconColor: 'text-green-600',
    targetSales: 220000000,
    campaignReady: false
  },
  {
    id: 'event-3',
    name: 'Musim Kemarau Adventure',
    date: 'June - September 2024',
    description: 'Dry season outdoor equipment campaign',
    icon: 'i-lucide-sun',
    iconColor: 'text-yellow-600',
    targetSales: 450000000,
    campaignReady: true
  }
])

// Campaign templates
const campaignTemplates = ref([
  {
    id: 'template-1',
    name: 'Weekend Flash Sale',
    description: '48-hour flash sale with countdown timer',
    category: 'discount',
    expectedROI: 3.5,
    duration: '2 days'
  },
  {
    id: 'template-2',
    name: 'Bundle Deal Campaign',
    description: 'Buy 2 get 1 free or similar bundle offers',
    category: 'bundle',
    expectedROI: 2.8,
    duration: '1 week'
  },
  {
    id: 'template-3',
    name: 'Loyalty Member Exclusive',
    description: 'Special discount for Gold/Platinum members',
    category: 'loyalty',
    expectedROI: 4.2,
    duration: '1 month'
  }
])

// Coupon data
const coupons = ref([
  {
    code: 'ADVENTURE50',
    description: 'General outdoor equipment discount',
    type: 'percentage',
    value: 15,
    used: 234,
    limit: 500,
    validUntil: '2024-12-31',
    status: 'active'
  },
  {
    code: 'SHIPPING2024',
    description: 'Free shipping promotion',
    type: 'shipping',
    value: 25000,
    used: 567,
    limit: 1000,
    validUntil: '2024-09-30',
    status: 'active'
  },
  {
    code: 'NEWBIE100',
    description: 'New customer welcome discount',
    type: 'fixed',
    value: 100000,
    used: 89,
    limit: 200,
    validUntil: '2024-08-31',
    status: 'active'
  }
])

// Email campaigns
const emailCampaigns = ref([
  {
    id: 'email-1',
    subject: 'Adventure Gear Sale - Up to 40% Off!',
    description: 'Monthly promotional newsletter',
    status: 'sent',
    scheduledDate: '2024-08-01T10:00:00',
    metrics: {
      sent: 12450,
      opened: 24.5,
      clicked: 4.2,
      converted: 89
    }
  },
  {
    id: 'email-2',
    subject: 'New Climbing Gear Arrival',
    description: 'Product announcement email',
    status: 'scheduled',
    scheduledDate: '2024-08-25T09:00:00',
    metrics: {
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0
    }
  }
])

// Email templates
const emailTemplates = ref([
  {
    id: 'template-1',
    name: 'Flash Sale Alert',
    description: 'Urgent sale notification with countdown',
    category: 'Promotional',
    openRate: 32.1,
    icon: 'i-lucide-zap',
    iconColor: 'text-red-600'
  },
  {
    id: 'template-2',
    name: 'Product Recommendation',
    description: 'Personalized product suggestions',
    category: 'Marketing',
    openRate: 28.9,
    icon: 'i-lucide-target',
    iconColor: 'text-blue-600'
  },
  {
    id: 'template-3',
    name: 'Welcome Series',
    description: 'New customer onboarding sequence',
    category: 'Onboarding',
    openRate: 41.2,
    icon: 'i-lucide-user-plus',
    iconColor: 'text-green-600'
  }
])

// New promotion form data
const newPromo = ref({
  title: '',
  type: 'discount',
  description: '',
  discount: '',
  startDate: '',
  endDate: '',
  limit: 100,
  minOrder: 0
})

// Utility functions
const getPromoTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'flash-sale': 'Flash Sale',
    'discount': 'Discount',
    'shipping': 'Free Shipping',
    'bundle': 'Bundle Offer'
  }
  return labels[type] || type
}

const formatDateRange = (startDate: string, endDate: string) => {
  const start = formatIndonesianDate(new Date(startDate))
  const end = formatIndonesianDate(new Date(endDate))
  return `${start} - ${end}`
}

// Actions
const editPromotion = (promo: any) => {
  console.log('Edit promotion:', promo)
}

const pausePromotion = (promo: any) => {
  console.log('Pause promotion:', promo)
}

const createSeasonalCampaign = (event: any) => {
  console.log('Create seasonal campaign for:', event)
}

const useTemplate = (template: any) => {
  console.log('Use template:', template)
}

const editCoupon = (coupon: any) => {
  console.log('Edit coupon:', coupon)
}

const deactivateCoupon = (coupon: any) => {
  console.log('Deactivate coupon:', coupon)
}

const useEmailTemplate = (template: any) => {
  console.log('Use email template:', template)
}

const createPromotion = () => {
  console.log('Create promotion:', newPromo.value)
  showCreatePromoModal.value = false
  // Reset form
  newPromo.value = {
    title: '',
    type: 'discount',
    description: '',
    discount: '',
    startDate: '',
    endDate: '',
    limit: 100,
    minOrder: 0
  }
}
</script>