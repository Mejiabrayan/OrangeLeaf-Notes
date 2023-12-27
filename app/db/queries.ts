import { SupabaseClient } from "@supabase/supabase-js";

type Client = SupabaseClient;
 
export async function fetchNotes(
  client: Client,
  userId: string
) {
  return client
    .from('notes')
    .select(
      `
    *,
  `
    )
    .eq('user_id', userId);
}