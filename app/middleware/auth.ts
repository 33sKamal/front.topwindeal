export default defineNuxtRouteMiddleware(async () => {
  const { token, refreshUser } = useCustomerAuth()
  if (!token.value) {
    return navigateTo('/login')
  }
  await refreshUser()
})
