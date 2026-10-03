//import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-background dark:bg-black">
        <BookOpen
          className="h-10 w-10 text-pink-500 dark:text-zinc-50"
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Your Book Collection
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Read, rank, and organize your books in one convenient place.
          </p>
          <Link
            href="/BookDetail"
            className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            View Book Details
          </Link>

        </div>
     
      </main>
    </div>
  );
}
