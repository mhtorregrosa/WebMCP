# Data policy

StackPilot treats commercial data as evidence, not prose.

## Source rules

- Pricing and plan limits should come from a vendor-owned pricing, product or help page.
- Every record stores `source.url` and `source.verifiedAt`.
- Ambiguous values are omitted rather than inferred.
- Introductory pricing, upfront term total and renewal pricing are represented separately.
- Taxes and geo-dependent offers are explicitly caveated where the vendor does so.

## FX

The seed dataset uses ECB reference rates from 28 August 2026:

- 1 EUR = 1.1643 USD
- 1 EUR = 0.85720 GBP

Source: European Central Bank euro foreign exchange reference rates. These reference rates are informational and are not transaction rates.

## Seed sources

- Hostinger Spain web hosting pricing: https://www.hostinger.com/es/hosting-web
- SiteGround web hosting pricing: https://www.siteground.com/web-hosting.htm
- Semrush SEO pricing: https://www.semrush.com/pricing/
- Ahrefs Starter official Help Center: https://help.ahrefs.com/en/articles/9419051-about-ahrefs-starter-plan
- NordVPN Spain pricing: https://nordvpn.com/es/pricing/
- ECB FX reference rates: https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/

## Future automation

Automated refresh must use diff-based validation. Large price jumps, missing renewal fields, source changes and schema violations should fail closed and require review.
