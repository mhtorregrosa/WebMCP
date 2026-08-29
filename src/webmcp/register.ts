import { products } from '../data/products'
import { compareProducts, optimizeCurrentStack, recommendStack } from '../domain/recommender'
import { calculateProductCost } from '../domain/tco'
import type { Category, Feature, RecommendInput } from '../domain/types'

const categorySchema = { type: 'string', enum: ['hosting', 'seo', 'vpn'] }
const featureSchema = { type: 'string' }

export async function registerWebMCPTools(onAgentRecommendation?: (input: RecommendInput) => void) {
  if (!document.modelContext) return () => undefined
  const controller = new AbortController()
  const options = { signal: controller.signal }

  await document.modelContext.registerTool({
    name: 'recommend_stack',
    title: 'Recommend a software stack',
    description: 'Build a source-backed software stack for requested categories, required capabilities and an optional monthly EUR planning budget. Use this when the user wants to choose software rather than merely browse products.',
    inputSchema: {
      type: 'object',
      properties: {
        categories: { type: 'array', items: categorySchema, minItems: 1 },
        requirements: { type: 'array', items: featureSchema },
        budgetEurMonthly: { type: 'number', minimum: 0 },
        market: { type: 'string', default: 'ES' },
        priority: { type: 'string', enum: ['balanced', 'lowest_cost', 'simplicity'], default: 'balanced' },
      },
      required: ['categories'],
    },
    annotations: { readOnlyHint: true },
    execute: async (raw) => {
      const input = raw as RecommendInput
      onAgentRecommendation?.(input)
      return JSON.stringify(recommendStack(products, input))
    },
  }, options)

  await document.modelContext.registerTool({
    name: 'compare_products',
    title: 'Compare software products',
    description: 'Compare specific StackPilot products using the same deterministic feature-fit and TCO engine used by the human interface.',
    inputSchema: {
      type: 'object',
      properties: {
        productIds: { type: 'array', items: { type: 'string' }, minItems: 2 },
        requirements: { type: 'array', items: featureSchema },
      },
      required: ['productIds'],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ productIds, requirements = [] }) => JSON.stringify(compareProducts(products, productIds, requirements as Feature[])),
  }, options)

  await document.modelContext.registerTool({
    name: 'calculate_total_cost',
    title: 'Calculate product total cost',
    description: 'Calculate first-term monthly-equivalent and renewal-normalized EUR cost for one or more catalog products, using the stored official commercial terms and dated ECB planning FX rates.',
    inputSchema: {
      type: 'object',
      properties: { productIds: { type: 'array', items: { type: 'string' }, minItems: 1 } },
      required: ['productIds'],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ productIds }) => JSON.stringify((productIds as string[]).map((id) => {
      const product = products.find((item) => item.id === id)
      return product ? { id, cost: calculateProductCost(product), source: product.source } : { id, error: 'unknown_product' }
    })),
  }, options)

  await document.modelContext.registerTool({
    name: 'optimize_current_stack',
    title: 'Optimize an existing software stack',
    description: 'Find a compatible lower-cost replacement stack and quantify indicative monthly and annualized savings versus the user’s current StackPilot product IDs.',
    inputSchema: {
      type: 'object',
      properties: {
        currentProductIds: { type: 'array', items: { type: 'string' }, minItems: 1 },
        categories: { type: 'array', items: categorySchema, minItems: 1 },
        requirements: { type: 'array', items: featureSchema },
        budgetEurMonthly: { type: 'number', minimum: 0 },
        market: { type: 'string', default: 'ES' },
      },
      required: ['currentProductIds', 'categories'],
    },
    annotations: { readOnlyHint: true },
    execute: async ({ currentProductIds, ...input }) => JSON.stringify(optimizeCurrentStack(products, currentProductIds as string[], input as RecommendInput)),
  }, options)

  return () => controller.abort()
}
