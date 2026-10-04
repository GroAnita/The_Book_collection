"use client";

import { Checkbox } from "@headlessui/react";
import { useState } from "react";
import { Filter as FilterIcon } from "lucide-react";

type FilterProps = {
  genres: string[];
};

export default function Filter({ genres }: FilterProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4 w-full bg-background border border-accent p-2 rounded-md">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-text font-lg font-nunito font-semibold"
      >
        <FilterIcon className="size-5" />
        Filter by Genre
      </button>
      {open && (
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
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
      )}
    </div>
  );
}
