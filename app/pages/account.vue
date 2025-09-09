<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Akun Saya</h1>
        <p class="text-gray-600 mt-2">Kelola profil, pesanan, dan preferensi akun Anda</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            
            <!-- Profile Summary -->
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span class="text-emerald-600 font-bold text-xl">{{ getInitials(currentUser.name) }}</span>
              </div>
              <h3 class="font-semibold text-gray-900">{{ currentUser.name }}</h3>
              <p class="text-sm text-gray-600">{{ currentUser.email }}</p>
              <div class="mt-2">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getMembershipStyle(currentUser.membershipTier)
                ]">
                  <UIcon name="i-lucide-crown" class="w-3 h-3 mr-1" />
                  {{ getMembershipName(currentUser.membershipTier) }}
                </span>
              </div>
            </div>

            <!-- Navigation Menu -->
            <nav class="space-y-1">
              <button
                v-for="item in navigationItems"
                :key="item.id"
                :class="[
                  'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-left',
                  activeTab === item.id 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
                @click="activeTab = item.id"
              >
                <UIcon :name="item.icon" class="w-4 h-4 mr-3" />
                {{ item.name }}
                <span v-if="item.badge" class="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                  {{ item.badge }}
                </span>
              </button>
            </nav>

            <!-- Quick Actions -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Aksi Cepat</h4>
              <div class="space-y-2">
                <UButton variant="outline" size="sm" class="w-full justify-start" @click="navigateTo('/products')">
                  <UIcon name="i-lucide-shopping-bag" class="w-4 h-4 mr-2" />
                  Belanja Sekarang
                </UButton>
                <UButton variant="outline" size="sm" class="w-full justify-start" @click="contactSupport">
                  <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4 mr-2" />
                  Hubungi Support
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          
          <!-- Dashboard Overview -->
          <div v-if="activeTab === 'dashboard'" class="space-y-6">
            
            <!-- Welcome Message -->
            <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold mb-2">Selamat Datang, {{ currentUser.firstName }}!</h2>
                  <p class="text-emerald-100">Terima kasih telah menjadi member {{ getMembershipName(currentUser.membershipTier) }} Puncak Adventura</p>
                </div>
                <div class="hidden md:block">
                  <UIcon name="i-lucide-mountain" class="w-16 h-16 text-emerald-200" />
                </div>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg border border-gray-200 p-6">
                <div class="flex items-center">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <UIcon name="i-lucide-package" class="w-6 h-6 text-blue-600" />
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Total Pesanan</p>
                    <p class="text-2xl font-bold text-gray-900">{{ userStats.totalOrders }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg border border-gray-200 p-6">
                <div class="flex items-center">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <UIcon name="i-lucide-credit-card" class="w-6 h-6 text-green-600" />
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Total Pembelian</p>
                    <p class="text-2xl font-bold text-gray-900">{{ formatIDR(userStats.totalSpent) }}</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-white rounded-lg border border-gray-200 p-6">
                <div class="flex items-center">
                  <div class="p-2 bg-yellow-100 rounded-lg">
                    <UIcon name="i-lucide-star" class="w-6 h-6 text-yellow-600" />
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Poin Rewards</p>
                    <p class="text-2xl font-bold text-gray-900">{{ userStats.rewardPoints.toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Orders -->
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
                <UButton variant="outline" size="sm" @click="activeTab = 'orders'">
                  Lihat Semua
                </UButton>
              </div>
              
              <div class="space-y-4">
                <div v-for="order in recentOrders" :key="order.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-lucide-package" class="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">#{{ order.orderNumber }}</p>
                      <p class="text-sm text-gray-600">{{ formatIndonesianDate(order.orderDate) }}</p>
                      <p class="text-sm font-semibold text-emerald-600">{{ formatIDR(order.total) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      getOrderStatusStyle(order.status)
                    ]">
                      {{ getOrderStatusName(order.status) }}
                    </span>
                    <p class="text-xs text-gray-500 mt-1">{{ order.itemCount }} item</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Wishlist Items -->
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">Wishlist Anda</h3>
                <span class="text-sm text-gray-500">{{ wishlist.items.length }} produk</span>
              </div>
              
              <div v-if="wishlist.items.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="item in wishlist.items.slice(0, 4)" :key="item.id" class="group cursor-pointer" @click="navigateTo(`/products/${item.product.slug}`)">
                  <div class="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                    <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 class="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                    {{ item.product.name }}
                  </h4>
                  <p class="text-sm font-semibold text-emerald-600">{{ formatIDR(item.product.price) }}</p>
                </div>
              </div>
              
              <div v-else class="text-center py-8">
                <UIcon name="i-lucide-heart" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p class="text-gray-500">Belum ada produk di wishlist Anda</p>
                <UButton variant="outline" class="mt-4" @click="navigateTo('/products')">
                  Mulai Belanja
                </UButton>
              </div>
            </div>
          </div>

          <!-- Profile Tab -->
          <div v-else-if="activeTab === 'profile'" class="space-y-6">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Informasi Profil</h2>
              
              <form @submit.prevent="updateProfile" class="space-y-6">
                <!-- Personal Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      v-model="profileForm.name"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                    <input
                      v-model="profileForm.phone"
                      type="tel"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+62 812-3456-7890"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                    <input
                      v-model="profileForm.birthDate"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                  <select
                    v-model="profileForm.gender"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>

                <!-- Outdoor Preferences -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Aktivitas Outdoor Favorit</label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label v-for="activity in outdoorActivities" :key="activity.id" class="flex items-center">
                      <input
                        v-model="profileForm.preferredActivities"
                        :value="activity.id"
                        type="checkbox"
                        class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">{{ activity.name }}</span>
                    </label>
                  </div>
                </div>

                <!-- Newsletter Preferences -->
                <div class="space-y-3">
                  <h4 class="text-sm font-medium text-gray-900">Preferensi Komunikasi</h4>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.emailNotifications"
                        type="checkbox"
                        class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Terima newsletter dan penawaran khusus via email</span>
                    </label>
                    <label class="flex items-center">
                      <input
                        v-model="profileForm.whatsappNotifications"
                        type="checkbox"
                        class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span class="ml-2 text-sm text-gray-700">Terima notifikasi pesanan via WhatsApp</span>
                    </label>
                  </div>
                </div>

                <!-- Save Button -->
                <div class="flex justify-end pt-6 border-t">
                  <UButton type="submit" color="emerald" :loading="isUpdatingProfile">
                    Simpan Perubahan
                  </UButton>
                </div>
              </form>
            </div>
          </div>

          <!-- Orders Tab -->
          <div v-else-if="activeTab === 'orders'" class="space-y-6">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Riwayat Pesanan</h2>
              
              <!-- Order Filters -->
              <div class="flex flex-wrap gap-4 mb-6">
                <select
                  v-model="orderFilters.status"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Semua Status</option>
                  <option value="pending">Menunggu Pembayaran</option>
                  <option value="processing">Diproses</option>
                  <option value="shipped">Dikirim</option>
                  <option value="delivered">Diterima</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
                
                <select
                  v-model="orderFilters.period"
                  class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Semua Periode</option>
                  <option value="last30">30 Hari Terakhir</option>
                  <option value="last90">3 Bulan Terakhir</option>
                  <option value="last365">1 Tahun Terakhir</option>
                </select>
              </div>

              <!-- Orders List -->
              <div class="space-y-4">
                <div v-for="order in filteredOrders" :key="order.id" class="border border-gray-200 rounded-lg p-6">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <h3 class="font-semibold text-gray-900">#{{ order.orderNumber }}</h3>
                      <p class="text-sm text-gray-600">{{ formatIndonesianDate(order.orderDate) }}</p>
                    </div>
                    <div class="text-right">
                      <span :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getOrderStatusStyle(order.status)
                      ]">
                        {{ getOrderStatusName(order.status) }}
                      </span>
                      <p class="text-sm font-semibold text-gray-900 mt-1">{{ formatIDR(order.total) }}</p>
                    </div>
                  </div>
                  
                  <div class="space-y-3">
                    <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-4">
                      <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <UIcon name="i-lucide-image" class="w-5 h-5 text-gray-400" />
                      </div>
                      <div class="flex-1">
                        <h4 class="text-sm font-medium text-gray-900">{{ item.productName }}</h4>
                        <p class="text-sm text-gray-600">Qty: {{ item.quantity }} × {{ formatIDR(item.price) }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-4 pt-4 border-t">
                    <UButton variant="outline" size="sm">
                      Lihat Detail
                    </UButton>
                    <UButton v-if="order.status === 'delivered'" variant="outline" size="sm">
                      Beli Lagi
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Addresses Tab -->
          <div v-else-if="activeTab === 'addresses'" class="space-y-6">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-900">Buku Alamat</h2>
                <UButton color="emerald" @click="showAddAddressModal = true">
                  <UIcon name="i-lucide-plus" class="w-4 h-4 mr-2" />
                  Tambah Alamat
                </UButton>
              </div>

              <!-- Address Cards -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  v-for="address in userAddresses" 
                  :key="address.id" 
                  class="border border-gray-200 rounded-lg p-4 relative"
                  :class="{ 'border-emerald-500 bg-emerald-50': address.isDefault }"
                >
                  <!-- Default Badge -->
                  <div v-if="address.isDefault" class="absolute -top-2 left-4">
                    <span class="bg-emerald-600 text-white text-xs px-2 py-1 rounded">
                      Alamat Utama
                    </span>
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="font-semibold text-gray-900">{{ address.name }}</h3>
                        <p class="text-sm text-gray-600">{{ address.phone }}</p>
                      </div>
                      <div class="flex space-x-1">
                        <UButton variant="ghost" size="xs" icon="i-lucide-edit" @click="editAddress(address)" />
                        <UButton variant="ghost" size="xs" icon="i-lucide-trash" color="red" @click="deleteAddress(address.id)" />
                      </div>
                    </div>
                    
                    <div class="text-sm text-gray-700">
                      <p>{{ address.address }}</p>
                      <p>{{ address.city }}, {{ address.province }} {{ address.postalCode }}</p>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t">
                      <span class="text-xs text-gray-500 capitalize">{{ address.type }}</span>
                      <div class="flex space-x-2">
                        <UButton v-if="!address.isDefault" variant="outline" size="xs" @click="setDefaultAddress(address.id)">
                          Jadikan Utama
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-if="userAddresses.length === 0" class="text-center py-12">
                <UIcon name="i-lucide-map-pin" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Alamat</h3>
                <p class="text-gray-600 mb-6">Tambahkan alamat untuk memudahkan proses checkout</p>
                <UButton color="emerald" @click="showAddAddressModal = true">
                  Tambah Alamat Pertama
                </UButton>
              </div>
            </div>
          </div>

          <!-- Rewards Tab -->
          <div v-else-if="activeTab === 'rewards'" class="space-y-6">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-6">Program Rewards</h2>
              
              <!-- Rewards Overview -->
              <div class="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg p-6 text-white mb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-2xl font-bold mb-2">{{ userStats.rewardPoints.toLocaleString() }} Poin</h3>
                    <p class="text-yellow-100">Setara dengan {{ formatIDR(userStats.rewardPoints * 10) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-yellow-100 text-sm">Status Member</p>
                    <p class="text-xl font-bold">{{ getMembershipName(currentUser.membershipTier) }}</p>
                  </div>
                </div>
              </div>

              <!-- Membership Progress -->
              <div class="mb-8">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Progress ke Platinum</span>
                  <span class="text-sm text-gray-600">{{ userStats.totalSpent.toLocaleString() }} / 20.000.000</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${Math.min(100, (userStats.totalSpent / 20000000) * 100)}%` }"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Belanja {{ formatIDR(20000000 - userStats.totalSpent) }} lagi untuk mencapai status Platinum
                </p>
              </div>

              <!-- Points History -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Riwayat Poin</h3>
                <div class="space-y-3">
                  <div v-for="transaction in rewardsHistory" :key="transaction.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div class="flex items-center space-x-3">
                      <div :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                      ]">
                        <UIcon 
                          :name="transaction.type === 'earned' ? 'i-lucide-plus' : 'i-lucide-minus'" 
                          :class="transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'"
                          class="w-4 h-4"
                        />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                        <p class="text-sm text-gray-600">{{ formatIndonesianDate(transaction.date) }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <span :class="[
                        'font-semibold',
                        transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                      ]">
                        {{ transaction.type === 'earned' ? '+' : '-' }}{{ transaction.points.toLocaleString() }}
                      </span>
                      <p class="text-xs text-gray-500">poin</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Other tabs content will be added as needed -->
          <div v-else class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="text-center py-12">
              <UIcon name="i-lucide-construction" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">Fitur Dalam Pengembangan</h3>
              <p class="text-gray-600">Fitur ini sedang dikembangkan dan akan segera tersedia.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR, formatIndonesianDate } from '~/utils/indonesian'

// Define page meta
definePageMeta({
  layout: 'default'
})

// Use composables
const { wishlist } = useWishlist()

// Reactive data
const activeTab = ref('dashboard')
const isUpdatingProfile = ref(false)
const showAddAddressModal = ref(false)

// Mock current user data
const currentUser = ref({
  id: 'user-001',
  name: 'Ahmad Fauzi Pratama',
  firstName: 'Ahmad',
  email: 'ahmad.fauzi@email.com',
  phone: '+62 812-3456-7890',
  birthDate: '1990-05-15',
  gender: 'male',
  membershipTier: 'gold',
  joinDate: '2023-01-15',
  preferredActivities: ['hiking', 'camping', 'mountaineering'],
  emailNotifications: true,
  whatsappNotifications: true
})

// Profile form data
const profileForm = ref({ ...currentUser.value })

// User statistics
const userStats = ref({
  totalOrders: 8,
  totalSpent: 12500000,
  rewardPoints: 2840
})

// Navigation items
const navigationItems = [
  { id: 'dashboard', name: 'Dashboard', icon: 'i-lucide-layout-dashboard' },
  { id: 'profile', name: 'Profil Saya', icon: 'i-lucide-user' },
  { id: 'orders', name: 'Pesanan', icon: 'i-lucide-package', badge: '2' },
  { id: 'addresses', name: 'Alamat', icon: 'i-lucide-map-pin' },
  { id: 'rewards', name: 'Rewards', icon: 'i-lucide-star' },
  { id: 'settings', name: 'Pengaturan', icon: 'i-lucide-settings' }
]

// Outdoor activities options
const outdoorActivities = [
  { id: 'hiking', name: 'Hiking' },
  { id: 'camping', name: 'Camping' },
  { id: 'mountaineering', name: 'Mountaineering' },
  { id: 'climbing', name: 'Rock Climbing' },
  { id: 'backpacking', name: 'Backpacking' },
  { id: 'photography', name: 'Fotografi Alam' }
]

// Mock orders data
const allOrders = ref([
  {
    id: 'order-001',
    orderNumber: 'PA240001',
    orderDate: '2024-08-15T10:30:00Z',
    status: 'delivered',
    total: 2850000,
    itemCount: 3,
    items: [
      { id: 'item-1', productName: 'Tas Carrier 60L Pro', quantity: 1, price: 850000 },
      { id: 'item-2', productName: 'Tenda Ultralight 2P', quantity: 1, price: 1200000 },
      { id: 'item-3', productName: 'Sleeping Bag Down', quantity: 1, price: 800000 }
    ]
  },
  {
    id: 'order-002',
    orderNumber: 'PA240002',
    orderDate: '2024-08-25T14:20:00Z',
    status: 'shipped',
    total: 1450000,
    itemCount: 2,
    items: [
      { id: 'item-4', productName: 'Jaket Softshell Pro', quantity: 1, price: 750000 },
      { id: 'item-5', productName: 'Sepatu Hiking GTX', quantity: 1, price: 700000 }
    ]
  },
  {
    id: 'order-003',
    orderNumber: 'PA240003',
    orderDate: '2024-09-05T09:15:00Z',
    status: 'processing',
    total: 425000,
    itemCount: 1,
    items: [
      { id: 'item-6', productName: 'GPS Outdoor Navigator', quantity: 1, price: 425000 }
    ]
  }
])

// Order filters
const orderFilters = ref({
  status: '',
  period: ''
})

// User addresses
const userAddresses = ref([
  {
    id: 'addr-001',
    name: 'Ahmad Fauzi Pratama',
    phone: '+62 812-3456-7890',
    address: 'Jl. Sudirman No. 123, RT 05/RW 02, Kebayoran Baru',
    city: 'Jakarta Selatan',
    province: 'DKI Jakarta',
    postalCode: '12190',
    type: 'home',
    isDefault: true
  },
  {
    id: 'addr-002', 
    name: 'Ahmad Fauzi Pratama',
    phone: '+62 812-3456-7890',
    address: 'Jl. Asia Afrika No. 456, Blok B-15, Bandung Wetan',
    city: 'Bandung',
    province: 'Jawa Barat',
    postalCode: '40111',
    type: 'office',
    isDefault: false
  }
])

// Rewards history
const rewardsHistory = ref([
  {
    id: 'reward-001',
    type: 'earned',
    description: 'Pembelian #PA240003',
    points: 425,
    date: '2024-09-05T09:15:00Z'
  },
  {
    id: 'reward-002',
    type: 'earned',
    description: 'Pembelian #PA240002',
    points: 1450,
    date: '2024-08-25T14:20:00Z'
  },
  {
    id: 'reward-003',
    type: 'redeemed',
    description: 'Tukar Voucher Diskon 10%',
    points: 500,
    date: '2024-08-20T10:30:00Z'
  },
  {
    id: 'reward-004',
    type: 'earned',
    description: 'Pembelian #PA240001',
    points: 2850,
    date: '2024-08-15T10:30:00Z'
  },
  {
    id: 'reward-005',
    type: 'earned',
    description: 'Bonus Pendaftaran',
    points: 500,
    date: '2024-01-15T08:00:00Z'
  }
])

// Computed properties
const recentOrders = computed(() => allOrders.value.slice(0, 3))

const filteredOrders = computed(() => {
  let orders = [...allOrders.value]
  
  if (orderFilters.value.status) {
    orders = orders.filter(order => order.status === orderFilters.value.status)
  }
  
  // Add period filtering logic here if needed
  
  return orders
})

// Helper functions
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getMembershipName = (tier: string): string => {
  const tiers = {
    bronze: 'Bronze',
    silver: 'Silver', 
    gold: 'Gold',
    platinum: 'Platinum'
  }
  return tiers[tier] || tier
}

const getMembershipStyle = (tier: string): string => {
  const styles = {
    bronze: 'bg-orange-100 text-orange-800',
    silver: 'bg-gray-100 text-gray-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-purple-100 text-purple-800'
  }
  return styles[tier] || 'bg-gray-100 text-gray-800'
}

const getOrderStatusName = (status: string): string => {
  const statusNames = {
    pending: 'Menunggu Pembayaran',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Diterima',
    cancelled: 'Dibatalkan'
  }
  return statusNames[status] || status
}

const getOrderStatusStyle = (status: string): string => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return styles[status] || 'bg-gray-100 text-gray-800'
}

// Actions
const updateProfile = async () => {
  isUpdatingProfile.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Update current user data
    currentUser.value = { ...profileForm.value }
    
    // Show success message (in real app, use toast notification)
    alert('Profil berhasil diperbarui!')
  } catch (error) {
    console.error('Failed to update profile:', error)
    alert('Gagal memperbarui profil. Silakan coba lagi.')
  } finally {
    isUpdatingProfile.value = false
  }
}

const contactSupport = () => {
  const message = encodeURIComponent('Halo Puncak Adventura! Saya membutuhkan bantuan terkait akun saya.')
  window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
}

// Address management functions
const editAddress = (address: any) => {
  // In real app, open modal with address form
  console.log('Edit address:', address.id)
  alert('Fitur edit alamat akan segera tersedia!')
}

const deleteAddress = (addressId: string) => {
  if (confirm('Apakah Anda yakin ingin menghapus alamat ini?')) {
    userAddresses.value = userAddresses.value.filter(addr => addr.id !== addressId)
    alert('Alamat berhasil dihapus!')
  }
}

const setDefaultAddress = (addressId: string) => {
  // Remove default from all addresses
  userAddresses.value.forEach(addr => {
    addr.isDefault = addr.id === addressId
  })
  alert('Alamat utama berhasil diubah!')
}
</script>