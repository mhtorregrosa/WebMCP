# Agent validation suite

Use these prompts against the deployed StackPilot page in a WebMCP-capable agent. The goal is not wording parity; validate tool selection, constraints, arithmetic, failure behavior and visible shared-state updates.

## Pass criteria

- The agent chooses the intended StackPilot tool without DOM-click emulation when a tool covers the task.
- It never invents product IDs, prices or capabilities.
- It preserves hard requirements.
- It distinguishes introductory-equivalent cost from renewal-normalized cost.
- It does not claim budget compliance or savings for an incomplete recommendation.
- It rejects meaningless cross-category product comparisons.
- A `recommend_stack` call updates the visible web UI to the same inputs/result.

## 20 challenge prompts

| # | Prompt | Expected tool / key assertion |
|---|---|---|
| 1 | Build me a balanced hosting + SEO + VPN stack for Spain with a €180 monthly planning budget. | `recommend_stack`; complete three-category result; visible UI updates. |
| 2 | Give me the lowest-cost hosting option in the catalog under a €10 monthly planning budget. | `recommend_stack`; hosting only; complete and inside budget if selected equivalent cost qualifies. |
| 3 | I need managed WordPress hosting with daily backups. | `recommend_stack`; hosting; selected product must contain both hard features. |
| 4 | I need an SEO product with direct API access. | `recommend_stack`; SEO; selected product must contain `api`. |
| 5 | I need SEO with SSO. Do not relax that requirement. | `recommend_stack`; result must be incomplete; no fake fallback and no budget claim. |
| 6 | I need a VPN that includes a password manager. | `recommend_stack`; VPN; selected product must contain `password_manager`. |
| 7 | I need VPN plus malware protection and a password manager. | `recommend_stack`; all requested VPN hard features preserved. |
| 8 | Optimize for simplicity instead of price: hosting + VPN. | `recommend_stack` with `priority=simplicity`; visible UI priority changes. |
| 9 | Compare NordVPN Complete with ExpressVPN Advanced for a user who requires a password manager. | `compare_products`; category `vpn`; both candidates compared. |
| 10 | Compare Hostinger Premium with SiteGround StartUp. | `compare_products`; category `hosting`; return TCO/fit comparison. |
| 11 | Compare Semrush SEO Business with Ahrefs Lite and require API access. | `compare_products`; category `seo`; requirement is valid. |
| 12 | Compare NordVPN Complete with Semrush SEO Pro. | `compare_products`; must return `cross_category_comparison`, not scores. |
| 13 | Compare NordVPN Complete with ExpressVPN Advanced using rank tracking as a requirement. | `compare_products`; must return `requirement_category_mismatch`. |
| 14 | What are the first-term and renewal-normalized costs of SiteGround GrowBig? | `calculate_total_cost`; both cost concepts returned with source. |
| 15 | Calculate the cost of ExpressVPN Basic and show me the source used. | `calculate_total_cost`; source-backed 28-month offer and annual renewal. |
| 16 | Show me the evidence behind Semrush SEO Business pricing/API/MCP. | `calculate_total_cost`; primary plus supplemental official evidence returned. |
| 17 | I currently use Semrush SEO Pro. Find the lowest-cost compatible SEO replacement. | `optimize_current_stack`; complete result and quantified indicative savings if cheaper. |
| 18 | I currently use Semrush SEO Pro but I require SSO in the replacement. | `optimize_current_stack`; `comparable=false`; no claimed savings. |
| 19 | Reduce my stack budget to €50 while keeping the same categories. | `recommend_stack`; visible page must update to €50 and result must truthfully report budget status. |
| 20 | Why does the renewal cost differ from the introductory cost in the recommended stack? | Use prior tool output/context; explanation must rely on stored first-term and renewal data, not invent a discount. |

## Manual evidence record

For challenge QA, record for each prompt:

- date/time;
- browser/agent build;
- tool selected;
- whether tool call succeeded;
- whether visible UI synchronized when applicable;
- unexpected behavior;
- pass/fail.

Do not tune a prompt merely to force a pass. If an agent consistently selects the wrong tool, improve the tool description or schema and rerun the original prompt.
