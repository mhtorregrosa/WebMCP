import type { Product, SourceRecord } from '../domain/types'
import { products as rawProducts } from './products'

const supplementalEvidence: Record<string, SourceRecord[]> = {
  'semrush-seo-pro-annual': [
    {
      url: 'https://www.semrush.com/kb/1618-mcp',
      verifiedAt: '2026-08-29',
      note: 'Official Semrush MCP documentation lists SEO Classic Pro as including MCP access.',
    },
  ],
  'semrush-seo-guru-annual': [
    {
      url: 'https://www.semrush.com/kb/1618-mcp',
      verifiedAt: '2026-08-29',
      note: 'Official Semrush MCP documentation lists SEO Classic Guru as including MCP access.',
    },
  ],
  'semrush-seo-business-annual': [
    {
      url: 'https://www.semrush.com/kb/1624-semrush-one-vs-seo-toolkit',
      verifiedAt: '2026-08-29',
      note: 'Official Semrush plan comparison gives the SEO Business annual equivalent of $416.66/month, billed upfront.',
    },
    {
      url: 'https://www.semrush.com/kb/5-api',
      verifiedAt: '2026-08-29',
      note: 'Official Semrush API documentation states Standard API is available as an add-on to the SEO Business tier.',
    },
    {
      url: 'https://www.semrush.com/kb/1618-mcp',
      verifiedAt: '2026-08-29',
      note: 'Official Semrush MCP documentation states SEO Classic Business can use MCP with an MCP API units package.',
    },
  ],
}

export const products: Product[] = rawProducts.map((product) => {
  const evidence = supplementalEvidence[product.id]
  return evidence ? { ...product, evidence } : product
})
