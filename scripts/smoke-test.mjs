import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || "msedge",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const results = [];
const errors = [];
await mkdir("test-results", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(process.env.TEST_URL || "http://127.0.0.1:5173/", {
    waitUntil: "networkidle",
  });
  await page.locator(".cube-stage canvas").waitFor({ timeout: 30000 });
  assert.equal(
    await page
      .getByRole("button", { name: /(?:Play|Pause) cube rotation/ })
      .count(),
    0,
  );
  assert.equal(await page.locator("#resumes,.hero-explore-link").count(), 0);
  await page
    .locator(".cube-topics")
    .getByRole("button", { name: "About me", exact: true })
    .click();
  await page.locator(".cube-stage").scrollIntoViewIfNeeded();
  const autoBefore = await page.locator(".cube-stage").screenshot();
  await page.waitForTimeout(400);
  const autoAfter = await page.locator(".cube-stage").screenshot();
  assert.notEqual(
    Buffer.compare(autoBefore, autoAfter),
    0,
    "Cube rotates automatically after selecting a topic",
  );
  const dragBox = await page.locator(".cube-stage").boundingBox();
  await page.mouse.move(
    dragBox.x + dragBox.width / 2,
    dragBox.y + dragBox.height / 2,
  );
  await page.mouse.down();
  const heldBefore = await page.locator(".cube-stage").screenshot();
  await page.waitForTimeout(300);
  const heldAfter = await page.locator(".cube-stage").screenshot();
  assert.equal(
    Buffer.compare(heldBefore, heldAfter),
    0,
    "Holding the cube stops automatic rotation for manual control",
  );
  await page.mouse.up();
  const releaseBefore = await page.locator(".cube-stage").screenshot();
  await page.waitForTimeout(400);
  const releaseAfter = await page.locator(".cube-stage").screenshot();
  assert.notEqual(
    Buffer.compare(releaseBefore, releaseAfter),
    0,
    "Automatic rotation resumes on release",
  );
  results.push(
    "Cube rotates automatically, permits manual control, and resumes on release without play/pause controls",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator('a[href="#"]').count(), 0);
  const missingTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((link) => !document.getElementById(link.hash.slice(1)))
        .map((link) => link.hash),
    );
  assert.deepEqual(missingTargets, []);
  results.push(
    "Desktop page, cube renderer, anchor targets, and heading structure passed",
  );
  const projects = await page
    .locator('#work a[href^="https://github.com/gitzboy1/"]')
    .evaluateAll((links) =>
      links.map((link) => new URL(link.href).pathname.split("/")[2]).sort(),
    );
  assert.deepEqual(
    projects,
    [
      "Colossus",
      "Dropship-agent",
      "Eyesonic",
      "GymSetu",
      "Tour-Explore",
      "amex-shield",
      "portfolio_parth",
    ].sort(),
  );
  results.push(
    "All seven intended repositories present; both excluded repositories absent",
  );
  for (const [topic, expected] of [
    ["projects", "Things I’ve built."],
    ["experience", "Four internships. Different perspectives."],
    ["education", "An engineer. Always a student."],
    ["Let’s talk", "Let’s build something useful."],
    ["skills", "The tools behind the work."],
    ["About me", "Hi, I’m Parth."],
  ]) {
    await page
      .locator(".cube-topics")
      .getByRole("button", { name: topic, exact: true })
      .click();
    await page.waitForTimeout(150);
    assert.equal(await page.locator(".cube-detail h3").innerText(), expected);
  }
  await page.locator("#explore").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/cube-explorer.png" });
  results.push(
    "All six cube topics rotate to matching biographical content and section links",
  );
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    assert.equal(overflow, false, "Horizontal overflow at " + width);
    const clipped = await page
      .locator("h1,h2,h3,p,.tags,.contact-email")
      .evaluateAll((elements) =>
        elements
          .filter(
            (element) =>
              element.getBoundingClientRect().right > innerWidth + 1 ||
              element.getBoundingClientRect().left < -1,
          )
          .map((element) => element.textContent),
      );
    assert.deepEqual(clipped, [], "Clipped content at " + width);
  }
  results.push(
    "No horizontal overflow or clipped text at 320, 375, 390, 768, 1024, 1440 px",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert.equal(await page.locator("#primary-navigation").isVisible(), true);
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#primary-navigation").isVisible(), false);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .locator("#primary-navigation")
    .getByRole("link", { name: "Work", exact: true })
    .click();
  assert.equal(await page.locator("#primary-navigation").isVisible(), false);
  assert.equal(new URL(page.url()).hash, "#work");
  results.push(
    "Mobile navigation opens, closes on Escape, and follows section links",
  );
  await page.locator(".cube-stage").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/mobile-cube.png" });
  const before = await page.locator(".cube-stage").screenshot();
  await page.locator(".cube-stage").focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(150);
  const after = await page.locator(".cube-stage").screenshot();
  assert.notEqual(
    Buffer.compare(before, after),
    0,
    "Keyboard must rotate cube",
  );
  const box = await page.locator(".cube-stage").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    box.x + box.width / 2 + 65,
    box.y + box.height / 2 + 20,
    { steps: 8 },
  );
  await page.mouse.up();
  assert.equal(await page.locator(".cube-stage.is-dragging").count(), 0);
  results.push("Cube keyboard rotation and pointer drag passed");
  for (const link of await page.locator("a[download]").all()) {
    const href = await link.getAttribute("href");
    const response = await page.request.get(new URL(href, page.url()).href);
    assert.equal(response.status(), 200);
    assert.ok(
      (await response.body()).subarray(0, 4).equals(Buffer.from("%PDF")),
    );
  }
  const downloadPromise = page.waitForEvent("download");
  await page.locator("a[download]").first().click();
  const download = await downloadPromise;
  assert.match(download.suggestedFilename(), /DB_Resume.pdf$/);
  results.push(
    "Header Resume button directly downloads the DB PDF; no resume-selection section remains",
  );
  await page
    .getByRole("button", { name: "Copy email address", exact: true })
    .click();
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "Parth8up0@gmail.com",
  );
  results.push("Copy email interaction passed");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".cube-stage").scrollIntoViewIfNeeded();
  const stillA = await page.locator(".cube-stage").screenshot();
  await page.waitForTimeout(250);
  const stillB = await page.locator(".cube-stage").screenshot();
  assert.equal(
    Buffer.compare(stillA, stillB),
    0,
    "Reduced-motion cube should be still",
  );
  results.push("Reduced motion stops cube animation");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
  const fallback = await context.newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return type.includes("webgl") ? null : original.call(this, type, ...args);
    };
  });
  fallback.on("pageerror", (error) => errors.push(error.message));
  await fallback.goto(process.env.TEST_URL || "http://127.0.0.1:5173/", {
    waitUntil: "networkidle",
  });
  assert.equal(await fallback.locator(".cube-fallback").isVisible(), true);
  assert.equal(
    await fallback.getByRole("heading", { level: 1 }).isVisible(),
    true,
  );
  results.push("WebGL-unavailable fallback preserves the page");
  await fallback
    .locator(".cube-topics")
    .getByRole("button", { name: "experience", exact: true })
    .click();
  assert.equal(
    await fallback.locator(".cube-detail h3").innerText(),
    "Four internships. Different perspectives.",
  );
  results.push("Biographical topics remain usable without WebGL");
  const touchContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const touchPage = await touchContext.newPage();
  touchPage.on("pageerror", (error) => errors.push(error.message));
  await touchPage.goto(process.env.TEST_URL || "http://127.0.0.1:5173/", {
    waitUntil: "networkidle",
  });
  await touchPage
    .locator(".cube-topics")
    .getByRole("button", { name: "About me", exact: true })
    .click();
  await touchPage.locator(".cube-stage").scrollIntoViewIfNeeded();
  const touchBox = await touchPage.locator(".cube-stage").boundingBox();
  const touchX = touchBox.x + touchBox.width / 2;
  const touchY = touchBox.y + touchBox.height / 2;
  const initialScroll = await touchPage.evaluate(() => scrollY);
  const client = await touchContext.newCDPSession(touchPage);
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: touchX, y: touchY }],
  });
  for (let step = 1; step <= 8; step++) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: touchX, y: touchY - step * 18 }],
    });
    await touchPage.waitForTimeout(20);
  }
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await touchPage.waitForTimeout(250);
  assert.ok(
    (await touchPage.evaluate(() => scrollY)) > initialScroll + 30,
    "A vertical swipe over the cube must scroll the page",
  );
  assert.equal(await touchPage.locator(".cube-stage.is-dragging").count(), 0);
  await touchContext.close();
  results.push(
    "Touch scrolling over the cube works without trapping the gesture",
  );
  assert.deepEqual(errors, [], "Runtime errors");
  results.push("No JavaScript runtime errors");
  await writeFile(
    "test-results/report.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  console.log(JSON.stringify({ results, errors }, null, 2));
} finally {
  await browser.close();
}
