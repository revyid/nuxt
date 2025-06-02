<template>
  <section
    id="home"
    class="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
  >
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-[#42b883]/10 via-transparent to-transparent"
    ></div>

    <!-- Floating particles -->
    <div class="absolute inset-0">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute w-1 h-1 bg-[#42b883]/30 rounded-full animate-pulse"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- Content -->
    <div class="text-center z-10 max-w-4xl mx-auto">
      <div class="opacity-0 animate-fade-in-up animate-delay-100">
        <h1
          class="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-[#42b883] bg-clip-text text-transparent"
        >
          Hi, I'm Alex
        </h1>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-200">
        <p class="text-xl md:text-2xl text-gray-300 mb-8 font-light leading-relaxed">
          Full Stack Developer passionate about creating
          <span class="text-[#42b883] font-medium"> beautiful</span> and
          <span class="text-[#42b883] font-medium"> functional</span> web experiences
        </p>
      </div>

      <div class="opacity-0 animate-fade-in-up animate-delay-300">
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="scrollToProjects"
            class="group relative px-8 py-4 bg-[#42b883] text-white rounded-full font-medium hover:bg-[#369870] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#42b883]/25"
          >
            <span class="relative z-10">View My Work</span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-[#42b883] to-[#20a085] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>

          <button
            @click="scrollToContact"
            class="group px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:border-[#42b883] hover:text-[#42b883] transition-all duration-300 hover:scale-105 hover:shadow-xl glass"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-up animate-delay-500"
      >
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div class="w-1 h-3 bg-[#42b883] rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const getParticleStyle = (index: number) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 3}s`,
  }
}

const scrollToProjects = () => {
  const element = document.getElementById('projects')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
