"use client";
import {useState} from "react";
import {Copy, Download} from "lucide-react";

export type EmailRow = {email: string; name: string | null; whatsapp: string | null; has_account: boolean; newsletter: boolean; joined_at: string; last_sign_in_at: string | null};

const cell = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

export function EmailTools({rows}: {rows: EmailRow[]}) {
  const [copied, setCopied] = useState(false);

  function download() {
    const lines = [["email", "name", "whatsapp", "account", "newsletter", "joined", "last_sign_in"].join(",")];
    for (const r of rows) {
      lines.push([r.email, r.name || "", r.whatsapp || "", r.has_account ? "yes" : "no", r.newsletter ? "yes" : "no", r.joined_at?.slice(0, 10) || "", r.last_sign_in_at?.slice(0, 10) || ""].map(cell).join(","));
    }
    const blob = new Blob(["﻿" + lines.join("\n")], {type: "text/csv;charset=utf-8"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `growme-emails-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function copyAll() {
    await navigator.clipboard.writeText(rows.map((r) => r.email).join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="gm-email-tools">
      <button type="button" className="button" onClick={download} disabled={!rows.length}><Download size={17}/> Download CSV (Excel)</button>
      <button type="button" className="gm-dash-toggle" onClick={copyAll} disabled={!rows.length}><Copy size={15}/> {copied ? "Copied!" : "Copy all emails"}</button>
      <span className="gm-email-hint">Tip: the CSV imports straight into MailerLite, Brevo or Gmail contacts.</span>
    </div>
  );
}
