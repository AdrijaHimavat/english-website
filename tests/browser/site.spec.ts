import { test, expect } from "@playwright/test";
import fs from "node:fs";

test("home, library, category filter, search, and empty recovery", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Small steps.",
  );
  await page.getByRole("link", { name: "Find your next idea" }).click();
  await expect(page).toHaveURL(/\/articles$/);
  await expect(page.locator(".library-grid .article-card")).toHaveCount(6);
  await page
    .getByRole("navigation", { name: "Article pagination" })
    .getByRole("link", { name: "Next page" })
    .click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator(".library-grid .article-card")).toHaveCount(6);
  await page
    .getByRole("navigation", { name: "Filter articles by category" })
    .getByRole("link", { name: "Artificial Intelligence" })
    .click();
  await expect(page.locator(".library-grid .article-card")).toHaveCount(2);
  await expect(page).not.toHaveURL(/page=2/);
  await page
    .getByRole("textbox", { name: "Search articles by keyword" })
    .fill("fact-checking");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(page.locator(".library-grid .article-card")).toHaveCount(1);
  await expect(
    page.getByRole("heading", {
      name: "A practical checklist for fact-checking AI content",
    }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search articles by keyword" })
    .fill("zzznomatchingarticle");
  await page.getByRole("button", { name: "Search", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "A new direction, perhaps?" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Browse all articles", exact: true })
    .click();
  await expect(page.locator(".library-grid .article-card")).toHaveCount(6);
  expect(errors).toEqual([]);
});

test("all article routes render, contents anchors work, missing pages return 404", async ({
  page,
  request,
}) => {
  await page.goto("/articles/build-an-instagram-content-plan");
  await expect(page).toHaveTitle(
    "A calmer way to plan your Instagram content | Grow Me",
  );
  await page
    .getByRole("navigation", { name: "Table of contents" })
    .getByRole("link", { name: "Start with one person and one problem" })
    .click();
  await expect(page).toHaveURL(/#start-with-one-person/);
  await expect(page.locator(".related-section .article-card")).toHaveCount(3);
  const data = JSON.parse(fs.readFileSync("lib/articles.json", "utf8")) as {
    slug: string;
    title: string;
  }[];
  for (const a of data) {
    const r = await request.get(`/articles/${a.slug}`);
    expect(r.status()).toBe(200);
    expect(await r.text()).toContain(a.title.replaceAll("&", "&amp;"));
  }
  const missing = await request.get("/articles/does-not-exist");
  expect(missing.status()).toBe(404);
  await page.goto("/a-missing-page");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "next good idea",
  );
});

test("newsletter is honest, validates email, and does not send personal data", async ({
  page,
}) => {
  await page.goto("/");
  const requests: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") requests.push(r.url());
  });
  await page
    .getByRole("textbox", { name: "Your email address" })
    .fill("invalid-email");
  await page.getByRole("button", { name: "Count me in" }).click();
  await expect(page.locator(".form-message")).toBeEmpty();
  expect(
    await page
      .getByRole("textbox", { name: "Your email address" })
      .evaluate((el: HTMLInputElement) => el.validity.valid),
  ).toBeFalsy();
  await page
    .getByRole("textbox", { name: "Your email address" })
    .fill("reader@example.com");
  await page.getByRole("button", { name: "Count me in" }).click();
  await expect(page.getByRole("status")).toContainText(
    "has not been saved or sent",
  );
  expect(requests).toEqual([]);
});

test("mobile navigation and pages have no horizontal overflow", async ({
  page,
}) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of [
      "/",
      "/articles",
      "/about",
      "/articles/build-an-instagram-content-plan",
      "/privacy",
    ]) {
      await page.goto(route);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        route,
      ).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "About Grow Me" })
    .click();
  await expect(page).toHaveURL("/about");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
});

test("SEO metadata, sitemap, and robots are available", async ({
  page,
  request,
}) => {
  await page.goto("/about");
  await expect(page).toHaveTitle("About Grow Me | Grow Me");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /free learning space/,
  );
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});

test("key pages meet automated WCAG A/AA checks at desktop and mobile widths", async ({
  page,
}) => {
  test.setTimeout(60000);
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/articles",
      "/articles/build-an-instagram-content-plan",
      "/about",
      "/privacy",
    ]) {
      await page.goto(path);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        `${path} at ${width}px`,
      ).toEqual([]);
    }
  }
});

test("article links can be copied for sharing", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/articles/build-an-instagram-content-plan");
  await page.getByRole("button", { name: "Copy link" }).click();
  await expect(page.getByRole("status")).toContainText("Article link copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "/articles/build-an-instagram-content-plan",
  );
});
