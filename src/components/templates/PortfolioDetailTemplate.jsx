import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";
import PortfolioHeader from "../organisms/PortfolioHeader";
import PortfolioGallery from "../organisms/PortfolioGallery";
import PortfolioOverview from "../organisms/PortfolioOverview";

export default function PortfolioDetailTemplate({ project }) {
  const navigate = useNavigate();

  // Memastikan tech_stack dari Supabase (yang berupa string koma "React, Tailwind")
  // diubah menjadi format Array agar bisa dilooping oleh komponen PortfolioOverview
  const formattedTechStack = project.tech_stack
    ? project.tech_stack.split(",").map((tech) => tech.trim())
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[var(--bg-main)] relative overflow-hidden py-16 px-[5%] md:px-[9%]"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-[1200px] mx-auto relative z-10 pt-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-[var(--text-main)]/[0.03] border border-[var(--text-main)]/10 text-[var(--text-main)] hover:bg-[var(--text-main)]/[0.08] transition-all duration-300 backdrop-blur-md cursor-pointer"
        >
          <BiArrowBack className="text-[1.8rem] group-hover:-translate-x-1 transition-transform" />
          <span className="text-[1.4rem] font-semibold">Kembali</span>
        </motion.button>

        {/* Kirim seluruh data project ke Header (termasuk status, source_code, figma_link) */}
        <PortfolioHeader project={project} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-[var(--bg-main)] border border-[var(--text-main)]/15 rounded-[1.2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] mb-20"
        >
          {/* Window Header */}
          <div className="h-[2.8rem] bg-[var(--text-main)]/[0.03] border-b border-[var(--text-main)]/10 flex items-center px-4 gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-500"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500"></div>
          </div>

          <div className="w-full">
            {/* Supabase menggunakan image_urls sebagai array, pastikan ada fallback [] */}
            <PortfolioGallery
              images={project.image_urls || []}
              title={project.title}
            />
          </div>
        </motion.div>

        <PortfolioOverview
          // Supabase menggunakan kolom 'description'
          description={project.description}
          techStack={formattedTechStack}
        />
      </div>
    </motion.main>
  );
}
