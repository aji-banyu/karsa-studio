import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";
import { BiLogoInstagramAlt, BiLogoWhatsapp } from "react-icons/bi";
import SocialIcon from "../atoms/SocialIcon";
import Button from "../atoms/Button";
import Spline from "@splinetool/react-spline";

export default function Hero({ ref }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      id="home"
      // PERBAIKAN: Menggunakan justify-between dan mengatur ulang padding agar seimbang di HP
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 min-h-screen px-[9%] pt-[14rem] md:pt-[10rem] pb-10"
    >
      {/* KIRI (Teks) */}
      <motion.div
        className="flex-1 text-center md:text-left z-10"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <h3 className="text-[2.2rem] md:text-[2.6rem] font-semibold text-[var(--text-muted)]">
          Halo, Selamat Datang di
        </h3>

        <h1 className="text-[4.5rem] md:text-[5.5rem] font-bold leading-[1.2] my-4 text-[var(--text-main)]">
          Karsa <span className="text-[var(--color-primary)]">Studio</span>
        </h1>

        <h3 className="text-[2.2rem] md:text-[2.8rem] font-semibold mb-6 text-[var(--text-main)]">
          Kami Ahli dalam{" "}
          <span className="text-[var(--color-primary)]">
            <ReactTyped
              strings={[
                "UI/UX Design",
                "Landing Page Bisnis",
                "Web Development",
              ]}
              typeSpeed={80}
              backSpeed={50}
              loop
            />
          </span>
        </h3>

        <p className="text-[1.6rem] text-[var(--text-muted)] mb-10 leading-relaxed max-w-[600px] mx-auto md:mx-0">
          Ubah pengunjung menjadi pelanggan setia. Kami merancang antarmuka yang
          tidak hanya indah secara visual, tetapi juga dioptimalkan untuk
          meningkatkan penjualan bisnis Anda.
        </p>

        <div className="flex justify-center md:justify-start gap-6 mb-10">
          <SocialIcon
            href="https://www.instagram.com/karsa_studi?igsh=MW13aWtodnNoY2R6dQ=="
            icon={BiLogoInstagramAlt}
          />
          <SocialIcon
            href="https://wa.me/6287819844990?text="
            icon={BiLogoWhatsapp}
          />
        </div>

        <Button href="#contact">Konsultasi Gratis</Button>
      </motion.div>

      {/* KANAN (Spline 3D) */}
      <motion.div
        // PERBAIKAN: Menghapus mt-16 dan menggantinya dengan mb-8 di HP agar ada jarak ke teks di bawahnya
        className="flex-1 flex justify-center mb-8 md:mb-0 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] max-w-[700px] max-h-[700px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
          <div className="absolute w-[60%] h-[60%] bg-[var(--color-primary)] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          {/* Render Spline 3D */}
          <div className="absolute inset-0 w-full h-full pointer-events-none md:pointer-events-auto">
            <Spline
              className=" ml-9 w-full"
              scene="https://prod.spline.design/eildHLAFt-9c1Y9R/scene.splinecode"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
