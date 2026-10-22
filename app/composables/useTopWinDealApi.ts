import { CUSTOMER_TOKEN_KEY } from './useAuthToken'

type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: Record<string, unknown> | string
}

export function useTopWinDealApi() {
  const config = useRuntimeConfig()
  const apiUrl = (config.public.apiUrl as string)?.replace(/\/$/, '')
  const base = apiUrl ? `${apiUrl}/api/customer/v1` : '/api/customer/v1'
  const token = useAuthToken()

  async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const body =
      options.body === undefined
        ? undefined
        : typeof options.body === 'string'
          ? JSON.parse(options.body)
          : options.body

    const headers: Record<string, string> = { Accept: 'application/json' }
    let bearer = token.value
    if (!bearer && import.meta.client) {
      bearer = localStorage.getItem(CUSTOMER_TOKEN_KEY)
      if (bearer) token.value = bearer
    }
    if (bearer) headers.Authorization = `Bearer ${bearer}`

    return await $fetch<T>(`${base}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body,
      timeout: 15_000,
    })
  }

  return { api, base, token }
}
