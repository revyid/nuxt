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
          <span 
            class="bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent animate-gradient-x bg-300ptc relative z-10"
            @mouseenter="startTextAnimation"
          >
            {{ displayText }}
          </span>
          <span 
            v-if="showCursor" 
            class="animate-pulse text-[#42b883]"
          >|</span>
          
          <div class="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm -z-10">
            {{ displayText }}
          </div>
        </h1>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-200">
        <p class="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          <span 
            v-for="(word, index) in subtitleWords" 
            :key="`word-${index}`"
            class="inline-block animate-wave hover:text-[#42b883] transition-colors duration-300 cursor-default"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ word }}&nbsp;
          </span>
        </p>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-300">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <NuxtLink
            to="/auth"
            class="group relative px-8 py-4 bg-[#42b883] text-white rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#42b883] to-[#20a085] rounded-full"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#369870] to-[#42b883] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              Get Started
              <Icon name="heroicons:arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </NuxtLink>

          <button
            v-if="user"
            @click="navigateTo('/dashboard')"
            class="group relative px-8 py-4 border border-white/20 text-white rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300 glass"
          >
            <div class="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-white/20 to-[#42b883]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              Dashboard
              <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up animate-delay-500">
        <div class="relative">
          <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-pulse-slow">
            <div class="w-1 h-3 bg-[#42b883] rounded-full animate-bounce mt-2"></div>
          </div>
          <div class="absolute inset-0 w-6 h-10 border border-[#42b883]/20 rounded-full animate-ping"></div>
          <div class="absolute inset-0 w-6 h-10 border border-[#42b883]/10 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
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
const { user } = storeToRefs(authStore)
const mouseX = ref(0)
const mouseY = ref(0)
const displayText = ref('')
const showCursor = ref(true)

const fullText = "Hi, I'm Revy"
const subtitleWords = ref([
  'Full', 'Stack', 'Developer', 'passionate', 'about', 'creating',
  'beautiful', 'and', 'functional', 'web', 'experiences'
])

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = (e.clientX - window.innerWidth / 2) / 20
  mouseY.value = (e.clientY - window.innerHeight / 2) / 20
}

const startTextAnimation = () => {
  if (displayText.value === fullText) return
  
  displayText.value = ''
  let i = 0
  const typeInterval = setInterval(() => {
    if (i < fullText.length) {
      displayText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typeInterval)
      showCursor.value = false
    }
  }, 100)
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
  setTimeout(() => {
    startTextAnimation()
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
})
</script>
