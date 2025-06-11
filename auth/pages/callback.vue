<template>
  <section class="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#42b883]/20 via-purple-900/10 to-transparent animate-pulse-slow"></div>

    <div class="text-center z-10 max-w-md mx-auto">
      <div class="glass rounded-2xl p-8 border border-white/10">
        <div class="flex items-center justify-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-[#42b883] to-[#20a085] rounded-full flex items-center justify-center animate-spin">
            <Icon name="heroicons:arrow-path" class="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 class="text-2xl font-bold text-white mb-4">Processing Authentication</h1>
        <p class="text-gray-400 mb-6">Please wait while we redirect you...</p>
        
        <div class="w-full bg-gray-700 rounded-full h-2">
          <div class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-2 rounded-full animate-pulse" :style="{ width: `${progress}%` }"></div>
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

const progress = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        navigateTo('/dashboard')
      }, 500)
    } else {
      progress.value += 10
    }
  }, 200)
})
</script>
