export const SCENE_TEMPLATES = {
  "ar-maintenance": "Create a blue maintenance guide in AR with a turbine, three numbered callouts, soft studio light, and slow rotation.",
  "vr-training": "Create a teal VR safety training room with four machine parts, teleport navigation, controller selection, and bright neutral lighting.",
  retail: "Create an amber AR furniture preview with a sofa anchored to the floor, two dimension callouts, and tap-to-change material."
};

const COLOURS = {
  blue: "#1f6feb",
  teal: "#10b981",
  violet: "#7c3aed",
  purple: "#7c3aed",
  amber: "#f59e0b",
  orange: "#f59e0b",
  red: "#dc2626",
  green: "#16a34a",
  white: "#f8fafc"
};

const OBJECTS = ["turbine", "sofa", "machine", "cube", "sphere", "building", "engine", "robot", "product"];

function findFirst(text, values, fallback) {
  return values.find((value) => text.includes(value)) ?? fallback;
}

function readCount(text) {
  const words = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const digit = text.match(/\b([1-6])\b/);
  if (digit) return Number(digit[1]);
  for (const [word, number] of Object.entries(words)) if (text.includes(word)) return number;
  return 3;
}

export function parsePrompt(prompt, modeOverride = "auto") {
  const source = String(prompt ?? "").trim();
  const text = source.toLowerCase();
  const colourName = findFirst(text, Object.keys(COLOURS), "blue");
  const object = findFirst(text, OBJECTS, "object");
  const inferredMode = text.includes("virtual reality") || /\bvr\b/.test(text) ? "vr" : text.includes("desktop") ? "desktop" : "ar";
  const mode = modeOverride === "auto" ? inferredMode : modeOverride;
  const count = readCount(text);
  const motion = text.includes("rotate") || text.includes("rotation") ? "rotate" : text.includes("float") ? "float" : "idle";
  const interaction = text.includes("teleport") ? "teleport" : text.includes("tap") ? "tap" : text.includes("controller") ? "controller-ray" : "select";
  const lighting = text.includes("dark") ? "low-key" : text.includes("warm") ? "warm" : "studio";

  return {
    schema: "ar-vr-vibe-scene/v1",
    title: source.slice(0, 72) || "Untitled spatial scene",
    targetMode: mode,
    environment: mode === "vr" ? "room-scale" : "real-world-overlay",
    tracking: mode === "ar" ? { plane: "horizontal", placement: "hit-test", anchorPersistence: "session" } : { origin: "local-floor", guardian: true },
    appearance: { primary: COLOURS[colourName], colourName, lighting, background: mode === "ar" ? "transparent" : "#eef4fa" },
    content: {
      subject: object,
      instances: Math.min(Math.max(count, 1), 6),
      callouts: Math.min(Math.max(count, 1), 6),
      scaleMetres: object === "building" ? 1.4 : object === "sofa" ? 1.2 : 0.65
    },
    behaviour: { motion, interaction, labels: !text.includes("no labels") },
    performance: { targetFps: mode === "vr" ? 72 : 60, drawCallBudget: 40, triangleBudget: 80000 },
    accessibility: { highContrastLabels: true, reducedMotionToggle: true, seatedFallback: mode === "vr" }
  };
}

export function validateContract(contract) {
  const checks = [
    ["Mode and reference space declared", ["ar", "vr", "desktop"].includes(contract?.targetMode)],
    ["Tracking/placement mechanism declared", Boolean(contract?.tracking && Object.keys(contract.tracking).length)],
    ["Metric scale is positive", Number(contract?.content?.scaleMetres) > 0],
    ["Runtime budget is explicit", Number(contract?.performance?.targetFps) >= 60 && Number(contract?.performance?.drawCallBudget) > 0],
    ["Accessibility fallback present", Boolean(contract?.accessibility?.highContrastLabels && contract?.accessibility?.reducedMotionToggle)]
  ];
  return checks.map(([label, pass]) => ({ label, pass }));
}

export function storyboardFromContract(contract) {
  const mode = contract.targetMode.toUpperCase();
  return [
    { frame: "01", state: "Entry", evidence: `${mode} capability check and fallback message` },
    { frame: "02", state: "Orient", evidence: contract.targetMode === "ar" ? "Detected horizontal plane and placement reticle" : "Local-floor origin and guardian boundary" },
    { frame: "03", state: "Act", evidence: `${contract.behaviour.interaction} interaction with ${contract.content.subject}` },
    { frame: "04", state: "Confirm", evidence: `${contract.content.callouts} callouts plus visible completion feedback` }
  ];
}

export function createVariation(contract) {
  const colours = Object.entries(COLOURS).filter(([name]) => !["white", contract.appearance.colourName].includes(name));
  const [colourName, primary] = colours[Math.floor(Math.random() * colours.length)];
  return {
    ...contract,
    appearance: { ...contract.appearance, colourName, primary },
    behaviour: { ...contract.behaviour, motion: contract.behaviour.motion === "rotate" ? "float" : "rotate" }
  };
}

export function safeImport(value) {
  const parsed = typeof value === "string" ? JSON.parse(value) : value;
  if (parsed?.schema !== "ar-vr-vibe-scene/v1") throw new Error("Unsupported scene schema. Expected ar-vr-vibe-scene/v1.");
  const checks = validateContract(parsed);
  if (checks.some((check) => !check.pass)) throw new Error("Imported scene contract failed validation.");
  return parsed;
}
