import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy & your data",
  description: "How Grow Me handles your data.",
  alternates: { canonical: "/privacy" },
};
export default function Privacy() {
  return (
    <div className="container legal-page">
      <span className="eyebrow">A LITTLE TRANSPARENCY</span>
      <h1>Privacy & your data</h1>
      <p className="article-deck">
        Learning should feel comfortable. Here is what Grow Me stores and why.
      </p>
      <h2>Accounts</h2>
      <p>
        Articles and the first course lesson are open to everyone. A free
        account unlocks the other lessons. When you create one, your email
        address and sign-in details are stored with our authentication
        provider, Supabase, so that you can sign in and we can remember which
        lessons you have opened.
      </p>
      <h2>The newsletter</h2>
      <p>
        If you submit the newsletter form, your email address is stored so that
        we can send you Grow Me tips and course updates. You can ask to be
        removed at any time through the Contact page.
      </p>
      <h2>Embedded videos</h2>
      <p>
        Lessons play through YouTube or Google Drive. When you watch one,
        Google receives the usual information a video player collects, under
        its own privacy policy.
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
    </div>
  );
}
