<template>
  <div class="min-h-screen bg-black gradient-bg flex items-center justify-center p-4 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-green-500/10 animate-pulse-slow"></div>
    <div class="floating-particles"></div>
    
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8 animate-fade-in">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-green-500/10 border border-green-500/30 mb-6 backdrop-blur-sm animate-bounce-slow">
          <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Revy Auth</h1>
        <p class="text-zinc-400 text-lg">Secure authentication for your account</p>
        <div class="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p class="text-blue-400 text-sm">✨ Masuk ke dashboard untuk akses penuh fitur Revy</p>
        </div>
      </div>

      <div class="auth-card p-8 animate-slide-up">
        <div class="flex space-x-1 mb-8 bg-zinc-800/30 rounded-xl p-1 backdrop-blur-sm">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="switchTab(tab.id)"
            class="flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            :class="activeTab === tab.id
              ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/10'
              : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-700/30'"
          >
            {{ tab.label }}
          </button>
        </div>

        <transition name="message" mode="out-in">
          <div v-if="error" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-shake">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
              <p class="text-red-400 text-sm">{{ error }}</p>
            </div>
          </div>
        </transition>

        <transition name="message" mode="out-in">
          <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm animate-bounce-gentle">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p class="text-green-400 text-sm">{{ successMessage }}</p>
            </div>
          </div>
        </transition>

        <transition name="slide" mode="out-in">
          <form @submit.prevent="handleSubmit" :key="activeTab" class="space-y-6">
            <div v-if="activeTab !== 'reset'" class="space-y-2">
              <label class="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
              <div class="relative">
                <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full px-4 py-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 placeholder-zinc-400 transition-all duration-300 text-white backdrop-blur-sm"
                  placeholder="your@email.com"
                  @focus="inputFocus = true"
                  @blur="inputFocus = false"
                >
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 transition-opacity duration-300" :class="{ 'opacity-100': inputFocus }"></div>
              </div>
              <div v-if="activeTab === 'signin'" class="text-xs text-zinc-500 mt-1">
                Belum punya akun? <button type="button" @click="switchTab('signup')" class="text-green-400 hover:text-green-300 transition-colors">Daftar di sini</button>
              </div>
            </div>
            
            <div v-if="activeTab !== 'reset'" class="space-y-2">
              <label class="block text-sm font-medium text-zinc-300 mb-2">Password</label>
              <div class="relative">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 placeholder-zinc-400 transition-all duration-300 pr-12 text-white backdrop-blur-sm"
                  placeholder="••••••••"
                  :minlength="activeTab === 'signup' ? 6 : undefined"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-all duration-200 hover:scale-110"
                >
                  <transition name="fade" mode="out-in">
                    <svg v-if="showPassword" key="hide" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                    </svg>
                    <svg v-else key="show" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </transition>
                </button>
              </div>
              <div v-if="activeTab === 'signup'" class="text-xs text-zinc-500 mt-1">
                Minimal 6 karakter untuk keamanan optimal
              </div>
            </div>

            <div v-if="activeTab === 'reset'" class="space-y-2">
              <label class="block text-sm font-medium text-zinc-300 mb-2">Email Address</label>
              <input
                v-model="resetEmail"
                type="email"
                required
                class="w-full px-4 py-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 placeholder-zinc-400 transition-all duration-300 text-white backdrop-blur-sm"
                placeholder="your@email.com"
              >
              <div class="text-xs text-zinc-500 mt-1">
                Kami akan mengirim link reset password ke email Anda
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-4 px-6 rounded-xl font-medium bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 border border-green-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-green-400 hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-green-500/10"
            >
              <transition name="spin" mode="out-in">
                <svg v-if="loading" key="loading" class="animate-spin h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <svg v-else key="icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </transition>
              <span>{{ getButtonText() }}</span>
            </button>
          </form>
        </transition>

        <div v-if="activeTab !== 'reset'" class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-zinc-700/50"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-zinc-900/80 text-zinc-400 backdrop-blur-sm">Atau lanjutkan dengan</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
              @click="handleGoogleSignIn"
              :disabled="loading"
              class="bg-gradient-to-r from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20 border border-red-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] py-4 px-4 rounded-xl font-medium text-zinc-300 hover:text-white disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-red-500/10"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
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
              class="bg-gradient-to-r from-gray-500/10 to-zinc-500/10 hover:from-gray-500/20 hover:to-zinc-500/20 border border-gray-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] py-4 px-4 rounded-xl font-medium text-zinc-300 hover:text-white disabled:opacity-50 flex items-center justify-center space-x-2 shadow-lg hover:shadow-gray-500/10"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        <div v-if="activeTab === 'signin'" class="mt-6 text-center">
          <button
            @click="switchTab('reset')"
            class="text-sm text-zinc-400 hover:text-green-400 transition-all duration-200 hover:scale-105"
          >
            Lupa password?
          </button>
        </div>

        <div class="mt-6 text-center">
          <p class="text-xs text-zinc-500">
            Dengan masuk, Anda menyetujui 
            <a href="#" class="text-green-400 hover:text-green-300 transition-colors">Terms of Service</a> 
            dan 
            <a href="#" class="text-green-400 hover:text-green-300 transition-colors">Privacy Policy</a>
          </p>
        </div>
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
const inputFocus = ref(false)

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
    setTimeout(() => {
      window.location.href = 'https://dash.revy.my.id'
    }, 1000)
  }
})

const switchTab = (tabId: string) => {
  activeTab.value = tabId
  successMessage.value = ''
  error.value = ''
}

const getButtonText = () => {
  if (loading.value) return 'Processing...'
  
  switch (activeTab.value) {
    case 'signin': return 'Sign In to Dashboard'
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
        successMessage.value = 'Login berhasil! Mengarahkan ke dashboard...'
        break
      case 'signup':
        await authStore.signUp(email.value, password.value)
        successMessage.value = 'Akun berhasil dibuat! Mengarahkan ke dashboard...'
        break
      case 'reset':
        await authStore.resetPassword(resetEmail.value)
        successMessage.value = 'Email reset password telah dikirim! Periksa inbox Anda.'
        resetEmail.value = ''
        setTimeout(() => switchTab('signin'), 3000)
        break
    }
  } catch (err) {
    console.error('Auth error:', err)
  }
}

const handleGoogleSignIn = async () => {
  try {
    await authStore.signInWithGoogle()
    successMessage.value = 'Login berhasil! Mengarahkan ke dashboard...'
  } catch (err) {
    console.error('Google sign in error:', err)
  }
}

const handleGithubSignIn = async () => {
  try {
    await authStore.signInWithGithub()
    successMessage.value = 'Login berhasil! Mengarahkan ke dashboard...'
  } catch (err) {
    console.error('GitHub sign in error:', err)
  }
}
</script>

<style scoped>
.auth-card {
  @apply bg-zinc-900/20 backdrop-blur-md border border-zinc-800/50 rounded-2xl shadow-2xl;
}

.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.floating-particles::before,
.floating-particles::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(34, 197, 94, 0.4);
  border-radius: 50%;
  animation: float 6s infinite ease-in-out;
}

.floating-particles::before {
  left: 20%;
  animation-delay: -2s;
}

.floating-particles::after {
  right: 20%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  50% { transform: translateY(-100px) rotate(180deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes bounce-gentle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-pulse-slow { animation: pulse-slow 4s infinite; }
.animate-bounce-slow { animation: bounce-slow 3s infinite; }
.animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-fade-in { animation: fade-in 0.8s ease-out; }
.animate-slide-up { animation: slide-up 0.6s ease-out; }

.message-enter-active, .message-leave-active {
  transition: all 0.3s ease-in-out;
}
.message-enter-from, .message-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease-in-out;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.spin-enter-active, .spin-leave-active {
  transition: all 0.3s ease-in-out;
}
.spin-enter-from, .spin-leave-to {
  opacity: 0;
  transform: rotate(180deg);
}
</style>
