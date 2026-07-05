import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPortfolios,
  deletePortfolio,
  addPortfolio,
  updatePortfolio,
} from "../../../redux/portfolioSlice";
import { supabase } from "../../../lib/supabaseClient";

export default function ManagePortfolio() {
  const dispatch = useDispatch();
  const {
    items: portfolios,
    status,
    error,
  } = useSelector((state) => state.portfolio);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "UI/UX Design",
    description: "",
    status: "Completed",
    source_code: "",
    figma_link: "",
    tech_stack: "",
    image_urls: [],
  });

  useEffect(() => {
    document.title = "Kelola Portfolio | Admin Karsa Studio";
  }, []);
  useEffect(() => {
    if (status === "idle") dispatch(fetchPortfolios());
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus proyek ini secara permanen?"))
      dispatch(deletePortfolio(id));
  };

  // --- FUNGSI BARU: SAKLAR PUBLISH/DRAFT ---
  const handleTogglePublish = (item) => {
    // Jika data lama tidak punya is_published, kita anggap true.
    const currentStatus = item.is_published === false ? false : true;
    dispatch(
      updatePortfolio({
        id: item.id,
        updatedData: { is_published: !currentStatus },
      }),
    );
  };

  const handleEditClick = (item) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      status: item.status || "Completed",
      source_code: item.source_code || "",
      figma_link: item.figma_link || "",
      tech_stack: item.tech_stack || "",
      image_urls: item.image_urls || [],
    });
    setEditingId(item.id);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      category: "UI/UX Design",
      description: "",
      status: "Completed",
      source_code: "",
      figma_link: "",
      tech_stack: "",
      image_urls: [],
    });
    setEditingId(null);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFiles(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrls = formData.image_urls;
      if (imageFiles.length > 0) {
        let uploadedUrls = [];
        for (const file of imageFiles) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from("portfolio_images")
            .upload(fileName, file);
          if (uploadError) throw uploadError;
          const { data } = supabase.storage
            .from("portfolio_images")
            .getPublicUrl(fileName);
          uploadedUrls.push(data.publicUrl);
        }
        finalImageUrls = uploadedUrls;
      }

      const dataToSave = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        status: formData.status,
        source_code: formData.source_code,
        figma_link: formData.figma_link,
        tech_stack: formData.tech_stack,
        image_urls: finalImageUrls,
        // Note: is_published tidak perlu diikutsertakan di form, default-nya true (diatur di database)
      };

      if (editingId) {
        await dispatch(
          updatePortfolio({ id: editingId, updatedData: dataToSave }),
        );
      } else {
        await dispatch(addPortfolio(dataToSave));
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Gagal menyimpan data: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800/60">
        <div>
          <h1
            className="text-[30px] leading-tight font-extrabold text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Portfolio
          </h1>
          <p className="text-slate-400 text-[14px] mt-2">
            Kelola data proyek lengkap Karsa Studio.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="text-white px-6 py-3 rounded-xl text-[14px] font-bold transition-all cursor-pointer shadow-lg hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          + Tambah Proyek
        </button>
      </div>

      {status === "failed" && (
        <div className="bg-red-500/10 border border-red-500/30 p-6 text-red-400 text-[14px]">
          {error}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-800/60">
                <th className="px-6 py-5 font-semibold w-28">Visual Utama</th>
                <th className="px-6 py-5 font-semibold">Detail Proyek</th>
                <th className="px-6 py-5 font-semibold">Status Data</th>
                <th className="px-6 py-5 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {status === "loading" && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-16 text-center text-slate-400 text-[14px]"
                  >
                    Memuat data...
                  </td>
                </tr>
              )}
              {status === "succeeded" && portfolios.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-20 text-center text-slate-300">
                    Belum Ada Proyek
                  </td>
                </tr>
              )}

              {status === "succeeded" &&
                portfolios.map((item) => {
                  // Menentukan status publikasi saat ini
                  const isPublished = item.is_published !== false;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/30 transition-colors ${!isPublished ? "opacity-50 grayscale-[50%]" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="w-20 h-14 bg-slate-800 rounded-lg overflow-hidden border border-slate-700 relative">
                          <img
                            src={
                              item.image_urls && item.image_urls.length > 0
                                ? item.image_urls[0]
                                : "https://via.placeholder.com/150"
                            }
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          {!isPublished && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-[10px] font-bold text-white">
                              DRAFT
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[16px] font-bold text-slate-200">
                          {item.title}
                        </p>
                        <p
                          className="text-[12px] mt-1"
                          style={{ color: "var(--color-primary)" }}
                        >
                          {item.tech_stack || "Belum diatur"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2 items-start">
                          {/* Lencana (Badge) Publikasi */}
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border ${isPublished ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}
                          >
                            {isPublished ? "👁️ Publik" : "🔒 Sembunyi"}
                          </span>
                          <span
                            className={`text-[11px] font-bold ${item.status === "Completed" ? "text-green-400" : "text-amber-400"}`}
                          >
                            • {item.status || "Completed"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* TOMBOL SAKLAR PUBLISH/DRAFT */}
                          <button
                            onClick={() => handleTogglePublish(item)}
                            className={`hover:text-white px-3 py-1.5 rounded-lg transition-all text-[12px] font-medium cursor-pointer ${isPublished ? "text-amber-400 bg-amber-400/10 hover:bg-amber-500" : "text-emerald-400 bg-emerald-400/10 hover:bg-emerald-500"}`}
                          >
                            {isPublished ? "Sembunyikan" : "Tampilkan"}
                          </button>

                          <button
                            onClick={() => handleEditClick(item)}
                            className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-all text-[12px] font-medium cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-all text-[12px] font-medium cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- KODE MODAL TETAP SAMA SEPERTI SEBELUMNYA --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-3xl border border-slate-700 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2
              className="text-[20px] font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {editingId ? "Edit Proyek" : "Tambah Proyek Lengkap"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Judul Proyek
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Kategori
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Status Pengerjaan
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none cursor-pointer"
                    >
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Teknologi
                    </label>
                    <input
                      type="text"
                      name="tech_stack"
                      value={formData.tech_stack}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Upload Gambar Baru{" "}
                      {editingId ? (
                        <span className="text-amber-400 ml-1">
                          (Kosongkan jika sama)
                        </span>
                      ) : (
                        ""
                      )}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      required={!editingId}
                      onChange={handleFileChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-[14px] text-slate-400 outline-none cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[12px] file:font-semibold file:bg-slate-800 file:text-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Link Source Code
                    </label>
                    <input
                      type="url"
                      name="source_code"
                      value={formData.source_code}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                      Link Figma
                    </label>
                    <input
                      type="url"
                      name="figma_link"
                      value={formData.figma_link}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-[14px] text-slate-200 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-[12px] font-medium text-slate-400 mb-1.5">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-[14px] text-slate-200 outline-none resize-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => !isUploading && setIsModalOpen(false)}
                  disabled={isUploading}
                  className="px-5 py-2.5 text-[14px] font-medium text-slate-400 hover:text-white cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="text-white px-8 py-2.5 rounded-xl text-[14px] font-bold cursor-pointer shadow-lg disabled:opacity-50 flex items-center gap-2"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                    </>
                  ) : editingId ? (
                    "Update Proyek"
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
