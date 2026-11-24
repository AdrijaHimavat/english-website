import {timingSafeEqual} from "node:crypto";
import {createClient} from "@supabase/supabase-js";
import {supabaseConfigured, supabaseKey, supabaseUrl} from "@/lib/supabase-env";
import {isStudioProduct, parseGumroadPing} from "@/lib/gumroad";

// Gumroad "Ping" endpoint: https://growme.blog/api/gumroad/ping?key=<GUMROAD_WEBHOOK_KEY>
// Gumroad does not sign pings, so the secret key in the URL authenticates them. The database
// checks the same key (stored in Supabase Vault) before it records a sale or grants access.

function sameKey(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(request: Request) {
  const key = new URL(request.url).searchParams.get("key") || "";
  const expected = process.env.GUMROAD_WEBHOOK_KEY || "";
  if (!expected || !key || !sameKey(key, expected)) return new Response("Forbidden", {status: 403});
  if (!supabaseConfigured) return new Response("Not configured", {status: 503});

  let fields: FormData;
  try {
    fields = await request.formData();
  } catch {
    return new Response("Expected form data", {status: 400});
  }
  const sale = parseGumroadPing(fields);
  if (!sale) return new Response("Not a sale", {status: 400});
  // "Send test ping" in Gumroad settings: confirm the URL works without granting anything.
  if (sale.test) return Response.json({result: "test-ok"});
  if (!isStudioProduct(sale, process.env.GUMROAD_PRODUCT_IDS)) {
    console.warn("gumroad ping for another product ignored", sale.saleId, sale.productId, sale.productPermalink);
    return Response.json({result: "ignored-product"});
  }

  const sb = createClient(supabaseUrl, supabaseKey, {auth: {persistSession: false, autoRefreshToken: false}});
  const {data, error} = await sb.rpc("gumroad_ping", {
    p_key: key,
    p_sale_id: sale.saleId,
    p_email: sale.email,
    p_user_hint: sale.userHint,
    p_product_id: sale.productId,
    p_product_permalink: sale.productPermalink,
    p_subscription_id: sale.subscriptionId,
    p_recurrence: sale.recurrence,
    p_price_cents: sale.priceCents,
    p_is_recurring: sale.isRecurring,
    p_refunded: sale.refunded,
  });
  if (error) {
    console.error("gumroad ping failed", sale.saleId, error.message);
    return new Response("Could not record sale", {status: 500}); // non-200 lets Gumroad retry
  }
  return Response.json({result: data});
}
