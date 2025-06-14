<template>
  <div class="min-h-screen bg-black gradient-bg flex items-center justify-center p-4 overflow-hidden">
    <div class="w-full max-w-sm">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 mb-3 transform transition-all duration-300 hover:scale-105">
          <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white mb-1">Revy Auth</h1>
        <p class="text-zinc-400 text-sm">Secure authentication for your account</p>
      </div>

      <div class="flex space-x-1 mb-4 bg-zinc-800/30 rounded-lg p-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-300 transform"
          :class="activeTab === tab.id
            ? 'bg-green-500/20 text-green-400 shadow-lg scale-105'
            : 'text-zinc-400 hover:text-zinc-300 hover:scale-102'"
        >
          {{ tab.label }}
        </button>
      </div>

      <Transition name="slide-fade" mode="out-in">
        <div v-if="error" key="error" class="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-shake">
          <p class="text-red-400 text-xs text-center">{{ error }}</p>
        </div>
      </Transition>

      <Transition name="slide-fade" mode="out-in">
        <div v-if="successMessage" key="success" class="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p class="text-green-400 text-xs text-center">{{ successMessage }}</p>
        </div>
      </Transition>

      <div v-if="activeTab === 'signup'" class="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p class="text-blue-400 text-xs text-center">Belum punya akun? Daftar sekarang untuk mengakses dashboard</p>
      </div>

      <div v-if="activeTab === 'reset'" class="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <p class="text-yellow-400 text-xs text-center">Masukkan email untuk reset password</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <Transition name="slide-up" mode="out-in">
          <div v-if="activeTab !== 'reset'" key="email-password">
            <div class="space-y-3">
              <div>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-3 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 placeholder-zinc-500 transition-all duration-300 text-sm focus:scale-[1.02]"
                  placeholder="Email address"
                >
              </div>
              
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 placeholder-zinc-500 transition-all duration-300 pr-10 text-sm focus:scale-[1.02]"
                  placeholder="Password"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                >
                  <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div v-else key="reset-email">
            <input
              v-model="resetEmail"
              type="email"
              required
              class="w-full px-3 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 placeholder-zinc-500 transition-all duration-300 text-sm focus:scale-[1.02]"
              placeholder="Email untuk reset password"
            >
          </div>
        </Transition>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2.5 px-4 rounded-lg font-medium bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10 active:scale-[0.98] text-green-400 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>{{ getButtonText() }}</span>
        </button>
      </form>

      <div v-if="activeTab !== 'reset'" class="mt-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-zinc-700"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="px-2 bg-black text-zinc-500">Atau lanjutkan dengan</span>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2">
          <button
            @click="handleGoogleSignIn"
            :disabled="loading"
            class="bg-zinc-800/30 hover:bg-green-500/10 border border-zinc-700/50 hover:border-green-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] py-2.5 px-3 rounded-lg font-medium text-zinc-400 hover:text-green-400 disabled:opacity-50 flex items-center justify-center space-x-2 text-xs"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>

          <button
            @click="handleGithubSignIn"
            :disabled="loading"
            class="bg-zinc-800/30 hover:bg-green-500/10 border border-zinc-700/50 hover:border-green-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] py-2.5 px-3 rounded-lg font-medium text-zinc-400 hover:text-green-400 disabled:opacity-50 flex items-center justify-center space-x-2 text-xs"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'signin'" class="mt-4 text-center">
        <button
          @click="switchTab('reset')"
          class="text-xs text-zinc-500 hover:text-green-400 transition-colors duration-200"
        >
          Lupa password?
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { user, loading, error } = storeToRefs(authStore)

const activeTab = ref('signin')
const email = ref('')
const password = ref('')
const resetEmail = ref('')
const showPassword = ref(false)
const successMessage = ref('')

const tabs = [
  { id: 'signin', label: 'Sign In' },
  { id: 'signup', label: 'Sign Up' },
  { id: 'reset', label: 'Reset' }
]

onMounted(async () => {
  await authStore.initAuth()
})

watch(user, (newUser) => {
  if (newUser) {
    window.location.href = 'https://dash.revy.my.id'
  }
}, { immediate: true })

const switchTab = (tabId: string) => {
  activeTab.value = tabId
  successMessage.value = ''
  authStore.clearError()
}

const getButtonText = () => {
  if (loading.value) return 'Loading...'
  
  switch (activeTab.value) {
    case 'signin': return 'Sign In'
    case 'signup': return 'Create Account'
    case 'reset': return 'Send Reset Email'
    default: return 'Submit'
  }
}

const handleSubmit = async () => {
  successMessage.value = ''
  
  try {
    switch (activeTab.value) {
      case 'signin':
        await authStore.signIn(email.value, password.value)
        break
      case 'signup':
        await authStore.signUp(email.value, password.value)
        successMessage.value = 'Akun berhasil dibuat! Mengalihkan ke dashboard...'
        break
      case 'reset':
        await authStore.resetPassword(resetEmail.value)
        successMessage.value = 'Email reset password telah dikirim!'
        resetEmail.value = ''
        break
    }
  } catch (err) {
    console.error('Auth error:', err)
  }
}

const handleGoogleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
  } catch (err) {
    console.error('Google sign in error:', err)
  }
}

const handleGithubSignIn = async () => {
  try {
    await authStore.signInWithGithub()
  } catch (err) {
    console.error('GitHub sign in error:', err)
  }
}
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.gradient-bg {
  background-image: 
    radial-gradient(ellipse at top, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(34, 197, 94, 0.04) 0%, transparent 50%);
}
</style>
