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

    <div class="text-center z-10 max-w-4xl mx-auto">
      <div class="opacity-0 animate-fade-in-up animate-delay-100">
        <h1 class="text-6xl md:text-8xl font-bold mb-6 relative group cursor-default">
          <span class="bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent animate-gradient-x bg-300ptc relative z-10">
            Welcome Back!
          </span>
        </h1>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-200">
        <p class="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          You are successfully authenticated
        </p>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-300 mb-8">
        <div class="glass rounded-2xl p-8 border border-white/10 max-w-md mx-auto">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-r from-[#42b883] to-[#20a085] rounded-full flex items-center justify-center">
              <Icon name="heroicons:user" class="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">User Profile</h3>
          <p class="text-gray-400 mb-1">{{ user?.email || 'No email' }}</p>
          <p class="text-gray-400 text-sm">{{ user?.displayName || 'No name' }}</p>
        </div>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-400">
        <button
          @click="logout"
          :disabled="loading"
          class="group relative px-8 py-4 bg-red-600 text-white rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <span class="relative z-10 flex items-center gap-2">
            <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" />
            Sign Out
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '#components'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const mouseX = ref(0)
const mouseY = ref(0)
const loading = ref(false)

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = (e.clientX - window.innerWidth / 2) / 20
  mouseY.value = (e.clientY - window.innerHeight / 2) / 20
}

const logout = async () => {
  loading.value = true
  try {
    await authStore.logout()
  } catch (error) {
    console.error(error)
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
