import { featureCategory } from './features'
import type { Category, Feature, Product } from './types'

export type ComparisonValidation =
  | { ok: true; category: Category }
  | { ok: false; code: 'unknown_product' | 'cross_category_comparison' | 'requirement_category_mismatch'; message: string }

export function validateComparison(products: Product[], productIds: string[], requirements: Feature[] = []): ComparisonValidation {
  const selected = productIds
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product))

  if (selected.length !== productIds.length) {
    return { ok: false, code: 'unknown_product', message: 'Every product ID must exist in the current StackPilot catalog.' }
  }

  const categories = new Set(selected.map((product) => product.category))
  if (categories.size !== 1) {
    return {
      ok: false,
      code: 'cross_category_comparison',
      message: 'StackPilot only compares products within the same category. Compare hosting with hosting, SEO with SEO, or VPN/security with VPN/security.',
    }
  }

  const category = selected[0].category
  const mismatchedRequirements = requirements.filter((feature) => featureCategory[feature] !== category)
  if (mismatchedRequirements.length > 0) {
    return {
      ok: false,
      code: 'requirement_category_mismatch',
      message: `Requirements ${mismatchedRequirements.join(', ')} do not belong to the ${category} category.`,
    }
  }

  return { ok: true, category }
}
