// One-time price for the full Instagram course. Stripe shows buyers this price
// converted to their local currency (Adaptive Pricing); you are paid in AUD.
export const COURSE_SLUG = "instagram-growth";
export const COURSE_NAME = "Instagram Growth: From Zero to Millions — Full Course";

const amount = Number.parseInt(process.env.COURSE_PRICE_CENTS || "", 10);
export const coursePrice = {
  amount: Number.isFinite(amount) && amount > 0 ? amount : 2900,
  currency: (process.env.COURSE_PRICE_CURRENCY || "usd").toLowerCase(),
};

export function formatPrice(p = coursePrice) {
  const value = p.amount / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: p.currency.toUpperCase(),
    currencyDisplay: p.currency === "usd" ? "narrowSymbol" : "symbol",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value) + (p.currency === "usd" ? " USD" : "");
}
