import "server-only";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { esTipoEvento, type TipoEvento } from "@/lib/rastreo";
import { servicio } from "@/lib/supabase/servicio";
import { esUuid, limpiarPath, limpiarProps, type FilaEvento } from "@/app/api/e/protocolo";

export type EventoServidor = {
  tipo: TipoEvento;
  path?: string;
  producto?: string;
  valor?: number;
  props?: Record<string, string | number | boolean | null>;
  userId?: string | null;
  vid?: string | null;
};

export function filaEventoServidor(e: EventoServidor): FilaEvento | null {
  if (!esTipoEvento(e.tipo)) return null;
  const path = e.path === undefined ? null : limpiarPath(e.path);
  const props = limpiarProps(e.props);
  if ((e.path !== undefined && !path) || props === undefined) return null;
  if (e.producto !== undefined && !/^[a-z0-9-]{1,40}$/.test(e.producto)) return null;
  if (e.valor !== undefined && !(Number.isFinite(e.valor) && Math.abs(e.valor) <= 1e10)) return null;
  return {
    vid: esUuid(e.vid) ? e.vid.toLowerCase() : null,
    sid: null,
    vista_id: null,
    tipo: e.tipo,
    path,
    producto: e.producto ?? null,
    valor: e.valor ?? null,
    props,
    user_id: esUuid(e.userId) ? e.userId : null,
  };
}

export async function registrarEvento(evento: EventoServidor): Promise<void> {
  if (!CUENTAS_ACTIVAS) return;
  try {
    const fila = filaEventoServidor(evento);
    if (!fila) {
      console.warn("[rastreo] evento de servidor inválido:", evento.tipo);
      return;
    }
    const { error } = await servicio().from("ca_eventos").insert(fila).abortSignal(AbortSignal.timeout(2000));
    if (error) console.error("[rastreo] ca_eventos:", error.code, error.message);
  } catch (e) {
    console.error("[rastreo] registrarEvento:", e instanceof Error ? e.message : e);
  }
}
