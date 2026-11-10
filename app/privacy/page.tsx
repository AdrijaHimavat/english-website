import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy & your data",
  description: "How this version of Grow Me handles your data.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <div className="container legal-page">
      <span className="eyebrow">A LITTLE TRANSPARENCY</span>
      <h1>Privacy & your data</h1>
      <p className="article-deck">
        Learning should feel comfortable. Here is how this version of Grow Me
        works.
      </p>
      <h2>Articles are public</h2>
      <p>
        All articles can be read without an account. Grow Me does not use
        advertising trackers.
      </p>
      <h2>Student accounts</h2>
      <p>
        If you create a student account, we store your name, email address,
        optional WhatsApp number, the lessons you mark complete, and whether you
        have access to the full course. Accounts are managed with Supabase, and
        a sign-in cookie keeps you logged in.
      </p>
      <h2>Payments</h2>
      <p>
        Course payments are processed by Stripe. Your card details go directly
        to Stripe and are never seen or stored by Grow Me. We receive a record of
        the purchase (such as your email address, the amount and the payment
        status) so we can unlock your lessons. Stripe’s own privacy policy
        applies to the information you give it at checkout.
      </p>
      <h2>The newsletter is not connected</h2>
      <p>
        The newsletter form is a demonstration of a future feature. Submitting
        it does not send, store, or subscribe your email address. You will see
        an explanation when you submit it.
      </p>
      <h2>Search and sharing</h2>
      <p>
        Search terms appear in the page URL. Avoid putting private information
        into the search box. Copying a link uses your browser’s clipboard
        permission. The Share button opens your device’s sharing options when
        supported, or copies the link.
      </p>
      <h2>Hosting and technical logs</h2>
      <p>
        When deployed, the hosting provider may process connection information
        such as IP addresses and requested URLs in technical logs. Retention and
        processing depend on the provider and configuration chosen by the site
        owner. No third-party analytics are configured in this application.
      </p>
      <h2>Future changes</h2>
      <p>
        Before collecting newsletter subscriptions or adding analytics, the site
        owner should connect an appropriate service, review consent and data
        handling requirements, and update this page with the actual practices
        and a contact method.
      </p>
    </div>
  );
}
