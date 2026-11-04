"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowUpRight,X} from "lucide-react";
export function FloatingCourseCTA(){
 const [scrolled,setScrolled]=useState(false);
 const [closed,setClosed]=useState(false);
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>480);
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();
  return ()=>{window.removeEventListener("scroll",onScroll);};
 },[]);
 return <>
  {scrolled&&!closed&&<aside className="gm-floating-course" aria-label="Instagram course shortcut">
   <button type="button" className="gm-floating-close" onClick={()=>setClosed(true)} aria-label="Hide course shortcut"><X size={15}/></button>
   <Link className="gm-floating-button" href="/courses">JOIN THE INSTAGRAM COURSE <ArrowUpRight size={17}/></Link>
  </aside>}
 </>;
}