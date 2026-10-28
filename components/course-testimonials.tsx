import {Star} from "lucide-react";
const samples=[
 {quote:"I used to post without knowing what I was doing. This helped me finally understand how to plan my content.",name:"Alex (fictional)"},
 {quote:"The way the lessons explain the algorithm made things click for me. I wish I'd learned this sooner!",name:"Maya (fictional)"},
 {quote:"I really liked that I could follow the steps at my own pace instead of feeling overwhelmed.",name:"Sam (fictional)"}
];
export function CourseTestimonials(){return <section className="gm-testimonials" aria-label="Course value preview"><div className="gm-testimonials-heading"><div><h2>What learning could feel like</h2></div></div><div className="gm-testimonials-viewport"><div className="gm-testimonials-track">{[...samples,...samples].map((review,i)=><article className="gm-testimonial-card" key={i} aria-hidden={i>=samples.length?"true":undefined}><div className="gm-stars" aria-label="Decorative stars">{Array.from({length:5}).map((_,n)=><Star key={n} size={15} fill="currentColor" strokeWidth={1.5}/>)}</div><p>{review.quote}</p><div className="gm-review-meta"><span>{review.name}</span><span>Example quote</span></div></article>)}</div></div></section>}