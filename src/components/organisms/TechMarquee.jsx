import {
  BiCodeCurly,
  BiLayer,
  BiServer,
  BiPalette,
  BiRocket,
  BiDesktop,
} from "react-icons/bi";

export default function TechMarquee() {
  // Daftar teknologi/keahlian Karsa Studio
  const techStack = [
    { name: "React JS", icon: <BiCodeCurly /> },
    { name: "Tailwind CSS", icon: <BiLayer /> },
    { name: "Supabase", icon: <BiServer /> },
    { name: "Figma UI/UX", icon: <BiPalette /> },
    { name: "Framer Motion", icon: <BiRocket /> },
    { name: "Web Development", icon: <BiDesktop /> },
  ];

  // Kita gandakan array-nya (2x atau 3x) agar saat animasi bergeser,
  // ujung belakangnya langsung menyambung tanpa ruang kosong
  const duplicatedTech = [...techStack, ...techStack, ...techStack];

  return (
    <div className="w-full relative py-12 overflow-hidden bg-[var(--bg-main)] border-y border-[var(--border-color)]/20">
      {/* Efek Gradasi Bayangan di Kiri dan Kanan agar muncul/hilangnya terlihat halus */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>

      {/* Kontainer yang bergerak menggunakan animasi yang kita buat di index.css */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] transition-all">
        {duplicatedTech.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8 mx-4 group cursor-pointer"
          >
            <span className="text-[2rem] text-[var(--text-muted)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
              {tech.icon}
            </span>
            <span className="text-[1.8rem] font-bold text-[var(--text-main)] opacity-70 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {tech.name}
            </span>
            {/* Pemisah antar teks berupa titik kecil */}
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]/30 ml-8"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
