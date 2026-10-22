import { CUSTOMER_TOKEN_KEY } from './useAuthToken'

export type CustomerUser = {
  id: number
  name: string
  email: string
  role: string
  premium_active: boolean
  premium_until: string | null
  whatsapp_number: string | null
  whatsapp_alerts_enabled: boolean
}

function parseApiError(error: unknown): string {
  if (error && typeof error === 'object' && 'data' in error) {
    const data = (error as { data?: Record<string, unknown> }).data
    if (data && typeof data.message === 'string') return data.message
    const errors = data?.errors as Record<string, string[]> | undefined
    const first = errors && Object.values(errors).flat()[0]
    if (first) return first
  }
  if (error instanceof Error) return error.message
  return 'Something went wrong.'
}

export function useCustomerAuth() {
  const token = useAuthToken()
  const { api } = useTopWinDealApi()
  const user = useState<CustomerUser | null>('customer-user', () => null)

  const isLoggedIn = computed(() => Boolean(token.value))

  async function refreshUser() {
    if (!token.value) {
      user.value = null
      return null
    }
    try {
      const res = await api<{ user: CustomerUser }>('/auth/me')
      user.value = res.user
      return res.user
    } catch {
      token.value = null
      user.value = null
      return null
    }
  }

  async function login(email: string, password: string) {
    const res = await api<{ token: string; user: CustomerUser }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    token.value = res.token
    if (import.meta.client) localStorage.setItem(CUSTOMER_TOKEN_KEY, res.token)
    user.value = res.user
    return res
  }

  async function register(name: string, email: string, password: string) {
    const res = await api<{ token: string; user: CustomerUser }>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })
    token.value = res.token
    if (import.meta.client) localStorage.setItem(CUSTOMER_TOKEN_KEY, res.token)
    user.value = res.user
    return res
  }

  async function logout() {
    try {
      if (token.value) await api('/auth/logout', { method: 'POST' })
    } finally {
      token.value = null
      user.value = null
      if (import.meta.client) localStorage.removeItem(CUSTOMER_TOKEN_KEY)
    }
  }

  async function updateProfile(payload: { name?: string; email?: string; password?: string }) {
    try {
      const res = await api<{ user: CustomerUser }>('/account/profile', {
        method: 'PATCH',
        body: payload,
      })
      user.value = res.user
      return res.user
    } catch (e) {
      throw new Error(parseApiError(e))
    }
  }

  async function safeLogin(email: string, password: string) {
    try {
      return await login(email, password)
    } catch (e) {
      throw new Error(parseApiError(e))
    }
  }

  async function safeRegister(name: string, email: string, password: string) {
    try {
      return await register(name, email, password)
    } catch (e) {
      throw new Error(parseApiError(e))
    }
  }

  return {
    token,
    user,
    isLoggedIn,
    refreshUser,
    login: safeLogin,
    register: safeRegister,
    logout,
    updateProfile,
    api,
  }
}
