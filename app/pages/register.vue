<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

import { authPagesHeroAlt, authPagesHeroSrc } from '~/data/authHeroImage'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { register } = useCustomerAuth()

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await register(name.value, email.value, password.value)
    await navigateTo('/account', { replace: true })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4.5rem)] lg:grid lg:grid-cols-2">
    <!-- Form -->
    <section class="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24">
      <FadeInSection immediate class="mx-auto w-full max-w-md">
        <NuxtLink to="/" class="mb-8 inline-flex">
          <TopWinDealLogo variant="full" size="lg" />
        </NuxtLink>

        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Create your account
        </h1>
        <p class="mt-3 text-slate-600">
          Join TopWinDeal for saved coupons, your pack, and optional Premium Club — all on one Temu hub.
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <label class="block">
            <span class="text-sm font-semibold text-slate-700">Name</span>
            <input
              v-model="name"
              required
              autocomplete="name"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="Your name"
            >
          </label>
          <label class="block">
            <span class="text-sm font-semibold text-slate-700">Email</span>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="you@example.com"
            >
          </label>
          <label class="block">
            <span class="text-sm font-semibold text-slate-700">Password</span>
            <input
              v-model="password"
              type="password"
              required
              minlength="8"
              autocomplete="new-password"
              class="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              placeholder="At least 8 characters"
            >
          </label>

          <p v-if="error" class="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-100">
            {{ error }}
          </p>

          <button
            type="submit"
            class="btn-primary w-full py-3.5 text-base shadow-glow"
            :disabled="loading"
          >
            {{ loading ? 'Creating account…' : 'Create account' }}
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-slate-600">
          Already have an account?
          <NuxtLink to="/login" class="font-bold text-brand-700 hover:text-brand-800">Sign in</NuxtLink>
        </p>
      </FadeInSection>
    </section>

    <!-- Hero image (no overlay copy) -->
    <section class="relative hidden min-h-[280px] lg:block lg:min-h-full">
      <img
        :src="authPagesHeroSrc"
        :alt="authPagesHeroAlt"
        class="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      >
    </section>

    <div class="relative h-48 lg:hidden">
      <img
        :src="authPagesHeroSrc"
        :alt="authPagesHeroAlt"
        class="h-full w-full object-cover object-center"
        loading="eager"
      >
    </div>
  </div>
</template>
