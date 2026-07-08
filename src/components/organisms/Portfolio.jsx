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

      {/* Loading State saat mengambil data dengan skeleton loading*/}
      {status === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] max-w-[1200px] mx-auto auto-rows-[350px]">
          {[...Array(4)].map((_, index) => {
            // Samakan persis dengan logika bento grid asli agar tidak terjadi lonjakan layout (layout shift)
            const gridSpan =
              index === 0 || index === 3
                ? "md:col-span-2 lg:col-span-2"
                : "md:col-span-1 lg:col-span-1";

            return (
              <div
                key={index}
                className={`w-full h-full rounded-[1.5rem] p-[3rem] flex flex-col justify-end bg-slate-900/40 border border-slate-800/40 animate-pulse relative overflow-hidden ${gridSpan}`}
              >
                {/* Efek Shimmer/Kilatan cahaya meluncur */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>

                <div className="space-y-4">
                  {/* Skeleton Badge Kategori */}
                  <div className="w-28 h-8 rounded-full bg-slate-800/80"></div>
                  {/* Skeleton Judul Proyek */}
                  <div className="w-2/3 h-10 rounded-xl bg-slate-800/80"></div>
                  {/* Skeleton Deskripsi Pendek */}
                  <div className="w-full h-5 rounded-lg bg-slate-800/40"></div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Skeleton Tech Stack */}
                    <div className="w-1/3 h-5 rounded-lg bg-slate-800/60"></div>
                    {/* Skeleton Tombol Bulat */}
                    <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-slate-800/80"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Area Bento Grid */}
      {status === "succeeded" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] max-w-[1200px] mx-auto auto-rows-[350px]">
          {/* Mengambil 4 data teratas dari Database */}
          {portfolios
            .filter((project) => project.is_published !== false)
            .slice() // 1. Buat salinan data agar tidak merusak state asli dari Redux
            .reverse() // 2. Balik urutannya (Dari "Terbaru" menjadi "Terlama di awal")
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
