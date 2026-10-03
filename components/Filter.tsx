"use client";

import { Checkbox } from "@headlessui/react";
import { useState } from "react";

export default function Filter() {
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Sci-Fi",
    "Fantasy",
    "Romantasy",
    "Romance",
  ];
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-col items-start gap-4 w-full bg-background border-2 border-accent p-2 ">
      <h1 className="text-text font-lg font-nunito font-semibold">
        Filter by Genre
      </h1>
      <div className="flex flex-col items-start gap-2">
        {genres.map((genre) => (
          <label key={genre} className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={checked[genre] ?? false}
              onChange={(value) =>
                setChecked((prev) => ({ ...prev, [genre]: value }))
              }
              className="group block size-4 shrink-0 rounded border bg-background data-checked:bg-button"
            >
              <svg
                className="stroke-white opacity-0 group-data-checked:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
            <span className="text-text font-nunito">{genre}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
