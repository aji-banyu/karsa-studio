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
      className="fixed bottom-12 left-12 z-50 p-[1.2rem] rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30 transition-transform duration-300 hover:scale-110 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? <BiSun size={24} /> : <BiMoon size={24} />}
    </button>
  );
}
