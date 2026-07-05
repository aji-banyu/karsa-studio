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
      className={`group relative w-full rounded-[1.5rem] overflow-hidden shadow-lg border border-[var(--border-color)]/20 ${className}`}
    >
      {/* Area Gambar Utama dari Supabase */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out group-hover:scale-110 group-hover:rotate-1 bg-slate-800">
        {project.image_urls && project.image_urls[0] && (
          <img
            src={project.image_urls[0]}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Overlay Gelap agar teks terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Konten Teks */}
      <div className="absolute inset-0 flex flex-col justify-end p-[2.5rem] md:p-[3rem] z-10">
        <motion.div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[var(--color-primary)] text-[1.2rem] font-medium tracking-wide">
            <BiCodeAlt className="text-[1.6rem]" />
            <span>{project.category}</span>
          </div>

          <h3 className="text-white text-[2.4rem] md:text-[2.8rem] font-bold mb-2 leading-snug drop-shadow-md">
            {project.title}
          </h3>

          <p className="text-gray-300 text-[1.4rem] line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-[var(--color-primary)] text-[1.3rem] font-semibold tracking-wider uppercase truncate max-w-[70%]">
              {/* Langsung render tech_stack karena sudah berbentuk string dari form */}
              {project.tech_stack || "Teknologi belum diatur"}
            </span>

            {/* Tombol Menuju Halaman Detail */}
            <Link
              to={`/portfolio/${project.id}`}
              className="flex items-center justify-center shrink-0 w-[4.5rem] h-[4.5rem] rounded-full bg-white text-black hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            >
              <BiRightArrowAlt className="text-[2.6rem]" />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
