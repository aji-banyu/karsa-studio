// src/components/organisms/PortfolioOverview.jsx
import { motion } from "framer-motion";
import TechBadge from "../atoms/TechBadge";

export default function PortfolioOverview({ description, techStack }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-2 space-y-6"
      >
        <h3 className="text-[2.4rem] font-bold text-[var(--text-main)]">
          Tinjauan Proyek
        </h3>
        <p className="text-[1.6rem] text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
          {/* whitespace-pre-line menjaga jarak antar paragraf (enter) yang ditulis di form deskripsi */}
          {description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 rounded-3xl p-8 shadow-sm h-fit"
      >
        <h3 className="text-[2rem] font-bold text-[var(--text-main)] mb-6">
          Teknologi Utama
        </h3>
        <div className="flex flex-wrap gap-3">
          {/* Mencegah error jika techStack undefined atau kosong */}
          {techStack && techStack.length > 0 ? (
            techStack.map((tech, i) => <TechBadge key={i} name={tech} />)
          ) : (
            <span className="text-[1.4rem] text-[var(--text-muted)]">
              Belum ada teknologi yang ditambahkan.
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
