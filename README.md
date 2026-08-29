# StackPilot

Agent-native software stack optimizer built with WebMCP.

StackPilot turns software selection into a deterministic decision problem: requirements, constraints, verified pricing and renewal costs go in; a reproducible recommendation comes out. The same engine powers the human UI and WebMCP tools.

## Status

Early MVP for the OpenAI WebMCP Challenge (August–September 2026).

## Principles

- **Deterministic recommendations**: LLMs do not invent prices or scores.
- **Source-backed data**: every commercial datum that affects TCO has an official source and verification date.
- **Renewal-aware TCO**: introductory offers are separated from recurring cost.
- **Agent-native, not agent-only**: WebMCP progressively enhances a normal web app.
- **Ranking independence**: affiliate economics, if added later, must never affect ranking.

## Current seed catalog

The initial dataset deliberately stays small: hosting, SEO and VPN/security. It is intended to validate the engine and WebMCP interaction before catalog expansion.

## WebMCP tools

- `recommend_stack` — build a stack for categories, requirements and budget.
- `compare_products` — compare named products on feature fit and TCO.
- `calculate_total_cost` — calculate first-term and renewal-normalized cost.
- `optimize_current_stack` — compare an existing stack with a lower-cost compatible recommendation.

The implementation uses the current imperative API: `document.modelContext.registerTool(...)`.

## Development

Requirements: Node.js 20.19+.

```bash
npm install
npm test
npm run build
npm run dev
```

To test WebMCP locally, enable WebMCP in a compatible Chrome build or open the deployed app in ChatGPT's WebMCP-capable in-app browser.

## Data caveat

Prices can be promotional, geo-dependent and tax-exclusive. StackPilot stores the commercial terms actually observed on the cited official page and the date they were verified. ECB reference FX rates are used only for planning comparisons, not transaction pricing.

See `docs/DATA_POLICY.md` and `docs/METHODOLOGY.md`.

## License

MIT.
