

import BookCard from "@/components/BookCard";   

export default function BookDetailPage() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h1 className="text-3xl font-semibold font-fraunces text-text">Book Detail Page</h1>
      <BookCard />
    </div>
  );
}