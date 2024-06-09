import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ephglbfprhhmbdzzdabx.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaGdsYmZwcmhobWJkenpkYWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MDYzODcsImV4cCI6MjAyNzk4MjM4N30.E5rIQE2R-9uFSsU4YEnTxAdLt65Ij1ABnOb6_-t-zhc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
