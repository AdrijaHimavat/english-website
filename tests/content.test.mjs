import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const articles = JSON.parse(
  fs.readFileSync(new URL("../lib/articles.json", import.meta.url), "utf8"),
);
const categories = [
  "Instagram Growth",
  "Social Media Marketing",
  "Artificial Intelligence",
  "Content Creation",
  "Digital Marketing",
  "Online Business",
  "Productivity & Tools",
];
test("library contains twelve unique, complete original articles across all seven categories", () => {
  assert.equal(articles.length, 12);
  assert.equal(new Set(articles.map((a) => a.slug)).size, 12);
  assert.deepEqual(
    new Set(articles.map((a) => a.category)),
    new Set(categories),
  );
  for (const a of articles) {
    assert.match(a.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(a.title && a.description && a.intro && a.takeaway);
    assert.ok(!Number.isNaN(Date.parse(a.date)));
    assert.ok(a.sections.length >= 4);
    assert.equal(new Set(a.sections.map((s) => s.id)).size, a.sections.length);
    for (const s of a.sections) {
      assert.ok(s.title && s.id && s.paragraphs.length);
    }
    const text = [
      a.intro,
      ...a.sections.flatMap((s) => [
        ...s.paragraphs,
        ...(s.bullets || []),
        s.example || "",
      ]),
      a.takeaway,
    ].join(" ");
    assert.ok(
      text.split(/\s+/).length >= 350,
      `${a.slug} should offer a substantive lesson`,
    );
    assert.ok(
      a.sections.some((s) => s.example),
      `${a.slug} needs a worked example`,
    );
    assert.ok(
      a.sections.some((s) => s.bullets),
      `${a.slug} needs actionable steps`,
    );
  }
});
