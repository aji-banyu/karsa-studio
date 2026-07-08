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

  // STATE BARU UNTUK MANAJEMEN GAMBAR
  const [existingImages, setExistingImages] = useState([]); // Menyimpan URL gambar yang sudah ada
  const [imagesToDelete, setImagesToDelete] = useState([]); // Menyimpan URL gambar yang ditandai untuk dihapus
  const [imageFiles, setImageFiles] = useState([]); // Menyimpan file fisik gambar BARU yang akan diupload

  const [formData, setFormData] = useState({
    title: "",
    category: "UI/UX Design",
    description: "",
    status: "Completed",
    source_code: "",
    figma_link: "",
    tech_stack: "",
  });

  useEffect(() => {
    document.title = "Kelola Portfolio | Admin Karsa Studio";
  }, []);
  useEffect(() => {
    if (status === "idle") dispatch(fetchPortfolios());
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus proyek ini secara permanen?")) {
      dispatch(deletePortfolio(id));
      // Catatan: Di aplikasi skala besar, kamu juga harus menghapus gambarnya dari Storage di sini.
    }
  };

  const handleTogglePublish = (item) => {
    const currentStatus = item.is_published === false ? false : true;
    dispatch(
      updatePortfolio({
        id: item.id,
        updatedData: { is_published: !currentStatus },
      }),
    );
  };

  // KETIKA TOMBOL EDIT DIKLIK
  const handleEditClick = (item) => {
    setFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      status: item.status || "Completed",
      source_code: item.source_code || "",
      figma_link: item.figma_link || "",
      tech_stack: item.tech_stack || "",
    });
    setEditingId(item.id);

    // Set gambar lama ke dalam state khusus
    setExistingImages(item.image_urls || []);
    setImagesToDelete([]); // Kosongkan daftar hapus
    setImageFiles([]); // Kosongkan input file baru

    setIsModalOpen(true);
  };

  // KETIKA TOMBOL TAMBAH BARU DIKLIK
  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      category: "UI/UX Design",
      description: "",
      status: "Completed",
      source_code: "",
      figma_link: "",
      tech_stack: "",
    });
    setEditingId(null);
    setExistingImages([]);
    setImagesToDelete([]);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setImageFiles(Array.from(e.target.files));

  // --- FUNGSI MANAJEMEN GAMBAR (UI) ---
  const handleSetCover = (index) => {
    const newImages = [...existingImages];
    const [selectedImage] = newImages.splice(index, 1); // Cabut gambar dari posisinya
    newImages.unshift(selectedImage); // Taruh di urutan paling depan (index 0)
    setExistingImages(newImages);
  };

  const handleRemoveExistingImage = (index) => {
    const newImages = [...existingImages];
    const [removedImage] = newImages.splice(index, 1); // Cabut gambar dari array
    setExistingImages(newImages); // Update tampilan UI
    setImagesToDelete([...imagesToDelete, removedImage]); // Masukkan ke daftar "Tunggu Dieksekusi (Dihapus)"
  };
  // ------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. HAPUS GAMBAR LAMA DARI STORAGE (Jika ada yang ditandai untuk dihapus)
      if (imagesToDelete.length > 0) {
        const filesToRemove = imagesToDelete.map((url) => url.split("/").pop());
        const { error: deleteError } = await supabase.storage
          .from("portfolio_images")
          .remove(filesToRemove);
        if (deleteError)
          console.warn(
            "Peringatan: Gagal menghapus beberapa gambar lama.",
            deleteError.message,
          );
      }

      // 2. UPLOAD GAMBAR BARU (Jika ada)
      let uploadedUrls = [];
      if (imageFiles.length > 0) {
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
      }

      // 3. GABUNGKAN GAMBAR LAMA (Yang dipertahankan) & GAMBAR BARU
      // Karena Visual Utama adalah index ke-0, existingImages (yang sudah diatur urutannya) ditaruh di depan.
      const finalImageUrls = [...existingImages, ...uploadedUrls];

      const dataToSave = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        status: formData.status,
        source_code: formData.source_code,
        figma_link: formData.figma_link,
        tech_stack: formData.tech_stack,
        image_urls: finalImageUrls,
      };

      // 4. SIMPAN KE DATABASE
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
              {status === "succeeded" &&
                portfolios.map((item) => {
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
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-bold border ${isPublished ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}
                          >
                            {isPublished ? "👁️ Publik" : "🔒 Sembunyi"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 w-full max-w-3xl border border-slate-700 rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2
              className="text-[20px] font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {editingId ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* --- AREA MANAJEMEN GAMBAR LAMA (Hanya Muncul Saat Edit) --- */}
              {editingId && existingImages.length > 0 && (
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60 mb-6">
                  <label className="block text-[12px] font-medium text-slate-400 mb-3">
                    Gambar Saat Ini (Geser Cover ke Urutan Pertama)
                  </label>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {existingImages.map((imgUrl, index) => (
                      <div
                        key={index}
                        className={`relative w-32 h-24 shrink-0 rounded-lg overflow-hidden border-2 ${index === 0 ? "border-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]" : "border-slate-700"}`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Label Visual Utama untuk index 0 */}
                        {index === 0 && (
                          <div className="absolute top-0 left-0 w-full bg-[var(--color-primary)] text-white text-[9px] font-bold text-center py-0.5">
                            COVER UTAMA
                          </div>
                        )}

                        {/* Tombol Aksi Gambar */}
                        <div className="absolute bottom-0 left-0 w-full bg-black/80 flex items-center justify-between p-1 opacity-0 hover:opacity-100 transition-opacity">
                          {index !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetCover(index)}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold px-1 cursor-pointer"
                            >
                              Jadikan Cover
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveExistingImage(index)}
                            className="text-[10px] text-red-400 hover:text-red-300 font-bold px-1 cursor-pointer ml-auto"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* ------------------------------------------------------------- */}

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
                      {editingId
                        ? "Tambahkan Gambar Baru (Opsional)"
                        : "Upload Gambar (Wajib)"}
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      // Wajib jika ini project baru ATAU jika saat edit semua gambar lama sudah dihapus
                      required={
                        !editingId || (editingId && existingImages.length === 0)
                      }
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
