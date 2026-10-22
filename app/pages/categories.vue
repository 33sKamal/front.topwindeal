<script setup lang="ts">
import type { TemuCategory } from '~/components/TemuCategoryNav.vue'

const pageDataOpts = useCustomerPageDataOptions()
const { api } = useTopWinDealApi()
const selected = ref<string | null>(null)
const { data, pending, error, refresh } = await useAsyncData(
  'temu-categories-page',
  () => api<{ data: TemuCategory[] }>('/categories'),
  { ...pageDataOpts, default: () => ({ data: [] }) },
)
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-12 lg:px-6">
    <FadeInSection immediate>
      <h1 class="text-3xl font-bold text-slate-900">Temu categories</h1>
      <p class="mt-2 text-slate-600">Browse parent departments and subcategories — Temu only.</p>
    </FadeInSection>
    <FadeInSection :delay="100" class="mt-8">
      <div v-if="pending" class="text-slate-500">Loading…</div>
      <div v-else-if="error" class="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
        Could not load categories.
        <button type="button" class="ml-2 font-semibold underline" @click="refresh()">Retry</button>
      </div>
      <TemuCategoryNav v-else v-model="selected" :categories="data?.data ?? []" />
      <NuxtLink v-if="selected" :to="`/?category=${selected}`" class="mt-6 inline-flex font-semibold text-brand-700">
        View coupons in this category →
      </NuxtLink>
    </FadeInSection>
  </div>
</template>
