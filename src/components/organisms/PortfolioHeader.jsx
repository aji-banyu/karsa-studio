// src/components/organisms/PortfolioHeader.jsx
import { motion } from "framer-motion";
import Badge from "../atoms/Badge";
import SmartCTA from "../molecules/SmartCTA";

export default function PortfolioHeader({ project }) {
  // Konfigurasi ini dibuat fleksibel untuk mengakomodasi teks status dari Supabase
  const badgeConfig = {
    // Sesuaikan kunci-nya dengan value dari Supabase ('Completed', 'In Progress', dll)
    // Di-lowercase agar aman saat pencocokan
    completed: {
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      text: "Completed",
    },
    "in progress": {
      color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      text: "In Progress",
    },
    maintenance: {
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      text: "Maintenance",
    },
  };

  // Mengambil konfigurasi badge, pastikan status ada dan di-lowercase
  const statusKey = project.status ? project.status.toLowerCase() : "completed";
  const activeBadge = badgeConfig[statusKey] || badgeConfig.completed;

  return (
    <div className="flex flex-col gap-4 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <h1 className="text-[3.5rem] md:text-[5rem] font-extrabold text-[var(--text-main)] leading-[1.1] tracking-tight">
          {project.title}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-y border-[var(--text-main)]/10 mt-6"
      >
        <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
          <div>
            <p className="text-[1.1rem] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
              Kategori
            </p>
            <p className="text-[1.6rem] font-semibold text-[var(--text-main)]">
              {project.category}
            </p>
          </div>
          <div>
            <p className="text-[1.1rem] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-2">
              Status
            </p>
            {/* Tampilkan Badge dinamis berdasarkan status */}
            <Badge text={activeBadge.text} colorClass={activeBadge.color} />
          </div>
        </div>

        <SmartCTA
          // Asumsi kamu tidak ada 'liveLink' di form, jadi kosongkan atau gunakan null
          liveLink={null}
          sourceLink={project.source_code} // Diambil dari Supabase
          figmaLink={project.figma_link} // Diambil dari Supabase
        />
      </motion.div>
    </div>
  );
}
