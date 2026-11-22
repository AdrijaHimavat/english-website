import {serverSupabase} from "@/lib/supabase-server";

// Receives consented events from the Akhtarnameh astrology app (public/astrology) and stores them in
// public.astro_events. Visitors can only insert; reading is limited to admins via admin_astro_events().
const KINDS = new Set(["visit", "consent", "natal", "partner", "horary", "chat", "ask", "view", "trade", "elect", "world", "lang", "money"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_BODY = 16000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ok: false, error: "too large"}, {status: 413});
  let body: {visitor?: unknown; kind?: unknown; lang?: unknown; data?: unknown};
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ok: false, error: "bad json"}, {status: 400});
  }
  const visitor = typeof body.visitor === "string" ? body.visitor : "";
  const kind = typeof body.kind === "string" ? body.kind : "";
  const lang = typeof body.lang === "string" ? body.lang.slice(0, 8) : null;
  const data = body.data && typeof body.data === "object" && !Array.isArray(body.data) ? body.data : {};
  if (!UUID.test(visitor) || !KINDS.has(kind)) return Response.json({ok: false, error: "invalid"}, {status: 400});

  const sb = await serverSupabase();
  const {error} = await sb.from("astro_events").insert({visitor, kind, lang, data});
  if (error) return Response.json({ok: false}, {status: 500});
  return Response.json({ok: true});
}
