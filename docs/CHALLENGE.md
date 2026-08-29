# OpenAI WebMCP Challenge checklist

Deadline: 3 September 2026, 1:00 PM Pacific Time.

## Required before submission

- [x] Repository visibility changed to **Public**.
- [x] Open-source license file present (MIT).
- [x] WebMCP imperative API integrated.
- [x] Live deployed URL: https://mhtorregrosa.github.io/WebMCP/
- [x] Verified in ChatGPT/Codex in-app browser.
- [x] 20-scenario deployed agent QA suite completed; see [`QA_EVIDENCE.md`](QA_EVIDENCE.md).
- [ ] Optional compatibility pass in Chrome 149+ with WebMCP testing enabled.
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
