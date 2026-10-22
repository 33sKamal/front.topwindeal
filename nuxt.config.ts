// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: process.env.NUXT_SSR !== 'false',
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    preset: process.env.NITRO_PRESET || undefined,
    devProxy: {
      '/api': {
        target:
          process.env.NUXT_DEV_API_PROXY_TARGET ||
          'http://127.0.0.1:9485/api',
        changeOrigin: true,
      },
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Empty = use Nitro dev proxy `/api` → Laravel (reliable in local dev)
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '',
      dashboardUrl: process.env.NUXT_PUBLIC_DASHBOARD_URL || 'http://localhost:9485',
    },
  },
  devServer: {
    port: 3112,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'TopWinDeal — Best Coupons & Deals',
      link: [
        { rel: 'icon', href: '/images/topwindeal-mark.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})
