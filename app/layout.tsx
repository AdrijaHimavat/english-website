import type { Metadata } from "next";
import { Header } from "@/components/header";
import {serverSupabase} from "@/lib/supabase-server";
import { Footer } from "@/components/footer";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grow Me — Learn. Create. Grow.",
    template: "%s | Grow Me",
  },
  description:
    "Free, practical guides to content creation, AI, social media, and building your online presence. Learn something useful. Grow at your own pace.",
  openGraph: {
    type: "website",
    siteName: "Grow Me",
    locale: "en_US",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "Grow Me — Learn. Create. Grow.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const sb=await serverSupabase();
  const {data:{user}}=await sb.auth.getUser();
  const studentName=typeof user?.user_metadata?.full_name==="string"?user.user_metadata.full_name.trim().slice(0,70):user?.email?.split("@")[0]||null;
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header studentName={studentName} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
