/**
 * Utility functions for Indonesian formatting (currency, dates, addresses)
 */

/**
 * Format number as Indonesian Rupiah currency
 * @param amount - The amount to format
 * @returns Formatted IDR currency string
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Format number as Indonesian Rupiah with abbreviated format (K, Jt, M)
 * @param amount - The amount to format
 * @returns Abbreviated IDR currency string
 */
export function formatIDRShort(amount: number): string {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)}M`
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}Jt`
  } else if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}K`
  }
  return formatIDR(amount)
}

/**
 * Format date in Indonesian format
 * @param date - Date to format
 * @returns Indonesian formatted date string
 */
export function formatIndonesianDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj)
}

/**
 * Format date and time in Indonesian format
 * @param date - Date to format
 * @returns Indonesian formatted datetime string
 */
export function formatIndonesianDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  }).format(dateObj)
}

/**
 * Format phone number in Indonesian format
 * @param phone - Phone number to format
 * @returns Formatted Indonesian phone number
 */
export function formatIndonesianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  // Convert to +62 format if starts with 0
  const formatted = cleaned.startsWith('0') ? '62' + cleaned.slice(1) : cleaned
  
  // Add formatting
  if (formatted.startsWith('62')) {
    const number = formatted.slice(2)
    if (number.length >= 9) {
      return `+62 ${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7)}`
    }
  }
  
  return phone // Return original if formatting fails
}

/**
 * Indonesian postal code validation
 * @param postalCode - Postal code to validate
 * @returns True if valid Indonesian postal code
 */
export function validateIndonesianPostalCode(postalCode: string): boolean {
  return /^\d{5}$/.test(postalCode)
}

/**
 * Get Indonesian province list
 * @returns Array of Indonesian provinces
 */
export function getIndonesianProvinces(): string[] {
  return [
    'Aceh',
    'Sumatera Utara',
    'Sumatera Barat',
    'Riau',
    'Kepulauan Riau',
    'Jambi',
    'Sumatera Selatan',
    'Kepulauan Bangka Belitung',
    'Bengkulu',
    'Lampung',
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'DI Yogyakarta',
    'Jawa Timur',
    'Banten',
    'Bali',
    'Nusa Tenggara Barat',
    'Nusa Tenggara Timur',
    'Kalimantan Barat',
    'Kalimantan Tengah',
    'Kalimantan Selatan',
    'Kalimantan Timur',
    'Kalimantan Utara',
    'Sulawesi Utara',
    'Sulawesi Tengah',
    'Sulawesi Selatan',
    'Sulawesi Tenggara',
    'Gorontalo',
    'Sulawesi Barat',
    'Maluku',
    'Maluku Utara',
    'Papua',
    'Papua Barat'
  ]
}

/**
 * Get major Indonesian cities
 * @returns Array of major Indonesian cities with provinces
 */
export function getIndonesianCities(): Array<{ city: string; province: string; postalCode: string }> {
  return [
    { city: 'Jakarta', province: 'DKI Jakarta', postalCode: '10110' },
    { city: 'Bandung', province: 'Jawa Barat', postalCode: '40111' },
    { city: 'Surabaya', province: 'Jawa Timur', postalCode: '60111' },
    { city: 'Medan', province: 'Sumatera Utara', postalCode: '20111' },
    { city: 'Semarang', province: 'Jawa Tengah', postalCode: '50111' },
    { city: 'Makassar', province: 'Sulawesi Selatan', postalCode: '90111' },
    { city: 'Palembang', province: 'Sumatera Selatan', postalCode: '30111' },
    { city: 'Tangerang', province: 'Banten', postalCode: '15111' },
    { city: 'Bekasi', province: 'Jawa Barat', postalCode: '17111' },
    { city: 'Depok', province: 'Jawa Barat', postalCode: '16411' },
    { city: 'Yogyakarta', province: 'DI Yogyakarta', postalCode: '55111' },
    { city: 'Malang', province: 'Jawa Timur', postalCode: '65111' },
    { city: 'Bogor', province: 'Jawa Barat', postalCode: '16111' },
    { city: 'Batam', province: 'Kepulauan Riau', postalCode: '29411' },
    { city: 'Denpasar', province: 'Bali', postalCode: '80111' }
  ]
}

/**
 * Get Indonesian shipping carriers
 * @returns Array of Indonesian shipping carriers with info
 */
export function getIndonesianShippingCarriers(): Array<{ name: string; code: string; description: string }> {
  return [
    {
      name: 'JNE',
      code: 'jne',
      description: 'Jalur Nugraha Ekakurir - Jaringan pengiriman terluas'
    },
    {
      name: 'J&T Express',
      code: 'jnt',
      description: 'Pengiriman cepat dan terpercaya'
    },
    {
      name: 'SiCepat',
      code: 'sicepat',
      description: 'Pengiriman kilat dalam kota dan luar kota'
    },
    {
      name: 'AnterAja',
      code: 'anteraja',
      description: 'Solusi pengiriman modern'
    },
    {
      name: 'Pos Indonesia',
      code: 'pos',
      description: 'Layanan pos resmi pemerintah Indonesia'
    },
    {
      name: 'Ninja Express',
      code: 'ninja',
      description: 'Pengiriman ekspres untuk e-commerce'
    }
  ]
}

/**
 * Get Indonesian payment methods
 * @returns Array of popular Indonesian payment methods
 */
export function getIndonesianPaymentMethods(): Array<{ 
  name: string; 
  code: string; 
  type: 'ewallet' | 'bank' | 'cod' | 'card';
  description: string 
}> {
  return [
    {
      name: 'GoPay',
      code: 'gopay',
      type: 'ewallet',
      description: 'E-wallet dari Gojek'
    },
    {
      name: 'OVO',
      code: 'ovo',
      type: 'ewallet',
      description: 'E-wallet untuk berbagai kebutuhan'
    },
    {
      name: 'DANA',
      code: 'dana',
      type: 'ewallet',
      description: 'Dompet digital terpercaya'
    },
    {
      name: 'ShopeePay',
      code: 'shopeepay',
      type: 'ewallet',
      description: 'E-wallet dari Shopee'
    },
    {
      name: 'Bank BCA',
      code: 'bca',
      type: 'bank',
      description: 'Transfer bank BCA'
    },
    {
      name: 'Bank Mandiri',
      code: 'mandiri',
      type: 'bank',
      description: 'Transfer bank Mandiri'
    },
    {
      name: 'Bank BRI',
      code: 'bri',
      type: 'bank',
      description: 'Transfer bank BRI'
    },
    {
      name: 'Bank BNI',
      code: 'bni',
      type: 'bank',
      description: 'Transfer bank BNI'
    },
    {
      name: 'Cash on Delivery (COD)',
      code: 'cod',
      type: 'cod',
      description: 'Bayar di tempat saat barang tiba'
    }
  ]
}