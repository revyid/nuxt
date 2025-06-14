import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId
  }

  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'your_api_key_here') {
    console.warn('Firebase configuration is missing or incomplete. Please check your .env file.')
    return {
      provide: {
        firebase: null,
        auth: null
      }
    }
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  return {
    provide: {
      firebase: app,
      auth
    }
  }
})
