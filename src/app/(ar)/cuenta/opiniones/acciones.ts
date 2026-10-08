"use server";

import { after } from "next/server";
import { refresh } from "next/cache";
import { clienteDelPedido, usuarioActual } from "@/lib/auth/sesion";
import { origenAlta, origenDelSitio, sitioDelPedido } from "@/lib/auth/pedido";
import { marcarOrigen } from "@/lib/auth/perfil";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { textosDe } from "@/lib/cuenta/textos";
import { TOPE_DIARIO, rutaDeOrigen, validarOpinion, type EstadoEnvio, type Opinion } from "@/lib/opiniones";
import { origenAR } from "@/motor/sitio";
import { avisarOpinionNueva } from "./aviso";

export async function enviarOpinion(_prev: EstadoEnvio, fd: FormData): Promise<EstadoEnvio> {
  const crudoTipo = fd.get("tipo");
  const crudoMensaje = fd.get("mensaje");
  const valores = {
    tipo: typeof crudoTipo === "string" ? crudoTipo : "",
    mensaje: typeof crudoMensaje === "string" ? crudoMensaje : "",
  };
  const sitio = await sitioDelPedido();
  const t = textosDe(sitio).opiniones;
  if (!CUENTAS_ACTIVAS) return { estado: "error", mensaje: t.falla, valores };

  const v = validarOpinion({ tipo: crudoTipo, mensaje: crudoMensaje }, t);
  if (!v.ok || !v.tipo) return { estado: "error", errores: v.errores, valores };

  const usuario = await usuarioActual();
  if (!usuario) return { estado: "error", mensaje: t.sesion, valores };
  const supabase = await clienteDelPedido();
  if (!supabase) return { estado: "error", mensaje: t.falla, valores };

  // Con el cliente de la sesión y no con service role: RLS decide de quién es la fila
  // (user_id sale de auth.uid() en la base) y el tope diario corre en el trigger.
  const desde = rutaDeOrigen(fd.get("desde"));
  const { data, error } = await supabase
    .from("ca_opiniones")
    .insert({ tipo: v.tipo, mensaje: v.mensaje, desde })
    .select("id, tipo, mensaje, desde, estado, created_at")
    .single();

  if (error || !data) {
    if (error?.message?.includes("ca_opiniones_tope")) {
      return { estado: "error", mensaje: t.tope(TOPE_DIARIO), valores };
    }
    console.error("[opiniones] no pude guardar:", error?.code, error?.message);
    return { estado: "error", mensaje: t.falla, valores };
  }

  const enviada = data as Opinion;
  const origen = await origenDelSitio();
  const alta = origenAlta(sitio, desde);
  // El panel vive sólo en calcular.ar: el aviso de una opinión de calcularya apunta allá.
  const panel = sitio === "intl" ? origenAR() : origen;
  after(async () => {
    if (alta) await marcarOrigen("ca_opiniones", enviada.id, usuario.id, alta);
    await avisarOpinionNueva(enviada, usuario.email, usuario.verificado, origen, panel, sitio === "intl" ? alta?.mercado : undefined);
  });
  refresh();
  return { estado: "ok", mensaje: t.gracias, enviada };
}
