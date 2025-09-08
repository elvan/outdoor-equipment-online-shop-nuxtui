<template>
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <!-- Reviews Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-semibold text-gray-900">
        Ulasan Pelanggan
        <span class="text-sm text-gray-500 font-normal ml-2">
          ({{ reviewCount }} ulasan)
        </span>
      </h3>
      <UButton variant="outline" size="sm" color="emerald">
        Tulis Ulasan
      </UButton>
    </div>

    <!-- Rating Summary -->
    <div class="flex items-start space-x-8 mb-8 pb-6 border-b border-gray-200">
      <div class="text-center">
        <div class="text-4xl font-bold text-gray-900 mb-1">{{ rating.toFixed(1) }}</div>
        <div class="flex items-center justify-center mb-2">
          <div class="flex space-x-1">
            <UIcon 
              v-for="i in 5" 
              :key="i"
              name="i-lucide-star" 
              :class="[
                'w-5 h-5',
                i <= Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              ]"
            />
          </div>
        </div>
        <div class="text-sm text-gray-600">{{ reviewCount }} ulasan</div>
      </div>
      
      <!-- Rating Breakdown -->
      <div class="flex-1">
        <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center mb-2">
          <span class="text-sm text-gray-600 w-4">{{ star }}</span>
          <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400 fill-current ml-1 mr-3" />
          <div class="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${getRatingPercentage(star)}%` }"
            />
          </div>
          <span class="text-sm text-gray-600 ml-3 w-8 text-right">
            {{ getRatingCount(star) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Individual Reviews -->
    <div class="space-y-6">
      <div 
        v-for="review in displayedReviews" 
        :key="review.id"
        class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
      >
        <!-- Review Header -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <span class="text-emerald-600 font-medium text-sm">
                {{ getInitials(review.userName) }}
              </span>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h4 class="font-medium text-gray-900">{{ review.userName }}</h4>
                <UBadge v-if="review.verified" color="emerald" variant="soft" size="xs">
                  <UIcon name="i-lucide-check" class="w-3 h-3 mr-1" />
                  Terverifikasi
                </UBadge>
              </div>
              <div class="flex items-center space-x-2 mt-1">
                <div class="flex space-x-1">
                  <UIcon 
                    v-for="i in 5" 
                    :key="i"
                    name="i-lucide-star" 
                    :class="[
                      'w-4 h-4',
                      i <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    ]"
                  />
                </div>
                <span class="text-sm text-gray-500">
                  {{ formatIndonesianDate(review.date) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Review Content -->
        <div class="ml-13">
          <h5 v-if="review.title" class="font-medium text-gray-900 mb-2">
            {{ review.title }}
          </h5>
          <p class="text-gray-700 leading-relaxed mb-4">
            {{ review.comment }}
          </p>
          
          <!-- Review Images -->
          <div v-if="review.images && review.images.length > 0" class="flex space-x-2 mb-4">
            <div 
              v-for="image in review.images" 
              :key="image"
              class="w-20 h-20 bg-gray-100 rounded-lg border cursor-pointer hover:opacity-75 transition-opacity"
            >
              <img :src="image" :alt="review.title" class="w-full h-full object-cover rounded-lg" >
            </div>
          </div>

          <!-- Review Actions -->
          <div class="flex items-center space-x-6 text-sm">
            <button class="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors">
              <UIcon name="i-lucide-thumbs-up" class="w-4 h-4" />
              <span>Membantu</span>
              <span class="text-gray-500">({{ review.helpful }})</span>
            </button>
            <button class="text-gray-600 hover:text-emerald-600 transition-colors">
              Balas
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="reviews.length > displayedReviews.length" class="text-center mt-8">
      <UButton variant="outline" color="emerald" @click="loadMore">
        Lihat Lebih Banyak Ulasan
        <span class="ml-2 text-sm text-gray-500">
          ({{ reviews.length - displayedReviews.length }} lainnya)
        </span>
      </UButton>
    </div>

    <!-- No Reviews State -->
    <div v-if="reviews.length === 0" class="text-center py-12">
      <UIcon name="i-lucide-message-square" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h4 class="text-lg font-medium text-gray-900 mb-2">Belum Ada Ulasan</h4>
      <p class="text-gray-600 mb-6">
        Jadilah yang pertama memberikan ulasan untuk produk ini
      </p>
      <UButton color="emerald">
        Tulis Ulasan Pertama
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductReview } from '~/types'
import { formatIndonesianDate } from '~/utils/indonesian'

interface Props {
  reviews: ProductReview[]
  rating: number
  reviewCount: number
}

const props = defineProps<Props>()

// Local state
const reviewsPerPage = 5
const currentPage = ref(1)

// Computed properties
const displayedReviews = computed(() => {
  return props.reviews.slice(0, reviewsPerPage * currentPage.value)
})

// Helper functions
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const getRatingPercentage = (star: number): number => {
  const count = getRatingCount(star)
  return props.reviewCount > 0 ? (count / props.reviewCount) * 100 : 0
}

const getRatingCount = (star: number): number => {
  return props.reviews.filter(review => review.rating === star).length
}

const loadMore = () => {
  currentPage.value++
}
</script>