# Lab 08 — Runtime Review, Optimisation and Handover

**Duration:** 90 minutes  
**Alignment:** LO3 · A3 · A4  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Review a generated AR/VR runtime, isolate defects with evidence, implement bounded adjustments, and prepare a reproducible handover.

## What you will produce

- a reviewed `ar-vr-vibe-scene/v1` JSON contract;
- screenshots or console output that prove the expected runtime state;
- the lab-specific review/evidence requested below;
- a passing `node verify.mjs` result.

## Before you start

1. Use a current Node.js LTS release and a Chromium-based browser for the fullest WebXR capability.
2. Work only in the supplied local repository. Never paste credentials, private source, or personal data into an AI coding prompt.
3. Read `vibe-script.md` before asking an AI coding assistant to edit code. Require a plan, a bounded diff, and verification.
4. For immersive testing, clear a safe physical area. AR/VR availability depends on the actual browser and device; desktop preview is the supported fallback.

## Detailed procedure

1. Open `assets/runtime-review-template.md`; define the expected state, observed state, evidence, cause hypothesis, adjustment, and retest for each defect.
2. Start the app and create the five-object stress scene from the provided prompt.
3. Record FPS, console messages, failed network requests, interaction evidence, label readability, and responsive layout at 390 px.
4. Run the audit vibe prompt; reject broad rewrites or claims that lack observable evidence.
5. Select the highest-impact defect and implement the smallest bounded adjustment.
6. Add or update a regression test, then repeat the exact observation that originally failed.
7. Complete the handover with changed files, rationale, risks, test commands, results, and rollback path.
8. Run `npm audit`, `npm test`, `npm run build`, and `node verify.mjs`; capture all PASS outputs.

## Test it

- [ ] All five contract checks pass
- [ ] One defect is evidenced
- [ ] One bounded adjustment is retested
- [ ] Handover includes commands and rollback

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 08`.

## Troubleshooting

- Low FPS: separate device limits from application load before lowering quality.
- Growing memory: verify disposal during scene regeneration.
- Mobile overflow: measure scrollWidth against clientWidth and fix the responsible element, not the whole layout.

## Cleanup

Stop the server, remove generated `dist/` if rebuilding from source, and deliver the final JSON, screenshots, review, and test output without secrets.
