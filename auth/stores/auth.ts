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
      if (err.code !== 'auth/popup-closed-by-user') {
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
      if (err.code !== 'auth/popup-closed-by-user') {
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
      'auth/user-not-found': '❌ Email belum terdaftar. Silakan daftar terlebih dahulu atau periksa kembali email Anda.',
      'auth/wrong-password': '❌ Password salah. Periksa kembali password Anda atau gunakan fitur reset password.',
      'auth/invalid-credential': '❌ Email atau password tidak valid. Periksa kembali data login Anda.',
      'auth/email-already-in-use': '❌ Email sudah terdaftar. Silakan gunakan email lain atau login dengan email ini.',
      'auth/weak-password': '❌ Password terlalu lemah. Gunakan minimal 6 karakter dengan kombinasi huruf dan angka.',
      'auth/invalid-email': '❌ Format email tidak valid. Pastikan email Anda benar (contoh: nama@domain.com)',
      'auth/too-many-requests': '⏳ Terlalu banyak percobaan login. Silakan tunggu beberapa menit sebelum mencoba lagi.',
      'auth/network-request-failed': '🌐 Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.',
      'auth/popup-closed-by-user': '❌ Login dibatalkan. Silakan coba lagi untuk melanjutkan.',
      'auth/cancelled-popup-request': '❌ Popup login dibatalkan. Refresh halaman dan coba lagi.',
      'auth/popup-blocked': '🚫 Popup diblokir oleh browser. Izinkan popup untuk situs ini dan coba lagi.',
      'auth/account-exists-with-different-credential': '⚠️ Akun sudah ada dengan metode login berbeda. Coba login dengan email/password.',
      'auth/operation-not-allowed': '❌ Metode login ini tidak diizinkan. Hubungi administrator.',
      'auth/user-disabled': '🔒 Akun Anda telah dinonaktifkan. Hubungi administrator untuk bantuan.',
      'auth/requires-recent-login': '🔐 Silakan login ulang untuk melanjutkan operasi ini.'
    }
    return messages[code] || '❌ Terjadi kesalahan tidak terduga. Silakan coba lagi atau hubungi support.'
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    initAuth,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithGithub,
    resetPassword,
    logout
  }
})
