"use client";
import {useState, useTransition} from "react";
import {deleteAstroVisitor} from "./actions";

export function DeleteVisitor({visitor}: {visitor: string}) {
  const [armed, setArmed] = useState(false);
  const [msg, setMsg] = useState("");
  const [pending, start] = useTransition();
  const run = () => {
    if (!armed) { setArmed(true); return; }
    start(async () => {
      const r = await deleteAstroVisitor(visitor);
      setMsg(r.ok ? "Deleted" : r.error || "Something went wrong");
      setArmed(false);
    });
  };
  return (
    <div className="gm-ppl-access">
      <button type="button" className={`gm-dash-toggle${armed ? " gm-ppl-remove" : ""}`} disabled={pending} onClick={run}>
        {armed ? "Tap again to delete" : "Delete their data"}
      </button>
      {(pending || msg) && <small className="gm-ppl-msg">{pending ? "Deleting…" : msg}</small>}
    </div>
  );
}
