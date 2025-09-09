<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Automation Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-zap" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Marketing Automation</h1>
              <p class="text-xs text-gray-600">Indonesian Customer Journey Automation</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <UButton color="emerald" @click="showCreateWorkflowModal = true">
              <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
              Create Workflow
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Automation Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div v-for="stat in automationStats" :key="stat.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

      <!-- Automation Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in automationTabs"
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

      <!-- Active Workflows -->
      <div v-if="activeTab === 'workflows'">
        <div class="space-y-6">
          <div v-for="workflow in activeWorkflows" :key="workflow.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ workflow.name }}</h3>
                <p class="text-gray-600">{{ workflow.description }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                  workflow.status === 'active' ? 'bg-green-100 text-green-800' :
                  workflow.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ workflow.status }}
                </span>
                <UButton color="gray" variant="ghost" size="sm">
                  <UIcon name="i-lucide-more-horizontal" class="w-4 h-4" />
                </UButton>
              </div>
            </div>

            <!-- Workflow Steps -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Workflow Steps</h4>
              <div class="flex items-center space-x-4 overflow-x-auto pb-2">
                <div v-for="(step, index) in workflow.steps" :key="index" class="flex items-center">
                  <div :class="[
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                    step.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                  ]">
                    {{ index + 1 }}
                  </div>
                  <div class="ml-3 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ step.name }}</p>
                    <p class="text-xs text-gray-500">{{ step.type }}</p>
                  </div>
                  <div v-if="index < workflow.steps.length - 1" class="flex-shrink-0 w-8">
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-gray-400 mx-2" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Performance Metrics -->
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 rounded-lg p-4">
              <div class="text-center">
                <p class="text-lg font-semibold text-gray-900">{{ workflow.metrics.triggered }}</p>
                <p class="text-xs text-gray-600">Triggered</p>
              </div>
              <div class="text-center">
                <p class="text-lg font-semibold text-gray-900">{{ workflow.metrics.completed }}</p>
                <p class="text-xs text-gray-600">Completed</p>
              </div>
              <div class="text-center">
                <p class="text-lg font-semibold text-gray-900">{{ workflow.metrics.conversionRate }}%</p>
                <p class="text-xs text-gray-600">Conversion</p>
              </div>
              <div class="text-center">
                <p class="text-lg font-semibold text-gray-900">{{ formatIDR(workflow.metrics.revenue) }}</p>
                <p class="text-xs text-gray-600">Revenue</p>
              </div>
              <div class="text-center">
                <p class="text-lg font-semibold text-gray-900">{{ workflow.metrics.roi }}x</p>
                <p class="text-xs text-gray-600">ROI</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Segments -->
      <div v-if="activeTab === 'segments'">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Dynamic Segments -->
          <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Customer Segments</h3>
              <UButton color="emerald" @click="showCreateSegmentModal = true">
                <UIcon name="i-lucide-users-2" class="w-4 h-4 mr-2" />
                Create Segment
              </UButton>
            </div>
            
            <div class="space-y-4">
              <div v-for="segment in customerSegments" :key="segment.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ segment.name }}</h4>
                    <p class="text-sm text-gray-600">{{ segment.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-semibold text-gray-900">{{ segment.customerCount }}</p>
                    <p class="text-xs text-gray-600">customers</p>
                  </div>
                </div>

                <!-- Segment Criteria -->
                <div class="mb-4">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="criteria in segment.criteria" :key="criteria" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {{ criteria }}
                    </span>
                  </div>
                </div>

                <!-- Segment Performance -->
                <div class="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p class="font-medium text-gray-900">{{ formatIDR(segment.avgSpend) }}</p>
                    <p class="text-xs text-gray-600">Avg Spend</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ segment.emailOpenRate }}%</p>
                    <p class="text-xs text-gray-600">Email Open</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ segment.conversionRate }}%</p>
                    <p class="text-xs text-gray-600">Conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Indonesian Market Segments -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Market Segments</h3>
            
            <div class="space-y-4">
              <div v-for="marketSegment in indonesianSegments" :key="marketSegment.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center mb-3">
                  <UIcon :name="marketSegment.icon" :class="['w-6 h-6 mr-3', marketSegment.iconColor]" />
                  <h4 class="font-medium text-gray-900">{{ marketSegment.name }}</h4>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ marketSegment.description }}</p>
                <div class="space-y-2 text-xs">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Size:</span>
                    <span class="font-medium text-gray-900">{{ marketSegment.size }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Primary Region:</span>
                    <span class="font-medium text-gray-900">{{ marketSegment.region }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-500">Avg Order:</span>
                    <span class="font-medium text-gray-900">{{ formatIDR(marketSegment.avgOrder) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Sequences -->
      <div v-if="activeTab === 'sequences'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Active Email Sequences -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-gray-900">Email Sequences</h3>
              <UButton color="emerald" @click="showCreateSequenceModal = true">
                <UIcon name="i-lucide-mail-plus" class="w-4 h-4 mr-2" />
                Create Sequence
              </UButton>
            </div>

            <div class="space-y-4">
              <div v-for="sequence in emailSequences" :key="sequence.id" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ sequence.name }}</h4>
                    <p class="text-sm text-gray-600">{{ sequence.description }}</p>
                  </div>
                  <span :class="[
                    'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                    sequence.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ sequence.status }}
                  </span>
                </div>

                <!-- Sequence Timeline -->
                <div class="mb-4">
                  <div class="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                    <UIcon name="i-lucide-clock" class="w-3 h-3" />
                    <span>{{ sequence.emails.length }} emails over {{ sequence.duration }}</span>
                  </div>
                  <div class="space-y-1">
                    <div v-for="email in sequence.emails" :key="email.day" class="flex items-center text-xs">
                      <div class="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                      <span class="text-gray-500">Day {{ email.day }}:</span>
                      <span class="ml-2 text-gray-900">{{ email.subject }}</span>
                    </div>
                  </div>
                </div>

                <!-- Performance -->
                <div class="grid grid-cols-3 gap-4 text-center text-sm">
                  <div>
                    <p class="font-medium text-gray-900">{{ sequence.metrics.subscribers }}</p>
                    <p class="text-xs text-gray-600">Subscribers</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ sequence.metrics.openRate }}%</p>
                    <p class="text-xs text-gray-600">Open Rate</p>
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ sequence.metrics.conversions }}</p>
                    <p class="text-xs text-gray-600">Conversions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Indonesian Email Templates -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Indonesian Email Templates</h3>
            
            <div class="space-y-4">
              <div v-for="template in indonesianEmailTemplates" :key="template.id" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" @click="useEmailTemplate(template)">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-medium text-gray-900">{{ template.name }}</h4>
                  <span :class="[
                    'text-xs px-2 py-1 rounded',
                    template.category === 'welcome' ? 'bg-green-100 text-green-800' :
                    template.category === 'abandoned-cart' ? 'bg-yellow-100 text-yellow-800' :
                    template.category === 'promotional' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  ]">
                    {{ template.category }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ template.description }}</p>
                <div class="bg-gray-100 rounded p-3 mb-3">
                  <p class="text-sm text-gray-700 italic">"{{ template.previewText }}"</p>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-500">Open Rate:</span>
                  <span class="text-emerald-600 font-medium">{{ template.openRate }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Triggers & Events -->
      <div v-if="activeTab === 'triggers'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Automation Triggers</h3>
            <UButton color="emerald" @click="showCreateTriggerModal = true">
              <UIcon name="i-lucide-zap" class="w-4 h-4 mr-2" />
              Create Trigger
            </UButton>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="trigger in automationTriggers" :key="trigger.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                  <UIcon :name="trigger.icon" :class="['w-8 h-8 mr-3 p-2 rounded-lg', trigger.bgColor, trigger.iconColor]" />
                  <div>
                    <h4 class="font-medium text-gray-900">{{ trigger.name }}</h4>
                    <p class="text-xs text-gray-600">{{ trigger.type }}</p>
                  </div>
                </div>
                <span :class="[
                  'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                  trigger.status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ trigger.status }}
                </span>
              </div>
              
              <p class="text-sm text-gray-600 mb-4">{{ trigger.description }}</p>
              
              <div class="space-y-2 text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-gray-500">Triggered:</span>
                  <span class="font-medium text-gray-900">{{ trigger.metrics.triggered }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-500">Success Rate:</span>
                  <span class="font-medium text-emerald-600">{{ trigger.metrics.successRate }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Workflow Modal -->
    <div v-if="showCreateWorkflowModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Create Marketing Workflow</h3>
        
        <form @submit.prevent="createWorkflow" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
            <input v-model="newWorkflow.name" type="text" required class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea v-model="newWorkflow.description" rows="3" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Trigger Event</label>
              <select v-model="newWorkflow.trigger" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="new-signup">New Customer Signup</option>
                <option value="abandoned-cart">Abandoned Cart</option>
                <option value="purchase">First Purchase</option>
                <option value="inactive">Customer Inactive</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Target Segment</label>
              <select v-model="newWorkflow.segment" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="all">All Customers</option>
                <option value="adventure-enthusiasts">Adventure Enthusiasts</option>
                <option value="new-customers">New Customers</option>
                <option value="vip-members">VIP Members</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-end space-x-3">
            <UButton color="gray" variant="outline" @click="showCreateWorkflowModal = false">
              Cancel
            </UButton>
            <UButton color="emerald" type="submit">
              Create Workflow
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Marketing Automation - Puncak Adventura',
  description: 'Automated marketing workflows and customer journey management'
})

// Component state
const activeTab = ref('workflows')
const showCreateWorkflowModal = ref(false)
const showCreateSegmentModal = ref(false)
const showCreateSequenceModal = ref(false)
const showCreateTriggerModal = ref(false)

// Tab navigation
const automationTabs = [
  { id: 'workflows', name: 'Workflows', icon: 'i-lucide-workflow' },
  { id: 'segments', name: 'Customer Segments', icon: 'i-lucide-users-2' },
  { id: 'sequences', name: 'Email Sequences', icon: 'i-lucide-mail' },
  { id: 'triggers', name: 'Triggers', icon: 'i-lucide-zap' },
]

// Automation statistics
const automationStats = ref([
  {
    id: 'workflows',
    label: 'Active Workflows',
    value: '12',
    icon: 'i-lucide-workflow',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: { isPositive: true, value: '+3 this month' }
  },
  {
    id: 'customers',
    label: 'Automated Customers',
    value: '2,847',
    icon: 'i-lucide-users',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: { isPositive: true, value: '+18.5%' }
  },
  {
    id: 'emails',
    label: 'Emails Sent',
    value: '15,234',
    icon: 'i-lucide-mail',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: { isPositive: true, value: '+25.3%' }
  },
  {
    id: 'revenue',
    label: 'Automation Revenue',
    value: formatIDR(425000000),
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: { isPositive: true, value: '+32.1%' }
  }
])

// Active workflows
const activeWorkflows = ref([
  {
    id: 'workflow-1',
    name: 'Welcome Series Indonesia',
    description: 'Onboarding sequence for new Indonesian customers',
    status: 'active',
    steps: [
      { name: 'Welcome Email', type: 'email', completed: true },
      { name: 'Product Recommendations', type: 'email', completed: true },
      { name: 'First Purchase Discount', type: 'coupon', completed: false },
      { name: 'Adventure Tips', type: 'email', completed: false }
    ],
    metrics: {
      triggered: 1234,
      completed: 892,
      conversionRate: 12.5,
      revenue: 145000000,
      roi: 4.2
    }
  },
  {
    id: 'workflow-2',
    name: 'Abandoned Cart Recovery',
    description: 'Recover abandoned carts with personalized reminders',
    status: 'active',
    steps: [
      { name: 'Cart Reminder', type: 'email', completed: true },
      { name: 'Product Reviews', type: 'email', completed: true },
      { name: 'Limited Time Discount', type: 'coupon', completed: false },
      { name: 'WhatsApp Follow-up', type: 'sms', completed: false }
    ],
    metrics: {
      triggered: 2156,
      completed: 678,
      conversionRate: 8.9,
      revenue: 89000000,
      roi: 3.8
    }
  }
])

// Customer segments
const customerSegments = ref([
  {
    id: 'seg-1',
    name: 'Adventure Enthusiasts',
    description: 'Active customers who frequently purchase outdoor gear',
    customerCount: 892,
    criteria: ['Purchase Frequency > 3', 'Category: Mountaineering', 'Last Purchase < 30 days'],
    avgSpend: 1250000,
    emailOpenRate: 34.2,
    conversionRate: 8.9
  },
  {
    id: 'seg-2',
    name: 'Weekend Warriors',
    description: 'Casual outdoor enthusiasts with moderate spending',
    customerCount: 1456,
    criteria: ['Purchase Frequency 1-2', 'Category: Camping', 'Location: Urban'],
    avgSpend: 650000,
    emailOpenRate: 28.7,
    conversionRate: 5.4
  }
])

// Indonesian market segments
const indonesianSegments = ref([
  {
    id: 'indo-1',
    name: 'Jakarta Urban Hikers',
    description: 'City professionals who weekend hike around Jakarta',
    size: '45.2K',
    region: 'DKI Jakarta',
    avgOrder: 875000,
    icon: 'i-lucide-buildings',
    iconColor: 'text-blue-600'
  },
  {
    id: 'indo-2',
    name: 'Bali Adventure Seekers',
    description: 'Tourists and locals seeking adventure activities',
    size: '28.7K',
    region: 'Bali',
    avgOrder: 1250000,
    icon: 'i-lucide-palm-tree',
    iconColor: 'text-green-600'
  }
])

// Email sequences
const emailSequences = ref([
  {
    id: 'seq-1',
    name: 'New Customer Welcome',
    description: 'Indonesian customer onboarding sequence',
    status: 'active',
    duration: '14 days',
    emails: [
      { day: 1, subject: 'Selamat datang di Puncak Adventura!' },
      { day: 3, subject: 'Panduan memilih gear outdoor yang tepat' },
      { day: 7, subject: 'Diskon khusus untuk pembelian pertama' },
      { day: 14, subject: 'Tips adventure untuk pemula' }
    ],
    metrics: {
      subscribers: 2847,
      openRate: 32.1,
      conversions: 234
    }
  }
])

// Indonesian email templates
const indonesianEmailTemplates = ref([
  {
    id: 'template-1',
    name: 'Selamat Datang',
    category: 'welcome',
    description: 'Welcome email for Indonesian customers',
    previewText: 'Selamat datang di komunitas petualang Indonesia!',
    openRate: 41.2
  },
  {
    id: 'template-2',
    name: 'Keranjang Tertinggal',
    category: 'abandoned-cart',
    description: 'Cart abandonment reminder in Indonesian',
    previewText: 'Jangan sampai gear impianmu terlewat!',
    openRate: 28.9
  }
])

// Automation triggers
const automationTriggers = ref([
  {
    id: 'trigger-1',
    name: 'New Customer Signup',
    type: 'Customer Event',
    description: 'Triggered when new customer creates account',
    status: 'active',
    icon: 'i-lucide-user-plus',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    metrics: {
      triggered: 1234,
      successRate: 89.5
    }
  },
  {
    id: 'trigger-2',
    name: 'Cart Abandonment',
    type: 'Behavior Event',
    description: 'Triggered when customer leaves items in cart for 2+ hours',
    status: 'active',
    icon: 'i-lucide-shopping-cart',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    metrics: {
      triggered: 2156,
      successRate: 23.4
    }
  },
  {
    id: 'trigger-3',
    name: 'Purchase Complete',
    type: 'Transaction Event',
    description: 'Triggered immediately after successful purchase',
    status: 'active',
    icon: 'i-lucide-check-circle',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    metrics: {
      triggered: 892,
      successRate: 95.2
    }
  }
])

// New workflow form data
const newWorkflow = ref({
  name: '',
  description: '',
  trigger: 'new-signup',
  segment: 'all'
})

// Actions
const useEmailTemplate = (template: any) => {
  console.log('Use email template:', template)
}

const createWorkflow = () => {
  console.log('Create workflow:', newWorkflow.value)
  showCreateWorkflowModal.value = false
  // Reset form
  newWorkflow.value = {
    name: '',
    description: '',
    trigger: 'new-signup',
    segment: 'all'
  }
}
</script>