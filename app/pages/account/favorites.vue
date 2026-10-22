<script setup lang="ts">
import type { CouponItem } from '~/components/CouponCard.vue'

definePageMeta({ middleware: 'auth' })

const { api } = useCustomerAuth()

const { data, pending, error, refresh } = await useAsyncData(
  'account-favorites',
  () => api<{ data: CouponItem[] }>('/favorites'),
  { server: false },
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-10 lg:px-6">
    <FadeInSection immediate>
      <NuxtLink to="/account" class="text-sm font-semibold text-brand-700">← Back to dashboard</NuxtLink>
      <h1 class="mt-4 text-2xl font-bold text-slate-900">Saved coupons</h1>
      <p class="text-sm text-slate-500">Coupons you favorited while browsing.</p>
    </FadeInSection>

    <FadeInSection :delay="80" class="mt-8">
      <p v-if="pending" class="text-slate-500">Loading…</p>
      <p v-else-if="error" class="text-rose-600">Could not load favorites.</p>
      <div v-else-if="!(data?.data?.length)" class="rounded-xl border border-dashed border-brand-200 bg-brand-50/50 p-10 text-center text-slate-600">
        No favorites yet. Save deals from the home page.
        <NuxtLink to="/" class="mt-2 block font-semibold text-brand-700">Browse coupons</NuxtLink>
      </div>
      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CouponCard v-for="c in data.data" :key="c.id" :coupon="c" />
      </div>
      <button v-if="!pending" type="button" class="mt-6 text-sm font-semibold text-brand-700" @click="refresh()">Refresh</button>
    </FadeInSection>
  </div>
</template>
