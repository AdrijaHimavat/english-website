"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowUpRight,X} from "lucide-react";
const down="data:image/webp;base64,UklGRlADAABXRUJQVlA4IEQDAADQGACdASpeAH0APx2AtFItKKUiqrUNuaAjiUAaKyKoJpbuYLwgwoQ/4AnHrpUDbS9rdywGEU0jA9q/guJlcKEjywPaa6untQkrpSHiXC4zdI6CRRGsWiEdSNr1WNoLtzmviKhpc2y5PbUfJfZiD/oHrWSm2rOWelKOI8cJXdK2gPbknFaE4yi4vGbDF7PAM/7fcu4iOyHcbDBUYs4vPrsf+gB2AxfNkoJD7zl75FmzZBgfH1aF8qAynBpNUKiGQw9YlrICU68dAT+y653yb1AA/vKABCTt9DXifGn8BX71TQdn35y82wPjuYAArH5rKEkYzDKpzkOTIbH5o6iNAYFHnM9H1/DGwjfYFA8wtieAVl3QdQZVEfRZ8x5I1JcJ3W57iVFHKHKia2/zOxJDZisYCxF3xmwtc931W0DBp1WiTTHUN7f6yfhsPrxJT4hFx2Pvgwl89w48SKrKQpxx+2CoSrT34Whvx4K3lvBeEGVa/NZKU7zRRdUyhOMP6XpZ19UirfTJF9S9zPrySj0EfS8BpXkx4egQOGHlBC3/mVuobGJQYtk/TAiB4vRIgM3RSj7MxLY/SPL7OeueY1S/ceEek6jSwtaEsHdFufHwvvsHQF7qhS0DyqmT8BZvs36G7dYKaLUFunqYM0cwdb3HLDcAzx4rScJ8clMaj/jUAL6x0i9joO4u7L/fXNpObDX9l0ETkMMjjEf+hROEKHHt9d1cWH43j/zBZ3VwM+hPJR5IsKXcV6Rqw5F5ycGw5hSZdGQIrRGvtfC+D/xUlixthyKhBX6O9PF32H+WOf5DYzU/x7weR/0GkmwDItVCkLPWNeO1+2XikNjK0Vg0kN8dnw5Zggf2HyL91b8QcMEG7i4Nqquxn6OhLpWaczlVQvJmCOO0qr9btj0aSYXrRZQjufQKumIqoqWdqg6CvBnOmlqChNhOp1t334RGo2dIKLz4KNnNxWq/i0AcJ9raXKAVsFu9ElRbhMwFecM5/UH6qCrXydVVtKcz2N6U9kAQUDeMoBmps2Cy+ohF5BCDM/GMQ6tT2sV3BwEl3g3JuYyZYZfhyQ+h9ocZavAAVdBoq038BNL6ZfDVgxP14D3CGL7ZQsvYFsB+AA==";
export function FloatingCourseCTA(){
 const [scrolled,setScrolled]=useState(false);
 const [closed,setClosed]=useState(false);
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>480);
  window.addEventListener("scroll",onScroll,{passive:true});
  onScroll();
  return ()=>{window.removeEventListener("scroll",onScroll);document.removeEventListener("pointerleave",onLeave)};
 },[]);
 return <>
  {scrolled&&!closed&&<aside className="gm-floating-course" aria-label="Instagram course shortcut">
   <button type="button" className="gm-floating-close" onClick={()=>setClosed(true)} aria-label="Hide course shortcut"><X size={15}/></button>
   <img className="gm-floating-person" src={down} alt="" aria-hidden="true"/>
   <Link className="gm-floating-button" href="/courses">JOIN THE INSTAGRAM COURSE <ArrowUpRight size={17}/></Link>
  </aside>}
 </>;
}