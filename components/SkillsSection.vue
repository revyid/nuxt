<template>
  <section id="skills" class="py-20 px-6 relative overflow-hidden">
    <!-- Background elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
    
    <!-- Animated background grid -->
    <div class="absolute inset-0 opacity-10">
      <div 
        v-for="i in 20" 
        :key="`grid-${i}`"
        class="absolute w-px h-20 bg-[#42b883]/20"
        :style="getGridStyle(i, 'vertical')"
      ></div>
      <div 
        v-for="i in 12" 
        :key="`grid-h-${i}`"
        class="absolute w-20 h-px bg-[#42b883]/10"
        :style="getGridStyle(i, 'horizontal')"
      ></div>
    </div>

    <!-- Floating code symbols -->
    <div class="absolute inset-0 opacity-20">
      <div
        v-for="(symbol, index) in codeSymbols"
        :key="`symbol-${index}`"
        class="absolute text-[#42b883]/30 text-2xl animate-float-code font-mono"
        :style="getSymbolStyle(index)"
      >
        {{ symbol }}
      </div>
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
        <div class="w-24 h-1 bg-gradient-to-r from-[#42b883] to-transparent mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Skills Categories -->
      <div class="space-y-16">
        <!-- Frontend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-100">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3">
              <i class="fas fa-laptop-code text-2xl text-[#42b883]"></i>
              <h3 class="text-2xl font-bold text-white">Frontend Development</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in frontendSkills"
              :key="skill.name"
              class="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#42b883]/20 text-center border border-white/5 hover:border-[#42b883]/30 opacity-0 animate-fade-in-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
              @mouseenter="animateSkillCard"
            >
              <div class="relative mb-4">
                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
                </div>
                <!-- Pulse ring on hover -->
                <div class="absolute inset-0 rounded-xl border-2 border-[#42b883]/0 group-hover:border-[#42b883]/30 group-hover:animate-pulse transition-all duration-300"></div>
              </div>
              <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm mb-3">
                {{ skill.name }}
              </h4>
              
              <!-- Skill Level Progress -->
              <div class="relative">
                <div class="bg-gray-800 rounded-full h-2 overflow-hidden mb-1">
                  <div
                    class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-300 relative overflow-hidden"
                    :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                  >
                    <!-- Shimmer effect -->
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                <span class="text-xs text-gray-400 font-medium">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-200">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3">
              <i class="fas fa-server text-2xl text-[#42b883]"></i>
              <h3 class="text-2xl font-bold text-white">Backend Development</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in backendSkills"
              :key="skill.name"
              class="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#42b883]/20 text-center border border-white/5 hover:border-[#42b883]/30 opacity-0 animate-fade-in-up"
              :style="{ animationDelay: `${(index + 6) * 0.1}s` }"
              @mouseenter="animateSkillCard"
            >
              <div class="relative mb-4">
                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
                </div>
                <div class="absolute inset-0 rounded-xl border-2 border-[#42b883]/0 group-hover:border-[#42b883]/30 group-hover:animate-pulse transition-all duration-300"></div>
              </div>
              <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm mb-3">
                {{ skill.name }}
              </h4>
              
              <div class="relative">
                <div class="bg-gray-800 rounded-full h-2 overflow-hidden mb-1">
                  <div
                    class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-500 relative overflow-hidden"
                    :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                <span class="text-xs text-gray-400 font-medium">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Others -->
        <div class="opacity-0 animate-fade-in-up animate-delay-300">
          <div class="flex items-center justify-center mb-8">
            <div class="flex items-center gap-3">
              <i class="fas fa-tools text-2xl text-[#42b883]"></i>
              <h3 class="text-2xl font-bold text-white">Tools & Technologies</h3>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div
              v-for="(skill, index) in toolsSkills"
              :key="skill.name"
              class="group glass rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#42b883]/20 text-center border border-white/5 hover:border-[#42b883]/30 opacity-0 animate-fade-in-up"
              :style="{ animationDelay: `${(index + 12) * 0.1}s` }"
              @mouseenter="animateSkillCard"
            >
              <div class="relative mb-4">
                <div class="w-16 h-16 mx-auto bg-gradient-to-br from-[#42b883]/10 to-[#20a085]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <i :class="skill.icon" class="text-2xl" :style="{ color: skill.color }"></i>
                </div>
                <div class="absolute inset-0 rounded-xl border-2 border-[#42b883]/0 group-hover:border-[#42b883]/30 group-hover:animate-pulse transition-all duration-300"></div>
              </div>
              <h4 class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm mb-3">
                {{ skill.name }}
              </h4>
              
              <div class="relative">
                <div class="bg-gray-800 rounded-full h-2 overflow-hidden mb-1">
                  <div
                    class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-700 relative overflow-hidden"
                    :style="{ width: isVisible ? `${skill.level}%` : '0%' }"
                  >
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
                  </div>
                </div>
                <span class="text-xs text-gray-400 font-medium">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Stats Section -->
      <div class="mt-20 opacity-0 animate-fade-in-up animate-delay-400">
        <div class="text-center mb-12">
          <h3 class="text-2xl font-bold text-white mb-4">By The Numbers</h3>
          <p class="text-gray-400">A snapshot of my development journey</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="text-center glass rounded-2xl p-8 hover:scale-105 transition-all duration-500 border border-white/5 hover:border-[#42b883]/30 group opacity-0 animate-fade-in-up"
            :style="{ animationDelay: `${(index + 18) * 0.1}s` }"
          >
            <div class="relative mb-4">
              <i :class="stat.icon" class="text-3xl text-[#42b883] mb-3 group-hover:scale-110 transition-transform duration-300"></i>
              <div class="text-4xl font-bold text-white mb-2 group-hover:text-[#42b883] transition-colors">
                {{ isVisible ? stat.value : '0' }}
              </div>
            </div>
            <div class="text-gray-400 text-sm font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16 opacity-0 animate-fade-in-up animate-delay-500">
        <p class="text-gray-400 mb-6">Interested in working together?</p>
        <button class="group px-8 py-4 bg-gradient-to-r from-[#42b883] to-[#369870] text-white rounded-full font-medium hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#42b883]/30">
          <span class="flex items-center gap-2">
            <i class="fas fa-paper-plane"></i>
            Let's Connect
            <i class="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

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
const codeSymbols = ref(['</', '/>', '{}', '[]', '()', '=>', '&&', '||', '===', '!=='])

const frontendSkills = ref<Skill[]>([
  { name: 'HTML5', icon: 'fab fa-html5', level: 95, color: '#E34F26' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90, color: '#1572B6' },
  { name: 'JavaScript', icon: 'fab fa-js-square', level: 88, color: '#F7DF1E' },
  { name: 'TypeScript', icon: 'fab fa-js-square', level: 85, color: '#3178C6' },
  { name: 'Vue.js', icon: 'fab fa-vuejs', level: 92, color: '#4FC08D' },
  { name: 'React', icon: 'fab fa-react', level: 80, color: '#61DAFB' },
])

const backendSkills = ref<Skill[]>([
  { name: 'Node.js', icon: 'fab fa-node-js', level: 85, color: '#339933' },
  { name: 'Python', icon: 'fab fa-python', level: 82, color: '#3776AB' },
  { name: 'PHP', icon: 'fab fa-php', level: 78, color: '#777BB4' },
  { name: 'Laravel', icon: 'fab fa-laravel', level: 80, color: '#FF2D20' },
  { name: 'MongoDB', icon: 'fas fa-database', level: 75, color: '#47A248' },
  { name: 'MySQL', icon: 'fas fa-database', level: 85, color: '#4479A1' },
])

const toolsSkills = ref<Skill[]>([
  { name: 'Git', icon: 'fab fa-git-alt', level: 90, color: '#F05032' },
  { name: 'Docker', icon: 'fab fa-docker', level: 75, color: '#2496ED' },
  { name: 'AWS', icon: 'fab fa-aws', level: 70, color: '#FF9900' },
  { name: 'Figma', icon: 'fab fa-figma', level: 85, color: '#F24E1E' },
  { name: 'Webpack', icon: 'fas fa-cube', level: 80, color: '#8DD6F9' },
  { name: 'Vite', icon: 'fas fa-bolt', level: 88, color: '#646CFF' },
])

const stats = ref<Stat[]>([
  { label: 'Projects Completed', value: '50+', icon: 'fas fa-project-diagram' },
  { label: 'Years Experience', value: '3+', icon: 'fas fa-calendar-alt' },
  { label: 'Technologies', value: '20+', icon: 'fas fa-code' },
  { label: 'Happy Clients', value: '30+', icon: 'fas fa-smile' },
])

// Animation functions
const animateSkillCard = () => {
  // Optional: Add subtle interaction feedback
}

const getGridStyle = (index: number, direction: 'vertical' | 'horizontal') => {
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

const getSymbolStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${index * 0.5}s`,
    animationDuration: `${6 + Math.random() * 4}s`,
  }
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true
    }
  })
})

onMounted(() => {
  const element = document.getElementById('skills')
  if (element) {
    observer.observe(element)
  }
})

onUnmounted(() => {
  observer.disconnect()
})
</script>

<style scoped>
/* Load Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Custom animations */
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
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.7;
  }
}

@keyframes shimmer {
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

/* Utility classes */
.animate-gradient-text {
  background: linear-gradient(-45deg, #42b883, #369870, #42b883, #20a085);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-text 3s ease infinite;
}

.animate-float-code {
  animation: float-code 8s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-delay-100 { animation-delay: 0.1s; }
.animate-delay-200 { animation-delay: 0.2s; }
.animate-delay-300 { animation-delay: 0.3s; }
.animate-delay-400 { animation-delay: 0.4s; }
.animate-delay-500 { animation-delay: 0.5s; }

.glass {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.03);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass {
    backdrop-filter: blur(10px);
  }
}
</style>
