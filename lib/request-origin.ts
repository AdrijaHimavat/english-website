import { headers } from "next/headers";
import { siteUrl } from "@/lib/site";

/** Origin of the current request (works on Vercel previews), falling back to the site URL. */
export async function requestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  if (!host) return siteUrl;
  const proto = h.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
