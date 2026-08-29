import { roundMoney, toEur } from './fx'
import type { Product } from './types'

export interface ProductCost {
  firstTermEur: number
  firstTermMonthlyEur: number
  renewalAnnualEur?: number
  renewalMonthlyEur?: number
}

export function calculateProductCost(product: Product): ProductCost {
  const firstTermEur = toEur(product.pricing.initialTermTotal, product.pricing.currency)
  const firstTermMonthlyEur = firstTermEur / product.pricing.initialTermMonths
  const renewalAnnualEur = product.pricing.renewalAnnual == null
    ? undefined
    : toEur(product.pricing.renewalAnnual, product.pricing.currency)

  return {
    firstTermEur: roundMoney(firstTermEur),
    firstTermMonthlyEur: roundMoney(firstTermMonthlyEur),
    renewalAnnualEur: renewalAnnualEur == null ? undefined : roundMoney(renewalAnnualEur),
    renewalMonthlyEur: renewalAnnualEur == null ? undefined : roundMoney(renewalAnnualEur / 12),
  }
}
