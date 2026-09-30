import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { OPCIONES_COOKIE_SESION } from "@/lib/auth/cookies";

export async function clienteServidor() {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Faltan SUPABASE_URL / SUPABASE_ANON_KEY");
  const store = await cookies();
  return createServerClient(url, anon, {
    cookieOptions: OPCIONES_COOKIE_SESION,
    cookies: {
      getAll: () => store.getAll(),
      setAll: (lista) => {
        // Un Server Component no puede escribir cookies: ahí tira y el refresh lo hace proxy.ts.
        try {
          for (const { name, value, options } of lista) store.set(name, value, options);
        } catch {}
      },
    },
  });
}
