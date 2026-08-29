import type { Product } from '../domain/types'

export function validateProducts(products: Product[]): string[] {
  const errors: string[] = []
  const ids = new Set<string>()

  for (const product of products) {
    if (ids.has(product.id)) errors.push(`duplicate id: ${product.id}`)
    ids.add(product.id)

    if (product.pricing.initialTermMonths <= 0) errors.push(`${product.id}: initialTermMonths must be > 0`)
    if (product.pricing.initialTermTotal < 0) errors.push(`${product.id}: initialTermTotal must be >= 0`)
    if (product.pricing.renewalAnnual != null && product.pricing.renewalAnnual < 0) errors.push(`${product.id}: renewalAnnual must be >= 0`)
    if (product.simplicity < 0 || product.simplicity > 10) errors.push(`${product.id}: simplicity must be between 0 and 10`)
    if (product.markets.length === 0) errors.push(`${product.id}: at least one market is required`)
    if (!product.source.url.startsWith('https://')) errors.push(`${product.id}: source must use https`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(product.source.verifiedAt)) errors.push(`${product.id}: verifiedAt must be YYYY-MM-DD`)
    if (Number.isNaN(Date.parse(`${product.source.verifiedAt}T00:00:00Z`))) errors.push(`${product.id}: verifiedAt is not a valid date`)
  }

  return errors
}
