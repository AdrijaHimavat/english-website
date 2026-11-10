// Minimal PayPal Orders v2 client (server only). Enabled when PAYPAL_CLIENT_ID and
// PAYPAL_CLIENT_SECRET are set. PAYPAL_ENV=sandbox uses PayPal's test environment.
const base = () =>
  process.env.PAYPAL_ENV === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

export function paypalEnabled() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

async function accessToken(): Promise<string> {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${base()}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`PayPal auth failed: ${res.status}`);
  return (await res.json()).access_token;
}

async function call(path: string, init: { method: string; body?: unknown; requestId?: string }) {
  const res = await fetch(`${base()}${path}`, {
    method: init.method,
    headers: {
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
      ...(init.requestId ? { "PayPal-Request-Id": init.requestId } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export type PayPalOrder = {
  id: string;
  status: string;
  links?: { rel: string; href: string }[];
  purchase_units?: {
    custom_id?: string;
    amount?: { currency_code: string; value: string };
    payments?: { captures?: { status: string; amount: { currency_code: string; value: string } }[] };
  }[];
};

export async function createOrder(opts: {
  userId: string; amountCents: number; currency: string; description: string; returnUrl: string; cancelUrl: string;
}) {
  const { ok, data } = await call("/v2/checkout/orders", {
    method: "POST",
    requestId: `growme-${opts.userId}-${Date.now()}`,
    body: {
      intent: "CAPTURE",
      purchase_units: [{
        custom_id: opts.userId,
        description: opts.description.slice(0, 127),
        amount: { currency_code: opts.currency.toUpperCase(), value: (opts.amountCents / 100).toFixed(2) },
      }],
      payment_source: {
        paypal: {
          experience_context: {
            brand_name: "Grow Me",
            shipping_preference: "NO_SHIPPING",
            user_action: "PAY_NOW",
            return_url: opts.returnUrl,
            cancel_url: opts.cancelUrl,
          },
        },
      },
    },
  });
  if (!ok) throw new Error(`PayPal create order failed: ${JSON.stringify(data).slice(0, 300)}`);
  const order = data as PayPalOrder;
  return order.links?.find((l) => l.rel === "payer-action" || l.rel === "approve")?.href ?? null;
}

/** Captures an approved order (or reads it if already captured) and returns the final order. */
export async function captureOrder(orderId: string): Promise<PayPalOrder | null> {
  const id = encodeURIComponent(orderId);
  const captured = await call(`/v2/checkout/orders/${id}/capture`, { method: "POST", body: {}, requestId: `capture-${orderId}` });
  if (captured.ok) return captured.data as PayPalOrder;
  const current = await call(`/v2/checkout/orders/${id}`, { method: "GET" });
  return current.ok ? (current.data as PayPalOrder) : null;
}
