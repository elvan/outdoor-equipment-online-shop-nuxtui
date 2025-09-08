<template>
  <footer class="bg-gray-900 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-lucide-mountain" class="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 class="text-lg font-bold">Puncak Adventura</h3>
              <p class="text-sm text-gray-300">Peralatan Outdoor Indonesia</p>
            </div>
          </div>
          <p class="text-sm text-gray-300 leading-relaxed">
            Toko peralatan outdoor terpercaya di Indonesia. Menyediakan perlengkapan berkualitas 
            untuk petualangan gunung, camping, hiking, dan aktivitas luar ruangan lainnya.
          </p>
          <div class="flex space-x-4">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-instagram"
              size="sm"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-facebook"
              size="sm"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-whatsapp"
              size="sm"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-simple-icons-youtube"
              size="sm"
            />
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Navigasi Cepat</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><NuxtLink to="/products" class="hover:text-emerald-400 transition-colors">Semua Produk</NuxtLink></li>
            <li><NuxtLink to="/categories/mountaineering" class="hover:text-emerald-400 transition-colors">Mountaineering</NuxtLink></li>
            <li><NuxtLink to="/categories/camping" class="hover:text-emerald-400 transition-colors">Camping</NuxtLink></li>
            <li><NuxtLink to="/categories/hiking" class="hover:text-emerald-400 transition-colors">Hiking</NuxtLink></li>
            <li><NuxtLink to="/categories/apparel" class="hover:text-emerald-400 transition-colors">Pakaian Outdoor</NuxtLink></li>
            <li><NuxtLink to="/adventure" class="hover:text-emerald-400 transition-colors">Panduan Petualangan</NuxtLink></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Layanan Pelanggan</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><NuxtLink to="/help" class="hover:text-emerald-400 transition-colors">Pusat Bantuan</NuxtLink></li>
            <li><NuxtLink to="/shipping" class="hover:text-emerald-400 transition-colors">Info Pengiriman</NuxtLink></li>
            <li><NuxtLink to="/returns" class="hover:text-emerald-400 transition-colors">Return & Refund</NuxtLink></li>
            <li><NuxtLink to="/size-guide" class="hover:text-emerald-400 transition-colors">Panduan Ukuran</NuxtLink></li>
            <li><NuxtLink to="/warranty" class="hover:text-emerald-400 transition-colors">Garansi Produk</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-emerald-400 transition-colors">Hubungi Kami</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold">Kontak</h4>
          <div class="space-y-3 text-sm text-gray-300">
            <div class="flex items-start space-x-3">
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 mt-0.5 text-emerald-400" />
              <div>
                <p>Jl. Cikutra No. 123</p>
                <p>Bandung, Jawa Barat 40124</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-emerald-400" />
              <p>+62 822 1234 5678</p>
            </div>
            <div class="flex items-center space-x-3">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-emerald-400" />
              <p>info@puncakadventura.co.id</p>
            </div>
            <div class="flex items-center space-x-3">
              <UIcon name="i-lucide-clock" class="w-4 h-4 text-emerald-400" />
              <div>
                <p>Senin - Sabtu: 08:00 - 20:00</p>
                <p>Minggu: 10:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div class="text-center md:text-left">
            <h5 class="text-sm font-semibold mb-2">Metode Pembayaran</h5>
            <div class="flex flex-wrap items-center gap-3">
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">GoPay</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">OVO</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">DANA</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">BCA</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">Mandiri</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">COD</div>
            </div>
          </div>
          <div class="text-center md:text-right">
            <h5 class="text-sm font-semibold mb-2">Pengiriman Via</h5>
            <div class="flex flex-wrap items-center gap-3 justify-center md:justify-end">
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">JNE</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">J&T</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">SiCepat</div>
              <div class="bg-white rounded px-2 py-1 text-xs text-gray-900 font-medium">AnterAja</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
        <p>&copy; 2024 Puncak Adventura. Hak Cipta Dilindungi. | Toko peralatan outdoor terpercaya di Indonesia.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component with Indonesian company information
</script>