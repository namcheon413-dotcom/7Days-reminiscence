/* ========================================
   七曜回顧錄
   SUPABASE CLIENT
======================================== */


/* ========================================
   CONFIG
======================================== */

const SUPABASE_URL =
  "https://cxzortyblxfhvyvcrulj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_ECy4BrEyOt3DsE-BQ8RBow_RJvq1MQM";


/* ========================================
   CLIENT
======================================== */

if (!window.supabase) {
  throw new Error(
    "[SUPABASE] Supabase library is not loaded."
  );
}


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
      }
    }
  );


/* ========================================
   GLOBAL ACCESS
======================================== */

window.supabaseClient =
  supabaseClient;


console.log(
  "[SUPABASE] Client ready."
);
