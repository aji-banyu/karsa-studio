import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// --- KOMPONEN ATOM & MOLEKUL ---
import CustomCursor from "./components/atoms/CustomCursor";
import FloatingWhatsApp from "./components/atoms/FloatingWhatsApp";
import Preloader from "./components/molecules/Preloader";
import ProtectedRoute from "./components/atoms/ProtectedRoute";

// --- HALAMAN PUBLIK ---
import Home from "./components/pages/Home";
import PortfolioDetail from "./components/pages/PortfolioDetail";
import Login from "./components/pages/Login";

// --- HALAMAN ADMIN ---
import DashboardLayout from "./components/templates/DashboardLayout";
import Overview from "./components/pages/dashboard/Overview";
import ManagePortfolio from "./components/pages/dashboard/ManagePortfolio";

function AppContent() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // STATE PRELOADER
  const [isLoading, setIsLoading] = useState(true);

  // Deteksi apakah user berada di area admin ATAU di halaman login
  const isAuthOrAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  useEffect(() => {
    // Hilangkan preloader setelah 2 detik
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. PRELOADER GLOBAL (Akan tampil saat buka web) */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Toaster position="bottom-right" />

      {/* 2. RENDER BERSYARAT: FRONTEND PUBLIK */}
      {!isAuthOrAdminRoute ? (
        // Pembungkus ini MENGUNCI sumbu X (layar HP geser) dan merender halaman publik
        <div className="w-full overflow-x-hidden relative">
          <CustomCursor />
          <motion.div
            className="fixed top-0 left-0 right-0 h-[5px] bg-[var(--color-primary)] origin-left z-[100]"
            style={{ scaleX }}
          />
          <FloatingWhatsApp />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            </Routes>
          </AnimatePresence>
        </div>
      ) : (
        /* 3. RENDER BERSYARAT: BACKEND ADMIN & LOGIN */
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Rute Login */}
            <Route path="/login" element={<Login />} />

            {/* Rute Admin (Dilindungi Satpam) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="portfolio" element={<ManagePortfolio />} />
            </Route>
          </Routes>
        </AnimatePresence>
      )}
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
