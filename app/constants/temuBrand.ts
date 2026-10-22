/** Local assets — Clearbit and other hotlinked logos often fail in dev */
export const TEMU_LOGO_SRC = '/images/temu-logo.svg'
export const HERO_WINNING_OFFERS_SRC = '/images/hero-winning-offers.svg'

export function resolveStoreLogo(storeName?: string | null, logoUrl?: string | null): string {
  if (storeName?.toLowerCase() === 'temu' || !logoUrl || logoUrl.includes('clearbit.com')) {
    return TEMU_LOGO_SRC
  }
  return logoUrl
}
