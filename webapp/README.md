# AR/VR Playground

[![GitHub Pages](https://img.shields.io/github/actions/workflow/status/alfredang/arvr-playground/deploy-pages.yml?branch=main&label=live%20demo)](https://alfredang.github.io/arvr-playground/)
[![WebXR](https://img.shields.io/badge/WebXR-AR%20%2B%20VR-7c3aed)](https://immersiveweb.dev/)

Generate, inspect, and test small augmented-reality and virtual-reality scenes from a natural-language vibe prompt.

**[Open the live Playground](https://alfredang.github.io/arvr-playground/)**

## Screenshot

![AR/VR Playground showing a generated AR scene and reviewable scene contract](screenshot.png)

## About

The Playground is the learner-facing WebXR companion for **TGS-2022017519 — AI Vibe Coding for Augmented Reality (AR) Applications**. Its browser-only prompt parser turns an AR/VR brief into a reviewable `ar-vr-vibe-scene/v1` JSON contract and renders the result with Three.js.

No prompt is sent to an external AI service. Desktop preview works in a modern browser; immersive AR or VR requires a compatible WebXR device and a secure context.

## Features

- Prompt templates for AR maintenance, VR training, and retail preview
- Deterministic scene-contract generation and validation
- Interactive Three.js desktop preview with orbit controls
- WebXR AR hit testing and placement on supported devices
- WebXR VR entry and controller support on compatible headsets
- JSON import/export, screenshot capture, and storyboard evidence
- Desktop fallback when immersive WebXR is unavailable

## Tech stack

- Vite 7
- Three.js 0.180
- WebXR Device API
- Vitest
- GitHub Actions and GitHub Pages

## Architecture

```text
Vibe prompt
    │
    ▼
Scene parser ──► versioned JSON contract ──► validation + storyboard
    │
    ▼
Three.js scene graph ──► desktop preview / WebXR AR / WebXR VR
```

## Project structure

```text
.
├── index.html
├── src/
│   ├── main.js
│   ├── scene-engine.js
│   ├── scene-engine.test.js
│   └── style.css
├── screenshot.png
├── vite.config.js
└── .github/workflows/deploy-pages.yml
```

## Run locally

```bash
npm install
npm test
npm run dev
```

Open <http://127.0.0.1:4173/>.

## Production build

```bash
npm run build
npm run preview
```

The `main` branch deploys the generated `dist/` directory to GitHub Pages.

## Credits

Built for Tertiary Infotech Academy learners. Powered by [Tertiary Infotech Academy Pte Ltd](https://www.tertiaryinfotech.com/).
