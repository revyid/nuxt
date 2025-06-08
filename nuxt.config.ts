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
  alias: {
    '#auth': '@sidebase/nuxt-auth'
  },
  runtimeConfig: {
    // Private keys (only available on server-side)
    zohoSmtpHost: process.env.ZOHO_SMTP_HOST,
    zohoSmtpPort: process.env.ZOHO_SMTP_PORT,
    zohoEmail: process.env.ZOHO_EMAIL,
    zohoPassword: process.env.ZOHO_PASSWORD,
    contactEmail: process.env.CONTACT_EMAIL,
    authSecret: process.env.NUXT_AUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    discordClientId: process.env.DISCORD_CLIENT_ID,
    discordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    databaseUrl: process.env.DATABASE_URL,

    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      authUrl: process.env.NUXT_AUTH_URL || 'http://localhost:3000/api/auth'
    }
  },

  nitro: {
    experimental: {
      wasm: true
    }
  }
})
