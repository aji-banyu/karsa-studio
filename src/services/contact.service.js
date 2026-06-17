import axios from "axios";

export const sendContactForm = async (formData) => {
  try {
    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
      ...formData,
    };

    const response = await axios.post(
      "https://api.web3forms.com/submit",
      payload,
    );

    if (response.data.success) {
      return { success: true, message: "Pesan berhasil terkirim!" };
    } else {
      return {
        success: false,
        message: "Gagal mengirim pesan. Silakan coba lagi.",
      };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, message: "Terjadi kesalahan jaringan." };
  }
};
