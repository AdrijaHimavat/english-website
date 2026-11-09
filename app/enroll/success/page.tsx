import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { grantAccessForCheckout } from "@/lib/course-access";
import "../../courses/courses.css";

export const metadata = { title: "Thank you | Grow Me", robots: { index: false } };

export default async function EnrollSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const stripe = getStripe();
  let status: "paid" | "pending" | "unknown" = "unknown";

  if (stripe && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === "paid") {
        // The webhook also records this; doing it here means access works immediately.
        await grantAccessForCheckout(session);
        status = "paid";
      } else if (session.status === "complete") {
        status = "pending";
      }
    } catch {
      status = "unknown";
    }
  }

  return (
    <div className="course-shell">
      <section className="course-hero">
        <div className="container" style={{ maxWidth: 720 }}>
          {status === "paid" ? (
            <>
              <CheckCircle2 size={42} color="#477b51" aria-hidden="true" />
              <span className="eyebrow" style={{ display: "block", marginTop: 18 }}>PAYMENT CONFIRMED</span>
              <h1>Welcome to the<br /><em>full course.</em></h1>
              <p>Thank you! Every lesson is now unlocked. A receipt from Stripe is on its way to your email.</p>
              <Link className="button" href="/my-learning" style={{ marginTop: 26 }}>Start learning <ArrowRight size={17} /></Link>
            </>
          ) : status === "pending" ? (
            <>
              <Clock size={42} color="#7a6a3a" aria-hidden="true" />
              <span className="eyebrow" style={{ display: "block", marginTop: 18 }}>PAYMENT PROCESSING</span>
              <h1>Almost there.</h1>
              <p>Your payment is still being confirmed by your bank. Your lessons will unlock automatically as soon as it clears.</p>
              <Link className="button" href="/my-learning" style={{ marginTop: 26 }}>Go to my dashboard <ArrowRight size={17} /></Link>
            </>
          ) : (
            <>
              <span className="eyebrow">CHECKING YOUR PAYMENT</span>
              <h1>We couldn&apos;t confirm this payment yet.</h1>
              <p>If you completed checkout, your lessons will unlock shortly. If they don&apos;t, please <Link href="/contact" style={{ textDecoration: "underline" }}>contact us</Link> with the email you paid with.</p>
              <Link className="button" href="/my-learning" style={{ marginTop: 26 }}>Go to my dashboard <ArrowRight size={17} /></Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
