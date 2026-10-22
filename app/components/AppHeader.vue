<script setup lang="ts">
import { Crown, Heart, Mail, Search, User } from '@lucide/vue'

const route = useRoute()
const { open: openNewsletter } = useNewsletterModal()
const { isLoggedIn, user, refreshUser } = useCustomerAuth()

const isPremiumClub = computed(() => route.path === '/premium-club')
const isAccount = computed(() => route.path.startsWith('/account'))

onMounted(() => {
  if (isLoggedIn.value) refreshUser()
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-brand-100/80 bg-white/90 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
      <NuxtLink to="/" class="flex shrink-0 items-center">
        <span class="sm:hidden">
          <TopWinDealLogo variant="mark" size="md" :show-temu="false" />
        </span>
        <span class="hidden sm:inline-flex">
          <TopWinDealLogo variant="full" size="md" />
        </span>
      </NuxtLink>

      <nav class="flex flex-1 items-center justify-center gap-4 sm:gap-6 lg:justify-start lg:pl-6">
        <NuxtLink
          to="/"
          class="text-sm font-medium transition duration-300"
          :class="route.path === '/' ? 'text-brand-700 underline decoration-brand-500 decoration-2 underline-offset-8' : 'text-slate-600 hover:text-brand-700'"
        >
          Home
        </NuxtLink>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-800 transition hover:border-brand-300 hover:bg-brand-100 sm:px-4"
          aria-label="Get deals by email"
          @click="openNewsletter()"
        >
          <Mail class="h-4 w-4" />
          <span class="hidden sm:inline">Get deals</span>
        </button>
      </nav>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <NuxtLink
          to="/premium-club"
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-bold uppercase tracking-wide transition duration-300 sm:gap-2 sm:px-4 sm:text-sm"
          :class="isPremiumClub
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-md'
            : 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 hover:from-amber-200 hover:to-orange-200'"
        >
          <Crown class="h-4 w-4 shrink-0" />
          <span class="hidden min-[380px]:inline">Premium Club</span>
          <span class="min-[380px]:hidden">Premium</span>
        </NuxtLink>
        <button type="button" class="hidden rounded-full p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700 lg:inline-flex" aria-label="Search">
          <Search class="h-5 w-5" />
        </button>
        <NuxtLink
          :to="isLoggedIn ? '/account/favorites' : '/login'"
          class="rounded-full p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-700"
          aria-label="Favorites"
        >
          <Heart class="h-5 w-5" />
        </NuxtLink>
        <NuxtLink
          v-if="isLoggedIn"
          to="/account"
          class="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition"
          :class="isAccount ? 'bg-brand-100 text-brand-800' : 'text-slate-600 hover:bg-brand-50 hover:text-brand-800'"
        >
          <User class="h-4 w-4" />
          <span class="hidden max-w-[8rem] truncate sm:inline">{{ user?.name?.split(' ')[0] || 'Account' }}</span>
        </NuxtLink>
        <NuxtLink v-else to="/login" class="btn-primary hidden px-4 py-2 text-xs sm:inline-flex sm:text-sm">
          Login
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
