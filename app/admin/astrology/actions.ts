"use server";
import {revalidatePath} from "next/cache";
import {serverSupabase} from "@/lib/supabase-server";

/** Delete everything one astrology visitor entered (for privacy requests). Admin-only (checked in the database). */
export async function deleteAstroVisitor(visitor: string): Promise<{ok: boolean; error?: string}> {
  const sb = await serverSupabase();
  const {error} = await sb.rpc("admin_astro_delete_visitor", {p_visitor: visitor});
  if (error) return {ok: false, error: error.message};
  revalidatePath("/admin/astrology");
  return {ok: true};
}
