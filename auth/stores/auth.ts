import { defineStore } from 'pinia'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(true)
  const { $auth } = useNuxtApp()

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup($auth, googleProvider)
      user.value = result.user
      await navigateTo('/dashboard')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup($auth, githubProvider)
      user.value = result.user
      await navigateTo('/dashboard')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword($auth, email, password)
      user.value = result.user
      await navigateTo('/dashboard')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword($auth, email, password)
      user.value = result.user
      await navigateTo('/dashboard')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut($auth)
      user.value = null
      await navigateTo('/auth')
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const initAuth = () => {
    onAuthStateChanged($auth, (authUser) => {
      user.value = authUser
      loading.value = false
    })
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    signInWithGoogle,
    signInWithGithub,
    signInWithEmail,
    signUpWithEmail,
    logout,
    initAuth
  }
})
