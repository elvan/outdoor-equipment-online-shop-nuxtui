/**
 * TypeScript interfaces and types for Indonesian Outdoor Equipment Shop
 */

// Product related types
export type ProductCategory = 'mountaineering' | 'camping' | 'hiking' | 'apparel' | 'climbing'

export type ProductCondition = 'new' | 'like-new' | 'good' | 'refurbished'

export type ProductAvailability = 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order'

export interface ProductVariant {
  id: string
  name: string
  value: string
  priceAdjustment: number
  stock: number
  sku: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
}

export interface ProductReview {
  id: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

export interface ProductSpecification {
  name: string
  value: string
  unit?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: ProductCategory
  subcategory: string
  brand: string
  sku: string
  price: number
  originalPrice?: number
  discount?: number
  images: ProductImage[]
  variants: {
    size?: ProductVariant[]
    color?: ProductVariant[]
    model?: ProductVariant[]
  }
  specifications: ProductSpecification[]
  features: string[]
  condition: ProductCondition
  availability: ProductAvailability
  stock: number
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  tags: string[]
  reviews: ProductReview[]
  rating: number
  reviewCount: number
  soldCount: number
  wishlistCount: number
  isNewProduct: boolean
  isFeatured: boolean
  isOnSale: boolean
  createdAt: string
  updatedAt: string
}

// Category types
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  productCount: number
  subcategories: Subcategory[]
  featured: boolean
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description: string
  productCount: number
}

// Shopping Cart types
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariants: Record<string, string>
  price: number
  totalPrice: number
  addedAt: string
}

export interface Cart {
  id: string
  items: CartItem[]
  totalItems: number
  subtotal: number
  shipping: number
  tax: number
  total: number
  updatedAt: string
}

// User and Customer types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  avatar?: string
  emailVerified: boolean
  phoneVerified: boolean
  createdAt: string
  lastLoginAt: string
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  province: string
  postalCode: string
  country: string
  isDefault: boolean
  type: 'home' | 'office' | 'other'
}

// Order types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'gopay' | 'ovo' | 'dana' | 'shopeepay' | 'bca' | 'mandiri' | 'bri' | 'bni' | 'cod'

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariants: Record<string, string>
  unitPrice: number
  totalPrice: number
}

export interface ShippingInfo {
  carrierId: string
  carrierName: string
  service: string
  cost: number
  estimatedDays: number
  trackingNumber?: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  shippingAddress: Address
  billingAddress: Address
  shippingInfo: ShippingInfo
  notes?: string
  createdAt: string
  updatedAt: string
  completedAt?: string
}

// Wishlist types
export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  addedAt: string
}

export interface Wishlist {
  id: string
  userId: string
  items: WishlistItem[]
  totalItems: number
  updatedAt: string
}

// Search and Filter types
export interface SearchFilters {
  category?: ProductCategory[]
  subcategory?: string[]
  brand?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  availability?: ProductAvailability[]
  condition?: ProductCondition[]
  tags?: string[]
}

export interface SearchSortOptions {
  field: 'name' | 'price' | 'rating' | 'createdAt' | 'soldCount'
  direction: 'asc' | 'desc'
}

export interface SearchResult {
  products: Product[]
  totalProducts: number
  totalPages: number
  currentPage: number
  filters: SearchFilters
  sort: SearchSortOptions
}

// Indonesian specific types
export interface IndonesianAddress extends Address {
  district?: string
  subDistrict?: string
  village?: string
}

export interface IndonesianShipping {
  carrier: 'jne' | 'jnt' | 'sicepat' | 'anteraja' | 'pos' | 'ninja'
  service: string
  cost: number
  estimatedDays: number
  description: string
}

export interface IndonesianPayment {
  method: PaymentMethod
  name: string
  type: 'ewallet' | 'bank' | 'cod' | 'card'
  fee: number
  description: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}