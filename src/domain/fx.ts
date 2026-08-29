import type { Currency } from './types'

// ECB reference rates, 28 Aug 2026. Quoted as units of foreign currency per EUR.
// Informational planning only; not transaction pricing.
export const FX_AS_OF = '2026-08-28'
const perEur: Record<Currency, number> = {
  EUR: 1,
  USD: 1.1643,
  GBP: 0.8572,
}

export function toEur(amount: number, currency: Currency): number {
  return amount / perEur[currency]
}

export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
