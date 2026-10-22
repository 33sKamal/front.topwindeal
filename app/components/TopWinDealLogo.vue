<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'full' | 'mark'
    size?: 'sm' | 'md' | 'lg'
    showTemu?: boolean
  }>(),
  { variant: 'full', size: 'md', showTemu: true },
)

const src = computed(() =>
  props.variant === 'mark' ? '/images/topwindeal-mark.svg' : '/images/topwindeal-logo.svg',
)

const heightClass = computed(() => {
  if (props.variant === 'mark') {
    return props.size === 'lg' ? 'h-14 w-14' : props.size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
  }
  return props.size === 'lg' ? 'h-12' : props.size === 'sm' ? 'h-7' : 'h-8'
})
</script>

<template>
  <span class="inline-flex items-center gap-2 font-extrabold text-brand-700">
    <img
      v-if="variant === 'mark'"
      :src="src"
      alt="TopWinDeal"
      :class="heightClass"
      class="shrink-0"
    >
    <template v-else>
      <img :src="src" alt="TopWinDeal" :class="heightClass" class="shrink-0">
      <span v-if="showTemu" class="text-lg text-orange-500">× Temu</span>
    </template>
  </span>
</template>
