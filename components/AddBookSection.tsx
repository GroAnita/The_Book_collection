"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddNewBook from "./AddNewBook";

type AddBookSectionProps = {
  genres: string[];
};

export default function AddBookSection({ genres }: AddBookSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md bg-button px-4 py-2 text-background hover:bg-background hover:text-button hover:border hover:border-button"
      >
        <Plus className="inline-block h-4 w-4 mr-2" />
        Add New Book
      </button>
      {open && (
        <section className="flex flex-col gap-4 w-full">
          <AddNewBook genres={genres} />
        </section>
      )}
    </>
  );
}
