# OpenAI WebMCP Challenge checklist

Deadline: 3 September 2026, 1:00 PM Pacific Time.

## Required before submission

- [ ] Repository visibility changed to **Public**.
- [x] Open-source license file present (MIT).
- [x] WebMCP imperative API integrated.
- [ ] Live deployed URL.
- [ ] Verified in ChatGPT in-app browser.
- [ ] Verified in Chrome with WebMCP enabled/origin trial.
- [ ] Public YouTube demo under 3 minutes with audio.
- [ ] Devpost project description and testing instructions.
- [ ] Freeze submitted repository and live site during judging.

## Internal quality gate

Before submission:

```bash
npm install
npm run check
```

Then manually exercise each WebMCP tool and confirm that agent invocation of `recommend_stack` updates the visible UI.
