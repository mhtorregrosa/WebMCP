import { describe, expect, it } from 'vitest'
import { products } from '../src/data/products'
import { validateProducts } from '../src/data/validate'
import { toEur } from '../src/domain/fx'
import { optimizeCurrentStack, recommendStack } from '../src/domain/recommender'
import { calculateProductCost } from '../src/domain/tco'

describe('dataset', () => {
  it('passes structural validation', () => {
    expect(validateProducts(products)).toEqual([])
  })

  it('contains exactly five verified plans per seed category', () => {
    expect(products).toHaveLength(15)
    expect(products.filter((product) => product.category === 'hosting')).toHaveLength(5)
    expect(products.filter((product) => product.category === 'seo')).toHaveLength(5)
    expect(products.filter((product) => product.category === 'vpn')).toHaveLength(5)
  })

  it('has at least two vendors per category', () => {
    for (const category of ['hosting', 'seo', 'vpn'] as const) {
      expect(new Set(products.filter((product) => product.category === category).map((product) => product.vendor)).size).toBeGreaterThanOrEqual(2)
    }
  })

  it('detects duplicate IDs', () => {
    expect(validateProducts([products[0], products[0]])).toContain(`duplicate id: ${products[0].id}`)
  })
})

describe('FX', () => {
  it('converts ECB-quoted USD and GBP to EUR', () => {
    expect(toEur(1.1643, 'USD')).toBeCloseTo(1, 6)
    expect(toEur(0.8572, 'GBP')).toBeCloseTo(1, 6)
  })
})

describe('TCO', () => {
  it('separates Hostinger introductory and renewal-normalized cost', () => {
    const product = products.find((item) => item.id === 'hostinger-premium-48m')!
    const cost = calculateProductCost(product)
    expect(cost.firstTermMonthlyEur).toBe(2.59)
    expect(cost.renewalMonthlyEur).toBe(9.99)
  })

  it('normalizes an ExpressVPN multi-year offer and annual renewal independently', () => {
    const product = products.find((item) => item.id === 'expressvpn-basic-28m')!
    const cost = calculateProductCost(product)
    expect(cost.firstTermMonthlyEur).toBeCloseTo(2.57, 2)
    expect(cost.renewalMonthlyEur).toBeCloseTo(7.15, 2)
  })
})

describe('recommendStack', () => {
  it('selects one compatible product per requested category', () => {
    const result = recommendStack(products, { categories: ['hosting', 'seo', 'vpn'], market: 'ES', priority: 'balanced' })
    expect(result.selected).toHaveLength(3)
    expect(result.complete).toBe(true)
    expect(new Set(result.selected.map((item) => item.product.category)).size).toBe(3)
  })

  it('honors a hard feature requirement without pinning a vendor', () => {
    const result = recommendStack(products, { categories: ['vpn'], requirements: ['password_manager'], market: 'ES' })
    expect(result.selected).toHaveLength(1)
    expect(result.selected[0].product.features).toContain('password_manager')
    expect(result.complete).toBe(true)
  })

  it('can satisfy API access now that verified plans expose it', () => {
    const result = recommendStack(products, { categories: ['seo'], requirements: ['api'], market: 'ES' })
    expect(result.complete).toBe(true)
    expect(result.selected[0].product.features).toContain('api')
  })

  it('keeps an impossible SSO requirement instead of silently dropping it', () => {
    const result = recommendStack(products, { categories: ['seo'], requirements: ['sso'], budgetEurMonthly: 500, market: 'ES' })
    expect(result.selected).toHaveLength(0)
    expect(result.complete).toBe(false)
    expect(result.withinBudget).toBeNull()
    expect(result.rationale.some((line) => line.includes('No seo product'))).toBe(true)
  })

  it('reports whether a complete recommended stack is inside budget', () => {
    const result = recommendStack(products, { categories: ['hosting'], budgetEurMonthly: 3, market: 'ES', priority: 'lowest_cost' })
    expect(result.complete).toBe(true)
    expect(result.withinBudget).toBe(true)
  })
})

describe('optimizeCurrentStack', () => {
  it('returns a reproducible savings calculation for a complete recommendation', () => {
    const result = optimizeCurrentStack(products, ['semrush-seo-pro-annual'], { categories: ['seo'], market: 'ES', priority: 'lowest_cost' })
    expect(result.comparable).toBe(true)
    expect(result.currentMonthlyEur).toBeGreaterThan(result.recommendedMonthlyEur)
    expect(result.annualizedSavingEur).toBeGreaterThan(0)
  })

  it('does not claim savings when the replacement stack is incomplete', () => {
    const result = optimizeCurrentStack(products, ['semrush-seo-pro-annual'], { categories: ['seo'], requirements: ['sso'], market: 'ES' })
    expect(result.comparable).toBe(false)
    expect(result.monthlySavingEur).toBeUndefined()
    expect(result.annualizedSavingEur).toBeUndefined()
  })
})
