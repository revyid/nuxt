<template>
  <section id="contact" class="py-20 px-6 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-orb floating-orb-1"></div>
      <div class="floating-orb floating-orb-2"></div>
      <div class="floating-orb floating-orb-3"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="max-w-4xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <div class="inline-block mb-4">
          <div class="pulse-ring"></div>
          <div class="pulse-ring pulse-ring-delay-1"></div>
          <div class="pulse-ring pulse-ring-delay-2"></div>
        </div>
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white typing-effect">
          Get In <span class="text-[#42b883] glow-text">Touch</span>
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto slide-in-text">
          Have a project in mind? Let's work together to create something amazing.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div class="contact-info-card">
          <div class="card-glow"></div>
          <h3 class="text-2xl font-bold text-white mb-6 shimmer-text">Let's Talk</h3>
          <p class="text-gray-400 mb-8 leading-relaxed">
            I'm always interested in hearing about new opportunities and exciting projects. Whether
            you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <!-- Contact Methods -->
          <div class="space-y-6">
            <div 
              v-for="(item, index) in contactMethods" 
              :key="index"
              class="contact-item" 
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <div class="contact-icon-wrapper">
                <div class="contact-icon">
                  <component :is="item.icon" class="w-6 h-6 text-[#42b883]" />
                </div>
                <div class="icon-ripple"></div>
              </div>
              <div>
                <h4 class="font-semibold text-white">{{ item.title }}</h4>
                <p class="text-gray-400">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-card">
          <div class="form-glow"></div>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="input-group" :class="{ 'focused': focusedField === 'name' }">
                <label for="name" class="input-label">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  @focus="focusedField = 'name'"
                  @blur="focusedField = ''"
                  class="custom-input"
                  placeholder="Your Name"
                />
                <div class="input-line"></div>
              </div>
              <div class="input-group" :class="{ 'focused': focusedField === 'email' }">
                <label for="email" class="input-label">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  @focus="focusedField = 'email'"
                  @blur="focusedField = ''"
                  class="custom-input"
                  placeholder="your@email.com"
                />
                <div class="input-line"></div>
              </div>
            </div>

            <div class="input-group" :class="{ 'focused': focusedField === 'subject' }">
              <label for="subject" class="input-label">Subject</label>
              <input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                @focus="focusedField = 'subject'"
                @blur="focusedField = ''"
                class="custom-input"
                placeholder="Project Discussion"
              />
              <div class="input-line"></div>
            </div>

            <div class="input-group" :class="{ 'focused': focusedField === 'message' }">
              <label for="message" class="input-label">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                required
                @focus="focusedField = 'message'"
                @blur="focusedField = ''"
                class="custom-input resize-none"
                placeholder="Tell me about your project..."
              ></textarea>
              <div class="input-line"></div>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="submit-button"
              :class="{ 'submitting': isSubmitting }"
            >
              <div class="button-content">
                <span v-if="!isSubmitting" class="button-text">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Send Message
                </span>
                <span v-else class="button-text">
                  <div class="loading-spinner"></div>
                  Sending...
                </span>
              </div>
              <div class="button-ripple"></div>
            </button>
          </form>

          <!-- Success Message -->
          <Transition name="success">
            <div v-if="showSuccess" class="success-message">
              <div class="success-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Message Sent Successfully!</h4>
                <p class="text-sm opacity-90">Thanks for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            </div>
          </Transition>

          <!-- Error Message -->
          <Transition name="error">
            <div v-if="showError" class="error-message">
              <div class="error-icon">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold">Failed to Send Message</h4>
                <p class="text-sm opacity-90">{{ errorMessage }}</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Types
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactMethod {
  title: string
  value: string
  icon: string
}

// Contact methods data
const contactMethods: ContactMethod[] = [
  {
    title: 'Email',
    value: 'alex@example.com',
    icon: 'IconMail'
  },
  {
    title: 'Location',
    value: 'Jakarta, Indonesia',
    icon: 'IconMapPin'
  },
  {
    title: 'Response Time',
    value: 'Within 24 hours',
    icon: 'IconClock'
  }
]

// Form reactive data
const form = reactive<ContactFormData>({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// Component state
const focusedField = ref<string>('')
const isSubmitting = ref<boolean>(false)
const showSuccess = ref<boolean>(false)
const showError = ref<boolean>(false)
const errorMessage = ref<string>('')

// Form validation
const validateForm = (formData: ContactFormData): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return !!(
    formData.name?.trim() &&
    formData.email?.trim() &&
    emailRegex.test(formData.email) &&
    formData.subject?.trim() &&
    formData.message?.trim()
  )
}

const isFormValid = computed(() => validateForm(form))

// Form submission simulation
const submitForm = async (formData: ContactFormData): Promise<boolean> => {
  try {
    isSubmitting.value = true
    showError.value = false
    showSuccess.value = false
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate random success/failure for demo
    const success = Math.random() > 0.2 // 80% success rate
    
    if (success) {
      showSuccess.value = true
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        showSuccess.value = false
      }, 5000)
      return true
    } else {
      throw new Error('Network error occurred. Please try again.')
    }
  } catch (error) {
    showError.value = true
    errorMessage.value = error instanceof Error ? error.message : 'An unexpected error occurred'
    // Auto-hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
    return false
  } finally {
    isSubmitting.value = false
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) {
    // Show validation errors
    if (!form.name?.trim()) focusedField.value = 'name'
    else if (!form.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) focusedField.value = 'email'
    else if (!form.subject?.trim()) focusedField.value = 'subject'
    else if (!form.message?.trim()) focusedField.value = 'message'
    return
  }

  const success = await submitForm({ ...form })

  if (success) {
    // Reset form on success
    Object.keys(form).forEach((key) => {
      form[key as keyof ContactFormData] = ''
    })
    focusedField.value = ''
  }
}

// Icon components
const IconMail = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  `
}

const IconMapPin = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  `
}

const IconClock = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  `
}
</script>

<style scoped>
/* Floating Background Elements */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, #42b883, #369870);
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.floating-orb-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: -5%;
  animation-delay: 0s;
}

.floating-orb-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: -5%;
  animation-delay: 2s;
}

.floating-orb-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(66, 184, 131, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(66, 184, 131, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

/* Pulse Ring Animation */
.pulse-ring {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid #42b883;
  border-radius: 50%;
  animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

.pulse-ring-delay-1 {
  animation-delay: 0.33s;
}

.pulse-ring-delay-2 {
  animation-delay: 0.66s;
}

/* Text Animations */
.glow-text {
  text-shadow: 0 0 20px rgba(66, 184, 131, 0.5);
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

.shimmer-text {
  background: linear-gradient(90deg, #fff 25%, #42b883 50%, #fff 75%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 3s steps(12) 1s both;
}

.slide-in-text {
  opacity: 0;
  transform: translateY(20px);
  animation: slide-in 1s ease-out 2s both;
}

/* Card Animations */
.contact-info-card, .contact-form-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  transition: all 0.3s ease;
}

.contact-info-card:hover, .contact-form-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(66, 184, 131, 0.1);
}

.card-glow, .form-glow {
  position: absolute;
  inset: -1px;
  background: linear-gradient(45deg, #42b883, transparent, #42b883);
  border-radius: 20px;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s ease;
}

.contact-info-card:hover .card-glow,
.contact-form-card:hover .form-glow {
  opacity: 0.3;
}

/* Contact Items */
.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-30px);
  animation: slide-in-left 0.6s ease-out both;
}

.contact-item:hover {
  background: rgba(66, 184, 131, 0.1);
  transform: translateX(10px);
}

.contact-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.contact-icon {
  width: 48px;
  height: 48px;
  background: rgba(66, 184, 131, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.contact-item:hover .contact-icon {
  background: rgba(66, 184, 131, 0.3);
  transform: scale(1.1);
}

.icon-ripple {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(66, 184, 131, 0.3);
  opacity: 0;
  transform: scale(0);
  animation: ripple 2s infinite;
}

/* Form Styling */
.input-group {
  position: relative;
  transition: all 0.3s ease;
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.input-group.focused .input-label {
  color: #42b883;
  transform: translateY(-2px);
}

.custom-input {
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
}

.custom-input:focus {
  outline: none;
  border-color: #42b883;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(66, 184, 131, 0.2);
}

.custom-input::placeholder {
  color: #9ca3af;
}

.input-line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(90deg, #42b883, #369870);
  transition: width 0.3s ease;
  border-radius: 1px;
}

.input-group.focused .input-line {
  width: 100%;
}

/* Submit Button */
.submit-button {
  position: relative;
  width: 100%;
  padding: 16px 32px;
  background: linear-gradient(45deg, #42b883, #369870);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 30px rgba(66, 184, 131, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-text {
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.button-ripple {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.submit-button:hover .button-ripple {
  transform: translateX(100%);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  margin-right: 8px;
  animation: spin 1s linear infinite;
}

/* Success/Error Messages */
.success-message, .error-message {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  margin-top: 24px;
  animation: bounce-in 0.5s ease-out;
}

.success-message {
  background: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  color: #42b883;
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.success-icon, .error-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  flex-shrink: 0;
}

.success-icon {
  background: rgba(66, 184, 131, 0.2);
}

.error-icon {
  background: rgba(239, 68, 68, 0.2);
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(10px) rotate(240deg); }
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

@keyframes glow-pulse {
  0% { text-shadow: 0 0 20px rgba(66, 184, 131, 0.5); }
  100% { text-shadow: 0 0 30px rgba(66, 184, 131, 0.8), 0 0 40px rgba(66, 184, 131, 0.3); }
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes slide-in {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-in-left {
  to { opacity: 1; transform: translateX(0); }
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}

/* Transitions */
.success-enter-active, .success-leave-active,
.error-enter-active, .error-leave-active {
  transition: all 0.5s ease;
}

.success-enter-from, .success-leave-to,
.error-enter-from, .error-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

/* Responsive Design */
@media (max-width: 768px) {
  .floating-orb { display: none; }

  .contact-info-card, .contact-form-card {
    padding: 20px;
  }

  .contact-item {
    padding: 12px;
  }

  .custom-input {
    padding: 14px;
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .submit-button {
    padding: 14px 24px;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Performance Optimizations */
.contact-info-card, .contact-form-card {
  will-change: transform;
}

.floating-orb {
  will-change: transform;
}

.custom-input:focus {
  will-change: box-shadow, border-color;
}
</style>
