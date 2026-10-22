<script setup lang="ts">
import { BadgeCheck, Copy, Eye, EyeOff, Loader2 } from '@lucide/vue'

export type CouponItem = {
  id: number
  title: string
  description?: string
  has_code?: boolean
  code_length?: number
  badge?: string | null
  is_verified?: boolean
  is_premium?: boolean
  is_exclusive?: boolean
  deal_type?: string
  affiliate_url?: string | null
  store?: { name: string; logo_url?: string | null }
}

const props = defineProps<{ coupon: CouponItem }>()
const { api } = useTopWinDealApi()

const revealedCode = ref<string | null>(null)
const revealed = computed(() => revealedCode.value !== null)
const revealing = ref(false)
const revealError = ref<string | null>(null)
const revealWaitSeconds = ref<number | null>(null)
const copied = ref(false)

let waitTicker: ReturnType<typeof setInterval> | null = null

function formatWaitSeconds(total: number): string {
  if (total <= 0) return 'a moment'
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

const revealWaitLabel = computed(() => {
  if (revealWaitSeconds.value === null) return null
  return formatWaitSeconds(revealWaitSeconds.value)
})

function clearWaitTicker() {
  if (waitTicker) {
    clearInterval(waitTicker)
    waitTicker = null
  }
}

function startWaitCountdown(seconds: number) {
  clearWaitTicker()
  revealWaitSeconds.value = Math.max(0, seconds)
  if (revealWaitSeconds.value <= 0) return
  waitTicker = setInterval(() => {
    if (revealWaitSeconds.value === null || revealWaitSeconds.value <= 0) {
      clearWaitTicker()
      revealWaitSeconds.value = 0
      return
    }
    revealWaitSeconds.value -= 1
  }, 1000)
}

onUnmounted(clearWaitTicker)

const premiumUrl = '/account'

const badgeClass = computed(() => {
  const map: Record<string, string> = {
    Sale: 'bg-rose-100 text-rose-700',
    'Most Popular': 'bg-amber-100 text-amber-800',
    'Top Pick': 'bg-sky-100 text-sky-800',
    Exclusive: 'bg-violet-100 text-violet-800',
  }
  return map[props.coupon.badge || ''] || 'bg-brand-100 text-brand-800'
})

const maskedPlaceholder = computed(() => {
  const len = Math.max(props.coupon.code_length ?? 8, 6)
  return '•'.repeat(Math.min(len, 14))
})

async function revealCode() {
  if (revealed.value || revealing.value) return
  revealing.value = true
  revealError.value = null
  revealWaitSeconds.value = null
  clearWaitTicker()
  try {
    const res = await api<{ code: string | null; message?: string }>(
      `/coupons/${props.coupon.id}/reveal`,
      { method: 'POST', body: {} },
    )
    if (res.code) {
      revealedCode.value = res.code
    } else {
      revealError.value = res.message || 'No code for this deal.'
    }
  } catch (e: unknown) {
    const err = e as {
      data?: {
        message?: string
        reason?: string
        seconds_until_reveal?: number
        reveals_available_at?: string
      }
    }
    const data = err.data
    if (data?.reason === 'rate_limit') {
      revealError.value = "You've used all 5 free reveals this hour."
      const seconds =
        typeof data.seconds_until_reveal === 'number'
          ? data.seconds_until_reveal
          : data.reveals_available_at
            ? Math.max(0, Math.floor((new Date(data.reveals_available_at).getTime() - Date.now()) / 1000))
            : null
      if (seconds !== null) startWaitCountdown(seconds)
    } else {
      revealError.value = data?.message || 'Could not reveal code. Try again later.'
    }
  } finally {
    revealing.value = false
  }
}

async function copyCode() {
  if (!revealedCode.value) return
  await navigator.clipboard.writeText(revealedCode.value)
  copied.value = true
  try {
    await api(`/coupons/${props.coupon.id}/track`, { method: 'POST', body: { type: 'copy' } })
  } catch {
    /* offline API */
  }
  setTimeout(() => { copied.value = false }, 2000)
}

function openDeal() {
  if (props.coupon.affiliate_url) {
    window.open(props.coupon.affiliate_url, '_blank', 'noopener,noreferrer')
  }
}
</script>

<template>
  <article class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-100/80 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow">
    <div v-if="coupon.badge" class="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide" :class="badgeClass">
      {{ coupon.badge }}
    </div>
    <div v-if="coupon.is_premium" class="absolute left-4 top-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
      Premium
    </div>

    <div class="mb-4 flex items-start gap-3 pr-16">
      <TemuStoreLogo :name="coupon.store?.name" :logo-url="coupon.store?.logo_url" />
      <div>
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-400">{{ coupon.store?.name }}</p>
        <div v-if="coupon.is_verified" class="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-600">
          <BadgeCheck class="h-3.5 w-3.5" />
          Verified
        </div>
      </div>
    </div>

    <h3 class="text-lg font-bold leading-snug text-slate-900">{{ coupon.title }}</h3>
    <p v-if="coupon.description" class="mt-2 line-clamp-2 text-sm text-slate-500">{{ coupon.description }}</p>

    <div v-if="coupon.has_code" class="mt-4 space-y-2">
      <div class="flex items-center gap-2 rounded-xl border border-dashed border-brand-200 bg-brand-50/50 px-3 py-2.5">
        <input
          :type="revealed ? 'text' : 'password'"
          class="min-w-0 flex-1 border-0 bg-transparent font-mono text-sm font-bold tracking-wider text-brand-800 outline-none"
          :value="revealed ? revealedCode : maskedPlaceholder"
          readonly
          aria-label="Coupon code"
        />
        <button
          v-if="!revealed"
          type="button"
          class="inline-flex shrink-0 items-center gap-1 rounded-lg bg-brand-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          :disabled="revealing"
          @click="revealCode"
        >
          <Loader2 v-if="revealing" class="h-3.5 w-3.5 animate-spin" />
          <Eye v-else class="h-3.5 w-3.5" />
          {{ revealing ? '…' : 'Show' }}
        </button>
        <template v-else>
          <button
            type="button"
            class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800"
            aria-label="Hide code"
            @click="revealedCode = null"
          >
            <EyeOff class="h-4 w-4" />
          </button>
          <button type="button" class="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-800" @click="copyCode">
            <Copy class="h-4 w-4" />
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </template>
      </div>
      <div v-if="revealError" class="text-xs text-rose-600">
        <p>{{ revealError }}</p>
        <p v-if="revealWaitLabel" class="mt-1 font-medium text-rose-700">
          Time left for this IP: <span class="tabular-nums">{{ revealWaitLabel }}</span>
        </p>
        <p class="mt-1 text-slate-600">
          <a :href="premiumUrl" class="font-semibold text-brand-700 underline">Go Premium ($3/mo)</a>
          for unlimited reveals.
        </p>
      </div>
    </div>

    <div v-else-if="coupon.deal_type === 'deal' && coupon.affiliate_url" class="mt-4">
      <button type="button" class="btn-primary w-full" @click="openDeal">
        Shop deal on Temu
      </button>
    </div>
  </article>
</template>
