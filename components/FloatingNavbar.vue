<template>
  <!-- Enhanced Navigation with AI Chat Toggle -->
  <nav 
    class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-500 ease-out"
    :class="{ 
      'translate-y-0 opacity-100': isNavVisible, 
      '-translate-y-20 opacity-0': !isNavVisible 
    }"
  >
    <div class="flex items-center space-x-4">
      <!-- Main Navigation -->
      <div class="glass-enhanced rounded-full px-6 md:px-8 py-3 md:py-4 shadow-2xl backdrop-blur-xl border border-white/20">
        <ul class="flex items-center space-x-4 md:space-x-8 text-xs md:text-sm font-semibold">
          <li v-for="item in navItems" :key="item.id">
            <a 
              :href="`#${item.id}`" 
              @click="scrollTo(item.id)"
              class="relative text-white/80 hover:text-[#42b883] transition-all duration-300 hover:scale-110 transform group whitespace-nowrap"
            >
              {{ item.label }}
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#42b883] to-[#35495e] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </div>

      <!-- AI Chat Toggle Button -->
      <button
        @click="toggleChat"
        class="glass-enhanced w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl hover:shadow-[#42b883]/25 transition-all duration-300 hover:scale-110 transform flex items-center justify-center group border border-white/20"
        :class="{ 'bg-gradient-to-r from-[#42b883] to-[#35495e]': isChatOpen, 'hover:bg-white/10': !isChatOpen }"
        title="AI Assistant"
      >
        <svg 
          v-if="!isChatOpen" 
          class="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <svg 
          v-else 
          class="w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </nav>
<!-- AI Chat Interface - Modern Popup Style -->
<teleport to="body">
  <transition 
    name="chat-popup" 
    @after-enter="onChatEnter" 
    @after-leave="onChatLeave"
  >
    <div 
      v-if="isChatOpen"
      class="fixed top-24 left-1/2 -translate-x-1/2 z-[90] w-80 sm:w-96 h-[32rem] max-h-[80vh]"
    >
      <!-- Chat Window -->
      <div 
        class="bg-black/95 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full"
        style="transform: translateZ(0); will-change: transform, opacity;"
      >
        <!-- Chat Header -->
        <div class="bg-gradient-to-r from-[#42b883] to-[#35495e] px-4 py-3 flex items-center justify-between shrink-0">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h3 class="text-white font-medium text-sm">AI Assistant</h3>
            <span class="text-white/70 text-xs">Online</span>
          </div>
          <div class="flex items-center space-x-1">
            <button 
              @click="clearChat"
              class="text-white/70 hover:text-white transition-colors duration-200 p-1.5 rounded-md hover:bg-white/10"
              title="Clear Chat"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Welcome Message (when chat is empty) -->
        <div v-if="chatHistory.length === 0" class="flex-1 flex items-center justify-center p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-[#42b883] to-[#35495e] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-4.126-1.004L3 21l1.996-5.874C4.371 13.82 4 12.443 4 11c0-4.418 3.582-8 8-8s8 3.582 8 8z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-2">Hi there! 👋</h4>
            <p class="text-white/70 text-sm">How can I help you today?</p>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div 
          v-else
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 scroll-smooth"
          style="scrollbar-width: thin; scrollbar-color: #4a5568 transparent;"
        >
          <div 
            v-for="(message, index) in chatHistory" 
            :key="`msg-${index}-${message.timestamp}`"
            class="message-container transition-opacity duration-200"
            :class="message.role === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div 
              class="max-w-[85%] px-3 py-2 rounded-2xl relative group transition-all duration-200"
              :class="message.role === 'user' 
                ? 'bg-gradient-to-r from-[#42b883] to-[#35495e] text-white rounded-br-md' 
                : 'bg-white/10 text-white hover:bg-white/15 rounded-bl-md'"
            >
              <!-- Message Content -->
              <div 
                class="message-content text-sm leading-relaxed"
                v-html="formatMessage(message.displayContent || message.content)"
              ></div>
              
              <!-- Message Actions -->
              <div class="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  v-if="message.role === 'assistant'"
                  @click="copyMessage(message.content)"
                  class="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded bg-black/20 hover:bg-black/40"
                  title="Copy message"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isAiTyping" class="flex justify-start">
            <div class="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-[#42b883] rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-[#42b883] rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-[#42b883] rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="p-4 border-t border-white/10 shrink-0">
          <div class="flex space-x-3">
            <input
              v-model="currentMessage"
              @keypress.enter="sendMessage"
              @keydown.escape="toggleChat"
              placeholder="Type a message..."
              class="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#42b883] focus:ring-2 focus:ring-[#42b883]/30 transition-all duration-200"
              :disabled="isAiTyping"
              ref="chatInput"
            />
            <button
              @click="sendMessage"
              :disabled="!currentMessage.trim() || isAiTyping"
              class="bg-gradient-to-r from-[#42b883] to-[#35495e] text-white p-2.5 rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              <svg v-if="!isAiTyping" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <div v-else class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, computed } from 'vue'

// Navigation state
const isNavVisible = ref(true)
const navItems = ref([
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
])

// Chat state
const isChatOpen = ref(false)
const chatHistory = ref<Array<{
  role: 'user' | 'assistant'
  content: string
  displayContent?: string
  timestamp: number
}>>([])
const currentMessage = ref('')
const isAiTyping = ref(false)
const chatContainer = ref<HTMLElement>()
const chatInput = ref<HTMLInputElement>()

// Responsive state
const isMobile = ref(false)

// Computed properties for positioning
const chatPositionClasses = computed(() => {
  if (isMobile.value) {
    return 'inset-0'
  } else {
    return 'top-28 right-4 bottom-4'
  }
})

const chatContainerClasses = computed(() => {
  if (isMobile.value) {
    return 'h-full w-full rounded-none'
  } else {
    return 'h-full w-96 rounded-2xl max-h-[calc(100vh-8rem)]'
  }
})

// Environment variables
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

// System prompt for AI personality
const SYSTEM_PROMPT = `You are a sophisticated AI assistant integrated into a modern developer's portfolio website. Your core responsibilities include:

**Portfolio Expertise:**
- Detailed knowledge of web development technologies (Vue.js, React, JavaScript, TypeScript, CSS, HTML)
- Understanding of modern development practices, tools, and frameworks
- Ability to explain complex technical concepts in accessible terms

**Professional Assistance:**
- Help visitors understand the developer's skills, projects, and technical expertise
- Provide insights on web development best practices and industry trends
- Offer guidance on project architecture, implementation strategies, and code optimization
- Assist with debugging, code reviews, and technical problem-solving

**Communication Style:**
- Professional yet approachable and conversational
- Provide detailed, well-structured responses with practical examples
- Use markdown formatting for better readability (code blocks, lists, emphasis)
- Be encouraging and supportive while maintaining technical accuracy
- Keep responses concise but informative (aim for 2-4 paragraphs unless asked for more detail)

**Key Guidelines:**
- Always provide working code examples when relevant
- Reference modern web development practices and current industry standards
- Explain the "why" behind technical decisions, not just the "how"
- Offer multiple solutions when appropriate, explaining trade-offs
- Stay current with emerging technologies and development trends

**Context Awareness:**
You're currently integrated into a Vue.js portfolio featuring modern responsive design, glassmorphism UI elements, and advanced interactive features. The site demonstrates expertise in modern web technologies and user experience design.

Remember: You're not just answering questions - you're representing professional development expertise and helping visitors understand the quality and depth of technical knowledge showcased in this portfolio.`

let lastScrollY = 0
let scrollTimeoutId: number | null = null

// Optimized navigation scroll handler
const handleScroll = () => {
  if (scrollTimeoutId) {
    cancelAnimationFrame(scrollTimeoutId)
  }
  
  scrollTimeoutId = requestAnimationFrame(() => {
    const currentScrollY = window.scrollY
    const scrollDelta = Math.abs(currentScrollY - lastScrollY)
    
    if (scrollDelta > 5) {
      isNavVisible.value = currentScrollY < lastScrollY || currentScrollY < 100
      lastScrollY = currentScrollY
    }
  })
}

// Responsive detection
const updateResponsiveState = () => {
  isMobile.value = window.innerWidth < 1024
}

// Smooth scroll to section
const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Chat lifecycle handlers
const onChatEnter = () => {
  nextTick(() => {
    if (chatInput.value) {
      chatInput.value.focus()
    }
    scrollToBottom()
  })
}

const onChatLeave = () => {
  // Cleanup when chat closes
}

// Chat functionality
const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value && chatHistory.value.length === 0) {
    // Welcome message
    setTimeout(() => {
      addAssistantMessage("👋 Hello! I'm your AI assistant. I can help you with web development questions, explain the projects showcased here, discuss modern development practices, or assist with any coding challenges. What would you like to explore?")
    }, 100)
  }
}

const addAssistantMessage = (content: string) => {
  const message = {
    role: 'assistant' as const,
    content,
    displayContent: content,
    timestamp: Date.now()
  }
  
  chatHistory.value.push(message)
  saveChatHistory()
  
  // Force re-render and scroll
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isAiTyping.value) return

  // Check if API key is configured
  if (!OPENROUTER_API_KEY) {
    addAssistantMessage("⚠️ OpenRouter API key is not configured. Please add VITE_OPENROUTER_API_KEY to your .env file.")
    return
  }

  const userMessage = {
    role: 'user' as const,
    content: currentMessage.value.trim(),
    timestamp: Date.now()
  }

  // Add user message immediately
  chatHistory.value.push(userMessage)
  const messageToSend = currentMessage.value.trim()
  currentMessage.value = ''
  
  // Force scroll after user message
  nextTick(() => {
    scrollToBottom()
  })

  isAiTyping.value = true

  try {
    // Prepare messages for API
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory.value.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ]

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Portfolio AI Assistant'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat:free',
        messages,
        temperature: 0.7,
        max_tokens: 1200,
        stream: false
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't process your request."
    
    // Add AI response
    addAssistantMessage(aiResponse)
    
  } catch (error) {
    console.error('Error calling OpenRouter API:', error)
    let errorMessage = "Sorry, I'm experiencing some technical difficulties. "
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        errorMessage += "Please check your API key configuration."
      } else if (error.message.includes('429')) {
        errorMessage += "Rate limit reached. Please try again in a moment."
      } else if (error.message.includes('403')) {
        errorMessage += "Access denied. Please verify your API key permissions."
      } else {
        errorMessage += "Please try again later."
      }
    }
    
    addAssistantMessage(errorMessage)
  } finally {
    isAiTyping.value = false
    saveChatHistory()
  }
}

const formatMessage = (content: string) => {
  if (!content) return ''
  
  // Enhanced markdown-like formatting
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#42b883]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-white/20 px-1.5 py-0.5 rounded text-sm font-mono text-[#42b883]">$1</code>')
    .replace(/```(\w+)?\n?([\s\S]*?)```/g, '<pre class="bg-white/10 p-3 rounded-lg mt-2 mb-2 overflow-x-auto border border-white/10"><code class="text-sm font-mono whitespace-pre-wrap">$2</code></pre>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-3 mb-2 text-[#42b883]">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2 text-[#42b883]">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-3 text-[#42b883]">$1</h1>')
    .replace(/^\- (.*$)/gm, '<li class="ml-4 list-disc list-inside">$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal list-inside">$1</li>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}

const copyMessage = async (content: string) => {
  try {
    await navigator.clipboard.writeText(content)
    // Visual feedback could be added here
  } catch (err) {
    console.error('Failed to copy text: ', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = content
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

const clearChat = () => {
  chatHistory.value = []
  localStorage.removeItem('portfolio-chat-history')
  setTimeout(() => {
    addAssistantMessage("🔄 Chat cleared! Ready for a fresh conversation. How can I assist you today?")
  }, 100)
}

const saveChatHistory = () => {
  try {
    const historyToSave = chatHistory.value.map(msg => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp
    }))
    localStorage.setItem('portfolio-chat-history', JSON.stringify(historyToSave))
  } catch (error) {
    console.error('Error saving chat history:', error)
  }
}

const loadChatHistory = () => {
  try {
    const saved = localStorage.getItem('portfolio-chat-history')
    if (saved) {
      const history = JSON.parse(saved)
      chatHistory.value = history.map((msg: any) => ({
        ...msg,
        displayContent: msg.content
      }))
    }
  } catch (error) {
    console.error('Error loading chat history:', error)
  }
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    requestAnimationFrame(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateResponsiveState, { passive: true })
  updateResponsiveState()
  loadChatHistory()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateResponsiveState)
  if (scrollTimeoutId) {
    cancelAnimationFrame(scrollTimeoutId)
  }
})

// Watch for chat changes
watch(() => chatHistory.value.length, () => {
  nextTick(() => {
    scrollToBottom()
  })
}, { flush: 'post' })
</script>

<style scoped>
.glass-enhanced {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.message-container {
  display: flex;
  align-items: flex-end;
}

.message-content {
  word-wrap: break-word;
  line-height: 1.6;
  overflow-wrap: break-word;
}

.message-content code {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.message-content pre {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.message-content h1,
.message-content h2,
.message-content h3 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.message-content li {
  margin-bottom: 0.25rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.chat-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.9);
}

/* Custom scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Performance optimizations */
.glass-enhanced,
.message-container,
button {
  will-change: transform;
  transform: translateZ(0);
}

/* Mobile optimizations */
@media (max-width: 1023px) {
  .glass-enhanced {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}

/* Prevent layout shift */
nav {
  contain: layout style paint;
}

/* Focus styles */
input:focus {
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.3);
}

/* Optimized Animations */
.chat-slide-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.chat-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.chat-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Smooth Scrollbar */
.scroll-smooth::-webkit-scrollbar {
  width: 4px;
}

.scroll-smooth::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-smooth::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.scroll-smooth::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Performance Optimizations */
.message-container {
  contain: layout;
  transform: translateZ(0);
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce,
  .animate-pulse,
  .animate-spin {
    animation: none;
  }
  
  .transition-all,
  .transition-opacity,
  .transition-colors {
    transition: none;
  }
}



.chat-popup-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-popup-leave-active {
  transition: all 0.25s cubic-bezier(0.5, 0, 0.75, 0);
}

.chat-popup-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.chat-popup-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

/* Toggle Button Animation */
.fixed button {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Dark Theme Scrollbar */
.scroll-smooth::-webkit-scrollbar {
  width: 4px;
}

.scroll-smooth::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-smooth::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 2px;
}

.scroll-smooth::-webkit-scrollbar-thumb:hover {
  background: #718096;
}

/* Performance Optimizations */
.message-container {
  contain: layout;
  transform: translateZ(0);
}

/* Bubble Chat Style */
.message-container:first-child .group:first-child {
  margin-top: 0;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce,
  .animate-pulse,
  .animate-spin {
    animation: none;
  }
  
  .transition-all,
  .transition-opacity,
  .transition-colors {
    transition: none;
  }
  
  .chat-popup-enter-active,
  .chat-popup-leave-active {
    transition: opacity 0.2s;
  }
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .fixed.bottom-24.right-6 {
    bottom: 6rem;
    right: 1rem;
    left: 1rem;
    width: auto;
  }
  
  .fixed.bottom-6.right-6 {
    bottom: 1.5rem;
    right: 1rem;
  }
}
</style>
