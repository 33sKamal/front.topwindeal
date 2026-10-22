<script setup lang="ts">
defineProps<{
  stores: { id: number; name: string; logo_url?: string | null; active_coupons_count?: number }[]
}>()
</script>

<template>
  <aside class="rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
    <h2 class="text-lg font-bold text-slate-900">Popular Stores</h2>
    <ul class="mt-4 space-y-3">
      <li v-for="store in stores" :key="store.id" class="flex items-center gap-3 rounded-xl p-2 hover:bg-brand-50/80">
        <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-brand-50">
          <img v-if="store.logo_url" :src="store.logo_url" :alt="store.name" class="h-full w-full object-contain p-1">
          <span v-else class="text-xs font-bold text-brand-700">{{ store.name.slice(0, 2) }}</span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate font-semibold text-slate-800">{{ store.name }}</p>
          <p class="text-xs text-slate-500">{{ store.active_coupons_count ?? 0 }} active coupons</p>
        </div>
      </li>
    </ul>
  </aside>
</template>
