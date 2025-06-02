<template>
  <section id="contact" class="py-20 px-6 relative">
    <div class="max-w-4xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">
          Get In <span class="text-[#42b883]">Touch</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">
          Have a project in mind? Let's work together to create something amazing.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="opacity-0 animate-fade-in-left animate-delay-100">
          <h3 class="text-2xl font-bold text-white mb-6">Let's Talk</h3>
          <p class="text-gray-400 mb-8 leading-relaxed">
            I'm always interested in hearing about new opportunities and exciting projects. Whether
            you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <!-- Contact Methods -->
          <div class="space-y-6">
            <div class="flex items-center space-x-4 group">
              <div
                class="w-12 h-12 bg-[#42b883]/20 rounded-full flex items-center justify-center group-hover:bg-[#42b883]/30 transition-colors"
              >
                <svg
                  class="w-6 h-6 text-[#42b883]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-white">Email</h4>
                <p class="text-gray-400">alex@example.com</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 group">
              <div
                class="w-12 h-12 bg-[#42b883]/20 rounded-full flex items-center justify-center group-hover:bg-[#42b883]/30 transition-colors"
              >
                <svg
                  class="w-6 h-6 text-[#42b883]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-white">Location</h4>
                <p class="text-gray-400">Jakarta, Indonesia</p>
              </div>
            </div>

            <div class="flex items-center space-x-4 group">
              <div
                class="w-12 h-12 bg-[#42b883]/20 rounded-full flex items-center justify-center group-hover:bg-[#42b883]/30 transition-colors"
              >
                <svg
                  class="w-6 h-6 text-[#42b883]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-white">Response Time</h4>
                <p class="text-gray-400">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="opacity-0 animate-fade-in-right animate-delay-200">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] focus:ring-1 focus:ring-[#42b883] transition-all duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] focus:ring-1 focus:ring-[#42b883] transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-gray-300 mb-2"
                >Subject</label
              >
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] focus:ring-1 focus:ring-[#42b883] transition-all duration-300"
                placeholder="Project Discussion"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2"
                >Message</label
              >
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                required
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#42b883] focus:ring-1 focus:ring-[#42b883] transition-all duration-300 resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-8 py-4 bg-[#42b883] text-white rounded-lg font-medium hover:bg-[#369870] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#42b883]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center space-x-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                    fill="none"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Sending...</span>
              </span>
            </button>
          </form>

          <!-- Success Message -->
          <div
            v-if="showSuccess"
            class="mt-6 p-4 bg-[#42b883]/20 border border-[#42b883]/50 rounded-lg text-[#42b883] text-center"
          >
            Thanks for your message! I'll get back to you soon.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Reset form
  Object.keys(form).forEach((key) => {
    form[key as keyof typeof form] = ''
  })

  isSubmitting.value = false
  showSuccess.value = true

  // Hide success message after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}
</script>
