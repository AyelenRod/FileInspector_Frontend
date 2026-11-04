export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block rounded-full bg-accent/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-danger">
      {category}
    </span>
  );
}
