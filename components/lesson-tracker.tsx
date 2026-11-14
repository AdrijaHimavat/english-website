"use client";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {ArrowLeft, ArrowRight, CheckCircle2, Circle, LayoutDashboard} from "lucide-react";
import {releasedLessons} from "@/lib/released-lessons";
import {getLessonState, saveWatchProgress, setLessonCompleted, type LessonState} from "@/app/my-learning/progress-actions";

type YTPlayer = {getCurrentTime(): number; getDuration(): number; getPlayerState(): number};
declare global {
  interface Window {
    YT?: {Player: new (el: HTMLIFrameElement, opts: {events: Record<string, (e: {data: number}) => void>}) => YTPlayer; PlayerState: {ENDED: number; PLAYING: number}};
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; s.async = true; document.head.append(s);
    }
  });
}

export function LessonTracker({slug}: {slug: string}) {
  const index = releasedLessons.findIndex((l) => l.slug === slug);
  const lesson = releasedLessons[index];
  const prev = index > 0 ? releasedLessons[index - 1] : null;
  const next = index < releasedLessons.length - 1 ? releasedLessons[index + 1] : null;
  const [state, setState] = useState<LessonState | null>(null);
  const [percent, setPercent] = useState(0);
  const [tracking, setTracking] = useState<"youtube" | "manual" | null>(null);
  const [busy, setBusy] = useState(false);
  const saved = useRef(0);

  useEffect(() => { getLessonState(slug).then((s) => { setState(s); setPercent(s.percent); saved.current = s.percent; }); }, [slug]);

  // Track YouTube playback: remember the furthest point watched, auto-complete at 90%.
  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>('iframe[src*="youtube"]');
    if (!frame) { setTracking("manual"); return; }
    setTracking("youtube");
    if (!frame.src.includes("enablejsapi=1")) frame.src += (frame.src.includes("?") ? "&" : "?") + "enablejsapi=1";
    // The embedded player reports playback through postMessage ("infoDelivery"); we read time and duration from those.
    let current = 0, duration = 0, furthest = 0, sending = false;
    const record = async (ended = false) => {
      if (!duration && !ended) return;
      const p = ended ? 100 : Math.min(100, (current / duration) * 100);
      if (p <= furthest) return;
      furthest = p; setPercent((x) => Math.max(x, Math.round(p)));
      if (!sending && (p - saved.current >= 10 || p >= 90)) {
        sending = true; saved.current = p;
        const r = await saveWatchProgress(slug, p).catch(() => ({completed: false}));
        sending = false;
        if (r.completed) setState((s) => (s && !s.completed ? {...s, completed: true, doneCount: s.doneCount + 1} : s));
      }
    };
    const onMessage = (ev: MessageEvent) => {
      if (ev.source !== frame.contentWindow || typeof ev.data !== "string") return;
      try {
        const msg = JSON.parse(ev.data);
        const info = msg.info || {};
        if (typeof info.duration === "number" && info.duration > 0) duration = info.duration;
        if (typeof info.currentTime === "number") { current = info.currentTime; record(); }
        if (info.playerState === 0) record(true); // 0 = ended
      } catch { /* not a player message */ }
    };
    window.addEventListener("message", onMessage);
    // Ask the player to start sending updates (same handshake the official API uses).
    let player: YTPlayer | null = null;
    loadYouTubeApi().then(() => { player = new window.YT!.Player(frame, {events: {}}); void player; });
    const hello = setInterval(() => frame.contentWindow?.postMessage(JSON.stringify({event: "listening", id: frame.id || "gm-lesson", channel: "widget"}), "*"), 2000);
    return () => { window.removeEventListener("message", onMessage); clearInterval(hello); };
  }, [slug]);

  async function toggle() {
    if (!state) return;
    setBusy(true);
    const complete = !state.completed;
    const r = await setLessonCompleted(slug, complete);
    if (r.ok) setState({...state, completed: complete, doneCount: state.doneCount + (complete ? 1 : -1)});
    setBusy(false);
  }

  const coursePct = state ? Math.round((state.doneCount / state.total) * 100) : 0;
  const shown = state?.completed ? 100 : percent;

  return (
    <div className="gm-lesson-tracker">
      <div className="gm-lt-status">
        <div className="gm-lt-left">
          {state?.completed ? <CheckCircle2 className="gm-lt-done-icon" size={26}/> : <Circle size={26} className="gm-lt-todo-icon"/>}
          <div>
            <strong>{state?.completed ? "Lesson completed" : `Lesson ${index + 1} of ${releasedLessons.length}`}</strong>
            <span>
              {!state ? "Loading your progress…"
                : !state.signedIn ? "Sign in to save your progress automatically."
                : tracking === "youtube" ? (state.completed ? "Nice work — this lesson is done." : "Completes automatically when you finish the video.")
                : "Mark it complete when you’ve watched it."}
            </span>
          </div>
        </div>
        {state?.signedIn ? (
          <button type="button" className={`gm-lt-btn ${state.completed ? "is-done" : ""}`} onClick={toggle} disabled={busy}>
            {state.completed ? "Completed ✓" : "Mark as complete"}
          </button>
        ) : state ? (
          <Link href={`/auth?next=/courses/instagram-growth/${slug}`} className="gm-lt-btn">Sign in</Link>
        ) : null}
      </div>
      <div className="gm-lt-bar" role="progressbar" aria-valuenow={shown} aria-valuemin={0} aria-valuemax={100} aria-label="Lesson progress"><i style={{width: `${shown}%`}}/></div>
      <div className="gm-lt-meta"><span>This lesson: {shown}%</span>{state?.signedIn && <span>Course: {state.doneCount}/{state.total} lessons · {coursePct}%</span>}</div>

      <nav className="gm-lt-nav" aria-label="Lesson navigation">
        {prev ? (
          <Link href={`/courses/instagram-growth/${prev.slug}`} className="gm-lt-card">
            <ArrowLeft size={20}/><span><small>Previous lesson</small><b>{prev.title}</b></span>
          </Link>
        ) : <span/>}
        {next ? (
          <Link href={`/courses/instagram-growth/${next.slug}`} className="gm-lt-card gm-lt-next">
            <span><small>Next lesson</small><b>{next.title}</b></span><ArrowRight size={20}/>
          </Link>
        ) : (
          <Link href="/my-learning" className="gm-lt-card gm-lt-next"><span><small>You reached the last lesson</small><b>Back to my dashboard</b></span><LayoutDashboard size={20}/></Link>
        )}
      </nav>
      {lesson && <p className="gm-lt-module">Module {String(lesson.module).padStart(2, "0")} · <Link href="/my-learning">Open my dashboard</Link></p>}
    </div>
  );
}
