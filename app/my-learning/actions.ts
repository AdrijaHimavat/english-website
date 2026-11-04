"use server";
import {redirect} from "next/navigation";
import {serverSupabase} from "@/lib/supabase-server";
import {releasedLessons} from "@/lib/released-lessons";
export async function setLessonComplete(form:FormData){const sb=await serverSupabase();const {data:{user}}=await sb.auth.getUser();if(!user)redirect("/auth");const lessonId=String(form.get("lessonId")||"");if(!releasedLessons.some(l=>l.slug===lessonId))redirect("/my-learning");const complete=String(form.get("complete"))==="true";if(complete){const {error}=await sb.from("lesson_progress").upsert({user_id:user.id,course_slug:"instagram-growth",lesson_id:lessonId,completed_at:new Date().toISOString()},{onConflict:"user_id,course_slug,lesson_id"});if(error)redirect("/my-learning?error=save")}else{const {error}=await sb.from("lesson_progress").delete().eq("user_id",user.id).eq("course_slug","instagram-growth").eq("lesson_id",lessonId);if(error)redirect("/my-learning?error=save")}redirect("/my-learning")}
