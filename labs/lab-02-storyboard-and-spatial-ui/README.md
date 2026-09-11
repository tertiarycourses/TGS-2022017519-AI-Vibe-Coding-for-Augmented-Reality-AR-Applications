# Lab 02 — Storyboard and Spatial UI

**Duration:** 75 minutes  
**Alignment:** LO1 · K1 · K2 · A2  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Convert an AR user journey into four observable states and apply readable, reachable spatial UI rules.

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

1. Open `assets/storyboard-template.svg` and identify the Entry, Orient, Act, and Confirm evidence required in each frame.
2. Start the localhost studio and select the **Storyboard** inspector tab.
3. Run the baseline vibe prompt; confirm the generated sequence contains four distinct states rather than four decorative screens.
4. Check that Orient exposes plane detection/placement, Act names the interaction, and Confirm shows an observable completion signal.
5. Use the critique prompt to test label contrast, angular size, occlusion, reachability, and motion comfort.
6. Change one UI constraint, regenerate, and compare the previous and revised contract side by side.
7. Complete `assets/ui-review-checklist.md` with pass/fail evidence for each rule.
8. Export the scene and run `node verify.mjs`.

## Test it

- [ ] Storyboard has four states
- [ ] High-contrast labels are enabled
- [ ] Reduced-motion control is present
- [ ] Tap interaction is declared

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 02`.

## Troubleshooting

- If a storyboard frame is vague, rewrite it as a visible state plus user action plus evidence.
- If labels disappear, enable Spatial callouts in Runtime controls.
- If mobile text is cramped, use the 390 px responsive layout and verify there is no horizontal overflow.

## Cleanup

Stop the server and keep the completed UI review plus exported scene in the evidence folder.
