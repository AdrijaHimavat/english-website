import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { COURSE_SLUG } from "@/lib/pricing";
import { adminSupabase } from "@/lib/supabase-admin";

/** True when the signed-in student has bought the course or redeemed a code. */
export async function hasCourseAccess(sb: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await sb
    .from("course_access")
    .select("course_slug")
    .eq("user_id", userId)
    .eq("course_slug", COURSE_SLUG)
    .maybeSingle();
  return !error && Boolean(data);
}

/** Records a verified purchase. Only call after the payment provider confirmed it. */
export async function grantAccess(userId: string, source: "stripe" | "paypal", reference: string, course = COURSE_SLUG): Promise<boolean> {
  const admin = adminSupabase();
  if (!admin) return false;
  const { error } = await admin
    .from("course_access")
    .upsert(
      { user_id: userId, course_slug: course, source, reference },
      { onConflict: "user_id,course_slug", ignoreDuplicates: true },
    );
  if (error) console.error("course_access upsert failed", error.message);
  return !error;
}

/** Grants access for a paid Stripe Checkout Session. Returns true when access is (now) recorded. */
export async function grantAccessForCheckout(session: Stripe.Checkout.Session): Promise<boolean> {
  const userId = session.client_reference_id || session.metadata?.user_id;
  if (!userId || session.payment_status !== "paid") return false;
  return grantAccess(userId, "stripe", session.id, session.metadata?.course_slug || COURSE_SLUG);
}
