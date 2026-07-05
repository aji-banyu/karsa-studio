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
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
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
