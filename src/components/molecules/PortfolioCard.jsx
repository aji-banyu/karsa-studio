import { motion } from "framer-motion";
import { BiCodeAlt, BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function PortfolioCard({ project, index, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative w-full rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl border border-[var(--border-color)]/60 transition-shadow duration-500 ${className}`}
    >
      {/* Area Gambar Utama */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1 bg-slate-200 dark:bg-slate-800">
        {project.image_urls && project.image_urls[0] && (
          <img
            src={project.image_urls[0]}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* PERBAIKAN: Overlay Gradasi Selalu Gelap (Skema Harmonis) */}
      {/* Menggunakan from-slate-950 agar teks putih selalu tajam di mode Light maupun Dark */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500"></div>

      {/* Konten Teks */}
      <div className="absolute inset-0 flex flex-col justify-end p-[2.5rem] md:p-[3rem] z-10">
        <motion.div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {/* Badge Kategori - Efek Glassmorphism */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-primary)] text-[1.2rem] font-medium tracking-wide shadow-sm">
            <BiCodeAlt className="text-[1.6rem]" />
            <span>{project.category}</span>
          </div>

          {/* Judul Proyek (Teks Putih Kontras) */}
          <h3 className="text-white text-[2.4rem] md:text-[2.8rem] font-bold mb-2 leading-snug drop-shadow-md">
            {project.title}
          </h3>

          {/* Deskripsi */}
          <p className="text-slate-300 text-[1.4rem] line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            {/* Teknologi yang digunakan */}
            <span className="text-[var(--color-primary)] text-[1.3rem] font-semibold tracking-wider uppercase truncate max-w-[70%] drop-shadow-sm">
              {project.tech_stack || "Teknologi belum diatur"}
            </span>

            {/* Tombol Panah (Aksi) */}
            <Link
              to={`/portfolio/${project.id}`}
              className="flex items-center justify-center shrink-0 w-[4.5rem] h-[4.5rem] rounded-full bg-white text-slate-900 hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 shadow-xl"
            >
              <BiRightArrowAlt className="text-[2.6rem]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
