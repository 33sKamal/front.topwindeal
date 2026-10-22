<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    as?: string
    delay?: number
    /** Fade in on mount (hero / above the fold) */
    immediate?: boolean
  }>(),
  { as: 'div', delay: 0, immediate: false },
)

const root = ref<HTMLElement | null>(null)
const enabled = ref(false)
const visible = ref(false)

onMounted(() => {
  enabled.value = true

  if (props.immediate) {
    requestAnimationFrame(() => {
      visible.value = true
    })
    return
  }

  const el = root.value
  if (!el) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
  )

  observer.observe(el)
  onUnmounted(() => observer.disconnect())
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    v-bind="$attrs"
    class="scroll-fade"
    :class="{
      'scroll-fade--enabled': enabled,
      'scroll-fade--in': visible,
    }"
    :style="{ '--scroll-fade-delay': `${delay}ms` }"
  >
    <slot />
  </component>
</template>
