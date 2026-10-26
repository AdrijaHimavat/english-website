"use server";
import {cookies,headers} from "next/headers";
import {redirect} from "next/navigation";
import {createServerClient} from "@supabase/ssr";
async function client(){const jar=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{cookies:{getAll(){return jar.getAll()},setAll(items){items.forEach(({name,value,options})=>jar.set(name,value,options))}}})}
export async function authAction(form:FormData){const mode=String(form.get("mode")||"login");const email=String(form.get("email")||"").trim();const password=String(form.get("password")||"");if(!email||!password)return redirect("/auth?error=missing");const sb=await client();if(mode==="signup"){const h=await headers();const origin=h.get("origin")||process.env.NEXT_PUBLIC_SITE_URL||"";const {error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:origin+"/auth/callback"}});if(error)return redirect("/auth?error=signup");redirect("/auth?message=check-email")}const {error}=await sb.auth.signInWithPassword({email,password});if(error)redirect("/auth?error=login");redirect("/my-learning")}
export async function signOut(){const sb=await client();await sb.auth.signOut();redirect("/auth")}
