import { createClient } from '@supabase/supabase-js';
let supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;