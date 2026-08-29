# StackPilot WebMCP end-to-end QA

**Final status:** 20/20 challenge scenarios passed after one UI synchronization fix.

## Test environment

- Date/time: 2026-08-29 23:56 CEST
- App: https://mhtorregrosa.github.io/WebMCP/
- Agent/browser: Codex with the ChatGPT/Codex in-app browser
- Exact browser build: not exposed by the browser control surface
- Catalog: 15 plans, page data verified through 2026-08-29
- Planning FX date reported by the app: 2026-08-28

The agent interpreted the original prompts and invoked the page-defined WebMCP tools directly. It did not emulate tool-covered actions with DOM clicks.

## Tool discovery

All four expected page tools were registered and callable:

- `recommend_stack`
- `compare_products`
- `calculate_total_cost`
- `optimize_current_stack`

## Results

| # | Tool | Result | Evidence / key assertion |
|---:|---|---|---|
| 1 | `recommend_stack` | PASS | Three-category balanced stack; €30.05/mo first term, €47.51/mo renewal; within €180; visible UI synchronized. |
| 2 | `recommend_stack` | PASS | SiteGround StartUp selected at €2.57/mo; complete and within the €10 planning budget. |
| 3 | `recommend_stack` | PASS | SiteGround StartUp satisfies managed hosting, WordPress and daily backups. |
| 4 | `recommend_stack` | PASS | Ahrefs Lite selected with API access. |
| 5 | `recommend_stack` | PASS after fix | SEO + SSO fails closed: no product, `complete=false`, no budget claim. The deployed UI now visibly shows “Single sign-on (SSO)” checked and “Incomplete”. |
| 6 | `recommend_stack` | PASS | NordVPN Complete selected with password manager. |
| 7 | `recommend_stack` | PASS | NordVPN Complete preserves VPN, malware protection and password-manager requirements. |
| 8 | `recommend_stack` | PASS | Simplicity priority returns hosting + VPN and the visible priority changes to “Simplicity”. |
| 9 | `compare_products` | PASS | NordVPN Complete and ExpressVPN Advanced compared within VPN; both satisfy password manager. |
| 10 | `compare_products` | PASS | Hostinger Premium and SiteGround StartUp return hosting fit plus first-term and renewal costs. |
| 11 | `compare_products` | PASS | Semrush SEO Business and Ahrefs Lite compared within SEO; API requirement preserved. |
| 12 | `compare_products` | PASS | Cross-category comparison rejected with `cross_category_comparison`; no scores returned. |
| 13 | `compare_products` | PASS | VPN comparison with rank tracking rejected with `requirement_category_mismatch`. |
| 14 | `calculate_total_cost` | PASS | SiteGround GrowBig: €4.29/mo first term and €25.76/mo renewal, with official source. |
| 15 | `calculate_total_cost` | PASS | ExpressVPN Basic: €2.57/mo first term and €7.15/mo renewal, with official pricing URL. |
| 16 | `calculate_total_cost` | PASS | Semrush SEO Business returns four dated official records covering price, API and MCP evidence. |
| 17 | `optimize_current_stack` | PASS | Semrush SEO Pro → Ahrefs Starter; comparable; indicative saving €75.86/mo and €910.32/year. |
| 18 | `optimize_current_stack` | PASS | Adding SSO produces `comparable=false`, an incomplete recommendation and no claimed saving. |
| 19 | `recommend_stack` | PASS | Same three categories retained; visible budget changes to €50; €30.05/mo result remains truthfully within budget. |
| 20 | No new tool required | PASS | Explanation uses stored terms: SiteGround and ExpressVPN are promotional; Ahrefs has the same initial and recurring monthly equivalent. |

## Defect found and resolved

The tool correctly rejected SEO + SSO, but the original compact form did not display SSO as the active agent-selected requirement. This made the input/result state only partially visible.

PR [#11](https://github.com/mhtorregrosa/WebMCP/pull/11) changed the form so an advanced requirement becomes visible when an agent activates it, while remaining hidden from the default compact form when inactive. Three regression tests were added. CI passed, the PR was merged, GitHub Pages deployed the new bundle and scenario 5 was rerun successfully against the public URL.

## Caveats

- This run validated WebMCP routing, schemas, deterministic behavior, failure handling, arithmetic output and UI synchronization. It did not independently reopen every vendor page to reverify the underlying commercial data.
- Price data can remain promotional, geo-dependent, tax-exclusive or change after the stored verification date.
- “100% required-feature fit” is confusing when the prompt contains no hard requirements. This is a copy/semantics issue, not a functional failure; the UI should eventually distinguish “no hard requirements specified” from an actual 100% constrained fit.
- Optimization savings are indicative planning figures, not transaction quotes.
