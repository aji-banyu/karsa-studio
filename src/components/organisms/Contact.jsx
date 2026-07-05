import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSubject } from "../../redux/formSlice";
import { sendContactForm } from "../../services/contact.service"; // Pastikan path service-mu benar
import { motion } from "framer-motion";
import { BiMailSend, BiMap, BiTimeFive, BiSend } from "react-icons/bi";
import toast from "react-hot-toast"; // Import Notifikasi Pintar
import Input from "../atoms/Input";
import Button from "../atoms/Button";

export default function Contact({ ref }) {
  const dispatch = useDispatch();
  const subjectFromRedux = useSelector((state) => state.form.subject);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  // Status string lama kita hapus karena sekarang menggunakan Toast
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FIX SIKLUS EFFECT:
  // Hanya perbarui form jika subject dari Redux ada dan berbeda dengan form lokal.
  // Ini mencegah terjadinya infinite loop saat kita mengetik di input.
  useEffect(() => {
    if (subjectFromRedux && subjectFromRedux !== formData.subject) {
      setFormData((prev) => ({ ...prev, subject: subjectFromRedux }));
    }
  }, [subjectFromRedux]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Tetap kirim ke Redux agar tersinkronisasi
    if (name === "subject") {
      dispatch(setSubject(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Munculkan status loading di pojok layar
    const toastId = toast.loading("Memproses pesan Anda...");

    try {
      const result = await sendContactForm(formData);

      if (result.success) {
        // 2. Ubah loading menjadi centang hijau sukses
        toast.success(
          "Pesan berhasil terkirim! Tim kami akan segera merespons.",
          { id: toastId },
        );

        // Kosongkan form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
        dispatch(setSubject(""));
      } else {
        // 3. Ubah loading menjadi error jika gagal dari sisi service
        toast.error(result.message || "Terjadi kesalahan. Silakan coba lagi.", {
          id: toastId,
        });
      }
    } catch (error) {
      // 4. Tangkap error jika internet putus/server mati
      toast.error("Gagal terhubung ke server.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen py-24 px-[5%] md:px-[9%] bg-[var(--bg-main)] scroll-mt-25 relative"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-[6rem] max-w-[800px] mx-auto relative z-10"
      >
        <h2 className="text-[4rem] md:text-[4.5rem] font-bold mb-4 text-[var(--text-main)]">
          Hubungi <span className="text-[var(--color-primary)]">Kami</span>
        </h2>
        <p className="text-[1.6rem] md:text-[1.8rem] text-[var(--text-muted)] leading-relaxed">
          Jadwalkan sesi konsultasi gratis. Tim ahli kami siap menganalisis
          kebutuhan bisnis Anda dan memberikan solusi teknologi yang tepat
          sasaran.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[6rem] max-w-[1200px] mx-auto items-start relative z-10">
        {/* Kolom Kiri - Informasi Kontak */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <div className="bg-white/[0.02] p-[3rem] md:p-[4rem] rounded-[2rem] border border-white/5 shadow-sm backdrop-blur-md">
            <h3 className="text-[2.4rem] font-bold text-[var(--text-main)] mb-8 border-b border-white/10 pb-4">
              Informasi Kontak
            </h3>

            <div className="flex flex-col gap-8">
              <div className="flex gap-5 items-start">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 border border-[var(--color-primary)]/20">
                  <BiMap className="text-[2.4rem] text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-[1.6rem] font-semibold text-[var(--text-main)] mb-1">
                    Lokasi Kantor
                  </h4>
                  <p className="text-[1.5rem] text-[var(--text-muted)] leading-relaxed">
                    Magelang, Jawa Tengah
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start group">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 border border-[var(--color-primary)]/20 transition-colors group-hover:bg-[var(--color-primary)]/20">
                  <BiMailSend className="text-[2.4rem] text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-[1.6rem] font-semibold text-[var(--text-main)] mb-1">
                    Email Surel
                  </h4>
                  <a
                    href="mailto:hello@karsa.studio"
                    className="text-[1.5rem] text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors block"
                  >
                    hello@karsa.studio
                  </a>
                  <a
                    href="mailto:support@karsa.studio"
                    className="text-[1.5rem] text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors block"
                  >
                    support@karsa.studio
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 border border-[var(--color-primary)]/20">
                  <BiTimeFive className="text-[2.4rem] text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-[1.6rem] font-semibold text-[var(--text-main)] mb-1">
                    Jam Kerja
                  </h4>
                  <p className="text-[1.5rem] text-[var(--text-muted)]">
                    Senin - Jumat: 09.00 - 17.00 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-white/[0.02] p-[3rem] md:p-[5rem] rounded-[2rem] border border-white/5 shadow-lg relative overflow-hidden backdrop-blur-md"
        >
          <h3 className="text-[2.6rem] font-bold text-[var(--text-main)] mb-2">
            Kirim Pesan Langsung
          </h3>
          <p className="text-[1.5rem] text-[var(--text-muted)] mb-8">
            Isi formulir di bawah ini dan kami akan segera menghubungi Anda
            kembali.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama Lengkap"
                required
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Alamat Email"
                type="email"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="No. WhatsApp"
              />
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subjek Diskusi"
                required
              />
            </div>

            <Input
              name="message"
              value={formData.message}
              onChange={handleChange}
              isTextArea
              placeholder="Jelaskan detail proyek atau kebutuhan Anda di sini..."
              required
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full md:w-auto md:self-end mt-4 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(6,182,212,0.3)]"}`}
            >
              <span className="flex items-center justify-center gap-3">
                {isSubmitting ? "Mengirim..." : "Kirim Pesan Sekarang"}
                {!isSubmitting && <BiSend className="text-[2.2rem]" />}
              </span>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
