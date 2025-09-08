<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
        <p v-if="!isEmpty" class="mt-2 text-lg text-gray-600">
          {{ cartSummary.itemCount }} item di keranjang Anda
        </p>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty Cart -->
      <div v-if="isEmpty" class="text-center py-16">
        <UIcon name="i-lucide-shopping-cart" class="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Keranjang Anda Kosong</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          Belum ada produk yang ditambahkan ke keranjang. Yuk, mulai belanja produk outdoor terbaik!
        </p>
        <UButton to="/products" color="emerald" size="lg">
          <UIcon name="i-lucide-compass" class="w-5 h-5 mr-2" />
          Mulai Belanja
        </UButton>
      </div>

      <!-- Cart Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Free Shipping Progress -->
          <div v-if="!cartSummary.freeShippingEligible && cartSummary.freeShippingRemaining > 0" class="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <UIcon name="i-lucide-truck" class="w-5 h-5 text-emerald-600 mr-2" />
                <span class="text-emerald-800 font-semibold">Gratis Ongkir</span>
              </div>
              <span class="text-emerald-700 font-medium">
                {{ formatIDR(cartSummary.freeShippingRemaining) }} lagi
              </span>
            </div>
            <div class="relative">
              <div class="overflow-hidden h-3 text-xs flex rounded-full bg-emerald-200">
                <div 
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500"
                  :style="{ width: `${Math.min(100, (cartSummary.subtotal / 500000) * 100)}%` }"
                />
              </div>
            </div>
            <p class="text-sm text-emerald-700 mt-2">
              Belanja {{ formatIDR(cartSummary.freeShippingRemaining) }} lagi untuk mendapatkan gratis ongkir!
            </p>
          </div>

          <div v-else-if="cartSummary.freeShippingEligible" class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div class="flex items-center text-green-800">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 mr-2" />
              <span class="font-semibold">Selamat! Anda mendapat gratis ongkir</span>
            </div>
          </div>

          <!-- Cart Items List -->
          <div class="space-y-4">
            <div v-for="item in cart.items" :key="item.id" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <div class="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                    <UIcon name="i-lucide-image" class="w-10 h-10 text-gray-400" />
                  </div>
                </div>

                <!-- Product Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold text-gray-900">
                        <NuxtLink :to="`/products/${item.product.slug}`" class="hover:text-emerald-600 transition-colors">
                          {{ item.product.name }}
                        </NuxtLink>
                      </h3>
                      <p class="text-sm text-gray-600 mt-1">{{ item.product.brand }}</p>
                      
                      <!-- Variants -->
                      <div v-if="Object.keys(item.selectedVariants).length > 0" class="mt-2">
                        <p class="text-sm text-gray-500">
                          {{ formatVariantText(item.selectedVariants, item.product) }}
                        </p>
                      </div>

                      <!-- Availability -->
                      <div class="mt-2">
                        <div v-if="item.product.availability === 'in-stock'" class="flex items-center text-sm text-green-600">
                          <UIcon name="i-lucide-check-circle" class="w-4 h-4 mr-1" />
                          Tersedia
                        </div>
                        <div v-else-if="item.product.availability === 'low-stock'" class="flex items-center text-sm text-orange-600">
                          <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mr-1" />
                          Stok terbatas
                        </div>
                        <div v-else class="flex items-center text-sm text-red-600">
                          <UIcon name="i-lucide-x-circle" class="w-4 h-4 mr-1" />
                          Stok habis
                        </div>
                      </div>
                    </div>

                    <!-- Remove Button -->
                    <UButton
                      color="red"
                      variant="ghost"
                      size="sm"
                      icon="i-lucide-trash-2"
                      @click="removeFromCart(item.id)"
                    />
                  </div>

                  <!-- Price and Quantity -->
                  <div class="flex items-center justify-between mt-4">
                    <!-- Quantity Controls -->
                    <div class="flex items-center space-x-3">
                      <span class="text-sm text-gray-600">Jumlah:</span>
                      <div class="flex items-center border border-gray-300 rounded-lg">
                        <UButton
                          :disabled="item.quantity <= 1"
                          color="gray"
                          variant="ghost"
                          size="sm"
                          icon="i-lucide-minus"
                          @click="updateItemQuantity(item.id, item.quantity - 1)"
                        />
                        <span class="px-4 py-2 text-lg font-medium min-w-[60px] text-center">
                          {{ item.quantity }}
                        </span>
                        <UButton
                          :disabled="item.quantity >= getMaxQuantity(item)"
                          color="gray"
                          variant="ghost"
                          size="sm"
                          icon="i-lucide-plus"
                          @click="updateItemQuantity(item.id, item.quantity + 1)"
                        />
                      </div>
                      <span class="text-xs text-gray-500">Max {{ getMaxQuantity(item) }}</span>
                    </div>

                    <!-- Price -->
                    <div class="text-right">
                      <div class="text-lg font-semibold text-gray-900">
                        {{ formatIDR(item.totalPrice) }}
                      </div>
                      <div class="text-sm text-gray-600">
                        {{ formatIDR(item.price) }} / unit
                        <span v-if="item.product.originalPrice && item.product.originalPrice > item.price" class="line-through ml-1">
                          {{ formatIDR(item.product.originalPrice) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Actions -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
            <UButton to="/products" variant="outline" color="gray" size="lg">
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
              Lanjut Belanja
            </UButton>
            
            <UButton variant="outline" color="red" size="lg" @click="clearCart">
              <UIcon name="i-lucide-trash-2" class="w-4 h-4 mr-2" />
              Kosongkan Keranjang
            </UButton>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
            
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal ({{ cartSummary.itemCount }} item)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.subtotal) }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600">Ongkos Kirim</span>
                <span class="font-medium">
                  {{ cartSummary.shipping === 0 ? 'GRATIS' : formatIDR(cartSummary.shipping) }}
                </span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-gray-600">Pajak (PPN 11%)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.tax) }}</span>
              </div>
              
              <div class="border-t border-gray-200 pt-3 flex justify-between text-lg font-semibold">
                <span class="text-gray-900">Total</span>
                <span class="text-emerald-600">{{ formatIDR(cartSummary.total) }}</span>
              </div>
            </div>

            <!-- Checkout Button -->
            <UButton 
              color="emerald" 
              size="xl" 
              class="w-full mt-6" 
              @click="proceedToCheckout"
            >
              <UIcon name="i-lucide-shopping-bag" class="w-5 h-5 mr-2" />
              Checkout
            </UButton>

            <!-- Payment Methods -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Metode Pembayaran</h4>
              <div class="grid grid-cols-3 gap-2">
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">GoPay</div>
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">OVO</div>
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">DANA</div>
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">BCA</div>
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">Mandiri</div>
                <div class="bg-gray-50 rounded text-xs text-center py-2 px-1 font-medium text-gray-700">COD</div>
              </div>
            </div>

            <!-- Security Info -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <div class="flex items-center text-sm text-gray-600">
                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-green-600 mr-2" />
                <span>Pembayaran aman & terpercaya</span>
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
import type { CartItem } from '~/types'

// Use cart composable
const { 
  cart, 
  cartSummary, 
  isEmpty, 
  updateItemQuantity, 
  removeFromCart, 
  clearCart,
  formatVariantText 
} = useCart()

// SEO
useSeoMeta({
  title: 'Keranjang Belanja - Puncak Adventura',
  ogTitle: 'Keranjang Belanja - Puncak Adventura',
  description: 'Lihat dan kelola produk outdoor di keranjang belanja Anda',
  ogDescription: 'Lihat dan kelola produk outdoor di keranjang belanja Anda'
})

// Helper functions
const getMaxQuantity = (item: CartItem): number => {
  let maxStock = item.product.stock

  Object.entries(item.selectedVariants).forEach(([variantType, variantId]) => {
    const variant = item.product.variants[variantType]?.find(v => v.id === variantId)
    if (variant) {
      maxStock = Math.min(maxStock, variant.stock)
    }
  })

  return Math.max(1, maxStock)
}

// Actions
const proceedToCheckout = () => {
  navigateTo('/checkout')
}
</script>