// src/components/organisms/Portfolio.jsx (Sesuaikan jalurnya)
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchPortfolios } from "../../redux/portfolioSlice"; // Import fetch action
import PortfolioCard from "../molecules/PortfolioCard";

export default function Portfolio({ ref }) {
  const dispatch = useDispatch();
  // Mengambil state dari Redux
  const { items: portfolios, status } = useSelector((state) => state.portfolio);

  // Ambil data jika status masih 'idle' (saat komponen pertama kali muncul)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPortfolios());
    }
  }, [status, dispatch]);

  return (
    <section
      ref={ref}
      id="portofolio"
      className="min-h-screen py-24 px-[5%] md:px-[9%] bg-[var(--bg-main)] scroll-mt-[10rem] relative"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-[6rem]"
      >
        <h2 className="text-[3.5rem] md:text-[4.5rem] font-bold mb-4 text-[var(--text-main)]">
          Karya <span className="text-[var(--color-primary)]">Terbaik</span>{" "}
          Kami
        </h2>
        <p className="text-[1.6rem] md:text-[1.8rem] text-[var(--text-muted)] max-w-[650px] mx-auto leading-relaxed">
          Bukti nyata bagaimana kami meramu logika kode dan estetika desain
          menjadi produk digital yang siap mengangkat skala bisnis klien.
        </p>
      </motion.div>

      {/* Loading State saat mengambil data */}
      {status === "loading" && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Area Bento Grid */}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] max-w-[1200px] mx-auto auto-rows-[350px]">
          {/* Mengambil 4 data teratas dari Database */}
          {portfolios
            .filter((project) => project.is_published !== false)
            .slice(0, 4)
            .map((project, index) => {
              const gridSpan =
                index === 0 || index === 3
                  ? "md:col-span-2 lg:col-span-2"
                  : "md:col-span-1 lg:col-span-1";

              return (
                <PortfolioCard
                  key={project.id}
                  project={project} // Data aslinya dikirim ke PortfolioCard
                  index={index}
                  className={`min-h-[350px] h-full ${gridSpan}`}
                />
              );
            })}
        </div>
      )}

      {/* Dekorasi Glow Latar Belakang */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </section>
  );
}
