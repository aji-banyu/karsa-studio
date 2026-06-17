import { motion } from "framer-motion";
import { BiCheckCircle, BiRocket, BiGroup, BiAward } from "react-icons/bi";

export default function About({ ref }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.2, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="min-h-screen flex items-center py-28 px-[5%] md:px-[9%] bg-[var(--bg-main)] relative overflow-hidden scroll-mt-[3rem]"
    >
      <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-[6rem] items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center items-center w-full order-2 lg:order-1"
        >
          <div className="w-full max-w-[420px] aspect-[4/5] bg-white/[0.03] backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-8 relative group overflow-hidden">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--color-primary)]/20 rounded-full blur-[40px] group-hover:bg-[var(--color-primary)]/30 transition-colors duration-500"></div>

            <motion.img
              src="/about.png" // PASTIKAN GAMBARNYA SUDAH ADA DI FOLDER PUBLIC
              alt="UI/UX & Landing Page Expert"
              className="w-full h-full object-contain drop-shadow-[0_1.5rem_1.5rem_rgba(0,0,0,0.4)] relative z-10"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"></div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-7 order-1 lg:order-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-[3.6rem] md:text-[4.6rem] font-bold text-[var(--text-main)] mb-6 leading-[1.2]"
          >
            Merancang Pengalaman, <br />
            Meningkatkan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-cyan-400">
              Konversi Bisnis.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[1.6rem] text-[var(--text-muted)] mb-6 leading-relaxed"
          >
            Karsa Studio adalah spesialis kreatif yang berfokus penuh pada
            desain antarmuka (UI/UX) dan pengembangan Landing Page. Kami
            mengubah ide abstrak Anda menjadi tampilan visual yang memukau dan
            mudah digunakan.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-[1.6rem] text-[var(--text-muted)] mb-6 leading-relaxed"
          >
            Kami memahami bahwa website adalah etalase digital Anda. Oleh karena
            itu, setiap tata letak, warna, dan tombol yang kami buat
            didedikasikan untuk memikat pengunjung dan mengubah mereka menjadi
            pelanggan potensial.
          </motion.p>

          {/* Grid Statis untuk Nilai Jual */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 my-8 p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
          >
            <div className="text-center border-r border-white/5">
              <BiAward className="text-[2.6rem] text-emerald-400 mx-auto mb-2" />
              <h4 className="text-[1.8rem] font-bold text-[var(--text-main)]">
                Estetik
              </h4>
              <p className="text-[1.2rem] text-[var(--text-muted)]">
                Desain Premium
              </p>
            </div>
            <div className="text-center border-r border-white/5">
              <BiGroup className="text-[2.6rem] text-cyan-400 mx-auto mb-2" />
              <h4 className="text-[1.8rem] font-bold text-[var(--text-main)]">
                Intuitif
              </h4>
              <p className="text-[1.2rem] text-[var(--text-muted)]">
                User Experience
              </p>
            </div>
            <div className="text-center">
              <BiRocket className="text-[2.6rem] text-[var(--color-primary)] mx-auto mb-2" />
              <h4 className="text-[1.8rem] font-bold text-[var(--text-main)]">
                Konversi
              </h4>
              <p className="text-[1.2rem] text-[var(--text-muted)]">
                Landing Page
              </p>
            </div>
          </motion.div>

          {/* List Keunggulan Spesifik Lyanan */}
          <div className="flex flex-col gap-4">
            {[
              "Riset dan desain antarmuka (UI/UX) yang berpusat pada pengguna",
              "Pembuatan Landing Page responsif dengan animasi interaktif",
              "Struktur halaman yang dioptimalkan untuk performa dan penjualan",
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 group"
                variants={itemVariants}
              >
                <div className="w-[2.4rem] h-[2.4rem] rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center border border-[var(--color-primary)]/20 shrink-0 group-hover:bg-[var(--color-primary)]/20 transition-colors">
                  <BiCheckCircle className="text-[var(--color-primary)] text-[1.8rem]" />
                </div>
                <span className="text-[1.5rem] text-[var(--text-main)] font-medium transition-colors group-hover:text-[var(--color-primary)]">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
