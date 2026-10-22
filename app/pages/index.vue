<script setup lang="ts">
import {
  Percent,
  Search,
  Shirt,
  Smartphone,
  Truck,
  UserPlus,
  Zap,
} from '@lucide/vue'
import type { CouponItem } from '~/components/CouponCard.vue'
import type { TemuCategory } from '~/components/TemuCategoryNav.vue'

type PaginatedCoupons = {
  data: CouponItem[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

type OfferTier = 'all' | 'normal' | 'premium'

const FILTER_DEBOUNCE_MS = 800

const pageDataOpts = useCustomerPageDataOptions()
const { api } = useTopWinDealApi()
const config = useRuntimeConfig()
const dashboardApiHint = computed(
  () => (config.public.dashboardUrl as string) || 'http://localhost:9485',
)
const route = useRoute()
const search = ref('')
const category = ref<string | null>((route.query.category as string) || null)
const page = ref(1)
const perPage = 20

/** Applied to API after debounce (category, tier, search typing) */
const appliedCategory = ref<string | null>(category.value)
const appliedSearch = ref('')
const appliedTier = ref<OfferTier>('all')

let filterDebounceTimer: ReturnType<typeof setTimeout> | null = null
const filtersDebouncing = ref(false)

const offerTier = ref<OfferTier>('all')

const popularFilters = [
  { label: '90% off', icon: Percent },
  { label: 'Free shipping', icon: Truck },
  { label: 'New user', icon: UserPlus },
  { label: 'Flash sale', icon: Zap },
  { label: 'Fashion', icon: Shirt },
  { label: 'Electronics', icon: Smartphone },
] as const

const tierOptions: { value: OfferTier; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'normal', label: 'Normal' },
  { value: 'premium', label: 'Premium' },
]

const emptyCoupons = (): PaginatedCoupons => ({
  data: [],
  meta: { current_page: 1, last_page: 1, per_page: perPage, total: 0 },
})

function buildCouponsPath() {
  const params = new URLSearchParams({
    per_page: String(perPage),
    page: String(page.value),
    store: 'temu',
  })
  if (appliedCategory.value) params.set('category', appliedCategory.value)
  if (appliedSearch.value) params.set('q', appliedSearch.value)
  if (appliedTier.value === 'normal') params.set('tier', 'normal')
  if (appliedTier.value === 'premium') params.set('tier', 'premium')
  return `/coupons?${params}`
}

function applyFiltersNow(resetPage = true) {
  appliedCategory.value = category.value
  appliedSearch.value = search.value
  appliedTier.value = offerTier.value
  if (resetPage) page.value = 1
}

function scheduleDebouncedFilters() {
  filtersDebouncing.value = true
  if (filterDebounceTimer) clearTimeout(filterDebounceTimer)
  filterDebounceTimer = setTimeout(() => {
    applyFiltersNow(true)
    filtersDebouncing.value = false
    filterDebounceTimer = null
  }, FILTER_DEBOUNCE_MS)
}

function cancelDebouncedFilters() {
  if (filterDebounceTimer) {
    clearTimeout(filterDebounceTimer)
    filterDebounceTimer = null
  }
  filtersDebouncing.value = false
}

const { data: categories, pending: categoriesPending } = await useAsyncData(
  'temu-categories',
  () => api<{ data: TemuCategory[] }>('/categories'),
  { ...pageDataOpts, default: () => ({ data: [] }) },
)

const couponsFetchKey = computed(() =>
  JSON.stringify({
    page: page.value,
    category: appliedCategory.value,
    q: appliedSearch.value,
    tier: appliedTier.value,
  }),
)

const {
  data: coupons,
  pending: couponsPending,
  error: couponsError,
  refresh: refreshCoupons,
} = await useAsyncData(
  'temu-home-coupons',
  () => api<PaginatedCoupons>(buildCouponsPath()),
  {
    ...pageDataOpts,
    default: emptyCoupons,
    watch: [couponsFetchKey],
    dedupe: 'defer',
  },
)

watch(
  () => route.query.category,
  (q) => {
    category.value = (q as string) || null
    scheduleDebouncedFilters()
  },
)

watch(search, () => scheduleDebouncedFilters())
watch(category, () => scheduleDebouncedFilters())
watch(offerTier, () => scheduleDebouncedFilters())

onUnmounted(() => cancelDebouncedFilters())

function runSearch() {
  cancelDebouncedFilters()
  applyFiltersNow(true)
}

function applyPopularFilter(label: string) {
  search.value = label
  cancelDebouncedFilters()
  applyFiltersNow(true)
}

function isPopularFilterActive(label: string) {
  return appliedSearch.value === label || search.value === label
}

function onPageChange(next: number) {
  page.value = next
  if (import.meta.client) {
    document.getElementById('coupons')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const couponList = computed(() => coupons.value?.data ?? [])
const pagination = computed(() => coupons.value?.meta ?? emptyCoupons().meta)
const categoryList = computed(() => categories.value?.data ?? [])
const temuCouponCount = computed(() => pagination.value.total || 0)
const couponsLoading = computed(() => couponsPending.value || filtersDebouncing.value)
const skeletonCount = perPage
</script>

<template>
  <div>
    <section class="relative overflow-x-hidden border-b border-brand-900/10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.15),_transparent_55%)]" />

      <FadeInSection immediate class="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2 lg:items-center lg:px-6 lg:py-20">
        <div>
          <h1 class="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            Save big on Temu —<br>
            <span class="text-emerald-200">thanks to TopWinDeal</span>
          </h1>
          <p class="mt-5 max-w-xl text-lg text-emerald-50/90">
            Join thousands who copy verified codes, hit flash sales, and checkout happier. We find the winning offers so you don't have to.
          </p>

          <form class="mt-8 flex flex-col gap-3 sm:flex-row" @submit.prevent="runSearch">
            <div class="relative flex-1">
              <Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                v-model="search"
                type="search"
                placeholder="Search Temu coupons, codes, categories…"
                class="w-full rounded-2xl border-0 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 shadow-glow focus:outline-none focus:ring-2 focus:ring-amber-300"
              >
            </div>
            <button type="submit" class="shrink-0 rounded-2xl bg-amber-400 px-8 py-3.5 text-sm font-bold text-emerald-950 shadow-lg transition hover:bg-amber-300">
              Find deals
            </button>
          </form>
        </div>

        <HeroFadeCarousel />
      </FadeInSection>
    </section>

    <FadeInSection id="coupons" as="section" class="mx-auto max-w-7xl px-4 pb-16 pt-10 lg:px-6" :delay="80">
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div class="min-w-0 flex-1">
          <h2 class="text-2xl font-bold text-slate-900">Temu winning offers</h2>
          <p class="text-sm text-slate-500">{{ temuCouponCount }} verified codes · 20 per page · 4 columns</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="filter in popularFilters"
              :key="filter.label"
              type="button"
              class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ring-1"
              :class="isPopularFilterActive(filter.label)
                ? 'bg-brand-600 text-white ring-brand-600 shadow-sm'
                : 'bg-white text-slate-700 ring-brand-100 hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200'"
              @click="applyPopularFilter(filter.label)"
            >
              <component :is="filter.icon" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {{ filter.label }}
            </button>
          </div>
        </div>
        <div class="flex rounded-full border border-brand-200 bg-white p-1 shadow-sm" role="group" aria-label="Coupon type">
          <button
            v-for="opt in tierOptions"
            :key="opt.value"
            type="button"
            class="rounded-full px-4 py-2 text-sm font-semibold transition"
            :class="offerTier === opt.value
              ? opt.value === 'premium'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-sm'
                : 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-brand-50 hover:text-brand-800'"
            @click="offerTier = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <div class="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-5 lg:px-6">
        <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">
          Filter by category
        </h3>
        <CategoryNavSkeleton v-if="categoriesPending" />
        <TemuCategoryNav v-else v-model="category" :categories="categoryList" />
      </div>

      <div
        v-if="couponsError && !couponsLoading"
        class="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-8 text-center"
      >
        <p class="font-semibold text-rose-800">Could not load coupons</p>
        <p class="mt-1 text-sm text-rose-600">
          Make sure the dashboard API is running (Sail) at
          <code class="rounded bg-white px-1">{{ dashboardApiHint }}</code>
        </p>
        <button type="button" class="btn-primary mt-4" @click="refreshCoupons()">
          Try again
        </button>
      </div>

      <div
        v-else
        class="grid min-h-[28rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        aria-busy="couponsLoading"
      >
        <template v-if="couponsLoading">
          <CouponCardSkeleton v-for="n in skeletonCount" :key="`coupon-skeleton-${n}`" />
        </template>
        <template v-else-if="!couponList.length">
          <p class="col-span-full py-12 text-center text-slate-500">
            No coupons match your filters.
          </p>
        </template>
        <template v-else>
          <CouponCard v-for="c in couponList" :key="c.id" :coupon="c" />
        </template>
      </div>

      <CouponPagination
        v-if="!couponsLoading && !couponsError && pagination.last_page > 1"
        :current-page="pagination.current_page"
        :last-page="pagination.last_page"
        :total="pagination.total"
        @update:current-page="onPageChange"
      />
    </FadeInSection>
  </div>
</template>
