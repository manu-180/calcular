import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { servicio } from "@/lib/supabase/servicio";

export const PERFILES = ["empleado", "empleador", "contador", "monotributista", "estudio", "otro"] as const;
export type TipoPerfil = (typeof PERFILES)[number];

type Falla = { code?: string; message?: string } | null;

function avisar(donde: string, error: Falla) {
  if (error) console.error(`[auth] ${donde}:`, error.code ?? "", error.message ?? "");
}

export async function perfilPorEmail(email: string): Promise<{ existe: boolean; error: boolean }> {
  try {
    const { data, error } = await servicio()
      .from("ca_perfiles")
      .select("user_id")
      .eq("email", email)
      .limit(1)
      .maybeSingle();
    avisar("perfilPorEmail", error);
    return { existe: !!data, error: !!error };
  } catch (e) {
    console.error("[auth] perfilPorEmail", e);
    return { existe: false, error: true };
  }
}

// Alta y verificado_at sólo con service role: la RLS no deja que el usuario los toque, y es lo
// que impide que alguien se marque verificado a sí mismo.
export async function asegurarPerfil(userId: string, email: string, verificar: boolean): Promise<boolean> {
  try {
    const s = servicio();
    const { data, error } = await s
      .from("ca_perfiles")
      .select("verificado_at, email")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) {
      avisar("asegurarPerfil/leer", error);
      return false;
    }
    const ahora = new Date().toISOString();
    if (!data) {
      const alta = await s
        .from("ca_perfiles")
        .insert({ user_id: userId, email, verificado_at: verificar ? ahora : null });
      if (alta.error && alta.error.code !== "23505") {
        avisar("asegurarPerfil/alta", alta.error);
        return false;
      }
      if (!alta.error) return true;
    }
    const cambios: Record<string, string> = {};
    if (data?.email !== email) cambios.email = email;
    // Si cambia el email, el trigger anula verificado_at: hay que volver a escribirlo en el mismo update.
    if (verificar && (!data?.verificado_at || cambios.email)) cambios.verificado_at = ahora;
    if (Object.keys(cambios).length === 0) return true;
    const upd = await s.from("ca_perfiles").update(cambios).eq("user_id", userId);
    avisar("asegurarPerfil/actualizar", upd.error);
    return !upd.error;
  } catch (e) {
    console.error("[auth] asegurarPerfil", e);
    return false;
  }
}

// Verificado sólo si la prueba de buzón es de ESTE mail: un perfil verificado con otro email
// (la cuenta cambió de mail) no prueba nada sobre el actual. Ante un error, falla cerrado.
export async function verificadoPrevio(userId: string, email: string): Promise<boolean> {
  try {
    const { data, error } = await servicio()
      .from("ca_perfiles")
      .select("verificado_at, email")
      .eq("user_id", userId)
      .maybeSingle();
    avisar("verificadoPrevio", error);
    return !error && !!data?.verificado_at && data.email === email;
  } catch (e) {
    console.error("[auth] verificadoPrevio", e);
    return false;
  }
}

export async function vincularCompras(cliente: SupabaseClient): Promise<number> {
  const { data, error } = await cliente.rpc("ca_vincular_compras");
  avisar("ca_vincular_compras", error);
  return typeof data === "number" ? data : 0;
}
