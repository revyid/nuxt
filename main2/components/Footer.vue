<template>
  <footer class="relative z-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-white/20 dark:border-slate-700/50">
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Revy
          </h3>
          <p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Passionate developer creating beautiful and functional digital experiences. 
            Always learning, always building, always pushing the boundaries of what's possible.
          </p>
          <div class="flex space-x-4">
            <a v-for="social in socialLinks" :key="social.name"
               :href="social.url" 
               target="_blank"
               rel="noopener noreferrer"
               class="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-full transition-all duration-200 hover:-translate-y-1 group">
              <Icon :name="social.icon" 
                    class="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Quick Links</h4>
          <div class="space-y-2">
            <a v-for="link in quickLinks" :key="link.name"
               :href="link.href"
               class="block text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              {{ link.name }}
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Get in Touch</h4>
          <div class="space-y-3">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:email" class="text-slate-500 dark:text-slate-400" />
              <span class="text-slate-600 dark:text-slate-300">hello@revy.my.id</span>
            </div>
            <div class="flex items-center space-x-3">
              <Icon name="mdi:map-marker" class="text-slate-500 dark:text-slate-400" />
              <span class="text-slate-600 dark:text-slate-300">Indonesia</span>
            </div>
            <div class="flex items-center space-x-3">
              <Icon name="mdi:phone" class="text-slate-500 dark:text-slate-400" />
              <span class="text-slate-600 dark:text-slate-300">Available for projects</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="flex items-center space-x-6">
            <p class="text-slate-500 dark:text-slate-400 text-sm">
              © {{ currentYear }} Revy. All rights reserved.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" class="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <span>Built with</span>
            <Icon name="mdi:heart" class="text-red-500 animate-pulse" />
            <span>using Nuxt.js & TailwindCSS</span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
  </footer>
</template>

<script setup lang="ts">
interface SocialLink {
  name: string
  url: string
  icon: string
}

interface QuickLink {
  name: string
  href: string
}

const currentYear = new Date().getFullYear()

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/revy',
    icon: 'mdi:github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/revy',
    icon: 'mdi:linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/revy',
    icon: 'mdi:twitter'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/revy',
    icon: 'mdi:instagram'
  }
]

const quickLinks: QuickLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' }
]
</script>
