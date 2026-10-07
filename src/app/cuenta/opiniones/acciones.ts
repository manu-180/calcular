"use server";

import { after } from "next/server";
import { refresh } from "next/cache";
import { clienteDelPedido, usuarioActual } from "@/lib/auth/sesion";
import { origenDelSitio } from "@/lib/auth/pedido";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { TOPE_DIARIO, rutaDeOrigen, validarOpinion, type EstadoEnvio, type Opinion } from "@/lib/opiniones";
import { avisarOpinionNueva } from "./aviso";

const FALLA_NUESTRA = "No pudimos guardarla por un problema nuestro. Probá de nuevo en unos minutos.";

export async function enviarOpinion(_prev: EstadoEnvio, fd: FormData): Promise<EstadoEnvio> {
  const crudoTipo = fd.get("tipo");
  const crudoMensaje = fd.get("mensaje");
  const valores = {
    tipo: typeof crudoTipo === "string" ? crudoTipo : "",
    mensaje: typeof crudoMensaje === "string" ? crudoMensaje : "",
  };
  if (!CUENTAS_ACTIVAS) return { estado: "error", mensaje: FALLA_NUESTRA, valores };

  const v = validarOpinion({ tipo: crudoTipo, mensaje: crudoMensaje });
  if (!v.ok || !v.tipo) return { estado: "error", errores: v.errores, valores };

  const usuario = await usuarioActual();
  if (!usuario) return { estado: "error", mensaje: "Se cerró tu sesión. Volvé a entrar y mandala de nuevo.", valores };
  const supabase = await clienteDelPedido();
  if (!supabase) return { estado: "error", mensaje: FALLA_NUESTRA, valores };

  // Con el cliente de la sesión y no con service role: RLS decide de quién es la fila
  // (user_id sale de auth.uid() en la base) y el tope diario corre en el trigger.
  const { data, error } = await supabase
    .from("ca_opiniones")
    .insert({ tipo: v.tipo, mensaje: v.mensaje, desde: rutaDeOrigen(fd.get("desde")) })
    .select("id, tipo, mensaje, desde, estado, created_at")
    .single();

  if (error || !data) {
    if (error?.message?.includes("ca_opiniones_tope")) {
      return {
        estado: "error",
        mensaje: `Por hoy llegaste al máximo de ${TOPE_DIARIO} opiniones. Guardá el texto y mandalo mañana.`,
        valores,
      };
    }
    console.error("[opiniones] no pude guardar:", error?.code, error?.message);
    return { estado: "error", mensaje: FALLA_NUESTRA, valores };
  }

  const enviada = data as Opinion;
  const origen = await origenDelSitio();
  after(() => avisarOpinionNueva(enviada, usuario.email, usuario.verificado, origen));
  refresh();
  return { estado: "ok", mensaje: "Gracias, la leemos todas.", enviada };
}
