"use server";
import {revalidatePath} from "next/cache";
import {serverSupabase} from "@/lib/supabase-server";

/** Give (days > 0) or remove (days = 0) Grow Me Studio access for one member. Admin-only (checked in the database). */
export async function setStudioAccess(userId: string, days: number): Promise<{ok: boolean; expiresAt?: string; error?: string}> {
  const sb = await serverSupabase();
  const {data, error} = await sb.rpc("admin_set_studio_access", {p_user: userId, p_days: Math.max(0, Math.round(days))});
  if (error) return {ok: false, error: error.message};
  revalidatePath("/admin/emails");
  return {ok: true, expiresAt: data as string};
}
