import { createClient } from "@/lib/supabase/server";

export type BookImage = {
  id: number;
  image_url: string;
  position: number;
};

export type Book = {
  id: number;
  title: string;
  author: string;
  publication_year: number | null;
  genre: string | null;
  cover_image_url: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string;
  book_images: BookImage[];
};

const BOOK_SELECT = "*, book_images(id, image_url, position)";

export async function getBooks(): Promise<Book[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select(BOOK_SELECT)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as unknown as Book[];
}

export async function getBookById(id: number): Promise<Book | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select(BOOK_SELECT)
    .eq("id", id)
    .single();

  if (error) return null;
  return data as unknown as Book;
}
