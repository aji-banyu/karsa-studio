import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiPlus } from "react-icons/bi"; // Hanya butuh BiPlus, kita akan putar dengan animasi

const faqs = [
  {
    question: "Berapa lama waktu pengerjaan sebuah website?",
    answer:
      "Waktu pengerjaan sangat bergantung pada tingkat kompleksitas proyek. Untuk Landing Page standar biasanya memakan waktu 1-2 minggu. Sedangkan untuk platform custom kompleks seperti B2C E-Commerce bisa memakan waktu 1 hingga 3 bulan.",
  },
  {
    question: "Apakah Karsa Studio menyediakan layanan revisi?",
    answer:
      "Tentu! Kami menyediakan hingga 3 kali revisi minor setelah desain awal dipresentasikan, memastikan hasil akhirnya 100% sesuai dengan visi bisnis Anda tanpa biaya tambahan.",
  },
  {
    question: "Bagaimana sistem pembayaran proyek di Karsa Studio?",
    answer:
      "Kami menerapkan sistem termin. Biasanya 50% down payment (DP) di awal sebelum proyek dimulai, dan 50% pelunasan setelah proyek selesai dan siap untuk diluncurkan ke server (go live).",
  },
  {
    question: "Apakah saya akan mendapatkan source code sepenuhnya?",
    answer:
      "Ya. Setelah pelunasan selesai, seluruh source code, aset desain (Figma), dan hak milik intelektual proyek tersebut akan diserahkan 100% kepada Anda.",
  },
];

// Komponen Sub-Item Accordion
const FaqItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-[var(--text-main)]/10 overflow-hidden">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center py-8 text-left focus:outline-none group cursor-pointer"
      >
        <h4
          className={`text-[1.8rem] md:text-[2.2rem] font-medium transition-colors duration-300 pr-8 ${isOpen ? "text-[var(--color-primary)]" : "text-[var(--text-main)] group-hover:text-[var(--color-primary)]"}`}
        >
          {faq.question}
        </h4>

        {/* Ikon yang berputar menjadi 'X' saat dibuka */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[var(--color-primary)]/10" : "bg-transparent group-hover:bg-[var(--text-main)]/5"}`}
        >
          <BiPlus
            className={`text-[2.6rem] ${isOpen ? "text-[var(--color-primary)]" : "text-[var(--text-main)] group-hover:text-[var(--color-primary)]"}`}
          />
        </motion.div>
      </button>

      {/* Konten yang membuka ke bawah */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Kurva timing premium (snappy)
            className="origin-top" // Memaksa animasi mendorong layar ke bawah
          >
            <p className="text-[1.6rem] md:text-[1.8rem] text-[var(--text-muted)] pb-10 leading-relaxed max-w-5xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Komponen Utama FAQ
export default function FAQ({ ref }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="py-32 px-[5%] md:px-[9%] bg-[var(--bg-main)] scroll-mt-[5rem] relative"
    >
      <div className="max-w-[1000px] mx-auto w-full relative z-10 flex flex-col gap-12">
        {/* Judul Disimpelkan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left mb-4"
        >
          <h2 className="text-[3.5rem] md:text-[4.5rem] font-extrabold text-[var(--text-main)] leading-none tracking-tight">
            FAQ<span className="text-[var(--color-primary)]">.</span>
          </h2>
        </motion.div>

        {/* Daftar Accordion Mendominasi Layar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="border-t border-[var(--text-main)]/10"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFaq(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
