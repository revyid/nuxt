<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.2),transparent_50%)]"></div>
    
    <NavBar @toggle-chat="toggleChat" @toggle-profile="toggleProfile" />

    <main class="relative z-10">
      <section id="home" class="min-h-screen flex items-center justify-center px-6">
        <div class="text-center max-w-4xl mx-auto">
          <div class="mb-8 transform transition-all duration-1000" :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
            <h1 class="text-6xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-6">
              Revy
            </h1>
            <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Passionate Developer & Digital Creator
            </p>
            <div class="flex gap-4 justify-center">
              <button @click="scrollTo('projects')" class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-semibold neumorphic-active">
                View My Work
              </button>
              <button @click="scrollTo('about')" class="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:-translate-y-1 transition-all duration-300 font-semibold neumorphic">
                About Me
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-6xl mx-auto">
          <div class="transform transition-all duration-1000" :class="aboutVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
            <h2 class="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div class="space-y-6">
                <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  I'm a passionate developer who loves creating beautiful and functional digital experiences. With expertise in modern web technologies, I bring ideas to life through clean code and innovative design.
                </p>
                <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.
                </p>
              </div>
              <div class="neumorphic dark:neumorphic-dark p-8 rounded-2xl">
                <h3 class="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Skills & Technologies</h3>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="skill in skills" :key="skill" class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                    <span class="text-slate-600 dark:text-slate-300">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" class="min-h-screen flex items-center justify-center px-6 py-20">
        <div class="max-w-6xl mx-auto">
          <div class="transform transition-all duration-1000" :class="projectsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'">
            <h2 class="text-4xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="project in projects" :key="project.id"
                   class="group neumorphic dark:neumorphic-dark hover:neumorphic-hover dark:hover:neumorphic-dark-hover rounded-2xl p-6 transition-all duration-500">
                <div class="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Icon :name="project.icon" class="text-6xl text-white" />
                </div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">{{ project.title }}</h3>
                <p class="text-slate-600 dark:text-slate-300 mb-4">{{ project.description }}</p>
                <div class="flex gap-2 flex-wrap">
                  <span v-for="tech in project.tech" :key="tech"
                        class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
    <SpotifyPlayer />

    <Transition name="fade">
      <ChatPanel v-if="showChat" @close="toggleChat" />
    </Transition>

    <Transition name="fade">
      <UserProfile v-if="showProfile" @close="toggleProfile" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, nextTick } from 'vue'
import { useHead } from '#imports'

const NavBar = defineAsyncComponent(() => import('~/components/NavBar.vue'))
const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
const SpotifyPlayer = defineAsyncComponent(() => import('~/components/SpotifyPlayer.vue'))
const ChatPanel = defineAsyncComponent(() => import('~/components/ChatPanel.vue'))
const UserProfile = defineAsyncComponent(() => import('~/components/UserProfile.vue'))

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  icon: string
}

const heroVisible = ref(false)
const aboutVisible = ref(false)
const projectsVisible = ref(false)
const showChat = ref(false)
const showProfile = ref(false)

const skills = [
  'Vue.js', 'Nuxt.js', 'TypeScript', 'Node.js',
  'Python', 'PostgreSQL', 'Firebase', 'Tailwind CSS'
]

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution built with Nuxt.js and Stripe integration.',
    tech: ['Nuxt.js', 'TypeScript', 'Stripe', 'Tailwind'],
    icon: 'mdi:shopping'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates and team features.',
    tech: ['Vue.js', 'Firebase', 'Vuetify', 'PWA'],
    icon: 'mdi:clipboard-check'
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Personal portfolio showcasing projects and skills with modern design.',
    tech: ['Nuxt.js', 'TailwindCSS', 'TypeScript'],
    icon: 'mdi:account-box'
  }
]

const scrollTo = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: 'smooth'
  })
}

const toggleChat = () => {
  showChat.value = !showChat.value
  if (showProfile.value) showProfile.value = false
}

const toggleProfile = () => {
  showProfile.value = !showProfile.value
  if (showChat.value) showChat.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'home') heroVisible.value = true
        if (entry.target.id === 'about') aboutVisible.value = true
        if (entry.target.id === 'projects') projectsVisible.value = true
      }
    })
  }, { threshold: 0.3 })

  nextTick(() => {
    const sections = ['home', 'about', 'projects']
    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
  })

  heroVisible.value = true
})

useHead({
  title: 'Revy - Portfolio',
  meta: [
    { name: 'description', content: 'Passionate Developer & Digital Creator' }
  ]
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.neumorphic {
  background: #e6e7ee;
  box-shadow: 8px 8px 15px #c4c4ca, -8px -8px 15px #ffffff;
}

.neumorphic-dark {
  background: #2d3748;
  box-shadow: 8px 8px 15px #1a202c, -8px -8px 15px #4a5568;
}

.neumorphic-hover {
  box-shadow: 4px 4px 8px #c4c4ca, -4px -4px 8px #ffffff;
}

.neumorphic-dark-hover {
  box-shadow: 4px 4px 8px #1a202c, -4px -4px 8px #4a5568;
}

.neumorphic-active {
  box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.1);
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
