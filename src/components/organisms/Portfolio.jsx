import { motion } from "framer-motion";
import PortfolioCard from "../molecules/PortfolioCard";

export default function Portofolio({ ref }) {
  // Data Realistis dengan tambahan property 'gridSpan' untuk Bento Layout
  const projects = [
    {
      title: "SayurPedia B2C Platform",
      category: "Web Development",
      tech: "Node.js, Express, Tailwind",
      desc: "Platform e-commerce B2C terintegrasi dengan fitur verifikasi pembayaran dan sistem transfer bank manual untuk memudahkan transaksi lokal.",
      image: "bg-gradient-to-br from-emerald-600 to-teal-900",
      link: "#",
      gridSpan: "md:col-span-2 lg:col-span-2", // Melebar (Featured)
    },
    {
      title: "Jambewangi Data Dashboard",
      category: "Data Visualization",
      tech: "React, Chart.js",
      desc: "Sistem analisis statistik demografi desa untuk memetakan populasi usia penduduk secara akurat dan real-time.",
      image: "bg-gradient-to-br from-indigo-600 to-blue-900",
      link: "#",
      gridSpan: "md:col-span-1 lg:col-span-1", // Kotak standar
    },
    {
      title: "Only Phones Prototype",
      category: "UI/UX & Frontend",
      tech: "PHP Native, Tailwind",
      desc: "Perancangan antarmuka dan pengembangan purwarupa website penjualan ponsel dengan fokus pada pengalaman pengguna yang responsif.",
      image: "bg-gradient-to-br from-rose-600 to-orange-900",
      link: "#",
      gridSpan: "md:col-span-1 lg:col-span-1", // Kotak standar
    },
    {
      title: "Inter-Campus Network",
      category: "Network Architecture",
      tech: "Cisco Packet Tracer",
      desc: "Perancangan dan implementasi konektivitas jaringan metode routing statis yang dikombinasikan dengan simulasi pemantauan perangkat.",
      image: "bg-gradient-to-br from-slate-700 to-slate-900",
      link: "#",
      gridSpan: "md:col-span-2 lg:col-span-2", // Melebar di bawah
    },
  ];

  return (
    <section
      ref={ref}
      id="portofolio"
      className="min-h-screen py-24 px-[9%] bg-[var(--bg-main)] scroll-mt-[10rem]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-[6rem]"
      >
        <h2 className="text-[4.5rem] font-bold mb-4">
          Karya <span className="text-[var(--color-primary)]">Terbaik</span>{" "}
          Kami
        </h2>
        <p className="text-[1.8rem] text-[var(--text-muted)] max-w-[650px] mx-auto leading-relaxed">
          Bukti nyata bagaimana kami meramu logika kode dan estetika desain
          menjadi produk digital yang siap mengangkat skala bisnis klien.
        </p>
      </motion.div>

      {/* Area Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] max-w-[1200px] mx-auto auto-rows-[350px]">
        {projects.map((project, index) => (
          <PortfolioCard
            key={index}
            project={project}
            index={index}
            // Gabungkan class min-height dengan class span dinamis dari data
            className={`min-h-[350px] h-full ${project.gridSpan}`}
          />
        ))}
      </div>

      {/* Dekorasi Glow Latar Belakang (Opsional, untuk kesan Cyber/Modern) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
    </section>
  );
}
