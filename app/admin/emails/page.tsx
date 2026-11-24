import Link from "next/link";
import {redirect} from "next/navigation";
import {BookOpen, CalendarDays, Mail, Sparkles} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {releasedLessons} from "@/lib/released-lessons";
import {EmailTools, type EmailRow} from "./email-tools";
import {StudioAccess} from "./studio-access";
import {StudioActivity, summarize, STATUS_LABEL, type ActivityRow} from "./studio-activity";
import "../../courses/courses.css";

export const metadata = {title: "Members | Grow Me admin", robots: {index: false}};
export const dynamic = "force-dynamic";

type Person = {
  user_id: string | null; email: string; name: string | null; whatsapp: string | null; has_account: boolean; newsletter: boolean;
  joined_at: string; last_sign_in_at: string | null; done_lessons: string[]; watch: Record<string, number>; last_lesson_at: string | null;
  studio_expires_at: string | null; studio_plan: string | null; studio_started: boolean;
};

type GumroadSaleRow = {
  sale_id: string; email: string; user_email: string | null; recurrence: string | null; price_cents: number | null;
  is_recurring: boolean; applied_at: string | null; refunded_at: string | null; created_at: string;
};

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}) : "—");

export default async function AdminMembers({searchParams}: {searchParams: Promise<{view?: string}>}) {
  const view = (await searchParams).view === "studio" ? "studio" : "all";
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user) redirect("/auth?next=/admin/emails");
  const [{data, error}, {data: actData}, {data: salesData}] = await Promise.all([sb.rpc("admin_people"), sb.rpc("admin_studio_activity"), sb.rpc("admin_gumroad_sales")]);
  const sales = (salesData || []) as GumroadSaleRow[];
  const paidSales = sales.filter((x) => !x.refunded_at && (x.price_cents ?? 0) > 0);
  const unlinked = sales.filter((x) => !x.applied_at && !x.refunded_at);
  const activity = new Map(((actData || []) as ActivityRow[]).map((a) => [a.user_id, {a, s: summarize(a)}]));

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

  const total = releasedLessons.length;
  const people = ((data || []) as Person[]).map((p) => {
    const done = new Set(p.done_lessons || []);
    const lessons = releasedLessons.map((l, i) => {
      const isDone = done.has(l.slug);
      return {n: i + 1, title: l.title, done: isDone, pct: isDone ? 100 : p.watch?.[l.slug] ?? 0};
    });
    const doneCount = lessons.filter((l) => l.done).length;
    const studioActive = !!p.studio_expires_at && new Date(p.studio_expires_at).getTime() > Date.now();
    return {...p, lessons, doneCount, coursePct: Math.round((doneCount / total) * 100), started: lessons.some((l) => l.pct > 0), studioActive, act: p.user_id ? activity.get(p.user_id) : undefined};
  });
  const now = Date.now();
  const newThisWeek = people.filter((p) => now - new Date(p.joined_at).getTime() < 7 * 864e5).length;
  const learners = people.filter((p) => p.started).length;
  const studioMembers = people.filter((p) => p.studioActive).length;
  const needNudge = people.filter((p) => p.act && (p.act.s.status === "inactive" || p.act.s.status === "nudge")).length;
  const order = {inactive: 0, nudge: 1, "not-started": 2, "on-track": 3} as const;
  const shown = view === "studio"
    ? people.filter((p) => p.act).sort((x, y) => order[x.act!.s.status] - order[y.act!.s.status])
    : people;
  const csvRows: EmailRow[] = people.map((p) => ({email: p.email, name: p.name, whatsapp: p.whatsapp, has_account: p.has_account, newsletter: p.newsletter, joined_at: p.joined_at, last_sign_in_at: p.last_sign_in_at, lessons_done: `${p.doneCount}/${total}`, studio_until: p.studioActive ? p.studio_expires_at : null}));

  return (
    <div className="course-shell">
      <section className="dashboard-hero gm-dash-hero">
        <div className="container gm-dash-hero-inner">
          <div>
            <span className="eyebrow">GROW ME · ADMIN</span>
            <h1>Your members.</h1>
            <p>Everyone who signed up, how far they are in the course, and their Studio access.</p>
          </div>
        </div>
      </section>

      <div className="container gm-dash">
        <div className="gm-dash-stats">
          <div><Mail size={22}/><b>{people.length}</b><span>People</span></div>
          <div><BookOpen size={22}/><b>{learners}</b><span>Started the course</span></div>
          <div><Sparkles size={22}/><b>{studioMembers}</b><span>Studio members{needNudge ? ` · ${needNudge} need a nudge` : ""}</span></div>
          <div><CalendarDays size={22}/><b>{newThisWeek}</b><span>New this week</span></div>
        </div>

        <div className="gm-ppl-howto">
          <b>Gumroad payments switch Studio on automatically.</b> When someone pays on growme.blog/pricing, their account gets Studio straight away
          (or as soon as they confirm an account with the email they paid with). For anyone else — a friend, a manual payment — find them below and tap <b>Give 30 days</b>.
        </div>

        <div className="gm-ppl-howto">
          <b>Gumroad:</b> {paidSales.length} paid charge{paidSales.length === 1 ? "" : "s"} · ${(paidSales.reduce((t, x) => t + (x.price_cents ?? 0), 0) / 100).toFixed(2)} before Gumroad fees
          {unlinked.length > 0 ? (
            <>
              {" "}· <b>{unlinked.length} waiting for an account</b> (paid, but no confirmed Grow Me account with that email yet — ask them to sign up with it):
              <ul style={{margin: "8px 0 0 18px"}}>
                {unlinked.slice(0, 20).map((x) => <li key={x.sale_id}><a href={`mailto:${x.email}`}>{x.email}</a> · {fmt(x.created_at)}</li>)}
              </ul>
            </>
          ) : null}
        </div>

        <EmailTools rows={csvRows}/>

        <div className="gm-ppl-tabs" role="tablist">
          <Link href="/admin/emails" className={view === "all" ? "on" : ""} role="tab" aria-selected={view === "all"}>Everyone ({people.length})</Link>
          <Link href="/admin/emails?view=studio" className={view === "studio" ? "on" : ""} role="tab" aria-selected={view === "studio"}>Studio check-ins ({activity.size}){needNudge ? ` · ${needNudge} ⚠️` : ""}</Link>
        </div>
        {view === "studio" && <p className="gm-ppl-muted" style={{margin: "0 0 12px"}}>Members who need attention are shown first: {STATUS_LABEL.inactive} (no check-in for 2+ days) → {STATUS_LABEL.nudge} (under 70% of tasks) → {STATUS_LABEL["on-track"]}.</p>}

        {shown.length === 0 && <p className="gm-email-empty">No one yet. Share your site link to start growing the list.</p>}
        <div className="gm-ppl-list">
          {shown.map((p) => (
            <article className="gm-ppl-card" key={p.email}>
              <div className="gm-ppl-top">
                <div className="gm-ppl-who">
                  <strong>{p.name || p.email.split("@")[0]}</strong>
                  <a href={`mailto:${p.email}`}>{p.email}</a>
                  {p.whatsapp && <a className="gm-email-wa" href={`https://wa.me/${p.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">WhatsApp {p.whatsapp}</a>}
                  <span className="gm-ppl-muted">Joined {fmt(p.joined_at)} · Last sign-in {fmt(p.last_sign_in_at)}</span>
                  <span className="gm-email-tags">
                    {p.has_account && <i className="gm-chip">Account</i>}
                    {p.newsletter && <i className="gm-chip gm-chip-nl">Newsletter</i>}
                    {p.studio_started && <i className="gm-chip">Opened Studio</i>}
                  </span>
                </div>
                <StudioAccess userId={p.user_id} expiresAt={p.studio_expires_at}/>
              </div>

              {p.act && <StudioActivity a={p.act.a} s={p.act.s} name={p.name || p.email.split("@")[0]} whatsapp={p.whatsapp}/>}

              {p.has_account && (
                <details className="gm-ppl-course">
                  <summary>
                    <span className="gm-ppl-course-label">Course progress</span>
                    <span className="gm-mini-bar"><i style={{width: `${p.coursePct}%`}}/></span>
                    <b>{p.doneCount}/{total} lessons · {p.coursePct}%</b>
                    <span className="gm-ppl-muted">{p.last_lesson_at ? `last active ${fmt(p.last_lesson_at)}` : "not started"}</span>
                  </summary>
                  <ol className="gm-ppl-lessons">
                    {p.lessons.map((l) => (
                      <li key={l.n} className={l.done ? "is-done" : l.pct > 0 ? "is-progress" : ""}>
                        <span>{l.n}. {l.title}</span>
                        <span className="gm-mini-bar"><i style={{width: `${l.pct}%`}}/></span>
                        <small>{l.done ? "Completed" : l.pct > 0 ? `${l.pct}% watched` : "—"}</small>
                      </li>
                    ))}
                  </ol>
                </details>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
