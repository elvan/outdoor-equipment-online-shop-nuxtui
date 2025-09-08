<template>
  <!-- Overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-40 transition-opacity" @click="isOpen = false"/>

  <!-- Sidebar -->
  <div
:class="[
    'fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out',
    isOpen ? 'translate-x-0' : 'translate-x-full'
  ]">
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">
          Keranjang Belanja
          <span v-if="cartSummary.itemCount > 0" class="ml-2 text-sm text-gray-500">
            ({{ cartSummary.itemCount }} item)
          </span>
        </h3>
        <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="isOpen = false" />
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6">

        <!-- Empty Cart -->
        <div v-if="isEmpty" class="flex flex-col items-center justify-center py-12 text-center">
          <UIcon name="i-lucide-shopping-cart" class="w-16 h-16 text-gray-300 mb-4" />
          <h4 class="text-lg font-medium text-gray-900 mb-2">Keranjang Kosong</h4>
          <p class="text-gray-600 mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
          <UButton to="/products" color="emerald" @click="$emit('close')">
            Mulai Belanja
          </UButton>
        </div>

        <!-- Cart Items -->
        <div v-else class="space-y-4">
          <div v-for="item in cart.items" :key="item.id" class="flex space-x-4 py-4">
            <!-- Product Image -->
            <div class="flex-shrink-0">
              <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-image" class="w-8 h-8 text-gray-400" />
              </div>
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="text-sm font-medium text-gray-900 line-clamp-2">
                    {{ item.product.name }}
                  </h4>
                  <p class="text-sm text-gray-600 mt-1">{{ item.product.brand }}</p>

                  <!-- Variants -->
                  <div v-if="Object.keys(item.selectedVariants).length > 0" class="mt-1">
                    <p class="text-xs text-gray-500">
                      {{ formatVariantText(item.selectedVariants, item.product) }}
                    </p>
                  </div>

                  <!-- Price -->
                  <div class="mt-2">
                    <span class="text-sm font-semibold text-emerald-600">
                      {{ formatIDR(item.price) }}
                    </span>
                    <span
v-if="item.product.originalPrice && item.product.originalPrice > item.price"
                      class="text-xs text-gray-500 line-through ml-2">
                      {{ formatIDR(item.product.originalPrice) }}
                    </span>
                  </div>
                </div>

                <!-- Remove Button -->
                <UButton
color="red" variant="ghost" size="xs" icon="i-lucide-trash-2"
                  @click="removeFromCart(item.id)" />
              </div>

              <!-- Quantity Controls -->
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center space-x-2">
                  <UButton
:disabled="item.quantity <= 1" color="gray"
                    variant="outline" size="xs" icon="i-lucide-minus" @click="updateItemQuantity(item.id, item.quantity - 1)" />
                  <span class="text-sm font-medium min-w-[30px] text-center">{{ item.quantity }}</span>
                  <UButton
:disabled="item.quantity >= getMaxQuantity(item)"
                    color="gray" variant="outline" size="xs" icon="i-lucide-plus"
                    @click="updateItemQuantity(item.id, item.quantity + 1)" />
                </div>
                <div class="text-sm font-semibold text-gray-900">
                  {{ formatIDR(item.totalPrice) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="!isEmpty" class="border-t border-gray-200 p-6 space-y-4">
          <!-- Free Shipping Progress -->
          <div
v-if="!cartSummary.freeShippingEligible && cartSummary.freeShippingRemaining > 0"
            class="bg-emerald-50 rounded-lg p-3">
            <div class="flex items-center justify-between text-sm mb-2">
              <span class="text-emerald-700 font-medium">Gratis Ongkir</span>
              <span class="text-emerald-600">{{ formatIDR(cartSummary.freeShippingRemaining) }} lagi</span>
            </div>
            <div class="w-full bg-emerald-200 rounded-full h-2">
              <div
class="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: `${Math.min(100, (cartSummary.subtotal / 500000) * 100)}%` }"/>
            </div>
            <p class="text-xs text-emerald-700 mt-1">
              Belanja {{ formatIDR(cartSummary.freeShippingRemaining) }} lagi untuk gratis ongkir!
            </p>
          </div>

          <div v-else-if="cartSummary.freeShippingEligible" class="bg-green-50 rounded-lg p-3">
            <div class="flex items-center text-sm text-green-700">
              <UIcon name="i-lucide-check-circle" class="w-4 h-4 mr-2" />
              <span class="font-medium">Selamat! Anda mendapat gratis ongkir</span>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t pt-4">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Subtotal ({{ cartSummary.itemCount }} item)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Ongkos Kirim</span>
                <span class="font-medium">
                  {{ cartSummary.shipping === 0 ? 'GRATIS' : formatIDR(cartSummary.shipping) }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Pajak (PPN 11%)</span>
                <span class="font-medium">{{ formatIDR(cartSummary.tax) }}</span>
              </div>
              <div class="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span class="text-emerald-600">{{ formatIDR(cartSummary.total) }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <UButton size="lg" variant="outline" color="emerald" class="w-full" @click="viewCart">
              Lihat Keranjang
            </UButton>
            <UButton size="lg" color="emerald" class="w-full" @click="proceedToCheckout">
              Checkout ({{ formatIDR(cartSummary.total) }})
            </UButton>
          </div>

          <!-- Continue Shopping -->
          <div class="text-center">
            <button class="text-sm text-gray-600 hover:text-emerald-600 transition-colors" @click="continueShopping">
              ← Lanjut Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types';
import { formatIDR } from '~/utils/indonesian';

interface Props {
  modelValue: boolean;
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
  (event: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Use cart composable
const {
  cart,
  cartSummary,
  isEmpty,
  updateItemQuantity,
  removeFromCart,
  formatVariantText
} = useCart();

// Local reactive state for slideover
const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
});

// Helper functions
const getMaxQuantity = (item: CartItem): number => {
  // Get available stock for the specific variant combination
  let maxStock = item.product.stock;

  Object.entries(item.selectedVariants).forEach(([variantType, variantId]) => {
    const variant = item.product.variants[variantType]?.find(v => v.id === variantId);
    if (variant) {
      maxStock = Math.min(maxStock, variant.stock);
    }
  });

  return Math.max(1, maxStock);
};

// Actions
const viewCart = () => {
  isOpen.value = false;
  navigateTo('/cart');
};

const proceedToCheckout = () => {
  isOpen.value = false;
  navigateTo('/checkout');
};

const continueShopping = () => {
  isOpen.value = false;
};

// Watch for cart changes to show feedback
watch(() => cart.value.totalItems, (newCount, oldCount) => {
  if (newCount > oldCount) {
    // Item was added - could show a toast notification here
  }
});
</script>
