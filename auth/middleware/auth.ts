export default defineNuxtRouteMiddleware((to) => {
  const { user, loading } = useAuthStore()
  
  if (loading) return
  
  if (!user && to.path !== '/auth') {
    return navigateTo('/auth')
  }
  
  if (user && to.path === '/auth') {
    return navigateTo('/dashboard')
  }
})
