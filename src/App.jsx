// src/App.jsx
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Import Komponen Hiasan & Landing Page
import CustomCursor from "./components/atoms/CustomCursor";
import Home from "./components/pages/Home";
import PortfolioDetail from "./components/pages/PortfolioDetail";
import Preloader from "./components/molecules/Preloader";

// Import Komponen Admin Dashboard
import DashboardLayout from "./components/templates/DashboardLayout";
import ManagePortfolio from "./components/pages/dashboard/ManagePortfolio";
import FloatingWhatsApp from "./components/atoms/FloatingWhatsApp";
import Overview from "./components/pages/dashboard/Overview";

function AppContent() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [isLoading, setIsLoading] = useState(true);

  // LOGIKA UTAMA: Deteksi apakah user sedang di Dashboard
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Toaster position="bottom-right" />

      {/* RENDER BERSYARAT: Hanya tampil di luar /admin */}
      {!isAdminRoute && (
        <div className="w-full overflow-x-hidden relative">
          <CustomCursor />
          <motion.div
            className="fixed top-0 left-0 right-0 h-[5px] bg-[var(--color-primary)] origin-left z-[100]"
            style={{ scaleX }}
          />
          <FloatingWhatsApp />
        </div>
      )}

      {/* Rute Aplikasi */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Rute Pengunjung */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />

          {/* Rute Administrator */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="portfolio" element={<ManagePortfolio />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
