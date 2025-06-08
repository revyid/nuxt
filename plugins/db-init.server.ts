kimport { initDatabase } from '~/server/utils/db'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  await initDatabase(config.databaseUrl)
})
