import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { BiGridAlt, BiFolderOpen, BiLogOutCircle } from "react-icons/bi";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const navigate = useNavigate();

  // FUNGSI LOGOUT DENGAN KONFIRMASI AMAN
  const handleLogout = async () => {
    if (
      window.confirm("Sesi akan diakhiri. Yakin ingin keluar dari Workspace?")
    ) {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        toast.success("Berhasil Logout dari sistem.");
        navigate("/login");
      } else {
        toast.error("Gagal logout: " + error.message);
      }
    }
  };

  return (
    // Container utama dikunci di Dark Mode permanen untuk kesan Premium "Ruang Kendali"
    <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden selection:bg-[var(--color-primary)] selection:text-white">
      {/* SIDEBAR - Desain Modern dengan efek Glass/Transparan halus */}
      <aside className="w-[280px] pt-4 shrink-0 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/80 flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        {/* Area Logo / Brand */}
        <div className="h-24 flex items-center px-8 border-b border-slate-800/80">
          <div className="flex flex-col">
            <h2 className="text-[24px] font-extrabold text-white tracking-wide leading-tight">
              Karsa
              <span style={{ color: "var(--color-primary)" }}>.Studio</span>
            </h2>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase mt-0.5">
              Admin Workspace
            </span>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
          {/* Tombol Overview */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group
              ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-[0_0_20px_var(--color-primary)]/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Efek kilatan cahaya saat aktif */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                )}

                <BiGridAlt
                  className={`text-[22px] transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className="relative z-10 whitespace-nowrap text-[15px]">
                  Overview
                </span>
              </>
            )}
          </NavLink>

          {/* Tombol Kelola Portfolio */}
          <NavLink
            to="/admin/portfolio"
            className={({ isActive }) => `
              flex items-center gap-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group
              ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-[0_0_20px_var(--color-primary)]/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }
            `}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                )}

                <BiFolderOpen
                  className={`text-[22px] transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                />
                <span className="relative z-10 whitespace-nowrap text-[15px]">
                  Kelola Portfolio
                </span>
              </>
            )}
          </NavLink>
        </nav>

        {/* AREA BAWAH (Profil Admin & Logout) */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="flex items-center justify-between w-full px-5 py-4 rounded-2xl font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <BiLogOutCircle className="text-[22px] group-hover:-translate-x-1 transition-transform" />
              <span className="text-[14px]">Sign Out</span>
            </div>
          </button>
        </div>
      </aside>

      {/* AREA KONTEN (Fluid Layout) */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth">
        {/* Dekorasi Cahaya Latar Belakang di Area Konten */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* Lebar sekarang Fluid (w-full) dengan padding yang pas agar luas tapi tidak menabrak layar */}
        <div className="w-full px-8 py-10 md:px-12 md:py-12 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
