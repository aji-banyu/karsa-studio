import { useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // 1. Memaksa ukuran text kembali normal (16px) menggunakan class di index.css
    document.documentElement.classList.add("admin-mode");

    // 2. Dynamic Title
    document.title = "Admin Workspace | Karsa Studio";

    return () => {
      document.documentElement.classList.remove("admin-mode");
    };
  }, []);

  return (
    <div className="admin-dashboard-wrapper font-sans text-slate-200 bg-slate-950 overflow-hidden">
      <div className="flex h-screen w-full">
        {/* SIDEBAR */}
        <aside className="w-[280px] bg-slate-900 border-r border-slate-800/60 flex flex-col justify-between z-20 shadow-2xl shrink-0">
          <div>
            {/* LOGO */}
            <div className="h-20 flex flex-col justify-center px-8 border-b border-slate-800/60">
              <h1
                className="text-[24px] leading-none font-extrabold tracking-wide text-white flex items-center gap-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                KARSA<span style={{ color: "var(--color-primary)" }}>.</span>
                STUDIO
              </h1>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest mt-1">
                Workspace
              </p>
            </div>

            {/* NAVIGASI */}
            <nav className="p-4 space-y-1.5 mt-4">
              <p className="px-4 text-[11px] font-semibold text-slate-600 mb-3 uppercase tracking-wider">
                Menu Utama
              </p>

              <Link
                to="/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive("/admin")
                    ? "font-medium border-l-2"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-2 border-transparent"
                }`}
                style={
                  isActive("/admin")
                    ? {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                        color: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                      }
                    : {}
                }
              >
                <span className="text-[14px]">Overview</span>
              </Link>

              <Link
                to="/admin/portfolio"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive("/admin/portfolio")
                    ? "font-medium border-l-2"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-2 border-transparent"
                }`}
                style={
                  isActive("/admin/portfolio")
                    ? {
                        backgroundColor:
                          "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                        color: "var(--color-primary)",
                        borderColor: "var(--color-primary)",
                      }
                    : {}
                }
              >
                <span className="text-[14px]">Kelola Portfolio</span>
              </Link>
            </nav>
          </div>

          {/* PROFIL ADMIN GENERIK (Bukan Phamhonney) */}
          <div className="p-5 border-t border-slate-800/60 bg-slate-950/50">
            <div className="flex items-center gap-3 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[14px] shadow-inner"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                AD
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-semibold text-slate-200 truncate">
                  Administrator
                </p>
                <p className="text-[12px] text-slate-500 truncate">
                  Karsa Studio
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* KONTEN UTAMA */}
        <div className="flex-1 flex flex-col relative z-10 w-full min-w-0">
          <header className="h-20 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 flex items-center justify-between px-10 sticky top-0 z-30 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-slate-500 font-medium">
                Pages
              </span>
              <span className="text-[14px] text-slate-600">/</span>
              <span className="text-[14px] text-slate-200 capitalize font-semibold bg-slate-800/50 px-3 py-1 rounded-md">
                {location.pathname.split("/").pop() || "Overview"}
              </span>
            </div>

            <Link
              to="/"
              className="group flex items-center gap-2 text-[12px] bg-slate-800/50 hover:text-white text-slate-300 px-5 py-2.5 rounded-full border border-slate-700/50 transition-all duration-300 shadow-sm"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-primary)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <span>Lihat Website</span>
            </Link>
          </header>

          <main className="flex-1 overflow-y-auto p-10 scroll-smooth">
            <div className="max-w-6xl mx-auto">
              {/* Outlet akan merender halaman anak seperti ManagePortfolio */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
