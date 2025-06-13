<template>
  <nav class="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-white/20 dark:border-slate-700/50 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <a href="#home" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Revy
          </a>
          <div class="hidden md:flex space-x-6">
            <a v-for="item in navItems" :key="item.href" 
               :href="item.href" 
               class="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              {{ item.name }}
            </a>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="toggleTheme" 
                  class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" 
                  class="text-xl text-slate-600 dark:text-slate-300" />
          </button>
          
          <button @click="$emit('toggle-profile')" 
                  class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <Icon name="mdi:account-circle" 
                  class="text-xl text-slate-600 dark:text-slate-300" />
          </button>
          
          <button @click="$emit('toggle-chat')" 
                  class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 relative">
            <Icon name="mdi:chat" 
                  class="text-xl text-slate-600 dark:text-slate-300" />
            <div v-if="hasUnreadMessages" 
                 class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>

          <button @click="toggleMobileMenu" 
                  class="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
            <Icon :name="showMobileMenu ? 'mdi:close' : 'mdi:menu'" 
                  class="text-xl text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      <Transition name="slide-down">
        <div v-if="showMobileMenu" class="md:hidden mt-4 py-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex flex-col space-y-3">
            <a v-for="item in navItems" :key="item.href" 
               :href="item.href" 
               @click="showMobileMenu = false"
               class="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium py-2">
              {{ item.name }}
            </a>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  name: string
  href: string
}

const emit = defineEmits(['toggle-chat', 'toggle-profile'])

const showMobileMenu = ref(false)
const isDark = ref(false)
const hasUnreadMessages = ref(false)

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  isDark.value = savedTheme === 'dark' || (!savedTheme && systemDark)
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }

  const chatMessages = localStorage.getItem('chat-messages')
  if (chatMessages) {
    const messages = JSON.parse(chatMessages)
    hasUnreadMessages.value = messages.some((msg: any) => !msg.read)
  }
})
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
