import {Star} from "lucide-react";
const samples=[
 {quote:"I used to post without knowing what I was doing. This helped me finally understand how to plan my content.",name:"Sample feedback 01"},
 {quote:"The way the lessons explain the algorithm made things click for me. I wish I'd learned this sooner!",name:"Sample feedback 02"},
 {quote:"I really liked that I could follow the steps at my own pace instead of feeling overwhelmed.",name:"Sample feedback 03"}
];
export function CourseTestimonials(){return <section className="gm-testimonials" aria-label="Course value preview"><div className="gm-testimonials-heading"><div><span className="eyebrow">TESTIMONIAL-STYLE EXAMPLES</span><h2>What learning could feel like</h2></div></div><div className="gm-testimonials-viewport"><div className="gm-testimonials-track">{[...samples,...samples].map((review,i)=><article className="gm-testimonial-card" key={i} aria-hidden={i>=samples.length?"true":undefined}><div className="gm-stars" aria-label="Decorative stars">{Array.from({length:5}).map((_,n)=><Star key={n} size={15} fill="currentColor" strokeWidth={1.5}/>)}</div><p>{review.quote}</p></article>)}</div></div></section>}