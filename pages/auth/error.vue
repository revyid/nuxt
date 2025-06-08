<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Terjadi Kesalahan
        </h2>
        <div class="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {{ errorMessage }}
        </div>
        <div class="mt-6">
          <NuxtLink
            to="/auth/signin"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kembali ke Login
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const errorMessage = computed(() => {
  const error = route.query.error as string
  
  if (error?.includes('Email sudah terdaftar')) {
    return error
  }
  
  return 'Terjadi kesalahan saat proses autentikasi. Silakan coba lagi.'
})
</script>
