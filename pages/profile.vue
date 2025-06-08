<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Profil Pengguna</h1>
        
        <div v-if="pending" class="text-gray-500">
          Loading...
        </div>
        
        <div v-else-if="data?.user" class="space-y-4">
          <div class="flex justify-center">
            <img
              :src="data.user.image || '/default-avatar.png'"
              :alt="data.user.name || 'User'"
              class="w-20 h-20 rounded-full"
            >
          </div>
          
          <div>
            <p class="text-sm text-gray-500">Name</p>
            <p class="font-medium">{{ data.user.name }}</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="font-medium">{{ data.user.email }}</p>
          </div>
          
          <div v-if="userProfile">
            <p class="text-sm text-gray-500">Username</p>
            <p class="font-medium">{{ userProfile.username }}</p>
          </div>
          
          <div v-if="userProfile">
            <p class="text-sm text-gray-500">Provider</p>
            <p class="font-medium capitalize">{{ userProfile.provider }}</p>
          </div>
          
          <div class="flex space-x-4">
            <button
              @click="refreshProfile"
              :disabled="refreshing"
              class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {{ refreshing ? 'Refreshing...' : 'Refresh Profile' }}
            </button>
            
            <button
              @click="signOut"
              class="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div v-else class="text-red-500">
          No user data available
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true
})

const { data, status, signOut } = useAuth()
const refreshing = ref(false)

// Fetch additional user profile data
const { data: userProfile, pending, refresh: refreshUserProfile } = await useFetch('/api/user/profile', {
  server: false
})

const refreshProfile = async () => {
  refreshing.value = true
  try {
    await $fetch('/api/user/refresh', { method: 'POST' })
    await refreshUserProfile()
  } catch (error) {
    console.error('Error refreshing profile:', error)
  } finally {
    refreshing.value = false
  }
}
</script>
