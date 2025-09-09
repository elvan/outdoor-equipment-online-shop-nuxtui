<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Financial Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-wallet" class="w-5 h-5 text-white" />
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Financial Dashboard</h1>
              <p class="text-xs text-gray-600">Indonesian Financial Reporting</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <USelect v-model="fiscalPeriod" :options="fiscalOptions" />
            <UButton color="emerald" @click="exportFinancialReport">
              <UIcon name="i-lucide-file-spreadsheet" class="w-4 h-4 mr-2" />
              Export Excel
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Financial Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="card in financialCards" :key="card.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center">
            <div :class="['p-3 rounded-lg', card.bgColor]">
              <UIcon :name="card.icon" :class="['w-8 h-8', card.iconColor]" />
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-600">{{ card.label }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ card.value }}</p>
              <div class="flex items-center mt-1">
                <UIcon :name="card.trend.icon" :class="['w-4 h-4 mr-1', card.trend.color]" />
                <span :class="['text-sm', card.trend.color]">{{ card.trend.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Tabs -->
      <div class="mb-8">
        <nav class="flex space-x-8 border-b border-gray-200">
          <button
            v-for="tab in financialTabs"
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

      <!-- Profit & Loss Statement -->
      <div v-if="activeTab === 'pnl'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Laporan Laba Rugi</h2>
            <div class="text-sm text-gray-600">
              Periode: {{ fiscalPeriod === 'yearly' ? 'Tahun 2024' : 'Q4 2024' }}
            </div>
          </div>

          <!-- Revenue Section -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">PENDAPATAN</h3>
            <div class="space-y-3">
              <div v-for="revenue in revenueItems" :key="revenue.item" class="flex items-center justify-between">
                <span class="text-gray-700">{{ revenue.item }}</span>
                <span class="font-medium text-gray-900">{{ formatIDR(revenue.amount) }}</span>
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                <span class="text-gray-900">Total Pendapatan</span>
                <span class="text-emerald-600">{{ formatIDR(totalRevenue) }}</span>
              </div>
            </div>
          </div>

          <!-- Cost of Goods Sold -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">HARGA POKOK PENJUALAN (HPP)</h3>
            <div class="space-y-3">
              <div v-for="cogs in cogsItems" :key="cogs.item" class="flex items-center justify-between">
                <span class="text-gray-700">{{ cogs.item }}</span>
                <span class="font-medium text-gray-900">{{ formatIDR(cogs.amount) }}</span>
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                <span class="text-gray-900">Total HPP</span>
                <span class="text-red-600">{{ formatIDR(totalCOGS) }}</span>
              </div>
            </div>
          </div>

          <!-- Gross Profit -->
          <div class="mb-8">
            <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg font-semibold">
              <span class="text-green-900">LABA KOTOR</span>
              <span class="text-green-600">{{ formatIDR(grossProfit) }}</span>
            </div>
            <div class="text-center mt-2">
              <span class="text-sm text-gray-600">Margin Laba Kotor: {{ grossMargin }}%</span>
            </div>
          </div>

          <!-- Operating Expenses -->
          <div class="mb-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">BIAYA OPERASIONAL</h3>
            <div class="space-y-3">
              <div v-for="expense in operatingExpenses" :key="expense.item" class="flex items-center justify-between">
                <span class="text-gray-700">{{ expense.item }}</span>
                <span class="font-medium text-gray-900">{{ formatIDR(expense.amount) }}</span>
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                <span class="text-gray-900">Total Biaya Operasional</span>
                <span class="text-red-600">{{ formatIDR(totalOperatingExpenses) }}</span>
              </div>
            </div>
          </div>

          <!-- Net Profit -->
          <div class="p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
            <div class="flex items-center justify-between font-bold text-xl">
              <span class="text-gray-900">LABA BERSIH</span>
              <span :class="netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'">{{ formatIDR(netProfit) }}</span>
            </div>
            <div class="text-center mt-3">
              <span class="text-sm text-gray-600">Margin Laba Bersih: {{ netMargin }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cash Flow Statement -->
      <div v-if="activeTab === 'cashflow'">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Laporan Arus Kas</h2>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Operating Activities -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Aktivitas Operasi</h3>
              <div class="space-y-3">
                <div v-for="item in operatingCashFlow" :key="item.description" class="flex items-center justify-between">
                  <span class="text-gray-700 text-sm">{{ item.description }}</span>
                  <span :class="['font-medium text-sm', item.amount >= 0 ? 'text-green-600' : 'text-red-600']">
                    {{ item.amount >= 0 ? '+' : '' }}{{ formatIDR(Math.abs(item.amount)) }}
                  </span>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                  <span class="text-gray-900">Net Cash dari Operasi</span>
                  <span class="text-green-600">{{ formatIDR(netOperatingCash) }}</span>
                </div>
              </div>
            </div>

            <!-- Investing Activities -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Aktivitas Investasi</h3>
              <div class="space-y-3">
                <div v-for="item in investingCashFlow" :key="item.description" class="flex items-center justify-between">
                  <span class="text-gray-700 text-sm">{{ item.description }}</span>
                  <span :class="['font-medium text-sm', item.amount >= 0 ? 'text-green-600' : 'text-red-600']">
                    {{ item.amount >= 0 ? '+' : '' }}{{ formatIDR(Math.abs(item.amount)) }}
                  </span>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                  <span class="text-gray-900">Net Cash dari Investasi</span>
                  <span class="text-red-600">{{ formatIDR(netInvestingCash) }}</span>
                </div>
              </div>
            </div>

            <!-- Financing Activities -->
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">Aktivitas Pendanaan</h3>
              <div class="space-y-3">
                <div v-for="item in financingCashFlow" :key="item.description" class="flex items-center justify-between">
                  <span class="text-gray-700 text-sm">{{ item.description }}</span>
                  <span :class="['font-medium text-sm', item.amount >= 0 ? 'text-green-600' : 'text-red-600']">
                    {{ item.amount >= 0 ? '+' : '' }}{{ formatIDR(Math.abs(item.amount)) }}
                  </span>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-gray-200 font-semibold">
                  <span class="text-gray-900">Net Cash dari Pendanaan</span>
                  <span class="text-blue-600">{{ formatIDR(netFinancingCash) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Net Cash Flow -->
          <div class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
            <div class="flex items-center justify-between font-bold text-xl">
              <span class="text-gray-900">NET PERUBAHAN KAS</span>
              <span :class="netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatIDR(netCashFlow) }}
              </span>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Kas Awal Periode:</span>
                <span class="font-medium">{{ formatIDR(beginningCash) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Kas Akhir Periode:</span>
                <span class="font-medium">{{ formatIDR(endingCash) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Indonesian Tax & Compliance -->
      <div v-if="activeTab === 'tax'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Tax Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Ringkasan Pajak Indonesia</h3>
            
            <div class="space-y-4">
              <div v-for="tax in indonesianTaxes" :key="tax.type" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ tax.type }}</p>
                  <p class="text-sm text-gray-600">{{ tax.description }}</p>
                  <p class="text-xs text-gray-500">Rate: {{ tax.rate }}%</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">{{ formatIDR(tax.amount) }}</p>
                  <p :class="['text-xs', tax.status === 'paid' ? 'text-green-600' : 'text-yellow-600']">
                    {{ tax.status === 'paid' ? 'Dibayar' : 'Belum Dibayar' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center justify-between font-semibold">
                <span class="text-blue-900">Total Kewajiban Pajak</span>
                <span class="text-blue-600">{{ formatIDR(totalTaxLiability) }}</span>
              </div>
            </div>
          </div>

          <!-- Compliance Status -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Status Kepatuhan</h3>
            
            <div class="space-y-4">
              <div v-for="compliance in complianceItems" :key="compliance.requirement" class="flex items-center justify-between">
                <div class="flex items-center">
                  <UIcon :name="compliance.status === 'compliant' ? 'i-lucide-check-circle' : 'i-lucide-alert-circle'" 
                         :class="['w-6 h-6 mr-3', compliance.status === 'compliant' ? 'text-green-600' : 'text-yellow-600']" />
                  <div>
                    <p class="font-medium text-gray-900">{{ compliance.requirement }}</p>
                    <p class="text-sm text-gray-600">{{ compliance.description }}</p>
                  </div>
                </div>
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  compliance.status === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]">
                  {{ compliance.status === 'compliant' ? 'Compliant' : 'Action Required' }}
                </span>
              </div>
            </div>

            <!-- Upcoming Deadlines -->
            <div class="mt-8">
              <h4 class="text-sm font-medium text-gray-700 mb-4">Upcoming Tax Deadlines</h4>
              <div class="space-y-3">
                <div v-for="deadline in taxDeadlines" :key="deadline.tax" class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ deadline.tax }}</p>
                    <p class="text-xs text-gray-600">{{ deadline.description }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-yellow-700">{{ deadline.dueDate }}</p>
                    <p class="text-xs text-yellow-600">{{ deadline.daysRemaining }} hari lagi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Ratios -->
      <div v-if="activeTab === 'ratios'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Profitability Ratios -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Rasio Profitabilitas</h3>
            <div class="space-y-4">
              <div v-for="ratio in profitabilityRatios" :key="ratio.name" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ ratio.name }}</p>
                  <p class="text-sm text-gray-600">{{ ratio.description }}</p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-gray-900">{{ ratio.value }}{{ ratio.unit }}</p>
                  <p :class="['text-xs', getRatioColor(ratio.benchmark, ratio.value)]">
                    Benchmark: {{ ratio.benchmark }}{{ ratio.unit }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Efficiency Ratios -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Rasio Efisiensi</h3>
            <div class="space-y-4">
              <div v-for="ratio in efficiencyRatios" :key="ratio.name" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p class="font-medium text-gray-900">{{ ratio.name }}</p>
                  <p class="text-sm text-gray-600">{{ ratio.description }}</p>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-gray-900">{{ ratio.value }}{{ ratio.unit }}</p>
                  <p :class="['text-xs', getRatioColor(ratio.benchmark, ratio.value)]">
                    Benchmark: {{ ratio.benchmark }}{{ ratio.unit }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Health Score -->
        <div class="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Skor Kesehatan Keuangan</h3>
          <div class="flex items-center justify-center mb-6">
            <div class="w-32 h-32 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
              <div class="text-center">
                <p class="text-3xl font-bold text-white">{{ financialHealthScore }}</p>
                <p class="text-sm text-white">/ 100</p>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="component in healthComponents" :key="component.category" class="text-center">
              <p class="text-sm font-medium text-gray-700">{{ component.category }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ component.score }}/100</p>
              <p :class="['text-xs', getHealthColor(component.score)]">{{ getHealthStatus(component.score) }}</p>
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
  title: 'Financial Dashboard - Puncak Adventura',
  description: 'Indonesian financial reporting and compliance'
})

// Configuration
const activeTab = ref('pnl')
const fiscalPeriod = ref('yearly')

const fiscalOptions = [
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Custom', value: 'custom' }
]

const financialTabs = [
  { id: 'pnl', name: 'Laba Rugi', icon: 'i-lucide-trending-up' },
  { id: 'cashflow', name: 'Arus Kas', icon: 'i-lucide-banknote' },
  { id: 'tax', name: 'Pajak', icon: 'i-lucide-receipt' },
  { id: 'ratios', name: 'Rasio Keuangan', icon: 'i-lucide-calculator' },
]

// Financial overview cards
const financialCards = ref([
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: formatIDR(1505800000),
    icon: 'i-lucide-dollar-sign',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    trend: { icon: 'i-lucide-trending-up', color: 'text-green-600', text: '+18.5% vs last year' }
  },
  {
    id: 'profit',
    label: 'Net Profit',
    value: formatIDR(117224000),
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: { icon: 'i-lucide-trending-up', color: 'text-blue-600', text: '+12.3% margin' }
  },
  {
    id: 'cashflow',
    label: 'Operating Cash Flow',
    value: formatIDR(89567000),
    icon: 'i-lucide-banknote',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: { icon: 'i-lucide-trending-up', color: 'text-purple-600', text: 'Positive flow' }
  },
  {
    id: 'tax',
    label: 'Tax Liability',
    value: formatIDR(165638000),
    icon: 'i-lucide-receipt',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
    trend: { icon: 'i-lucide-minus', color: 'text-orange-600', text: '11% PPN + PPh' }
  }
])

// P&L Statement Data
const revenueItems = ref([
  { item: 'Product Sales', amount: 1478200000 },
  { item: 'Shipping Revenue', amount: 23400000 },
  { item: 'Other Income', amount: 4200000 }
])

const cogsItems = ref([
  { item: 'Product Costs', amount: 1076126000 },
  { item: 'Shipping Costs', amount: 18200000 },
  { item: 'Import Duties', amount: 12500000 }
])

const operatingExpenses = ref([
  { item: 'Marketing & Advertising', amount: 95000000 },
  { item: 'Staff Salaries', amount: 145000000 },
  { item: 'Rent & Utilities', amount: 36000000 },
  { item: 'Technology & Software', amount: 18000000 },
  { item: 'Professional Services', amount: 24000000 },
  { item: 'Insurance', amount: 8500000 },
  { item: 'Other Operating Expenses', amount: 15750000 }
])

// Calculated P&L values
const totalRevenue = computed(() => revenueItems.value.reduce((sum, item) => sum + item.amount, 0))
const totalCOGS = computed(() => cogsItems.value.reduce((sum, item) => sum + item.amount, 0))
const grossProfit = computed(() => totalRevenue.value - totalCOGS.value)
const grossMargin = computed(() => ((grossProfit.value / totalRevenue.value) * 100).toFixed(1))
const totalOperatingExpenses = computed(() => operatingExpenses.value.reduce((sum, item) => sum + item.amount, 0))
const netProfit = computed(() => grossProfit.value - totalOperatingExpenses.value)
const netMargin = computed(() => ((netProfit.value / totalRevenue.value) * 100).toFixed(1))

// Cash Flow Data
const operatingCashFlow = ref([
  { description: 'Net Income', amount: 117224000 },
  { description: 'Depreciation', amount: 15000000 },
  { description: 'Changes in Receivables', amount: -8500000 },
  { description: 'Changes in Inventory', amount: -12000000 },
  { description: 'Changes in Payables', amount: 6800000 }
])

const investingCashFlow = ref([
  { description: 'Equipment Purchase', amount: -25000000 },
  { description: 'Software Investment', amount: -8000000 }
])

const financingCashFlow = ref([
  { description: 'Owner Investment', amount: 50000000 },
  { description: 'Loan Repayment', amount: -15000000 }
])

const netOperatingCash = computed(() => operatingCashFlow.value.reduce((sum, item) => sum + item.amount, 0))
const netInvestingCash = computed(() => investingCashFlow.value.reduce((sum, item) => sum + item.amount, 0))
const netFinancingCash = computed(() => financingCashFlow.value.reduce((sum, item) => sum + item.amount, 0))
const netCashFlow = computed(() => netOperatingCash.value + netInvestingCash.value + netFinancingCash.value)
const beginningCash = ref(45000000)
const endingCash = computed(() => beginningCash.value + netCashFlow.value)

// Indonesian Tax Data
const indonesianTaxes = ref([
  {
    type: 'PPN (VAT)',
    description: 'Value Added Tax on sales',
    rate: 11,
    amount: 165638000,
    status: 'paid'
  },
  {
    type: 'PPh 25',
    description: 'Corporate Income Tax Installment',
    rate: 25,
    amount: 29306000,
    status: 'paid'
  },
  {
    type: 'PPh 21',
    description: 'Employee Income Tax',
    rate: 5,
    amount: 7250000,
    status: 'pending'
  },
  {
    type: 'PPh 23',
    description: 'Tax on Services',
    rate: 2,
    amount: 1800000,
    status: 'paid'
  }
])

const totalTaxLiability = computed(() => indonesianTaxes.value.reduce((sum, tax) => sum + tax.amount, 0))

const complianceItems = ref([
  {
    requirement: 'Monthly VAT Report',
    description: 'SPT Masa PPN submission',
    status: 'compliant'
  },
  {
    requirement: 'Corporate Income Tax',
    description: 'Annual PPh Badan filing',
    status: 'compliant'
  },
  {
    requirement: 'BPJS Registration',
    description: 'Employee social security',
    status: 'compliant'
  },
  {
    requirement: 'E-Faktur Integration',
    description: 'Electronic invoice system',
    status: 'pending'
  }
])

const taxDeadlines = ref([
  {
    tax: 'PPN Masa Januari',
    description: 'Monthly VAT return',
    dueDate: '20 Feb 2024',
    daysRemaining: 15
  },
  {
    tax: 'PPh 21 Masa Januari',
    description: 'Employee tax withholding',
    dueDate: '10 Feb 2024',
    daysRemaining: 5
  }
])

// Financial Ratios
const profitabilityRatios = ref([
  {
    name: 'Gross Profit Margin',
    description: 'Revenue minus COGS / Revenue',
    value: 28.5,
    unit: '%',
    benchmark: 25.0
  },
  {
    name: 'Net Profit Margin',
    description: 'Net income / Revenue',
    value: 7.8,
    unit: '%',
    benchmark: 5.0
  },
  {
    name: 'Return on Assets',
    description: 'Net income / Total assets',
    value: 12.3,
    unit: '%',
    benchmark: 10.0
  }
])

const efficiencyRatios = ref([
  {
    name: 'Inventory Turnover',
    description: 'COGS / Average inventory',
    value: 4.2,
    unit: 'x',
    benchmark: 3.5
  },
  {
    name: 'Asset Turnover',
    description: 'Revenue / Total assets',
    value: 1.8,
    unit: 'x',
    benchmark: 1.5
  },
  {
    name: 'Cash Conversion Cycle',
    description: 'Days to convert inventory to cash',
    value: 45,
    unit: ' days',
    benchmark: 60
  }
])

// Financial Health Score
const financialHealthScore = ref(82)
const healthComponents = ref([
  { category: 'Profitability', score: 85 },
  { category: 'Liquidity', score: 78 },
  { category: 'Efficiency', score: 84 }
])

// Functions
const exportFinancialReport = () => {
  console.log('Exporting financial report...')
}

const getRatioColor = (benchmark: number, actual: number) => {
  if (actual >= benchmark) return 'text-green-600'
  if (actual >= benchmark * 0.8) return 'text-yellow-600'
  return 'text-red-600'
}

const getHealthColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

const getHealthStatus = (score: number) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  return 'Needs Improvement'
}
</script>