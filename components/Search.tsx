export default function Search() {
  return (
    <div className="flex flex-col items-center gap-4 w-full bg-background  p-1 ">
      <input
        type="text"
        placeholder="Search for a book..."
        className="p-2 rounded-md border border-accent w-full"
      />
    </div>
  );
}
