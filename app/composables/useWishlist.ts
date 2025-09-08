import type { Product, Wishlist, WishlistItem } from '~/types'

const WISHLIST_STORAGE_KEY = 'puncak-adventura-wishlist'

// Global reactive state
const wishlist = ref<Wishlist>({
  id: 'default-wishlist',
  userId: 'guest-user',
  items: [],
  totalItems: 0,
  updatedAt: new Date().toISOString()
})

// Initialize wishlist from localStorage on client-side
if (process.client) {
  const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
  if (stored) {
    try {
      const parsedWishlist = JSON.parse(stored) as Wishlist
      wishlist.value = parsedWishlist
    } catch (error) {
      console.warn('Failed to parse stored wishlist:', error)
      // Initialize with empty wishlist
      saveWishlistToStorage()
    }
  } else {
    saveWishlistToStorage()
  }
}

function saveWishlistToStorage() {
  if (process.client) {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.value))
    } catch (error) {
      console.warn('Failed to save wishlist to localStorage:', error)
    }
  }
}

function updateWishlist() {
  wishlist.value.totalItems = wishlist.value.items.length
  wishlist.value.updatedAt = new Date().toISOString()
  saveWishlistToStorage()
}

export const useWishlist = () => {
  // Computed properties
  const isEmpty = computed(() => wishlist.value.totalItems === 0)
  const itemCount = computed(() => wishlist.value.totalItems)

  // Helper functions
  const isInWishlist = (productId: string): boolean => {
    return wishlist.value.items.some(item => item.productId === productId)
  }

  const getWishlistItem = (productId: string): WishlistItem | undefined => {
    return wishlist.value.items.find(item => item.productId === productId)
  }

  // Core wishlist functions
  const addToWishlist = (product: Product): boolean => {
    try {
      // Check if product is already in wishlist
      if (isInWishlist(product.id)) {
        console.warn('Product already in wishlist:', product.name)
        return false
      }

      // Create new wishlist item
      const wishlistItem: WishlistItem = {
        id: `wishlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: wishlist.value.userId,
        productId: product.id,
        product,
        addedAt: new Date().toISOString()
      }

      // Add to wishlist
      wishlist.value.items.push(wishlistItem)
      updateWishlist()

      console.log(`Added "${product.name}" to wishlist`)
      return true
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      return false
    }
  }

  const removeFromWishlist = (productId: string): boolean => {
    try {
      const initialLength = wishlist.value.items.length
      wishlist.value.items = wishlist.value.items.filter(item => item.productId !== productId)
      
      if (wishlist.value.items.length < initialLength) {
        updateWishlist()
        console.log(`Removed product from wishlist`)
        return true
      }
      return false
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      return false
    }
  }

  const toggleWishlist = (product: Product): boolean => {
    if (isInWishlist(product.id)) {
      return removeFromWishlist(product.id)
    } else {
      return addToWishlist(product)
    }
  }

  const clearWishlist = (): void => {
    wishlist.value.items = []
    updateWishlist()
    console.log('Wishlist cleared')
  }

  // Utility functions
  const getWishlistSummary = () => {
    return {
      totalItems: wishlist.value.totalItems,
      lastUpdated: wishlist.value.updatedAt,
      isEmpty: isEmpty.value
    }
  }

  // Get products by category from wishlist
  const getWishlistByCategory = (category: string) => {
    return wishlist.value.items.filter(item => item.product.category === category)
  }

  // Get recently added items
  const getRecentWishlistItems = (limit: number = 5) => {
    return wishlist.value.items
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, limit)
  }

  return {
    // State
    wishlist: readonly(wishlist),
    
    // Computed
    isEmpty,
    itemCount,
    
    // Functions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    isInWishlist,
    getWishlistItem,
    getWishlistSummary,
    getWishlistByCategory,
    getRecentWishlistItems
  }
}