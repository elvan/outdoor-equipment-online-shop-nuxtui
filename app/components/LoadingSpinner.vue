<template>
  <div :class="containerClass">
    <div class="relative">
      <!-- Spinner -->
      <div 
        :class="spinnerClass"
        class="animate-spin rounded-full border-solid border-t-transparent"
      />
      
      <!-- Center dot -->
      <div 
        v-if="showCenterDot"
        :class="dotClass"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-30"
      />
    </div>
    
    <!-- Loading text -->
    <div v-if="text" :class="textClass">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'emerald' | 'gray' | 'white'
  text?: string
  centered?: boolean
  overlay?: boolean
  showCenterDot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  text: '',
  centered: false,
  overlay: false,
  showCenterDot: false
})

// Size configurations
const sizeConfig = {
  xs: {
    spinner: 'w-4 h-4 border-2',
    dot: 'w-1 h-1',
    text: 'text-xs'
  },
  sm: {
    spinner: 'w-6 h-6 border-2',
    dot: 'w-1.5 h-1.5',
    text: 'text-sm'
  },
  md: {
    spinner: 'w-8 h-8 border-3',
    dot: 'w-2 h-2',
    text: 'text-base'
  },
  lg: {
    spinner: 'w-12 h-12 border-4',
    dot: 'w-3 h-3',
    text: 'text-lg'
  },
  xl: {
    spinner: 'w-16 h-16 border-4',
    dot: 'w-4 h-4',
    text: 'text-xl'
  }
}

// Color configurations
const colorConfig = {
  primary: 'text-emerald-600 border-emerald-600',
  emerald: 'text-emerald-600 border-emerald-600',
  gray: 'text-gray-600 border-gray-600',
  white: 'text-white border-white'
}

// Computed classes
const containerClass = computed(() => [
  'flex flex-col items-center justify-center',
  props.text ? 'space-y-3' : '',
  props.centered ? 'h-full w-full' : '',
  props.overlay ? 'absolute inset-0 bg-white/80 backdrop-blur-sm z-50' : ''
])

const spinnerClass = computed(() => [
  sizeConfig[props.size].spinner,
  colorConfig[props.color]
])

const dotClass = computed(() => [
  sizeConfig[props.size].dot,
  colorConfig[props.color]
])

const textClass = computed(() => [
  sizeConfig[props.size].text,
  colorConfig[props.color],
  'font-medium'
])
</script>