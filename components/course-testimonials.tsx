import {Star} from "lucide-react";
const samples=[
 {quote:"Understand Instagram growth step by step.",name:"Sample feedback 01"},
 {quote:"Learn the strategy behind your content.",name:"Sample feedback 02"},
 {quote:"Explore practical ideas for your page.",name:"Sample feedback 03"}
];
export function CourseTestimonials(){return <section className="gm-testimonials" aria-label="Course value preview"><div className="gm-testimonials-heading"><div><span className="eyebrow">LEARNER VOICES</span><h2>Inside the course</h2></div></div><div className="gm-testimonials-viewport"><div className="gm-testimonials-track">{[...samples,...samples].map((review,i)=><article className="gm-testimonial-card" key={i} aria-hidden={i>=samples.length?"true":undefined}><div className="gm-stars" aria-label="Decorative stars">{Array.from({length:5}).map((_,n)=><Star key={n} size={15} fill="currentColor" strokeWidth={1.5}/>)}</div><p>{review.quote}</p></article>)}</div></div></section>}