import "server-only";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { esTipoEvento, type TipoEvento } from "@/lib/rastreo";
import { servicio } from "@/lib/supabase/servicio";
import { esUuid, limpiarPath, limpiarProps, type FilaEvento } from "@/app/api/e/protocolo";
import { esMercadoIntl } from "@/lib/medicion/mercados";

export type EventoServidor = {
  tipo: TipoEvento;
  path?: string;
  producto?: string;
  valor?: number;
  props?: Record<string, string | number | boolean | null>;
  userId?: string | null;
  vid?: string | null;
  // Sólo calcularya: las filas de calcular.ar no lo llevan y la base pone 'ar'.
  origen?: { sitio: "intl"; mercado: string };
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
    ...(e.origen && esMercadoIntl(e.origen.mercado) ? { sitio: "intl" as const, mercado: e.origen.mercado } : {}),
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
    let { error } = await servicio().from("ca_eventos").insert(fila).abortSignal(AbortSignal.timeout(2000));
    // Antes de la migración 20261008120000 no hay columnas sitio/mercado: el evento queda sin ellas.
    if (error && fila.sitio && (error.code === "PGRST204" || error.code === "42703")) {
      const { sitio: _s, mercado: _m, ...sinOrigen } = fila;
      void _s;
      void _m;
      ({ error } = await servicio().from("ca_eventos").insert(sinOrigen).abortSignal(AbortSignal.timeout(2000)));
    }
    if (error) console.error("[rastreo] ca_eventos:", error.code, error.message);
  } catch (e) {
    console.error("[rastreo] registrarEvento:", e instanceof Error ? e.message : e);
  }
}
