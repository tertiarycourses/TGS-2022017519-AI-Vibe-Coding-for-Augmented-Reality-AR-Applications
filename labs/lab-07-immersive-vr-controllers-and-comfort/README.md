# Lab 07 — Immersive VR, Controllers and Comfort

**Duration:** 75 minutes

**Alignment:** LO3 · K7

**Try the live Playground:** <https://alfredang.github.io/arvr-playground/>

**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Convert the same content contract into a VR runtime and distinguish AR overlay constraints from VR room-scale constraints.

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

1. Read `assets/ar-vr-decision-table.csv` and predict which requirements change when the real-world camera becomes a fully virtual environment.
2. Load the VR template and inspect `targetMode`, `environment`, reference-space origin, guardian, input, and frame-rate target.
3. Run the vibe prompt and require a plan that reuses content data while changing only runtime-specific contracts.
4. Enter VR on a supported headset or use desktop preview to review the controller/teleport contract honestly.
5. Verify seated fallback and reduced-motion controls are represented in the scene contract.
6. Complete the AR-versus-VR decision table with technical consequences rather than use-case slogans.
7. Export the VR scene and capture the contract plus runtime status.
8. Run `node verify.mjs`.

## Test it

- [ ] Target mode is VR
- [ ] Local-floor origin is declared
- [ ] Guardian and seated fallback are present
- [ ] Target frame rate is at least 72 FPS

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 07`.

## Troubleshooting

- VR button disabled: verify `immersive-vr` support and the secure context.
- Floor height wrong: use local-floor reference space and calibrate the headset boundary.
- Discomfort: disable continuous motion and use teleport plus snap turns.

## Cleanup

Exit VR, restore the physical play area, stop the server, and retain the completed decision table.
