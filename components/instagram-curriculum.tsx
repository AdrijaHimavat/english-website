"use client";
import {useState} from "react";
import Link from "next/link";
import {ChevronDown,PlayCircle,LockKeyhole,X,ArrowRight} from "lucide-react";
import {instagramModules} from "@/lib/instagram-modules";

const lessonLinks:Record<string,string>={
 "0-0":"introduction",
 "1-0":"menus-settings",
 "2-0":"security",
 "3-0":"first-1000",
 "4-0":"edits-app",
 "5-0":"golden-triangle",
 "6-0":"algorithm",
 "7-0":"page-subject-identification",
 "7-1":"interaction-rules",
 "7-2":"following-explore-architecture",
 "7-3":"interaction-techniques"
};
export function InstagramCurriculum({signedIn=false,hasAccess=false,price}:{signedIn?:boolean;hasAccess?:boolean;price?:string}){
 const [open,setOpen]=useState<number[]>([]);
 const [selected,setSelected]=useState<{title:string;slug:string}|null>(null);
 return <section className="syllabus" aria-label="All course topics">
  <div className="syllabus-heading"><div><span className="eyebrow">FULL COURSE INDEX</span><h2>All course topics</h2><p>Choose a topic to see its lessons. The Introduction is free to watch. Unlock every lesson with a one-time payment.</p></div><span className="syllabus-total">{instagramModules.length} topics</span></div>
  <div className="syllabus-list">
  {instagramModules.map((m,i)=><div className="syllabus-module" key={i}>
   <button type="button" className="syllabus-toggle" aria-expanded={open.includes(i)} onClick={()=>setOpen(current=>current.includes(i)?current.filter(n=>n!==i):[...current,i])}>
    <span className="syllabus-number">{String(i+1).padStart(2,"0")}</span><span className="syllabus-title">{m.title}</span><span className="syllabus-count">{m.lessons.length} {m.lessons.length===1?"part":"parts"}</span><ChevronDown className={open.includes(i)?"syllabus-chevron is-open":"syllabus-chevron"} size={20}/>
   </button>
   {open.includes(i)&&<div className="syllabus-parts">{m.lessons.map((lesson,j)=>{const slug=lessonLinks[i+"-"+j];const publicLesson=slug==="introduction";return <div className="syllabus-part" key={j}>
     <PlayCircle size={20} strokeWidth={1.6}/>
     <span>{lesson.title}</span>
     {slug?(publicLesson||hasAccess?<Link href={"/courses/instagram-growth/"+slug} className="syllabus-watch">Watch lesson</Link>:<button type="button" className="syllabus-watch gm-locked-lesson" onClick={()=>setSelected({title:lesson.title,slug})}><LockKeyhole size={14}/> Unlock to watch</button>):<span className="syllabus-soon"><LockKeyhole size={13}/> Coming soon</span>}
    </div>})}</div>}
   </div>)}
  </div>
  {selected&&<div className="gm-register-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}>
    <div className="gm-register-modal" role="dialog" aria-modal="true" aria-labelledby="gm-register-heading">
      <button type="button" className="gm-register-close" aria-label="Close" onClick={()=>setSelected(null)}><X size={21}/></button>
      <div className="gm-register-icon"><LockKeyhole size={27}/></div>
      <span className="eyebrow">FULL COURSE LESSON</span>
      <h2 id="gm-register-heading">Unlock this lesson</h2>
      <p><strong>{selected.title}</strong> is part of the full Instagram Growth course. Get lifetime access to every lesson{price?<> for a one-time <strong>{price}</strong></>:null}.</p>
      <Link className="button gm-register-main" href={"/enroll?next="+encodeURIComponent("/courses/instagram-growth/"+selected.slug)}>Get full access <ArrowRight size={18}/></Link>
      {!signedIn&&<Link className="gm-register-login" href={"/auth?next="+encodeURIComponent("/courses/instagram-growth/"+selected.slug)}>Already have access? Sign in</Link>}
    </div>
  </div>}
 </section>;
}
