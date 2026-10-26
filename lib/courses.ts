export type Lesson = { title: string; minutes: number; preview?: boolean; summary: string };
export type Course = { slug: string; title: string; subtitle: string; category: string; level: string; duration: string; accent: string; lessons: Lesson[] };
export const courses: Course[] = [
 { slug:"instagram-growth", title:"Instagram Growth: Zero to 1,000", subtitle:"Build a clear foundation, find the right audience, and grow with a repeatable content strategy.", category:"Social Media", level:"Beginner", duration:"5 lessons", accent:"sage", lessons:[
  {title:"Start with a strong foundation",minutes:12,preview:true,summary:"Set up your profile and clarify who you serve."},
  {title:"Understand your audience",minutes:16,summary:"Identify the people your content is really for."},
  {title:"Create content worth saving",minutes:18,summary:"Plan useful Reels, carousels and captions."},
  {title:"Build meaningful interactions",minutes:14,summary:"Create genuine connections without spam."},
  {title:"Measure and improve",minutes:11,summary:"Review useful signals and refine your strategy."}
 ]},
 {slug:"ai-for-creators",title:"AI Tools for Everyday Creators",subtitle:"Simplify planning, writing and research without losing your own voice.",category:"Artificial Intelligence",level:"Beginner",duration:"4 lessons",accent:"peach",lessons:[
  {title:"Your first practical AI workflow",minutes:10,preview:true,summary:"Build a repeatable workflow for daily tasks."},
  {title:"Better prompts, better results",minutes:15,summary:"Give context and ask for clear output."},
  {title:"Research and fact-checking",minutes:12,summary:"Use AI thoughtfully and verify important claims."},
  {title:"Your weekly creative system",minutes:13,summary:"Organize ideas, drafts and reviews."}
 ]}
];
export function getCourse(slug:string){return courses.find(c=>c.slug===slug)}
