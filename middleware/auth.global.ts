// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth()
  
  if (to.meta.auth && status.value === 'unauthenticated') {
    return navigateTo('/auth/signin')
  }
})
