<script setup lang="ts">
import { Clock, Crown, Heart, LogOut, Mail, MessageCircle, Package, User } from '@lucide/vue'

definePageMeta({ middleware: 'auth' })

const { user, logout, updateProfile, api, refreshUser } = useCustomerAuth()

const name = ref('')
const email = ref('')
const password = ref('')
const profileMessage = ref('')
const profileError = ref('')
const savingProfile = ref(false)

const newsletterEmail = ref('')
const newsletterMessage = ref('')

const whatsappNumber = ref('')
const whatsappMessage = ref('')
const whatsappError = ref('')
const savingWhatsapp = ref(false)

const packMessage = ref('')
const subscribing = ref(false)

const quota = ref<{
  reveals_remaining: number | null
  limit_per_hour: number
  premium_active: boolean
} | null>(null)

watch(
  user,
  (u) => {
    if (u) {
      name.value = u.name
      email.value = u.email
      newsletterEmail.value = u.email
      whatsappNumber.value = u.whatsapp_number || ''
    }
  },
  { immediate: true },
)

onMounted(async () => {
  try {
    quota.value = await api<typeof quota.value & object>('/reveal-quota')
  } catch {
    /* optional */
  }
})

async function saveProfile() {
  profileMessage.value = ''
  profileError.value = ''
  savingProfile.value = true
  try {
    const payload: { name: string; email: string; password?: string } = {
      name: name.value,
      email: email.value,
    }
    if (password.value) payload.password = password.value
    await updateProfile(payload)
    password.value = ''
    profileMessage.value = 'Profile updated.'
  } catch (e) {
    profileError.value = e instanceof Error ? e.message : 'Could not save profile.'
  } finally {
    savingProfile.value = false
  }
}

async function subscribePack() {
  packMessage.value = ''
  subscribing.value = true
  try {
    await api('/subscription/subscribe', { method: 'POST', body: {} })
    packMessage.value = 'Premium activated for 30 days.'
    await refreshUser()
    quota.value = await api('/reveal-quota')
  } catch (e) {
    packMessage.value = e instanceof Error ? e.message : 'Subscribe failed.'
  } finally {
    subscribing.value = false
  }
}

async function saveWhatsappAlerts() {
  whatsappMessage.value = ''
  whatsappError.value = ''
  savingWhatsapp.value = true
  try {
    const res = await api<{ message: string; user: typeof user.value }>('/account/whatsapp-alerts', {
      method: 'POST',
      body: { whatsapp_number: whatsappNumber.value },
    })
    whatsappMessage.value = res.message
    if (res.user) user.value = res.user
    await refreshUser()
    quota.value = await api('/reveal-quota')
  } catch (e) {
    whatsappError.value = e instanceof Error ? e.message : 'Could not enable WhatsApp alerts.'
  } finally {
    savingWhatsapp.value = false
  }
}

async function saveNewsletter() {
  newsletterMessage.value = ''
  try {
    await api('/account/newsletter', {
      method: 'POST',
      body: { email: newsletterEmail.value, is_active: true },
    })
    newsletterMessage.value = 'Deal alerts enabled for this email.'
  } catch {
    newsletterMessage.value = 'Could not save newsletter settings.'
  }
}

async function signOut() {
  await logout()
  await navigateTo('/')
}

const initials = computed(() => {
  const n = user.value?.name?.trim() || '?'
  return n.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase()
})
</script>

<template>
  <div class="mx-auto max-w-4xl px-4 py-10 lg:px-6">
    <FadeInSection immediate class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-lg font-bold text-white">
          {{ initials }}
        </div>
        <div>
          <h1 class="text-2xl font-bold text-slate-900">{{ user?.name }}</h1>
          <p class="text-sm text-slate-500">{{ user?.email }}</p>
        </div>
      </div>
      <button type="button" class="btn-outline gap-2" @click="signOut">
        <LogOut class="h-4 w-4" />
        Log out
      </button>
    </FadeInSection>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <!-- Pack -->
      <FadeInSection :delay="60" class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
        <div class="flex items-center gap-2 text-brand-700">
          <Package class="h-5 w-5" />
          <h2 class="text-lg font-bold text-slate-900">Your pack</h2>
        </div>
        <div v-if="user?.premium_active" class="mt-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-4 ring-1 ring-amber-200">
          <p class="flex items-center gap-2 font-bold text-amber-900">
            <Crown class="h-5 w-5" />
            Premium Club
          </p>
          <p class="mt-1 text-sm text-amber-800">
            Active until {{ user.premium_until ? new Date(user.premium_until).toLocaleDateString() : '—' }}
          </p>
          <p class="mt-2 text-xs text-amber-700">Unlimited reveals · premium codes · WhatsApp alerts</p>
        </div>
        <div v-else class="mt-4 rounded-xl bg-brand-50 p-4">
          <p class="font-semibold text-slate-900">Free plan</p>
          <p class="mt-1 text-sm text-slate-600">
            {{ quota?.reveals_remaining ?? '—' }} of {{ quota?.limit_per_hour ?? 5 }} reveals left this hour (per IP).
          </p>
          <button type="button" class="btn-primary mt-4 w-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 hover:brightness-105" :disabled="subscribing" @click="subscribePack">
            {{ subscribing ? 'Processing…' : 'Upgrade — $3/month' }}
          </button>
          <NuxtLink to="/premium-club" class="mt-2 block text-center text-sm font-medium text-brand-700">See Premium benefits</NuxtLink>
        </div>
        <p v-if="packMessage" class="mt-3 text-sm text-brand-700">{{ packMessage }}</p>
      </FadeInSection>

      <!-- Quick actions -->
      <FadeInSection :delay="100" class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
        <h2 class="text-lg font-bold text-slate-900">Quick actions</h2>
        <ul class="mt-4 space-y-2">
          <li>
            <NuxtLink to="/account/favorites" class="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-brand-50">
              <Heart class="h-4 w-4 text-rose-500" />
              Saved coupons
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/account/history" class="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-brand-50">
              <Clock class="h-4 w-4 text-brand-600" />
              Deal history
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-brand-50">
              Browse Temu deals
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/premium-club" class="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-brand-50">
              <Crown class="h-4 w-4 text-amber-500" />
              Premium Club info
            </NuxtLink>
          </li>
        </ul>
      </FadeInSection>

      <!-- Profile -->
      <FadeInSection :delay="140" class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card lg:col-span-2">
        <div class="flex items-center gap-2">
          <User class="h-5 w-5 text-brand-600" />
          <h2 class="text-lg font-bold text-slate-900">Profile</h2>
        </div>
        <form class="mt-4 grid gap-4 sm:grid-cols-2" @submit.prevent="saveProfile">
          <label class="block text-sm font-medium text-slate-700 sm:col-span-1">
            Display name
            <input v-model="name" required class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5">
          </label>
          <label class="block text-sm font-medium text-slate-700 sm:col-span-1">
            Email
            <input v-model="email" type="email" required class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5">
          </label>
          <label class="block text-sm font-medium text-slate-700 sm:col-span-2">
            New password <span class="font-normal text-slate-400">(optional)</span>
            <input v-model="password" type="password" minlength="8" class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5" autocomplete="new-password">
          </label>
          <div class="sm:col-span-2 flex flex-wrap items-center gap-3">
            <button type="submit" class="btn-primary" :disabled="savingProfile">
              {{ savingProfile ? 'Saving…' : 'Save profile' }}
            </button>
            <p v-if="profileMessage" class="text-sm text-emerald-600">{{ profileMessage }}</p>
            <p v-if="profileError" class="text-sm text-rose-600">{{ profileError }}</p>
          </div>
        </form>

        <div class="mt-8 border-t border-slate-100 pt-8">
          <div class="flex items-center gap-2">
            <MessageCircle class="h-5 w-5 text-emerald-600" />
            <h3 class="text-lg font-bold text-slate-900">WhatsApp deal alerts</h3>
          </div>
          <p class="mt-2 text-sm text-slate-600">
            Weekly Temu picks on WhatsApp. Enabling this also subscribes you to
            <strong class="font-semibold text-amber-800">Premium Club ($3/month)</strong>
            — unlimited reveals and premium coupons.
          </p>
          <div
            v-if="user?.whatsapp_alerts_enabled"
            class="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 ring-1 ring-emerald-100"
          >
            Alerts active for <span class="font-semibold">{{ user.whatsapp_number }}</span>
            <span v-if="user.premium_active"> · Premium until {{ user.premium_until ? new Date(user.premium_until).toLocaleDateString() : '—' }}</span>
          </div>
          <form class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end" @submit.prevent="saveWhatsappAlerts">
            <label class="flex-1 text-sm font-medium text-slate-700">
              WhatsApp number
              <input
                v-model="whatsappNumber"
                type="tel"
                required
                placeholder="+1 555 123 4567"
                class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5"
                autocomplete="tel"
              >
            </label>
            <button
              type="submit"
              class="btn-primary shrink-0 bg-gradient-to-r from-emerald-600 to-brand-600 py-2.5"
              :disabled="savingWhatsapp"
            >
              {{ savingWhatsapp ? 'Activating…' : user?.whatsapp_alerts_enabled ? 'Update & keep Premium' : 'Save alerts via WhatsApp' }}
            </button>
          </form>
          <p v-if="whatsappMessage" class="mt-2 text-sm text-emerald-700">{{ whatsappMessage }}</p>
          <p v-if="whatsappError" class="mt-2 text-sm text-rose-600">{{ whatsappError }}</p>
        </div>
      </FadeInSection>

      <!-- Newsletter -->
      <FadeInSection :delay="180" class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card lg:col-span-2">
        <div class="flex items-center gap-2">
          <Mail class="h-5 w-5 text-brand-600" />
          <h2 class="text-lg font-bold text-slate-900">Deal alerts</h2>
        </div>
        <p class="mt-2 text-sm text-slate-600">Get email when we verify hot Temu codes.</p>
        <form class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="saveNewsletter">
          <input v-model="newsletterEmail" type="email" required class="flex-1 rounded-xl border border-slate-200 px-4 py-2.5">
          <button type="submit" class="btn-primary shrink-0">Save alerts</button>
        </form>
        <p v-if="newsletterMessage" class="mt-2 text-sm text-brand-700">{{ newsletterMessage }}</p>
      </FadeInSection>
    </div>
  </div>
</template>
