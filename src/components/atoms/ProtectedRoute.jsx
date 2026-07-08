import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // true jika ada sesi, false jika tidak
    };
    checkAuth();
  }, []);

  // Selama masih mengecek ke database, tampilkan layar hitam kosong
  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-[var(--bg-main)]"></div>;
  }

  // Jika tidak terotentikasi, tendang kembali ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, persilakan masuk ke dashboard
  return children;
}
