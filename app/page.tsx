import Link from "next/link";
import type {Metadata} from "next";
import {ArrowUpRight,BookOpen,CheckCircle2,GraduationCap,PlayCircle,Sparkles} from "lucide-react";
import {PlannerPromo} from "@/components/planner-promo";

export const metadata:Metadata={alternates:{canonical:"/"}};

export default function Home(){
 return <main>
  <section className="hero-section" aria-labelledby="course-heading">
   <div className="container hero-grid">
    <div className="hero-copy">
     <div className="hero-kicker"><span/> GROW ME ACADEMY · INSTAGRAM COURSE</div>
     <h1 id="course-heading">Instagram Growth.<br/><em>From Zero, Step by Step.</em></h1>
     <p>Master Instagram with a structured, practical course. Learn how the algorithm works, build a clear content strategy, and grow your account with confidence.</p>
     <div className="hero-buttons">
      <Link href="/courses" className="button gm-hero-course-cta">EXPLORE THE INSTAGRAM COURSE <ArrowUpRight size={21}/></Link>
     </div>
     <div className="hero-promise">
      <span><CheckCircle2 size={15}/> Free introduction</span>
      <span><CheckCircle2 size={15}/> Learn at your own pace</span>
     </div>
    </div>
    <div className="gm-course-brochure" aria-label="Instagram Growth course overview">
     <div className="gm-course-brochure-glow" aria-hidden="true"/>
     <span className="gm-course-brochure-kicker"><GraduationCap size={17}/> THE COMPLETE INSTAGRAM COURSE</span>
     <div className="gm-course-brochure-icon"><BookOpen size={32} strokeWidth={1.5}/></div>
     <h2>Learn the strategy.<br/><em>Grow your Instagram.</em></h2>
     <p>A practical learning path for creators, businesses, and anyone starting from zero.</p>
     <div className="gm-course-brochure-points">
      <span><CheckCircle2 size={17}/> Instagram algorithm & reach</span>
      <span><CheckCircle2 size={17}/> Profile setup & optimization</span>
      <span><CheckCircle2 size={17}/> Content strategy & creation</span>
      <span><CheckCircle2 size={17}/> Lessons & progress tracking</span>
     </div>
     <div className="gm-course-brochure-actions">
      <Link href="/courses" className="gm-course-brochure-link">Explore the course <ArrowUpRight size={18}/></Link>
      <Link href="/courses/instagram-growth/introduction" className="gm-course-brochure-secondary"><PlayCircle size={17}/> Watch free introduction</Link>
     </div>
     <span className="gm-course-brochure-spark" aria-hidden="true"><Sparkles size={24}/></span>
    </div>
   </div>
  </section>
  <div className="container gm-home-promos"><PlannerPromo/></div>
 </main>;
}
