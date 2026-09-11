# Lab 05 — Plane Detection, Hit Test and Anchors

**Duration:** 90 minutes  
**Alignment:** LO2 · K5 · K6  
**Shared runtime:** `../../webapp/` at <http://127.0.0.1:4173>

## Goal

Place virtual content on a detected real-world surface using viewer-space hit testing and a visible reticle.

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

1. Study `assets/hit-test-lifecycle.svg`; identify session, viewer space, hit-test source, XRFrame, pose matrix, reticle, and placement states.
2. Locate `hitTestRequested`, `hitTestSource`, `reticle`, and the controller `select` handler in the app.
3. Run the vibe prompt and require the agent to preserve the one-request-per-session invariant.
4. On a supported device, enter AR, move the device until the reticle stabilises on a horizontal surface, then select to place.
5. On desktop, use the plane grid as evidence and review the same state machine without pretending hit-test support exists.
6. End and restart the AR session; verify the old hit-test source is cleared and a new one is requested.
7. Capture the reticle, placed object, and session-end evidence; annotate the pose/anchor relationship.
8. Run `node verify.mjs`.

## Test it

- [ ] AR uses horizontal-plane hit test
- [ ] Reticle precedes placement
- [ ] Session cleanup is explicit
- [ ] Virtual object scale is metric

Run:

```bash
node verify.mjs
```

Expected final line: `PASS Lab 05`.

## Troubleshooting

- No reticle: improve lighting/texture on the physical surface and move the device slowly.
- Object drifts: avoid repeatedly overwriting the placed transform after selection.
- Session will not launch: confirm WebXR AR support and localhost/HTTPS secure context.

## Cleanup

End the immersive session before stopping the server. Retain only non-sensitive room screenshots.
