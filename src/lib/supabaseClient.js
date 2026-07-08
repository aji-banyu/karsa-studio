import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Konfigurasi tambahan agar sesi login hanya bertahan selama tab browser terbuka
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: window.sessionStorage,
  },
});
