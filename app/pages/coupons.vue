<script setup lang="ts">
import type { CouponItem } from '~/components/CouponCard.vue'

const pageDataOpts = useCustomerPageDataOptions()
const { api } = useTopWinDealApi()
const { data, pending, error, refresh } = await useAsyncData(
  'temu-all-coupons-page',
  () => api<{ data: CouponItem[] }>('/coupons?per_page=24'),
  { ...pageDataOpts, default: () => ({ data: [] }) },
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 lg:px-6">
    <FadeInSection immediate>
      <h1 class="text-3xl font-bold text-slate-900">Temu coupons</h1>
      <p class="mt-2 text-slate-600">All verified Temu promo codes on TopWinDeal.</p>
    </FadeInSection>
    <FadeInSection :delay="100" class="mt-8">
      <div v-if="pending" class="text-slate-500">Loading…</div>
      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        Could not load coupons.
        <button type="button" class="ml-2 font-semibold underline" @click="refresh()">Retry</button>
      </div>
      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CouponCard v-for="c in data?.data ?? []" :key="c.id" :coupon="c" />
      </div>
    </FadeInSection>
  </div>
</template>
