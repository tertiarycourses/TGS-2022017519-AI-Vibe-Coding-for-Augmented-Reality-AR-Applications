import fs from "node:fs";
const scene = JSON.parse(fs.readFileSync(new URL("./scene.json", import.meta.url), "utf8"));
const failures = [];
function check(condition, message) { if (!condition) failures.push(message); }
check(scene.schema === "ar-vr-vibe-scene/v1", "schema mismatch");
check(scene.targetMode === "desktop", "target mode mismatch");
check(scene.content.subject === "engine", "subject mismatch");
check(scene.content.callouts === 3, "callout count mismatch");
check(scene.performance.targetFps >= 60, "FPS target too low");
check(scene.performance.drawCallBudget <= 40, "draw-call budget missing or too high");
check(scene.accessibility.highContrastLabels && scene.accessibility.reducedMotionToggle, "accessibility controls missing");
if (failures.length) { console.error("FAIL Lab 04", failures); process.exit(1); }
console.log("PASS Lab 04");
