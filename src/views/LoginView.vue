<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  const success = await authStore.loginWithGoogle()
  if (success) {
    router.push('/products')
  }
  isLoading.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
      <div class="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse" style="animation-delay: 1s"></div>
    </div>

    <!-- Login Card -->
    <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-12 animate-slide-up">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Bienvenido</h1>
        <p class="text-gray-600">Sistema de Productos Multi-API</p>
      </div>

      <!-- Features -->
      <div class="space-y-4 mb-8">
        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Patrón Adapter</h3>
            <p class="text-sm text-gray-600">Integración de 3 APIs diferentes</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Tiempo Real</h3>
            <p class="text-sm text-gray-600">Sincronización automática</p>
          </div>
        </div>

        <div class="flex items-start space-x-3">
          <div class="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">Seguridad</h3>
            <p class="text-sm text-gray-600">Autenticación con Google</p>
          </div>
        </div>
      </div>

      <!-- Login Button -->
      <button
        @click="handleLogin"
        :disabled="isLoading || authStore.loading"
        class="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-3 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <svg v-if="!isLoading && !authStore.loading" class="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <div v-else class="w-6 h-6 border-3 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        <span class="text-base">{{ (isLoading || authStore.loading) ? 'Iniciando sesión...' : 'Continuar con Google' }}</span>
      </button>

      <!-- Error Message -->
      <div v-if="authStore.error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
        <p class="text-sm text-red-600 text-center">{{ authStore.error }}</p>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>Al iniciar sesión, aceptas nuestros</p>
        <p class="mt-1">
          <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">Términos de Servicio</a>
          y
          <a href="#" class="text-indigo-600 hover:text-indigo-700 font-medium">Política de Privacidad</a>
        </p>
      </div>
    </div>

    <!-- Bottom Info -->
    <div class="absolute bottom-8 left-0 right-0 text-center">
      <p class="text-white text-sm font-medium opacity-90">
        Desarrollado con Vue 3 + TypeScript + Firebase
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
