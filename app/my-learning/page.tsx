import Link from "next/link";
import {redirect} from "next/navigation";
import {serverSupabase} from "@/lib/supabase-server";
import {signOut} from "@/app/auth/actions";
import {courses} from "@/lib/courses";
import "../courses/courses.css";
export const metadata={title:"My Learning | Grow Me",robots:{index:false}};
export default async function MyLearning(){const supabase=await serverSupabase();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/auth");const {data:enrollments}=await supabase.from("course_enrollments").select("course_slug").eq("user_id",user.id);const owned=new Set((enrollments||[]).map(e=>e.course_slug));return <div className="course-shell"><section className="dashboard-hero"><div className="container"><span className="eyebrow">GROW ME STUDENT AREA</span><h1>My learning space.</h1><p>Welcome, {user.email}</p></div></section><div className="container" style={{padding:"55px 0 100px"}}><form action={signOut}><button type="submit" className="button" style={{marginBottom:30}}>Sign out</button></form><h2 style={{fontSize:35,marginBottom:25}}>My courses</h2>{owned.size===0&&<p style={{marginBottom:20}}>You haven't enrolled in any courses yet. Signing up doesn't automatically unlock paid lessons.</p>}{courses.filter(c=>owned.has(c.slug)).map(c=><div key={c.slug} style={{padding:22,border:"1px solid #dce7d5",borderRadius:9,marginBottom:16}}><h3>{c.title}</h3><Link href={`/courses/${c.slug}`}>View course curriculum</Link></div>)}<Link href="/courses" className="button">Explore courses</Link></div></div>}
