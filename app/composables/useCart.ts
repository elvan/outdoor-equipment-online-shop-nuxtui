/**
 * Shopping cart composable for managing cart state and operations
 */

import type { CartItem, Cart, Product } from '~/types'

// Global cart state
const cartState = ref<Cart>({
  id: 'cart-1',
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  updatedAt: new Date().toISOString()
})

// Cart storage key
const CART_STORAGE_KEY = 'puncak-adventura-cart'

export const useCart = () => {
  // Load cart from localStorage on initialization
  const loadCartFromStorage = () => {
    if (import.meta.client) {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
          const parsed = JSON.parse(savedCart)
          cartState.value = { ...cartState.value, ...parsed }
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error)
      }
    }
  }

  // Save cart to localStorage
  const saveCartToStorage = () => {
    if (import.meta.client) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.value))
      } catch (error) {
        console.error('Error saving cart to storage:', error)
      }
    }
  }

  // Calculate cart totals
  const calculateTotals = () => {
    const subtotal = cartState.value.items.reduce((sum, item) => sum + item.totalPrice, 0)
    const totalItems = cartState.value.items.reduce((sum, item) => sum + item.quantity, 0)
    
    // Calculate shipping (free for orders over 500k IDR)
    const shipping = subtotal >= 500000 ? 0 : 25000
    
    // Calculate tax (11% PPN)
    const tax = Math.round(subtotal * 0.11)
    
    const total = subtotal + shipping + tax

    cartState.value = {
      ...cartState.value,
      totalItems,
      subtotal,
      shipping,
      tax,
      total,
      updatedAt: new Date().toISOString()
    }

    saveCartToStorage()
  }

  // Add item to cart
  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedVariants: Record<string, string> = {}
  ) => {
    // Check if item with same product and variants already exists
    const existingItemIndex = cartState.value.items.findIndex(item => 
      item.productId === product.id && 
      JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
    )

    // Calculate price with variant adjustments
    let itemPrice = product.price
    Object.entries(selectedVariants).forEach(([variantType, variantId]) => {
      const variant = product.variants[variantType]?.find(v => v.id === variantId)
      if (variant) {
        itemPrice += variant.priceAdjustment
      }
    })

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const existingItem = cartState.value.items[existingItemIndex]
      existingItem.quantity += quantity
      existingItem.totalPrice = existingItem.quantity * itemPrice
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}`,
        productId: product.id,
        product,
        quantity,
        selectedVariants,
        price: itemPrice,
        totalPrice: itemPrice * quantity,
        addedAt: new Date().toISOString()
      }
      cartState.value.items.push(newItem)
    }

    calculateTotals()
    return true
  }

  // Update item quantity
  const updateItemQuantity = (itemId: string, quantity: number) => {
    const itemIndex = cartState.value.items.findIndex(item => item.id === itemId)
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cartState.value.items.splice(itemIndex, 1)
      } else {
        // Update quantity and total price
        const item = cartState.value.items[itemIndex]
        item.quantity = quantity
        item.totalPrice = item.price * quantity
      }
      calculateTotals()
      return true
    }
    return false
  }

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const itemIndex = cartState.value.items.findIndex(item => item.id === itemId)
    
    if (itemIndex >= 0) {
      cartState.value.items.splice(itemIndex, 1)
      calculateTotals()
      return true
    }
    return false
  }

  // Clear entire cart
  const clearCart = () => {
    cartState.value.items = []
    calculateTotals()
  }

  // Get item count for a specific product
  const getProductQuantityInCart = (productId: string, selectedVariants: Record<string, string> = {}) => {
    const item = cartState.value.items.find(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
    )
    return item ? item.quantity : 0
  }

  // Check if product is in cart
  const isProductInCart = (productId: string, selectedVariants: Record<string, string> = {}) => {
    return getProductQuantityInCart(productId, selectedVariants) > 0
  }

  // Get cart summary for display
  const getCartSummary = () => {
    return {
      itemCount: cartState.value.totalItems,
      subtotal: cartState.value.subtotal,
      shipping: cartState.value.shipping,
      tax: cartState.value.tax,
      total: cartState.value.total,
      hasItems: cartState.value.items.length > 0,
      freeShippingEligible: cartState.value.subtotal >= 500000,
      freeShippingRemaining: Math.max(0, 500000 - cartState.value.subtotal)
    }
  }

  // Format variant display text
  const formatVariantText = (selectedVariants: Record<string, string>, product: Product) => {
    const variantTexts: string[] = []
    
    Object.entries(selectedVariants).forEach(([variantType, variantId]) => {
      const variant = product.variants[variantType]?.find(v => v.id === variantId)
      if (variant) {
        variantTexts.push(`${variantType}: ${variant.name}`)
      }
    })
    
    return variantTexts.join(', ')
  }

  // Initialize cart on first use
  onMounted(() => {
    loadCartFromStorage()
  })

  // Reactive computed properties
  const cart = readonly(cartState)
  const cartSummary = computed(() => getCartSummary())
  const itemCount = computed(() => cartState.value.totalItems)
  const isEmpty = computed(() => cartState.value.items.length === 0)

  return {
    // State
    cart,
    cartSummary,
    itemCount,
    isEmpty,
    
    // Actions
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    
    // Utilities
    getProductQuantityInCart,
    isProductInCart,
    formatVariantText,
    
    // Storage
    loadCartFromStorage,
    saveCartToStorage
  }
}