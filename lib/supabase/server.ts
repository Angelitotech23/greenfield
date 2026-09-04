import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase } from "@/lib/utils";

export function supabaseServer(): SupabaseClient | null {
  if (!hasSupabase()) return null;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false },
  });
}
