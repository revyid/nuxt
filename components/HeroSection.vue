<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
  >
    <!-- Animated background layers -->
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#42b883]/20 via-purple-900/10 to-transparent animate-pulse-slow"></div>
    
    <!-- Geometric shapes background -->
    <div class="absolute inset-0 opacity-10">
      <div 
        v-for="i in 8" 
        :key="`shape-${i}`"
        class="absolute border border-[#42b883]/30 rounded-lg animate-float"
        :class="getShapeClasses(i)"
        :style="getShapeStyle(i)"
      ></div>
    </div>

    <!-- Enhanced floating particles with varied sizes -->
    <div class="absolute inset-0">
      <div
        v-for="i in 30"
        :key="`particle-${i}`"
        class="absolute rounded-full animate-float-particle"
        :class="getParticleClasses(i)"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Spotlight effect -->
    <div 
      class="absolute inset-0 bg-gradient-radial from-[#42b883]/5 via-transparent to-transparent"
      :style="{ transform: `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)` }"
    ></div>

    <!-- Content with enhanced animations -->
    <div class="text-center z-10 max-w-4xl mx-auto">
      <!-- Main title with typing effect and glow -->
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
          
          <!-- Text glow effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm -z-10">
            {{ displayText }}
          </div>
        </h1>
      </div>

      <!-- Enhanced subtitle with wave animation -->
      <div class="opacity-0 animate-fade-in-up animate-delay-200">
        <p class="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          <span 
            v-for="(word, index) in subtitleWords" 
            :key="`word-${index}`"
            class="inline-block animate-wave hover:text-[#42b883] transition-colors duration-300 cursor-default"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @mouseenter="animateWord(index)"
          >
            {{ word }}&nbsp;
          </span>
        </p>
      </div>

      <!-- Enhanced buttons with ripple effects -->
      <div class="opacity-0 animate-fade-in-up animate-delay-300">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="scrollToProjects"
            @mouseenter="playHoverSound"
            class="group relative px-8 py-4 bg-[#42b883] text-white rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <!-- Ripple effect -->
            <div 
              v-for="ripple in ripples" 
              :key="ripple.id"
              class="absolute rounded-full bg-white/20 pointer-events-none animate-ripple"
              :style="ripple.style"
            ></div>
            
            <!-- Button background animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#42b883] to-[#20a085] rounded-full"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-[#369870] to-[#42b883] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Animated border -->
            <div class="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-[#42b883] to-[#20a085] bg-clip-border group-hover:animate-spin-slow"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              View My Work
              <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </button>

          <button
            @click="scrollToContact"
            @mouseenter="playHoverSound"
            class="group relative px-8 py-4 border border-white/20 text-white rounded-full font-medium overflow-hidden hover:scale-105 transition-all duration-300 glass"
          >
            <!-- Animated border -->
            <div class="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-white/20 to-[#42b883]/20 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Background shine effect -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span class="relative z-10 flex items-center gap-2">
              Get In Touch
              <svg class="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>

      <!-- Enhanced scroll indicator with breathing animation -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up animate-delay-500">
        <div class="relative">
          <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-pulse-slow">
            <div class="w-1 h-3 bg-[#42b883] rounded-full animate-bounce mt-2"></div>
          </div>
          <!-- Ripple rings around scroll indicator -->
          <div class="absolute inset-0 w-6 h-10 border border-[#42b883]/20 rounded-full animate-ping"></div>
          <div class="absolute inset-0 w-6 h-10 border border-[#42b883]/10 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Reactive data
const mouseX = ref(0)
const mouseY = ref(0)
const displayText = ref('')
const showCursor = ref(true)
const ripples = ref<Array<{id: number, style: object}>>([])
const animatedWords = ref(new Set())

// Constants
const fullText = "Hi, I'm Revy"
const subtitleWords = ref([
  'Full', 'Stack', 'Developer', 'passionate', 'about', 'creating',
  'beautiful', 'and', 'functional', 'web', 'experiences'
])

// Mouse tracking for parallax effects
const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = (e.clientX - window.innerWidth / 2) / 20
  mouseY.value = (e.clientY - window.innerHeight / 2) / 20
}

// Typing animation
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

// Word animation
const animateWord = (index: number) => {
  if (animatedWords.value.has(index)) return
  animatedWords.value.add(index)
  
  // Add temporary class for animation
  const wordElement = document.querySelector(`[data-word-index="${index}"]`)
  if (wordElement) {
    wordElement.classList.add('animate-bounce-once')
    setTimeout(() => {
      wordElement.classList.remove('animate-bounce-once')
      animatedWords.value.delete(index)
    }, 600)
  }
}

// Ripple effect for buttons
const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLButtonElement
  const rect = button.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  
  const ripple = {
    id: Date.now(),
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}px`,
      top: `${y}px`,
    }
  }
  
  ripples.value.push(ripple)
  
  setTimeout(() => {
    ripples.value = ripples.value.filter(r => r.id !== ripple.id)
  }, 1000)
}

// Sound effects (optional - you can remove if not needed)
const playHoverSound = () => {
  // Optional: Add subtle hover sound effect
  // const audio = new Audio('/hover-sound.mp3')
  // audio.volume = 0.1
  // audio.play().catch(() => {})
}

// Particle and shape styling
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

// Scroll functions
const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
  
  // Start typing animation after a delay
  setTimeout(() => {
    startTextAnimation()
  }, 1000)
  
  // Add click listeners for ripple effect
  document.addEventListener('click', createRipple)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
  document.removeEventListener('click', createRipple)
})
</script>

<style scoped>
/* Custom animations */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(120deg); }
  66% { transform: translateY(5px) rotate(240deg); }
}

@keyframes float-particle {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) scale(1);
    opacity: 0.3;
  }
  25% { 
    transform: translateY(-20px) translateX(10px) scale(1.2);
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-10px) translateX(-15px) scale(0.8);
    opacity: 0.5;
  }
  75% { 
    transform: translateY(-30px) translateX(5px) scale(1.1);
    opacity: 0.7;
  }
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-once {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Utility classes */
.animate-gradient-x { animation: gradient-x 3s ease infinite; }
.animate-wave { animation: wave 2s ease-in-out infinite; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-particle { animation: float-particle 4s ease-in-out infinite; }
.animate-ripple { animation: ripple 1s ease-out; }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
.animate-spin-slow { animation: spin-slow 3s linear infinite; }
.animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }

.bg-300ptc { background-size: 300% 300%; }
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-stops));
}

.glass {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
}

/* Fade in animations with delays */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-500 { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
