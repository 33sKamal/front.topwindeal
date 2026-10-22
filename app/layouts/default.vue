<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <slot />
    </main>
    <FadeInSection as="footer" class="border-t border-brand-100 bg-white py-10 text-center text-sm text-slate-500">
      © {{ new Date().getFullYear() }} TopWinDeal — Coupons & deals you can trust.
    </FadeInSection>
    <NewsletterModal />
  </div>
</template>
