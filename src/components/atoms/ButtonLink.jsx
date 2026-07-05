export default function ButtonLink({ href, icon, text, variant = "primary" }) {
  const baseClass =
    "flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all shadow-sm";

  const variants = {
    primary:
      "bg-[var(--color-primary)] text-white hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
    // Perbaikan: Gunakan var(--text-main) agar adaptif di Light/Dark mode
    glass:
      "bg-[var(--text-main)]/[0.03] border border-[var(--text-main)]/10 text-[var(--text-main)] hover:bg-[var(--text-main)]/[0.08] backdrop-blur-md",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${baseClass} ${variants[variant]}`}
    >
      {icon} {text}
    </a>
  );
}
