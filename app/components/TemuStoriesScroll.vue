<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { temuStorySlides } from '~/data/temuStoryImages'

const scroller = ref<HTMLElement | null>(null)

function scrollByDir(dir: -1 | 1) {
  scroller.value?.scrollBy({ left: dir * 340, behavior: 'smooth' })
}
</script>

<template>
  <section class="border-b border-brand-100 bg-white py-10">
    <div class="mx-auto max-w-7xl px-4 lg:px-6">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold text-slate-900">How TopWinDeal helps Temu shoppers</h2>
          <p class="mt-1 text-sm text-slate-500">Swipe through real moments — codes, savings, and happy hauls</p>
        </div>
        <div class="hidden gap-2 sm:flex">
          <button type="button" class="rounded-full border border-brand-200 p-2 text-brand-700 hover:bg-brand-50" aria-label="Scroll left" @click="scrollByDir(-1)">
            <ChevronLeft class="h-5 w-5" />
          </button>
          <button type="button" class="rounded-full border border-brand-200 p-2 text-brand-700 hover:bg-brand-50" aria-label="Scroll right" @click="scrollByDir(1)">
            <ChevronRight class="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref="scroller"
        class="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <article
          v-for="slide in temuStorySlides"
          :key="slide.id"
          class="w-[min(100%,320px)] shrink-0 snap-center overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/30 shadow-card sm:w-[300px]"
        >
          <div class="relative aspect-[4/3] overflow-hidden">
            <img
              :src="slide.src"
              :alt="slide.alt"
              class="h-full w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            <p class="absolute bottom-3 left-3 right-3 text-sm font-bold text-white">{{ slide.title }}</p>
          </div>
          <p class="px-4 py-3 text-sm text-slate-600">{{ slide.caption }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
