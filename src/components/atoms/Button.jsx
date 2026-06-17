export default function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}) {
  // Efek Neon: box-shadow memancarkan warna primary
  const baseClass =
    "inline-block px-[2.8rem] py-[1.2rem] bg-[var(--color-primary)] text-white text-[1.6rem] font-semibold rounded-[0.8rem] shadow-[0_0_1rem_var(--color-primary)] transition-all duration-300 hover:shadow-[0_0_2rem_var(--color-primary)] hover:scale-105 cursor-pointer";

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
    >
      {children}
    </button>
  );
}
