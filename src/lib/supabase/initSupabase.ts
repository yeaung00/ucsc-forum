import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://dozwulnsjssbbstjijfq.supabase.co",
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvend1bG5zanNzYmJzdGppamZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzkyODMwNCwiZXhwIjoyMDA5NTA0MzA0fQ.ln6a7Sfk34YG_CKv_E1fB-NaqRKymYOe7sxtEo4xpx8'
  process.env.NEXT_PUBLIC_SUPABASE_SECRET ?? '',
  { auth: { persistSession: false } },
);
