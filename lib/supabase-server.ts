import {supabaseUrl,supabaseKey} from "@/lib/supabase-env";
import {cookies} from "next/headers";
import {createServerClient} from "@supabase/ssr";
export async function serverSupabase(){const jar=await cookies();return createServerClient(supabaseUrl,supabaseKey,{cookies:{getAll(){return jar.getAll()},setAll(items: {name:string;value:string;options?:Record<string,unknown>}[]){items.forEach(({name,value,options})=>{try{jar.set(name,value,options)}catch{}})}}})}
