<template>
  <div class="fixed right-0 top-0 h-full w-96 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-l border-white/20 dark:border-slate-700/50 shadow-2xl z-50">
    <div class="flex flex-col h-full">
      <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200">AI Assistant</h3>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="clearChat" 
                  class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
            <Icon name="mdi:delete" class="text-slate-500 dark:text-slate-400" />
          </button>
          <button @click="$emit('close')" 
                  class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors duration-200">
            <Icon name="mdi:close" class="text-slate-500 dark:text-slate-400" />
          </button>
        </div>
      </div>

      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-if="messages.length === 0" class="text-center py-8">
          <Icon name="mdi:robot" class="text-6xl text-slate-300 dark:text-slate-600 mb-4" />
          <p class="text-slate-500 dark:text-slate-400 mb-2">Hi! I'm your AI assistant.</p>
          <p class="text-sm text-slate-400 dark:text-slate-500">Ask me anything about Revy's work or projects!</p>
        </div>

        <div v-for="message in messages" :key="message.id" 
             class="animate-fade-in"
             :class="message.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
          <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl"
               :class="message.role === 'user' 
                 ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                 : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'">
            <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
            <p class="text-xs opacity-70 mt-1">{{ formatTime(message.timestamp) }}</p>
          </div>
        </div>

        <div v-if="isLoading" class="flex justify-start">
          <div class="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
              <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-slate-200 dark:border-slate-700">
        <div class="flex space-x-2">
          <input v-model="newMessage" 
                 @keyup.enter="sendMessage"
                 :disabled="isLoading"
                 placeholder="Type your message..."
                 class="flex-1 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50">
          <button @click="sendMessage" 
                  :disabled="!newMessage.trim() || isLoading"
                  class="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name="mdi:send" class="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const emit = defineEmits(['close'])

const messages = ref<Message[]>([])
const newMessage = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement>()

const systemPrompt = `You are an AI assistant for Revy's portfolio website. You are knowledgeable about:
- Revy's skills in Vue.js, Nuxt.js, TypeScript, Node.js, Python, PostgreSQL, Firebase, and Tailwind CSS
- The projects showcased on the portfolio including e-commerce platform, task management app, and portfolio website
- Modern web development practices and technologies
- Providing helpful advice about web development and programming

Keep responses concise, friendly, and professional. Focus on being helpful while maintaining Revy's professional image.`

const sendMessage = async () => {
  if (!newMessage.value.trim() || isLoading.value) return

  const userMessage: Message = {
    id: Date.now().toString(),
    role: 'user',
    content: newMessage.value,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  newMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.value.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: data.choices[0].message.content,
      timestamp: new Date()
    }

    messages.value.push(assistantMessage)
  } catch (error) {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please try again later.',
      timestamp: new Date()
    }
    messages.value.push(errorMessage)
  } finally {
    isLoading.value = false
    scrollToBottom()
    saveMessages()
  }
}

const clearChat = () => {
  messages.value = []
  localStorage.removeItem('chat-messages')
}

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const saveMessages = () => {
  localStorage.setItem('chat-messages', JSON.stringify(messages.value))
}

const loadMessages = () => {
  const saved = localStorage.getItem('chat-messages')
  if (saved) {
    messages.value = JSON.parse(saved).map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }))
  }
}

onMounted(() => {
  loadMessages()
  scrollToBottom()
})

watch(messages, scrollToBottom, { deep: true })
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
