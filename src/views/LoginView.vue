<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const authStore = useAuthStore()
const router = useRouter()
const showCart = ref(false)
const showUserMenu = ref(false)

onMounted(() => {
  productsStore.loadProducts()
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const getSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    'Legacy API': 'bg-amber-500',
    'Modern E-commerce': 'bg-blue-500',
    'REST API': 'bg-green-500'
  }
  return colors[source] || 'bg-gray-500'
}

const getSourceBorderColor = (source: string) => {
  const colors: Record<string, string> = {
    'Legacy API': 'border-amber-500',
    'Modern E-commerce': 'border-blue-500',
    'REST API': 'border-green-500'
  }
  return colors[source] || 'border-gray-500'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo y Título -->
          <div class="flex items-center space-x-4">
            <svg class="w-10 h-10 text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-gray-900">Sistema de Productos</h1>
              <p class="text-xs text-gray-500">Patrón Adapter Multi-API</p>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex items-center space-x-3">
            <!-- Botón Carrito -->
            <button
              @click="showCart = !showCart"
              class="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span
                v-if="productsStore.cartCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {{ productsStore.cartCount }}
              </span>
            </button>

            <!-- Usuario -->
            <div class="relative">
              <button
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img
                  v-if="authStore.userPhoto"
                  :src="authStore.userPhoto"
                  :alt="authStore.userName"
                  class="w-8 h-8 rounded-full border-2 border-primary-500"
                />
                <div v-else class="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
                  {{ authStore.userName.charAt(0).toUpperCase() }}
                </div>
                <span class="hidden md:block text-sm font-medium text-gray-700">{{ authStore.userName }}</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- Menú Usuario -->
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fade-in"
              >
                <div class="px-4 py-3 border-b border-gray-200">
                  <p class="text-sm font-semibold text-gray-900">{{ authStore.userName }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ authStore.userEmail }}</p>
                </div>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- API Sources Info -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">📦</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">Legacy API</h3>
              <p class="text-sm text-gray-500">Sistema antiguo adaptado</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">🌐</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">E-commerce API</h3>
              <p class="text-sm text-gray-500">API moderna anidada</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">⚡</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-900">REST API</h3>
              <p class="text-sm text-gray-500">Servicio RESTful</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <div class="bg-white rounded-xl shadow-md p-4 flex flex-wrap items-center gap-3">
        <span class="text-sm font-semibold text-gray-700">Categoría:</span>
        <button
          v-for="category in productsStore.categories"
          :key="category"
          @click="productsStore.setCategory(category)"
          :class="[
            'px-4 py-2 rounded-lg font-medium text-sm transition-all',
            productsStore.selectedCategory === category
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ category === 'all' ? 'Todas' : category }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="productsStore.loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col items-center justify-center">
        <div class="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p class="mt-4 text-gray-600 font-medium">Cargando productos...</p>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in productsStore.filteredProducts"
          :key="product.id"
          class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
        >
          <!-- Imagen -->
          <div class="relative h-48 overflow-hidden bg-gray-100">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            <span :class="['absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold text-white', getSourceColor(product.source)]">
              {{ product.source }}
            </span>
          </div>

          <!-- Contenido -->
          <div class="p-5 flex-1 flex flex-col">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
              {{ product.description }}
            </p>

            <!-- Precio y Stock -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-green-600">
                ${{ product.price.toFixed(2) }}
              </span>
              <div class="text-right">
                <span v-if="product.stock > 0" class="text-xs text-green-600 font-medium">
                  ✓ {{ product.stock }} disponibles
                </span>
                <span v-else class="text-xs text-red-600 font-medium">
                  ✗ Sin stock
                </span>
              </div>
            </div>

            <!-- Meta -->
            <div class="flex gap-2 mb-4 flex-wrap">
              <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                {{ product.category }}
              </span>
              <span class="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                ID: {{ product.id }}
              </span>
            </div>

            <!-- Botón -->
            <button
              @click="productsStore.addToCart(product)"
              :disabled="product.stock === 0"
              class="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-primary-600 text-white hover:bg-primary-700 active:scale-95"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Sidebar -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showCart"
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        @click="showCart = false"
      ></div>
    </transition>

    <transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div v-if="showCart" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-indigo-600">
          <h2 class="text-2xl font-bold text-white">Carrito</h2>
          <button
            @click="showCart = false"
            class="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Empty Cart -->
        <div v-if="productsStore.cart.length === 0" class="flex-1 flex flex-col items-center justify-center p-6">
          <svg class="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p class="text-gray-500 text-lg font-medium">El carrito está vacío</p>
          <p class="text-gray-400 text-sm mt-2">Agrega productos para continuar</p>
        </div>

        <!-- Cart Items -->
        <div v-else class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            v-for="(item, index) in productsStore.cart"
            :key="index"
            class="bg-gray-50 rounded-lg p-4 flex gap-4 hover:bg-gray-100 transition-colors"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-gray-900 truncate">{{ item.name }}</h4>
              <p class="text-lg font-bold text-green-600 mt-1">${{ item.price.toFixed(2) }}</p>
            </div>
            <button
              @click="productsStore.removeFromCart(index)"
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="productsStore.cart.length > 0" class="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
          <div class="flex items-center justify-between text-xl font-bold">
            <span class="text-gray-700">Total:</span>
            <span class="text-green-600">${{ productsStore.cartTotal.toFixed(2) }}</span>
          </div>
          <button class="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-lg">
            Proceder al Pago
          </button>
          <button
            @click="productsStore.clearCart()"
            class="w-full py-3 bg-white text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </transition>
  </div>

  <!-- Click outside to close menus -->
  <div
    v-if="showUserMenu"
    @click="showUserMenu = false"
    class="fixed inset-0 z-30"
  ></div>
</template>
