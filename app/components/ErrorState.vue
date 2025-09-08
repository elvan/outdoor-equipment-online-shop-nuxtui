<template>
  <div :class="containerClass">
    <div class="text-center">
      <!-- Error Icon -->
      <div class="mb-4">
        <UIcon 
          :name="iconName" 
          :class="iconClass"
        />
      </div>
      
      <!-- Title -->
      <h3 :class="titleClass">
        {{ title || getDefaultTitle(type) }}
      </h3>
      
      <!-- Message -->
      <p v-if="message" :class="messageClass">
        {{ message }}
      </p>
      
      <!-- Action Buttons -->
      <div v-if="showRetry || showHome || $slots.actions" class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <slot name="actions">
          <UButton 
            v-if="showRetry"
            @click="$emit('retry')"
            color="emerald"
            :size="buttonSize"
          >
            <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 mr-2" />
            Coba Lagi
          </UButton>
          
          <UButton 
            v-if="showHome"
            to="/"
            variant="outline"
            color="gray"
            :size="buttonSize"
          >
            <UIcon name="i-lucide-home" class="w-4 h-4 mr-2" />
            Beranda
          </UButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'error' | 'not-found' | 'network' | 'server' | 'empty' | 'forbidden'
  title?: string
  message?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
  showRetry?: boolean
  showHome?: boolean
  centered?: boolean
  overlay?: boolean
}

interface Emits {
  (event: 'retry'): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'error',
  size: 'md',
  showRetry: false,
  showHome: false,
  centered: false,
  overlay: false
})

const emit = defineEmits<Emits>()

// Size configurations
const sizeConfig = {
  sm: {
    icon: 'w-12 h-12',
    title: 'text-lg',
    message: 'text-sm',
    button: 'sm',
    container: 'p-6'
  },
  md: {
    icon: 'w-16 h-16',
    title: 'text-xl',
    message: 'text-base',
    button: 'md',
    container: 'p-8'
  },
  lg: {
    icon: 'w-20 h-20',
    title: 'text-2xl',
    message: 'text-lg',
    button: 'lg',
    container: 'p-12'
  }
}

// Type configurations
const typeConfig = {
  error: {
    icon: 'i-lucide-alert-circle',
    color: 'text-red-500',
    title: 'Terjadi Kesalahan',
    message: 'Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.'
  },
  'not-found': {
    icon: 'i-lucide-search-x',
    color: 'text-gray-400',
    title: 'Tidak Ditemukan',
    message: 'Halaman atau data yang Anda cari tidak dapat ditemukan.'
  },
  network: {
    icon: 'i-lucide-wifi-off',
    color: 'text-orange-500',
    title: 'Masalah Koneksi',
    message: 'Periksa koneksi internet Anda dan coba lagi.'
  },
  server: {
    icon: 'i-lucide-server-x',
    color: 'text-red-500',
    title: 'Server Error',
    message: 'Server sedang mengalami gangguan. Coba lagi dalam beberapa saat.'
  },
  empty: {
    icon: 'i-lucide-inbox',
    color: 'text-gray-400',
    title: 'Belum Ada Data',
    message: 'Belum ada data yang tersedia.'
  },
  forbidden: {
    icon: 'i-lucide-lock',
    color: 'text-red-500',
    title: 'Akses Ditolak',
    message: 'Anda tidak memiliki izin untuk mengakses halaman ini.'
  }
}

// Computed properties
const containerClass = computed(() => [
  'flex items-center justify-center',
  sizeConfig[props.size].container,
  props.centered ? 'min-h-[400px]' : '',
  props.overlay ? 'absolute inset-0 bg-white/90 backdrop-blur-sm z-50' : ''
])

const iconName = computed(() => props.icon || typeConfig[props.type].icon)

const iconClass = computed(() => [
  sizeConfig[props.size].icon,
  typeConfig[props.type].color
])

const titleClass = computed(() => [
  sizeConfig[props.size].title,
  'font-semibold text-gray-900 mb-2'
])

const messageClass = computed(() => [
  sizeConfig[props.size].message,
  'text-gray-600 max-w-md'
])

const buttonSize = computed(() => sizeConfig[props.size].button)

// Helper functions
const getDefaultTitle = (type: string) => {
  return typeConfig[type]?.title || 'Error'
}
</script>