"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, StarHalf, Dot, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import DropDownMenu from "./DropDownMenu";
import type { Book } from "@/lib/books";

const FALLBACK_COVER = "/books/starside.jpg";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  const images = [...book.book_images].sort((a, b) => a.position - b.position);
  const [imageIndex, setImageIndex] = useState(0);
  const coverSrc = images[imageIndex]?.image_url ?? book.cover_image_url ?? FALLBACK_COVER;

  const rating = book.rating ?? 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  function showPrevImage() {
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  }

  function showNextImage() {
    setImageIndex((i) => (i + 1) % images.length);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-1">
     <div className="relative">   
      <Image
        src={coverSrc}
        alt={`${book.title} cover`}
        width={150}
        height={200}
        className="rounded-md shadow-md "
      />
      {images.length > 1 && (
        <>
          <button onClick={showPrevImage} aria-label="Previous image">
            <ArrowLeftIcon className="absolute top-24 left-1 text-accent bg-button/50 rounded-full size-4" />
          </button>
          <button onClick={showNextImage} aria-label="Next image">
            <ArrowRightIcon className="absolute top-24 right-1 text-accent bg-button/50 rounded-full size-4" />
          </button>
        </>
      )}
    <DropDownMenu onEdit={() => {}} onDelete={() => {}} className="absolute top-1 right-1" />
      </div>

      <div className="flex flex-row items-center gap-0.5s">
        <Dot className="text-accent fill-accent" />
        <Dot className="text-accent fill-accent" />
        <Dot className="text-accent fill-accent" />
      </div>
      <section className="flex flex-row items-center gap-4 w-full justify-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="text-stars fill-stars" />
        ))}
        {hasHalfStar && <StarHalf className="text-stars fill-stars" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="text-stars" />
        ))}
      </section>
      <section className="flex flex-col items-start gap-4 w-full bg-background border border-accent p-4 rounded-md">
        <p className="text-text font-nunito">Author: {book.author}</p>
        {book.publication_year && (
          <p className="text-text font-nunito">Published: {book.publication_year}</p>
        )}
      </section>
      <div className="border-2 border-accent p-2 rounded-md shadow-md bg-card-background items-center flex flex-col">
        <h2 className="text-xl text-text font-semibold font-fraunces mb-2">
          {book.title}
        </h2>
        <p className="text-text p-1 rounded font-nunito dark:text-zinc-400">
          {book.comment}
        </p>
      </div>
      {book.genre && (
        <section className="flex flex-row items-center gap-4 w-full justify-center">
          <span className="bg-badges p-1 rounded-md text-text-darker text-sm border border-button font-fraunces shadow-md">
            {book.genre}
          </span>
        </section>
      )}
      <Link
        href={`/BookDetail/${book.id}`}
        className="p-3 rounded-md shadow-md border-2 border-button bg-background text-button font-semibold font-fraunces hover:bg-button hover:text-background"
      >
        Read More
      </Link>
    </div>
  );
}

