<template>
  <div v-if="relatedProducts.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-6">
      Produk Terkait
    </h3>
    
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div 
        v-for="product in relatedProducts"
        :key="product.id"
        class="group cursor-pointer"
        @click="viewProduct(product)"
      >
        <!-- Product Image -->
        <div class="relative aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <div class="w-full h-full bg-gray-200 flex items-center justify-center">
            <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
          </div>
          
          <!-- Badges -->
          <div class="absolute top-2 left-2 flex flex-col gap-1">
            <span v-if="product.isOnSale" class="bg-red-600 text-white text-xs font-medium px-1.5 py-0.5 rounded">
              -{{ product.discount }}%
            </span>
            <span v-if="product.isNewProduct" class="bg-emerald-600 text-white text-xs font-medium px-1.5 py-0.5 rounded">
              Baru
            </span>
          </div>

          <!-- Quick Actions -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <UButton
              :icon="isInWishlist(product.id) ? 'i-lucide-heart' : 'i-lucide-heart'"
              :class="isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'"
              size="xs"
              color="white"
              variant="solid"
              square
              @click.stop="toggleWishlist(product)"
            />
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-1">
          <h4 class="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {{ product.name }}
          </h4>
          
          <!-- Rating -->
          <div class="flex items-center space-x-1">
            <div class="flex space-x-0.5">
              <UIcon 
                v-for="i in 5" 
                :key="i"
                name="i-lucide-star" 
                :class="[
                  'w-3 h-3',
                  i <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                ]"
              />
            </div>
            <span class="text-xs text-gray-500">
              {{ product.rating }} ({{ product.reviewCount }})
            </span>
          </div>

          <!-- Price -->
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-bold text-emerald-600">
                {{ formatIDR(product.price) }}
              </span>
              <span v-if="product.originalPrice && product.originalPrice > product.price" 
                    class="text-xs text-gray-500 line-through">
                {{ formatIDR(product.originalPrice) }}
              </span>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="text-xs">
            <span v-if="product.availability === 'in-stock'" class="text-green-600">
              Tersedia
            </span>
            <span v-else-if="product.availability === 'low-stock'" class="text-orange-600">
              Stok terbatas
            </span>
            <span v-else-if="product.availability === 'out-of-stock'" class="text-red-600">
              Stok habis
            </span>
            <span v-else class="text-blue-600">
              Pre-order
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- View More Button -->
    <div class="text-center mt-6" v-if="totalRelated > relatedProducts.length">
      <UButton 
        variant="outline" 
        color="emerald"
        @click="viewMoreRelated"
      >
        Lihat Lebih Banyak Produk Serupa
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { formatIDR } from '~/utils/indonesian'

interface Props {
  currentProduct: Product
  maxItems?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxItems: 4
})

// Use composables
const { toggleWishlist, isInWishlist } = useWishlist()

// Import products data
const { products } = await import('~/data/products')

// Computed properties
const relatedProducts = computed(() => {
  // Filter out current product and get related products
  const candidates = products.filter(p => p.id !== props.currentProduct.id)
  
  // Score products based on similarity
  const scoredProducts = candidates.map(product => {
    let score = 0
    
    // Same category gets high score
    if (product.category === props.currentProduct.category) {
      score += 10
    }
    
    // Same subcategory gets very high score
    if (product.subcategory === props.currentProduct.subcategory) {
      score += 15
    }
    
    // Same brand gets medium score
    if (product.brand === props.currentProduct.brand) {
      score += 5
    }
    
    // Similar price range gets small score
    const priceDiff = Math.abs(product.price - props.currentProduct.price)
    const maxPrice = Math.max(product.price, props.currentProduct.price)
    if (priceDiff / maxPrice < 0.3) { // Within 30% price range
      score += 3
    }
    
    // Shared tags get score
    const sharedTags = product.tags.filter(tag => props.currentProduct.tags.includes(tag))
    score += sharedTags.length * 2
    
    // Featured products get small boost
    if (product.isFeatured) {
      score += 1
    }
    
    // Higher rated products get small boost
    if (product.rating >= 4.5) {
      score += 1
    }
    
    return { product, score }
  })
  
  // Sort by score and return top results
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, props.maxItems)
    .map(item => item.product)
})

const totalRelated = computed(() => {
  return products.filter(p => 
    p.id !== props.currentProduct.id && 
    (p.category === props.currentProduct.category || p.subcategory === props.currentProduct.subcategory)
  ).length
})

// Actions
const viewProduct = (product: Product) => {
  navigateTo(`/products/${product.slug}`)
}

const viewMoreRelated = () => {
  const categorySlug = props.currentProduct.category
  navigateTo(`/products?category=${categorySlug}`)
}
</script>