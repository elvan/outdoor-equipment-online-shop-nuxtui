<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Checkout</h1>
        <p class="text-gray-600 mt-2">Selesaikan pembelian Anda dengan aman dan mudah</p>
      </div>

      <!-- Progress Steps -->
      <div class="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <nav class="flex items-center justify-center">
          <ol class="flex items-center space-x-8">
            <li v-for="(step, index) in checkoutSteps" :key="step.id" class="flex items-center">
              <div class="flex flex-col items-center">
                <div :class="[
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                  getCurrentStepStatus(index)
                ]">
                  <UIcon v-if="index < currentStep" name="i-lucide-check" class="w-5 h-5 text-white" />
                  <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
                </div>
                <span :class="[
                  'mt-2 text-sm font-medium transition-colors',
                  index <= currentStep ? 'text-emerald-600' : 'text-gray-500'
                ]">
                  {{ step.name }}
                </span>
              </div>
              <!-- Connector Line -->
              <div v-if="index < checkoutSteps.length - 1" :class="[
                'hidden sm:block w-16 h-0.5 ml-4 transition-colors',
                index < currentStep ? 'bg-emerald-600' : 'bg-gray-300'
              ]"></div>
            </li>
          </ol>
        </nav>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Checkout Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            
            <!-- Step 1: Shipping Information -->
            <div v-if="currentStep === 0" class="space-y-6">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-xl font-semibold text-gray-900">Informasi Pengiriman</h2>
                <p class="text-gray-600 mt-1">Masukkan alamat pengiriman Anda</p>
              </div>

              <form @submit.prevent="proceedToPayment" class="space-y-6">
                <!-- Customer Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
                    <input
                      v-model="shippingInfo.fullName"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon *</label>
                    <input
                      v-model="shippingInfo.phone"
                      type="tel"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="08xxxxxxxxx"
                    />
                  </div>
                </div>

                <!-- Address Information -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
                  <textarea
                    v-model="shippingInfo.address"
                    required
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Provinsi *</label>
                    <select
                      v-model="shippingInfo.province"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Pilih Provinsi</option>
                      <option v-for="province in provinces" :key="province" :value="province">
                        {{ province }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten *</label>
                    <select
                      v-model="shippingInfo.city"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Pilih Kota</option>
                      <option v-for="city in cities" :key="city" :value="city">
                        {{ city }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Kode Pos *</label>
                    <input
                      v-model="shippingInfo.postalCode"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <!-- Additional Notes -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Catatan untuk Kurir (Opsional)</label>
                  <textarea
                    v-model="shippingInfo.notes"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Patokan rumah, instruksi khusus, dll."
                  ></textarea>
                </div>

                <!-- Continue Button -->
                <div class="flex justify-end pt-6 border-t">
                  <UButton type="submit" color="emerald" size="lg">
                    Lanjut ke Pengiriman
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2" />
                  </UButton>
                </div>
              </form>
            </div>

            <!-- Step 2: Shipping Method -->
            <div v-else-if="currentStep === 1" class="space-y-6">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-xl font-semibold text-gray-900">Pilih Metode Pengiriman</h2>
                <p class="text-gray-600 mt-1">Pilih layanan pengiriman yang sesuai</p>
              </div>

              <div class="space-y-4">
                <div 
                  v-for="shipping in shippingMethods" 
                  :key="shipping.id"
                  :class="[
                    'border rounded-lg p-4 cursor-pointer transition-all',
                    selectedShipping === shipping.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                  @click="selectedShipping = shipping.id"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <div :class="[
                          'w-4 h-4 rounded-full border-2 transition-colors',
                          selectedShipping === shipping.id
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-gray-300'
                        ]">
                          <div v-if="selectedShipping === shipping.id" class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center space-x-2">
                          <img :src="shipping.logo" :alt="shipping.name" class="h-6" />
                          <h3 class="font-medium text-gray-900">{{ shipping.name }}</h3>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">{{ shipping.description }}</p>
                        <p class="text-xs text-gray-500 mt-1">Estimasi: {{ shipping.estimatedDays }}</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <span class="font-semibold text-gray-900">
                        {{ shipping.cost === 0 ? 'GRATIS' : formatIDR(shipping.cost) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between pt-6 border-t">
                <UButton variant="outline" @click="currentStep = 0">
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
                  Kembali
                </UButton>
                <UButton 
                  :disabled="!selectedShipping" 
                  color="emerald" 
                  size="lg"
                  @click="currentStep = 2"
                >
                  Lanjut ke Pembayaran
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2" />
                </UButton>
              </div>
            </div>

            <!-- Step 3: Payment Method -->
            <div v-else-if="currentStep === 2" class="space-y-6">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-xl font-semibold text-gray-900">Metode Pembayaran</h2>
                <p class="text-gray-600 mt-1">Pilih cara pembayaran yang Anda inginkan</p>
              </div>

              <div class="space-y-4">
                <div v-for="category in paymentCategories" :key="category.name" class="space-y-3">
                  <h3 class="font-medium text-gray-900">{{ category.name }}</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div 
                      v-for="method in category.methods" 
                      :key="method.id"
                      :class="[
                        'border rounded-lg p-4 cursor-pointer transition-all',
                        selectedPayment === method.id 
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      ]"
                      @click="selectedPayment = method.id"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                          <div :class="[
                            'w-4 h-4 rounded-full border-2 transition-colors',
                            selectedPayment === method.id
                              ? 'border-emerald-500 bg-emerald-500'
                              : 'border-gray-300'
                          ]">
                            <div v-if="selectedPayment === method.id" class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                          </div>
                          <div class="flex items-center space-x-2">
                            <img :src="method.logo" :alt="method.name" class="h-6" />
                            <span class="font-medium text-gray-900">{{ method.name }}</span>
                          </div>
                        </div>
                        <span v-if="method.fee > 0" class="text-sm text-gray-600">
                          +{{ formatIDR(method.fee) }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mt-2 ml-7">{{ method.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between pt-6 border-t">
                <UButton variant="outline" @click="currentStep = 1">
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
                  Kembali
                </UButton>
                <UButton 
                  :disabled="!selectedPayment" 
                  color="emerald" 
                  size="lg"
                  @click="currentStep = 3"
                >
                  Review Pesanan
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 ml-2" />
                </UButton>
              </div>
            </div>

            <!-- Step 4: Order Review -->
            <div v-else-if="currentStep === 3" class="space-y-6">
              <div class="border-b border-gray-200 pb-4">
                <h2 class="text-xl font-semibold text-gray-900">Review Pesanan</h2>
                <p class="text-gray-600 mt-1">Periksa kembali detail pesanan Anda</p>
              </div>

              <!-- Order Summary -->
              <div class="space-y-4">
                <!-- Shipping Info -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="font-medium text-gray-900 mb-2">Alamat Pengiriman</h3>
                  <div class="text-sm text-gray-700">
                    <p class="font-medium">{{ shippingInfo.fullName }}</p>
                    <p>{{ shippingInfo.phone }}</p>
                    <p>{{ shippingInfo.address }}</p>
                    <p>{{ shippingInfo.city }}, {{ shippingInfo.province }} {{ shippingInfo.postalCode }}</p>
                  </div>
                  <UButton variant="outline" size="xs" class="mt-2" @click="currentStep = 0">
                    Edit
                  </UButton>
                </div>

                <!-- Selected Services -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="font-medium text-gray-900 mb-2">Pengiriman & Pembayaran</h3>
                  <div class="text-sm text-gray-700 space-y-1">
                    <p><span class="font-medium">Kurir:</span> {{ getSelectedShipping()?.name }} - {{ getSelectedShipping()?.description }}</p>
                    <p><span class="font-medium">Pembayaran:</span> {{ getSelectedPayment()?.name }}</p>
                  </div>
                </div>
              </div>

              <!-- Navigation Buttons -->
              <div class="flex justify-between pt-6 border-t">
                <UButton variant="outline" @click="currentStep = 2">
                  <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
                  Kembali
                </UButton>
                <UButton 
                  color="emerald" 
                  size="lg"
                  @click="processOrder"
                  :loading="isProcessingOrder"
                >
                  <UIcon name="i-lucide-credit-card" class="w-4 h-4 mr-2" />
                  Bayar Sekarang
                </UButton>
              </div>
            </div>

          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
            
            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div v-for="item in cart.items" :key="item.id" class="flex space-x-3">
                <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <UIcon name="i-lucide-image" class="w-6 h-6 text-gray-400" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900 line-clamp-2">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
                  <p class="text-sm font-semibold text-emerald-600">{{ formatIDR(item.totalPrice) }}</p>
                </div>
              </div>
            </div>

            <!-- Cost Breakdown -->
            <div class="border-t pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal ({{ cartSummary.itemCount }} item)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Ongkos Kirim</span>
                <span class="font-medium">
                  {{ getShippingCost() === 0 ? 'GRATIS' : formatIDR(getShippingCost()) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Biaya Pembayaran</span>
                <span class="font-medium">
                  {{ getPaymentFee() === 0 ? 'GRATIS' : formatIDR(getPaymentFee()) }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Pajak (PPN 11%)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.tax) }}</span>
              </div>
              <div class="border-t pt-3 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-emerald-600">{{ formatIDR(getFinalTotal()) }}</span>
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

// Define page meta
definePageMeta({
  layout: 'default'
})

// Use composables
const { cart, cartSummary, isEmpty } = useCart()

// Redirect if cart is empty
if (isEmpty.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Cart is empty'
  })
}

// Reactive data
const currentStep = ref(0)
const isProcessingOrder = ref(false)

// Form data
const shippingInfo = ref({
  fullName: '',
  phone: '',
  address: '',
  province: '',
  city: '',
  postalCode: '',
  notes: ''
})

const selectedShipping = ref('')
const selectedPayment = ref('')

// Static data
const checkoutSteps = [
  { id: 'shipping', name: 'Pengiriman' },
  { id: 'delivery', name: 'Kurir' },
  { id: 'payment', name: 'Pembayaran' },
  { id: 'review', name: 'Review' }
]

const provinces = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten',
  'Yogyakarta', 'Bali', 'Sumatera Utara', 'Sumatera Barat', 'Riau'
]

const cities = [
  'Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur',
  'Bandung', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Surabaya', 'Semarang', 'Yogyakarta'
]

const shippingMethods = [
  {
    id: 'jne-reg',
    name: 'JNE Regular',
    description: 'Layanan reguler JNE',
    estimatedDays: '2-3 hari',
    cost: 15000,
    logo: '/images/couriers/jne.png'
  },
  {
    id: 'jne-yes',
    name: 'JNE YES',
    description: 'Layanan express JNE',
    estimatedDays: '1-2 hari',
    cost: 25000,
    logo: '/images/couriers/jne.png'
  },
  {
    id: 'jnt-reg',
    name: 'J&T Regular',
    description: 'Layanan reguler J&T',
    estimatedDays: '2-4 hari',
    cost: 12000,
    logo: '/images/couriers/jnt.png'
  },
  {
    id: 'sicepat',
    name: 'SiCepat REG',
    description: 'SiCepat Regular',
    estimatedDays: '2-3 hari',
    cost: 14000,
    logo: '/images/couriers/sicepat.png'
  },
  {
    id: 'free-shipping',
    name: 'Gratis Ongkir',
    description: 'Gratis ongkir untuk pembelian di atas Rp 500.000',
    estimatedDays: '3-5 hari',
    cost: 0,
    logo: '/images/couriers/free.png'
  }
]

const paymentCategories = [
  {
    name: 'E-Wallet',
    methods: [
      { id: 'gopay', name: 'GoPay', description: 'Bayar dengan GoPay', fee: 0, logo: '/images/payments/gopay.png' },
      { id: 'ovo', name: 'OVO', description: 'Bayar dengan OVO', fee: 0, logo: '/images/payments/ovo.png' },
      { id: 'dana', name: 'DANA', description: 'Bayar dengan DANA', fee: 0, logo: '/images/payments/dana.png' },
      { id: 'shopeepay', name: 'ShopeePay', description: 'Bayar dengan ShopeePay', fee: 0, logo: '/images/payments/shopeepay.png' }
    ]
  },
  {
    name: 'Transfer Bank',
    methods: [
      { id: 'bca', name: 'BCA Virtual Account', description: 'Transfer ke Virtual Account BCA', fee: 4000, logo: '/images/payments/bca.png' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', description: 'Transfer ke Virtual Account Mandiri', fee: 4000, logo: '/images/payments/mandiri.png' },
      { id: 'bni', name: 'BNI Virtual Account', description: 'Transfer ke Virtual Account BNI', fee: 4000, logo: '/images/payments/bni.png' },
      { id: 'bri', name: 'BRI Virtual Account', description: 'Transfer ke Virtual Account BRI', fee: 4000, logo: '/images/payments/bri.png' }
    ]
  },
  {
    name: 'Lainnya',
    methods: [
      { id: 'cod', name: 'Bayar di Tempat (COD)', description: 'Bayar saat barang diterima', fee: 5000, logo: '/images/payments/cod.png' },
      { id: 'credit', name: 'Kartu Kredit/Debit', description: 'Visa, Mastercard, JCB', fee: 0, logo: '/images/payments/credit.png' }
    ]
  }
]

// Computed properties
const getCurrentStepStatus = (index: number) => {
  if (index < currentStep.value) {
    return 'border-emerald-600 bg-emerald-600 text-white'
  } else if (index === currentStep.value) {
    return 'border-emerald-600 bg-emerald-600 text-white'
  } else {
    return 'border-gray-300 bg-white text-gray-500'
  }
}

// Helper functions
const getSelectedShipping = () => {
  return shippingMethods.find(method => method.id === selectedShipping.value)
}

const getSelectedPayment = () => {
  const allMethods = paymentCategories.flatMap(category => category.methods)
  return allMethods.find(method => method.id === selectedPayment.value)
}

const getShippingCost = () => {
  return getSelectedShipping()?.cost || 0
}

const getPaymentFee = () => {
  return getSelectedPayment()?.fee || 0
}

const getFinalTotal = () => {
  return cartSummary.value.subtotal + getShippingCost() + getPaymentFee() + cartSummary.value.tax
}

// Actions
const proceedToPayment = () => {
  currentStep.value = 1
}

const processOrder = async () => {
  isProcessingOrder.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Navigate to success page
    await navigateTo('/checkout/success')
  } catch (error) {
    console.error('Order processing failed:', error)
  } finally {
    isProcessingOrder.value = false
  }
}
</script>