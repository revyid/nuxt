<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Profil Pengguna</h1>
        
        <div v-if="pending" class="text-gray-500">
          Loading...
        </div>
        
        <div v-else-if="user" class="space-y-4">
          <div class="flex justify-center">
            <img
              :src="user.avatar_url || '/default-avatar.png'"
              :alt="user.username"
              class="w-20 h-20 rounded-full"
            >
          </div>
          
          <div>
            <p class="text-sm text-gray-500">Username</p>
            <p class="font-medium">{{ user.username }}</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500">Email</p>
            <p class="font-medium">{{ user.email }}</p>
          </div>
          
          <div>
            <p class="text-sm text-gray-500">Provider</p>
            <p class="font-medium capitalize">{{ user.provider }}</p>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true
})

const { data: session, signOut } = useAuth()
const refreshing = ref(false)

const { data: user, pending, refresh } = await $fetch('/api/user/profile')

const refreshProfile = async () => {
  refreshing.value = true
  try {
    await $fetch('/api/user/refresh', { method: 'POST' })
    await refresh()
  } catch (error) {
    console.error('Error refreshing profile:', error)
  } finally {
    refreshing.value = false
  }
}
</script>
