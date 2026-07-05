export default function Badge({ text, colorClass }) {
  return (
    <span
      className={`inline-block py-1 px-4 rounded-full text-[1.2rem] font-medium border ${colorClass}`}
    >
      {text}
    </span>
  );
}
