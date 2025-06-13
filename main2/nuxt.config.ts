import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-06-13',
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  css: ['@/assets/css/main.css'],

  runtimeConfig: {
    public: {
      openrouterApiKey: process.env.OPENROUTER_API_KEY,
      authUrl: process.env.AUTH_URL || 'https://auth.revy.my.id'
    }
  },

  app: {
    head: {
      title: 'Revy - Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Passionate Developer & Digital Creator' },
        { name: 'author', content: 'Revy' },
        { property: 'og:title', content: 'Revy - Portfolio' },
        { property: 'og:description', content: 'Passionate Developer & Digital Creator' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://www.revy.my.id' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Revy - Portfolio' },
        { name: 'twitter:description', content: 'Passionate Developer & Digital Creator' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  typescript: {
    strict: true,
    typeCheck: true
  }
})
