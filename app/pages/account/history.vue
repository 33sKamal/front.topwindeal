<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { api } = useCustomerAuth()
const tab = ref<'copy' | 'click' | ''>('')
const { data, refresh } = await useAsyncData(
  'account-history',
  () => {
    const q = tab.value ? `?type=${tab.value}` : ''
    return api<{ data: { id: number; title: string }[] }>(`/interactions${q}`)
  },
  { server: false, watch: [tab] },
)
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-10 lg:px-6">
    <FadeInSection immediate>
      <NuxtLink to="/account" class="text-sm font-semibold text-brand-700 hover:underline">← Account</NuxtLink>
      <h1 class="mt-4 text-2xl font-bold text-slate-900">Deal history</h1>
      <p class="mt-1 text-sm text-slate-600">Coupons you copied or clicked.</p>
    </FadeInSection>

    <FadeInSection :delay="80" class="mt-6">
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-sm font-semibold transition"
          :class="tab === '' ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-brand-50'"
          @click="tab = ''"
        >
          All
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-sm font-semibold transition"
          :class="tab === 'copy' ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-brand-50'"
          @click="tab = 'copy'"
        >
          Copied
        </button>
        <button
          type="button"
          class="rounded-full px-3 py-1.5 text-sm font-semibold transition"
          :class="tab === 'click' ? 'bg-brand-600 text-white' : 'border border-slate-200 bg-white text-slate-700 hover:bg-brand-50'"
          @click="tab = 'click'"
        >
          Clicked
        </button>
      </div>

      <ul class="mt-6 space-y-2">
        <li
          v-for="c in data?.data ?? []"
          :key="c.id"
          class="rounded-xl border border-brand-100 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-card"
        >
          {{ c.title }}
        </li>
        <li v-if="!(data?.data?.length)" class="py-8 text-center text-slate-500">No activity yet.</li>
      </ul>
      <button type="button" class="mt-4 text-sm font-semibold text-brand-700 hover:underline" @click="refresh()">
        Refresh
      </button>
    </FadeInSection>
  </div>
</template>
