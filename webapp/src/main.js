import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ARButton } from "three/addons/webxr/ARButton.js";
import { VRButton } from "three/addons/webxr/VRButton.js";
import { createVariation, parsePrompt, safeImport, SCENE_TEMPLATES, storyboardFromContract, validateContract } from "./scene-engine.js";
import "./style.css";

const stage = document.querySelector("#xr-stage");
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
stage.append(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("#eef4fa");
const camera = new THREE.PerspectiveCamera(48, 1, 0.01, 100);
camera.position.set(3.2, 2.25, 4.6);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0.75, 0);

scene.add(new THREE.HemisphereLight("#ffffff", "#cbd5e1", 2.2));
const keyLight = new THREE.DirectionalLight("#ffffff", 3.8);
keyLight.position.set(4, 7, 5);
keyLight.castShadow = true;
scene.add(keyLight);

const floor = new THREE.Mesh(new THREE.CircleGeometry(4.5, 64), new THREE.MeshStandardMaterial({ color: "#f8fafc", roughness: 0.92 }));
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const grid = new THREE.GridHelper(7, 20, "#1f6feb", "#cbd5e1");
grid.position.y = 0.006;
scene.add(grid);

const generatedRoot = new THREE.Group();
scene.add(generatedRoot);

const reticle = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.16, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: "#10b981" }));
reticle.matrixAutoUpdate = false;
reticle.visible = false;
scene.add(reticle);

let currentContract = parsePrompt(document.querySelector("#scene-prompt").value);
let hitTestSource = null;
let hitTestRequested = false;
let lastFrameTime = performance.now();
let fpsSamples = [];

function clearGenerated() {
  while (generatedRoot.children.length) {
    const child = generatedRoot.children.pop();
    child.traverse?.((item) => {
      item.geometry?.dispose?.();
      if (Array.isArray(item.material)) item.material.forEach((material) => material.dispose?.());
      else item.material?.dispose?.();
    });
  }
}

function addCallout(index, count, colour) {
  const angle = (index / Math.max(count, 1)) * Math.PI * 2;
  const anchor = new THREE.Group();
  anchor.position.set(Math.cos(angle) * 1.25, 0.16, Math.sin(angle) * 1.25);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.32, 12), new THREE.MeshStandardMaterial({ color: colour }));
  pin.position.y = 0.16;
  pin.castShadow = true;
  const badge = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 16), new THREE.MeshStandardMaterial({ color: colour, emissive: colour, emissiveIntensity: 0.2 }));
  badge.position.y = 0.42;
  anchor.add(pin, badge);
  generatedRoot.add(anchor);
}

function buildGeneratedScene(contract) {
  clearGenerated();
  const colour = new THREE.Color(contract.appearance.primary);
  const count = contract.content.instances;
  for (let index = 0; index < count; index += 1) {
    const group = new THREE.Group();
    const angle = (index / count) * Math.PI * 2;
    group.position.set(Math.cos(angle) * 0.62, 0.55 + (index % 2) * 0.18, Math.sin(angle) * 0.62);
    const geometry = index % 3 === 0 ? new THREE.BoxGeometry(0.42, 0.42, 0.42) : index % 3 === 1 ? new THREE.SphereGeometry(0.28, 28, 20) : new THREE.TorusKnotGeometry(0.18, 0.065, 80, 10);
    const material = new THREE.MeshStandardMaterial({ color: colour, metalness: 0.28, roughness: 0.34 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.userData.phase = index * 0.8;
    group.add(mesh);
    generatedRoot.add(group);
  }
  if (contract.behaviour.labels && document.querySelector("#labels-toggle").checked) {
    for (let index = 0; index < contract.content.callouts; index += 1) addCallout(index, contract.content.callouts, colour);
  }
  generatedRoot.scale.setScalar(contract.content.scaleMetres);
  generatedRoot.position.y = 0.02;
  scene.background = contract.targetMode === "ar" ? null : new THREE.Color(contract.appearance.background);
  grid.visible = document.querySelector("#grid-toggle").checked;
}

function renderInspector(contract) {
  const checks = validateContract(contract);
  document.querySelector("#scene-contract").textContent = JSON.stringify(contract, null, 2);
  const checkList = document.querySelector("#validation-list");
  checkList.replaceChildren(...checks.map((check) => {
    const item = document.createElement("li");
    item.className = check.pass ? "pass" : "fail";
    item.textContent = `${check.pass ? "✓" : "✕"} ${check.label}`;
    return item;
  }));
  const story = storyboardFromContract(contract);
  document.querySelector("#storyboard-list").replaceChildren(...story.map((frame) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${frame.frame} · ${frame.state}</strong><span>${frame.evidence}</span>`;
    return item;
  }));
  const score = checks.filter((check) => check.pass).length;
  document.querySelector("#quality-score").textContent = `${score}/${checks.length}`;
  document.querySelector("#acceptance-text").textContent = score === checks.length
    ? `${contract.targetMode.toUpperCase()} contract passes all five checks. Verify immersive behaviour on a supported device.`
    : "The contract has blocking gaps. Review the Checks tab before immersive testing.";
  document.querySelector("#runtime-status").textContent = `${contract.targetMode.toUpperCase()} contract generated`;
}

function applyContract(contract) {
  currentContract = contract;
  buildGeneratedScene(contract);
  renderInspector(contract);
}

function generate() {
  const prompt = document.querySelector("#scene-prompt").value;
  const mode = document.querySelector("#mode-select").value;
  applyContract(parsePrompt(prompt, mode));
}

document.querySelector("#generate-button").addEventListener("click", generate);
document.querySelector("#randomize-button").addEventListener("click", () => applyContract(createVariation(currentContract)));
document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelector("#scene-prompt").value = SCENE_TEMPLATES["ar-maintenance"];
  document.querySelector("#mode-select").value = "auto";
  generate();
});
document.querySelectorAll(".template").forEach((button) => button.addEventListener("click", () => {
  document.querySelector("#scene-prompt").value = SCENE_TEMPLATES[button.dataset.template];
  generate();
}));
document.querySelectorAll("#grid-toggle, #motion-toggle, #labels-toggle").forEach((input) => input.addEventListener("change", () => buildGeneratedScene(currentContract)));

document.querySelectorAll(".tab").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach((tab) => { tab.classList.toggle("active", tab === button); tab.setAttribute("aria-selected", String(tab === button)); });
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("hidden", panel.id !== button.getAttribute("aria-controls")));
}));

document.querySelector("#export-button").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(currentContract, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement("a"), { href: url, download: "ar-vr-scene.json" });
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#capture-button").addEventListener("click", () => {
  renderer.render(scene, camera);
  const link = Object.assign(document.createElement("a"), {
    href: renderer.domElement.toDataURL("image/png"),
    download: `ar-vr-preview-${currentContract.targetMode}.png`
  });
  link.click();
});

document.querySelector("#import-input").addEventListener("change", async (event) => {
  try {
    const text = await event.target.files[0].text();
    applyContract(safeImport(text));
  } catch (error) {
    document.querySelector("#runtime-status").textContent = error.message;
    document.querySelector("#runtime-dot").classList.add("error");
  }
});

const arButton = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"], optionalFeatures: ["dom-overlay"], domOverlay: { root: document.body } });
arButton.className = "xr-button ar";
arButton.textContent = "Enter AR";
document.querySelector("#ar-button-slot").append(arButton);
const vrButton = VRButton.createButton(renderer, { optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking"] });
vrButton.className = "xr-button vr";
vrButton.textContent = "Enter VR";
document.querySelector("#vr-button-slot").append(vrButton);

const controller = renderer.xr.getController(0);
controller.addEventListener("select", () => {
  if (reticle.visible) {
    generatedRoot.position.setFromMatrixPosition(reticle.matrix);
    generatedRoot.visible = true;
  }
});
scene.add(controller);

function onResize() {
  const width = stage.clientWidth;
  const height = Math.max(stage.clientHeight, 360);
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(onResize).observe(stage);

renderer.setAnimationLoop((time, frame) => {
  const seconds = time * 0.001;
  controls.enabled = !renderer.xr.isPresenting;
  controls.update();
  if (document.querySelector("#motion-toggle").checked) {
    generatedRoot.children.forEach((child, index) => {
      if (currentContract.behaviour.motion === "rotate") child.rotation.y = seconds * 0.45 + index;
      if (currentContract.behaviour.motion === "float") child.position.y += Math.sin(seconds * 1.4 + index) * 0.0008;
    });
  }
  if (frame && currentContract.targetMode === "ar") {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();
    if (!hitTestRequested) {
      session.requestReferenceSpace("viewer").then((space) => session.requestHitTestSource({ space })).then((source) => { hitTestSource = source; });
      session.addEventListener("end", () => { hitTestRequested = false; hitTestSource = null; });
      hitTestRequested = true;
    }
    if (hitTestSource) {
      const results = frame.getHitTestResults(hitTestSource);
      reticle.visible = results.length > 0;
      if (results.length) reticle.matrix.fromArray(results[0].getPose(referenceSpace).transform.matrix);
    }
  } else reticle.visible = false;

  const delta = time - lastFrameTime;
  lastFrameTime = time;
  if (delta > 0) fpsSamples.push(1000 / delta);
  if (fpsSamples.length > 24) fpsSamples.shift();
  if (fpsSamples.length) document.querySelector("#fps-value").textContent = Math.round(fpsSamples.reduce((a, b) => a + b, 0) / fpsSamples.length);
  renderer.render(scene, camera);
});

applyContract(currentContract);
onResize();
