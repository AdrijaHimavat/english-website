import Link from "next/link";
import {redirect} from "next/navigation";
import {BookOpen, CalendarDays, Mail, Sparkles} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {releasedLessons} from "@/lib/released-lessons";
import {EmailTools, type EmailRow} from "./email-tools";
import {StudioAccess} from "./studio-access";
import "../../courses/courses.css";

export const metadata = {title: "Members | Grow Me admin", robots: {index: false}};
export const dynamic = "force-dynamic";

type Person = {
  user_id: string | null; email: string; name: string | null; whatsapp: string | null; has_account: boolean; newsletter: boolean;
  joined_at: string; last_sign_in_at: string | null; done_lessons: string[]; watch: Record<string, number>; last_lesson_at: string | null;
  studio_expires_at: string | null; studio_plan: string | null; studio_started: boolean;
};

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}) : "—");

export default async function AdminMembers() {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user) redirect("/auth?next=/admin/emails");
  const {data, error} = await sb.rpc("admin_people");

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
    return {...p, lessons, doneCount, coursePct: Math.round((doneCount / total) * 100), started: lessons.some((l) => l.pct > 0), studioActive};
  });
  const now = Date.now();
  const newThisWeek = people.filter((p) => now - new Date(p.joined_at).getTime() < 7 * 864e5).length;
  const learners = people.filter((p) => p.started).length;
  const studioMembers = people.filter((p) => p.studioActive).length;
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
          <div><Sparkles size={22}/><b>{studioMembers}</b><span>Studio members</span></div>
          <div><CalendarDays size={22}/><b>{newThisWeek}</b><span>New this week</span></div>
        </div>

        <div className="gm-ppl-howto">
          <b>How to give someone the Studio app:</b> after they pay, ask them to create a free account on growme.blog (or the app) with their email.
          Find them below and tap <b>Give 30 days</b>. That’s it — next time they open the app they’re in. No codes needed.
        </div>

        <EmailTools rows={csvRows}/>

        {people.length === 0 && <p className="gm-email-empty">No one yet. Share your site link to start growing the list.</p>}
        <div className="gm-ppl-list">
          {people.map((p) => (
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
