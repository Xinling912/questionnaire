import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const appSource = readFileSync(new URL("../app.js", import.meta.url), "utf8");

test("questionnaire submits to the existing CloudBase endpoint without WeChat identity", () => {
  assert.match(appSource, /questionnaire-d7gkuzy61a43c1a64-1445197007\.ap-shanghai\.app\.tcloudbase\.com\/submitResponse/);
  assert.match(appSource, /fetch\(SUBMISSION_ENDPOINT/);
  assert.equal(appSource.includes('mode: "no-cors"'), false);
  assert.match(appSource, /response\.ok/);
  assert.match(appSource, /result\.ok/);
  assert.equal(appSource.includes("Google Apps Script URL"), false);
  assert.equal(appSource.includes("数据保存后端"), false);
  assert.equal(appSource.includes("openid"), false);
  assert.equal(appSource.includes("wechat"), false);
});
