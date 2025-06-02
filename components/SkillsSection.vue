<template>
  <section id="skills" class="py-20 px-6 relative">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Skills & <span class="text-[#42b883]">Technologies</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>
      </div>

      <!-- Skills Categories -->
      <div class="space-y-12">
        <!-- Frontend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-100">
          <h3 class="text-2xl font-bold text-white mb-6 text-center">Frontend Development</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div
              v-for="skill in frontendSkills"
              :key="skill.name"
              class="group glass rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#42b883]/10 text-center"
            >
              <div class="w-12 h-12 mx-auto mb-3 text-4xl flex items-center justify-center">
                {{ skill.icon }}
              </div>
              <h4
                class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm"
              >
                {{ skill.name }}
              </h4>
              <div class="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-300"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Backend -->
        <div class="opacity-0 animate-fade-in-up animate-delay-200">
          <h3 class="text-2xl font-bold text-white mb-6 text-center">Backend Development</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div
              v-for="skill in backendSkills"
              :key="skill.name"
              class="group glass rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#42b883]/10 text-center"
            >
              <div class="w-12 h-12 mx-auto mb-3 text-4xl flex items-center justify-center">
                {{ skill.icon }}
              </div>
              <h4
                class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm"
              >
                {{ skill.name }}
              </h4>
              <div class="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-500"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tools & Others -->
        <div class="opacity-0 animate-fade-in-up animate-delay-300">
          <h3 class="text-2xl font-bold text-white mb-6 text-center">Tools & Others</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div
              v-for="skill in toolsSkills"
              :key="skill.name"
              class="group glass rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-[#42b883]/10 text-center"
            >
              <div class="w-12 h-12 mx-auto mb-3 text-4xl flex items-center justify-center">
                {{ skill.icon }}
              </div>
              <h4
                class="font-semibold text-white group-hover:text-[#42b883] transition-colors text-sm"
              >
                {{ skill.name }}
              </h4>
              <div class="mt-2 bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  class="bg-gradient-to-r from-[#42b883] to-[#20a085] h-full rounded-full transition-all duration-1000 delay-700"
                  :style="{ width: `${skill.level}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div
        class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-0 animate-fade-in-up animate-delay-400"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center glass rounded-xl p-6 hover:scale-105 transition-all duration-300"
        >
          <div class="text-3xl font-bold text-[#42b883] mb-2">{{ stat.value }}</div>
          <div class="text-gray-400 text-sm">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Skill {
  name: string
  icon: string
  level: number
}

interface Stat {
  label: string
  value: string
}

const frontendSkills = ref<Skill[]>([
  { name: 'HTML5', icon: '🌐', level: 95 },
  { name: 'CSS3', icon: '🎨', level: 90 },
  { name: 'JavaScript', icon: '⚡', level: 88 },
  { name: 'TypeScript', icon: '📘', level: 85 },
  { name: 'Vue.js', icon: '💚', level: 92 },
  { name: 'React', icon: '⚛️', level: 80 },
])

const backendSkills = ref<Skill[]>([
  { name: 'Node.js', icon: '🚀', level: 85 },
  { name: 'Python', icon: '🐍', level: 82 },
  { name: 'PHP', icon: '🐘', level: 78 },
  { name: 'Laravel', icon: '🔥', level: 80 },
  { name: 'MongoDB', icon: '🍃', level: 75 },
  { name: 'MySQL', icon: '🗃️', level: 85 },
])

const toolsSkills = ref<Skill[]>([
  { name: 'Git', icon: '📚', level: 90 },
  { name: 'Docker', icon: '🐳', level: 75 },
  { name: 'AWS', icon: '☁️', level: 70 },
  { name: 'Figma', icon: '🎯', level: 85 },
  { name: 'Webpack', icon: '📦', level: 80 },
  { name: 'Vite', icon: '⚡', level: 88 },
])

const stats = ref<Stat[]>([
  { label: 'Projects Completed', value: '50+' },
  { label: 'Years Experience', value: '3+' },
  { label: 'Technologies', value: '20+' },
  { label: 'Happy Clients', value: '30+' },
])
</script>
