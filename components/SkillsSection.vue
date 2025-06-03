<template>
  <section id="skills" class="py-20 px-6 relative overflow-hidden">
    <!-- Background elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
    
    <!-- Animated background grid -->
    <div class="absolute inset-0 opacity-10">
      <div 
        v-for="i in 20" 
        :key="`grid-${i}`"
        class="absolute w-px h-20 bg-[#42b883]/20 animate-grid-float"
        :style="getGridStyle(i, 'vertical')"
      ></div>
      <div 
        v-for="i in 12" 
        :key="`grid-h-${i}`"
        class="absolute w-20 h-px bg-[#42b883]/10 animate-grid-float"
        :style="getGridStyle(i, 'horizontal')"
      ></div>
    </div>

    <!-- Floating code symbols -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div
        v-for="(symbol, index) in codeSymbols"
        :key="`symbol-${index}`"
        class="absolute text-[#42b883]/30 text-2xl animate-float-code font-mono select-none"
        :style="getSymbolStyle(index)"
      >
        {{ symbol }}
      </div>
    </div>

    <!-- Glowing orbs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-32 h-32 bg-[#42b883]/5 rounded-full blur-xl animate-pulse-slow"></div>
      <div class="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#369870]/5 rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Skills & <span class="text-[#42b883] animate-gradient-text">Technologies</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Technologies and tools I use to bring ideas to life with passion and precision
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-[#42b883] to-transparent mx-auto mt-6 rounded-full animate-glow"></div>
      </div>

      <!-- Skills Categories -->
      <div class="space-y-16">
        <!-- Frontend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-100">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3 p-4 rounded-2xl glass-light">
              <i class="fas fa-laptop-code text-2xl text-[#42b883] animate-bounce-subtle"></i>
              <h3 class="text-2xl font-bold text-white">Frontend Development</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in frontendSkills"
              :key="skill.name"
              class="group skill-card glass-card rounded-2xl p-6 text-center border border-white/5 opacity-0 animate-fade-in-up relative overflow-hidden"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <!-- Hover light effect -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#42b883]/0 via-[#42b883]/0 to-[#42b883]/0 group-hover:from-[#42b883]/5 group-hover:via-[#42b883]/10 group-hover:to-[#42b883]/5 transition-all duration-700 rounded-2xl"></div>
              
              <!-- Animated border -->
              <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#42b883]/30 transition-all duration-500"></div>
              
              <!-- Glow effect -->
              <div class="absolute -inset-1 bg-gradient-to-r from-[#42b883]/0 to-[#369870]/0 group-hover:from-[#42b883]/20 group-hover:to-[#369870]/20 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              <div class="relative z-10">
                <div class="relative mb-4">
                  <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#42b883]/20">
                    <i :class="skill.icon" class="text-2xl transition-all duration-300" :style="{ color: skill.color }"></i>
                  </div>
                  <!-- Icon glow -->
                  <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#42b883]/20 to-[#20a085]/20 blur-md"></div>
                  </div>
                </div>
                
                <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-all duration-300 text-sm mb-3">
                  {{ skill.name }}
                </h4>
                
                <!-- Enhanced Skill Level Progress -->
                <div class="relative">
                  <div class="bg-gray-800/80 rounded-full h-2 overflow-hidden mb-1 backdrop-blur-sm">
                    <div
                      class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-300 relative overflow-hidden group-hover:shadow-md group-hover:shadow-[#42b883]/50"
                      :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                    >
                      <!-- Enhanced shimmer effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                      <!-- Progress glow -->
                      <div class="absolute inset-0 bg-gradient-to-r from-[#42b883]/50 to-[#20a085]/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  <span class="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-200">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3 p-4 rounded-2xl glass-light">
              <i class="fas fa-server text-2xl text-[#42b883] animate-bounce-subtle"></i>
              <h3 class="text-2xl font-bold text-white">Backend Development</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in backendSkills"
              :key="skill.name"
              class="group skill-card glass-card rounded-2xl p-6 text-center border border-white/5 opacity-0 animate-fade-in-up relative overflow-hidden"
              :style="{ animationDelay: `${(index + 6) * 0.1}s` }"
            >
              <!-- Hover effects (same as frontend) -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#42b883]/0 via-[#42b883]/0 to-[#42b883]/0 group-hover:from-[#42b883]/5 group-hover:via-[#42b883]/10 group-hover:to-[#42b883]/5 transition-all duration-700 rounded-2xl"></div>
              <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#42b883]/30 transition-all duration-500"></div>
              <div class="absolute -inset-1 bg-gradient-to-r from-[#42b883]/0 to-[#369870]/0 group-hover:from-[#42b883]/20 group-hover:to-[#369870]/20 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              <div class="relative z-10">
                <div class="relative mb-4">
                  <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#42b883]/20">
                    <i :class="skill.icon" class="text-2xl transition-all duration-300" :style="{ color: skill.color }"></i>
                  </div>
                  <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#42b883]/20 to-[#20a085]/20 blur-md"></div>
                  </div>
                </div>
                
                <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-all duration-300 text-sm mb-3">
                  {{ skill.name }}
                </h4>
                
                <div class="relative">
                  <div class="bg-gray-800/80 rounded-full h-2 overflow-hidden mb-1 backdrop-blur-sm">
                    <div
                      class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-500 relative overflow-hidden group-hover:shadow-md group-hover:shadow-[#42b883]/50"
                      :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                      <div class="absolute inset-0 bg-gradient-to-r from-[#42b883]/50 to-[#20a085]/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  <span class="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Others -->
        <div class="opacity-0 animate-fade-in-up animate-delay-300">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3 p-4 rounded-2xl glass-light">
              <i class="fas fa-tools text-2xl text-[#42b883] animate-bounce-subtle"></i>
              <h3 class="text-2xl font-bold text-white">Tools & Technologies</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in toolsSkills"
              :key="skill.name"
              class="group skill-card glass-card rounded-2xl p-6 text-center border border-white/5 opacity-0 animate-fade-in-up relative overflow-hidden"
              :style="{ animationDelay: `${(index + 12) * 0.1}s` }"
            >
              <!-- Hover effects (same as above) -->
              <div class="absolute inset-0 bg-gradient-to-br from-[#42b883]/0 via-[#42b883]/0 to-[#42b883]/0 group-hover:from-[#42b883]/5 group-hover:via-[#42b883]/10 group-hover:to-[#42b883]/5 transition-all duration-700 rounded-2xl"></div>
              <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#42b883]/30 transition-all duration-500"></div>
              <div class="absolute -inset-1 bg-gradient-to-r from-[#42b883]/0 to-[#369870]/0 group-hover:from-[#42b883]/20 group-hover:to-[#369870]/20 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
              
              <div class="relative z-10">
                <div class="relative mb-4">
                  <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#42b883]/20">
                    <i :class="skill.icon" class="text-2xl transition-all duration-300" :style="{ color: skill.color }"></i>
                  </div>
                  <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#42b883]/20 to-[#20a085]/20 blur-md"></div>
                  </div>
                </div>
                
                <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-all duration-300 text-sm mb-3">
                  {{ skill.name }}
                </h4>
                
                <div class="relative">
                  <div class="bg-gray-800/80 rounded-full h-2 overflow-hidden mb-1 backdrop-blur-sm">
                    <div
                      class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-700 relative overflow-hidden group-hover:shadow-md group-hover:shadow-[#42b883]/50"
                      :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                    >
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
                      <div class="absolute inset-0 bg-gradient-to-r from-[#42b883]/50 to-[#20a085]/50 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                  <span class="text-xs text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Stats Section -->
      <div class="mt-20 opacity-0 animate-fade-in-up animate-delay-400">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-white mb-4">By The Numbers</h3>
          <p class="text-gray-400 text-lg">A snapshot of my development journey</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="text-center glass-card rounded-2xl p-8 border border-white/5 group opacity-0 animate-fade-in-up relative overflow-hidden stat-card"
            :style="{ animationDelay: `${(index + 18) * 0.1}s` }"
          >
            <!-- Stat card hover effects -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#42b883]/0 to-[#369870]/0 group-hover:from-[#42b883]/10 group-hover:to-[#369870]/10 transition-all duration-700 rounded-2xl"></div>
            <div class="absolute -inset-1 bg-gradient-to-r from-[#42b883]/0 to-[#369870]/0 group-hover:from-[#42b883]/20 group-hover:to-[#369870]/20 rounded-2xl blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
            
            <div class="relative z-10">
              <div class="relative mb-4">
                <i :class="stat.icon" class="text-4xl text-[#42b883] mb-4 group-hover:scale-110 transition-all duration-300 group-hover:drop-shadow-lg"></i>
                <div class="text-5xl font-bold text-white mb-2 group-hover:text-[#42b883] transition-all duration-300 counter-number">
                  {{ isVisible ? stat.value : '0' }}
                </div>
              </div>
              <div class="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Call to Action -->
      <div class="text-center mt-16 opacity-0 animate-fade-in-up animate-delay-500">
        <p class="text-gray-400 mb-6 text-lg">Interested in working together?</p>
        <button class="group px-10 py-5 bg-gradient-to-r from-[#42b883] to-[#369870] text-white rounded-full font-medium hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#42b883]/40 relative overflow-hidden cta-button">
          <!-- Button shimmer effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer-slow opacity-0 group-hover:opacity-100"></div>
          <span class="flex items-center gap-3 relative z-10">
            <i class="fas fa-paper-plane group-hover:animate-bounce"></i>
            Let's Connect
            <i class="fas fa-arrow-right transform group-hover:translate-x-2 transition-transform duration-300"></i>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Skill {
  name: string
  icon: string
  level: number
  color: string
}

interface Stat {
  label: string
  value: string
  icon: string
}

const isVisible = ref(false)
const codeSymbols = ['</', '/>', '{}', '[]', '()', '=>', '&&', '||', '===', '!==']

const frontendSkills: Skill[] = [
  { name: 'HTML5', icon: 'fab fa-html5', level: 95, color: '#E34F26' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90, color: '#1572B6' },
  { name: 'JavaScript', icon: 'fab fa-js-square', level: 88, color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'fab fa-js-square', level: 85, color: '#3178C6' },
  { name: 'Vue.js', icon: 'fab fa-vuejs', level: 92, color: '#4FC08D' },
  { name: 'React', icon: 'fab fa-react', level: 80, color: '#61DAFB' },
]

const backendSkills: Skill[] = [
  { name: 'Node.js', icon: 'fab fa-node-js', level: 85, color: '#339933' },
  { name: 'Python', icon: 'fab fa-python', level: 82, color: '#3776AB' },
  { name: 'PHP', icon: 'fab fa-php', level: 78, color: '#777BB4' },
  { name: 'Laravel', icon: 'fab fa-laravel', level: 80, color: '#FF2D20' },
  { name: 'MongoDB', icon: 'fas fa-database', level: 75, color: '#47A248' },
  { name: 'MySQL', icon: 'fas fa-database', level: 85, color: '#4479A1' },
]

const toolsSkills: Skill[] = [
  { name: 'Git', icon: 'fab fa-git-alt', level: 90, color: '#F05032' },
  { name: 'Docker', icon: 'fab fa-docker', level: 75, color: '#2496ED' },
  { name: 'AWS', icon: 'fab fa-aws', level: 70, color: '#FF9900' },
  { name: 'Figma', icon: 'fab fa-figma', level: 85, color: '#F24E1E' },
  { name: 'Webpack', icon: 'fas fa-cube', level: 80, color: '#8DD6F9' },
  { name: 'Vite', icon: 'fas fa-bolt', level: 88, color: '#646CFF' },
]

const stats: Stat[] = [
  { label: 'Projects Completed', value: '50+', icon: 'fas fa-project-diagram' },
  { label: 'Years Experience', value: '3+', icon: 'fas fa-calendar-alt' },
  { label: 'Technologies', value: '20+', icon: 'fas fa-code' },
  { label: 'Happy Clients', value: '30+', icon: 'fas fa-smile' },
]

// Animation functions - Fixed for SSR
const getGridStyle = (index: number, direction: 'vertical' | 'horizontal') => {
  if (process.client) {
    if (direction === 'vertical') {
      return {
        left: `${(index * 5) % 100}%`,
        animationDelay: `${index * 0.2}s`,
        animationDuration: `${4 + Math.random() * 2}s`,
      }
    } else {
      return {
        top: `${(index * 8) % 100}%`,
        animationDelay: `${index * 0.3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }
    }
  }
  return {}
}

const getSymbolStyle = (index: number) => {
  if (process.client) {
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${index * 0.5}s`,
      animationDuration: `${6 + Math.random() * 4}s`,
    }
  }
  return {
    left: `${(index * 13) % 100}%`,
    top: `${(index * 17) % 100}%`,
  }
}

// Intersection Observer for animations
let observer: IntersectionObserver | null = null

onMounted(() => {
  const element = document.getElementById('skills')
  if (element && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    }, {
      threshold: 0.1
    })
    observer.observe(element)
  } else {
    // Fallback for SSR
    setTimeout(() => {
      isVisible.value = true
    }, 1000)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Load Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Enhanced animations */
@keyframes gradient-text {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
}

@keyframes float-code {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.2;
  }
  25% { 
    transform: translateY(-10px) rotate(45deg);
    opacity: 0.4;
  }
  50% { 
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.6;
  }
  75% { 
    transform: translateY(-10px) rotate(135deg);
    opacity: 0.4;
  }
}

@keyframes shimmer {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

@keyframes shimmer-slow {
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%, 100% { 
    opacity: 0.3;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes bounce-subtle {
  0%, 100% { 
    transform: translateY(0);
  }
  50% { 
    transform: translateY(-5px);
  }
}

@keyframes glow {
  0%, 100% { 
    box-shadow: 0 0 5px #42b883;
  }
  50% { 
    box-shadow: 0 0 20px #42b883, 0 0 30px #42b883;
  }
}

@keyframes grid-float {
  0%, 100% { 
    opacity: 0.1;
    transform: translateY(0);
  }
  50% { 
    opacity: 0.3;
    transform: translateY(-10px);
  }
}

/* Enhanced utility classes */
.animate-gradient-text {
  background: linear-gradient(-45deg, #42b883, #369870, #42b883, #20a085);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-text 3s ease infinite;
}

.animate-float-code {
  animation: float-code 10s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-shimmer-slow {
  animation: shimmer-slow 3s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-grid-float {
  animation: grid-float 6s ease-in-out infinite;
}

/* Animation delays */
.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-400 { animation-delay: 0.4s; }
.animate-delay-500 { animation-delay: 0.5s; }
.animation-delay-1000 { animation-delay: 1s; }

/* Enhanced glass effects */
.glass-card {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-light {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
}

.skill-card:hover {
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 20px 40px rgba(66, 184, 131, 0.1);
}

.stat-card:hover {
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 25px 50px rgba(66, 184, 131, 0.15);
}

.cta-button:hover {
  background: linear-gradient(135deg, #42b883, #369870, #20a085);
  box-shadow: 0 15px 35px rgba(66, 184, 131, 0.4);
}

/* Performance optimizations */
.skill-card,
.stat-card,
.glass-card {
  will-change: transform;
}

/* Counter animation */
.counter-number {
  font-variant-numeric: tabular-nums;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .glass-card {
    backdrop-filter: blur(15px);
  }
  
  .skill-card:hover {
    transform: translateY(-3px) scale(1.01);
  }
  
  .stat-card:hover {
    transform: translateY(-5px) scale(1.02);
  }
}

@media (max-width: 640px) {
  .animate-float-code {
    animation-duration: 12s;
  }
  
  .animate-grid-float {
    animation-duration: 8s;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-float-code,
  .animate-grid-float,
  .animate-pulse-slow,
  .animate-bounce-subtle {
    animation: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  .skill-card:hover,
  .stat-card:hover {
    border-color: #42b883;
  }
}

/* Print styles */
@media print {
  .animate-float-code,
  .animate-grid-float,
  [class*="animate-"] {
    animation: none !important;
  }
  
  .glass-card {
    background: white;
    color: black;
    border: 1px solid #ccc;
  }
}
</style>
