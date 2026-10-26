import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {courses,getCourse} from "@/lib/courses";
import {InstagramCurriculum} from "@/components/instagram-curriculum";
import "../courses.css";
export function generateStaticParams(){return courses.map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:getCourse(slug)?.title||"Course",robots:{index:false}}}
export default async function CourseDetails({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=getCourse(slug);if(!c)notFound();return <div className="course-shell"><div className="container" style={{maxWidth:960,paddingTop:40,paddingBottom:100}}>
<Link className="course-back" href="/courses">← All courses</Link>
<span className="eyebrow">{c.category.toUpperCase()}</span>
<h1 style={{fontSize:"clamp(38px,5vw,58px)",margin:"14px 0 12px"}}>{c.title}</h1>
<p style={{fontSize:16,color:"#69756a",lineHeight:1.8,maxWidth:730}}>{c.subtitle}</p>
{slug==="instagram-growth"?<InstagramCurriculum/>:<div style={{marginTop:45}}><h2 style={{fontSize:34,marginBottom:20}}>Course lessons</h2>{c.lessons.map((l,i)=><div key={i} className="lesson-row"><span className="lesson-number">{String(i+1).padStart(2,"0")}</span><div className="lesson-copy"><strong>{l.title}</strong><p>{l.summary}</p></div></div>)}</div>}
</div></div>}