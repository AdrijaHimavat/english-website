"use client";
import {useState, useTransition} from "react";
import {setStudioAccess} from "./actions";

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});

export function StudioAccess({userId, expiresAt}: {userId: string | null; expiresAt: string | null}) {
  const [until, setUntil] = useState(expiresAt);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();
  const active = !!until && new Date(until).getTime() > Date.now();

  if (!userId) return <span className="gm-ppl-muted">Newsletter only — no account yet</span>;

  const run = (days: number) => {
    if (days === 0 && !confirm("Remove Studio access for this member?")) return;
    setMsg("");
    start(async () => {
      const r = await setStudioAccess(userId, days);
      if (r.ok) { setUntil(r.expiresAt || null); setMsg(days ? "Access given ✓" : "Access removed"); }
      else setMsg(r.error || "Something went wrong");
    });
  };

  return (
    <div className="gm-ppl-access">
      <span className={`gm-chip ${active ? "gm-chip-on" : "gm-chip-off"}`}>
        {active ? `Studio active · until ${fmt(until!)}` : until ? "Studio expired" : "No Studio access"}
      </span>
      <div className="gm-ppl-btns">
        <button type="button" className="button button-small" disabled={pending} onClick={() => run(30)}>{active ? "+30 days" : "Give 30 days"}</button>
        <button type="button" className="gm-dash-toggle" disabled={pending} onClick={() => run(90)}>+90</button>
        <button type="button" className="gm-dash-toggle" disabled={pending} onClick={() => run(365)}>+1 year</button>
        {active && <button type="button" className="gm-dash-toggle gm-ppl-remove" disabled={pending} onClick={() => run(0)}>Remove</button>}
      </div>
      {(pending || msg) && <small className="gm-ppl-msg">{pending ? "Saving…" : msg}</small>}
    </div>
  );
}
