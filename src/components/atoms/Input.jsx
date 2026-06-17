export default function Input({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isTextArea = false,
  required = false,
}) {
  const baseClass =
    "w-full p-[1.5rem] bg-[var(--bg-main)] border border-[var(--border-color)] rounded-[1.2rem] text-[1.6rem] text-[var(--text-main)] transition-all duration-300 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 placeholder:text-[var(--text-muted)]";

  if (isTextArea) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows="5"
        className={`${baseClass} resize-none mt-[1.5rem]`}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${baseClass} mt-[1.5rem]`}
    />
  );
}
