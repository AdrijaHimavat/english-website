import Link from "next/link";
import {ArrowLeft,ArrowRight,BookOpen,CheckCircle2} from "lucide-react";
export const metadata={title:"Health Score | Grow Me",description:"Rank Score — Health Score video lesson."};
export default function Lesson(){
 return <section className="container" style={{padding:"55px 0 100px",maxWidth:980}}>
  <Link href="/courses" style={{display:"inline-flex",alignItems:"center",gap:8}}><ArrowLeft size={16}/> All course topics</Link>
  <span className="eyebrow" style={{display:"block",marginTop:32}}>MODULE 09 · RANK SCORE · REGISTERED STUDENTS</span>
  <h1 style={{fontSize:"clamp(36px,5vw,58px)",margin:"15px 0"}}>Health Score</h1>
  <p style={{fontSize:17,lineHeight:1.8,color:"#6f6780",marginBottom:30}}>Discover the Health Score concept as part of the Rank Score section of the Instagram Growth course.</p>
  <div style={{background:"#171521",borderRadius:16,overflow:"hidden",aspectRatio:"16/9"}}>
   <iframe title="Health Score video lesson" src="https://drive.google.com/file/d/1W0i82I8gXpCJMWT8ZEzNGaTqfcX9LbNd/preview" allow="autoplay; fullscreen" allowFullScreen loading="lazy" style={{width:"100%",height:"100%",border:0}}/>
  </div>
  <p style={{fontSize:13,color:"#6f6780",marginTop:15}}>Lesson for registered Grow Me students</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:35,marginTop:55}}>
   <div><span className="eyebrow">ABOUT THIS LESSON</span><h2 style={{fontSize:32,margin:"10px 0 14px"}}>Rank Score — Health Score</h2><p style={{color:"#6f6780",lineHeight:1.9}}>Discover the Health Score concept as part of the Rank Score section of the Instagram Growth course.</p></div>
   <div style={{background:"#f6f1ff",padding:26,borderRadius:16}}><BookOpen size={24} color="#8a66d3"/><h3 style={{fontSize:23,margin:"13px 0"}}>Your next step</h3><p style={{display:"flex",gap:10,alignItems:"start",lineHeight:1.7}}><CheckCircle2 size={18} color="#8a66d3"/>Watch the lesson and apply what you have learned to your Instagram strategy.</p></div>
  </div>
  <div style={{borderTop:"1px solid #eae4f3",marginTop:55,paddingTop:30}}><Link href="/courses" className="button">All course topics <ArrowRight size={16}/></Link></div>
 </section>;
}