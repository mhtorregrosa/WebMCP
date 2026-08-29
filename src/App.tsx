import { useEffect, useMemo, useState } from 'react'
import { products } from './data/products'
import { featureDefinitions } from './domain/features'
import { recommendStack } from './domain/recommender'
import type { Category, Feature, RecommendInput, StackRecommendation } from './domain/types'
import { registerWebMCPTools } from './webmcp/register'

const categories: { id: Category; label: string }[] = [
  { id: 'hosting', label: 'Hosting' },
  { id: 'seo', label: 'SEO' },
  { id: 'vpn', label: 'VPN / security' },
]

const humanFeatureOptions = featureDefinitions.filter((feature) => [
  'managed_hosting', 'wordpress', 'daily_backups',
  'seo_audit', 'rank_tracking', 'mcp_access', 'api',
  'vpn', 'malware_protection', 'password_manager',
].includes(feature.id))

export default function App() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['hosting', 'seo', 'vpn'])
  const [selectedRequirements, setSelectedRequirements] = useState<Feature[]>([])
  const [budget, setBudget] = useState(180)
  const [priority, setPriority] = useState<RecommendInput['priority']>('balanced')
  const [result, setResult] = useState<StackRecommendation | null>(null)
  const [agentUpdate, setAgentUpdate] = useState(false)

  useEffect(() => {
    let cleanup: () => void = () => undefined
    registerWebMCPTools((input) => {
      setAgentUpdate(true)
      if (input.categories) setSelectedCategories(input.categories)
      if (input.requirements) setSelectedRequirements(input.requirements)
      if (input.budgetEurMonthly != null) setBudget(input.budgetEurMonthly)
      if (input.priority) setPriority(input.priority)
      setResult(recommendStack(products, input))
    }).then((fn) => { cleanup = fn })
    return () => cleanup()
  }, [])

  const catalogUpdated = useMemo(() => products.map((p) => p.source.verifiedAt).sort().at(-1), [])
  const activeFeatureOptions = humanFeatureOptions.filter((option) => selectedCategories.includes(option.category))

  const toggleCategory = (category: Category) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        setSelectedRequirements((requirements) => requirements.filter((feature) => featureDefinitions.find((option) => option.id === feature)?.category !== category))
        return current.filter((item) => item !== category)
      }
      return [...current, category]
    })
  }

  const toggleRequirement = (feature: Feature) => {
    setSelectedRequirements((current) => current.includes(feature) ? current.filter((item) => item !== feature) : [...current, feature])
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setAgentUpdate(false)
    setResult(recommendStack(products, {
      categories: selectedCategories,
      requirements: selectedRequirements,
      budgetEurMonthly: budget,
      market: 'ES',
      priority,
    }))
  }

  const budgetLabel = !result?.complete
    ? 'Incomplete'
    : result.withinBudget === false
      ? 'Over budget'
      : 'Within budget'

  const badgeClass = !result?.complete ? 'badge incomplete' : result.withinBudget === false ? 'badge bad' : 'badge'

  return (
    <main>
      <header>
        <p className="eyebrow">Agent-native software decisions</p>
        <h1>StackPilot</h1>
        <p className="lede">Build the software stack you actually need — with source-backed pricing, renewal-aware cost and the same deterministic engine for humans and agents.</p>
      </header>

      <section className="panel">
        <form onSubmit={submit}>
          <label className="field"><span>Monthly planning budget (€)</span><input type="number" min="0" value={budget} onChange={(e) => setBudget(Number(e.target.value))} /></label>
          <label className="field"><span>Priority</span><select value={priority} onChange={(e) => setPriority(e.target.value as RecommendInput['priority'])}><option value="balanced">Balanced</option><option value="lowest_cost">Lowest cost</option><option value="simplicity">Simplicity</option></select></label>
          <fieldset><legend>What do you need?</legend><div className="checks">{categories.map((category) => <label key={category.id}><input type="checkbox" checked={selectedCategories.includes(category.id)} onChange={() => toggleCategory(category.id)} />{category.label}</label>)}</div></fieldset>
          <fieldset><legend>Hard requirements</legend><div className="checks">{activeFeatureOptions.length === 0 ? <span className="muted">Choose a category first.</span> : activeFeatureOptions.map((feature) => <label key={feature.id}><input type="checkbox" checked={selectedRequirements.includes(feature.id)} onChange={() => toggleRequirement(feature.id)} />{feature.label}</label>)}</div></fieldset>
          <button type="submit" disabled={selectedCategories.length === 0}>Find my stack</button>
        </form>
      </section>

      {result && <section className="results" aria-live="polite">
        <div className="resultHeader"><div><p className="eyebrow">{agentUpdate ? 'Updated by agent' : 'Recommendation'}</p><h2>€{result.monthlyEur.toFixed(2)}<small>/mo {result.complete ? 'first-term equivalent' : 'for compatible categories only'}</small></h2></div><div className={badgeClass}>{budgetLabel}</div></div>
        {result.renewalMonthlyEur != null && <p className="renewal">Renewal-normalized: <strong>€{result.renewalMonthlyEur.toFixed(2)}/mo</strong></p>}
        <div className="cards">{result.selected.map((item) => <article key={item.product.id}><div className="category">{item.product.category}</div><h3>{item.product.vendor} {item.product.name}</h3><p>{item.product.description}</p><dl><div><dt>Fit</dt><dd>{item.featureFit}%</dd></div><div><dt>First term</dt><dd>€{item.monthlyEur.toFixed(2)}/mo</dd></div>{item.renewalMonthlyEur != null && <div><dt>Renewal</dt><dd>€{item.renewalMonthlyEur.toFixed(2)}/mo</dd></div>}</dl><a href={item.product.source.url} target="_blank" rel="noreferrer">Official source ↗</a></article>)}</div>
        {result.selected.length === 0 && <p>No catalog product satisfies the current hard requirements.</p>}
        <ul className="rationale">{result.rationale.map((line) => <li key={line}>{line}</li>)}</ul>
      </section>}

      <footer>Seed catalog: {products.length} plans · verified through {catalogUpdated} · ECB planning FX as of {result?.fxAsOf ?? '2026-08-28'}.</footer>
    </main>
  )
}
