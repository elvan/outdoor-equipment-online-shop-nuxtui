# Puncak Adventura - Indonesian Outdoor Equipment E-commerce Platform

> **Complete e-commerce mockup for Indonesian outdoor recreation equipment company**

## 🏔️ Project Overview

This project is a comprehensive e-commerce platform mockup for **Puncak Adventura**, a fictional Indonesian company specializing in outdoor recreation equipment. The platform demonstrates a complete online shopping experience tailored specifically for the Indonesian market, featuring authentic local business practices, payment methods, and cultural context.

### Products & Categories
- **Mountaineering Equipment**: Climbing gear, ropes, harnesses, helmets
- **Camping Gear**: Tents, sleeping bags, portable stoves, lanterns  
- **Hiking Equipment**: Backpacks, hiking boots, trekking poles, water bottles
- **Outdoor Apparel**: Jackets, pants, base layers, gloves for outdoor activities
- **Rock Climbing Gear**: Carabiners, quickdraws, chalk bags, climbing shoes
- **General Accessories**: Multi-tools, first aid kits, navigation equipment

## 🚀 Current Implementation Status

### ✅ **Phase 1 & 2: Foundation & Core E-commerce** - COMPLETED
- **Product Catalog**: Full browsing with categories, search, and filtering
- **Product Details**: Image galleries, variant selection, reviews & ratings
- **Shopping Cart**: Persistent cart with quantity management and sidebar
- **Wishlist**: Favorites functionality with localStorage persistence
- **Reviews System**: Indonesian customer feedback with rating breakdown
- **Related Products**: Intelligent recommendation algorithm

### ✅ **Phase 4: Checkout & Payment** - COMPLETED  
- **4-Step Checkout Flow**: Shipping → Delivery → Payment → Review
- **Indonesian Address Forms**: Provinces, cities, postal codes
- **Local Shipping Carriers**: JNE, J&T, SiCepat with realistic pricing
- **Payment Methods**: GoPay, OVO, DANA, BCA, Mandiri, COD
- **Order Confirmation**: Success page with tracking and contact info

### 🟡 **Next Phase Options**
- **Phase 3**: Customer account features (profile, order history, addresses)
- **Phase 5**: Business management dashboard (analytics, inventory, orders)

## 🛠️ Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | 5.x | Type safety and enhanced development |
| **Vue.js** | 3.x | Reactive frontend framework with Composition API |
| **Nuxt** | 4.x | Full-stack Vue framework with SSR/SSG |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Nuxt UI** | 3.x | Component library optimized for Nuxt |

## 🏗️ Architecture & File Structure

```
app/
├── components/           # Reusable UI components
│   ├── AppHeader.vue    # Main navigation with cart integration
│   ├── AppFooter.vue    # Company info and payment methods
│   ├── ProductCard.vue  # Product grid display
│   ├── ProductReviews.vue # Review system with ratings
│   ├── CartSidebar.vue  # Sliding cart with overlay
│   ├── RelatedProducts.vue # Smart product recommendations
│   └── ...
├── composables/         # Vue composables for state management
│   ├── useCart.ts      # Shopping cart with localStorage
│   ├── useWishlist.ts  # Wishlist/favorites functionality
│   └── ...
├── pages/              # File-based routing
│   ├── index.vue       # Home page with featured products
│   ├── cart.vue        # Full cart management
│   ├── checkout.vue    # Multi-step checkout flow
│   └── products/       # Product catalog and details
├── layouts/            # Layout templates
│   └── default.vue     # Main layout with header/footer
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
│   └── indonesian.ts  # Indonesian formatting (IDR, dates)
└── data/              # Mock data
    └── products.ts    # Product catalog with Indonesian context
```

## 🇮🇩 Indonesian Market Context

### Business Information
- **Company**: Puncak Adventura (Mountain Adventure)
- **Headquarters**: Jakarta with distribution in Surabaya, Bandung
- **Target Market**: Indonesian outdoor enthusiasts and adventure communities
- **Founded**: 2018 (during Indonesia's outdoor recreation boom)

### Localization Features
- **Currency**: Indonesian Rupiah (IDR) with proper formatting (Rp 1.500.000)
- **Payment Methods**: GoPay, OVO, DANA, BCA, Mandiri, COD prominence
- **Shipping**: JNE, J&T Express, SiCepat (actual Indonesian carriers)
- **Addresses**: Indonesian provinces, cities, postal code formats
- **Phone Numbers**: +62 format with Indonesian mobile patterns
- **Customer Names**: Authentic Indonesian names (Ahmad, Sari, Budi, Maya)
- **Geographic Context**: References to Indonesian mountains (Semeru, Rinjani, Bromo)

### Cultural Integration
- WhatsApp business integration (popular in Indonesian e-commerce)
- Cash on Delivery (COD) prominence (preferred payment in Indonesia)
- Indonesian customer service patterns and expectations
- Local outdoor destinations and adventure context

## 💻 Development Setup

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd outdoor-equipment-online-shop-nuxtui

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development Server

```bash
# Start development server on http://localhost:3000
npm run dev
# or
yarn dev
# or
pnpm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically  
npm run lint:fix
```

## 🎯 Key Features Implemented

### Shopping Experience
- **🛒 Smart Shopping Cart**: Persistent cart with localStorage, quantity management
- **❤️ Wishlist System**: Save favorites with visual state management
- **⭐ Reviews & Ratings**: Indonesian customer feedback with 5-star ratings
- **🔍 Product Discovery**: Search, filtering, and intelligent recommendations
- **📱 Mobile-First Design**: Responsive layout optimized for Indonesian mobile usage

### Checkout & Payment
- **📋 4-Step Process**: Shipping → Delivery → Payment → Review
- **🚚 Indonesian Carriers**: JNE (Regular/YES), J&T, SiCepat with real pricing
- **💳 Local Payment Methods**: 12+ Indonesian payment options including e-wallets
- **📍 Address Management**: Indonesian province/city dropdowns with validation
- **🧾 Order Confirmation**: Detailed receipts with tracking information

### Technical Excellence
- **⚡ Performance**: Optimized components with lazy loading
- **🔒 Type Safety**: Full TypeScript implementation with strict mode
- **🎨 Consistent Design**: Tailwind CSS with custom Indonesian color scheme
- **♿ Accessibility**: WCAG 2.1 AA compliance considerations
- **📦 State Management**: Vue 3 Composition API with reactive composables

## 🧪 Mock Data & Testing

### Product Data
- **6 Featured Products**: Realistic outdoor equipment with Indonesian pricing
- **Complete Specifications**: Detailed product information, variants, stock levels
- **Customer Reviews**: Authentic Indonesian customer feedback and ratings
- **Pricing**: Market-appropriate IDR pricing (Rp 150K - Rp 2.5M range)

### Business Data
- **Indonesian Provinces & Cities**: Complete geographic data for address forms
- **Shipping Carriers**: Real Indonesian logistics companies with estimated costs
- **Payment Methods**: Comprehensive Indonesian payment ecosystem
- **Customer Personas**: Indonesian outdoor enthusiast profiles

## 🚨 Development Constraints

### Technical Limitations
- ❌ **No External APIs**: All data is static/mocked
- ❌ **No Real Authentication**: Demo purposes only
- ❌ **No Payment Processing**: UI mockup only
- ❌ **No Database**: LocalStorage for persistence
- ✅ **Pure Frontend Demo**: Focus on UI/UX showcase

### File Naming Standards
- Use kebab-case for all files (`product-card.vue`)
- Avoid special characters, spaces, parentheses
- Follow Vue.js component naming conventions
- TypeScript interfaces in PascalCase

## 📊 Business Metrics & Analytics

### E-commerce KPIs Demonstrated
- Product catalog conversion funnel
- Shopping cart abandonment scenarios  
- Payment method preferences (Indonesian context)
- Mobile vs desktop usage patterns
- Customer acquisition cost models

### Indonesian Market Insights
- Payment method preferences (e-wallet vs bank vs COD)
- Shipping preference patterns across Indonesian islands
- Seasonal outdoor equipment demand (dry vs rainy season)
- Regional preferences (Java vs outer islands)

## 🔮 Future Development Phases

### Phase 3: Customer Account Management
- User registration and profile management
- Order history with Indonesian date formatting
- Address book with multiple shipping addresses
- Loyalty points system (common in Indonesian e-commerce)

### Phase 5: Business Dashboard
- Sales analytics with Indonesian market insights
- Inventory management with Indonesian supplier context
- Customer service tools with WhatsApp integration
- Marketing campaign management

### Phase 7-9: Advanced Features
- Email marketing templates (Indonesian language)
- Social media integration (Instagram, TikTok popularity in Indonesia)
- Mobile app mockups (high mobile penetration in Indonesia)
- Advanced analytics and business intelligence

## 🤝 Contributing

This is a mockup project for demonstration purposes. For development contributions:

1. Follow existing code patterns and Indonesian context
2. Maintain TypeScript strict mode compliance
3. Use existing color scheme and design system
4. Add realistic Indonesian business context to new features
5. Test responsive design on multiple device sizes

## 📄 License

This project is a demonstration mockup created for portfolio/educational purposes.

## 📞 Contact & Support

For questions about this mockup implementation:
- Focus on authentic Indonesian e-commerce patterns
- Maintain mobile-first responsive design
- Follow established TypeScript and Vue.js best practices
- Reference real Indonesian business context and user behaviors

---

**Puncak Adventura** - Supporting Indonesian outdoor adventures with quality equipment and authentic e-commerce experience. 🏔️🇮🇩
