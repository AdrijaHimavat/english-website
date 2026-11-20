// Studio check-in tracking for the admin members page (server component, no client JS).

export type ActivityRow = {
  user_id: string; handle: string | null; niche: string | null; started_at: string; cycle: number;
  strategy: {weeks?: number[]; followers?: string; audience?: string; region?: string} | null;
  days: {day: number; post: boolean; window: string | null; format: string | null; tasks: {id: string; kind: "post" | "story" | "algo"}[]}[];
  progress: Record<string, string>; past_cycles: number; updated_at: string;
};

export type ActivitySummary = {
  today: number; pct: number; postsDone: number; postsDue: number; streak: number; lastCheckIn: string | null;
  status: "on-track" | "nudge" | "inactive" | "not-started";
  days: {day: number; date: Date; state: "future" | "today" | "past"; post: "done" | "missed" | "none" | "pending"; story: boolean | null; algoDone: number; algoAll: number; pct: number; format: string | null; window: string | null}[];
};

const DAY = 864e5;
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function summarize(a: ActivityRow): ActivitySummary {
  const start = startOfDay(new Date(a.started_at));
  const today = Math.min(14, Math.max(1, Math.floor((startOfDay(new Date()).getTime() - start.getTime()) / DAY) + 1));
  const done = (id: string) => !!a.progress?.[id];
  let dueTasks = 0, doneTasks = 0, postsDue = 0, postsDone = 0;
  const days = a.days.map((d) => {
    const state = d.day < today ? "past" : d.day === today ? "today" : "future";
    const post = d.tasks.find((t) => t.kind === "post");
    const story = d.tasks.find((t) => t.kind === "story");
    const algo = d.tasks.filter((t) => t.kind === "algo");
    const n = d.tasks.filter((t) => done(t.id)).length;
    if (state !== "future") {
      dueTasks += state === "past" ? d.tasks.length : n; // today only counts what's already done
      doneTasks += n;
      if (post && (state === "past" || done(post.id))) { postsDue++; if (done(post.id)) postsDone++; }
    }
    return {
      day: d.day, date: new Date(start.getTime() + (d.day - 1) * DAY), state,
      post: !post ? "none" : done(post.id) ? "done" : state === "past" ? "missed" : "pending",
      story: story ? done(story.id) : null,
      algoDone: algo.filter((t) => done(t.id)).length, algoAll: algo.length,
      pct: d.tasks.length ? Math.round((n / d.tasks.length) * 100) : 0, format: d.format, window: d.window,
    } as ActivitySummary["days"][number];
  });
  const stamps = Object.values(a.progress || {}).filter(Boolean).sort();
  const lastCheckIn = stamps.at(-1) || null;
  let streak = 0;
  for (let i = today; i >= 1; i--) {
    const any = a.days[i - 1]?.tasks.some((t) => done(t.id));
    if (any) streak++; else if (i !== today) break;
  }
  const pct = dueTasks ? Math.round((doneTasks / dueTasks) * 100) : 0;
  const quiet = !lastCheckIn || Date.now() - new Date(lastCheckIn).getTime() > 2 * DAY;
  const status = !lastCheckIn ? (today <= 1 ? "not-started" : "inactive") : quiet ? "inactive" : pct >= 70 ? "on-track" : "nudge";
  return {today, pct, postsDone, postsDue, streak, lastCheckIn, status, days};
}

export const STATUS_LABEL: Record<ActivitySummary["status"], string> = {
  "on-track": "On track 🔥", nudge: "Needs a nudge", inactive: "Inactive", "not-started": "Just started",
};

const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", {weekday: "short", day: "numeric"});
const fmtWhen = (d: string) => new Date(d).toLocaleString("en-GB", {day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"});

export function StudioActivity({a, s, name, whatsapp}: {a: ActivityRow; s: ActivitySummary; name: string; whatsapp: string | null}) {
  const first = name.split(" ")[0];
  const nudge = s.status === "inactive"
    ? `Hi ${first}! 👋 It’s Grow Me. I noticed you haven’t checked in on your Studio plan for a few days — is everything okay? Anything I can help you with?`
    : `Hi ${first}! 👋 It’s Grow Me. You’re on day ${s.today} of your plan — ${s.postsDone} of ${s.postsDue} posts done so far. How is it going? Tell me if anything feels hard and I’ll help.`;
  return (
    <details className="gm-ppl-course gm-act">
      <summary>
        <span className="gm-ppl-course-label">Studio check-ins</span>
        <span className="gm-mini-bar"><i style={{width: `${s.pct}%`}}/></span>
        <b>Day {s.today}/14 · {s.pct}% done</b>
        <span className={`gm-chip gm-act-${s.status}`}>{STATUS_LABEL[s.status]}</span>
      </summary>
      <div className="gm-act-body">
        <div className="gm-act-facts">
          <span>📅 Cycle {a.cycle}{a.past_cycles ? ` · ${a.past_cycles} finished before` : ""}</span>
          <span>🎬 Posts {s.postsDone}/{s.postsDue}</span>
          <span>🔥 Streak {s.streak} day{s.streak === 1 ? "" : "s"}</span>
          <span>🕒 Last check-in {s.lastCheckIn ? fmtWhen(s.lastCheckIn) : "never"}</span>
          {a.strategy?.followers && <span>👥 {a.strategy.followers} · {a.strategy.audience} · {a.strategy.region}</span>}
          {a.handle && <span>📸 {a.handle}{a.niche ? ` · ${a.niche}` : ""}</span>}
        </div>
        <div className="gm-act-grid">
          {s.days.map((d) => (
            <div key={d.day} className={`gm-act-day is-${d.state}`} title={d.post === "none" ? "No post day" : `${d.format} · ${d.window}`}>
              <small>{fmtDay(d.date)}</small>
              <span className={`gm-act-post is-${d.post}`}>{d.post === "done" ? "✓" : d.post === "missed" ? "✗" : d.post === "none" ? "–" : "○"}</span>
              <i>{d.state === "future" ? "" : `${d.pct}%`}</i>
            </div>
          ))}
        </div>
        <p className="gm-act-legend">Post: <b className="is-done">✓ posted</b> <b className="is-missed">✗ missed</b> <b>○ coming</b> <b>– no post day</b> · % = tasks ticked that day</p>
        {whatsapp && (
          <a className="gm-act-wa" href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(nudge)}`} target="_blank" rel="noreferrer">
            💬 Send a check-in on WhatsApp
          </a>
        )}
      </div>
    </details>
  );
}
