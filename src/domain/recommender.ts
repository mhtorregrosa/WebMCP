import { featureCategory } from './features'
import { FX_AS_OF, roundMoney } from './fx'
import { calculateProductCost } from './tco'
import type { Category, Feature, Product, ProductScore, RecommendInput, StackRecommendation } from './types'

function featureFit(product: Product, requirements: Feature[]): { fit: number; missing: Feature[] } {
  if (requirements.length === 0) return { fit: 1, missing: [] }
  const relevant = requirements.filter((feature) => product.features.includes(feature))
  const missing = requirements.filter((feature) => !product.features.includes(feature))
  return { fit: relevant.length / requirements.length, missing }
}

export function scoreProduct(product: Product, requirements: Feature[] = [], priority: RecommendInput['priority'] = 'balanced'): ProductScore {
  const cost = calculateProductCost(product)
  const { fit, missing } = featureFit(product, requirements)
  const costScore = 1 / (1 + cost.firstTermMonthlyEur / 100)
  const simplicityScore = product.simplicity / 10

  const weights = priority === 'lowest_cost'
    ? { feature: 0.55, cost: 0.35, simplicity: 0.10 }
    : priority === 'simplicity'
      ? { feature: 0.55, cost: 0.15, simplicity: 0.30 }
      : { feature: 0.65, cost: 0.20, simplicity: 0.15 }

  const score = 100 * (fit * weights.feature + costScore * weights.cost + simplicityScore * weights.simplicity)
  return {
    product,
    score: roundMoney(score),
    featureFit: roundMoney(fit * 100),
    monthlyEur: cost.firstTermMonthlyEur,
    renewalMonthlyEur: cost.renewalMonthlyEur,
    missingRequired: missing,
  }
}

function requirementsForCategory(requirements: Feature[], category: Category): Feature[] {
  return requirements.filter((feature) => featureCategory[feature] === category)
}

export function recommendStack(products: Product[], input: RecommendInput): StackRecommendation {
  const market = input.market ?? 'ES'
  const requirements = input.requirements ?? []
  const selected: ProductScore[] = []

  for (const category of input.categories) {
    const candidates = products.filter((product) => product.category === category && (product.markets.includes(market) || product.markets.includes('GLOBAL')))
    const categoryRequirements = requirementsForCategory(requirements, category)
    const ranked = candidates
      .map((product) => scoreProduct(product, categoryRequirements, input.priority))
      .filter((score) => score.missingRequired.length === 0)
      .sort((a, b) => b.score - a.score || a.monthlyEur - b.monthlyEur)

    if (ranked[0]) selected.push(ranked[0])
  }

  const complete = input.categories.length > 0 && selected.length === input.categories.length
  const monthlyEur = roundMoney(selected.reduce((sum, item) => sum + item.monthlyEur, 0))
  const renewalKnown = complete && selected.every((item) => item.renewalMonthlyEur != null)
  const renewalMonthlyEur = renewalKnown
    ? roundMoney(selected.reduce((sum, item) => sum + (item.renewalMonthlyEur ?? 0), 0))
    : undefined
  const withinBudget = input.budgetEurMonthly == null || !complete ? null : monthlyEur <= input.budgetEurMonthly

  const rationale = selected.map((item) => `${item.product.vendor} ${item.product.name}: ${item.featureFit}% required-feature fit; first-term equivalent €${item.monthlyEur}/mo.`)
  const missingCategories = input.categories.filter((category) => !selected.some((item) => item.product.category === category))
  for (const category of missingCategories) rationale.push(`No ${category} product in the current catalog satisfies all hard requirements for that category.`)
  if (input.budgetEurMonthly != null && complete) rationale.push(withinBudget ? 'The selected stack fits the stated monthly planning budget.' : 'The selected stack exceeds the stated monthly planning budget.')
  if (renewalMonthlyEur != null && renewalMonthlyEur > monthlyEur * 1.15) rationale.push('Renewal-normalized cost is materially higher than the introductory first-term equivalent.')

  return { selected, complete, monthlyEur, renewalMonthlyEur, withinBudget, rationale, fxAsOf: FX_AS_OF }
}

export function compareProducts(products: Product[], productIds: string[], requirements: Feature[] = []): ProductScore[] {
  return productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))
    .map((product) => scoreProduct(product, requirements))
    .sort((a, b) => b.score - a.score)
}

export function optimizeCurrentStack(products: Product[], currentProductIds: string[], input: RecommendInput) {
  const current = currentProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))
    .map((product) => ({ product, cost: calculateProductCost(product) }))

  const currentMonthlyEur = roundMoney(current.reduce((sum, item) => sum + item.cost.firstTermMonthlyEur, 0))
  const recommendation = recommendStack(products, input)
  const comparable = recommendation.complete
  const monthlySavingEur = comparable ? roundMoney(currentMonthlyEur - recommendation.monthlyEur) : undefined
  return {
    currentMonthlyEur,
    recommendedMonthlyEur: recommendation.monthlyEur,
    monthlySavingEur,
    annualizedSavingEur: monthlySavingEur == null ? undefined : roundMoney(monthlySavingEur * 12),
    comparable,
    recommendation,
  }
}
