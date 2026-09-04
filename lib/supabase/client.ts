import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { hasSupabase } from "@/lib/utils";

export function supabaseBrowser(): SupabaseClient | null {
  if (!hasSupabase()) return null;
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
