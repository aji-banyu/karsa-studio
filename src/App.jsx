import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/organisms/Header";
import Hero from "./components/organisms/Hero";
import About from "./components/organisms/About";
import Services from "./components/organisms/Services";
import Portfolio from "./components/organisms/Portfolio";
import Contact from "./components/organisms/Contact";
import Footer from "./components/organisms/Footer";
import ThemeToggle from "./components/atoms/ThemeToggle";
import { motion, useScroll, useSpring } from "framer-motion";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  const sectionRefs = useRef([]);

  const setRef = useCallback((el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  }, []);

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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[5px] bg-[var(--color-primary)] origin-left z-[100]"
        style={{ scaleX }}
      />
      <Header activeSection={activeSection} />
      <ThemeToggle />
      <main>
        <Hero ref={setRef} />
        <About ref={setRef} />
        <Services ref={setRef} />
        <Portfolio ref={setRef} />
        <Contact ref={setRef} />
      </main>
      <Footer />
    </>
  );
}
