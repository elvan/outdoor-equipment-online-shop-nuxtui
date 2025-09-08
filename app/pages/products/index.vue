<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Semua Produk</h1>
            <p class="mt-2 text-lg text-gray-600">
              Temukan perlengkapan outdoor terbaik untuk petualangan Anda
            </p>
          </div>
          <div class="mt-4 lg:mt-0">
            <div class="flex items-center space-x-4">
              <!-- Sort Dropdown -->
              <USelectMenu
                v-model="selectedSort"
                :options="sortOptions"
                placeholder="Urutkan"
                class="w-48"
              />
              <!-- View Toggle -->
              <div class="flex bg-gray-100 rounded-lg p-1">
                <button
                  :class="[
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    viewMode === 'grid'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  ]"
                  @click="viewMode = 'grid'"
                >
                  <UIcon name="i-lucide-grid-3x3" class="w-4 h-4" />
                </button>
                <button
                  :class="[
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    viewMode === 'list'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  ]"
                  @click="viewMode = 'list'"
                >
                  <UIcon name="i-lucide-list" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Filter Produk</h3>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Kategori</h4>
              <div class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center">
                  <input 
                    v-model="selectedCategories" 
                    type="checkbox"
                    :value="category.id"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                  <span class="ml-auto text-xs text-gray-500">({{ category.productCount }})</span>
                </label>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Rentang Harga</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input 
                    v-model="selectedPriceRanges" 
                    type="checkbox"
                    value="0-500000"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Di bawah Rp 500.000</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="selectedPriceRanges" 
                    type="checkbox"
                    value="500000-1000000"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Rp 500.000 - Rp 1.000.000</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="selectedPriceRanges" 
                    type="checkbox"
                    value="1000000-2000000"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Rp 1.000.000 - Rp 2.000.000</span>
                </label>
                <label class="flex items-center">
                  <input 
                    v-model="selectedPriceRanges" 
                    type="checkbox"
                    value="2000000-999999999"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">Di atas Rp 2.000.000</span>
                </label>
              </div>
            </div>

            <!-- Brand Filter -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Brand</h4>
              <div class="space-y-2">
                <label v-for="brand in brands" :key="brand" class="flex items-center">
                  <input 
                    v-model="selectedBrands" 
                    type="checkbox"
                    :value="brand"
                    class="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  >
                  <span class="ml-2 text-sm text-gray-700">{{ brand }}</span>
                </label>
              </div>
            </div>

            <!-- Clear Filters -->
            <UButton
              variant="outline"
              color="gray"
              size="sm"
              class="w-full"
              @click="clearFilters"
            >
              Hapus Semua Filter
            </UButton>
          </div>
        </div>

        <!-- Products Grid/List -->
        <div class="flex-1">
          <!-- Results Info -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-gray-600">
              Menampilkan {{ filteredProducts.length }} dari {{ products.length }} produk
            </p>
          </div>

          <!-- Grid View -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- List View -->
          <div v-else class="space-y-4">
            <ProductListItem
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-8 flex justify-center">
            <UPagination
              v-model="currentPage"
              :page-count="itemsPerPage"
              :total="filteredProducts.length"
              :max="7"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { products, categories } from '~/data/products'
import { formatIDR } from '~/utils/indonesian'
import type { Product } from '~/types'

// SEO
useSeoMeta({
  title: 'Semua Produk - Puncak Adventura',
  ogTitle: 'Semua Produk - Puncak Adventura',
  description: 'Jelajahi koleksi lengkap peralatan outdoor berkualitas tinggi untuk petualangan Anda di Indonesia.',
  ogDescription: 'Jelajahi koleksi lengkap peralatan outdoor berkualitas tinggi untuk petualangan Anda di Indonesia.',
  ogImage: '/images/og-products.jpg'
})

// Reactive data
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const itemsPerPage = 12
const selectedSort = ref('name-asc')
const selectedCategories = ref<string[]>([])
const selectedPriceRanges = ref<string[]>([])
const selectedBrands = ref<string[]>([])

// Sort options
const sortOptions = [
  { label: 'Nama A-Z', value: 'name-asc' },
  { label: 'Nama Z-A', value: 'name-desc' },
  { label: 'Harga Terendah', value: 'price-asc' },
  { label: 'Harga Tertinggi', value: 'price-desc' },
  { label: 'Rating Tertinggi', value: 'rating-desc' },
  { label: 'Terlaris', value: 'sold-desc' },
  { label: 'Terbaru', value: 'newest' }
]

// Get unique brands
const brands = computed(() => {
  const uniqueBrands = [...new Set(products.map(p => p.brand))]
  return uniqueBrands.sort()
})

// Filtered products
const filteredProducts = computed(() => {
  let filtered = [...products]

  // Filter by categories
  if (selectedCategories.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedCategories.value.includes(product.category)
    )
  }

  // Filter by price ranges
  if (selectedPriceRanges.value.length > 0) {
    filtered = filtered.filter(product => {
      return selectedPriceRanges.value.some(range => {
        const [min, max] = range.split('-').map(Number)
        return product.price >= min && product.price <= max
      })
    })
  }

  // Filter by brands
  if (selectedBrands.value.length > 0) {
    filtered = filtered.filter(product => 
      selectedBrands.value.includes(product.brand)
    )
  }

  // Sort products
  const [field, direction] = selectedSort.value.split('-')
  filtered.sort((a, b) => {
    let aValue: any, bValue: any

    switch (field) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'price':
        aValue = a.price
        bValue = b.price
        break
      case 'rating':
        aValue = a.rating
        bValue = b.rating
        break
      case 'sold':
        aValue = a.soldCount
        bValue = b.soldCount
        break
      case 'newest':
        aValue = new Date(a.createdAt)
        bValue = new Date(b.createdAt)
        break
      default:
        return 0
    }

    if (direction === 'desc') {
      return bValue > aValue ? 1 : -1
    }
    return aValue > bValue ? 1 : -1
  })

  return filtered
})

// Paginated products
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage)
})

// Clear filters
const clearFilters = () => {
  selectedCategories.value = []
  selectedPriceRanges.value = []
  selectedBrands.value = []
  currentPage.value = 1
}

// Watch for filter changes to reset page
watch([selectedCategories, selectedPriceRanges, selectedBrands, selectedSort], () => {
  currentPage.value = 1
})
</script>