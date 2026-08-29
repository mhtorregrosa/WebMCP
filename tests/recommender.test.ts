import { describe, expect, it } from 'vitest'
import { products } from '../src/data/products'
import { toEur } from '../src/domain/fx'
import { optimizeCurrentStack, recommendStack } from '../src/domain/recommender'
import { calculateProductCost } from '../src/domain/tco'

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
})

describe('recommendStack', () => {
  it('selects one compatible product per requested category', () => {
    const result = recommendStack(products, { categories: ['hosting', 'seo', 'vpn'], market: 'ES', priority: 'balanced' })
    expect(result.selected).toHaveLength(3)
    expect(new Set(result.selected.map((item) => item.product.category)).size).toBe(3)
  })

  it('honors hard feature requirements within a category', () => {
    const result = recommendStack(products, { categories: ['vpn'], requirements: ['password_manager'], market: 'ES' })
    expect(result.selected[0].product.id).toBe('nordvpn-complete-27m')
  })

  it('reports whether the recommended stack is inside budget', () => {
    const result = recommendStack(products, { categories: ['hosting'], budgetEurMonthly: 3, market: 'ES', priority: 'lowest_cost' })
    expect(result.withinBudget).toBe(true)
  })
})

describe('optimizeCurrentStack', () => {
  it('returns a reproducible savings calculation', () => {
    const result = optimizeCurrentStack(products, ['semrush-seo-pro-annual'], { categories: ['seo'], market: 'ES', priority: 'lowest_cost' })
    expect(result.currentMonthlyEur).toBeGreaterThan(result.recommendedMonthlyEur)
    expect(result.annualizedSavingEur).toBeGreaterThan(0)
  })
})
