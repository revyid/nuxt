import { initDatabase } from '~/server/utils/db'

export default defineNuxtPlugin(async () => {
  await initDatabase()
})
