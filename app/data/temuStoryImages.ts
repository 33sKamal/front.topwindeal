export type TemuStorySlide = {
  id: string
  src: string
  alt: string
  title: string
  caption: string
}

/** Unsplash — lifestyle / shopping context for Temu + TopWinDeal story */
export const temuStorySlides: TemuStorySlide[] = [
  {
    id: 'phone-codes',
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    alt: 'Person searching Temu coupon codes on a smartphone',
    title: 'Hunt codes on your phone',
    caption: 'Shoppers paste Temu promo codes at checkout in seconds.',
  },
  {
    id: 'happy-savings',
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    alt: 'Friends celebrating after saving on online shopping',
    title: 'Real savings, real smiles',
    caption: 'TopWinDeal members share winning offers with friends.',
  },
  {
    id: 'shopping-together',
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    alt: 'People shopping together and comparing deals',
    title: 'Shop smarter together',
    caption: 'Find category deals from fashion to home in one place.',
  },
]

export const heroHappyShoppersSrc =
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85'

/** Cross-fade carousel in the hero (right column) */
export const heroCarouselSlides: TemuStorySlide[] = [
  {
    id: 'hero-happy',
    src: heroHappyShoppersSrc,
    alt: 'Happy shoppers celebrating savings from great online deals',
    title: 'Win with TopWinDeal',
    caption: 'Happy shoppers celebrating savings thanks to TopWinDeal.',
  },
  ...temuStorySlides,
]
