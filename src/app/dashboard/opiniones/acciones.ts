"use server";

import { refresh } from "next/cache";
import { usuarioActual } from "@/lib/auth/sesion";
import { esAdminEmail } from "@/lib/auth/admin";
import { servicio } from "@/lib/supabase/servicio";
import { esEstado, type EstadoOpinion } from "@/lib/opiniones";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Una Server Action es un endpoint público: se revalida admin acá aunque la página ya lo hizo,
// y recién después se usa service role.
export async function marcarOpinion(id: string, estado: EstadoOpinion): Promise<{ ok: boolean }> {
  if (typeof id !== "string" || !UUID.test(id) || !esEstado(estado)) return { ok: false };
  const usuario = await usuarioActual();
  if (!usuario || !usuario.verificado || !esAdminEmail(usuario.email)) return { ok: false };
  const { error } = await servicio().from("ca_opiniones").update({ estado }).eq("id", id);
  if (error) {
    console.error("[opiniones] no pude cambiar el estado:", error.code, error.message);
    return { ok: false };
  }
  refresh();
  return { ok: true };
}
