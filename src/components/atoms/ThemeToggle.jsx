import { BiMoon, BiSun } from "react-icons/bi";
import useDarkMode from "../../hooks/useDarkMode";

export default function ThemeToggle() {
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-[1rem] rounded-full bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/30 transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? <BiSun size={22} /> : <BiMoon size={22} />}
    </button>
  );
}
