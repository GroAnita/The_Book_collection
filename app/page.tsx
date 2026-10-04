
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import AddBookSection from "@/components/AddBookSection";
import LibraryCard from "@/components/LibraryCard";
import { getGenres } from "@/lib/genres";
import { getBooks } from "@/lib/books";


export default async function Home() {
  const [genres, books] = await Promise.all([getGenres(), getBooks()]);
  return (
    <div>
      <main className="flex flex-col items-center py-16 px-16  dark:bg-black">
        <BookOpen className="h-20 w-20 text-badges dark:text-zinc-50" />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left bg-background p-4 rounded-md">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-text font-fraunces dark:text-zinc-50">
            Your Book Collection
          </h1>
          <p className="max-w-md text-lg font-nunito font-semiboldleading-8 text-zinc-600 dark:text-zinc-400">
            Read, rank, and organize your books in one convenient place.
          </p>
          <Search />
          <Filter genres={genres} />
          <section className="flex flex-row gap-2 mx-auto">
            <AddBookSection genres={genres} />
          </section>
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
            {books.map((book) => (
              <Link key={book.id} href={`/BookDetail/${book.id}`}>
                <LibraryCard book={book} />
              </Link>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}



