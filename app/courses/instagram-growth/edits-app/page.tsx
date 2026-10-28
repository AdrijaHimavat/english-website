import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2} from "lucide-react";
export const metadata={title:"Edits App | Grow Me",description:"Learn how to get started with Instagram's Edits app for creating and improving videos."};
export default function EditsLesson(){return <section className="container" style={{padding:"55px 0 100px",maxWidth:980}}>
<Link href="/courses" style={{display:"inline-flex",alignItems:"center",gap:8}}><ArrowLeft size={15}/> All course topics</Link>
<span className="eyebrow" style={{display:"block",marginTop:32}}>MODULE 07 · EDITS APP · FREE LESSON</span>
<h1 style={{fontSize:"clamp(36px,5vw,58px)",margin:"15px 0"}}>Edits App</h1>
<p style={{color:"#677365",fontSize:17,lineHeight:1.7,marginBottom:30}}>Explore Instagram's Edits app and discover practical ways to create, edit, and refine short-form videos.</p>
<div style={{background:"#152a21",borderRadius:12,overflow:"hidden",aspectRatio:"16/9"}}><iframe title="Edits App lesson video" src="https://www.youtube-nocookie.com/embed/wfYFQ-WGx3k" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{width:"100%",height:"100%",border:0}}/></div>
<p style={{fontSize:13,color:"#6d796e",marginTop:16}}>Free lesson · No login required</p>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:35,marginTop:55}}>
<div><span className="eyebrow">ABOUT THIS LESSON</span><h2 style={{fontSize:32,margin:"10px 0 14px"}}>Make video editing easier.</h2><p style={{lineHeight:1.9,color:"#657267"}}>This lesson introduces the Edits app as a practical tool for producing Instagram video content. Watch the tutorial, explore the interface, and experiment with a short video of your own.</p></div>
<div style={{padding:26,background:"#f2f6ee",borderRadius:12}}><BookOpen size={24} color="#48734b"/><h3 style={{fontSize:23,margin:"13px 0"}}>What you'll explore</h3>{["Getting started with the Edits app","Editing short-form videos","Refining your content before publishing","Building a repeatable editing workflow"].map(item=><p key={item} style={{display:"flex",gap:10,alignItems:"start",lineHeight:1.6,fontSize:14,marginBottom:13}}><CheckCircle2 size={18} color="#648a65" style={{flexShrink:0,marginTop:2}}/>{item}</p>)}</div></div>
<div style={{borderTop:"1px solid #e1e8db",marginTop:55,paddingTop:30}}><Link href="/courses" className="button">Back to all course topics <ArrowRight size={16}/></Link></div></section>}