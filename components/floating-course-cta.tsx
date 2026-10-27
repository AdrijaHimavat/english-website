"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowUpRight,X} from "lucide-react";
const down="data:image/webp;base64,UklGRlADAABXRUJQVlA4IEQDAADQGACdASpeAH0APx2AtFItKKUiqrUNuaAjiUAaKyKoJpbuYLwgwoQ/4AnHrpUDbS9rdywGEU0jA9q/guJlcKEjywPaa6untQkrpSHiXC4zdI6CRRGsWiEdSNr1WNoLtzmviKhpc2y5PbUfJfZiD/oHrWSm2rOWelKOI8cJXdK2gPbknFaE4yi4vGbDF7PAM/7fcu4iOyHcbDBUYs4vPrsf+gB2AxfNkoJD7zl75FmzZBgfH1aF8qAynBpNUKiGQw9YlrICU68dAT+y653yb1AA/vKABCTt9DXifGn8BX71TQdn35y82wPjuYAArH5rKEkYzDKpzkOTIbH5o6iNAYFHnM9H1/DGwjfYFA8wtieAVl3QdQZVEfRZ8x5I1JcJ3W57iVFHKHKia2/zOxJDZisYCxF3xmwtc931W0DBp1WiTTHUN7f6yfhsPrxJT4hFx2Pvgwl89w48SKrKQpxx+2CoSrT34Whvx4K3lvBeEGVa/NZKU7zRRdUyhOMP6XpZ19UirfTJF9S9zPrySj0EfS8BpXkx4egQOGHlBC3/mVuobGJQYtk/TAiB4vRIgM3RSj7MxLY/SPL7OeueY1S/ceEek6jSwtaEsHdFufHwvvsHQF7qhS0DyqmT8BZvs36G7dYKaLUFunqYM0cwdb3HLDcAzx4rScJ8clMaj/jUAL6x0i9joO4u7L/fXNpObDX9l0ETkMMjjEf+hROEKHHt9d1cWH43j/zBZ3VwM+hPJR5IsKXcV6Rqw5F5ycGw5hSZdGQIrRGvtfC+D/xUlixthyKhBX6O9PF32H+WOf5DYzU/x7weR/0GkmwDItVCkLPWNeO1+2XikNjK0Vg0kN8dnw5Zggf2HyL91b8QcMEG7i4Nqquxn6OhLpWaczlVQvJmCOO0qr9btj0aSYXrRZQjufQKumIqoqWdqg6CvBnOmlqChNhOp1t334RGo2dIKLz4KNnNxWq/i0AcJ9raXKAVsFu9ElRbhMwFecM5/UH6qCrXydVVtKcz2N6U9kAQUDeMoBmps2Cy+ohF5BCDM/GMQ6tT2sV3BwEl3g3JuYyZYZfhyQ+h9ocZavAAVdBoq038BNL6ZfDVgxP14D3CGL7ZQsvYFsB+AA==";
const point="data:image/webp;base64,UklGRoIDAABXRUJQVlA4IHYDAABQGgCdASpeAH0APx18tVQtJySjLhJMIaAjiUTgAqtmF3gb7c0lx6R5gvrttoS5YZQ3iz/TupdL2wxN8ZYs8yUf3wwG6vwY4afqHL0LeWcX49C81azzaujlUmU0ZQcPKmtJZyHpslt2uRvGMuVcEoxkEtubeZ3NS7q6n9IQktUvyPE7+hl59mPmDD0wGazru4eSQfQmcthFIARD9ICcDUO/YPb0vfJpTz04qXpHCjRIjJFKX+jF+06GL7S0BAEi2VO4+rxmoeuUvTlWg50sk4TF6SF9LghdvOGkBZAA/valBPEx5AR/Y05BJU+r36Tb6t+9BHhvNh9QtzUA4F3aGHgMYaNACgsWgvsU6Pe9aB65ha/ZnrEDnYsoj2roU2uIO7bTv4CARymqI9AZ15Qcx2dqcEL0S6pxYo3KuI31tfygEOog/IC9gDf4eUeJXTNMv3xqILz4WmRmeZlqakUxeMyrxXZPEW0snA4fyQ8A2685o2b6FXpoWzngeTMNjj2Acb4hhZk0i+UHpXAvks4MoxygaG6cl28D6XYT/GflBV8LYbC8WOvxSQUChngAxzwkHEHid0fmgkMsRcYLr2T19uFFk5EbdXyYTfN2wgTwk0/tBFKDZdu0dP2Yy1HDLhSq/j137aGrWgWvaaXW5/lcfYjYPmlEDJbhTbQ1eix8t3BLGBCZljEZif2HdP9LlIz9PQuKCdFNEeI2BMaDY82u74zbF0pEcCUyzVnrot6KOD31FFypyvoO3bm0vrvykzUDjGByaNipnh6WzW4+3vSmEwG6c5YJhr3fHI96VAq2hmEQ0lY0sOoqu1XbpK2Pd9P6MbabtmWWiw/dmx4h07f1FSnJsP9ORLzGridFC5BvkotvbIYVvFEWZlkNdZDtT69QPbEuhg7MR3EvCQkfg8UdTG5KvbOa4A4EQDHraOvCG8HHFD1HiscaLBIdNIZZ9BeXISsD+ENFbhU7I5jzgkDPhiJPuheU/hiMDbB5peshhpKKByA2h62Yzhu6cZAI7FApGePsh83xbrMfggKp/W8Z4xzIuOxrS2mG65bWilKv3a0NfhcGPAKjTwuABC2kJY+t20cJurbT1x7eYbmMceTkm2xqx2m5N2cepVtUWvYhDcwHMAKc9CaxRAjx04KO/1lGbivhea77T9ZnQh4zftfrQuo+eizn5gAA";
export function FloatingCourseCTA(){
 const [scrolled,setScrolled]=useState(false);
 const [closed,setClosed]=useState(false);
 const [cursor,setCursor]=useState({x:0,y:0,active:false});
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>480);
  const onMove=(e:PointerEvent)=>{if(e.pointerType==="mouse")setCursor({x:e.clientX,y:e.clientY,active:true})};
  const onLeave=()=>setCursor(c=>({...c,active:false}));
  window.addEventListener("scroll",onScroll,{passive:true});
  window.addEventListener("pointermove",onMove,{passive:true});
  document.addEventListener("pointerleave",onLeave);
  onScroll();
  return ()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("pointermove",onMove);document.removeEventListener("pointerleave",onLeave)};
 },[]);
 return <>
  <div className="gm-pointer-person" aria-hidden="true" style={{transform:`translate3d(${cursor.x+12}px,${cursor.y-60}px,0)`,opacity:cursor.active?1:0}}><img src={point} alt=""/></div>
  {scrolled&&!closed&&<aside className="gm-floating-course" aria-label="Instagram course shortcut">
   <button type="button" className="gm-floating-close" onClick={()=>setClosed(true)} aria-label="Hide course shortcut"><X size={15}/></button>
   <img className="gm-floating-person" src={down} alt=""/>
   <Link className="gm-floating-button" href="/courses">JOIN THE INSTAGRAM COURSE <ArrowUpRight size={17}/></Link>
  </aside>}
 </>;
}