# Lab 06 — Raycast, Touch and Spatial Feedback

**Duration:** 75 minutes  
**Alignment:** LO2 · K2 · A3  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Implement selection feedback and diagnose interaction misses using ray origin, direction, target bounds, and state evidence.

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

1. Trace the interaction pipeline in `assets/raycast-pipeline.svg` from input coordinates to visible feedback.
2. Generate the four-object scene and predict which object should be selected for an overlapping ray.
3. Run the vibe prompt; check that the agent treats ray origin/direction, target collection, nearest hit, and feedback as separate states.
4. Test a successful hit, an empty hit, and two visually overlapping targets.
5. Disable spatial labels and verify selection still has a non-label feedback channel.
6. Use the Checks tab and console evidence to identify whether a miss came from coordinates, camera, layers, bounds, or target registration.
7. Document one defect and one adjustment in `evidence/interaction-review.md`.
8. Run automated and lab verification.

## Test it

- [ ] Tap interaction is declared
- [ ] Nearest target is selected
- [ ] No-hit state is visible
- [ ] Interaction review identifies a cause and adjustment

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 06`.

## Troubleshooting

- Wrong object selected: sort intersections by distance and use the first valid selectable target.
- Touch misses on mobile: calculate pointer coordinates from the canvas bounding rectangle.
- Invisible feedback: verify material state is restored when selection changes.

## Cleanup

Restore default controls and keep the interaction review as assessment evidence.
