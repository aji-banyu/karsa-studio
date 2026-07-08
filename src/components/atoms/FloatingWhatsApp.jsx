import { FaWhatsapp } from "react-icons/fa"; // Pastikan react-icons sudah terinstall

export default function FloatingWhatsApp() {
  // Ganti dengan nomor WhatsApp Karsa Studio (Gunakan 62, hilangkan angka 0 di depan)
  const phoneNumber = "6287819844990";
  // Pesan default yang otomatis terisi saat klien membuka WA
  const message = encodeURIComponent(
    "Halo Karsa Studio, saya tertarik untuk berdiskusi mengenai pembuatan website.",
  );

  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-[90] flex items-center justify-center">
      {/* Efek Cahaya Berdenyut (Pulse) di belakang tombol */}
      <div className="absolute inset-0 bg-emerald-500/40 rounded-full blur-xl animate-pulse"></div>

      {/* Tombol Utama */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-0 bg-slate-900/40 backdrop-blur-xl border border-emerald-500/30 p-4 rounded-full shadow-[0_8px_32px_rgba(16,185,129,0.2)] hover:bg-emerald-500 hover:border-emerald-400 hover:shadow-[0_8px_32px_rgba(16,185,129,0.4)] transition-all duration-500 ease-out cursor-pointer"
      >
        <FaWhatsapp className="text-[2.6rem] text-emerald-400 group-hover:text-white transition-colors duration-500 shrink-0" />

        {/* Teks yang meluas (expand) saat di-hover */}
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:pl-3 group-hover:pr-1 transition-all duration-500 ease-in-out whitespace-nowrap text-white font-semibold text-[1.4rem]">
          Hubungi Kami
        </span>
      </a>
    </div>
  );
}
