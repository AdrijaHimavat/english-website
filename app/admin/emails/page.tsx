import Link from "next/link";
import {redirect} from "next/navigation";
import {CalendarDays, Mail, Newspaper, UserRound} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {EmailTools, type EmailRow} from "./email-tools";
import "../../courses/courses.css";

export const metadata = {title: "Email list | Grow Me admin", robots: {index: false}};
export const dynamic = "force-dynamic";

const fmt = (d: string | null) => (d ? new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}) : "—");

export default async function AdminEmails() {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user) redirect("/auth?next=/admin/emails");
  const {data, error} = await sb.rpc("admin_email_list");

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

  const rows = (data || []) as EmailRow[];
  const now = Date.now();
  const since = (days: number) => rows.filter((r) => now - new Date(r.joined_at).getTime() < days * 864e5).length;

  return (
    <div className="course-shell">
      <section className="dashboard-hero gm-dash-hero">
        <div className="container gm-dash-hero-inner">
          <div>
            <span className="eyebrow">GROW ME · ADMIN</span>
            <h1>Your email list.</h1>
            <p>Everyone who created an account or joined the newsletter.</p>
          </div>
        </div>
      </section>

      <div className="container gm-dash">
        <div className="gm-dash-stats">
          <div><Mail size={22}/><b>{rows.length}</b><span>Total emails</span></div>
          <div><UserRound size={22}/><b>{rows.filter((r) => r.has_account).length}</b><span>Accounts</span></div>
          <div><Newspaper size={22}/><b>{rows.filter((r) => r.newsletter).length}</b><span>Newsletter</span></div>
          <div><CalendarDays size={22}/><b>{since(7)}</b><span>New this week · {since(1)} today</span></div>
        </div>

        <EmailTools rows={rows}/>

        <div className="gm-email-table" role="table" aria-label="Email list">
          <div className="gm-email-row gm-email-head" role="row">
            <span role="columnheader">Email</span><span role="columnheader">Name · WhatsApp</span><span role="columnheader">Source</span><span role="columnheader">Joined</span><span role="columnheader">Last sign-in</span>
          </div>
          {rows.length === 0 && <p className="gm-email-empty">No emails yet. Share your site link to start growing the list.</p>}
          {rows.map((r) => (
            <div className="gm-email-row" role="row" key={r.email}>
              <span role="cell" className="gm-email-addr"><a href={`mailto:${r.email}`}>{r.email}</a></span>
              <span role="cell">{r.name || "—"}{r.whatsapp && <small className="gm-email-wa"><a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{r.whatsapp}</a></small>}</span>
              <span role="cell" className="gm-email-tags">
                {r.has_account && <i className="gm-chip">Account</i>}
                {r.newsletter && <i className="gm-chip gm-chip-nl">Newsletter</i>}
              </span>
              <span role="cell" data-label="Joined">{fmt(r.joined_at)}</span>
              <span role="cell" data-label="Last sign-in">{fmt(r.last_sign_in_at)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
