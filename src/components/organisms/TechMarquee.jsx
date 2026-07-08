export default function TechMarquee() {
  // Menggunakan link SVG asli dari Devicon (Stabil dan Sangat Ringan)
  const techStack = [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Supabase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
    },
    {
      name: "Figma",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    },
    {
      name: "Framer Motion",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "GitHub",
      // Menggunakan icon github, invert otomatis menyesuaikan tema jika diperlukan, tapi kita pakai original
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    },
  ];

  // Gandakan array agar animasinya tersambung tanpa putus (seamless loop)
  const duplicatedTech = [...techStack, ...techStack, ...techStack];

  return (
    <div className="w-full relative py-12 overflow-hidden bg-[var(--bg-main)] border-y border-[var(--border-color)]/20 flex flex-col items-center">
      {/* Label Best Practice (Memberi konteks pada Marquee) */}
      <p className="text-[1.1rem] font-semibold text-[var(--text-muted)] tracking-[0.3em] uppercase mb-10 text-center">
        Diberdayakan Oleh Teknologi Terbaik
      </p>

      {/* Efek Gradasi Bayangan Kiri & Kanan (Vignette) */}
      <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>

      {/* Kontainer Animasi */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] transition-all">
        {duplicatedTech.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-10 mx-4 group cursor-pointer"
          >
            {/* LOGO ASLI - Efek Grayscale to Color */}
            <img
              src={tech.logo}
              alt={`${tech.name} logo`}
              className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out drop-shadow-sm group-hover:drop-shadow-xl group-hover:scale-110"
            />

            {/* NAMA TEKNOLOGI */}
            <span className="text-[1.6rem] md:text-[2rem] font-bold text-[var(--text-main)] opacity-40 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
