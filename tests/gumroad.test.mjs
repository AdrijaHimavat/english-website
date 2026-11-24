import { test } from "node:test";
import assert from "node:assert/strict";
import { parseGumroadPing, isStudioProduct, studioCheckoutUrl } from "../lib/gumroad.ts";

const uid = "3f2b1c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d";
const ping = (extra = {}) =>
  new URLSearchParams({
    sale_id: "abc123==",
    email: "Buyer@Example.com",
    product_id: "Berq9K11BDAk04VDY2KrYA==",
    product_permalink: "https://mocyellow.gumroad.com/l/growme-studio",
    price: "900",
    recurrence: "quarterly",
    subscription_id: "sub_1",
    is_recurring_charge: "false",
    refunded: "false",
    [`url_params[gm_uid]`]: uid,
    ...extra,
  });

test("parses a Gumroad sale ping", () => {
  const sale = parseGumroadPing(ping());
  assert.deepEqual(sale, {
    saleId: "abc123==",
    email: "buyer@example.com",
    userHint: uid,
    productId: "Berq9K11BDAk04VDY2KrYA==",
    productPermalink: "https://mocyellow.gumroad.com/l/growme-studio",
    subscriptionId: "sub_1",
    recurrence: "quarterly",
    priceCents: 900,
    isRecurring: false,
    refunded: false,
    test: false,
  });
});

test("rejects pings without a sale id or email, and ignores bad user ids", () => {
  assert.equal(parseGumroadPing(ping({ sale_id: "" })), null);
  assert.equal(parseGumroadPing(ping({ email: "not-an-email" })), null);
  assert.equal(parseGumroadPing(ping({ "url_params[gm_uid]": "'; drop table x;--" })).userHint, null);
  assert.equal(parseGumroadPing(ping({ refunded: "true", test: "true" })).refunded, true);
});

test("reads url_params sent as JSON", () => {
  const body = ping();
  body.delete("url_params[gm_uid]");
  body.set("url_params", JSON.stringify({ gm_uid: uid }));
  assert.equal(parseGumroadPing(body).userHint, uid);
});

test("product allow-list matches id or permalink", () => {
  const sale = parseGumroadPing(ping());
  assert.equal(isStudioProduct(sale, ""), true);
  assert.equal(isStudioProduct(sale, "growme-studio"), true);
  assert.equal(isStudioProduct(sale, "Berq9K11BDAk04VDY2KrYA=="), true);
  assert.equal(isStudioProduct(sale, "other, more"), false);
});

test("checkout link carries the account id", () => {
  const url = new URL(studioCheckoutUrl({ id: uid, email: "a@b.co" }));
  assert.equal(url.searchParams.get("gm_uid"), uid);
  assert.equal(url.searchParams.get("wanted"), "true");
  assert.equal(new URL(studioCheckoutUrl(null)).searchParams.get("gm_uid"), null);
});
