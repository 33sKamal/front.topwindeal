<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import { heroCarouselSlides } from '~/data/temuStoryImages'

const slides = heroCarouselSlides
const activeIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(index: number) {
  activeIndex.value = index % slides.length
}

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length
  }, 4500)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="relative pb-2">
    <div class="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 lg:aspect-[5/4]">
      <img
        v-for="(slide, index) in slides"
        :key="slide.id"
        :src="slide.src"
        :alt="slide.alt"
        class="hero-fade-slide absolute inset-0 z-0 h-full w-full object-cover"
        :class="{ 'hero-fade-slide--active': index === activeIndex }"
        :loading="index === 0 ? 'eager' : 'lazy'"
      >

      <div class="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-emerald-950/70 via-emerald-950/20 to-transparent" />

      <p class="pointer-events-none absolute bottom-24 left-4 right-4 z-[3] text-sm font-semibold text-white drop-shadow-md sm:bottom-28">
        {{ slides[activeIndex].caption }}
      </p>

      <div class="absolute bottom-3 left-1/2 z-[4] flex -translate-x-1/2 gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="`dot-${slide.id}`"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="index === activeIndex ? 'w-8 bg-amber-300' : 'w-2 bg-white/60 hover:bg-white/90'"
          :aria-label="`Show slide ${index + 1}`"
          @click="goTo(index)"
        />
      </div>

      <div class="absolute bottom-12 left-4 right-4 z-[5] sm:bottom-14 sm:left-5 sm:right-5">
        <div class="rounded-2xl border border-white/30 bg-white px-5 py-4 shadow-2xl ring-1 ring-black/5">
          <div class="flex items-center gap-2 text-brand-700">
            <Sparkles class="h-5 w-5 shrink-0 text-amber-500" />
            <span class="text-sm font-bold">Saved with TopWinDeal</span>
          </div>
          <p class="mt-1 text-2xl font-extrabold text-slate-900">Up to 90% off</p>
          <p class="text-xs text-slate-500">Real members. Real Temu wins.</p>
        </div>
      </div>
    </div>
  </div>
</template>
