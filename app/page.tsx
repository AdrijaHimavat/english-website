import {FloatingCourseCTA} from "@/components/floating-course-cta";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Search,
  Sprout,
  Check,
} from "lucide-react";
import { Newsletter } from "@/components/newsletter";
import { PlannerPromo } from "@/components/planner-promo";
import {PlayCircle} from "lucide-react";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <FloatingCourseCTA />
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span /> THE MAIN COURSE · GROW ME ACADEMY
            </div>
            <h1>
              Instagram Growth.
              <br />
              <em>From Zero, Step by Step.</em>
            </h1>
            <p>
              Our complete Instagram growth course starts here. Explore the full
              curriculum, learn the strategy step by step, and watch available
              video lessons for free.
            </p>
            <div className="hero-buttons">
              <Link href="/courses" className="button gm-hero-course-cta">
                EXPLORE THE FULL INSTAGRAM COURSE <ArrowUpRight size={22} />
              </Link>
              <Link href="/articles" className="text-button">
                Quick Tips & Free Articles <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-promise">
              <span>
                <Check size={14} /> Free introduction · No payment
              </span>
              <span>
                <Check size={14} /> Register free for more lessons
              </span>
            </div>
          </div>
          <div className="gm-intro-feature">
            <div className="gm-intro-feature-top"><span className="gm-live-dot"/> MEET YOUR INSTRUCTOR <span>FREE COURSE PREVIEW</span></div>
            <div className="gm-intro-video-frame gm-intro-video-player"><iframe title="Play the Instagram Course introduction" src="https://www.youtube-nocookie.com/embed/0V2_qUQSuwg?rel=0" loading="lazy" allow="autoplay; fullscreen" allowFullScreen /></div>
            <div className="gm-intro-feature-bottom">
              <div><span className="eyebrow">START HERE · LESSON 01</span><strong>See what you’ll learn, directly from your instructor.</strong></div>
              <Link href="/courses" className="gm-intro-course-link">Explore Course <ArrowUpRight size={18}/></Link>
            </div>
          </div>
        </div>
      </section>
      <div className="promise-strip">
        <div className="container">
          <span>
            <BookOpen size={16} /> Real lessons. Useful takeaways.
          </span>
          <span>
            <Sprout size={17} /> Grow at your own pace.
          </span>
          <span>
            <Check size={17} /> Less noise. More know-how.
          </span>
          <span className="strip-signature">Learn. Create. Grow.</span>
        </div>
      </div>
      <div className="container home-content">
        <PlannerPromo />
        <section className="mission-strip">
          <span className="mission-icon">
            <Sprout size={32} strokeWidth={1.3} />
          </span>
          <div>
            <h2>You don’t need to know it all to get started.</h2>
            <p>
              Just a little curiosity, a useful idea, and the space to grow.
            </p>
          </div>
          <Link href="/about" className="text-button">
            Our kind of growth <ArrowUpRight size={17} />
          </Link>
        </section>
        <Newsletter />
      </div>
    </>
  );
}
