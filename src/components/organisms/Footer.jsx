import { motion } from "framer-motion";
import {
  BiLogoInstagramAlt,
  BiLogoWhatsapp,
  // BiLogoGithub,
  BiUpArrowAlt,
} from "react-icons/bi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Fungsi untuk scroll mulus ke atas
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] pt-[6rem] pb-[3rem] px-[9%] relative overflow-hidden">
      {/* Dekorasi Cahaya di Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-(--color-primary)/5 blur-[80px] pointer-events-none z-0"></div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[4rem] md:gap-[8rem] relative z-10 mb-[5rem]">
        {/* Kolom 1: Brand & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="#home"
            className="text-[3rem] font-bold text-[var(--text-main)] transition-colors inline-block mb-4"
          >
            Karsa<span className="text-[var(--color-primary)]">.Studio</span>
          </a>
          <p className="text-[1.6rem] text-[var(--text-muted)] leading-relaxed mb-6">
            Mitra digital terpercaya untuk UMKM dan Startup. Kami merancang
            antarmuka indah dan mengembangkan website berkinerja tinggi untuk
            meningkatkan bisnis Anda.
          </p>
          {/* Ikon Sosial Media Kecil */}
          <div className="flex gap-4">
            {[
              {
                Icon: BiLogoInstagramAlt,
                url: "https://www.instagram.com/karsa_studi?igsh=MW13aWtodnNoY2R6dQ==",
              },
              {
                Icon: BiLogoWhatsapp,
                url: "https://wa.me/6287819844990?text=",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[4rem] h-[4rem] rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center text-[2rem] text-[var(--text-muted)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_1rem_var(--color-primary)]"
              >
                <item.Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Kolom 2: Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-[2.2rem] font-semibold text-[var(--text-main)] mb-6">
            Tautan Cepat
          </h3>
          <ul className="flex flex-col gap-4 text-[1.6rem] list-none">
            {["Home", "About", "Services", "Portofolio", "Contact"].map(
              (item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {item}
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {/* Kolom 3: Jam Operasional / Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[2.2rem] font-semibold text-[var(--text-main)] mb-6">
            Jam Operasional
          </h3>
          <ul className="flex flex-col gap-4 text-[1.6rem] text-[var(--text-muted)]">
            <li className="flex justify-between border-b border-[var(--border-color)] pb-2">
              <span>Senin - Jumat:</span>
              <span className="font-medium text-[var(--text-main)]">
                09:00 - 17:00
              </span>
            </li>
            <li className="flex justify-between border-b border-[var(--border-color)] pb-2">
              <span>Sabtu:</span>
              <span className="font-medium text-[var(--text-main)]">
                09:00 - 14:00
              </span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Minggu:</span>
              <span className="font-medium text-rose-500">Tutup (Libur)</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Garis Pemisah & Copyright */}
      <div className="max-w-[1200px] mx-auto border-t border-[var(--border-color)] pt-[3rem] flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-[1.4rem] text-[var(--text-muted)] text-center md:text-left">
          &copy; {currentYear}{" "}
          <span className="text-[var(--color-primary)] font-semibold">
            Karsa Studio
          </span>
          . All Rights Reserved.
        </p>

        {/* Tombol Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[1.4rem] text-[var(--text-main)] hover:text-[var(--color-primary)] transition-colors group cursor-pointer px-4 py-2 rounded-full border border-transparent hover:border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/5"
        >
          <span>Kembali ke Atas</span>
          <div className="w-[3rem] h-[3rem] rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all duration-300 group-hover:-translate-y-1">
            <BiUpArrowAlt className="text-[2rem]" />
          </div>
        </button>
      </div>
    </footer>
  );
}
