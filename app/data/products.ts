import type { Product, Category, ProductCategory } from '~/types'

/**
 * Mock data for Indonesian outdoor equipment products
 */

// Categories data
export const categories: Category[] = [
  {
    id: 'mountaineering',
    name: 'Mountaineering',
    slug: 'mountaineering',
    description: 'Perlengkapan lengkap untuk pendakian gunung dan ekspedisi alpine',
    image: '/images/categories/mountaineering.jpg',
    productCount: 45,
    featured: true,
    subcategories: [
      { id: 'boots', name: 'Sepatu Gunung', slug: 'sepatu-gunung', description: 'Sepatu pendakian berkualitas tinggi', productCount: 12 },
      { id: 'ropes', name: 'Tali Pendakian', slug: 'tali-pendakian', description: 'Tali dinamis dan statis untuk climbing', productCount: 8 },
      { id: 'harnesses', name: 'Harness', slug: 'harness', description: 'Sabuk pengaman untuk panjat tebing', productCount: 10 },
      { id: 'helmets', name: 'Helm', slug: 'helm', description: 'Perlindungan kepala saat mendaki', productCount: 15 }
    ]
  },
  {
    id: 'camping',
    name: 'Camping',
    slug: 'camping',
    description: 'Peralatan berkemah untuk petualangan outdoor yang nyaman',
    image: '/images/categories/camping.jpg',
    productCount: 67,
    featured: true,
    subcategories: [
      { id: 'tents', name: 'Tenda', slug: 'tenda', description: 'Tenda berkualitas untuk berbagai kondisi', productCount: 20 },
      { id: 'sleeping-bags', name: 'Sleeping Bag', slug: 'sleeping-bag', description: 'Kantung tidur hangat dan nyaman', productCount: 18 },
      { id: 'cooking', name: 'Peralatan Masak', slug: 'peralatan-masak', description: 'Kompor dan perlengkapan memasak outdoor', productCount: 15 },
      { id: 'lighting', name: 'Penerangan', slug: 'penerangan', description: 'Lampu dan senter untuk camping', productCount: 14 }
    ]
  },
  {
    id: 'hiking',
    name: 'Hiking',
    slug: 'hiking',
    description: 'Perlengkapan hiking dan trekking untuk petualangan harian',
    image: '/images/categories/hiking.jpg',
    productCount: 52,
    featured: true,
    subcategories: [
      { id: 'backpacks', name: 'Tas Carrier', slug: 'tas-carrier', description: 'Tas gunung dengan berbagai kapasitas', productCount: 25 },
      { id: 'hiking-boots', name: 'Sepatu Hiking', slug: 'sepatu-hiking', description: 'Sepatu ringan untuk hiking harian', productCount: 15 },
      { id: 'trekking-poles', name: 'Tongkat Hiking', slug: 'tongkat-hiking', description: 'Tongkat pendukung untuk trekking', productCount: 12 }
    ]
  },
  {
    id: 'apparel',
    name: 'Pakaian Outdoor',
    slug: 'pakaian-outdoor',
    description: 'Pakaian dan aksesoris khusus untuk aktivitas outdoor',
    image: '/images/categories/apparel.jpg',
    productCount: 89,
    featured: true,
    subcategories: [
      { id: 'jackets', name: 'Jaket Outdoor', slug: 'jaket-outdoor', description: 'Jaket tahan cuaca dan angin', productCount: 30 },
      { id: 'pants', name: 'Celana Outdoor', slug: 'celana-outdoor', description: 'Celana hiking dan climbing', productCount: 25 },
      { id: 'base-layers', name: 'Base Layer', slug: 'base-layer', description: 'Pakaian dalam untuk regulasi suhu', productCount: 20 },
      { id: 'accessories', name: 'Aksesoris', slug: 'aksesoris', description: 'Topi, sarung tangan, dan aksesoris lain', productCount: 14 }
    ]
  }
]

// Sample products data
export const products: Product[] = [
  {
    id: 'carrier-60l-pro',
    name: 'Tas Carrier 60L Pro Mountain Series',
    slug: 'tas-carrier-60l-pro-mountain-series',
    description: 'Tas carrier premium dengan kapasitas 60L yang dirancang khusus untuk pendakian multi-hari di pegunungan Indonesia. Dilengkapi dengan rain cover, kompartemen terpisah, dan sistem back panel yang ergonomis untuk kenyamanan maksimal.',
    shortDescription: 'Tas carrier 60L premium dengan rain cover dan sistem ergonomis',
    category: 'hiking',
    subcategory: 'backpacks',
    brand: 'Eiger',
    sku: 'EGR-60L-PRO-001',
    price: 850000,
    originalPrice: 950000,
    discount: 10,
    images: [
      { id: '1', url: '/images/products/carrier-60l-1.jpg', alt: 'Tas Carrier 60L tampak depan', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/carrier-60l-2.jpg', alt: 'Tas Carrier 60L tampak belakang', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/carrier-60l-3.jpg', alt: 'Detail kompartemen', isPrimary: false, order: 3 }
    ],
    variants: {
      color: [
        { id: 'red', name: 'Merah Gunung', value: '#CC0000', priceAdjustment: 0, stock: 15, sku: 'EGR-60L-RED' },
        { id: 'black', name: 'Hitam Klasik', value: '#000000', priceAdjustment: 0, stock: 12, sku: 'EGR-60L-BLK' },
        { id: 'navy', name: 'Biru Navy', value: '#003366', priceAdjustment: 0, stock: 8, sku: 'EGR-60L-NAV' }
      ]
    },
    specifications: [
      { name: 'Kapasitas', value: '60', unit: 'L' },
      { name: 'Material', value: 'Nylon Ripstop 420D' },
      { name: 'Berat', value: '2.1', unit: 'kg' },
      { name: 'Dimensi', value: '70 x 35 x 25', unit: 'cm' },
      { name: 'Rain Cover', value: 'Ya' },
      { name: 'Kompartemen', value: '3 + 2 saku samping' }
    ],
    features: [
      'Rain cover terintegrasi',
      'Sistem back panel ergonomis',
      'Kompartemen sleeping bag terpisah',
      'Attachment point untuk trekking pole',
      'Compression straps',
      'Chest dan hip belt yang dapat disesuaikan'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 35,
    weight: 2.1,
    dimensions: { length: 70, width: 35, height: 25 },
    tags: ['hiking', 'carrier', 'mountain', 'raincover', 'ergonomis'],
    reviews: [],
    rating: 4.7,
    reviewCount: 89,
    soldCount: 234,
    wishlistCount: 67,
    isNewProduct: false,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  },
  {
    id: 'tenda-ultralight-2p',
    name: 'Tenda Ultralight 2 Person Mountain Dome',
    slug: 'tenda-ultralight-2-person-mountain-dome',
    description: 'Tenda ultralight untuk 2 orang yang sempurna untuk pendakian dan camping di pegunungan Indonesia. Bobot hanya 2.3kg dengan konstruksi double wall dan flysheet waterproof 3000mm. Mudah dipasang dan tahan angin kencang.',
    shortDescription: 'Tenda ultralight 2P dengan waterproof 3000mm dan tahan angin',
    category: 'camping',
    subcategory: 'tents',
    brand: 'Consina',
    sku: 'CSN-TENT-UL2P-001',
    price: 1250000,
    originalPrice: 1350000,
    discount: 7,
    images: [
      { id: '1', url: '/images/products/tent-ultralight-1.jpg', alt: 'Tenda Ultralight tampak depan', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/tent-ultralight-2.jpg', alt: 'Interior tenda', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/tent-ultralight-3.jpg', alt: 'Setup di gunung', isPrimary: false, order: 3 }
    ],
    variants: {
      color: [
        { id: 'orange', name: 'Orange Safety', value: '#FF6600', priceAdjustment: 0, stock: 20, sku: 'CSN-TENT-ORG' },
        { id: 'green', name: 'Hijau Hutan', value: '#006600', priceAdjustment: 0, stock: 15, sku: 'CSN-TENT-GRN' }
      ]
    },
    specifications: [
      { name: 'Kapasitas', value: '2', unit: 'orang' },
      { name: 'Berat', value: '2.3', unit: 'kg' },
      { name: 'Material Flysheet', value: 'Polyester 75D' },
      { name: 'Waterproof', value: '3000', unit: 'mm' },
      { name: 'Tinggi Interior', value: '110', unit: 'cm' },
      { name: 'Setup Time', value: '5', unit: 'menit' }
    ],
    features: [
      'Double wall construction',
      'Flysheet waterproof 3000mm',
      'Ventilasi ganda anti kondensasi',
      'Tali guy-line reflektif',
      'Peg aluminium ringan',
      'Vestibule untuk gear storage'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 35,
    weight: 2.3,
    dimensions: { length: 220, width: 130, height: 110 },
    tags: ['camping', 'tenda', 'ultralight', 'waterproof', '2person'],
    reviews: [],
    rating: 4.8,
    reviewCount: 156,
    soldCount: 189,
    wishlistCount: 94,
    isNewProduct: false,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z'
  },
  {
    id: 'gps-handheld-pro',
    name: 'GPS Handheld Professional Navigator',
    slug: 'gps-handheld-professional-navigator',
    description: 'GPS handheld profesional dengan akurasi tinggi untuk navigasi outdoor di Indonesia. Dilengkapi peta topografi Indonesia, kompas elektronik, altimeter barometrik, dan baterai tahan hingga 20 jam. Tahan air IPX7.',
    shortDescription: 'GPS handheld dengan peta Indonesia, kompas, dan altimeter',
    category: 'hiking',
    subcategory: 'navigation',
    brand: 'Garmin',
    sku: 'GRM-GPS-PRO-001',
    price: 2100000,
    images: [
      { id: '1', url: '/images/products/gps-handheld-1.jpg', alt: 'GPS Handheld tampak depan', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/gps-handheld-2.jpg', alt: 'Display GPS', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/gps-handheld-3.jpg', alt: 'GPS di lapangan', isPrimary: false, order: 3 }
    ],
    variants: {},
    specifications: [
      { name: 'Display', value: '2.6 inch sunlight-readable' },
      { name: 'Battery Life', value: '20', unit: 'jam' },
      { name: 'Water Rating', value: 'IPX7' },
      { name: 'Memory', value: '8', unit: 'GB' },
      { name: 'Satelit', value: 'GPS + GLONASS' },
      { name: 'Akurasi', value: '3', unit: 'm' }
    ],
    features: [
      'Peta topografi Indonesia preload',
      'Kompas elektronik 3-axis',
      'Altimeter barometrik',
      'Geocaching support',
      'Waypoint unlimited',
      'Track recording',
      'Tahan air IPX7'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 25,
    weight: 0.23,
    dimensions: { length: 6.1, width: 16, height: 3.6 },
    tags: ['gps', 'navigasi', 'kompas', 'altimeter', 'waterproof'],
    reviews: [],
    rating: 4.9,
    reviewCount: 78,
    soldCount: 145,
    wishlistCount: 123,
    isNewProduct: true,
    isFeatured: true,
    isOnSale: false,
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  },
  {
    id: 'jaket-softshell-windproof',
    name: 'Jaket Softshell Windproof Mountain Pro',
    slug: 'jaket-softshell-windproof-mountain-pro',
    description: 'Jaket softshell premium dengan teknologi windproof dan water-resistant untuk aktivitas outdoor di segala cuaca. Material stretch memberikan kebebasan bergerak maksimal. Dilengkapi dengan hoodie adjustable dan multiple pockets.',
    shortDescription: 'Jaket softshell windproof dengan hoodie dan multiple pockets',
    category: 'apparel',
    subcategory: 'jackets',
    brand: 'The North Face',
    sku: 'TNF-SOFT-WIND-001',
    price: 1450000,
    originalPrice: 1650000,
    discount: 12,
    images: [
      { id: '1', url: '/images/products/jacket-softshell-1.jpg', alt: 'Jaket Softshell tampak depan', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/jacket-softshell-2.jpg', alt: 'Detail hood', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/jacket-softshell-3.jpg', alt: 'Model menggunakan jaket', isPrimary: false, order: 3 }
    ],
    variants: {
      size: [
        { id: 's', name: 'S', value: 'Small', priceAdjustment: 0, stock: 10, sku: 'TNF-SOFT-S' },
        { id: 'm', name: 'M', value: 'Medium', priceAdjustment: 0, stock: 15, sku: 'TNF-SOFT-M' },
        { id: 'l', name: 'L', value: 'Large', priceAdjustment: 0, stock: 12, sku: 'TNF-SOFT-L' },
        { id: 'xl', name: 'XL', value: 'Extra Large', priceAdjustment: 0, stock: 8, sku: 'TNF-SOFT-XL' }
      ],
      color: [
        { id: 'black', name: 'Hitam', value: '#000000', priceAdjustment: 0, stock: 20, sku: 'TNF-SOFT-BLK' },
        { id: 'navy', name: 'Navy', value: '#003366', priceAdjustment: 0, stock: 15, sku: 'TNF-SOFT-NAV' },
        { id: 'grey', name: 'Abu-abu', value: '#666666', priceAdjustment: 0, stock: 10, sku: 'TNF-SOFT-GRY' }
      ]
    },
    specifications: [
      { name: 'Material', value: 'Polyester Stretch Softshell' },
      { name: 'Windproof', value: 'Ya' },
      { name: 'Water Resistant', value: 'DWR Coating' },
      { name: 'Breathability', value: 'Tinggi' },
      { name: 'Pockets', value: '4 (2 hand, 2 chest)' },
      { name: 'Hood', value: 'Adjustable' }
    ],
    features: [
      'Material softshell stretch',
      'Windproof dan water-resistant',
      'Hood dengan adjuster',
      '4 pockets dengan zipper',
      'Elastic cuff dan hem',
      'Reflective details',
      'YKK zipper'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 45,
    weight: 0.65,
    dimensions: { length: 70, width: 55, height: 5 },
    tags: ['jaket', 'softshell', 'windproof', 'hiking', 'outdoor'],
    reviews: [],
    rating: 4.6,
    reviewCount: 203,
    soldCount: 567,
    wishlistCount: 189,
    isNewProduct: false,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-08-30T00:00:00Z'
  },
  {
    id: 'sepatu-hiking-waterproof',
    name: 'Sepatu Hiking Waterproof Trail Master',
    slug: 'sepatu-hiking-waterproof-trail-master',
    description: 'Sepatu hiking waterproof dengan teknologi Gore-Tex untuk perlindungan maksimal di medan Indonesia yang basah dan berlumpur. Sol Vibram memberikan traksi superior di berbagai permukaan. Ankle support dan cushioning untuk kenyamanan sepanjang hari.',
    shortDescription: 'Sepatu hiking waterproof Gore-Tex dengan sol Vibram',
    category: 'hiking',
    subcategory: 'hiking-boots',
    brand: 'Salomon',
    sku: 'SLM-HIKE-WP-001',
    price: 1850000,
    images: [
      { id: '1', url: '/images/products/shoes-hiking-1.jpg', alt: 'Sepatu Hiking tampak samping', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/shoes-hiking-2.jpg', alt: 'Sol sepatu detail', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/shoes-hiking-3.jpg', alt: 'Sepatu di jalur hiking', isPrimary: false, order: 3 }
    ],
    variants: {
      size: [
        { id: '39', name: '39', value: '39', priceAdjustment: 0, stock: 5, sku: 'SLM-HIKE-39' },
        { id: '40', name: '40', value: '40', priceAdjustment: 0, stock: 8, sku: 'SLM-HIKE-40' },
        { id: '41', name: '41', value: '41', priceAdjustment: 0, stock: 10, sku: 'SLM-HIKE-41' },
        { id: '42', name: '42', value: '42', priceAdjustment: 0, stock: 12, sku: 'SLM-HIKE-42' },
        { id: '43', name: '43', value: '43', priceAdjustment: 0, stock: 8, sku: 'SLM-HIKE-43' },
        { id: '44', name: '44', value: '44', priceAdjustment: 0, stock: 6, sku: 'SLM-HIKE-44' }
      ]
    },
    specifications: [
      { name: 'Material Upper', value: 'Synthetic + Mesh' },
      { name: 'Waterproof', value: 'Gore-Tex' },
      { name: 'Sole', value: 'Vibram Contagrip' },
      { name: 'Drop', value: '11', unit: 'mm' },
      { name: 'Weight', value: '380', unit: 'g per shoe' },
      { name: 'Support', value: 'Mid ankle' }
    ],
    features: [
      'Gore-Tex waterproof membrane',
      'Vibram Contagrip outsole',
      'SensiFit construction',
      'Protective toe cap',
      'Ankle support',
      'Quick lacing system',
      'Cushioned midsole'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 49,
    weight: 0.76,
    dimensions: { length: 30, width: 12, height: 15 },
    tags: ['sepatu', 'hiking', 'waterproof', 'goretex', 'vibram'],
    reviews: [],
    rating: 4.8,
    reviewCount: 267,
    soldCount: 423,
    wishlistCount: 156,
    isNewProduct: false,
    isFeatured: true,
    isOnSale: false,
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-08-25T00:00:00Z'
  },
  {
    id: 'sleeping-bag-mummy-down',
    name: 'Sleeping Bag Mummy Down -5°C Alpine Series',
    slug: 'sleeping-bag-mummy-down-alpine-series',
    description: 'Sleeping bag mummy dengan insulation down 650+ fill power untuk suhu ekstrem hingga -5°C. Cocok untuk pendakian gunung tinggi di Indonesia seperti Semeru, Rinjani, dan Kerinci. Ultra compact dan ringan dengan compression sack.',
    shortDescription: 'Sleeping bag down -5°C dengan compression sack',
    category: 'camping',
    subcategory: 'sleeping-bags',
    brand: 'Deuter',
    sku: 'DTR-SB-DOWN-001',
    price: 2250000,
    originalPrice: 2450000,
    discount: 8,
    images: [
      { id: '1', url: '/images/products/sleeping-bag-1.jpg', alt: 'Sleeping bag tampak keseluruhan', isPrimary: true, order: 1 },
      { id: '2', url: '/images/products/sleeping-bag-2.jpg', alt: 'Detail zipper dan hood', isPrimary: false, order: 2 },
      { id: '3', url: '/images/products/sleeping-bag-3.jpg', alt: 'Compression sack', isPrimary: false, order: 3 }
    ],
    variants: {
      size: [
        { id: 'regular', name: 'Regular (185cm)', value: 'Regular', priceAdjustment: 0, stock: 15, sku: 'DTR-SB-REG' },
        { id: 'long', name: 'Long (195cm)', value: 'Long', priceAdjustment: 100000, stock: 10, sku: 'DTR-SB-LNG' }
      ]
    },
    specifications: [
      { name: 'Temperature Rating', value: '-5', unit: '°C' },
      { name: 'Fill Power', value: '650+', unit: 'cuin' },
      { name: 'Total Weight', value: '1.2', unit: 'kg' },
      { name: 'Packed Size', value: '25 x 15', unit: 'cm' },
      { name: 'Shell Material', value: 'Nylon 20D' },
      { name: 'Lining', value: 'Nylon 20D' }
    ],
    features: [
      'Down insulation 650+ fill power',
      'Mummy shape untuk efisiensi termal',
      'Hood dengan drawcord',
      'Two-way zipper YKK',
      'Compression sack included',
      'Anti-snag zipper tape',
      'Internal pocket'
    ],
    condition: 'new',
    availability: 'in-stock',
    stock: 25,
    weight: 1.2,
    dimensions: { length: 220, width: 80, height: 20 },
    tags: ['sleeping-bag', 'down', 'mummy', 'extreme', 'alpine'],
    reviews: [],
    rating: 4.9,
    reviewCount: 95,
    soldCount: 178,
    wishlistCount: 234,
    isNewProduct: true,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  }
]

// Helper functions
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(product => product.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured)
}

export function getNewProducts(): Product[] {
  return products.filter(product => product.isNewProduct)
}

export function getOnSaleProducts(): Product[] {
  return products.filter(product => product.isOnSale)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}