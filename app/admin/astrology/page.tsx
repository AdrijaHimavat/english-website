import Link from "next/link";
import {redirect} from "next/navigation";
import {CalendarDays, MessageCircle, Sparkles, Users} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {DeleteVisitor} from "./delete-visitor";
import "../../courses/courses.css";

export const metadata = {title: "Akhtarnameh visitors | Grow Me admin", robots: {index: false}};
export const dynamic = "force-dynamic";

type EventRow = {id: number; created_at: string; visitor: string; kind: string; lang: string | null; data: Record<string, unknown>};

const fmt = (d: string) => new Date(d).toLocaleString("en-GB", {day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"});
const s = (v: unknown) => (v === null || v === undefined ? "" : String(v));
const KIND: Record<string, string> = {
  visit: "Visit", consent: "Consent given", natal: "Birth data", partner: "Other person", horary: "Horary question", chat: "Chat",
  ask: "Question", view: "Opened section", trade: "Buy & sell", elect: "Elections", world: "World year", lang: "Language", money: "Money"
};

function describe(e: EventRow): string {
  const d = e.data || {};
  switch (e.kind) {
    case "natal":
    case "partner":
      return [s(d.name), `${s(d.input)}${d.cal === "j" ? " (Solar Hijri)" : ""}`, d.notime ? "time unknown" : s(d.time), s(d.city), d.sex && d.sex !== "x" ? s(d.sex) : "", d.utc ? `UTC ${s(d.utc).slice(0, 16)}` : ""].filter(Boolean).join(" · ");
    case "horary":
      return `${s(d.q)}\n→ ${s(d.verdict)}`;
    case "chat":
    case "ask":
      return `${d.tab ? `[${s(d.tab)}] ` : ""}${s(d.q)}\n→ ${s(d.a)}`;
    case "trade":
      return [s(d.action), s(d.asset), s(d.city), s(d.verdict)].filter(Boolean).join(" · ");
    case "view":
      return s(d.view);
    default:
      return Object.entries(d).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : s(v)}`).join(" · ");
  }
}

export default async function AstrologyVisitors() {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user) redirect("/auth?next=/admin/astrology");
  const {data, error} = await sb.rpc("admin_astro_events", {p_limit: 5000});

  if (error) {
    return (
      <div className="course-shell">
        <div className="container gm-dash" style={{paddingTop: 80, paddingBottom: 80}}>
          <h1>Admins only</h1>
          <p>This page is only for Grow Me admins. You are signed in as {user.email}.</p>
          <Link href="/" className="button">Back to home</Link>
        </div>
      </div>
    );
  }

  const events = (data || []) as EventRow[];
  const byVisitor = new Map<string, EventRow[]>();
  for (const e of events) {
    const list = byVisitor.get(e.visitor) || [];
    list.push(e);
    byVisitor.set(e.visitor, list);
  }
  const visitors = [...byVisitor.entries()].map(([id, list]) => {
    const sorted = [...list].sort((a, b) => a.created_at.localeCompare(b.created_at));
    const natal = [...sorted].reverse().find((e) => e.kind === "natal");
    const partner = [...sorted].reverse().find((e) => e.kind === "partner");
    const langs = [...new Set(sorted.map((e) => e.lang).filter(Boolean))];
    return {id, list: sorted, first: sorted[0].created_at, last: sorted[sorted.length - 1].created_at, natal, partner, langs};
  }).sort((a, b) => b.last.localeCompare(a.last));

  const now = Date.now();
  const thisWeek = visitors.filter((v) => now - new Date(v.first).getTime() < 7 * 864e5).length;
  const questions = events.filter((e) => e.kind === "horary" || e.kind === "chat" || e.kind === "ask").length;
  const charts = visitors.filter((v) => v.natal).length;
  const langCount = new Map<string, number>();
  visitors.forEach((v) => v.langs.forEach((l) => langCount.set(l as string, (langCount.get(l as string) || 0) + 1)));
  const sectionCount = new Map<string, number>();
  events.filter((e) => e.kind === "view").forEach((e) => { const k = s(e.data?.view); sectionCount.set(k, (sectionCount.get(k) || 0) + 1); });

  return (
    <div className="course-shell">
      <section className="dashboard-hero gm-dash-hero">
        <div className="container gm-dash-hero-inner">
          <div>
            <span className="eyebrow">GROW ME · ADMIN · AKHTARNAMEH</span>
            <h1>Astrology visitors.</h1>
            <p>People who agreed to have their entries saved in the astrology app: their birth data, questions and chats. <Link href="/admin/emails">Back to members</Link></p>
          </div>
        </div>
      </section>

      <div className="container gm-dash">
        <div className="gm-dash-stats">
          <div><Users size={22}/><b>{visitors.length}</b><span>Visitors who consented</span></div>
          <div><Sparkles size={22}/><b>{charts}</b><span>Birth charts entered</span></div>
          <div><MessageCircle size={22}/><b>{questions}</b><span>Questions and chats</span></div>
          <div><CalendarDays size={22}/><b>{thisWeek}</b><span>New this week</span></div>
        </div>

        <p className="gm-ppl-muted">
          Languages: {[...langCount.entries()].sort((a, b) => b[1] - a[1]).map(([l, n]) => `${l} ${n}`).join(" · ") || "—"}
          {sectionCount.size > 0 && <> · Sections opened: {[...sectionCount.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(" · ")}</>}
        </p>
        <p className="gm-ppl-muted">Showing the latest {events.length} entries. Visitors who chose “Don’t save” are not recorded. Delete a visitor’s data if they ask you to.</p>

        {visitors.length === 0 && <p className="gm-email-empty">No one has agreed to saving yet. Share the app link: /astrology/</p>}
        <div className="gm-ppl-list">
          {visitors.map((v) => (
            <article className="gm-ppl-card" key={v.id}>
              <div className="gm-ppl-top">
                <div className="gm-ppl-who">
                  <strong>{s(v.natal?.data?.name) || `Visitor ${v.id.slice(0, 8)}`}</strong>
                  {v.natal && <span>Born: {describe(v.natal)}</span>}
                  {v.partner && <span>Other person: {describe(v.partner)}</span>}
                  <span className="gm-ppl-muted">First seen {fmt(v.first)} · Last seen {fmt(v.last)} · {v.list.length} entries · {v.langs.join(", ")}</span>
                </div>
                <DeleteVisitor visitor={v.id}/>
              </div>
              <details className="gm-ppl-course">
                <summary><span className="gm-ppl-course-label">Everything they entered</span><b>{v.list.length}</b></summary>
                <ol className="gm-ppl-lessons">
                  {[...v.list].reverse().map((e) => (
                    <li key={e.id} style={{display: "block"}}>
                      <small className="gm-ppl-muted">{fmt(e.created_at)} · {KIND[e.kind] || e.kind}{e.lang ? ` · ${e.lang}` : ""}</small>
                      <div style={{whiteSpace: "pre-wrap", overflowWrap: "anywhere"}}>{describe(e)}</div>
                    </li>
                  ))}
                </ol>
              </details>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
