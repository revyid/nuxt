<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  authStore.initAuth()
})
</script>
