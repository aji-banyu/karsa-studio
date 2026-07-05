// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Membaca variabel dari file .env di Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi sederhana untuk memastikan env terbaca dengan benar
if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL atau Anon Key belum diatur di file .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
