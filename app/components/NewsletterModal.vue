<script setup lang="ts">
import { Mail, X } from '@lucide/vue'

const { isOpen, close } = useNewsletterModal()
const email = ref('')
const status = ref<'idle' | 'loading' | 'done' | 'error'>('idle')
const { api } = useTopWinDealApi()

watch(isOpen, (open) => {
  if (!open) {
    status.value = 'idle'
  }
})

function onBackdrop(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

async function subscribe() {
  if (!email.value) return
  status.value = 'loading'
  try {
    await api('/newsletter/subscribe', {
      method: 'POST',
      body: { email: email.value },
    })
    status.value = 'done'
    email.value = ''
  } catch {
    status.value = 'error'
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition name="newsletter-backdrop">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-emerald-950/60 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-title"
        @click="onBackdrop"
      >
        <Transition name="newsletter-panel" appear>
          <div
            v-if="isOpen"
            class="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 p-8 text-white shadow-2xl ring-1 ring-white/10"
            @click.stop
          >
            <button
              type="button"
              class="absolute right-4 top-4 rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
              @click="close"
            >
              <X class="h-5 w-5" />
            </button>

            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Mail class="h-6 w-6 text-amber-200" />
            </div>

            <h2 id="newsletter-title" class="text-2xl font-bold">Get the latest deals</h2>
            <p class="mt-2 text-sm text-brand-100">
              Delivered to your inbox — no spam, unsubscribe anytime.
            </p>

            <form class="mt-6 space-y-3" @submit.prevent="subscribe">
              <input
                v-model="email"
                type="email"
                required
                placeholder="you@email.com"
                class="w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-brand-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
              <button
                type="submit"
                class="w-full rounded-xl bg-white py-3 text-sm font-bold text-brand-800 transition hover:bg-brand-50 disabled:opacity-70"
                :disabled="status === 'loading'"
              >
                {{ status === 'loading' ? 'Subscribing…' : 'Subscribe' }}
              </button>
              <p v-if="status === 'done'" class="text-center text-xs text-brand-200">You're subscribed!</p>
              <p v-if="status === 'error'" class="text-center text-xs text-rose-200">Could not subscribe. Try again.</p>
            </form>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
