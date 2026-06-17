import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSubject } from "../../redux/formSlice";
import { sendContactForm } from "../../services/contact.service";
import { motion } from "framer-motion";
import { BiMailSend, BiMap, BiTimeFive, BiSend } from "react-icons/bi";
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
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: subjectFromRedux }));
  }, [subjectFromRedux]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "subject") dispatch(setSubject(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Memproses pesan Anda...");

    const result = await sendContactForm(formData);

    setStatus(result.message);
    setIsSubmitting(false);

    if (result.success) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
      dispatch(setSubject(""));
    }

    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="min-h-screen py-24 px-[5%] md:px-[9%] bg-(--bg-main) scroll-mt-25"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-[6rem] max-w-[800px] mx-auto"
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4rem] lg:gap-[6rem] max-w-[1200px] mx-auto items-start">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          <div className="bg-[var(--bg-secondary)] p-[3rem] md:p-[4rem] rounded-[2rem] border border-[var(--border-color)] shadow-sm">
            <h3 className="text-[2.4rem] font-bold text-[var(--text-main)] mb-8 border-b border-[var(--border-color)] pb-4">
              Informasi Kontak
            </h3>

            <div className="flex flex-col gap-8">
              <div className="flex gap-5 items-start">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--bg-main)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
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

              <div className="flex gap-5 items-start">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--bg-main)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                  <BiMailSend className="text-[2.4rem] text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-[1.6rem] font-semibold text-[var(--text-main)] mb-1">
                    Email Surel
                  </h4>
                  <p className="text-[1.5rem] text-[var(--text-muted)]">
                    LALALA@karsa.studio
                  </p>
                  <p className="text-[1.5rem] text-[var(--text-muted)]">
                    LALALA@karsa.studio
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-[5rem] h-[5rem] rounded-xl bg-[var(--bg-main)] flex items-center justify-center shrink-0 border border-[var(--border-color)]">
                  <BiTimeFive className="text-[2.4rem] text-[var(--color-primary)]" />
                </div>
                <div>
                  <h4 className="text-[1.6rem] font-semibold text-[var(--text-main)] mb-1">
                    Jam Kerja
                  </h4>
                  <p className="text-[1.5rem] text-[var(--text-muted)]">
                    Senin - Jumat: 09.00 - 17.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 bg-[var(--bg-secondary)] p-[3rem] md:p-[5rem] rounded-[2rem] border border-[var(--border-color)] shadow-lg relative overflow-hidden"
        >
          {/* Garis Border Biru di Atas Sudah Dihapus */}

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
                placeholder="Nama Lengkap "
                required
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Alamat Email "
                type="email"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="No. WhatsApp "
              />
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subjek Diskusi "
                required
              />
            </div>

            <Input
              name="message"
              value={formData.message}
              onChange={handleChange}
              isTextArea
              placeholder="Jelaskan detail proyek atau kebutuhan Anda di sini... "
              required
            />

            {status && (
              <p className="text-[1.4rem] font-medium text-[var(--color-primary)] mt-2">
                {status}
              </p>
            )}

            {/* Tombol Diperbaiki: Menggunakan wrapper "span" agar teks dan ikon sejajar */}
            <Button
              type="submit"
              className={`w-full md:w-auto md:self-end mt-4 transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <span className="flex items-center justify-center gap-3">
                {isSubmitting ? "Mengirim..." : "Kirim Pesan Sekarang"}
                {!isSubmitting && <BiSend className="text-[2rem]" />}
              </span>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
