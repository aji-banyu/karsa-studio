import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { BiEnvelope, BiLockAlt, BiShieldQuarter } from "react-icons/bi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) navigate("/admin");
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.session) navigate("/admin");
    } catch (error) {
      setErrorMsg(
        "Kredensial tidak valid. Silakan periksa kembali email dan password Anda.",
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Memaksa background gelap (slate-950) khusus untuk halaman login agar selalu premium
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[var(--color-primary)] selection:text-white">
      {/* Efek Cahaya Artistik (Ambient Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-5xl pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-[var(--color-primary)]/20 blur-[100px] md:blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full bg-blue-600/10 blur-[100px]"></div>
      </div>

      {/* Kotak Login Lebar & Elegan */}
      <div className="w-full max-w-[500px] bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] z-10">
        {/* Header Icon & Title */}
        <div className="text-center mb-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-800/50 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <BiShieldQuarter className="text-[32px] text-[var(--color-primary)]" />
          </div>
          <h1 className="text-[32px] md:text-[36px] font-extrabold text-white tracking-tight leading-tight">
            Karsa <span className="text-[var(--color-primary)]">Workspace</span>
          </h1>
          <p className="text-slate-400 text-[14px] md:text-[15px] mt-3">
            Otorisasi diperlukan. Masukkan kredensial Anda.
          </p>
        </div>

        {/* Pesan Error */}
        {errorMsg && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-[13px] text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Input Email */}
          <div className="space-y-2.5">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 text-[20px]">
                <BiEnvelope />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 focus:border-[var(--color-primary)] focus:bg-slate-900 rounded-2xl pl-14 pr-5 py-4 text-[15px] text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="admin@karsastudio.com"
              />
            </div>
          </div>

          {/* Input Password */}
          <div className="space-y-2.5">
            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-500 text-[20px]">
                <BiLockAlt />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-700 focus:border-[var(--color-primary)] focus:bg-slate-900 rounded-2xl pl-14 pr-5 py-4 text-[15px] text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-6 rounded-2xl text-white text-[16px] font-bold shadow-lg shadow-[var(--color-primary)]/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 cursor-pointer"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              "Akses Dashboard"
            )}
          </button>
        </form>
      </div>

      {/* Footer Text */}
      <p className="mt-10 text-[12px] text-slate-600 font-medium z-10">
        &copy; {new Date().getFullYear()} Karsa Studio. Secure Login Portal.
      </p>
    </div>
  );
}
