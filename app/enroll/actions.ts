"use server";
import { redirect } from "next/navigation";
import { serverSupabase } from "@/lib/supabase-server";
import { getStripe } from "@/lib/stripe";
import { hasCourseAccess } from "@/lib/course-access";
import { COURSE_NAME, COURSE_SLUG, coursePrice } from "@/lib/pricing";
import { requestOrigin } from "@/lib/request-origin";
import { createOrder, paypalEnabled } from "@/lib/paypal";

function safeNext(raw: FormDataEntryValue | null) {
  const next = String(raw || "");
  return next.startsWith("/courses/instagram-growth/") && !next.startsWith("//") && !next.includes("\\") ? next : "";
}

export async function startCheckout() {
  const sb = await serverSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/auth?mode=signup&next=/enroll");
  if (await hasCourseAccess(sb, user.id)) redirect("/my-learning");

  const stripe = getStripe();
  if (!stripe) redirect("/enroll?error=payments_unavailable");

  const origin = await requestOrigin();
  let url: string | null = null;
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: coursePrice.currency,
          unit_amount: coursePrice.amount,
          product_data: {
            name: COURSE_NAME,
            description: "Lifetime access to every Instagram Growth lesson on growme.blog.",
          },
        },
      }],
      client_reference_id: user.id,
      customer_email: user.email || undefined,
      metadata: { user_id: user.id, course_slug: COURSE_SLUG },
      payment_intent_data: { metadata: { user_id: user.id, course_slug: COURSE_SLUG } },
      allow_promotion_codes: true,
      adaptive_pricing: { enabled: true },
      success_url: `${origin}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/enroll?checkout=cancelled`,
    });
    url = session.url;
  } catch (err) {
    console.error("Stripe checkout failed", err);
  }
  redirect(url || "/enroll?error=checkout");
}

export async function startPayPal() {
  const sb = await serverSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/auth?mode=signup&next=/enroll");
  if (await hasCourseAccess(sb, user.id)) redirect("/my-learning");
  if (!paypalEnabled()) redirect("/enroll?error=payments_unavailable");

  const origin = await requestOrigin();
  let url: string | null = null;
  try {
    url = await createOrder({
      userId: user.id,
      amountCents: coursePrice.amount,
      currency: coursePrice.currency,
      description: COURSE_NAME,
      returnUrl: `${origin}/enroll/paypal`,
      cancelUrl: `${origin}/enroll?checkout=cancelled`,
    });
  } catch (err) {
    console.error("PayPal order failed", err);
  }
  redirect(url || "/enroll?error=checkout");
}

const codeMessages: Record<string, string> = {
  ok: "unlocked", already: "already", invalid: "code_invalid", expired: "code_expired",
  used_up: "code_used_up", not_signed_in: "signin",
};

export async function redeemCode(form: FormData) {
  const sb = await serverSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/auth?mode=signup&next=/enroll");
  const code = String(form.get("code") || "").trim().slice(0, 64);
  if (!code) redirect("/enroll?error=code_missing");

  const { data, error } = await sb.rpc("redeem_access_code", { p_code: code });
  const result = error ? "error" : String(data);
  if (result === "ok" || result === "already") {
    const next = safeNext(form.get("next"));
    redirect(next || `/my-learning?welcome=${codeMessages[result]}`);
  }
  redirect(`/enroll?error=${codeMessages[result] || "code_error"}`);
}
