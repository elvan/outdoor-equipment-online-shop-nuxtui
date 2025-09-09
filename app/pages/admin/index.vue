<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-bar-chart-3" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 class="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
              <p class="text-xs text-gray-600">Puncak Adventura Management</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="text-sm text-gray-600">{{ formatIndonesianDate(new Date()) }}</span>
            <UButton color="emerald" variant="outline" size="sm" @click="navigateTo('/')">
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
              Kembali ke Toko
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <nav class="flex flex-wrap gap-4 border-b border-gray-200 pb-4">
          <!-- Local Tabs -->
          <button
            v-for="tab in adminTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'py-2 px-4 border-b-2 font-medium text-sm transition-colors',
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <UIcon :name="tab.icon" class="w-4 h-4 mr-2 inline-block" />
            {{ tab.name }}
          </button>
          
          <!-- External Admin Pages -->
          <div class="ml-8 border-l border-gray-200 pl-8">
            <div class="flex flex-wrap gap-4">
              <NuxtLink 
                to="/admin/analytics"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-trending-up" class="w-4 h-4 mr-2" />
                Analytics
              </NuxtLink>
              <NuxtLink 
                to="/admin/marketing"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-megaphone" class="w-4 h-4 mr-2" />
                Marketing
              </NuxtLink>
              <NuxtLink 
                to="/admin/reports"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-file-bar-chart" class="w-4 h-4 mr-2" />
                Reports
              </NuxtLink>
              <NuxtLink 
                to="/admin/financial"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-wallet" class="w-4 h-4 mr-2" />
                Financial
              </NuxtLink>
              <NuxtLink 
                to="/admin/promotions"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-tag" class="w-4 h-4 mr-2" />
                Promotions
              </NuxtLink>
              <NuxtLink 
                to="/admin/social"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-share-2" class="w-4 h-4 mr-2" />
                Social Media
              </NuxtLink>
              <NuxtLink 
                to="/admin/automation"
                class="py-2 px-4 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors flex items-center"
              >
                <UIcon name="i-lucide-zap" class="w-4 h-4 mr-2" />
                Automation
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>

      <!-- Dashboard Overview -->
      <div v-if="activeTab === 'dashboard'">
        <!-- Key Performance Indicators -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="kpi in kpis" :key="kpi.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
              <div :class="['p-3 rounded-lg', kpi.bgColor]">
                <UIcon :name="kpi.icon" :class="['w-6 h-6', kpi.iconColor]" />
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm font-medium text-gray-600">{{ kpi.label }}</p>
                <p class="text-2xl font-semibold text-gray-900">{{ kpi.value }}</p>
                <p :class="['text-xs', kpi.trend.isPositive ? 'text-green-600' : 'text-red-600']">
                  <UIcon :name="kpi.trend.isPositive ? 'i-lucide-trending-up' : 'i-lucide-trending-down'" class="w-3 h-3 mr-1 inline-block" />
                  {{ kpi.trend.value }} dari bulan lalu
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Orders -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Pesanan Terbaru</h3>
            </div>
            <div class="divide-y divide-gray-200">
              <div v-for="order in recentOrders" :key="order.id" class="p-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">#{{ order.id }}</p>
                    <p class="text-sm text-gray-600">{{ order.customerName }}</p>
                    <p class="text-xs text-gray-500">{{ formatIndonesianDate(new Date(order.createdAt)) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">{{ formatIDR(order.total) }}</p>
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      order.status === 'paid' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ getOrderStatusLabel(order.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 bg-gray-50 border-t border-gray-200">
              <UButton color="emerald" variant="outline" size="sm" block @click="activeTab = 'orders'">
                Lihat Semua Pesanan
              </UButton>
            </div>
          </div>

          <!-- Low Stock Alerts -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Peringatan Stok Rendah</h3>
            </div>
            <div class="divide-y divide-gray-200">
              <div v-for="item in lowStockItems" :key="item.id" class="p-6 hover:bg-gray-50">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-lg object-cover">
                    <div class="ml-4">
                      <p class="text-sm font-medium text-gray-900">{{ item.name }}</p>
                      <p class="text-xs text-gray-600">SKU: {{ item.sku }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-red-600">{{ item.currentStock }} tersisa</p>
                    <p class="text-xs text-gray-500">Min: {{ item.minStock }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 bg-gray-50 border-t border-gray-200">
              <UButton color="emerald" variant="outline" size="sm" block @click="activeTab = 'inventory'">
                Kelola Inventori
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Inventory Management -->
      <div v-if="activeTab === 'inventory'" class="space-y-6">
        <!-- Inventory Controls -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Manajemen Inventori</h2>
            <UButton color="emerald" @click="showAddProductModal = true">
              <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
              Tambah Produk
            </UButton>
          </div>

          <!-- Search and Filters -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="relative">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                v-model="inventorySearch"
                type="text"
                placeholder="Cari produk..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full"
              >
            </div>
            <USelect v-model="inventoryCategory" :options="categoryOptions" placeholder="Semua Kategori" />
            <USelect v-model="inventoryStatus" :options="statusOptions" placeholder="Semua Status" />
            <USelect v-model="inventorySort" :options="sortOptions" placeholder="Urutkan" />
          </div>

          <!-- Inventory Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="product in filteredInventory" :key="product.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="product.images[0]" :alt="product.name" class="w-10 h-10 rounded-lg object-cover">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                        <div class="text-sm text-gray-500">{{ product.brand }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ product.sku }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'text-sm font-medium',
                      product.stock <= product.minStock ? 'text-red-600' :
                      product.stock <= product.minStock * 2 ? 'text-yellow-600' :
                      'text-green-600'
                    ]">
                      {{ product.stock }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatIDR(product.price) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ product.isActive ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <UButton color="blue" variant="ghost" size="sm">
                      <UIcon name="i-lucide-edit" class="w-4 h-4" />
                    </UButton>
                    <UButton color="red" variant="ghost" size="sm">
                      <UIcon name="i-lucide-trash-2" class="w-4 h-4" />
                    </UButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Order Processing -->
      <div v-if="activeTab === 'orders'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Manajemen Pesanan</h2>
            <div class="flex items-center space-x-3">
              <USelect v-model="orderFilter" :options="orderFilterOptions" />
              <UButton color="emerald" variant="outline">
                <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
                Export
              </UButton>
            </div>
          </div>

          <!-- Order Queue -->
          <div class="space-y-4">
            <div v-for="order in filteredOrders" :key="order.id" class="border border-gray-200 rounded-lg p-6 hover:bg-gray-50">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">#{{ order.id }}</h3>
                  <p class="text-sm text-gray-600">{{ order.customerName }} • {{ formatIndonesianDate(new Date(order.createdAt)) }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-semibold text-gray-900">{{ formatIDR(order.total) }}</p>
                  <span :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                    order.status === 'paid' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  ]">
                    {{ getOrderStatusLabel(order.status) }}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Alamat Pengiriman</h4>
                  <p class="text-sm text-gray-600">{{ order.shippingAddress.name }}</p>
                  <p class="text-sm text-gray-600">{{ order.shippingAddress.street }}</p>
                  <p class="text-sm text-gray-600">{{ order.shippingAddress.city }}, {{ order.shippingAddress.province }} {{ order.shippingAddress.postalCode }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Pengiriman</h4>
                  <p class="text-sm text-gray-600">{{ order.shipping.carrier }} - {{ order.shipping.service }}</p>
                  <p class="text-sm text-gray-600">{{ formatIDR(order.shipping.cost) }}</p>
                  <p class="text-sm text-gray-600" v-if="order.trackingNumber">Resi: {{ order.trackingNumber }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Pembayaran</h4>
                  <p class="text-sm text-gray-600">{{ order.payment.method }}</p>
                  <p class="text-sm text-gray-600">{{ order.payment.status }}</p>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-4">
                <h4 class="text-sm font-medium text-gray-900 mb-3">Item Pesanan ({{ order.items.length }})</h4>
                <div class="space-y-2">
                  <div v-for="item in order.items" :key="item.id" class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">{{ item.quantity }}x {{ item.productName }}</span>
                    <span class="text-gray-900">{{ formatIDR(item.totalPrice) }}</span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <UButton color="emerald" size="sm" v-if="order.status === 'paid'">
                    Proses Pesanan
                  </UButton>
                  <UButton color="blue" size="sm" v-if="order.status === 'processing'">
                    Kirim Pesanan
                  </UButton>
                  <UButton color="gray" variant="outline" size="sm">
                    Hubungi Customer
                  </UButton>
                </div>
                <UButton color="gray" variant="ghost" size="sm">
                  <UIcon name="i-lucide-more-horizontal" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Management -->
      <div v-if="activeTab === 'customers'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Database Pelanggan</h2>
            <div class="flex items-center space-x-3">
              <div class="relative">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  v-model="customerSearch"
                  type="text"
                  placeholder="Cari pelanggan..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
              </div>
              <UButton color="emerald" variant="outline">
                <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
                Export Data
              </UButton>
            </div>
          </div>

          <!-- Customer Stats -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-emerald-50 rounded-lg p-4">
              <div class="flex items-center">
                <UIcon name="i-lucide-users" class="w-8 h-8 text-emerald-600" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-emerald-600">Total Pelanggan</p>
                  <p class="text-2xl font-semibold text-emerald-900">1,234</p>
                </div>
              </div>
            </div>
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex items-center">
                <UIcon name="i-lucide-user-plus" class="w-8 h-8 text-blue-600" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-blue-600">Pelanggan Baru</p>
                  <p class="text-2xl font-semibold text-blue-900">56</p>
                </div>
              </div>
            </div>
            <div class="bg-yellow-50 rounded-lg p-4">
              <div class="flex items-center">
                <UIcon name="i-lucide-star" class="w-8 h-8 text-yellow-600" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-yellow-600">VIP Members</p>
                  <p class="text-2xl font-semibold text-yellow-900">89</p>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="flex items-center">
                <UIcon name="i-lucide-shopping-bag" class="w-8 h-8 text-purple-600" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-purple-600">Rata-rata LTV</p>
                  <p class="text-2xl font-semibold text-purple-900">{{ formatIDR(2650000) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer List -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Phone</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bergabung</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesanan</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pembelian</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span class="text-sm font-medium text-emerald-700">{{ getInitials(customer.name) }}</span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                        <div class="text-sm text-gray-500">{{ customer.memberTier }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ customer.email }}</div>
                    <div class="text-sm text-gray-500">{{ customer.phone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatIndonesianDate(new Date(customer.joinedAt)) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ customer.totalOrders }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatIDR(customer.totalSpent) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]">
                      {{ customer.isActive ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <UButton color="blue" variant="ghost" size="sm">
                      <UIcon name="i-lucide-eye" class="w-4 h-4" />
                    </UButton>
                    <UButton color="green" variant="ghost" size="sm">
                      <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
                    </UButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR, formatIndonesianDate } from '~/utils/indonesian'

// Page metadata
definePageMeta({
  title: 'Admin Dashboard - Puncak Adventura',
  description: 'Business management dashboard'
})

// Tab navigation
const activeTab = ref('dashboard')

const adminTabs = [
  { id: 'dashboard', name: 'Dashboard', icon: 'i-lucide-bar-chart-3' },
  { id: 'inventory', name: 'Inventori', icon: 'i-lucide-package' },
  { id: 'orders', name: 'Pesanan', icon: 'i-lucide-shopping-cart' },
  { id: 'customers', name: 'Pelanggan', icon: 'i-lucide-users' },
]

// KPI Data
const kpis = ref([
  {
    id: 'revenue',
    label: 'Pendapatan Bulan Ini',
    value: formatIDR(125750000),
    icon: 'i-lucide-dollar-sign',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: { isPositive: true, value: '+12.5%' }
  },
  {
    id: 'orders',
    label: 'Total Pesanan',
    value: '342',
    icon: 'i-lucide-shopping-bag',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: { isPositive: true, value: '+8.2%' }
  },
  {
    id: 'customers',
    label: 'Pelanggan Aktif',
    value: '1,234',
    icon: 'i-lucide-users',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    trend: { isPositive: true, value: '+15.1%' }
  },
  {
    id: 'conversion',
    label: 'Tingkat Konversi',
    value: '3.2%',
    icon: 'i-lucide-trending-up',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    trend: { isPositive: false, value: '-0.3%' }
  }
])

// Recent Orders
const recentOrders = ref([
  {
    id: 'ORD-2024-001',
    customerName: 'Ahmad Pratama',
    total: 1250000,
    status: 'paid',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Sari Wijaya',
    total: 850000,
    status: 'processing',
    createdAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Budi Santoso',
    total: 2100000,
    status: 'shipped',
    createdAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'ORD-2024-004',
    customerName: 'Maya Kusuma',
    total: 675000,
    status: 'paid',
    createdAt: '2024-01-14T14:20:00Z'
  }
])

// Low Stock Items
const lowStockItems = ref([
  {
    id: 'prod-1',
    name: 'Tenda Eiger Adventure 2P',
    sku: 'EGR-TNT-002',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    currentStock: 3,
    minStock: 10
  },
  {
    id: 'prod-2',
    name: 'Sepatu Hiking Consina Traverse',
    sku: 'CSN-SPT-015',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    currentStock: 5,
    minStock: 15
  }
])

// Inventory Management
const inventorySearch = ref('')
const inventoryCategory = ref('')
const inventoryStatus = ref('')
const inventorySort = ref('')
const showAddProductModal = ref(false)

const categoryOptions = [
  { label: 'Semua Kategori', value: '' },
  { label: 'Mountaineering', value: 'mountaineering' },
  { label: 'Camping', value: 'camping' },
  { label: 'Hiking', value: 'hiking' },
  { label: 'Apparel', value: 'apparel' }
]

const statusOptions = [
  { label: 'Semua Status', value: '' },
  { label: 'Aktif', value: 'active' },
  { label: 'Nonaktif', value: 'inactive' }
]

const sortOptions = [
  { label: 'Nama A-Z', value: 'name-asc' },
  { label: 'Nama Z-A', value: 'name-desc' },
  { label: 'Stok Terendah', value: 'stock-asc' },
  { label: 'Stok Tertinggi', value: 'stock-desc' }
]

// Sample inventory data
const inventory = ref([
  {
    id: 'prod-1',
    name: 'Tenda Eiger Adventure 2P',
    brand: 'Eiger',
    sku: 'EGR-TNT-002',
    category: 'camping',
    stock: 3,
    minStock: 10,
    price: 1250000,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400']
  },
  {
    id: 'prod-2',
    name: 'Sepatu Hiking Consina Traverse',
    brand: 'Consina',
    sku: 'CSN-SPT-015',
    category: 'hiking',
    stock: 5,
    minStock: 15,
    price: 850000,
    isActive: true,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400']
  }
])

const filteredInventory = computed(() => {
  let filtered = inventory.value

  if (inventorySearch.value) {
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(inventorySearch.value.toLowerCase()) ||
      item.sku.toLowerCase().includes(inventorySearch.value.toLowerCase())
    )
  }

  if (inventoryCategory.value) {
    filtered = filtered.filter(item => item.category === inventoryCategory.value)
  }

  return filtered
})

// Order Management
const orderFilter = ref('all')
const orderFilterOptions = [
  { label: 'Semua Pesanan', value: 'all' },
  { label: 'Menunggu Pembayaran', value: 'pending' },
  { label: 'Dibayar', value: 'paid' },
  { label: 'Diproses', value: 'processing' },
  { label: 'Dikirim', value: 'shipped' },
  { label: 'Selesai', value: 'completed' }
]

// Sample order data
const orders = ref([
  {
    id: 'ORD-2024-001',
    customerName: 'Ahmad Pratama',
    total: 1250000,
    status: 'paid',
    createdAt: '2024-01-15T10:30:00Z',
    trackingNumber: 'JNE12345678901',
    shippingAddress: {
      name: 'Ahmad Pratama',
      street: 'Jl. Kebon Jeruk No. 25',
      city: 'Jakarta Barat',
      province: 'DKI Jakarta',
      postalCode: '11530'
    },
    shipping: {
      carrier: 'JNE',
      service: 'Regular',
      cost: 25000
    },
    payment: {
      method: 'GoPay',
      status: 'Paid'
    },
    items: [
      { id: '1', productName: 'Tenda Eiger Adventure 2P', quantity: 1, totalPrice: 1250000 }
    ]
  }
])

const filteredOrders = computed(() => {
  if (orderFilter.value === 'all') return orders.value
  return orders.value.filter(order => order.status === orderFilter.value)
})

// Customer Management
const customerSearch = ref('')

const customers = ref([
  {
    id: 'cust-1',
    name: 'Ahmad Pratama',
    email: 'ahmad.pratama@gmail.com',
    phone: '+62 812-3456-7890',
    joinedAt: '2023-08-15T10:00:00Z',
    totalOrders: 5,
    totalSpent: 3250000,
    memberTier: 'Gold',
    isActive: true
  },
  {
    id: 'cust-2',
    name: 'Sari Wijaya',
    email: 'sari.wijaya@yahoo.com',
    phone: '+62 856-7890-1234',
    joinedAt: '2023-12-01T14:30:00Z',
    totalOrders: 2,
    totalSpent: 1750000,
    memberTier: 'Silver',
    isActive: true
  }
])

const filteredCustomers = computed(() => {
  if (!customerSearch.value) return customers.value
  return customers.value.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.value.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.value.toLowerCase())
  )
})

// Utility Functions
const getOrderStatusLabel = (status: string) => {
  const statusLabels: Record<string, string> = {
    pending: 'Menunggu Pembayaran',
    paid: 'Dibayar',
    processing: 'Diproses',
    shipped: 'Dikirim',
    completed: 'Selesai',
    cancelled: 'Dibatalkan'
  }
  return statusLabels[status] || status
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
</script>