export type Category = 'hosting' | 'seo' | 'vpn'
export type Currency = 'EUR' | 'USD' | 'GBP'

export type Feature =
  | 'managed_hosting'
  | 'wordpress'
  | 'daily_backups'
  | 'weekly_backups'
  | 'site_builder'
  | 'email'
  | 'seo_audit'
  | 'rank_tracking'
  | 'keyword_research'
  | 'competitor_analysis'
  | 'mcp_access'
  | 'api'
  | 'sso'
  | 'vpn'
  | 'malware_protection'
  | 'password_manager'
  | 'cloud_storage'
  | 'dark_web_monitor'

export interface SourceRecord {
  url: string
  verifiedAt: string
  note?: string
}

export interface Pricing {
  currency: Currency
  initialTermMonths: number
  initialTermTotal: number
  renewalAnnual?: number
  monthlyListPrice?: number
  taxIncluded?: boolean
  promotional: boolean
}

export interface Product {
  id: string
  vendor: string
  name: string
  category: Category
  description: string
  pricing: Pricing
  features: Feature[]
  simplicity: number
  markets: string[]
  source: SourceRecord
  evidence?: SourceRecord[]
}

export interface RecommendInput {
  categories: Category[]
  requirements?: Feature[]
  budgetEurMonthly?: number
  market?: string
  priority?: 'balanced' | 'lowest_cost' | 'simplicity'
}

export interface ProductScore {
  product: Product
  score: number
  featureFit: number
  monthlyEur: number
  renewalMonthlyEur?: number
  missingRequired: Feature[]
}

export interface StackRecommendation {
  selected: ProductScore[]
  complete: boolean
  monthlyEur: number
  renewalMonthlyEur?: number
  withinBudget: boolean | null
  rationale: string[]
  fxAsOf: string
}
