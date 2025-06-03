// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    zohoSmtpHost: process.env.ZOHO_SMTP_HOST,
    zohoSmtpPort: process.env.ZOHO_SMTP_PORT,
    zohoEmail: process.env.ZOHO_EMAIL,
    zohoPassword: process.env.ZOHO_PASSWORD,
    contactEmail: process.env.CONTACT_EMAIL,

    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  }
})
