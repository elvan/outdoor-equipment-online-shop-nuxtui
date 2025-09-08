<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-mountain" class="w-6 h-6 text-white" />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-gray-900">Puncak Adventura</h1>
              <p class="text-xs text-gray-600">Peralatan Outdoor Indonesia</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/products" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Produk
          </NuxtLink>
          <NuxtLink 
            to="/categories" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Kategori
          </NuxtLink>
          <NuxtLink 
            to="/adventure" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Petualangan
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          >
            Tentang
          </NuxtLink>
        </nav>

        <!-- Search and Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <div class="hidden lg:block">
            <div class="relative">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari peralatan outdoor..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
              >
            </div>
          </div>

          <!-- Cart -->
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-shopping-cart"
            class="relative"
            @click="toggleCart"
          >
            <span 
              v-if="itemCount > 0"
              class="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ itemCount > 99 ? '99+' : itemCount }}
            </span>
          </UButton>

          <!-- Account -->
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-user"
          />

          <!-- Mobile Menu Toggle -->
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-menu"
            class="md:hidden"
            @click="toggleMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Search -->
      <div class="lg:hidden pb-3">
        <div class="relative">
          <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari peralatan outdoor..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 bg-white">
      <div class="px-4 py-3 space-y-3">
        <NuxtLink 
          to="/products" 
          class="block text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          @click="closeMobileMenu"
        >
          Produk
        </NuxtLink>
        <NuxtLink 
          to="/categories" 
          class="block text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          @click="closeMobileMenu"
        >
          Kategori
        </NuxtLink>
        <NuxtLink 
          to="/adventure" 
          class="block text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          @click="closeMobileMenu"
        >
          Petualangan
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          class="block text-gray-700 hover:text-emerald-600 font-medium transition-colors"
          @click="closeMobileMenu"
        >
          Tentang
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Mobile menu state
const showMobileMenu = ref(false)

// Cart functionality
const { itemCount } = useCart()

// Events
const emit = defineEmits<{
  'toggle-cart': []
}>()

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
}

const toggleCart = () => {
  emit('toggle-cart')
}
</script>