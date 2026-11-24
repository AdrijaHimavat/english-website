// Grow Me Studio is sold as a Gumroad membership. Gumroad's "Ping" posts each sale to
// /api/gumroad/ping, which records it and grants Studio access in the database.

export const GUMROAD_PRODUCT_URL = process.env.NEXT_PUBLIC_GUMROAD_PRODUCT_URL || "https://mocyellow.gumroad.com/l/growme-studio";
/** Shown on the pricing page. Keep in step with the price set on Gumroad. */
export const STUDIO_PRICE = {amount: "$9", period: "a month"};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Checkout link. The Grow Me user id travels in the URL so the sale reaches the right account even if a different email is used at checkout. */
export function studioCheckoutUrl(user?: {id: string; email?: string | null} | null): string {
  const url = new URL(GUMROAD_PRODUCT_URL);
  url.searchParams.set("wanted", "true");
  if (user && UUID.test(user.id)) {
    url.searchParams.set("gm_uid", user.id);
    if (user.email) url.searchParams.set("email", user.email);
  }
  return url.toString();
}

export type GumroadSale = {
  saleId: string;
  email: string;
  userHint: string | null;
  productId: string | null;
  productPermalink: string | null;
  subscriptionId: string | null;
  recurrence: string | null;
  priceCents: number | null;
  isRecurring: boolean;
  refunded: boolean;
  test: boolean;
};

type Fields = {get(name: string): unknown};

function text(fields: Fields, name: string): string | null {
  const v = fields.get(name);
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

/** Gumroad sends url_params as `url_params[gm_uid]=…` form fields (or occasionally a JSON string). */
function userHint(fields: Fields): string | null {
  let hint = text(fields, "url_params[gm_uid]");
  if (!hint) {
    const raw = text(fields, "url_params");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Record<string, unknown>;
        hint = typeof parsed.gm_uid === "string" ? parsed.gm_uid : null;
      } catch {
        hint = null;
      }
    }
  }
  return hint && UUID.test(hint) ? hint.toLowerCase() : null;
}

/** Reads a Gumroad Ping body (form fields). Returns null when it is not a usable sale. */
export function parseGumroadPing(fields: Fields): GumroadSale | null {
  const saleId = text(fields, "sale_id");
  const email = text(fields, "email");
  if (!saleId || !email || !email.includes("@")) return null;
  const price = Number.parseInt(text(fields, "price") ?? "", 10);
  return {
    saleId,
    email: email.toLowerCase(),
    userHint: userHint(fields),
    productId: text(fields, "product_id"),
    productPermalink: text(fields, "product_permalink") ?? text(fields, "permalink"),
    subscriptionId: text(fields, "subscription_id"),
    recurrence: text(fields, "recurrence"),
    priceCents: Number.isFinite(price) ? price : null,
    isRecurring: text(fields, "is_recurring_charge") === "true",
    refunded: text(fields, "refunded") === "true",
    test: text(fields, "test") === "true",
  };
}

/** Optional allow-list (comma separated ids or permalinks) so other Gumroad products never unlock Studio. */
export function isStudioProduct(sale: GumroadSale, allowList: string | undefined): boolean {
  const allowed = (allowList || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!allowed.length) return true;
  const permalink = sale.productPermalink?.split("/").pop() ?? null;
  return allowed.some((a) => a === sale.productId || a === permalink);
}
