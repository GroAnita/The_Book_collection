import Link from "next/link";
import BookCard from "@/components/BookCard";

export default function BookDetailPage() {
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
      <BookCard />
    </div>
  );
}
