import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("questionnaire stays anonymous and browser-only", () => {
  assert.equal(appSource.includes('mode: "no-cors"'), false);
  assert.equal(appSource.includes("fetch("), false);
  assert.equal(appSource.includes("localStorage"), false);
  assert.equal(appSource.includes("respondentId"), false);
  assert.equal(appSource.includes("openid"), false);
  assert.equal(appSource.includes("wechat"), false);
  assert.match(appSource, /downloadResponses/);
});
