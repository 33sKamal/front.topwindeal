<script setup lang="ts">
import {
  BadgeCheck,
  Bell,
  Crown,
  Infinity,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
} from '@lucide/vue'

const subscribeUrl = '/account'

useSeoMeta({
  title: 'Premium Club — TopWinDeal × Temu',
  description: 'Unlimited Temu coupon reveals, premium codes, and weekly WhatsApp deal alerts for $3/month.',
})

const perks = [
  {
    icon: Infinity,
    title: 'Unlimited coupon reveals',
    text: 'No hourly IP cap. Show every code instantly — including premium & exclusive Temu offers.',
  },
  {
    icon: Crown,
    title: 'Premium coupon vault',
    text: 'Access member-only codes the free tier cannot unlock.',
  },
  {
    icon: MessageCircle,
    title: 'Weekly WhatsApp digest',
    text: 'Curated best deals pushed to your phone as soon as they go live — no spam, just winners.',
  },
  {
    icon: Bell,
    title: 'Flash sale alerts',
    text: 'Be first when limited-time Temu promos drop.',
  },
  {
    icon: Shield,
    title: 'Verified picks only',
    text: 'Our team filters noise so you only see codes that still work.',
  },
  {
    icon: Zap,
    title: 'One-tap copy & shop',
    text: 'From alert to checkout in seconds on mobile.',
  },
]

const steps = [
  'Join Premium Club for $3/month',
  'Add your WhatsApp number in your account',
  'Get the weekly template message + instant flash alerts',
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Premium is month-to-month with no long-term contract.',
  },
  {
    q: 'How do WhatsApp alerts work?',
    a: 'We send an approved template message each week with our top Temu deals. You can opt in or out from your account settings.',
  },
  {
    q: 'Is this only for Temu?',
    a: 'TopWinDeal × Temu is Temu-focused today — every perk is tuned for Temu shoppers.',
  },
]
</script>

<template>
  <div class="overflow-hidden">
    <!-- Hero -->
    <FadeInSection
      as="section"
      immediate
      class="relative border-b border-amber-200/40 bg-gradient-to-br from-slate-900 via-brand-900 to-orange-950 text-white"
    >
      <div class="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div class="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" />
      <div class="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p class="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-200">
              <Sparkles class="h-3.5 w-3.5" />
              Premium Club
            </p>
            <h1 class="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Only <span class="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">$3</span>/month
            </h1>
            <p class="mt-4 text-xl font-semibold text-amber-100/95">
              Unlimited Temu coupons. Weekly WhatsApp deals. Zero hourly limits.
            </p>
            <p class="mt-4 max-w-lg text-base leading-relaxed text-slate-300">
              Stop waiting for reveal timers. Join Premium Club and unlock every code, plus get the best Temu offers delivered to WhatsApp the moment we verify them.
            </p>
            <div class="mt-8 flex flex-wrap items-center gap-4">
              <a :href="subscribeUrl" class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-orange-500/30 transition hover:brightness-110">
                <Crown class="h-5 w-5" />
                Join Premium Club
              </a>
              <NuxtLink to="/" class="btn-outline border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                Browse free deals
              </NuxtLink>
            </div>
            <p class="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <BadgeCheck class="h-4 w-4 text-emerald-400" />
              Cancel anytime · Temu-only · Member pricing
            </p>
          </div>

          <!-- WhatsApp mock -->
          <div class="mx-auto w-full max-w-sm lg:max-w-md">
            <div class="rounded-[2rem] border border-white/10 bg-slate-800/80 p-3 shadow-2xl backdrop-blur">
              <div class="rounded-[1.5rem] bg-[#0b141a] p-4">
                <div class="mb-4 flex items-center gap-3 border-b border-white/5 pb-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold">DW</div>
                  <div>
                    <p class="text-sm font-semibold text-white">TopWinDeal Alerts</p>
                    <p class="text-xs text-emerald-400">Weekly template · Verified</p>
                  </div>
                </div>
                <div class="space-y-3 text-sm">
                  <div class="max-w-[92%] rounded-2xl rounded-tl-sm bg-[#1f2c34] px-3 py-2.5 text-slate-100 shadow">
                    <p class="font-semibold text-amber-300">🔥 Your Temu picks — Week 39</p>
                    <p class="mt-2 text-slate-300 leading-relaxed">
                      Hi {{ '{' }}name{{ '}' }}! Here are this week's best verified deals:
                    </p>
                    <ul class="mt-2 space-y-1.5 text-slate-300">
                      <li>• <strong>90% OFF</strong> first order — Premium code inside</li>
                      <li>• <strong>Free shipping</strong> flash — ends Sunday</li>
                      <li>• <strong>Electronics</strong> bundle — members only</li>
                    </ul>
                    <p class="mt-2 text-xs text-slate-500">Tap to open TopWinDeal → reveal & copy in one tap.</p>
                    <p class="mt-2 text-[10px] text-slate-600 text-right">09:41</p>
                  </div>
                  <div class="ml-auto max-w-[75%] rounded-2xl rounded-tr-sm bg-[#005c4b] px-3 py-2 text-white">
                    Show me codes 👀
                    <p class="text-[10px] text-emerald-200/70 text-right">09:42</p>
                  </div>
                </div>
              </div>
            </div>
            <p class="mt-4 text-center text-xs text-slate-400">Example WhatsApp Business template message</p>
          </div>
        </div>
      </div>
    </FadeInSection>

    <!-- Price strip -->
    <FadeInSection as="section" class="border-b border-brand-100 bg-white" :delay="60">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 lg:flex-row lg:px-6">
        <div class="text-center lg:text-left">
          <p class="text-sm font-semibold uppercase tracking-wide text-brand-600">Simple pricing</p>
          <p class="mt-1 text-3xl font-bold text-slate-900">
            $3 <span class="text-lg font-medium text-slate-500">/ month</span>
          </p>
        </div>
        <ul class="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-slate-600">
          <li class="flex items-center gap-2"><Infinity class="h-4 w-4 text-brand-600" /> Unlimited reveals</li>
          <li class="flex items-center gap-2"><MessageCircle class="h-4 w-4 text-emerald-600" /> WhatsApp weekly</li>
          <li class="flex items-center gap-2"><Crown class="h-4 w-4 text-amber-500" /> Premium codes</li>
        </ul>
        <a :href="subscribeUrl" class="btn-primary shrink-0 bg-gradient-to-r from-brand-600 to-brand-700 px-8">
          Start for $3
        </a>
      </div>
    </FadeInSection>

    <!-- Perks -->
    <FadeInSection as="section" class="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20" :delay="80">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-slate-900">Everything in Premium Club</h2>
        <p class="mt-3 text-slate-600">Built for serious Temu savers — not another generic newsletter.</p>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="perk in perks"
          :key="perk.title"
          class="rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
        >
          <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <component :is="perk.icon" class="h-5 w-5" />
          </div>
          <h3 class="mt-4 text-lg font-bold text-slate-900">{{ perk.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ perk.text }}</p>
        </article>
      </div>
    </FadeInSection>

    <!-- How it works -->
    <FadeInSection as="section" class="bg-gradient-to-b from-brand-50/80 to-white py-16 lg:py-20" :delay="100">
      <div class="mx-auto max-w-3xl px-4 text-center lg:px-6">
        <h2 class="text-3xl font-bold text-slate-900">How it works</h2>
        <ol class="mt-10 space-y-6 text-left">
          <li
            v-for="(step, i) in steps"
            :key="step"
            class="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{{ i + 1 }}</span>
            <p class="pt-2 text-base font-medium text-slate-800">{{ step }}</p>
          </li>
        </ol>
      </div>
    </FadeInSection>

    <!-- FAQ -->
    <FadeInSection as="section" class="mx-auto max-w-3xl px-4 py-16 lg:px-6" :delay="120">
      <h2 class="text-center text-2xl font-bold text-slate-900">Questions</h2>
      <dl class="mt-8 space-y-4">
        <div v-for="item in faqs" :key="item.q" class="rounded-xl border border-brand-100 bg-white p-5">
          <dt class="font-semibold text-slate-900">{{ item.q }}</dt>
          <dd class="mt-2 text-sm text-slate-600">{{ item.a }}</dd>
        </div>
      </dl>
    </FadeInSection>

    <!-- Final CTA -->
    <FadeInSection as="section" class="border-t border-brand-100 bg-slate-900 px-4 py-16 text-center text-white lg:px-6" :delay="140">
      <Crown class="mx-auto h-10 w-10 text-amber-400" />
      <h2 class="mt-4 text-3xl font-bold">Ready for unlimited Temu coupons?</h2>
      <p class="mx-auto mt-3 max-w-md text-slate-400">
        $3/month. Unlimited reveals. Weekly WhatsApp with the best deals — as soon as they're live.
      </p>
      <a
        :href="subscribeUrl"
        class="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-base font-bold text-slate-900 shadow-lg transition hover:brightness-110"
      >
        Join Premium Club — $3/mo
      </a>
    </FadeInSection>
  </div>
</template>
