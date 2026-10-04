import { createClient } from "@/lib/supabase/server";

export async function getGenres(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("genres")
    .select("name")
    .order("name");

  if (error) throw error;
  return data.map((row) => row.name);
}
