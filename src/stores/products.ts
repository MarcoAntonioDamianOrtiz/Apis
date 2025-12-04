import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/adapters/types'
import { ProductServiceFacade } from '@/adapters/ProductAdapter'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const cart = ref<Product[]>([])
  const loading = ref(false)
  const selectedCategory = ref('all')

  const productFacade = new ProductServiceFacade()

  // Computed
  const categories = computed(() => {
    const cats = ['all', ...new Set(products.value.map(p => p.category))]
    return cats
  })

  const filteredProducts = computed(() => {
    if (selectedCategory.value === 'all') {
      return products.value
    }
    return products.value.filter(p => p.category === selectedCategory.value)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.price, 0)
  })

  const cartCount = computed(() => cart.value.length)

  // Actions
  const loadProducts = async () => {
    loading.value = true
    try {
      products.value = await productFacade.getAllProductsFromAllSources()
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      loading.value = false
    }
  }

  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const clearCart = () => {
    cart.value = []
  }

  const setCategory = (category: string) => {
    selectedCategory.value = category
  }

  return {
    products,
    cart,
    loading,
    selectedCategory,
    categories,
    filteredProducts,
    cartTotal,
    cartCount,
    loadProducts,
    addToCart,
    removeFromCart,
    clearCart,
    setCategory
  }
})
