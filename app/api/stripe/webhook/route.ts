import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { grantAccessForCheckout } from "@/lib/course-access";

// Stripe calls this after a payment. Add the endpoint in Stripe → Developers → Webhooks:
//   https://growme.blog/api/stripe/webhook
// Events: checkout.session.completed, checkout.session.async_payment_succeeded
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!stripe || !secret || !signature) return new Response("Webhook not configured", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid" && !(await grantAccessForCheckout(session))) {
      // Non-2xx makes Stripe retry later.
      return new Response("Could not record access", { status: 500 });
    }
  }
  return Response.json({ received: true });
}
