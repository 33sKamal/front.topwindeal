# TopWinDeal frontoffice (landing + customer site)

Nuxt app — **public landing** (`/`), coupons, deals, login/register, and account pages.  
Copied from `mycoupon/frontoffice.mycoupon` and wired to **dashboard.topwindeal** customer API.

## Local dev

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3112  
- API: proxied to `http://127.0.0.1:8294/api` (start dashboard Sail first)

Optional: `cp .env.example .env` to set production URLs for builds.

## Production

Static export for **topwindeal.com** — see `../DEPLOY.md`.
