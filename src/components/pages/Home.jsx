import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Header from "../organisms/Header";
import Hero from "../organisms/Hero";
import About from "../organisms/About";
import Services from "../organisms/Services";
import Portfolio from "../organisms/Portfolio";
import Contact from "../organisms/Contact";
import Footer from "../organisms/Footer";
import FAQ from "../organisms/FAQ";
import SEO from "../atoms/SEO";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionRefs = useRef([]);

  const setRef = useCallback((el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }, []);

  // --- LOGIKA PENGINGAT SCROLL (BARU) ---
  useEffect(() => {
    // 1. Cek apakah ada posisi scroll yang tersimpan di memori
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    if (savedScrollPosition) {
      // 2. Jika ada, kembalikan posisi scroll (pakai setTimeout sebentar agar menunggu animasi render selesai)
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 50);
    }

    // 3. Simpan posisi scroll saat ini ke memori setiap kali pengguna menggulir layar
    const handleScroll = () => {
      sessionStorage.setItem("homeScrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Bersihkan event listener saat keluar dari Home
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // -------------------------------------

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <SEO />

      <Header activeSection={activeSection} />

      <main>
        <Hero ref={setRef} />
        <About ref={setRef} />
        <Services ref={setRef} />
        <Portfolio ref={setRef} />
        <FAQ ref={setRef} />
        <Contact ref={setRef} />
      </main>

      <Footer />
    </motion.div>
  );
}
