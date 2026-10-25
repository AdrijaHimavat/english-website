"use client";
import { useState } from "react";
import { Check, Link as LinkIcon, Share2 } from "lucide-react";
export function ShareButtons({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setMessage("Article link copied.");
    } catch {
      setMessage("Copy the address from your browser to share this article.");
    }
  }
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title, url: window.location.href });
        setMessage("Share options opened.");
      } else {
        await copy();
      }
    } catch (e) {
      if (!(e instanceof Error && e.name === "AbortError"))
        setMessage("Sharing is unavailable. Try copying the link.");
    }
  }
  return (
    <div className="share">
      <span>Pass a good idea along</span>
      <div>
        <button onClick={copy} className="share-button">
          {copied ? <Check size={15} /> : <LinkIcon size={15} />}{" "}
          {copied ? "Copied" : "Copy link"}
        </button>
        <button onClick={share} className="share-button">
          <Share2 size={15} /> Share
        </button>
      </div>
      <p role="status" className="share-status">
        {message}
      </p>
    </div>
  );
}
