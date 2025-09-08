<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Success Message -->
      <div class="bg-white rounded-lg border border-gray-200 p-8 text-center mb-8">
        <div class="flex justify-center mb-6">
          <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
            <UIcon name="i-lucide-check-circle" class="w-10 h-10 text-emerald-600" />
          </div>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Pesanan Berhasil!</h1>
        <p class="text-lg text-gray-600 mb-6">
          Terima kasih atas pembelian Anda. Pesanan sedang diproses dan akan segera dikirim.
        </p>
        
        <!-- Order Number -->
        <div class="inline-flex items-center bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 mb-6">
          <UIcon name="i-lucide-package" class="w-5 h-5 text-emerald-600 mr-2" />
          <span class="text-sm font-medium text-emerald-800">
            Nomor Pesanan: <span class="font-bold">#{{ orderNumber }}</span>
          </span>
        </div>
        
        <!-- Quick Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton color="emerald" @click="navigateTo('/products')">
            <UIcon name="i-lucide-shopping-bag" class="w-4 h-4 mr-2" />
            Lanjut Belanja
          </UButton>
          <UButton variant="outline" color="emerald" @click="downloadInvoice">
            <UIcon name="i-lucide-download" class="w-4 h-4 mr-2" />
            Unduh Invoice
          </UButton>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Order Details -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Detail Pesanan</h2>
          
          <!-- Order Items -->
          <div class="space-y-4 mb-6">
            <div v-for="item in orderItems" :key="item.id" class="flex space-x-4 py-4 border-b last:border-b-0">
              <div class="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-image" class="w-6 h-6 text-gray-400" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 line-clamp-2">{{ item.name }}</h4>
                <p class="text-sm text-gray-600">{{ item.brand }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-sm text-gray-600">Qty: {{ item.quantity }}</span>
                  <span class="text-sm font-semibold text-emerald-600">{{ formatIDR(item.totalPrice) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t pt-4 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">{{ formatIDR(orderSummary.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Ongkos Kirim</span>
              <span class="font-medium">
                {{ orderSummary.shipping === 0 ? 'GRATIS' : formatIDR(orderSummary.shipping) }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Biaya Pembayaran</span>
              <span class="font-medium">
                {{ orderSummary.paymentFee === 0 ? 'GRATIS' : formatIDR(orderSummary.paymentFee) }}
              </span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Pajak (PPN 11%)</span>
              <span class="font-medium">{{ formatIDR(orderSummary.tax) }}</span>
            </div>
            <div class="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span class="text-emerald-600">{{ formatIDR(orderSummary.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Shipping & Payment Info -->
        <div class="space-y-6">
          
          <!-- Shipping Information -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Pengiriman</h3>
            
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium text-gray-700">Alamat Pengiriman</label>
                <div class="mt-1 text-sm text-gray-600">
                  <p class="font-medium">{{ shippingAddress.name }}</p>
                  <p>{{ shippingAddress.phone }}</p>
                  <p>{{ shippingAddress.address }}</p>
                  <p>{{ shippingAddress.city }}, {{ shippingAddress.province }} {{ shippingAddress.postalCode }}</p>
                </div>
              </div>
              
              <div>
                <label class="text-sm font-medium text-gray-700">Kurir</label>
                <p class="mt-1 text-sm text-gray-600">{{ shippingMethod.name }} - {{ shippingMethod.description }}</p>
                <p class="text-xs text-gray-500">Estimasi pengiriman: {{ shippingMethod.estimatedDays }}</p>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Pembayaran</h3>
            
            <div class="space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-700">Metode Pembayaran</label>
                <div class="mt-2 flex items-center space-x-3">
                  <img :src="paymentMethod.logo" :alt="paymentMethod.name" class="h-6" />
                  <span class="text-sm text-gray-900">{{ paymentMethod.name }}</span>
                </div>
              </div>
              
              <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex">
                  <UIcon name="i-lucide-info" class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 class="text-sm font-medium text-blue-800 mb-1">Instruksi Pembayaran</h4>
                    <p class="text-sm text-blue-700">{{ getPaymentInstructions() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Langkah Selanjutnya</h3>
            
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-emerald-600">1</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Konfirmasi Pembayaran</p>
                  <p class="text-xs text-gray-600">Lakukan pembayaran sesuai metode yang dipilih</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-gray-600">2</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Verifikasi Pesanan</p>
                  <p class="text-xs text-gray-600">Tim kami akan memverifikasi pembayaran dalam 1x24 jam</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-xs font-medium text-gray-600">3</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Proses Pengiriman</p>
                  <p class="text-xs text-gray-600">Pesanan akan diproses dan dikirim sesuai estimasi kurir</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Butuh Bantuan?</h3>
            
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <UIcon name="i-simple-icons-whatsapp" class="w-5 h-5 text-green-600" />
                <div>
                  <p class="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p class="text-xs text-gray-600">+62 812-3456-7890</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-gray-600" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <p class="text-xs text-gray-600">support@puncakadventura.com</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <UIcon name="i-lucide-clock" class="w-5 h-5 text-gray-600" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Jam Operasional</p>
                  <p class="text-xs text-gray-600">Senin - Jumat: 09:00 - 17:00 WIB</p>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t">
              <UButton color="green" variant="soft" class="w-full" @click="contactWhatsApp">
                <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4 mr-2" />
                Hubungi via WhatsApp
              </UButton>
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

// Generate mock order data (in real app, this would come from API)
const orderNumber = ref(`PA${Date.now().toString().slice(-6)}`)

// Mock order data
const orderItems = [
  {
    id: '1',
    name: 'Tas Carrier 60L Pro Mountain Series',
    brand: 'Eiger',
    quantity: 1,
    price: 850000,
    totalPrice: 850000
  },
  {
    id: '2', 
    name: 'Tenda Ultralight 2P Alpine Pro',
    brand: 'Consina',
    quantity: 1,
    price: 1200000,
    totalPrice: 1200000
  }
]

const orderSummary = {
  subtotal: 2050000,
  shipping: 15000,
  paymentFee: 4000,
  tax: 225500,
  total: 2294500
}

const shippingAddress = {
  name: 'Ahmad Fauzi',
  phone: '+62 812-3456-7890',
  address: 'Jl. Sudirman No. 123, RT 01/RW 05, Kebayoran Baru',
  city: 'Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12190'
}

const shippingMethod = {
  name: 'JNE Regular',
  description: 'Layanan reguler JNE',
  estimatedDays: '2-3 hari kerja'
}

const paymentMethod = {
  name: 'BCA Virtual Account',
  logo: '/images/payments/bca.png'
}

// Helper functions
const getPaymentInstructions = () => {
  const instructions = {
    'gopay': 'Buka aplikasi Gojek/GoPay dan scan QR code atau masukkan nomor Virtual Account.',
    'ovo': 'Buka aplikasi OVO dan lakukan pembayaran dengan nomor Virtual Account.',
    'dana': 'Buka aplikasi DANA dan pilih menu Transfer ke Virtual Account.',
    'bca': 'Transfer ke nomor Virtual Account BCA atau bayar melalui ATM/mobile banking BCA.',
    'mandiri': 'Transfer ke nomor Virtual Account Mandiri atau bayar melalui ATM/mobile banking Mandiri.',
    'cod': 'Siapkan uang pas saat kurir datang mengantarkan pesanan.',
    'credit': 'Pembayaran akan diproses otomatis menggunakan kartu yang telah Anda daftarkan.'
  }
  
  // In real app, determine based on selected payment method
  return instructions['bca']
}

// Actions
const downloadInvoice = () => {
  // In real app, this would download/open the invoice PDF
  alert('Fitur unduh invoice akan segera tersedia!')
}

const contactWhatsApp = () => {
  const message = encodeURIComponent(
    `Halo Puncak Adventura! Saya membutuhkan bantuan terkait pesanan #${orderNumber.value}.`
  )
  window.open(`https://wa.me/6281234567890?text=${message}`, '_blank')
}

// Clear cart after successful order (in real app)
onMounted(() => {
  // This would typically clear the cart after successful payment
  // For demo purposes, we'll leave the cart as is
})
</script>