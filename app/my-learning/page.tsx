import Link from "next/link";
import {redirect} from "next/navigation";
import {ArrowRight, BookOpen, CheckCircle2, Clock3, PlayCircle, RotateCcw, Sparkles, Trophy} from "lucide-react";
import {serverSupabase} from "@/lib/supabase-server";
import {signOut} from "@/app/auth/actions";
import {setLessonComplete} from "./actions";
import {releasedLessons} from "@/lib/released-lessons";
import "../courses/courses.css";

export const metadata = {title: "My Learning | Grow Me", robots: {index: false}};
const COURSE = "instagram-growth";

export default async function MyLearning({searchParams}: {searchParams: Promise<{error?: string}>}) {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user) redirect("/auth");
  const [{data: rows}, {data: watchRows}] = await Promise.all([
    sb.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("course_slug", COURSE),
    sb.from("lesson_watch").select("lesson_id,percent").eq("user_id", user.id).eq("course_slug", COURSE),
  ]);
  const completed = new Set((rows || []).map((r) => r.lesson_id));
  const watched = new Map((watchRows || []).map((r) => [r.lesson_id, r.percent as number]));
  const lessons = releasedLessons.map((l, i) => {
    const done = completed.has(l.slug);
    const pct = done ? 100 : watched.get(l.slug) ?? 0;
    return {...l, n: i + 1, done, pct, status: done ? "done" : pct > 0 ? "progress" : "new"} as const;
  });
  const total = lessons.length;
  const doneCount = lessons.filter((l) => l.done).length;
  const inProgress = lessons.filter((l) => l.status === "progress").length;
  const percent = Math.round((doneCount / total) * 100);
  const nextUp = lessons.find((l) => l.status === "progress") || lessons.find((l) => !l.done);
  const modules = [...new Set(lessons.map((l) => l.module))];
  const name = (user.user_metadata?.name as string | undefined) || user.email?.split("@")[0];
  const q = await searchParams;

  return (
    <div className="course-shell">
      <section className="dashboard-hero gm-dash-hero">
        <div className="container gm-dash-hero-inner">
          <div>
            <span className="eyebrow">GROW ME · PERSONAL DASHBOARD</span>
            <h1>Your learning journey.</h1>
            <p>Welcome back, {name} 👋</p>
          </div>
          <div className="gm-dash-ring" style={{["--p" as string]: percent}} aria-label={`${percent}% of the course completed`}>
            <div><b>{percent}%</b><span>completed</span></div>
          </div>
        </div>
      </section>

      <div className="container gm-dash">
        {q.error && <p role="alert" className="gm-dash-alert">We couldn&apos;t save your progress. Please try again.</p>}

        <div className="gm-dash-stats">
          <div><CheckCircle2 size={22}/><b>{doneCount}</b><span>Completed</span></div>
          <div><Clock3 size={22}/><b>{inProgress}</b><span>In progress</span></div>
          <div><BookOpen size={22}/><b>{total - doneCount}</b><span>Remaining</span></div>
          <div><Trophy size={22}/><b>{percent}%</b><span>Course progress</span></div>
        </div>

        {nextUp ? (
          <Link href={`/courses/instagram-growth/${nextUp.slug}`} className="gm-dash-continue">
            <span className="gm-dash-continue-icon"><PlayCircle size={30}/></span>
            <div className="gm-dash-continue-body">
              <span className="eyebrow">{nextUp.status === "progress" ? "CONTINUE WHERE YOU LEFT OFF" : "UP NEXT"} · LESSON {nextUp.n}</span>
              <h2>{nextUp.title}</h2>
              <div className="gm-mini-bar"><i style={{width: `${nextUp.pct}%`}}/></div>
              <small>{nextUp.pct}% watched</small>
            </div>
            <span className="gm-dash-continue-cta">{nextUp.status === "progress" ? "Continue" : "Start"} <ArrowRight size={18}/></span>
          </Link>
        ) : (
          <div className="gm-dash-continue gm-dash-finished">
            <span className="gm-dash-continue-icon"><Sparkles size={30}/></span>
            <div className="gm-dash-continue-body"><span className="eyebrow">COURSE COMPLETE</span><h2>You finished every lesson. Amazing work! 🎉</h2></div>
          </div>
        )}

        <p className="gm-dash-note">Lessons with a YouTube video are marked complete automatically when you finish watching. For other lessons, tap “Mark complete”.</p>

        <div className="gm-dash-head"><h2>Your lessons</h2><Link href="/courses" className="text-button">Full curriculum <ArrowRight size={16}/></Link></div>
        {modules.map((m) => (
          <section key={m} className="gm-dash-module">
            <h3>Module {String(m).padStart(2, "0")}</h3>
            <div className="gm-dash-list">
              {lessons.filter((l) => l.module === m).map((l) => (
                <div key={l.slug} className={`gm-dash-lesson is-${l.status}`}>
                  <span className="gm-dash-state">
                    {l.done ? <CheckCircle2 size={24}/> : <span className="gm-dash-mini-ring" style={{["--p" as string]: l.pct}}/>}
                  </span>
                  <div className="gm-dash-lesson-body">
                    <div className="gm-dash-lesson-top">
                      <h4>{l.n}. {l.title}</h4>
                      <span className="gm-chip">{l.done ? "Completed" : l.status === "progress" ? `In progress · ${l.pct}%` : "Not started"}</span>
                    </div>
                    <div className="gm-mini-bar"><i style={{width: `${l.pct}%`}}/></div>
                  </div>
                  <div className="gm-dash-actions">
                    <Link href={`/courses/instagram-growth/${l.slug}`} className="button button-small">
                      {l.done ? <><RotateCcw size={14}/> Rewatch</> : l.status === "progress" ? "Continue" : "Watch"}
                    </Link>
                    <form action={setLessonComplete}>
                      <input type="hidden" name="lessonId" value={l.slug}/>
                      <button type="submit" name="complete" value={l.done ? "false" : "true"} className="gm-dash-toggle">
                        {l.done ? "Undo" : "Mark complete"}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="gm-dash-foot">
          <Link href="/courses" className="button"><BookOpen size={17}/> Full course curriculum</Link>
          <form action={signOut}><button type="submit" className="gm-dash-toggle">Sign out</button></form>
        </div>
      </div>
    </div>
  );
}
