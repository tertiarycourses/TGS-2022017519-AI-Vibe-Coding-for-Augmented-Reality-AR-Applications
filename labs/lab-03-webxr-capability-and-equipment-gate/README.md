# Lab 03 — WebXR Capability and Equipment Gate

**Duration:** 60 minutes  
**Alignment:** LO1 · K3 · K5  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Detect browser/device capability and route learners to AR, VR, or desktop fallback without a dead-end experience.

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

1. Review `assets/capability-matrix.csv` and identify which combinations should enable AR, VR, or desktop preview.
2. Open the studio on desktop and record the actual AR/VR button states.
3. Use DevTools Console to inspect `window.isSecureContext`, `navigator.xr`, and WebGL renderer availability.
4. Run the vibe prompt and require a plan, minimal diff, and automated tests before accepting changes.
5. Simulate an unsupported browser condition and confirm the app keeps the desktop preview available.
6. Inspect the user message: it must name the missing capability and the safe next action without blaming cache.
7. Complete the capability decision table with observed device/browser evidence.
8. Run `npm test` in `webapp/` and `node verify.mjs` in this lab.

## Test it

- [ ] Desktop fallback remains available
- [ ] Mode is explicit
- [ ] Runtime budget is declared
- [ ] Unsupported WebXR is communicated

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 03`.

## Troubleshooting

- WebXR immersive sessions require HTTPS or localhost; use the exact local URL printed by Vite.
- Safari desktop may expose no immersive WebXR; use desktop preview for code review.
- If WebGL is disabled, confirm hardware acceleration before changing application code.

## Cleanup

Close DevTools device simulation, stop the server, and retain the completed capability matrix.
