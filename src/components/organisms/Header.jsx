import { useState, useEffect } from "react";
import { BiMenu, BiX } from "react-icons/bi";

export default function Header({ activeSection }) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    "home",
    "about",
    "services",
    // "faq",
    "portofolio",
    "contact",
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full px-[9%] py-8 md:px-[9%] max-lg:px-[3%] flex justify-between items-center z-40 transition-all duration-300 ${
        isSticky
          ? "bg-[var(--bg-main)]/80 backdrop-blur-md border-b-[0.1rem] border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <a
        href="#"
        className="text-[2.5rem] font-semibold text-[var(--text-main)] transition-colors"
      >
        Karsa<span className="text-[var(--color-primary)]">.Studio</span>
      </a>

      <div
        className="text-[3.6rem] text-[var(--text-main)] cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <BiX /> : <BiMenu />}
      </div>

      <nav
        className={`absolute top-full left-0 w-full bg-[var(--bg-main)] p-[1rem_3%] shadow-[0_0.5rem_1rem_rgba(0,0,0,0.2)] border-t border-[var(--border-color)] md:static md:w-auto md:p-0 md:bg-transparent md:shadow-none md:border-none transition-all duration-300 md:flex ${
          isMenuOpen
            ? "translate-y-0"
            : "max-md:[-translate-y-[1000px]] max-md:opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link}`}
            onClick={() => setIsMenuOpen(false)}
            className={`block text-[2rem] md:text-[1.7rem] my-12 md:my-0 md:ml-16 capitalize transition-all duration-300 font-medium ${
              activeSection === link
                ? "text-[var(--color-primary)]"
                : "text-[var(--text-main)] hover:text-[var(--color-primary)]"
            }`}
          >
            {link}
          </a>
        ))}
      </nav>
    </header>
  );
}
