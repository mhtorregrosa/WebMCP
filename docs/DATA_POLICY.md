# Data policy

StackPilot treats commercial data as evidence, not prose.

## Source rules

- Pricing and plan limits must come from a vendor-owned pricing, checkout, product, documentation or help page.
- Every record stores `source.url` and `source.verifiedAt`.
- Ambiguous values are omitted rather than inferred.
- Introductory pricing, upfront term total and renewal pricing are represented separately.
- For monthly subscriptions, `renewalAnnual` may store the 12-month normalized recurring cost; the source note must say so.
- Taxes and geo-dependent offers are explicitly caveated where the vendor does so.
- Feature claims that affect hard constraints (for example API access) require vendor documentation, not third-party reviews.

## FX

The seed dataset uses ECB reference rates from 28 August 2026:

- 1 EUR = 1.1643 USD
- 1 EUR = 0.85720 GBP

Source: European Central Bank euro foreign exchange reference rates. These reference rates are informational and are not transaction rates.

## Seed catalog

The challenge seed is intentionally bounded to 15 plans: five hosting, five SEO/visibility and five VPN/security plans, with at least two vendors in every category.

## Seed sources

- Hostinger Spain web hosting / app hosting pricing: https://www.hostinger.com/es/hosting-web and https://www.hostinger.com/es/hosting-apps-web
- SiteGround web / WordPress hosting pricing: https://www.siteground.com/web-hosting.htm and https://www.siteground.com/wordpress-hosting.htm
- Semrush SEO Toolkit plan documentation: https://www.semrush.com/kb/1624-semrush-one-vs-seo-toolkit and https://www.semrush.com/kb/1547-seo-toolkit-pricing-and-plans
- Semrush API eligibility: https://www.semrush.com/kb/5-api
- Ahrefs Starter official Help Center: https://help.ahrefs.com/en/articles/9419051-about-ahrefs-starter-plan
- Ahrefs current plan comparison: https://ahrefs.com/pricing
- NordVPN Spain pricing: https://nordvpn.com/es/pricing/
- ExpressVPN Spain checkout pricing: https://checkout.expressvpn.com/es/pricing
- ECB FX reference rates: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/

## Future automation

Automated refresh must use diff-based validation. Large price jumps, missing renewal fields, source changes and schema violations should fail closed and require review.
