"use client";
import {useState} from "react";
import Link from "next/link";
import {ChevronDown,PlayCircle,LockKeyhole} from "lucide-react";
import {instagramModules} from "@/lib/instagram-modules";
export function InstagramCurriculum(){
 const [open,setOpen]=useState<number[]>([]);
 return <section className="syllabus" aria-label="All course topics">
  <div className="syllabus-heading"><div><span className="eyebrow">FULL COURSE INDEX</span><h2>All course topics</h2><p>Choose a topic to see its lessons.</p></div><span className="syllabus-total">{instagramModules.length} topics</span></div>
  <div className="syllabus-list">
  {instagramModules.map((m,i)=><div className="syllabus-module" key={i}>
   <button type="button" className="syllabus-toggle" aria-expanded={open.includes(i)} onClick={()=>setOpen(current=>current.includes(i)?current.filter(n=>n!==i):[...current,i])}>
    <span className="syllabus-number">{String(i+1).padStart(2,"0")}</span>
    <span className="syllabus-title">{m.title}</span>
    <span className="syllabus-count">{m.lessons.length} {m.lessons.length===1?"part":"parts"}</span>
    <ChevronDown className={open.includes(i)?"syllabus-chevron is-open":"syllabus-chevron"} size={20}/>
   </button>
   {open.includes(i)&&<div className="syllabus-parts">{m.lessons.map((lesson,j)=><div className="syllabus-part" key={j}>
     <PlayCircle size={20} strokeWidth={1.6}/>
     <span>{lesson.title}</span>
     {i===4&&j===0?<Link href="/courses/instagram-growth/first-1000" className="syllabus-watch">Open lesson</Link>:<span className="syllabus-soon"><LockKeyhole size={13}/> Coming soon</span>}
    </div>)}</div>}
   </div>)}
  </div>
 </section>
}