<template>
  <div id="app" class="min-h-screen bg-black text-white overflow-x-hidden">
    <!-- Floating Navbar -->
    <FloatingNavbar />

    <!-- Main Content -->
    <main class="relative">
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import FloatingNavbar from './components/FloatingNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
onMounted(() => {
  // Initialize AOS or any other animations
  if (typeof window !== 'undefined') {
    // Add any initialization code here
  }
})
</script>
