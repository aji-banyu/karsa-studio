export default function TechBadge({ name }) {
  return (
    <span className="px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-lg text-[1.4rem] font-medium">
      {name}
    </span>
  );
}
