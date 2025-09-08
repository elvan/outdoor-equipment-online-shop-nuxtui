<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group">
    <!-- Product Image -->
    <div class="relative overflow-hidden rounded-t-lg">
      <div class="aspect-square bg-gray-200 flex items-center justify-center">
        <!-- Placeholder for product image -->
        <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-400" />
      </div>
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span v-if="product.isNewProduct" class="bg-emerald-600 text-white text-xs font-medium px-2 py-1 rounded">
          Baru
        </span>
        <span v-if="product.isOnSale" class="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
          Sale {{ product.discount }}%
        </span>
        <span v-if="product.availability === 'low-stock'" class="bg-orange-600 text-white text-xs font-medium px-2 py-1 rounded">
          Stok Terbatas
        </span>
        <span v-if="product.availability === 'out-of-stock'" class="bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded">
          Habis
        </span>
      </div>

      <!-- Quick Actions -->
      <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <UButton
          :icon="productInWishlist ? 'i-lucide-heart' : 'i-lucide-heart'"
          :class="productInWishlist ? 'text-red-500' : 'text-gray-600'"
          size="sm"
          color="white"
          variant="solid"
          square
          @click.prevent="toggleWishlist"
        />
        <UButton
          icon="i-lucide-eye"
          size="sm"
          color="white"
          variant="solid"
          square
          @click.prevent="quickView"
        />
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Category -->
      <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {{ getCategoryName(product.category) }}
      </p>

      <!-- Product Name -->
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
        <NuxtLink :to="`/products/${product.slug}`">
          {{ product.name }}
        </NuxtLink>
      </h3>

      <!-- Brand -->
      <p class="text-sm text-gray-600 mb-2">{{ product.brand }}</p>

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
          {{ product.rating }} ({{ product.reviewCount }})
        </span>
      </div>

      <!-- Price -->
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <span class="text-lg font-bold text-emerald-600">
            {{ formatIDR(product.price) }}
          </span>
          <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">
            {{ formatIDR(product.originalPrice) }}
          </span>
        </div>
        <p v-if="product.isOnSale" class="text-sm text-red-600 font-medium">
          Hemat {{ formatIDR(product.originalPrice - product.price) }}
        </p>
      </div>

      <!-- Stock Status -->
      <div class="mb-4">
        <div v-if="product.availability === 'in-stock'" class="flex items-center text-sm text-green-600">
          <UIcon name="i-lucide-check-circle" class="w-4 h-4 mr-1" />
          Tersedia ({{ product.stock }})
        </div>
        <div v-else-if="product.availability === 'low-stock'" class="flex items-center text-sm text-orange-600">
          <UIcon name="i-lucide-alert-circle" class="w-4 h-4 mr-1" />
          Stok terbatas ({{ product.stock }})
        </div>
        <div v-else-if="product.availability === 'out-of-stock'" class="flex items-center text-sm text-red-600">
          <UIcon name="i-lucide-x-circle" class="w-4 h-4 mr-1" />
          Stok habis
        </div>
        <div v-else class="flex items-center text-sm text-blue-600">
          <UIcon name="i-lucide-clock" class="w-4 h-4 mr-1" />
          Pre-order
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-2">
        <UButton
          :disabled="product.availability === 'out-of-stock'"
          color="emerald"
          size="sm"
          class="flex-1"
          @click="addToCart"
        >
          <UIcon name="i-lucide-shopping-cart" class="w-4 h-4 mr-1" />
          {{ product.availability === 'out-of-stock' ? 'Habis' : 'Keranjang' }}
        </UButton>
        <UButton
          variant="outline"
          color="emerald"
          size="sm"
          @click="viewProduct"
        >
          Detail
        </UButton>
      </div>

      <!-- Additional Info -->
      <div class="mt-3 pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>{{ product.soldCount }} terjual</span>
          <span>{{ product.wishlistCount }} suka</span>
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

// Use composables
const { addToCart: addToCartAction } = useCart()
const { toggleWishlist: toggleWishlistAction, isInWishlist } = useWishlist()

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

// Computed
const productInWishlist = computed(() => isInWishlist(props.product.id))

// Actions
const toggleWishlist = () => {
  toggleWishlistAction(props.product)
}

const quickView = () => {
  // TODO: Implement quick view modal
  console.log('Quick view for product:', props.product.id)
}

const addToCart = () => {
  addToCartAction(props.product, 1)
}

const viewProduct = () => {
  navigateTo(`/products/${props.product.slug}`)
}
</script>