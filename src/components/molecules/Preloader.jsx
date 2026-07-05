import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg-main)]"
      initial={{ y: 0 }}
      exit={{
        y: "-100%",
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* 1. Ambient Glow (Cahaya lembut di tengah layar yang menyatu dengan tema) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[var(--color-primary)]/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex flex-col items-center relative z-10">
        {/* 2. Teks Utama (Diubah dari text-white menjadi var(--text-main) agar adaptif) */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-[3.8rem] md:text-[5.5rem] font-extrabold text-[var(--text-main)] tracking-tight leading-none"
          >
            Karsa<span className="text-[var(--color-primary)]">.</span>
          </motion.h1>
        </div>

        {/* 3. Teks Tagline Premium */}
        <div className="overflow-hidden mb-12">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="text-[1.2rem] md:text-[1.5rem] tracking-[0.4em] text-[var(--text-muted)] uppercase font-semibold"
          >
            Creative Studio
          </motion.p>
        </div>

        {/* 4. Garis Progres (Treknya memakai var(--text-main) agar terlihat di Light Mode) */}
        <div className="w-[180px] md:w-[240px] h-[3px] bg-[var(--text-main)]/[0.08] rounded-full overflow-hidden relative">
          <motion.div
            // Bar yang terisi kini memiliki efek shadow/glow
            className="absolute top-0 left-0 h-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(6,182,212,0.6)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
