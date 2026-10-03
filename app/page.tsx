//import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import Search from "@/components/Search";
import Filter from "@/components/Filter";

export default function Home() {
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
          <Filter />
          <Link
            href="/BookDetail"
            className="rounded-md bg-button px-4 py-2 text-background hover:bg-background hover:text-button hover:border hover:border-button"
          >
            View Book Details
          </Link>
        </div>
      </main>
    </div>
  );
}
