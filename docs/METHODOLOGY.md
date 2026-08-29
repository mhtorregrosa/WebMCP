# Recommendation methodology

## Decision model

StackPilot is deterministic. Product data is normalized first; hard requirements are applied before scoring; only compatible products are ranked.

For each requested category:

1. filter products by market;
2. derive requirements relevant to that category;
3. reject products missing a hard requirement;
4. calculate first-term monthly-equivalent EUR cost;
5. score feature fit, cost and simplicity;
6. choose the highest score, using lower cost as a deterministic tie-breaker.

## Default score

- feature fit: 65%
- cost efficiency: 20%
- simplicity: 15%

`lowest_cost` changes the weights to 55/35/10. `simplicity` uses 55/15/30.

The cost component is intentionally bounded (`1 / (1 + monthly_cost / 100)`) so a very cheap but functionally weak product cannot dominate a required-feature decision.

## Hard constraints versus preferences

A required feature is a hard constraint inside the category where that feature exists. Missing required features make the product ineligible. Budget is currently reported as a stack-level constraint rather than forcing a potentially invalid cheaper selection; budget-aware combinatorial optimization is planned after the seed dataset grows.

## TCO

Promotional first-term cost and renewal cost are separate fields. A product with a low acquisition price can therefore be recommended while still surfacing a material renewal increase.

Prices are normalized to EUR with dated ECB reference rates. ECB rates are for planning comparison only and are not suitable as transaction rates.

## AI boundary

No language model participates in price extraction at runtime, arithmetic, hard-constraint evaluation or ranking. An agent can call the same deterministic functions through WebMCP and explain the returned evidence.
