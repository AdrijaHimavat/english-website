import { ArrowUpRight, Check, Sparkles } from "lucide-react";
export function HeroArt() {
  return (
    <div
      className="hero-art"
      role="img"
      aria-label="An original illustration of growing leaves, ideas, and steady progress"
    >
      <div className="art-ring ring-one" />
      <div className="art-ring ring-two" />
      <span className="art-star star-one">✳</span>
      <span className="art-star star-two">✦</span>
      <div className="growth-label">
        <span className="status-dot" /> A little better, every day
      </div>
      <svg
        className="plant-art"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M196 357C197 258 205 178 256 77"
          stroke="#372e5c"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M204 277C123 290 93 222 103 171c65 6 111 41 101 106Z"
          fill="#8579b3"
        />
        <path
          d="M202 281c-27-44-54-69-79-86"
          stroke="#5b5183"
          strokeWidth="2"
        />
        <path
          d="M213 228c70 16 135-24 138-92-83-7-126 26-138 92Z"
          fill="#493f6f"
        />
        <path
          d="M215 228c39-39 80-59 113-66"
          stroke="#8579b3"
          strokeWidth="2"
        />
        <path
          d="M233 145c-65-2-89-55-71-105 59 14 83 48 71 105Z"
          fill="#61558f"
        />
        <path d="M233 145c-8-33-27-65-50-83" stroke="#968ac5" strokeWidth="2" />
        <path
          d="M246 105C245 48 284 14 327 22c2 55-28 85-81 83Z"
          fill="#8b7ebf"
        />
        <path d="M247 105c20-34 37-53 60-66" stroke="#574a8a" strokeWidth="2" />
        <path d="M173 348h59l-8 36h-43z" fill="#ced7bb" />
        <path d="M173 348h59" stroke="#9b92bc" strokeWidth="3" />
      </svg>
      <div className="floating-note idea-note">
        <div className="note-icon">
          <Sparkles size={18} />
        </div>
        <div>
          <strong>Big ideas start small.</strong>
          <span>Keep your curiosity growing.</span>
        </div>
      </div>
      <div className="floating-note progress-note">
        <div className="progress-note-top">
          <span>YOUR NEXT CHAPTER</span>
          <ArrowUpRight size={17} />
        </div>
        <strong>Progress, at your pace.</strong>
        <div className="progress-bars">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="progress-caption">
          <span className="check-circle">
            <Check size={10} />
          </span>{" "}
          One small step forward
        </span>
      </div>
      <div className="art-caption">
        GROW YOUR SKILLS. GROW YOUR POSSIBILITIES.
      </div>
    </div>
  );
}
