import type { Product } from '../domain/types'

export const products: Product[] = [
  {
    id: 'hostinger-premium-48m', vendor: 'Hostinger', name: 'Premium (48-month offer)', category: 'hosting',
    description: 'Managed hosting for small sites with WordPress, weekly backups and email.',
    pricing: { currency: 'EUR', initialTermMonths: 48, initialTermTotal: 124.32, renewalAnnual: 119.88, monthlyListPrice: 11.99, promotional: true },
    features: ['managed_hosting', 'wordpress', 'weekly_backups', 'site_builder', 'email'], simplicity: 9, markets: ['ES'],
    source: { url: 'https://www.hostinger.com/es/hosting-web', verifiedAt: '2026-08-29', note: 'Observed: €2.59/mo equivalent on 48-month term; €124.32 upfront; renews €9.99/mo.' },
  },
  {
    id: 'siteground-startup-12m', vendor: 'SiteGround', name: 'StartUp (12-month offer)', category: 'hosting',
    description: 'Managed single-site hosting with WordPress, daily backups, CDN and email.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 35.88, renewalAnnual: 215.88, monthlyListPrice: 17.99, promotional: true },
    features: ['managed_hosting', 'wordpress', 'daily_backups', 'site_builder', 'email'], simplicity: 9, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.siteground.com/web-hosting.htm', verifiedAt: '2026-08-29', note: 'Observed: $2.99/mo first 12 months; renews $17.99/mo.' },
  },
  {
    id: 'semrush-seo-pro-annual', vendor: 'Semrush', name: 'SEO Pro (annual billing)', category: 'seo',
    description: 'SEO suite for small businesses with site audit, keyword research and rank tracking.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 1407.96, renewalAnnual: 1407.96, monthlyListPrice: 139, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis', 'mcp_access'], simplicity: 7, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.semrush.com/pricing/', verifiedAt: '2026-08-29', note: 'Observed annual-billing equivalent $117.33/mo; monthly list price $139.' },
  },
  {
    id: 'ahrefs-starter-monthly', vendor: 'Ahrefs', name: 'Starter', category: 'seo',
    description: 'Entry SEO plan with Site Explorer, Keywords Explorer, Site Audit and Rank Tracker.',
    pricing: { currency: 'USD', initialTermMonths: 1, initialTermTotal: 29, renewalAnnual: 348, monthlyListPrice: 29, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis'], simplicity: 8, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://help.ahrefs.com/en/articles/9419051-about-ahrefs-starter-plan', verifiedAt: '2026-08-29', note: 'Official Help Center lists Starter at $29/month.' },
  },
  {
    id: 'nordvpn-basic-27m', vendor: 'NordVPN', name: 'Basic (27-month offer)', category: 'vpn',
    description: 'VPN plan covering up to 10 simultaneous devices.',
    pricing: { currency: 'USD', initialTermMonths: 27, initialTermTotal: 94.23, renewalAnnual: 139.08, promotional: true },
    features: ['vpn', 'dark_web_monitor'], simplicity: 9, markets: ['ES'],
    source: { url: 'https://nordvpn.com/es/pricing/', verifiedAt: '2026-08-29', note: 'Observed $94.23 for first 27 months; renewal $139.08/year. Taxes may apply.' },
  },
  {
    id: 'nordvpn-complete-27m', vendor: 'NordVPN', name: 'Complete (27-month offer)', category: 'vpn',
    description: 'VPN bundle adding malware protection, password manager and 1 TB cloud storage.',
    pricing: { currency: 'USD', initialTermMonths: 27, initialTermTotal: 121.23, renewalAnnual: 219.48, promotional: true },
    features: ['vpn', 'dark_web_monitor', 'malware_protection', 'password_manager', 'cloud_storage'], simplicity: 8, markets: ['ES'],
    source: { url: 'https://nordvpn.com/es/pricing/', verifiedAt: '2026-08-29', note: 'Observed $121.23 for first 27 months; renewal $219.48/year. Taxes may apply.' },
  },
]
