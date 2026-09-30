import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cliente: SupabaseClient | null = null;

// Vercel tiene SUPABASE_SERVICE_KEY en todos los entornos y SUPABASE_SERVICE_ROLE_KEY sólo en
// producción; envkit local sólo la segunda. Se aceptan las dos para que ningún entorno quede ciego.
export function claveServicio(): string | undefined {
  return process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function servicio(): SupabaseClient {
  if (cliente) return cliente;
  const url = process.env.SUPABASE_URL;
  const clave = claveServicio();
  if (!url || !clave) throw new Error("Faltan SUPABASE_URL / SUPABASE_SERVICE_KEY");
  cliente = createClient(url, clave, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  return cliente;
}
