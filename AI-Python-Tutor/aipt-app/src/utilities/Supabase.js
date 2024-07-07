import { createClient } from '@supabase/supabase-js';
let supabaseUrl = "https://tbycnfeusflvnfhykvph.supabase.co";
let supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRieWNuZmV1c2Zsdm5maHlrdnBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NzI4NzcsImV4cCI6MjAzMjM0ODg3N30.uPBhXBrcp2_p-DJ-5jNmABAK1As09OpWIs7qKyf5Mv4";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;