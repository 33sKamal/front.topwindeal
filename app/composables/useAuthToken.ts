export const CUSTOMER_TOKEN_KEY = 'topwindeal_customer_token'

export function useAuthToken() {
  return useCookie<string | null>(CUSTOMER_TOKEN_KEY, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
  })
}
