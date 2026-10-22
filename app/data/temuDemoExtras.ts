import type { CouponItem } from '~/components/CouponCard.vue'

import { TEMU_LOGO_SRC } from '~/constants/temuBrand'

const temuStore = { name: 'Temu', logo_url: TEMU_LOGO_SRC }

/** Extra demo cards shown on the landing page alongside API results */
export const temuDemoExtras: CouponItem[] = [
  {
    id: 9001,
    title: 'Lightning Deal — 88% OFF Select Items',
    description: 'Limited stock. Winning offer ends midnight.',
    code: 'FLASH88',
    badge: 'Exclusive',
    is_verified: true,
    is_premium: true,
    deal_type: 'coupon',
    store: temuStore,
  },
  {
    id: 9002,
    title: 'Refer a Friend — $20 Credit Each',
    description: 'Stack with new-user coupons.',
    code: 'REFER20',
    badge: 'Top Pick',
    is_verified: true,
    is_premium: false,
    deal_type: 'coupon',
    store: temuStore,
  },
  {
    id: 9003,
    title: 'App-Only: Extra 10% OFF',
    description: 'Open Temu app and apply at checkout.',
    code: 'APP10',
    badge: 'Sale',
    is_verified: true,
    is_premium: false,
    deal_type: 'coupon',
    store: temuStore,
  },
  {
    id: 9004,
    title: 'Clearance Event — No Code Needed',
    description: 'Prices already slashed in the clearance hub.',
    code: null,
    badge: 'Most Popular',
    is_verified: true,
    is_premium: false,
    deal_type: 'deal',
    store: temuStore,
  },
]
