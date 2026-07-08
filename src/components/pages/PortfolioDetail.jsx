import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// Pastikan letak path import ini sesuai dengan folder redux kamu
import { fetchPortfolios } from "../../redux/portfolioSlice";
import PortfolioDetailTemplate from "../templates/PortfolioDetailTemplate";

export default function PortfolioDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. Mengambil data dari Redux Store
  const { items: portfolios, status } = useSelector((state) => state.portfolio);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 2. Jika status masih 'idle' (data belum ditarik dari Supabase), paksa tarik datanya
    if (status === "idle") {
      dispatch(fetchPortfolios());
    }
  }, [status, dispatch]);

  // 3. Tampilkan efek loading saat data sedang ditarik dari database
  if (status === "loading" || status === "idle") {
    return (
      <div className="min-h-screen bg-[var(--bg-main)] py-16 px-[5%] md:px-[9%] animate-pulse">
        <div className="max-w-[1200px] mx-auto pt-10 space-y-8">
          {/* Skeleton Tombol Kembali */}
          <div className="w-32 h-12 rounded-full bg-slate-800/50"></div>

          {/* Skeleton Header Proyek */}
          <div className="space-y-4">
            <div className="w-3/4 h-[4rem] md:h-[5rem] rounded-2xl bg-slate-800/80"></div>
            <div className="h-20 w-full border-y border-slate-800/40 flex items-center gap-12">
              <div className="w-24 h-8 bg-slate-800/60 rounded-lg"></div>
              <div className="w-24 h-8 bg-slate-800/60 rounded-lg"></div>
            </div>
          </div>

          {/* Skeleton Window Gallery Mac-Style */}
          <div className="w-full aspect-video md:aspect-[16/9] rounded-[1.2rem] bg-slate-900/60 border border-slate-800/40 flex flex-col">
            <div className="h-[2.8rem] border-b border-slate-800/40 flex items-center px-4 gap-2 bg-slate-950/40">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-slate-800"></div>
            </div>
            <div className="flex-1 bg-slate-800/20"></div>
          </div>

          {/* Skeleton Overview (Deskripsi & Tech) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-4">
            <div className="md:col-span-2 space-y-4">
              <div className="w-48 h-8 bg-slate-800/80 rounded-xl"></div>
              <div className="w-full h-5 bg-slate-800/40 rounded-lg"></div>
              <div className="w-full h-5 bg-slate-800/40 rounded-lg"></div>
              <div className="w-4/5 h-5 bg-slate-800/40 rounded-lg"></div>
            </div>
            <div className="h-48 bg-slate-900/40 border border-slate-800/40 rounded-3xl p-8">
              <div className="w-32 h-6 bg-slate-800/80 rounded-lg mb-4"></div>
              <div className="flex flex-wrap gap-2">
                <div className="w-16 h-8 bg-slate-800/40 rounded-lg"></div>
                <div className="w-20 h-8 bg-slate-800/40 rounded-lg"></div>
                <div className="w-14 h-8 bg-slate-800/40 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Cari proyek berdasarkan ID (Gunakan String() agar aman dari perbedaan tipe data number/string)
  const project = portfolios.find((p) => String(p.id) === String(id));

  // 5. Jika data selesai dimuat tapi ID tidak ditemukan di tabel Supabase
  if (!project && status === "succeeded") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)] text-[var(--text-main)]">
        <h1 className="text-4xl font-bold mb-4">Proyek Tidak Ditemukan</h1>
        <p className="text-[var(--text-muted)] mb-8 text-[1.4rem]">
          Proyek ini mungkin sudah dihapus dari database.
        </p>
        <Link
          to="/"
          className="text-[var(--color-primary)] hover:underline flex items-center gap-2 text-[1.4rem]"
        >
          <BiArrowBack /> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  // Hindari error render jika project masih undefined
  if (!project) return null;

  return <PortfolioDetailTemplate project={project} />;
}
