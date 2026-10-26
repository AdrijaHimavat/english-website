import {cookies} from "next/headers";
import {createServerClient} from "@supabase/ssr";
export async function serverSupabase(){const jar=await cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,{cookies:{getAll(){return jar.getAll()},setAll(items){items.forEach(({name,value,options})=>{try{jar.set(name,value,options)}catch{}})}}})}
