# StackPilot

Agent-native software stack optimizer built with WebMCP.

**[Open the live WebMCP app](https://mhtorregrosa.github.io/WebMCP/)**

StackPilot turns software selection into a deterministic decision problem: requirements, constraints, verified pricing and renewal costs go in; a reproducible recommendation comes out. The same engine powers the human UI and WebMCP tools.

## Status

Challenge MVP for the OpenAI WebMCP Challenge (August–September 2026).

The deployed app exposes all four tools in the ChatGPT/Codex in-app browser. The 20-scenario challenge QA suite passes, including visible agent/UI state synchronization, fail-closed hard constraints, invalid comparisons, source-backed TCO and compatible-stack optimization. See [`docs/QA_EVIDENCE.md`](docs/QA_EVIDENCE.md).

## Principles

- **Deterministic recommendations**: LLMs do not invent prices or scores.
- **Source-backed data**: every commercial datum that affects TCO has an official source and verification date.
- **Renewal-aware TCO**: introductory offers are separated from recurring cost.
- **Agent-native, not agent-only**: WebMCP progressively enhances a normal web app.
- **Fail closed on hard constraints**: incomplete stacks are never presented as budget-compliant or savings-producing solutions.
- **Ranking independence**: affiliate economics, if added later, must never affect ranking.

## Current seed catalog

The challenge dataset is deliberately bounded to **15 verified plans**: five hosting, five SEO/visibility and five VPN/security plans. Each category contains at least two vendors. The objective is decision quality and traceability, not catalog breadth.

## WebMCP tools

- `recommend_stack` — build a stack for categories, hard requirements and budget; agent calls synchronize the visible UI.
- `compare_products` — compare products within one category on feature fit and TCO; cross-category comparisons fail explicitly.
- `calculate_total_cost` — calculate first-term and renewal-normalized cost with source evidence.
- `optimize_current_stack` — compare an existing stack with a lower-cost compatible recommendation; savings are withheld if no complete replacement exists.

The implementation uses the current imperative API `document.modelContext.registerTool(...)` and the Chrome-recommended `webmcp-types` TypeScript definitions.

## Development

Requirements: Node.js 20.19+.

```bash
npm install
npm test
npm run build
npm run dev
```

To test WebMCP locally, enable WebMCP in a compatible Chrome build or open the deployed app in ChatGPT's WebMCP-capable in-app browser.

The challenge QA suite is in [`docs/AGENT_TESTS.md`](docs/AGENT_TESTS.md): 20 prompts covering tool selection, hard constraints, TCO, invalid comparisons, optimization and human/agent shared state.

## Data caveat

Prices can be promotional, geo-dependent and tax-exclusive. StackPilot stores the commercial terms actually observed on the cited official page and the date they were verified. Critical capabilities may carry supplemental official evidence when the pricing page alone does not prove them. ECB reference FX rates are used only for planning comparisons, not transaction pricing.

See [`docs/DATA_POLICY.md`](docs/DATA_POLICY.md), [`docs/METHODOLOGY.md`](docs/METHODOLOGY.md) and [`docs/WEBMCP.md`](docs/WEBMCP.md).

## License

MIT.
