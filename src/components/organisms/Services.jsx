import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BiPalette,
  BiLayout,
  BiDesktop,
  BiLogoWhatsapp,
  BiEnvelope,
  BiX,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSubject } from "../../redux/formSlice";

export default function Services({ ref }) {
  // State untuk menyimpan data layanan yang sedang diklik
  const [selectedService, setSelectedService] = useState(null);

  const servicesData = [
    {
      icon: <BiPalette />,
      title: "Paket Rupa (UI/UX Design)",
      desc: "Riset pengguna, Wireframing, dan High-Fidelity Mockup interaktif. Cocok bagi Anda yang sudah memiliki tim developer sendiri.",
      price: "Mulai Rp 350.000",
      isComingSoon: false,
    },
    {
      icon: <BiLayout />,
      title: "Paket Layar (Landing Page)",
      desc: "Desain UI/UX eksklusif dilanjutkan dengan coding (pengembangan) menjadi satu halaman website berkonversi tinggi yang siap rilis.",
      price: "Mulai Rp 650.000",
      isComingSoon: false,
    },
    {
      icon: <BiDesktop />,
      title: "Paket Agensi (Company Profile)",
      desc: "Pembuatan website profil perusahaan multi-halaman berkinerja tinggi, estetik, dan responsif di semua perangkat.",
      price: "Segera Hadir",
      isComingSoon: true,
    },
  ];

  // Fungsi untuk menangani klik tombol WhatsApp
  const handleWA = (title) => {
    // Ganti dengan nomor WA aslimu (gunakan 62, bukan 0)
    const waNumber = "6287819844990";
    const text = encodeURIComponent(
      `Halo Karsa Studio, saya tertarik untuk diskusi mengenai ${title}. Bisa minta informasi lebih lanjut?`,
    );
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
    setSelectedService(null); // Tutup modal setelah klik
  };

  // Fungsi untuk menangani klik tombol Web/Email
  const dispatch = useDispatch();

  const handleEmail = (title) => {
    setSelectedService(null); // Tutup modal
    dispatch(setSubject(`Konsultasi - ${title}`));
    // Scroll mulus ke bagian kontak
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="services" className="min-h-screen relative">
      <motion.h2
        className="text-[4.5rem] font-bold text-center mb-[5rem]"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Layanan <span className="text-[var(--color-primary)]">Kami</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] max-w-[1200px] mx-auto">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex flex-col h-full p-[3rem] rounded-[2rem] text-center border-[0.1rem] border-[var(--border-color)] transition-all duration-400 group overflow-hidden ${
              service.isComingSoon
                ? "bg-[var(--bg-main)] opacity-80 cursor-default"
                : "bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-main)] shadow-lg hover:scale-[1.03] hover:border-[var(--color-primary)] hover:shadow-[0_0_2rem_var(--color-primary)]"
            }`}
          >
            {/* Efek Cahaya Halus */}
            {!service.isComingSoon && (
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-primary)] opacity-10 rounded-full blur-2xl group-hover:opacity-30 transition-opacity duration-500 z-0"></div>
            )}

            {/* Ribbon Coming Soon */}
            {service.isComingSoon && (
              <div className="absolute top-16 -right-14 bg-rose-500 text-white text-[1.2rem] font-bold py-1 px-14 rotate-45 shadow-md z-20 tracking-wider">
                COMING SOON
              </div>
            )}

            <div className="flex-1 flex flex-col z-10">
              <div
                className={`text-[5rem] mb-[1.5rem] flex justify-center transition-transform duration-300 ${service.isComingSoon ? "text-[var(--text-muted)]" : "text-[var(--color-primary)] group-hover:scale-110"}`}
              >
                {service.icon}
              </div>

              <h3
                className={`text-[2.6rem] font-semibold mb-[1rem] transition-colors ${service.isComingSoon ? "text-[var(--text-muted)]" : "group-hover:text-[var(--color-primary)]"}`}
              >
                {service.title}
              </h3>

              <p className="text-[1.6rem] text-[var(--text-muted)] mb-[2rem] leading-relaxed">
                {service.desc}
              </p>
            </div>

            <div className="mt-auto pt-[2rem] z-10">
              <button
                onClick={() =>
                  !service.isComingSoon && setSelectedService(service)
                }
                className={`inline-block px-[2.5rem] py-[0.8rem] font-bold text-[1.4rem] rounded-full border transition-all duration-300 ${
                  service.isComingSoon
                    ? "bg-transparent text-[var(--text-muted)] border-[var(--border-color)] cursor-not-allowed"
                    : "bg-[var(--bg-main)] text-[var(--color-primary)] border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_1rem_var(--color-primary)] cursor-pointer"
                }`}
              >
                {service.price}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL POPUP ANIMASI --- */}
      <AnimatePresence>
        {selectedService && (
          // Overlay Latar Belakang (Kaca Buram Hitam)
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)} // Tutup jika klik area luar
          >
            <motion.div
              className="bg-[var(--bg-secondary)] border border-[var(--color-primary)]/30 rounded-[2rem] p-[3rem] w-full max-w-[500px] shadow-[0_0_4rem_rgba(0,0,0,0.3)] relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat kotak di klik
            >
              {/* Tombol Tutup (X) */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 text-[2.5rem] text-[var(--text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
              >
                <BiX />
              </button>

              <h3 className="text-[2.2rem] font-bold mb-2">Mulai Konsultasi</h3>
              <p className="text-[1.6rem] text-[var(--text-muted)] mb-8">
                Anda memilih{" "}
                <span className="text-[var(--color-primary)] font-semibold">
                  {selectedService.title}
                </span>
                . Lewat mana Anda ingin berdiskusi?
              </p>

              {/* Pilihan Tombol */}
              <div className="flex flex-col gap-4">
                {/* Tombol WA */}
                <button
                  onClick={() => handleWA(selectedService.title)}
                  className="w-full flex items-center justify-center gap-4 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-[1.6rem] font-semibold transition-all hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_1.5rem_rgba(16,185,129,0.5)] hover:-translate-y-1 cursor-pointer"
                >
                  <BiLogoWhatsapp className="text-[2.4rem]" />
                  Chat via WhatsApp
                </button>

                {/* Tombol Email */}
                <button
                  onClick={() => handleEmail(selectedService.title)}
                  className="w-full flex items-center justify-center gap-4 py-4 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-[1.6rem] font-semibold transition-all hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_1.5rem_var(--color-primary)] hover:-translate-y-1 cursor-pointer"
                >
                  <BiEnvelope className="text-[2.4rem]" />
                  Isi Form Website
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
