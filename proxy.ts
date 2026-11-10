import {supabaseUrl,supabaseKey} from "@/lib/supabase-env";
import {NextResponse, type NextRequest} from "next/server";
import {createServerClient} from "@supabase/ssr";

export async function proxy(request:NextRequest){
  const path=request.nextUrl.pathname;
  if(path==="/courses/instagram-growth/introduction"||path==="/courses/instagram-growth/introduction/") return NextResponse.next();
  let response=NextResponse.next({request});
  const supabase=createServerClient(supabaseUrl,supabaseKey,{
    cookies:{
      getAll(){return request.cookies.getAll()},
      setAll(items:{name:string;value:string;options?:Record<string,unknown>}[]){
        items.forEach(({name,value})=>request.cookies.set(name,value));
        response=NextResponse.next({request});
        items.forEach(({name,value,options})=>response.cookies.set(name,value,options));
      }
    }
  });
  const {data:{user}}=await supabase.auth.getUser();
  if(!user){
    const target=request.nextUrl.clone();
    target.pathname="/auth";
    target.search="";
    target.searchParams.set("mode","signup");
    target.searchParams.set("next",path);
    const redirect=NextResponse.redirect(target);
    response.cookies.getAll().forEach(cookie=>redirect.cookies.set(cookie));
    return redirect;
  }
  const {data:access,error}=await supabase.from("course_access").select("course_slug").eq("user_id",user.id).eq("course_slug","instagram-growth").maybeSingle();
  if(error||!access){
    const target=request.nextUrl.clone();
    target.pathname="/enroll";
    target.search="";
    target.searchParams.set("next",path);
    const redirect=NextResponse.redirect(target);
    response.cookies.getAll().forEach(cookie=>redirect.cookies.set(cookie));
    return redirect;
  }
  return response;
}
export const config={matcher:["/courses/instagram-growth/:path*"]};
