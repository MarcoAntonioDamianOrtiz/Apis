<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const productsStore = useProductsStore()
const authStore = useAuthStore()
const router = useRouter()
const showCart = ref(false)

onMounted(() => {
  productsStore.loadProducts()
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const getSourceColor = (source: string) => {
  const colors: Record<string, string> = {
    'Legacy API': 'amber',
    'Modern E-commerce': 'blue',
    'REST API': 'green'
  }
  return colors[source] || 'gray'
}
</script>

<template>
  <div class="products-container">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <img src="@/assets/logo.svg" alt="Logo" class="header-logo" />
          <div>
            <h1 class="header-title">Sistema de Productos</h1>
            <p class="header-subtitle">Patrón Adapter Multi-API</p>
          </div>
        </div>

        <div class="header-right">
          <div class="user-info">
            <img
              v-if="authStore.userPhoto"
              :src="authStore.userPhoto"
              :alt="authStore.userName"
              class="user-avatar"
            />
            <div class="user-details">
              <p class="user-name">{{ authStore.userName }}</p>
              <p class="user-email">{{ authStore.userEmail }}</p>
            </div>
          </div>

          <button @click="handleLogout" class="logout-button">
            Cerrar sesión
          </button>

          <button @click="showCart = !showCart" class="cart-button">
            <svg
              class="cart-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="cart-count" v-if="productsStore.cartCount > 0">
              {{ productsStore.cartCount }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- API Sources Info -->
    <div class="api-sources">
      <div class="source-card amber">
        <div class="source-icon">📦</div>
        <div>
          <h3>Legacy API</h3>
          <p>Sistema antiguo adaptado</p>
        </div>
      </div>
      <div class="source-card blue">
        <div class="source-icon">🌐</div>
        <div>
          <h3>E-commerce API</h3>
          <p>API moderna anidada</p>
        </div>
      </div>
      <div class="source-card green">
        <div class="source-icon">⚡</div>
        <div>
          <h3>REST API</h3>
          <p>Servicio RESTful</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <span class="filter-label">Categoría:</span>
      <button
        v-for="category in productsStore.categories"
        :key="category"
        @click="productsStore.setCategory(category)"
        :class="[
          'filter-button',
          { active: productsStore.selectedCategory === category }
        ]"
      >
        {{ category === 'all' ? 'Todas' : category }}
      </button>
    </div>

    <!-- Products Grid -->
    <div class="products-grid" v-if="!productsStore.loading">
      <div
        v-for="product in productsStore.filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <span :class="['product-source', getSourceColor(product.source)]">
            {{ product.source }}
          </span>
        </div>

        <div class="product-details">
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-description">{{ product.description }}</p>

          <div class="product-footer">
            <div class="product-price">${{ product.price.toFixed(2) }}</div>
            <div class="product-stock">
              <span v-if="product.stock > 0" class="stock-available">
                ✓ {{ product.stock }} disponibles
              </span>
              <span v-else class="stock-unavailable">✗ Sin stock</span>
            </div>
          </div>

          <div class="product-meta">
            <span class="product-category">{{ product.category }}</span>
            <span class="product-id">ID: {{ product.id }}</span>
          </div>

          <button
            @click="productsStore.addToCart(product)"
            :disabled="product.stock === 0"
            class="add-to-cart-button"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </div>

    <!-- Cart Sidebar -->
    <div v-if="showCart" class="cart-sidebar">
      <div class="cart-header">
        <h2>Carrito de Compras</h2>
        <button @click="showCart = false" class="close-button">✕</button>
      </div>

      <div v-if="productsStore.cart.length === 0" class="cart-empty">
        <p>El carrito está vacío</p>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div
            v-for="(item, index) in productsStore.cart"
            :key="index"
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="cart-item-image" />
            <div class="cart-item-details">
              <p class="cart-item-name">{{ item.name }}</p>
              <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
            </div>
            <button
              @click="productsStore.removeFromCart(index)"
              class="remove-item-button"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span class="total-amount">
              ${{ productsStore.cartTotal.toFixed(2) }}
            </span>
          </div>
          <button class="checkout-button">Proceder al Pago</button>
          <button @click="productsStore.clearCart()" class="clear-cart-button">
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>

    <div v-if="showCart" class="cart-overlay" @click="showCart = false"></div>
  </div>
</template>

<style scoped>
.products-container {
  min-height: 100vh;
  background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
  padding-bottom: 2rem;
}

.header {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-logo {
  width: 50px;
  height: 50px;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.header-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.user-details {
  display: none;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.user-email {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
}

.logout-button {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.875rem;
}

.logout-button:hover {
  background: #dc2626;
}

.cart-button {
  position: relative;
  padding: 0.5rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button:hover {
  background: #059669;
}

.cart-icon {
  width: 24px;
  height: 24px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
}

.api-sources {
  max-width: 1280px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.source-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-left: 4px solid;
}

.source-card.amber {
  border-color: #f59e0b;
}

.source-card.blue {
  border-color: #3b82f6;
}

.source-card.green {
  border-color: #10b981;
}

.source-icon {
  font-size: 2rem;
}

.source-card h3 {
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.source-card p {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.filters {
  max-width: 1280px;
  margin: 0 auto 2rem;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-label {
  font-weight: 600;
  color: #1f2937;
}

.filter-button {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background: #e5e7eb;
}

.filter-button.active {
  background: #4f46e5;
  color: white;
}

.products-grid {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f3f4f6;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-source {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

.product-source.amber {
  background: #f59e0b;
}

.product-source.blue {
  background: #3b82f6;
}

.product-source.green {
  background: #10b981;
}

.product-details {
  padding: 1.25rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem;
  line-height: 1.3;
}

.product-description {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0 0 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
}

.product-stock {
  font-size: 0.875rem;
}

.stock-available {
  color: #10b981;
  font-weight: 500;
}

.stock-unavailable {
  color: #ef4444;
  font-weight: 500;
}

.product-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.product-category,
.product-id {
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
}

.add-to-cart-button {
  width: 100%;
  padding: 0.75rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.875rem;
}

.add-to-cart-button:hover:not(:disabled) {
  background: #4338ca;
}

.add-to-cart-button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  opacity: 0.6;
}

.loading {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.cart-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.close-button {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.close-button:hover {
  color: #1f2937;
  background: #f3f4f6;
}

.cart-empty {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 1rem;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  align-items: center;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.cart-item-details {
  flex: 1;
  min-width: 0;
}

.cart-item-name {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: #1f2937;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-item-price {
  font-size: 1rem;
  font-weight: 700;
  color: #10b981;
  margin: 0;
}

.remove-item-button {
  width: 28px;
  height: 28px;
  background: #fee2e2;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-item-button:hover {
  background: #ef4444;
  color: white;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 2px solid #e5e7eb;
  background: #f9fafb;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2937;
}

.total-amount {
  font-size: 1.75rem;
  color: #10b981;
}

.checkout-button {
  width: 100%;
  padding: 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 0.5rem;
}

.checkout-button:hover {
  background: #059669;
}

.clear-cart-button {
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: #ef4444;
  border: 2px solid #ef4444;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.clear-cart-button:hover {
  background: #ef4444;
  color: white;
}

.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (min-width: 768px) {
  .user-details {
    display: block;
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .cart-sidebar {
    max-width: 100%;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
  }

  .header-left {
    justify-content: center;
  }

  .header-right {
    justify-content: space-between;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .api-sources {
    grid-template-columns: 1fr;
  }
}
</style>
