import "server-only";
import { cache } from "react";
import { unstable_rethrow } from "next/navigation";
import { clienteServidor } from "@/lib/supabase/servidor";

export type Usuario = { id: string; email: string; verificado: boolean };

export type PerfilPropio = {
  email: string;
  nombre: string | null;
  perfil: string | null;
  novedades: boolean;
  verificado: boolean;
};

export const clienteDelPedido = cache(async () => {
  try {
    return await clienteServidor();
  } catch (e) {
    // cookies() tira un error propio de Next para marcar la ruta dinámica: tragarlo lo esconde.
    unstable_rethrow(e);
    console.error("[auth] sin configuración de Supabase", e);
    return null;
  }
});

export const perfilPropio = cache(async (userId: string): Promise<PerfilPropio | null> => {
  const supabase = await clienteDelPedido();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("ca_perfiles")
    .select("email, nombre, perfil, novedades, verificado_at")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("[auth] no pude leer ca_perfiles:", error.code, error.message);
    return null;
  }
  if (!data) return null;
  return {
    email: String(data.email ?? ""),
    nombre: data.nombre ?? null,
    perfil: data.perfil ?? null,
    novedades: !!data.novedades,
    verificado: !!data.verificado_at,
  };
});

function sujetoDelToken(token: string | undefined): string | null {
  const cuerpo = token?.split(".")[1];
  if (!cuerpo) return null;
  try {
    const sub: unknown = JSON.parse(Buffer.from(cuerpo, "base64url").toString("utf8")).sub;
    return typeof sub === "string" && sub ? sub : null;
  } catch {
    return null;
  }
}

// El id del token SIN validar: sólo sirve para disparar las lecturas propias en paralelo con
// getUser en vez de después. No autoriza nada: las lecturas viajan con el mismo JWT (PostgREST
// verifica la firma) y lo leído con este id se usa sólo si coincide con el que confirma getUser.
// getSession no sale a la red salvo que el token esté por vencer, y eso ya lo resolvió proxy.ts.
export const sujetoSinValidar = cache(async (): Promise<string | null> => {
  const supabase = await clienteDelPedido();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return sujetoDelToken(data.session?.access_token);
});

// getUser() y no getSession(): la cookie la puede fabricar cualquiera; getUser la valida contra
// Supabase. «Verificado» es nuestro (ca_perfiles.verificado_at), no email_confirmed_at: ver
// decisión 6 del SPEC.
export const usuarioActual = cache(async (): Promise<Usuario | null> => {
  const supabase = await clienteDelPedido();
  if (!supabase) return null;
  const sub = await sujetoSinValidar();
  const anticipado = sub ? perfilPropio(sub) : null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;
  const email = data.user.email.toLowerCase();
  const perfil = data.user.id === sub && anticipado ? await anticipado : await perfilPropio(data.user.id);
  return {
    id: data.user.id,
    email,
    // La prueba de buzón vale para el mail con que se hizo: si la cuenta cambió de mail, no cuenta.
    verificado: !!perfil?.verificado && perfil.email === email,
  };
});
