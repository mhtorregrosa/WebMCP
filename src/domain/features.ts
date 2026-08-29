import type { Category, Feature } from './types'

export interface FeatureDefinition {
  id: Feature
  label: string
  category: Category
}

export const featureDefinitions: FeatureDefinition[] = [
  { id: 'managed_hosting', label: 'Managed hosting', category: 'hosting' },
  { id: 'wordpress', label: 'WordPress', category: 'hosting' },
  { id: 'daily_backups', label: 'Daily backups', category: 'hosting' },
  { id: 'weekly_backups', label: 'Weekly backups', category: 'hosting' },
  { id: 'site_builder', label: 'Site builder', category: 'hosting' },
  { id: 'email', label: 'Email', category: 'hosting' },
  { id: 'seo_audit', label: 'Site audit', category: 'seo' },
  { id: 'rank_tracking', label: 'Rank tracking', category: 'seo' },
  { id: 'keyword_research', label: 'Keyword research', category: 'seo' },
  { id: 'competitor_analysis', label: 'Competitor analysis', category: 'seo' },
  { id: 'mcp_access', label: 'MCP access', category: 'seo' },
  { id: 'api', label: 'API access', category: 'seo' },
  { id: 'vpn', label: 'VPN', category: 'vpn' },
  { id: 'malware_protection', label: 'Malware protection', category: 'vpn' },
  { id: 'password_manager', label: 'Password manager', category: 'vpn' },
  { id: 'cloud_storage', label: 'Cloud storage', category: 'vpn' },
  { id: 'dark_web_monitor', label: 'Dark web monitor', category: 'vpn' },
]

export const featureCategory: Record<Feature, Category> = Object.fromEntries(
  featureDefinitions.map((feature) => [feature.id, feature.category]),
) as Record<Feature, Category>
