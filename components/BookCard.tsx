import Image from "next/image";
import { Star, StarHalf, Dot } from "lucide-react";

export default function BookCard() {
  return (
    <div className="flex flex-col items-center gap-4 p-1">
        <Image
          src="/books/starside.jpg"
          alt="Book Cover"
          width={150}
          height={200}
          className="rounded-md shadow-md"
        />
        <div className="flex flex-row items-center gap-0.5s">
          <Dot className="text-accent fill-accent" />
           <Dot className="text-accent fill-accent" />
            <Dot className="text-accent fill-accent" />
        </div>
    <section className="flex flex-row items-center gap-4 w-full justify-center">
   
     <Star className="text-stars fill-stars" />
     <Star className="text-stars fill-stars" />
     <Star className="text-stars fill-stars" />
     <Star className="text-stars fill-stars" />
      <StarHalf className="text-stars fill-stars" />
    </section>  
    <section className="flex flex-col items-start gap-4 w-full bg-background border border-accent p-4 rounded-md">
    <p className="text-text font-nunito">Book started: 15 september 2026</p>
     <p className="text-text font-nunito">Book finished: 15 october 2026</p>
      <p className="text-text text-sm bg-badges rounded p-1 font-nunito">Audio book</p>
   </section>     
    <div className="border-2 border-accent p-2 rounded-md shadow-md bg-card-background items-center flex flex-col">
      <h2 className="text-xl text-text font-semibold font-fraunces mb-2">Book Title</h2>
      <p className="text-text p-1 rounded font-nunito dark:text-zinc-400">Hundreds of years ago, a brutal war split a land in two. Starside is the realm of magic and immortals—the descendants of the gods, living in a power-rich paradise. Stormside is where mortals fight for scraps of that magic.
</p>

    </div>
    <section className="flex flex-row items-center gap-4 w-full justify-center">
    <span className="bg-badges p-1 rounded-md text-text text-sm border border-button font-nunito shadow-md">Fantasy</span>
     <span className=" bg-badges p-1 rounded-md text-text text-sm border border-button font-nunito shadow-md">Romantasy</span>
      <span className=" bg-badges p-1 rounded-md text-text text-sm border border-button font-nunito shadow-md">Adventure</span>
       <span className=" bg-badges p-1 rounded-md border text-sm border-button text-text font-nunito shadow-md">Adult</span>
    </section>
    <button className=" p-3 rounded-md shadow-md border-2 border-button bg-background text-button font-semibold font-fraunces hover:bg-button hover:text-background">
      Read More
    </button>
    </div>
  );
}