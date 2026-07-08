import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPortfolios } from "../../../redux/portfolioSlice";
import {
  BiFolder,
  BiShow,
  BiHide,
  BiPlusCircle,
  BiGridAlt,
} from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Overview() {
  const dispatch = useDispatch();
  const { items: portfolios, status } = useSelector((state) => state.portfolio);

  useEffect(() => {
    document.title = "Overview Workspace | Karsa Studio";
    if (status === "idle") {
      dispatch(fetchPortfolios());
    }
  }, [status, dispatch]);

  // KAKULASI DATA REAL-TIME FROM SUPABASE
  const totalProjects = portfolios.length;
  const publishedProjects = portfolios.filter(
    (p) => p.is_published !== false,
  ).length;
  const draftProjects = totalProjects - publishedProjects;

  // Mengambil maksimal 5 proyek terbaru
  const recentProjects = portfolios.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* WELCOME BANNER */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800/60 relative overflow-hidden">
        <div
          className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: "var(--color-primary)", opacity: 0.1 }}
        ></div>
        <h1
          className="text-[28px] font-extrabold text-white"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Karsa Studio Workspace
        </h1>
        <p className="text-slate-400 text-[14px] mt-2 max-w-xl leading-relaxed">
          Pusat kendali konten landing page. Semua perubahan data pada
          portofolio akan langsung tersinkronisasi dan berubah secara instan ke
          sisi pengunjung.
        </p>
      </div>

      {/* STATS CARDS GRID (100% Dinamis dari Supabase) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Proyek */}
        <div className="bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="space-y-2">
            <p className="text-slate-500 text-[12px] uppercase tracking-wider font-semibold">
              Total Karya
            </p>
            <h3 className="text-[32px] font-bold text-white leading-none">
              {status === "loading" ? "..." : totalProjects}
            </h3>
            <p className="text-[11px] text-slate-400">
              Proyek tersimpan di database
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-slate-800/50 flex items-center justify-center text-[24px] text-white">
            <BiFolder />
          </div>
        </div>

        {/* Card 2: Proyek Publik */}
        <div className="bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="space-y-2">
            <p className="text-slate-500 text-[12px] uppercase tracking-wider font-semibold">
              Live di Web
            </p>
            <h3 className="text-[32px] font-bold text-emerald-400 leading-none">
              {status === "loading" ? "..." : publishedProjects}
            </h3>
            <p className="text-[11px] text-slate-400">
              Dapat dilihat oleh publik
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[24px] text-emerald-400">
            <BiShow />
          </div>
        </div>

        {/* Card 3: Proyek Draft */}
        <div className="bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex items-center justify-between shadow-lg">
          <div className="space-y-2">
            <p className="text-slate-500 text-[12px] uppercase tracking-wider font-semibold">
              Sembunyi / Draft
            </p>
            <h3 className="text-[32px] font-bold text-amber-400 leading-none">
              {status === "loading" ? "..." : draftProjects}
            </h3>
            <p className="text-[11px] text-slate-400">
              Diarsipkan sementara waktu
            </p>
          </div>
          <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[24px] text-amber-400">
            <BiHide />
          </div>
        </div>
      </div>

      {/* LOWER SECTION: RECENT ACTIVITY & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Daftar Karya Terbaru */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex flex-col shadow-xl">
          <h3
            className="text-[16px] font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Aktivitas Karya Terbaru
          </h3>

          <div className="flex-1 divide-y divide-slate-800/60">
            {status === "loading" && (
              <p className="text-[13px] text-slate-500 py-4">
                Memuat data dari Supabase...
              </p>
            )}
            {status === "succeeded" && recentProjects.length === 0 && (
              <p className="text-[13px] text-slate-500 py-4">
                Belum ada karya yang diunggah.
              </p>
            )}

            {status === "succeeded" &&
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group"
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-14 h-10 bg-slate-800 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                      <img
                        src={
                          project.image_urls && project.image_urls.length > 0
                            ? project.image_urls[0]
                            : "https://via.placeholder.com/150"
                        }
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-[14px] font-bold text-slate-200 truncate group-hover:text-[var(--color-primary)] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[12px] px-2.5 py-1 rounded-md border font-medium shrink-0 ${project.is_published !== false ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-800 text-slate-400 border-slate-700"}`}
                  >
                    {project.is_published !== false ? "Live" : "Draft"}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Kolom Kanan: Akses Cepat (Shortcut Navigasi) */}
        <div className="bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex flex-col justify-between shadow-xl">
          <div>
            <h3
              className="text-[16px] font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Akses Cepat
            </h3>
            <p className="text-slate-500 text-[13px] leading-relaxed">
              Gunakan jalan pintas ini untuk langsung memanipulasi data
              portofolio kamu tanpa harus mencari menu lagi.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <Link
              to="/admin/portfolio"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-[13px]"
            >
              <BiGridAlt
                className="text-[18px]"
                style={{ color: "var(--color-primary)" }}
              />
              <span>Buka Menu Kelola Portfolio</span>
            </Link>

            <Link
              to="/admin/portfolio"
              className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-[13px]"
            >
              <BiPlusCircle className="text-[18px] text-emerald-400" />
              <span>Tambah Proyek Karya Baru</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
