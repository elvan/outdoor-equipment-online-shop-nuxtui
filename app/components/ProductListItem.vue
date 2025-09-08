<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <div class="relative">
          <div class="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-400" />
          </div>
          
          <!-- Badges -->
          <div class="absolute top-2 left-2 flex flex-col gap-1">
            <span v-if="product.isNewProduct" class="bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded">
              Baru
            </span>
            <span v-if="product.isOnSale" class="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
              Sale {{ product.discount }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <!-- Category -->
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {{ getCategoryName(product.category) }} • {{ product.brand }}
                </p>

                <!-- Product Name -->
                <h3 class="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                  <NuxtLink :to="`/products/${product.slug}`">
                    {{ product.name }}
                  </NuxtLink>
                </h3>

                <!-- Short Description -->
                <p class="text-gray-600 mb-3 line-clamp-2">
                  {{ product.shortDescription }}
                </p>

                <!-- Rating -->
                <div class="flex items-center mb-3">
                  <div class="flex items-center">
                    <UIcon 
                      v-for="i in 5" 
                      :key="i"
                      name="i-lucide-star"
                      :class="[
                        'w-4 h-4',
                        i <= Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      ]"
                    />
                  </div>
                  <span class="ml-2 text-sm text-gray-600">
                    {{ product.rating }} ({{ product.reviewCount }} ulasan)
                  </span>
                  <span class="ml-4 text-sm text-gray-500">
                    {{ product.soldCount }} terjual
                  </span>
                </div>

                <!-- Key Features -->
                <div class="mb-4">
                  <div class="flex flex-wrap gap-2">
                    <span 
                      v-for="feature in product.features.slice(0, 3)" 
                      :key="feature"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {{ feature }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Wishlist Button -->
              <UButton
                icon="i-lucide-heart"
                size="sm"
                color="gray"
                variant="ghost"
                square
                @click.prevent="toggleWishlist"
                class="ml-4"
              />
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between">
            <div>
              <!-- Price -->
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl font-bold text-emerald-600">
                  {{ formatIDR(product.price) }}
                </span>
                <span v-if="product.originalPrice" class="text-lg text-gray-500 line-through">
                  {{ formatIDR(product.originalPrice) }}
                </span>
                <span v-if="product.isOnSale" class="text-sm text-red-600 font-medium">
                  Hemat {{ formatIDR(product.originalPrice - product.price) }}
                </span>
              </div>

              <!-- Stock Status -->
              <div>
                <div v-if="product.availability === 'in-stock'" class="flex items-center text-sm text-green-600">
                  <UIcon name="i-lucide-check-circle" class="w-4 h-4 mr-1" />
                  Tersedia ({{ product.stock }} unit)
                </div>
                <div v-else-if="product.availability === 'low-stock'" class="flex items-center text-sm text-orange-600">
                  <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mr-1" />
                  Stok terbatas ({{ product.stock }} unit)
                </div>
                <div v-else-if="product.availability === 'out-of-stock'" class="flex items-center text-sm text-red-600">
                  <UIcon name="i-lucide-x-circle" class="w-4 h-4 mr-1" />
                  Stok habis
                </div>
                <div v-else class="flex items-center text-sm text-blue-600">
                  <UIcon name="i-lucide-clock" class="w-4 h-4 mr-1" />
                  Pre-order tersedia
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-3">
              <UButton
                variant="outline"
                color="emerald"
                size="md"
                @click="viewProduct"
              >
                Lihat Detail
              </UButton>
              <UButton
                :disabled="product.availability === 'out-of-stock'"
                color="emerald"
                size="md"
                @click="addToCart"
              >
                <UIcon name="i-lucide-shopping-cart" class="w-4 h-4 mr-2" />
                {{ product.availability === 'out-of-stock' ? 'Stok Habis' : 'Tambah ke Keranjang' }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatIDR } from '~/utils/indonesian'
import type { Product } from '~/types'

interface Props {
  product: Product
}

const props = defineProps<Props>()

// Category name mapping
const getCategoryName = (category: string) => {
  const categoryNames = {
    mountaineering: 'Mountaineering',
    camping: 'Camping',
    hiking: 'Hiking',
    apparel: 'Pakaian Outdoor',
    climbing: 'Climbing'
  }
  return categoryNames[category] || category
}

// Actions
const toggleWishlist = () => {
  // TODO: Implement wishlist functionality
  console.log('Toggle wishlist for product:', props.product.id)
}

const addToCart = () => {
  // TODO: Implement add to cart functionality
  console.log('Add to cart:', props.product.id)
}

const viewProduct = () => {
  navigateTo(`/products/${props.product.slug}`)
}
</script>