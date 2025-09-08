<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader @toggle-cart="toggleCartSidebar" />
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Cart Sidebar -->
    <CartSidebar v-model="showCartSidebar" @close="showCartSidebar = false" />
  </div>
</template>

<script setup lang="ts">
// Layout for the Indonesian outdoor equipment shop

// Cart sidebar state
const showCartSidebar = ref(false)

const toggleCartSidebar = () => {
  showCartSidebar.value = !showCartSidebar.value
}
</script>