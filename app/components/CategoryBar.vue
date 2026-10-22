<script setup lang="ts">
import {
  Cpu,
  Ellipsis,
  Globe,
  GraduationCap,
  Grid3x3,
  Palette,
  Plane,
  Server,
  Shield,
  ShoppingBag,
} from '@lucide/vue'

const props = defineProps<{
  categories: { id: number; name: string; slug: string; icon?: string | null }[]
  modelValue?: string | null
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const iconMap: Record<string, unknown> = {
  grid: Grid3x3,
  server: Server,
  globe: Globe,
  cpu: Cpu,
  'shopping-bag': ShoppingBag,
  shield: Shield,
  palette: Palette,
  'graduation-cap': GraduationCap,
  plane: Plane,
  ellipsis: Ellipsis,
}

function select(slug: string) {
  emit('update:modelValue', slug === 'all' ? null : slug)
}
</script>

<template>
  <div class="overflow-x-auto pb-2">
    <div class="flex min-w-max gap-3 px-1">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="flex w-24 flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition"
        :class="(modelValue === cat.slug || (!modelValue && cat.slug === 'all'))
          ? 'border-brand-300 bg-white shadow-card text-brand-800'
          : 'border-transparent bg-white/60 text-slate-600 hover:border-brand-200 hover:bg-white'"
        @click="select(cat.slug)"
      >
        <span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <component :is="iconMap[cat.icon || 'ellipsis'] || Ellipsis" class="h-5 w-5" />
        </span>
        <span class="text-xs font-semibold leading-tight">{{ cat.name }}</span>
      </button>
    </div>
  </div>
</template>
