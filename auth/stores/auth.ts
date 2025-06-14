import { defineStore } from 'pinia'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref('')
  
  const { $auth } = useNuxtApp()

  const initAuth = () => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      return Promise.resolve(null)
    }
    
    return new Promise((resolve) => {
      onAuthStateChanged($auth, (authUser) => {
        user.value = authUser
        resolve(authUser)
      })
    })
  }

  const clearError = () => {
    error.value = ''
  }

  const signIn = async (email: string, password: string) => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      throw new Error('Firebase not configured')
    }
    
    try {
      loading.value = true
      error.value = ''
      await signInWithEmailAndPassword($auth, email, password)
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      throw err
    } finally {
      loading.value = false
    }
  }

  const signUp = async (email: string, password: string) => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      throw new Error('Firebase not configured')
    }
    
    try {
      loading.value = true
      error.value = ''
      await createUserWithEmailAndPassword($auth, email, password)
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      throw err
    } finally {
      loading.value = false
    }
  }

  const signInWithGoogle = async () => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      throw new Error('Firebase not configured')
    }
    
    try {
      loading.value = true
      error.value = ''
      const provider = new GoogleAuthProvider()
      await signInWithPopup($auth, provider)
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        error.value = getErrorMessage(err.code)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const signInWithGithub = async () => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      throw new Error('Firebase not configured')
    }
    
    try {
      loading.value = true
      error.value = ''
      const provider = new GithubAuthProvider()
      await signInWithPopup($auth, provider)
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        error.value = getErrorMessage(err.code)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (email: string) => {
    if (!$auth) {
      error.value = 'Firebase Auth is not initialized'
      throw new Error('Firebase not configured')
    }
    
    try {
      loading.value = true
      error.value = ''
      await sendPasswordResetEmail($auth, email)
    } catch (err: any) {
      error.value = getErrorMessage(err.code)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    if (!$auth) return
    
    try {
      await signOut($auth)
      user.value = null
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  const getErrorMessage = (code: string) => {
    const messages: Record<string, string> = {
      'auth/user-not-found': 'Email tidak terdaftar. Silakan daftar terlebih dahulu.',
      'auth/wrong-password': 'Password salah. Periksa kembali password Anda.',
      'auth/email-already-in-use': 'Email sudah terdaftar. Gunakan email lain atau masuk dengan akun ini.',
      'auth/weak-password': 'Password terlalu lemah. Minimal 6 karakter.',
      'auth/invalid-email': 'Format email tidak valid.',
      'auth/invalid-credential': 'Email atau password salah.',
      'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
      'auth/popup-closed-by-user': 'Login dibatalkan',
      'auth/cancelled-popup-request': 'Popup dibatalkan',
      'auth/popup-blocked': 'Popup diblokir browser. Izinkan popup untuk melanjutkan.',
      'auth/network-request-failed': 'Koneksi bermasalah. Periksa internet Anda.'
    }
    return messages[code] || 'Terjadi kesalahan, silakan coba lagi'
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    initAuth,
    clearError,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,
    logout
  }
})
