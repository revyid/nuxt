<template>
  <footer class="py-12 px-6 border-t border-white/10 section-background">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="card text-center md:text-left">
          <div class="card-glow"></div>
          <h3 class="text-2xl font-bold text-white mb-4">
            Alex<span class="text-[#42b883]">Dev</span>
          </h3>
          <p class="text-gray-400 leading-relaxed">
            Full Stack Developer passionate about creating beautiful and functional web experiences.
          </p>
        </div>
        <div class="card text-center">
          <div class="card-glow"></div>
          <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="item in navItems" :key="item.id">
              <a :href="`#${item.id}`" @click="scrollTo(item.id)" class="text-gray-400 hover:text-[#42b883] transition-colors duration-300">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </div>
        <div class="card text-center md:text-right">
          <div class="card-glow"></div>
          <h4 class="text-lg font-semibold text-white mb-4">Connect With Me</h4>
          <div class="flex justify-center md:justify-end space-x-4">
            <a v-for="social in socialLinks" :key="social.href" :href="social.href" target="_blank" rel="noopener noreferrer" class="group w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#42b883]/20 transition-all duration-300 hover:scale-110">
              <component :is="social.icon" class="w-6 h-6 text-gray-400 group-hover:text-[#42b883] transition-colors" />
            </a>
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p class="text-gray-400 text-sm mb-4 md:mb-0">
          © {{ currentYear }} Alex Developer. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-gray-400 hover:text-[#42b883] transition-colors">Privacy Policy</a>
          <a href="#" class="text-gray-400 hover:text-[#42b883] transition-colors">Terms of Service</a>
        </div>
      </div>
      <button @click="scrollToTop" class="fixed bottom-8 right-8 w-12 h-12 bg-[#42b883] text-white rounded-full shadow-lg hover:bg-[#369870] transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center" :class="{ 'opacity-100 translate-y-0': showBackToTop, 'opacity-0 translate-y-10': !showBackToTop }">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const showBackToTop = ref(false)
const currentYear = computed(() => new Date().getFullYear())
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
]
const socialLinks = [
  { href: 'https://github.com', icon: { template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>` } },
  { href: 'https://linkedin.com', icon: { template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` } },
  { href: 'mailto:alex@example.com', icon: { template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` } },
  { href: 'https://twitter.com', icon: { template: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>` } }
]

const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.card {
  position: relative;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(66, 184, 131, 0.1);
}
</style>
