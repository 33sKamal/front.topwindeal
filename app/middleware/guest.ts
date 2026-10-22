export default defineNuxtRouteMiddleware(() => {
  const { token } = useCustomerAuth()
  if (token.value) {
    return navigateTo('/account')
  }
})
