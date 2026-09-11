import { describe, expect, it } from "vitest";
import { parsePrompt, safeImport, storyboardFromContract, validateContract } from "./scene-engine.js";

describe("scene contract", () => {
  it("parses an AR prompt into a hit-test contract", () => {
    const scene = parsePrompt("Create a teal AR turbine with three callouts and slow rotation.");
    expect(scene.targetMode).toBe("ar");
    expect(scene.tracking.placement).toBe("hit-test");
    expect(scene.content.subject).toBe("turbine");
    expect(scene.content.callouts).toBe(3);
    expect(scene.appearance.primary).toBe("#10b981");
    expect(validateContract(scene).every((check) => check.pass)).toBe(true);
  });

  it("honours a VR override and produces a four-frame storyboard", () => {
    const scene = parsePrompt("Create a blue cube", "vr");
    expect(scene.targetMode).toBe("vr");
    expect(scene.tracking.origin).toBe("local-floor");
    expect(storyboardFromContract(scene)).toHaveLength(4);
  });

  it("rejects an unsupported import schema", () => {
    expect(() => safeImport({ schema: "unknown" })).toThrow(/Unsupported scene schema/);
  });
});
