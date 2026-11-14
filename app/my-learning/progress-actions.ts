"use server";
import {revalidatePath} from "next/cache";
import {serverSupabase} from "@/lib/supabase-server";
import {releasedLessons} from "@/lib/released-lessons";

const COURSE = "instagram-growth";
const isLesson = (id: string) => releasedLessons.some((l) => l.slug === id);

export type LessonState = {signedIn: boolean; completed: boolean; percent: number; doneCount: number; total: number};

/** Current state of one lesson for the signed-in member (used by the lesson page). */
export async function getLessonState(lessonId: string): Promise<LessonState> {
  const total = releasedLessons.length;
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user || !isLesson(lessonId)) return {signedIn: !!user, completed: false, percent: 0, doneCount: 0, total};
  const [{data: done}, {data: watch}] = await Promise.all([
    sb.from("lesson_progress").select("lesson_id").eq("user_id", user.id).eq("course_slug", COURSE),
    sb.from("lesson_watch").select("percent").eq("user_id", user.id).eq("course_slug", COURSE).eq("lesson_id", lessonId).maybeSingle(),
  ]);
  const ids = new Set((done || []).map((r) => r.lesson_id));
  const doneCount = releasedLessons.filter((l) => ids.has(l.slug)).length;
  return {signedIn: true, completed: ids.has(lessonId), percent: watch?.percent ?? 0, doneCount, total};
}

/** Saves how far the member has watched (never goes backwards). Auto-completes at 90%. */
export async function saveWatchProgress(lessonId: string, percent: number): Promise<{completed: boolean}> {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user || !isLesson(lessonId)) return {completed: false};
  const p = Math.max(0, Math.min(100, Math.round(percent)));
  const {data: existing} = await sb.from("lesson_watch").select("percent").eq("user_id", user.id).eq("course_slug", COURSE).eq("lesson_id", lessonId).maybeSingle();
  if (!existing || p > existing.percent) {
    await sb.from("lesson_watch").upsert({user_id: user.id, course_slug: COURSE, lesson_id: lessonId, percent: p, updated_at: new Date().toISOString()}, {onConflict: "user_id,course_slug,lesson_id"});
  }
  if (p >= 90) {
    await sb.from("lesson_progress").upsert({user_id: user.id, course_slug: COURSE, lesson_id: lessonId, completed_at: new Date().toISOString()}, {onConflict: "user_id,course_slug,lesson_id", ignoreDuplicates: true});
    revalidatePath("/my-learning");
    return {completed: true};
  }
  return {completed: false};
}

/** Manual complete / undo from the lesson page. */
export async function setLessonCompleted(lessonId: string, complete: boolean): Promise<{ok: boolean}> {
  const sb = await serverSupabase();
  const {data: {user}} = await sb.auth.getUser();
  if (!user || !isLesson(lessonId)) return {ok: false};
  const q = complete
    ? sb.from("lesson_progress").upsert({user_id: user.id, course_slug: COURSE, lesson_id: lessonId, completed_at: new Date().toISOString()}, {onConflict: "user_id,course_slug,lesson_id"})
    : sb.from("lesson_progress").delete().eq("user_id", user.id).eq("course_slug", COURSE).eq("lesson_id", lessonId);
  const {error} = await q;
  revalidatePath("/my-learning");
  return {ok: !error};
}
