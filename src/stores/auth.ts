import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { auth, googleProvider } from '@/config/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const userName = computed(() => user.value?.displayName || 'Usuario')
  const userEmail = computed(() => user.value?.email || '')
  const userPhoto = computed(() => user.value?.photoURL || '')

  // Inicializar el listener de autenticación
  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      loading.value = false
    })
  }

  // Login con Google
  const loginWithGoogle = async () => {
    try {
      loading.value = true
      error.value = null
      const result = await signInWithPopup(auth, googleProvider)
      user.value = result.user
      return true
    } catch (err: any) {
      error.value = err.message
      console.error('Error al iniciar sesión:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (err: any) {
      error.value = err.message
      console.error('Error al cerrar sesión:', err)
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    userName,
    userEmail,
    userPhoto,
    initAuth,
    loginWithGoogle,
    logout
  }
})
