import { products } from '../data/catalog'
import { featureDefinitions } from '../domain/features'
import { compareProducts, optimizeCurrentStack, recommendStack } from '../domain/recommender'
import { calculateProductCost } from '../domain/tco'
import type { Category, Feature, RecommendInput } from '../domain/types'

const categories = ['hosting', 'seo', 'vpn'] as const satisfies readonly Category[]
const priorities = ['balanced', 'lowest_cost', 'simplicity'] as const
const knownFeatures = new Set<Feature>(featureDefinitions.map((feature) => feature.id))
const knownProductIds = new Set(products.map((product) => product.id))

const categorySchema = { type: 'string', enum: [...categories] }
const featureSchema = { type: 'string', enum: featureDefinitions.map((feature) => feature.id) }
const productIdSchema = { type: 'string', enum: products.map((product) => product.id) }

function stringArray(value: unknown): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === 'string')) return []
  return value
}

function isCategory(value: string): value is Category {
  return categories.includes(value as Category)
}

function isPriority(value: unknown): value is NonNullable<RecommendInput['priority']> {
  return typeof value === 'string' && priorities.includes(value as NonNullable<RecommendInput['priority']>)
}

function parseRecommendInput(raw: Record<string, unknown>): RecommendInput {
  const parsedCategories = stringArray(raw.categories).filter(isCategory)
  if (parsedCategories.length === 0) throw new Error('At least one valid category is required.')

  const requirements = stringArray(raw.requirements).filter((feature): feature is Feature => knownFeatures.has(feature as Feature))
  const budgetEurMonthly = typeof raw.budgetEurMonthly === 'number' && Number.isFinite(raw.budgetEurMonthly)
    ? raw.budgetEurMonthly
    : undefined
  const market = typeof raw.market === 'string' ? raw.market : 'ES'
  const priority = isPriority(raw.priority) ? raw.priority : 'balanced'

  return { categories: parsedCategories, requirements, budgetEurMonthly, market, priority }
}

function parseProductIds(value: unknown, minimum: number): string[] {
  const ids = stringArray(value).filter((id) => knownProductIds.has(id))
  if (ids.length < minimum) throw new Error(`At least ${minimum} valid product ID${minimum === 1 ? '' : 's'} required.`)
  return ids
}

export async function registerWebMCPTools(onAgentRecommendation?: (input: RecommendInput) => void) {
  if (!('modelContext' in document) || !document.modelContext) return () => undefined
  const controller = new AbortController()
  const options = { signal: controller.signal }

  await document.modelContext.registerTool({
    name: 'recommend_stack',
    title: 'Recommend a software stack',
    description: 'Build a source-backed software stack for requested categories, required capabilities and an optional monthly EUR planning budget. Use this when the user wants to choose software rather than merely browse products.',
    inputSchema: {
      type: 'object',
      properties: {
        categories: { type: 'array', items: categorySchema, minItems: 1, uniqueItems: true },
        requirements: { type: 'array', items: featureSchema, uniqueItems: true },
        budgetEurMonthly: { type: 'number', minimum: 0 },
        market: { type: 'string', default: 'ES' },
        priority: { type: 'string', enum: [...priorities], default: 'balanced' },
      },
      required: ['categories'],
    },
    annotations: { readOnlyHint: true },
    execute: async (raw) => {
      const input = parseRecommendInput(raw)
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
        productIds: { type: 'array', items: productIdSchema, minItems: 2, uniqueItems: true },
        requirements: { type: 'array', items: featureSchema, uniqueItems: true },
      },
      required: ['productIds'],
    },
    annotations: { readOnlyHint: true },
    execute: async (raw) => {
      const productIds = parseProductIds(raw.productIds, 2)
      const requirements = stringArray(raw.requirements).filter((feature): feature is Feature => knownFeatures.has(feature as Feature))
      return JSON.stringify(compareProducts(products, productIds, requirements))
    },
  }, options)

  await document.modelContext.registerTool({
    name: 'calculate_total_cost',
    title: 'Calculate product total cost',
    description: 'Calculate first-term monthly-equivalent and renewal-normalized EUR cost for one or more catalog products, using the stored official commercial terms and dated ECB planning FX rates.',
    inputSchema: {
      type: 'object',
      properties: { productIds: { type: 'array', items: productIdSchema, minItems: 1, uniqueItems: true } },
      required: ['productIds'],
    },
    annotations: { readOnlyHint: true },
    execute: async (raw) => JSON.stringify(parseProductIds(raw.productIds, 1).map((id) => {
      const product = products.find((item) => item.id === id)
      return product
        ? { id, cost: calculateProductCost(product), sources: [product.source, ...(product.evidence ?? [])] }
        : { id, error: 'unknown_product' }
    })),
  }, options)

  await document.modelContext.registerTool({
    name: 'optimize_current_stack',
    title: 'Optimize an existing software stack',
    description: 'Find a compatible lower-cost replacement stack and quantify indicative monthly and annualized savings versus the user’s current StackPilot product IDs. Savings are returned only when a complete compatible replacement exists.',
    inputSchema: {
      type: 'object',
      properties: {
        currentProductIds: { type: 'array', items: productIdSchema, minItems: 1, uniqueItems: true },
        categories: { type: 'array', items: categorySchema, minItems: 1, uniqueItems: true },
        requirements: { type: 'array', items: featureSchema, uniqueItems: true },
        budgetEurMonthly: { type: 'number', minimum: 0 },
        market: { type: 'string', default: 'ES' },
        priority: { type: 'string', enum: [...priorities], default: 'balanced' },
      },
      required: ['currentProductIds', 'categories'],
    },
    annotations: { readOnlyHint: true },
    execute: async (raw) => {
      const currentProductIds = parseProductIds(raw.currentProductIds, 1)
      const input = parseRecommendInput(raw)
      return JSON.stringify(optimizeCurrentStack(products, currentProductIds, input))
    },
  }, options)

  return () => controller.abort()
}
