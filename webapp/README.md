# AR/VR Vibe Studio

Localhost WebXR scene generator used throughout the course labs.

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:4173>. The desktop preview works in any modern browser. Immersive AR/VR buttons require a WebXR-capable browser/device; unsupported devices retain the desktop fallback.

The prompt parser runs entirely in the browser and emits a reviewable `ar-vr-vibe-scene/v1` JSON contract. It does not send prompts to a remote service.

Run the automated checks with `npm test` and create a production bundle with `npm run build`.
