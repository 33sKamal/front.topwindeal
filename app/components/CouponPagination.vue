<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = defineProps<{
  currentPage: number
  lastPage: number
  total: number
}>()

const emit = defineEmits<{ 'update:currentPage': [page: number] }>()

const pages = computed(() => {
  const max = props.lastPage
  const current = props.currentPage
  const window = 5
  let start = Math.max(1, current - Math.floor(window / 2))
  let end = Math.min(max, start + window - 1)
  start = Math.max(1, end - window + 1)
  const list: number[] = []
  for (let i = start; i <= end; i++) list.push(i)
  return list
})

function setPage(page: number) {
  if (page < 1 || page > props.lastPage) return
  emit('update:currentPage', page)
}
</script>

<template>
  <nav class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-between" aria-label="Coupons pagination">
    <p class="text-sm text-slate-500">
      Showing page <strong>{{ currentPage }}</strong> of <strong>{{ lastPage }}</strong>
      · <strong>{{ total }}</strong> Temu offers
    </p>
    <div class="flex flex-wrap items-center justify-center gap-1">
      <button
        type="button"
        class="rounded-lg border border-brand-200 p-2 text-brand-700 disabled:opacity-40"
        :disabled="currentPage <= 1"
        aria-label="Previous page"
        @click="setPage(currentPage - 1)"
      >
        <ChevronLeft class="h-5 w-5" />
      </button>
      <button
        v-for="p in pages"
        :key="p"
        type="button"
        class="min-w-[2.5rem] rounded-lg px-3 py-2 text-sm font-semibold transition"
        :class="p === currentPage ? 'bg-brand-600 text-white' : 'border border-brand-100 text-slate-600 hover:bg-brand-50'"
        @click="setPage(p)"
      >
        {{ p }}
      </button>
      <button
        type="button"
        class="rounded-lg border border-brand-200 p-2 text-brand-700 disabled:opacity-40"
        :disabled="currentPage >= lastPage"
        aria-label="Next page"
        @click="setPage(currentPage + 1)"
      >
        <ChevronRight class="h-5 w-5" />
      </button>
    </div>
  </nav>
</template>
