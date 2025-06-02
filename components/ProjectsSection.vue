<template>
  <section id="projects" class="relative px-6 overflow-hidden">
    <!-- Gradient overlay for seamless transition -->
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
    <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/0 via-black/30 via-black/50 via-black/70 to-black/100"></div>
    
    <!-- Background elements -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
    
    <!-- Floating particles for continuity -->
    <div class="absolute inset-0 opacity-30">
      <div
        v-for="i in 15"
        :key="`bg-particle-${i}`"
        class="absolute w-1 h-1 bg-[#42b883]/20 rounded-full animate-pulse"
        :style="getBgParticleStyle(i)"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto py-20">
      <!-- Section Header -->
      <div class="text-center mb-16 opacity-0 animate-fade-in-up">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Featured <span class="text-[#42b883] animate-gradient-text">Projects</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Here are some of my recent projects that showcase my skills and passion for development
        </p>
        <div class="w-24 h-1 bg-gradient-to-r from-[#42b883] to-transparent mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="group relative opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div
            class="glass rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-700 hover:shadow-2xl hover:shadow-[#42b883]/20 border border-white/10 hover:border-[#42b883]/30"
            @mouseenter="playHoverEffect"
          >
            <!-- Project Image -->
            <div class="relative overflow-hidden h-64 bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                :src="project.image"
                :alt="project.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              <!-- Image overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <!-- Hover overlay with actions -->
              <div
                class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm"
              >
                <div class="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <button
                    @click="openDemo(project.demoUrl)"
                    class="px-6 py-3 bg-[#42b883] text-white rounded-xl hover:bg-[#369870] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#42b883]/30 font-medium flex items-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Live Demo
                  </button>
                  <button
                    @click="openCode(project.codeUrl)"
                    class="px-6 py-3 border-2 border-white/30 text-white rounded-xl hover:border-[#42b883] hover:text-[#42b883] transition-all duration-300 hover:scale-110 backdrop-blur-sm font-medium flex items-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                    View Code
                  </button>
                </div>
              </div>

              <!-- Project category badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-[#42b883]/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  {{ project.category }}
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-8">
              <div class="flex items-start justify-between mb-4">
                <h3
                  class="text-2xl font-bold text-white group-hover:text-[#42b883] transition-colors duration-300"
                >
                  {{ project.name }}
                </h3>
                <div class="flex items-center gap-2 text-gray-400">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-sm">{{ project.year }}</span>
                </div>
              </div>
              
              <p class="text-gray-400 mb-6 leading-relaxed">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="(tech, techIndex) in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-white/5 text-[#42b883] text-sm rounded-full border border-[#42b883]/20 hover:border-[#42b883]/50 hover:bg-[#42b883]/10 transition-all duration-300 cursor-default transform hover:scale-105"
                  :style="{ animationDelay: `${techIndex * 0.1}s` }"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Project Stats -->
              <div class="flex items-center justify-between text-sm text-gray-500 border-t border-white/10 pt-4">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>{{ project.likes }}</span>
                  </div>
                </div>
                <button
                  class="text-[#42b883] hover:text-[#369870] transition-colors duration-300 flex items-center gap-1 hover:scale-105 transform"
                >
                  Learn More
                  <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16 opacity-0 animate-fade-in-up" style="animation-delay: 0.6s;">
        <p class="text-gray-400 mb-6">Want to see more of my work?</p>
        <button
          class="group px-8 py-4 bg-gradient-to-r from-[#42b883] to-[#369870] text-white rounded-full font-medium hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#42b883]/30"
        >
          <span class="flex items-center gap-2">
            View All Projects
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  image: string
  demoUrl: string
  codeUrl: string
  category: string
  year: string
  likes: number
}

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'A modern, full-stack e-commerce solution featuring secure payment integration, comprehensive admin dashboard, real-time inventory management, and seamless user experience across all devices.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://demo-ecommerce.example.com',
    codeUrl: 'https://github.com/example/ecommerce',
    category: 'Full Stack',
    year: '2024',
    likes: 127
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'An intuitive collaborative task management application with real-time synchronization, drag-and-drop functionality, team collaboration features, and advanced project analytics for enhanced productivity.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Redux'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    demoUrl: 'https://demo-taskmanager.example.com',
    codeUrl: 'https://github.com/example/task-manager',
    category: 'Web App',
    year: '2024',
    likes: 89
  }
])

// Background particle animation
const getBgParticleStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${3 + Math.random() * 2}s`,
  }
}

// Interaction handlers
const playHoverEffect = () => {
  // Optional: Add subtle sound effect or haptic feedback
}

const openDemo = (url?: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}

const openCode = (url?: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
/* Enhanced animations */
@keyframes gradient-text {
  0%, 100% { 
    background-position: 0% 50%; 
  }
  50% { 
    background-position: 100% 50%; 
  }
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.glass {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.02);
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .glass {
    backdrop-filter: blur(10px);
  }
}
</style>
