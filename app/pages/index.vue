<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-700 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"/>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Petualangan Dimulai
            <br class="hidden sm:block">
            <span class="text-emerald-200">Dari Sini</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
            Peralatan outdoor berkualitas tinggi untuk petualangan Anda di seluruh Nusantara. 
            Dari puncak Semeru hingga pantai Raja Ampat.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              size="xl"
              color="white"
              variant="solid"
              label="Jelajahi Produk"
              icon="i-lucide-compass"
              to="/products"
            />
            <UButton
              size="xl"
              color="emerald"
              variant="outline"
              label="Panduan Petualangan"
              icon="i-lucide-map"
              to="/adventure"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kategori Peralatan
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan perlengkapan yang tepat untuk setiap jenis petualangan Anda
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-lg bg-emerald-100 aspect-square">
              <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-90"/>
              <div class="relative p-6 h-full flex flex-col justify-center items-center text-center">
                <UIcon name="i-lucide-mountain" class="w-12 h-12 text-white mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Mountaineering</h3>
                <p class="text-emerald-100 text-sm">Perlengkapan mendaki gunung</p>
              </div>
            </div>
          </div>

          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-lg bg-blue-100 aspect-square">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90"/>
              <div class="relative p-6 h-full flex flex-col justify-center items-center text-center">
                <UIcon name="i-lucide-tent" class="w-12 h-12 text-white mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Camping</h3>
                <p class="text-blue-100 text-sm">Peralatan berkemah</p>
              </div>
            </div>
          </div>

          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-lg bg-amber-100 aspect-square">
              <div class="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-90"/>
              <div class="relative p-6 h-full flex flex-col justify-center items-center text-center">
                <UIcon name="i-lucide-footprints" class="w-12 h-12 text-white mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Hiking</h3>
                <p class="text-amber-100 text-sm">Perlengkapan hiking</p>
              </div>
            </div>
          </div>

          <div class="group cursor-pointer">
            <div class="relative overflow-hidden rounded-lg bg-purple-100 aspect-square">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-90"/>
              <div class="relative p-6 h-full flex flex-col justify-center items-center text-center">
                <UIcon name="i-lucide-shirt" class="w-12 h-12 text-white mb-4" />
                <h3 class="text-xl font-bold text-white mb-2">Pakaian</h3>
                <p class="text-purple-100 text-sm">Pakaian outdoor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Preview -->
    <section class="py-16 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produk Unggulan
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Produk terpilih dengan kualitas terbaik untuk petualangan Anda
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div class="bg-gray-200 rounded-lg aspect-square mb-4 flex items-center justify-center relative">
              <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-400" />
              <!-- Sale badge -->
              <div v-if="product.isOnSale" class="absolute top-2 right-2">
                <span class="bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Sale {{ product.discount }}%
                </span>
              </div>
            </div>
            <div class="mb-2">
              <span class="text-xs text-gray-500 uppercase tracking-wide">{{ product.brand }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.shortDescription }}</p>
            <div class="mb-4">
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
                <span class="ml-1 text-sm text-gray-600">{{ product.rating }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-2xl font-bold text-emerald-600">{{ formatIDR(product.price) }}</span>
                <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through ml-2">
                  {{ formatIDR(product.originalPrice) }}
                </span>
              </div>
              <UButton 
                size="sm" 
                color="emerald" 
                :to="`/products/${product.slug}`"
              >
                Lihat Detail
              </UButton>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <UButton
            size="lg"
            color="emerald"
            variant="outline"
            label="Lihat Semua Produk"
            icon="i-lucide-arrow-right"
            to="/products"
          />
        </div>
      </div>
    </section>

    <!-- Indonesian Destinations -->
    <section class="py-16 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Destinasi Petualangan Indonesia
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Jelajahi keindahan alam Indonesia dengan perlengkapan terpercaya
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-mountain-snow" class="w-10 h-10 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Gunung Semeru</h3>
            <p class="text-gray-600">
              Taklukkan Mahameru, puncak tertinggi di Pulau Jawa dengan peralatan mountaineering terbaik.
            </p>
          </div>

          <div class="text-center">
            <div class="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-waves" class="w-10 h-10 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Raja Ampat</h3>
            <p class="text-gray-600">
              Eksplorasi surga bawah laut Indonesia dengan perlengkapan diving dan snorkeling berkualitas.
            </p>
          </div>

          <div class="text-center">
            <div class="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <UIcon name="i-lucide-trees" class="w-10 h-10 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">Taman Nasional Bromo</h3>
            <p class="text-gray-600">
              Nikmati sunrise spektakuler di Bromo dengan perlengkapan camping yang nyaman dan hangat.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-emerald-600">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          Siap Memulai Petualangan?
        </h2>
        <p class="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
          Dapatkan konsultasi gratis dari ahli kami untuk memilih perlengkapan yang tepat 
          sesuai dengan rencana petualangan Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            size="xl"
            color="white"
            variant="solid"
            label="Konsultasi Gratis"
            icon="i-lucide-message-circle"
          />
          <UButton
            size="xl"
            color="emerald"
            variant="outline"
            label="WhatsApp Kami"
            icon="i-simple-icons-whatsapp"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getFeaturedProducts } from '~/data/products'
import { formatIDR } from '~/utils/indonesian'

// SEO
useSeoMeta({
  title: 'Puncak Adventura - Peralatan Outdoor Indonesia',
  ogTitle: 'Puncak Adventura - Peralatan Outdoor Indonesia',
  description: 'Toko peralatan outdoor terpercaya di Indonesia. Perlengkapan mountaineering, camping, hiking, dan climbing berkualitas tinggi untuk petualangan Anda.',
  ogDescription: 'Toko peralatan outdoor terpercaya di Indonesia. Perlengkapan mountaineering, camping, hiking, dan climbing berkualitas tinggi untuk petualangan Anda.',
  ogImage: '/images/og-home.jpg'
})

// Get featured products
const featuredProducts = getFeaturedProducts()
</script>
