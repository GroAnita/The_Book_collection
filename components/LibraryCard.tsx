import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import type { Book } from "@/lib/books";

const FALLBACK_COVER = "/books/starside.jpg";
const NEW_THRESHOLD_DAYS = 3;

type LibraryCardProps = {
  book: Book;
};

export default function LibraryCard({ book }: LibraryCardProps) {
  const isNew =
    Date.now() - new Date(book.created_at).getTime() <
    NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;

  const rating = book.rating ?? 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex flex-col items-center gap-1  bg-background border border-accent p-2 rounded-md">
        <div className="relative">
            <Image
              src={book.cover_image_url ?? FALLBACK_COVER}
              alt={`${book.title} cover`}
              width={75}
              height={75}
              className="rounded-md"
            />
            {isNew && (
              <div className="absolute bottom-0 right-0 bg-accent text-background text-xs px-1 rounded-md">
                New
              </div>
            )}
        </div>
      <h1 className="text-text font-lg font-nunito font-semibold">
        {book.title} by {book.author}
      </h1>
      <section className="flex flex-row items-center gap-2 w-full justify-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="text-stars fill-stars size-3" />
        ))}
        {hasHalfStar && <StarHalf className="text-stars fill-stars size-3" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="text-stars size-3" />
        ))}
      </section>
    </div>
  );
}
