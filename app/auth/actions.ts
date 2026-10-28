"use server";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {createServerClient} from "@supabase/ssr";
async function client(){const jar=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{cookies:{getAll(){return jar.getAll()},setAll(items:{name:string;value:string;options?:Record<string,unknown>}[]){items.forEach(({name,value,options})=>jar.set(name,value,options))}}})}
export async function authAction(form:FormData){const mode=String(form.get("mode")||"login");const email=String(form.get("email")||"").trim();const password=String(form.get("password")||"");if(!email||!password)redirect("/auth?error=missing");const sb=await client();if(mode==="signup"){const {data,error}=await sb.auth.signUp({email,password});if(error)redirect("/auth?mode=signup&error="+encodeURIComponent(error.code||"signup"));if(data.session)redirect("/my-learning");redirect("/auth?message=needs-confirmation")}const {error}=await sb.auth.signInWithPassword({email,password});if(error)redirect("/auth?error="+encodeURIComponent(error.code||"login"));redirect("/my-learning")}
export async function signOut(){const sb=await client();await sb.auth.signOut();redirect("/auth")}
