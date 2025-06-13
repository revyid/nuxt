<template>
  <div class="fixed left-0 top-0 h-full w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-r border-white/20 dark:border-slate-700/50 shadow-2xl z-50">
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200">Profile</h3>
        <button @click="$emit('close')" 
                class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
          <Icon name="mdi:close" class="text-slate-500 dark:text-slate-400" />
        </button>
      </div>

      <div class="flex-1 p-6">
        <div v-if="user" class="text-center">
          <div class="relative inline-block mb-6">
            <img :src="user.photoURL || 'https://via.placeholder.com/120'" 
                 :alt="user.displayName || 'User'"
                 class="w-24 h-24 rounded-full border-4 border-white dark:border-slate-700 shadow-lg">
            <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
          </div>
          
          <h4 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {{ user.displayName || 'Anonymous User' }}
          </h4>
          <p class="text-slate-600 dark:text-slate-400 mb-6">{{ user.email }}</p>

          <div class="space-y-4">
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-600 dark:text-slate-400">Account Status</span>
                <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-600 dark:text-slate-400">Member Since</span>
                <span class="text-slate-800 dark:text-slate-200 font-medium">
                  {{ formatDate(user.metadata?.creationTime) }}
                </span>
              </div>
            </div>

            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              <div class="flex items-center justify-between">
                <span class="text-slate-600 dark:text-slate-400">Last Sign In</span>
                <span class="text-slate-800 dark:text-slate-200 font-medium">
                  {{ formatDate(user.metadata?.lastSignInTime) }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-8 space-y-3">
            <button class="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Icon name="mdi:cog" />
              <span>Settings</span>
            </button>
            
            <button @click="signOut" 
                    class="w-full px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 flex items-center justify-center space-x-2">
              <Icon name="mdi:logout" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <Icon name="mdi:account-circle" class="text-6xl text-slate-300 dark:text-slate-600 mb-6" />
          <h4 class="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            Welcome to Revy's Portfolio
          </h4>
          <p class="text-slate-600 dark:text-slate-400 mb-8">
            Sign in to unlock personalized features and save your preferences.
          </p>
          <button @click="signIn" 
                  class="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2">
            <Icon name="mdi:login" />
            <span>Sign in Now</span>
          </button>
          
          <div class="mt-6 text-xs text-slate-500 dark:text-slate-400">
            <p>Secure authentication powered by Firebase</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  metadata?: {
    creationTime?: string
    lastSignInTime?: string
  }
}

const emit = defineEmits(['close'])

const user = ref<User | null>(null)

const signIn = () => {
  const authUrl = process.env.AUTH_URL || 'https://auth.revy.my.id'
  window.location.href = authUrl
}

const signOut = () => {
  user.value = null
  localStorage.removeItem('firebase-user')
}

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const loadUser = () => {
  const savedUser = localStorage.getItem('firebase-user')
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser)
    } catch (error) {
      console.error('Error loading user data:', error)
      localStorage.removeItem('firebase-user')
    }
  }
}

onMounted(() => {
  loadUser()
  
  window.addEventListener('storage', (e) => {
    if (e.key === 'firebase-user') {
      loadUser()
    }
  })
})
</script>
