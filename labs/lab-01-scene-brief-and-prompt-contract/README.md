# Lab 01 — Scene Brief and Prompt Contract

**Duration:** 60 minutes  
**Alignment:** LO1 · K3 · A1  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Translate a workplace requirement and equipment specification into a constrained, testable WebXR scene contract.

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

1. Read `assets/equipment-spec.md`; highlight the physical size, operating context, safety boundary, and information the technician must see.
2. Start the shared localhost studio with `./start.command`; open the printed URL in a Chromium-based browser.
3. Paste the baseline request from `vibe-script.md` into the studio and select **Infer from prompt**.
4. Generate the scene, then inspect the JSON contract before judging the 3D preview.
5. Compare `targetMode`, `tracking`, `scaleMetres`, callout count, and performance budgets with the equipment specification.
6. Run the refinement prompt so the coding agent changes one contract rule at a time and preserves the schema.
7. Export the scene as `evidence/lab-01-scene.json`; capture the preview and Checks tab as screenshots.
8. Run `node verify.mjs` and retain the PASS output as assessment evidence.

## Test it

- [ ] Schema is ar-vr-vibe-scene/v1
- [ ] Target mode is AR
- [ ] Subject is turbine
- [ ] Three callouts are declared
- [ ] Scale is expressed in metres

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 01`.

## Troubleshooting

- If npm is missing, install the current Node.js LTS release and reopen Terminal.
- If the viewport is blank, reload once and check the browser console for WebGL errors.
- If the inferred mode is wrong, make `AR` explicit or choose the AR override.

## Cleanup

Stop the Vite server with Control-C. Keep only the exported JSON and evidence screenshots; do not commit `node_modules/` or `.env` files.
