<template>
  <div v-if="product" class="min-h-screen bg-gray-50">
    <!-- Breadcrumb -->
    <div class="bg-white border-b">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex items-center space-x-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-emerald-600">Beranda</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          <NuxtLink to="/products" class="hover:text-emerald-600">Produk</NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          <span class="text-gray-900">{{ getCategoryName(product.category) }}</span>
          <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
          <span class="text-gray-500 truncate">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Product Images -->
        <div class="space-y-4">
          <!-- Main Image -->
          <div class="relative">
            <div class="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="w-full h-full bg-gray-200 flex items-center justify-center">
                <UIcon name="i-lucide-image" class="w-20 h-20 text-gray-400" />
              </div>
            </div>
            
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span v-if="product.isNewProduct" class="bg-emerald-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Produk Baru
              </span>
              <span v-if="product.isOnSale" class="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Diskon {{ product.discount }}%
              </span>
              <span v-if="product.isFeatured" class="bg-purple-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                Unggulan
              </span>
            </div>

            <!-- Wishlist Button -->
            <button
              class="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
              @click="toggleWishlist"
            >
              <UIcon 
                name="i-lucide-heart" 
                :class="[
                  'w-5 h-5',
                  isInWishlist ? 'text-red-500 fill-current' : 'text-gray-600'
                ]" 
              />
            </button>
          </div>

          <!-- Thumbnail Images -->
          <div class="flex space-x-3 overflow-x-auto pb-2">
            <button
              v-for="(image, index) in product.images"
              :key="image.id"
              class="flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 border-transparent hover:border-emerald-300 overflow-hidden"
              :class="{ 'border-emerald-500': selectedImageIndex === index }"
              @click="selectedImageIndex = index"
            >
              <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
              </div>
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Header -->
          <div>
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span class="uppercase tracking-wide">{{ product.brand }}</span>
              <span>•</span>
              <span>SKU: {{ product.sku }}</span>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
            <p class="text-lg text-gray-600">{{ product.shortDescription }}</p>
          </div>

          <!-- Rating -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <UIcon 
                v-for="i in 5" 
                :key="i"
                name="i-lucide-star"
                :class="[
                  'w-5 h-5',
                  i <= Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                ]"
              />
              <span class="ml-2 text-lg font-medium text-gray-900">{{ product.rating }}</span>
            </div>
            <span class="text-gray-600">{{ product.reviewCount }} ulasan</span>
            <span class="text-gray-600">{{ product.soldCount }} terjual</span>
          </div>

          <!-- Price -->
          <div class="border-t border-gray-200 pt-6">
            <div class="flex items-center gap-4">
              <span class="text-4xl font-bold text-emerald-600">
                {{ formatIDR(currentPrice) }}
              </span>
              <span v-if="product.originalPrice" class="text-2xl text-gray-500 line-through">
                {{ formatIDR(product.originalPrice) }}
              </span>
            </div>
            <p v-if="product.isOnSale" class="text-lg text-red-600 font-medium mt-2">
              Hemat {{ formatIDR(product.originalPrice - product.price) }}!
            </p>
          </div>

          <!-- Variants -->
          <div v-if="hasVariants" class="space-y-4">
            <!-- Size Variants -->
            <div v-if="product.variants.size">
              <h3 class="text-sm font-medium text-gray-900 mb-2">Ukuran</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in product.variants.size"
                  :key="size.id"
                  :disabled="size.stock === 0"
                  :class="[
                    'px-4 py-2 border rounded-lg text-sm font-medium transition-colors',
                    selectedVariants.size === size.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : size.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                  ]"
                  @click="selectedVariants.size = size.id"
                >
                  {{ size.name }}
                  {{ size.stock === 0 ? '(Habis)' : '' }}
                </button>
              </div>
            </div>

            <!-- Color Variants -->
            <div v-if="product.variants.color">
              <h3 class="text-sm font-medium text-gray-900 mb-2">Warna</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="color in product.variants.color"
                  :key="color.id"
                  :disabled="color.stock === 0"
                  :class="[
                    'px-4 py-2 border rounded-lg text-sm font-medium transition-colors',
                    selectedVariants.color === color.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : color.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                  ]"
                  @click="selectedVariants.color = color.id"
                >
                  {{ color.name }}
                  {{ color.stock === 0 ? '(Habis)' : '' }}
                </button>
              </div>
            </div>

            <!-- Model Variants -->
            <div v-if="product.variants.model">
              <h3 class="text-sm font-medium text-gray-900 mb-2">Model</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="model in product.variants.model"
                  :key="model.id"
                  :disabled="model.stock === 0"
                  :class="[
                    'px-4 py-2 border rounded-lg text-sm font-medium transition-colors',
                    selectedVariants.model === model.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : model.stock === 0
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-emerald-300'
                  ]"
                  @click="selectedVariants.model = model.id"
                >
                  {{ model.name }}
                  {{ model.stock === 0 ? '(Habis)' : '' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="flex items-center space-x-3">
            <div v-if="product.availability === 'in-stock'" class="flex items-center text-green-600">
              <UIcon name="i-lucide-check-circle" class="w-5 h-5 mr-2" />
              <span class="font-medium">Tersedia</span>
              <span class="ml-2 text-gray-600">({{ availableStock }} unit)</span>
            </div>
            <div v-else-if="product.availability === 'low-stock'" class="flex items-center text-orange-600">
              <UIcon name="i-lucide-alert-circle" class="w-5 h-5 mr-2" />
              <span class="font-medium">Stok terbatas</span>
              <span class="ml-2 text-gray-600">({{ availableStock }} unit tersisa)</span>
            </div>
            <div v-else-if="product.availability === 'out-of-stock'" class="flex items-center text-red-600">
              <UIcon name="i-lucide-x-circle" class="w-5 h-5 mr-2" />
              <span class="font-medium">Stok habis</span>
            </div>
            <div v-else class="flex items-center text-blue-600">
              <UIcon name="i-lucide-clock" class="w-5 h-5 mr-2" />
              <span class="font-medium">Pre-order tersedia</span>
            </div>
          </div>

          <!-- Quantity and Actions -->
          <div class="space-y-4 border-t pt-6">
            <div class="flex items-center space-x-4">
              <div class="flex items-center border border-gray-300 rounded-lg">
                <button
                  :disabled="quantity <= 1"
                  class="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="decreaseQuantity"
                >
                  <UIcon name="i-lucide-minus" class="w-4 h-4" />
                </button>
                <span class="px-4 py-2 text-lg font-medium min-w-[60px] text-center">{{ quantity }}</span>
                <button
                  :disabled="quantity >= availableStock || product.availability === 'out-of-stock'"
                  class="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="increaseQuantity"
                >
                  <UIcon name="i-lucide-plus" class="w-4 h-4" />
                </button>
              </div>
              <span class="text-gray-600">Max {{ availableStock }} unit</span>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UButton
                :disabled="!canAddToCart"
                color="emerald"
                size="xl"
                class="w-full"
                @click="addToCart"
              >
                <UIcon name="i-lucide-shopping-cart" class="w-5 h-5 mr-2" />
                {{ product.availability === 'out-of-stock' ? 'Stok Habis' : 'Tambah ke Keranjang' }}
              </UButton>
              <UButton
                :disabled="!canAddToCart"
                variant="outline"
                color="emerald"
                size="xl"
                class="w-full"
                @click="buyNow"
              >
                Beli Sekarang
              </UButton>
            </div>

            <!-- WhatsApp Contact -->
            <div class="text-center">
              <UButton
                variant="soft"
                color="green"
                size="sm"
                @click="contactWhatsApp"
              >
                <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4 mr-2" />
                Tanya via WhatsApp
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Details Tabs -->
      <div class="mt-12">
        <UTabs v-model="activeTab" :items="tabItems" class="w-full">
          <!-- Description -->
          <template #description="{ item }">
            <div class="space-y-6">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Deskripsi Produk</h3>
                <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
              </div>

              <!-- Features -->
              <div v-if="product.features.length > 0">
                <h4 class="text-lg font-semibold text-gray-900 mb-3">Fitur Utama</h4>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li v-for="feature in product.features" :key="feature" class="flex items-center text-gray-700">
                    <UIcon name="i-lucide-check" class="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <!-- Specifications -->
          <template #specifications="{ item }">
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Spesifikasi</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div v-for="spec in product.specifications" :key="spec.name" class="flex justify-between py-2 border-b border-gray-200">
                  <span class="font-medium text-gray-900">{{ spec.name }}</span>
                  <span class="text-gray-700">{{ spec.value }}{{ spec.unit ? ' ' + spec.unit : '' }}</span>
                </div>
              </div>

              <!-- Additional Info -->
              <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-900">Berat:</span>
                  <span class="text-gray-700 ml-2">{{ product.weight }} kg</span>
                </div>
                <div>
                  <span class="font-medium text-gray-900">Dimensi:</span>
                  <span class="text-gray-700 ml-2">{{ product.dimensions.length }}×{{ product.dimensions.width }}×{{ product.dimensions.height }} cm</span>
                </div>
                <div>
                  <span class="font-medium text-gray-900">Kondisi:</span>
                  <span class="text-gray-700 ml-2">{{ getConditionName(product.condition) }}</span>
                </div>
              </div>
            </div>
          </template>

          <!-- Reviews -->
          <template #reviews="{ item }">
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-semibold text-gray-900">Ulasan Pelanggan</h3>
                <UButton size="sm" variant="outline" color="emerald">
                  Tulis Ulasan
                </UButton>
              </div>

              <!-- Rating Summary -->
              <div class="bg-white rounded-lg border p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="text-center">
                    <div class="text-4xl font-bold text-gray-900 mb-2">{{ product.rating }}</div>
                    <div class="flex items-center justify-center mb-2">
                      <UIcon 
                        v-for="i in 5" 
                        :key="i"
                        name="i-lucide-star"
                        :class="[
                          'w-6 h-6',
                          i <= Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        ]"
                      />
                    </div>
                    <div class="text-gray-600">Berdasarkan {{ product.reviewCount }} ulasan</div>
                  </div>
                  <div class="space-y-2">
                    <div v-for="i in 5" :key="i" class="flex items-center space-x-3">
                      <span class="text-sm text-gray-600 w-8">{{ 6-i }}★</span>
                      <div class="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          class="bg-yellow-400 h-2 rounded-full"
                          :style="{ width: `${getStarPercentage(6-i)}%` }"
                        />
                      </div>
                      <span class="text-sm text-gray-600 w-8">{{ Math.round(product.reviewCount * getStarPercentage(6-i) / 100) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Reviews -->
              <ProductReviews 
                :reviews="product.reviews" 
                :rating="product.rating" 
                :review-count="product.reviewCount" 
              />
            </div>
          </template>
        </UTabs>

        <!-- Related Products -->
        <div class="mt-12">
          <RelatedProducts :current-product="product" />
        </div>
      </div>
    </div>
  </div>

  <!-- Product Not Found -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <UIcon name="i-lucide-package-x" class="w-24 h-24 text-gray-400 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
      <p class="text-gray-600 mb-6">Maaf, produk yang Anda cari tidak dapat ditemukan.</p>
      <UButton to="/products" color="emerald">
        Kembali ke Katalog Produk
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProductBySlug } from '~/data/products'
import { formatIDR } from '~/utils/indonesian'
import type { Product } from '~/types'

// Use cart composable
const { addToCart: addToCartAction } = useCart()
const { toggleWishlist: toggleWishlistAction, isInWishlist: checkIsInWishlist } = useWishlist()

// Get route params
const route = useRoute()
const productSlug = route.params.slug as string

// Get product data
const product = getProductBySlug(productSlug)

// Reactive data
const selectedImageIndex = ref(0)
const selectedVariants = ref<Record<string, string>>({})
const quantity = ref(1)
const isInWishlist = computed(() => product.value ? checkIsInWishlist(product.value.id) : false)
const activeTab = ref(0)

// Tab items
const tabItems = [
  {
    key: 'description',
    label: 'Deskripsi',
    icon: 'i-lucide-file-text'
  },
  {
    key: 'specifications',
    label: 'Spesifikasi',
    icon: 'i-lucide-settings'
  },
  {
    key: 'reviews',
    label: `Ulasan (${product?.reviewCount || 0})`,
    icon: 'i-lucide-star'
  }
]

// SEO
if (product) {
  useSeoMeta({
    title: `${product.name} - Puncak Adventura`,
    ogTitle: `${product.name} - Puncak Adventura`,
    description: product.shortDescription,
    ogDescription: product.shortDescription,
    ogImage: '/images/og-product.jpg'
  })
} else {
  useSeoMeta({
    title: 'Produk Tidak Ditemukan - Puncak Adventura'
  })
}

// Computed properties
const hasVariants = computed(() => {
  if (!product) return false
  return Object.keys(product.variants).some(key => 
    product.variants[key] && product.variants[key].length > 0
  )
})

const currentPrice = computed(() => {
  if (!product) return 0
  let price = product.price
  
  // Add variant price adjustments
  Object.entries(selectedVariants.value).forEach(([variantType, variantId]) => {
    const variant = product.variants[variantType]?.find(v => v.id === variantId)
    if (variant) {
      price += variant.priceAdjustment
    }
  })
  
  return price
})

const availableStock = computed(() => {
  if (!product) return 0
  
  // If no variants selected, return main stock
  if (Object.keys(selectedVariants.value).length === 0) {
    return product.stock
  }
  
  // Calculate stock based on selected variants
  let stock = product.stock
  Object.entries(selectedVariants.value).forEach(([variantType, variantId]) => {
    const variant = product.variants[variantType]?.find(v => v.id === variantId)
    if (variant) {
      stock = Math.min(stock, variant.stock)
    }
  })
  
  return stock
})

const canAddToCart = computed(() => {
  return product && 
    product.availability !== 'out-of-stock' && 
    availableStock.value > 0 && 
    quantity.value <= availableStock.value
})

// Helper functions
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

const getConditionName = (condition: string) => {
  const conditionNames = {
    new: 'Baru',
    'like-new': 'Seperti Baru',
    good: 'Baik',
    refurbished: 'Refurbished'
  }
  return conditionNames[condition] || condition
}

const getStarPercentage = (star: number) => {
  if (!product) return 0
  // Mock percentage distribution
  const distributions = {
    5: 60,
    4: 25,
    3: 10,
    2: 3,
    1: 2
  }
  return distributions[star] || 0
}

// Actions
const increaseQuantity = () => {
  if (quantity.value < availableStock.value) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const toggleWishlist = () => {
  if (!product.value) return
  toggleWishlistAction(product.value)
}

const addToCart = () => {
  if (!canAddToCart.value || !product) return
  
  const success = addToCartAction(product, quantity.value, selectedVariants.value)
  
  if (success) {
    // Show success notification (you can implement toast notification here)
    console.log('Product added to cart successfully')
    
    // Optional: Reset quantity to 1 after adding
    quantity.value = 1
  }
}

const buyNow = () => {
  if (!canAddToCart.value || !product) return
  
  // Add to cart and redirect to checkout
  const success = addToCartAction(product, quantity.value, selectedVariants.value)
  
  if (success) {
    navigateTo('/checkout')
  }
}

const contactWhatsApp = () => {
  const message = `Halo, saya tertarik dengan produk ${product?.name}. Bisakah Anda memberikan informasi lebih lanjut?`
  const whatsappUrl = `https://wa.me/6282212345678?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

// Initialize selected variants with defaults
onMounted(() => {
  if (product && hasVariants.value) {
    Object.entries(product.variants).forEach(([variantType, variants]) => {
      if (variants && variants.length > 0) {
        // Select first available variant
        const availableVariant = variants.find(v => v.stock > 0)
        if (availableVariant) {
          selectedVariants.value[variantType] = availableVariant.id
        }
      }
    })
  }
})
</script>