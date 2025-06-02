<template>
  <section id="projects" class="py-20 px-6 relative">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Featured <span class="text-[#42b883]">Projects</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for development
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.id"
          class="group relative opacity-0 animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div
            class="glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-[#42b883]/10"
          >
            <!-- Project Image -->
            <div class="relative overflow-hidden h-48 bg-gradient-to-br from-gray-800 to-gray-900">
              <div
                class="absolute inset-0 bg-gradient-to-br from-[#42b883]/20 to-transparent"
              ></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div
                  class="w-16 h-16 bg-[#42b883]/20 rounded-full flex items-center justify-center"
                >
                  <svg class="w-8 h-8 text-[#42b883]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Overlay on hover -->
              <div
                class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <div class="flex space-x-4">
                  <button
                    class="px-4 py-2 bg-[#42b883] text-white rounded-lg hover:bg-[#369870] transition-colors"
                  >
                    Live Demo
                  </button>
                  <button
                    class="px-4 py-2 border border-white/30 text-white rounded-lg hover:border-[#42b883] transition-colors"
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <h3
                class="text-xl font-bold text-white mb-2 group-hover:text-[#42b883] transition-colors"
              >
                {{ project.name }}
              </h3>
              <p class="text-gray-400 mb-4 text-sm leading-relaxed">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-white/10 text-[#42b883] text-xs rounded-full border border-[#42b883]/30"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <button
                  class="flex-1 py-2 bg-[#42b883] text-white rounded-lg hover:bg-[#369870] transition-all duration-300 hover:scale-105 text-sm font-medium"
                >
                  View Demo
                </button>
                <button
                  class="px-4 py-2 border border-white/20 text-white rounded-lg hover:border-[#42b883] hover:text-[#42b883] transition-all duration-300 text-sm"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
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
  image?: string
  demoUrl?: string
  codeUrl?: string
}

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    name: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description:
      'A responsive weather dashboard with location-based forecasts, interactive maps, and customizable widgets.',
    technologies: ['Vue.js', 'API Integration', 'Chart.js', 'PWA'],
  },
  {
    id: 4,
    name: 'Social Media Analytics',
    description:
      'Analytics platform for social media management with data visualization, scheduling, and performance tracking.',
    technologies: ['Next.js', 'Python', 'D3.js', 'PostgreSQL'],
  },
  {
    id: 5,
    name: 'Learning Management System',
    description:
      'Educational platform with course management, progress tracking, video streaming, and interactive assessments.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'],
  },
  {
    id: 6,
    name: 'Portfolio Website',
    description:
      'A modern, responsive portfolio website with smooth animations, dark mode, and optimized performance.',
    technologies: ['Vue.js', 'Vite', 'TypeScript', 'Tailwind'],
  },
])
</script>
