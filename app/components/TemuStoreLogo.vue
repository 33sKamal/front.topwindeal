<script setup lang="ts">
import { resolveStoreLogo } from '~/constants/temuBrand'

const props = defineProps<{
  name?: string | null
  logoUrl?: string | null
  size?: 'sm' | 'md' | 'lg'
}>()

const sizeClass = computed(() => {
  if (props.size === 'lg') return 'h-14 w-14'
  if (props.size === 'sm') return 'h-8 w-8'
  return 'h-12 w-12'
})

const src = computed(() => resolveStoreLogo(props.name, props.logoUrl))
const errored = ref(false)

const displaySrc = computed(() => (errored.value ? '/images/temu-logo.svg' : src.value))
</script>

<template>
  <div
    class="flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-orange-50 ring-1 ring-orange-100"
    :class="sizeClass"
  >
    <img
      :src="displaySrc"
      :alt="name ? `${name} logo` : 'Store logo'"
      class="h-full w-full object-contain p-1"
      loading="lazy"
      @error="errored = true"
    >
  </div>
</template>
