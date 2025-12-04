<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleGoogleLogin = async () => {
  const success = await authStore.loginWithGoogle()
  if (success) {
    router.push('/products')
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <img
          src="@/assets/logo.svg"
          alt="Logo"
          class="login-logo"
        />
        <h1 class="login-title">Sistema de Productos</h1>
        <p class="login-subtitle">Patrón Adapter con Vue 3</p>
      </div>

      <div class="login-content">
        <p class="login-description">
          Inicia sesión para acceder al sistema de gestión de productos que integra
          múltiples fuentes de datos usando el patrón Adapter.
        </p>

        <button
          @click="handleGoogleLogin"
          :disabled="authStore.loading"
          class="google-button"
        >
          <svg
            class="google-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span v-if="!authStore.loading">Continuar con Google</span>
          <span v-else>Cargando...</span>
        </button>

        <p v-if="authStore.error" class="error-message">
          {{ authStore.error }}
        </p>
      </div>

      <div class="login-footer">
        <p class="footer-text">
          Al continuar, aceptas nuestros términos de servicio y política de privacidad
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.login-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
}

.login-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2.5rem 2rem;
  text-align: center;
  color: white;
}

.login-logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  filter: brightness(0) invert(1);
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 0.95rem;
  opacity: 0.9;
}

.login-content {
  padding: 2.5rem 2rem;
}

.login-description {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.google-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  background: white;
  border: 2px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #444;
  cursor: pointer;
  transition: all 0.2s;
}

.google-button:hover:not(:disabled) {
  background: #f8f8f8;
  border-color: #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.google-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.google-icon {
  width: 24px;
  height: 24px;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 0.5rem;
  color: #c33;
  font-size: 0.875rem;
  text-align: center;
}

.login-footer {
  padding: 1.5rem 2rem;
  background: #f8f8f8;
  border-top: 1px solid #eee;
}

.footer-text {
  text-align: center;
  font-size: 0.75rem;
  color: #999;
  line-height: 1.5;
}

@media (max-width: 480px) {
  .login-card {
    border-radius: 0;
  }

  .login-header {
    padding: 2rem 1.5rem;
  }

  .login-content {
    padding: 2rem 1.5rem;
  }
}
</style>
