<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#42b883]/20 via-purple-900/10 to-transparent animate-pulse-slow"></div>
    
    <div class="absolute inset-0 opacity-10">
      <div 
        v-for="i in 8" 
        :key="`shape-${i}`"
        class="absolute border border-[#42b883]/30 rounded-lg animate-float"
        :class="getShapeClasses(i)"
        :style="getShapeStyle(i)"
      ></div>
    </div>

    <div class="absolute inset-0">
      <div
        v-for="i in 30"
        :key="`particle-${i}`"
        class="absolute rounded-full animate-float-particle"
        :class="getParticleClasses(i)"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <div 
      class="absolute inset-0 bg-gradient-radial from-[#42b883]/5 via-transparent to-transparent"
      :style="{ transform: `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)` }"
    ></div>

    <div class="relative z-10 w-full max-w-md">
      <div class="glass rounded-2xl p-8 border border-white/10">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p class="text-gray-400">Sign in to continue</p>
        </div>

        <div class="space-y-4 mb-6">
          <button
            @click="signInWithGoogle"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <Icon name="logos:google-icon" class="w-5 h-5" />
            Continue with Google
          </button>

          <button
            @click="signInWithGithub"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <Icon name="logos:github-icon" class="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-600"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-gray-900 px-2 text-gray-400">Or continue with email</span>
          </div>
        </div>

        <form @submit.prevent="handleEmailAuth" class="space-y-4">
          <div>
            <input
              v-model="email"
              type="email"
              placeholder="Email address"
              required
              class="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] transition-colors"
            />
          </div>
          
          <div>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] transition-colors"
            />
          </div>

          <div class="space-y-3">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-[#42b883] text-white py-3 rounded-lg font-medium hover:bg-[#369870] transition-colors disabled:opacity-50"
            >
              {{ isSignUp ? 'Sign Up' : 'Sign In' }}
            </button>

            <button
              type="button"
              @click="isSignUp = !isSignUp"
              class="w-full text-gray-400 hover:text-white transition-colors"
            >
              {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
            </button>
          </div>
        </form>

        <div v-if="error" class="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p class="text-red-400 text-sm">{{ error }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '#components'

definePageMeta({
  layout: false
})

const authStore = useAuthStore()
const mouseX = ref(0)
const mouseY = ref(0)
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const loading = ref(false)
const error = ref('')

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = (e.clientX - window.innerWidth / 2) / 20
  mouseY.value = (e.clientY - window.innerHeight / 2) / 20
}

const signInWithGoogle = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.signInWithGoogle()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const signInWithGithub = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.signInWithGithub()
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleEmailAuth = async () => {
  loading.value = true
  error.value = ''
  try {
    if (isSignUp.value) {
      await authStore.signUpWithEmail(email.value, password.value)
    } else {
      await authStore.signInWithEmail(email.value, password.value)
    }
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 1
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }
}

const getParticleClasses = (index: number) => {
  const classes = ['bg-[#42b883]/20', 'bg-white/10', 'bg-purple-400/10']
  return classes[index % classes.length]
}

const getShapeStyle = (index: number) => {
  const size = 50 + Math.random() * 100
  return {
    left: `${Math.random() * 90}%`,
    top: `${Math.random() * 90}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${index * 0.5}s`,
    animationDuration: `${8 + Math.random() * 4}s`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }
}

const getShapeClasses = (index: number) => {
  const shapes = ['rounded-lg', 'rounded-full', 'rounded-none']
  return shapes[index % shapes.length]
}

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
})
</script>
