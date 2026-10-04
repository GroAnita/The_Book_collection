"use client";

import { Input, Listbox, ListboxOption, ListboxButton, ListboxSelectedOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AddNewBookProps = {
  genres: string[];
};

export default function AddNewBook({ genres }: AddNewBookProps) {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const MAX_IMAGES = 5;
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length > MAX_IMAGES) {
      setErrorMessage(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }
    setErrorMessage(null);
    setCoverFiles(files);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const { data: newBook, error: insertError } = await supabase
      .from("books")
      .insert({
        title,
        author,
        publication_year: publicationYear ? Number(publicationYear) : null,
        genre,
        rating: rating ? Number(rating) : null,
        comment,
      })
      .select()
      .single();

    if (insertError || !newBook) {
      setErrorMessage(insertError?.message ?? "Failed to save book.");
      setSubmitting(false);
      return;
    }

    const imageUrls: string[] = [];
    for (const file of coverFiles) {
      const filePath = `${newBook.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("book-covers")
        .upload(filePath, file);

      if (uploadError) {
        setErrorMessage(uploadError.message);
        setSubmitting(false);
        return;
      }

      const { data } = supabase.storage.from("book-covers").getPublicUrl(filePath);
      imageUrls.push(data.publicUrl);
    }

    if (imageUrls.length > 0) {
      const { error: imagesError } = await supabase.from("book_images").insert(
        imageUrls.map((url, index) => ({
          book_id: newBook.id,
          image_url: url,
          position: index,
        }))
      );

      if (imagesError) {
        setErrorMessage(imagesError.message);
        setSubmitting(false);
        return;
      }

      await supabase
        .from("books")
        .update({ cover_image_url: imageUrls[0] })
        .eq("id", newBook.id);
    }

    setSubmitting(false);
    setTitle("");
    setAuthor("");
    setPublicationYear("");
    setGenre(null);
    setCoverFiles([]);
    setRating("");
    setComment("");
  }

  return (
    <div className="flex flex-col gap-4 items-center ">
      <h1 className="text-2xl font-fraunces font-semibold text-text dark:text-zinc-50">Add a New Book</h1>
     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input className="p-2 border-2 border-badges-dark rounded-md"
        name="title"
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input className="p-2 border-2 border-badges-dark rounded-md"
        name="author"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Input className="p-2 border-2 border-badges-dark rounded-md"
        name="publicationYear"
        type="number"
        placeholder="Publication Year"
        value={publicationYear}
        onChange={(e) => setPublicationYear(e.target.value)}
      />
      <Listbox value={genre} onChange={setGenre} >
        <ListboxButton className="p-2 border-2 border-badges-dark rounded-md">
          <ListboxSelectedOption
            placeholder="Select Genre"
            options={genres.map((g) => (
              <ListboxOption key={g} value={g}>
                {g}
              </ListboxOption>
            ))}
          />
        </ListboxButton>
        <ListboxOptions anchor="bottom" className="bg-background border-2 border-badges-dark rounded-md mt-2  ">
          {genres.map((genre) => (
            <ListboxOption key={genre} value={genre} className="p-2 font-nunito text-text font-semibold hover:bg-accent hover:text-background hover:border-b hover:border-badges-dark">
              {genre}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="p-2 border-2 border-badges-dark rounded-md font-nunito text-text"
      />
      {coverFiles.length > 0 && (
        <p className="text-sm text-text font-nunito">
          {coverFiles.length} image{coverFiles.length > 1 ? "s" : ""} selected (max {MAX_IMAGES})
        </p>
      )}
      <Input className="p-2 border-2 border-badges-dark rounded-md"
        name="rating"
        type="number"
        min={0}
        max={5}
        step={0.5}
        placeholder="Rating (0-5)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <textarea
        name="comment"
        placeholder="Your thoughts on this book"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-2 border-2 border-badges-dark rounded-md font-nunito text-text"
      />
      {errorMessage && (
        <p className="text-sm text-red-600 font-nunito">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-button px-4 py-2 text-background hover:text-accent hover:bg-button-dark disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Book"}
      </button>
     </form>
    </div>
  );
}