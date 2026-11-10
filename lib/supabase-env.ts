// Supabase connection settings. If they are missing (for example on a Vercel preview
// without environment variables) pages still render, signed out, instead of crashing.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabaseConfigured = Boolean(url && key);
export const supabaseUrl = url || "https://supabase-not-configured.invalid";
export const supabaseKey = key || "supabase-not-configured";

if (!supabaseConfigured) {
  console.warn("Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
}
