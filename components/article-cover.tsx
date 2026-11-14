import { CategoryIcon } from "@/components/category-icon";
import { categoryFor } from "@/lib/articles";

// Instagram-style gradient covers, one look per category, with small per-article variations.
const THEMES: Record<string, { from: string; via: string; to: string; chips: [string, string] }> = {
  "instagram-growth": { from: "#f472b6", via: "#c026d3", to: "#7c3aed", chips: ["♥ 1.2k likes", "+86 followers"] },
  "social-media-marketing": { from: "#60a5fa", via: "#6366f1", to: "#8b5cf6", chips: ["💬 48 comments", "Reach ↑ 32%"] },
  "artificial-intelligence": { from: "#22d3ee", via: "#6366f1", to: "#a855f7", chips: ["✦ Better brief", "10 ideas in 1 min"] },
  "content-creation": { from: "#fb923c", via: "#ec4899", to: "#8b5cf6", chips: ["Draft → Post", "7 ideas saved"] },
  "digital-marketing": { from: "#38bdf8", via: "#818cf8", to: "#c084fc", chips: ["CTR 4.8%", "Search ↗"] },
  "online-business": { from: "#fbbf24", via: "#f472b6", to: "#a855f7", chips: ["First sale 🎉", "Test → Learn"] },
  "productivity-tools": { from: "#a5b4fc", via: "#818cf8", to: "#c084fc", chips: ["Focus 25:00", "3 / 5 done"] },
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export function ArticleCover({ category, seed, large = false }: { category: string; seed: string; large?: boolean }) {
  const cat = categoryFor(category);
  const t = THEMES[cat.slug] || THEMES["instagram-growth"];
  const h = hash(seed);
  const flip = h % 2 === 1;
  const angle = 115 + (h % 50);
  const b1 = { x: 8 + (h % 30), y: 10 + ((h >> 3) % 40) };
  const b2 = { x: 55 + ((h >> 5) % 35), y: 45 + ((h >> 7) % 40) };
  const tilt = ((h >> 9) % 9) - 4;
  return (
    <div
      className={`gm-cover ${large ? "gm-cover-lg" : ""}`}
      style={{ background: `linear-gradient(${angle}deg, ${t.from} 0%, ${t.via} 55%, ${t.to} 100%)` }}
      aria-hidden="true"
    >
      <span className="gm-cover-blob" style={{ left: `${b1.x}%`, top: `${b1.y}%` }} />
      <span className="gm-cover-blob gm-cover-blob-2" style={{ left: `${b2.x}%`, top: `${b2.y}%` }} />
      <span className="gm-cover-grid" />
      <div className="gm-cover-card" style={{ transform: `rotate(${tilt}deg)` }}>
        <span className="gm-cover-icon"><CategoryIcon name={cat.icon} size={large ? 46 : 34} /></span>
        <span className="gm-cover-lines"><i /><i /><i /></span>
      </div>
      <span className={`gm-cover-chip ${flip ? "gm-tl" : "gm-tr"}`}>{t.chips[0]}</span>
      <span className={`gm-cover-chip ${flip ? "gm-br" : "gm-bl"}`}>{t.chips[1]}</span>
      <span className="gm-cover-spark" style={{ left: flip ? "78%" : "16%", top: flip ? "64%" : "22%" }}>✦</span>
    </div>
  );
}
