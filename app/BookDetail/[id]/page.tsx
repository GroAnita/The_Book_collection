import Link from "next/link";
import { notFound } from "next/navigation";
import BookCard from "@/components/BookCard";
import { getBookById } from "@/lib/books";

export default async function BookDetailPage({
  params,
}: PageProps<"/BookDetail/[id]">) {
  const { id } = await params;
  const book = await getBookById(Number(id));

  if (!book) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <section className="flex flex-row items-center p-1 w-full">
        <Link href="/">
          <p className="text-button font-nunito font-semibold">-Go back</p>
        </Link>
      </section>
      <h1 className="text-3xl font-semibold font-fraunces text-text">
        Book Detail Page
      </h1>
      <BookCard book={book} />
    </div>
  );
}
