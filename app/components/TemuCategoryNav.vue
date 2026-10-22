<script setup lang="ts">
import {
  Baby,
  Footprints,
  Gamepad2,
  Grid3x3,
  Headphones,
  Home,
  Lamp,
  Palette,
  Shirt,
  Smartphone,
  Sparkles,
  User,
  Utensils,
} from '@lucide/vue'

export type TemuCategory = {
  id: number
  name: string
  slug: string
  icon?: string | null
  children?: TemuCategory[]
}

const props = defineProps<{
  categories: TemuCategory[]
  modelValue?: string | null
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | null] }>()

const iconMap: Record<string, unknown> = {
  grid: Grid3x3,
  shirt: Shirt,
  home: Home,
  smartphone: Smartphone,
  sparkles: Sparkles,
  gamepad: Gamepad2,
  user: User,
  footprints: Footprints,
  utensils: Utensils,
  lamp: Lamp,
  headphones: Headphones,
  palette: Palette,
  baby: Baby,
}

const activeParent = computed(() => {
  if (!props.modelValue) return null
  for (const p of props.categories) {
    if (p.slug === props.modelValue) return p
    if (p.children?.some((c) => c.slug === props.modelValue)) return p
  }
  return null
})

const subcategories = computed(() => {
  if (!activeParent.value?.children?.length) {
    const fashion = props.categories.find((c) => c.slug === 'fashion')
    return fashion?.children ?? []
  }
  return activeParent.value.children
})

function selectParent(slug: string) {
  emit('update:modelValue', slug === 'all' ? null : slug)
}

function selectSub(slug: string) {
  emit('update:modelValue', slug)
}
</script>

<template>
  <div class="space-y-4">
    <div class="overflow-x-auto pb-1">
      <div class="flex min-w-max gap-3">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="flex w-28 flex-col items-center gap-2 rounded-2xl border px-2 py-3 text-center transition"
          :class="(modelValue === cat.slug || (!modelValue && cat.slug === 'all'))
            ? 'border-orange-300 bg-white shadow-card text-brand-800'
            : 'border-transparent bg-white/70 text-slate-600 hover:border-brand-200 hover:bg-white'"
          @click="selectParent(cat.slug)"
        >
          <span class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-brand-100 text-brand-700">
            <component :is="iconMap[cat.icon || 'grid'] || Grid3x3" class="h-5 w-5" />
          </span>
          <span class="text-xs font-semibold leading-tight">{{ cat.name }}</span>
        </button>
      </div>
    </div>

    <div v-if="subcategories.length" class="overflow-x-auto">
      <p class="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Temu subcategories</p>
      <div class="flex min-w-max flex-wrap gap-2">
        <button
          v-for="sub in subcategories"
          :key="sub.id"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-medium transition"
          :class="modelValue === sub.slug
            ? 'bg-brand-600 text-white shadow-sm'
            : 'bg-white text-slate-600 ring-1 ring-brand-100 hover:bg-brand-50'"
          @click="selectSub(sub.slug)"
        >
          {{ sub.name }}
        </button>
      </div>
    </div>
  </div>
</template>
