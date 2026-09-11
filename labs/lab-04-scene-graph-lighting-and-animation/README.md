# Lab 04 — Scene Graph, Lighting and Animation

**Duration:** 90 minutes

**Alignment:** LO2 · K4 · K5

**Try the live Playground:** <https://alfredang.github.io/arvr-playground/>

**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Build a deterministic Three.js scene graph and explain how transforms, lighting, render loop, and cleanup interact.

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

1. Trace `Scene → generatedRoot → Group → Mesh` in `assets/scene-graph.svg` and predict which transform affects every generated object.
2. Open `webapp/src/main.js`; locate scene creation, `generatedRoot`, `buildGeneratedScene()`, and `setAnimationLoop()`.
3. Run the vibe prompt and reject any response that replaces tested code without first explaining the object lifecycle.
4. Generate a three-object desktop scene and inspect the hierarchy through console logging or the provided contract.
5. Toggle motion and confirm the render loop changes behaviour without rebuilding the whole scene.
6. Generate ten variations and watch memory/console output for disposal errors or steadily increasing resources.
7. Record the before/after draw-call and FPS evidence in `evidence/runtime-review.md`.
8. Run the webapp tests, production build, and lab verifier.

## Test it

- [ ] Generated root uses metric scale
- [ ] Animation can be disabled
- [ ] Performance budget is explicit
- [ ] Cleanup/disposal is documented

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 04`.

## Troubleshooting

- If every child rotates around the same origin, rotate the child mesh rather than the root group.
- If shadows vanish, verify the renderer shadow map, casting light, object castShadow, and floor receiveShadow as one chain.
- If repeated generation slows down, inspect disposal of geometry and materials.

## Cleanup

Restore the baseline scene, stop the server, and keep the runtime review file.
