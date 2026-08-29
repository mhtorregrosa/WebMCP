# WebMCP integration

StackPilot uses the imperative WebMCP API defined around `document.modelContext.registerTool(...)`.

The design rule is goal-oriented tools rather than DOM-mirroring tools. Agents ask StackPilot to solve a user task — recommend, compare, calculate or optimize — instead of clicking individual controls.

## Registered tools

### recommend_stack
Builds a stack from categories, requirements, market, budget and priority.

### compare_products
Runs specific product IDs through the same scoring and TCO engine.

### calculate_total_cost
Returns source-backed first-term and renewal-normalized product cost.

### optimize_current_stack
Compares the user's current StackPilot product IDs with a compatible recommendation and quantifies indicative savings.

All four tools are read-only in the current MVP. `recommend_stack` additionally updates the visible React state when invoked by an agent, so human and agent share the same live page state.

## Progressive enhancement

If `document.modelContext` is unavailable, the human application remains fully functional. WebMCP is an enhancement, not a runtime dependency.
