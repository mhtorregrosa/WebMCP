import type { Product } from '../domain/types'

export const products: Product[] = [
  // Hosting — official vendor pricing checked 2026-08-29.
  {
    id: 'hostinger-premium-48m', vendor: 'Hostinger', name: 'Premium (48-month offer)', category: 'hosting',
    description: 'Managed hosting for small sites with WordPress, weekly backups and email.',
    pricing: { currency: 'EUR', initialTermMonths: 48, initialTermTotal: 124.32, renewalAnnual: 119.88, monthlyListPrice: 11.99, promotional: true },
    features: ['managed_hosting', 'wordpress', 'weekly_backups', 'site_builder', 'email'], simplicity: 9, markets: ['ES'],
    source: { url: 'https://www.hostinger.com/es/hosting-web', verifiedAt: '2026-08-29', note: 'Observed: €2.59/mo equivalent on 48-month term; €124.32 upfront; renews €9.99/mo.' },
  },
  {
    id: 'hostinger-business-48m', vendor: 'Hostinger', name: 'Business (48-month offer)', category: 'hosting',
    description: 'Managed hosting for growing sites with WordPress, daily backups, app hosting and higher resources.',
    pricing: { currency: 'EUR', initialTermMonths: 48, initialTermTotal: 181.92, renewalAnnual: 203.88, monthlyListPrice: 18.99, promotional: true },
    features: ['managed_hosting', 'wordpress', 'daily_backups', 'site_builder', 'email'], simplicity: 8, markets: ['ES'],
    source: { url: 'https://www.hostinger.com/es/hosting-apps-web', verifiedAt: '2026-08-29', note: 'Observed: €3.79/mo equivalent on 48-month term; €181.92 upfront; renews €16.99/mo.' },
  },
  {
    id: 'siteground-startup-12m', vendor: 'SiteGround', name: 'StartUp (12-month offer)', category: 'hosting',
    description: 'Managed single-site hosting with WordPress, daily backups, CDN and email.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 35.88, renewalAnnual: 215.88, monthlyListPrice: 17.99, taxIncluded: false, promotional: true },
    features: ['managed_hosting', 'wordpress', 'daily_backups', 'site_builder', 'email'], simplicity: 9, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.siteground.com/web-hosting.htm', verifiedAt: '2026-08-29', note: 'Observed: $2.99/mo first 12 months; renews $17.99/mo. SiteGround states prices exclude VAT.' },
  },
  {
    id: 'siteground-growbig-12m', vendor: 'SiteGround', name: 'GrowBig (12-month offer)', category: 'hosting',
    description: 'Managed multi-site hosting with daily and on-demand backups, staging and higher resources.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 59.88, renewalAnnual: 359.88, monthlyListPrice: 29.99, taxIncluded: false, promotional: true },
    features: ['managed_hosting', 'wordpress', 'daily_backups', 'site_builder', 'email'], simplicity: 8, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.siteground.com/wordpress-hosting.htm', verifiedAt: '2026-08-29', note: 'Observed: $4.99/mo first 12 months; renews $29.99/mo. SiteGround states prices exclude VAT.' },
  },
  {
    id: 'siteground-gogeek-12m', vendor: 'SiteGround', name: 'GoGeek (12-month offer)', category: 'hosting',
    description: 'Higher-tier managed WordPress hosting with staging, Git, private DNS and priority support.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 95.88, renewalAnnual: 539.88, monthlyListPrice: 44.99, taxIncluded: false, promotional: true },
    features: ['managed_hosting', 'wordpress', 'daily_backups', 'site_builder', 'email'], simplicity: 7, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.siteground.com/wordpress-hosting.htm', verifiedAt: '2026-08-29', note: 'Observed: $7.99/mo first 12 months; renews $44.99/mo. SiteGround states prices exclude VAT.' },
  },

  // SEO / visibility — official vendor pricing and plan documentation checked 2026-08-29.
  {
    id: 'semrush-seo-pro-annual', vendor: 'Semrush', name: 'SEO Pro (annual billing)', category: 'seo',
    description: 'SEO toolkit for freelancers and small businesses with audits, keyword research, rank tracking and MCP access.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 1407.96, renewalAnnual: 1407.96, monthlyListPrice: 139.95, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis', 'mcp_access'], simplicity: 7, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.semrush.com/kb/1624-semrush-one-vs-seo-toolkit', verifiedAt: '2026-08-29', note: 'Official Semrush documentation: Pro $139.95 monthly; annual billing equivalent $117.33/mo, billed upfront.' },
  },
  {
    id: 'semrush-seo-guru-annual', vendor: 'Semrush', name: 'SEO Guru (annual billing)', category: 'seo',
    description: 'SEO toolkit for growing teams with higher limits, historical data, content tools and MCP access.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 2499.96, renewalAnnual: 2499.96, monthlyListPrice: 249.95, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis', 'mcp_access'], simplicity: 6, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.semrush.com/kb/1624-semrush-one-vs-seo-toolkit', verifiedAt: '2026-08-29', note: 'Official Semrush documentation: Guru $249.95 monthly; annual billing equivalent $208.33/mo, billed upfront.' },
  },
  {
    id: 'semrush-seo-business-annual', vendor: 'Semrush', name: 'SEO Business (annual billing)', category: 'seo',
    description: 'Higher-limit SEO toolkit for agencies and established teams, with MCP and optional Standard API access.',
    pricing: { currency: 'USD', initialTermMonths: 12, initialTermTotal: 4999.92, renewalAnnual: 4999.92, monthlyListPrice: 499.95, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis', 'mcp_access', 'api'], simplicity: 5, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://www.semrush.com/kb/1547-seo-toolkit-pricing-and-plans', verifiedAt: '2026-08-29', note: 'Business is $499.95/month; official API docs state Standard API is an add-on available to SEO Business subscribers. Annual equivalent is $416.66/mo.' },
  },
  {
    id: 'ahrefs-starter-monthly', vendor: 'Ahrefs', name: 'Starter', category: 'seo',
    description: 'Entry SEO plan with Site Explorer, Keywords Explorer, Site Audit and Rank Tracker.',
    pricing: { currency: 'USD', initialTermMonths: 1, initialTermTotal: 29, renewalAnnual: 348, monthlyListPrice: 29, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis'], simplicity: 8, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://help.ahrefs.com/en/articles/9419051-about-ahrefs-starter-plan', verifiedAt: '2026-08-29', note: 'Official Help Center lists Starter at $29/month. Renewal annual value is the 12-month normalized recurring cost.' },
  },
  {
    id: 'ahrefs-lite-monthly', vendor: 'Ahrefs', name: 'Lite', category: 'seo',
    description: 'Small-business SEO plan with larger limits plus direct API and MCP access.',
    pricing: { currency: 'USD', initialTermMonths: 1, initialTermTotal: 129, renewalAnnual: 1548, monthlyListPrice: 129, promotional: false },
    features: ['seo_audit', 'rank_tracking', 'keyword_research', 'competitor_analysis', 'mcp_access', 'api'], simplicity: 7, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://ahrefs.com/pricing', verifiedAt: '2026-08-29', note: 'Official pricing page lists Lite at $129/month and includes direct API access plus MCP Server. Renewal annual value is the 12-month normalized recurring cost.' },
  },

  // VPN / security — official vendor checkout/pricing checked 2026-08-29.
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
  {
    id: 'expressvpn-basic-28m', vendor: 'ExpressVPN', name: 'Basic (28-month offer)', category: 'vpn',
    description: 'Core VPN plan with up to 10 simultaneous devices and lite malicious-site protection.',
    pricing: { currency: 'USD', initialTermMonths: 28, initialTermTotal: 83.72, renewalAnnual: 99.95, taxIncluded: false, promotional: true },
    features: ['vpn'], simplicity: 9, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://checkout.expressvpn.com/es/pricing', verifiedAt: '2026-08-29', note: 'Observed $83.72 for first 28 months ($2.99/mo equivalent); then auto-renews at $99.95 annually. Sales tax may apply.' },
  },
  {
    id: 'expressvpn-advanced-28m', vendor: 'ExpressVPN', name: 'Advanced (28-month offer)', category: 'vpn',
    description: 'VPN suite with up to 12 simultaneous devices, advanced web protection and an unlimited password manager.',
    pricing: { currency: 'USD', initialTermMonths: 28, initialTermTotal: 125.72, renewalAnnual: 119.95, taxIncluded: false, promotional: true },
    features: ['vpn', 'password_manager'], simplicity: 8, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://checkout.expressvpn.com/es/pricing', verifiedAt: '2026-08-29', note: 'Observed $125.72 for first 28 months ($4.49/mo equivalent); then auto-renews at $119.95 annually. Sales tax may apply.' },
  },
  {
    id: 'expressvpn-pro-28m', vendor: 'ExpressVPN', name: 'Pro (28-month offer)', category: 'vpn',
    description: 'Top ExpressVPN suite with up to 14 simultaneous devices, advanced web protection and password manager.',
    pricing: { currency: 'USD', initialTermMonths: 28, initialTermTotal: 209.72, renewalAnnual: 199.95, taxIncluded: false, promotional: true },
    features: ['vpn', 'password_manager'], simplicity: 7, markets: ['ES', 'GLOBAL'],
    source: { url: 'https://checkout.expressvpn.com/es/pricing', verifiedAt: '2026-08-29', note: 'Observed $209.72 for first 28 months ($7.49/mo equivalent); then auto-renews at $199.95 annually. Sales tax may apply.' },
  },
]
