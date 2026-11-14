import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Check, Flame, Smartphone, Sparkles } from "lucide-react";

const STUDIO_URL = "https://growme-studio.vercel.app";

const features = [
  { icon: CalendarCheck, title: "Your daily plan", text: "What to post, when to post it, and which stories to share — built for your page and niche." },
  { icon: Flame, title: "Algorithm tasks", text: "Small daily engagement habits that tell Instagram you’re an active, real account." },
  { icon: Sparkles, title: "Scriptwriter & ideas", text: "Hooks, Reel scripts, captions, carousels and viral formats whenever you’re stuck." },
  { icon: Smartphone, title: "Tick it off on your phone", text: "Check off each task, keep your streak, and watch your progress grow." },
];

const days = [
  { d: 1, s: "past", post: true }, { d: 2, s: "past", post: true }, { d: 3, s: "past", post: false },
  { d: 4, s: "past", post: true }, { d: 5, s: "today", post: true }, { d: 6, s: "next", post: false },
  { d: 7, s: "next", post: true },
];

export function PlannerPromo() {
  return (
    <section className="gm-planner" aria-labelledby="planner-heading">
      <div className="gm-planner-copy">
        <span className="gm-planner-badge">NEW · FOR MEMBERS</span>
        <h2 id="planner-heading">
          Grow Me Studio<span className="heading-dot">.</span>
          <br />
          <em>Your personal Instagram planner.</em>
        </h2>
        <p>
          Tell us about your page and get a clear plan for every day — your posts, stories and growth tasks.
          Your plan is refreshed with new ideas every 2 weeks, so you never run out of what to post.
        </p>
        <ul className="gm-planner-features">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <span className="gm-planner-icon"><Icon size={20} /></span>
              <div><strong>{title}</strong><span>{text}</span></div>
            </li>
          ))}
        </ul>
        <div className="gm-planner-buttons">
          <a href={STUDIO_URL} className="button gm-planner-cta" target="_blank" rel="noopener">
            OPEN THE PLANNER <ArrowUpRight size={20} />
          </a>
          <Link href="/contact" className="text-button">Ask about membership <ArrowUpRight size={16} /></Link>
        </div>
        <div className="gm-planner-note"><Check size={14} /> Sign in with your growme.blog account · Works on any phone</div>
      </div>

      <div className="gm-planner-visual" aria-hidden="true">
        <div className="gm-phone">
          <div className="gm-phone-notch" />
          <div className="gm-phone-head"><span>My plan</span><small>Plan ID · GM-1</small></div>
          <div className="gm-phone-week">
            {["M", "T", "W", "T", "F", "S", "S"].map((w, i) => <span key={i} className="gm-wd">{w}</span>)}
            {days.map((x) => (
              <span key={x.d} className={`gm-pill gm-${x.s} ${x.post ? "gm-has-post" : ""}`}>
                <small>{x.s === "today" ? "Today" : "Day"}</small>
                <b>{x.s === "today" ? "" : x.d}</b>
              </span>
            ))}
          </div>
          <div className="gm-phone-progress"><span className="gm-ring" /> Halfway there — keep going! 💪</div>
          <div className="gm-phone-card gm-done"><b>Post plan</b><span>Reel · 18:00–19:00</span><i>✓</i></div>
          <div className="gm-phone-card"><b>Story plan</b><span>Start 19:00 → End 23:00</span><i /></div>
          <div className="gm-phone-card"><b>Algorithm plan</b><span>4 activities left to do</span><i /></div>
        </div>
        <div className="gm-float gm-float-a">🔥 5-day streak</div>
        <div className="gm-float gm-float-b">✨ “Write today’s Reel script”</div>
      </div>
    </section>
  );
}
