# Vibe-coding script — Lab 02

Use these prompts with Claude Code, Codex, or another supervised coding agent. Run one prompt at a time and inspect the diff after every response.

## 1. Plan against the contract

> We are working in the `webapp/` localhost WebXR project for TGS-2022017519. Read the existing code and tests first. Do not edit yet. Explain the current scene-data flow, identify the smallest files that must change, list risks to desktop/AR/VR modes, and propose verification commands. Do not expose secrets or change dependencies unless required.

## 2. Implement the bounded change

> For the AR turbine guide, generate a four-frame storyboard: Entry, Orient, Act, Confirm. Add high-contrast world-space labels, keep controls outside the centre viewing cone, and include a reduced-motion option. Return the storyboard and acceptance criteria before editing code.

## 3. Critique before accepting

> Review your own diff against the lab contract. Check WebXR lifecycle, metric scale, accessibility, cleanup, desktop fallback, console/network errors, and test coverage. Name any unverified assumption. Fix only confirmed defects.

## 4. Verify and hand over

> Run `npm audit --audit-level=moderate`, `npm test`, and `npm run build`. Summarise changed files, observable behaviour, tests and results, remaining device-dependent checks, and a rollback path. Do not claim immersive AR/VR was tested unless there is actual supported-device evidence.
