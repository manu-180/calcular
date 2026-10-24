import type { NextRequest } from "next/server";
import { esBot, leerCuerpo, sitioDeOrigen } from "@/app/api/e/protocolo";
import { sueldosApagados } from "@/lib/sueldos/lectura";
import { claveDeIp, crearLimite, huellaDeIp, ipDe } from "@/lib/sueldos/limite";
import { paisAportable } from "@/lib/sueldos/paises";
import { servicio } from "@/lib/supabase/servicio";
import { validarAporte } from "@/motor/sueldos/reglas";
import type { RespuestaAporte } from "@/motor/sueldos/tipos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const DEV = process.env.NODE_ENV !== "production";
const MAX_CUERPO = 512;
// Una persona aporta un sueldo por país y por mes; 6 por IP cada 10 minutos en memoria corta una ráfaga
// contra una instancia. El tope que vale entre instancias es el de la base (ca_sueldos_sumar): 3 por
// huella de IP y por día, 1 por huella y celda, 30 por celda y día.
const dentro = crearLimite(6, 10 * 60_000);
const DEV_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const json = (cuerpo: RespuestaAporte, status: number) =>
  Response.json(cuerpo, { status, headers: { "Cache-Control": "no-store" } });

// Todo rechazo es el mismo: a quien manda algo fuera de rango no se le dice qué estuvo mal.
function rechazar(motivo: string) {
  console.warn(`[api/sueldos] descartado: ${motivo}`);
  return json({ ok: false }, 400);
}

function origenValido(h: Headers): boolean {
  const origin = h.get("origin");
  if (sitioDeOrigen(origin, h.get("referer"), DEV)) return true;
  return DEV && Boolean(origin && DEV_LOCAL.test(origin));
}

export async function POST(req: NextRequest) {
  if (sueldosApagados()) return json({ ok: false }, 503);
  const h = req.headers;
  if (!origenValido(h)) return rechazar("origen");
  if (esBot(h.get("user-agent"))) return rechazar("bot");
  if (!(h.get("content-type") ?? "").startsWith("application/json")) return rechazar("tipo");
  if (!dentro(claveDeIp(ipDe(h)))) return rechazar("límite");

  const texto = await leerCuerpo(req, MAX_CUERPO).catch(() => null);
  if (!texto) return rechazar("tamaño");
  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(texto);
  } catch {
    return rechazar("json");
  }
  const ahora = new Date();
  const v = validarAporte(cuerpo, paisAportable, ahora);
  if ("error" in v) return rechazar(v.error);
  const f = v.fila;
  const huella = huellaDeIp(ipDe(h), ahora);
  if (!huella) return json({ ok: false }, 503);

  // La respuesta es solo { ok }: devolver la celda recalculada dejaba ver cómo la movió este aporte. El
  // aporte entra en la foto del día siguiente (ca_sueldos_publicar) y la página nunca muestra otra cosa.
  try {
    const { error } = await servicio()
      .rpc("ca_sueldos_sumar", {
        p_id: f.id,
        p_mercado: f.mercado,
        p_moneda: f.moneda,
        p_ocupacion: f.ocupacion,
        p_experiencia: f.experiencia,
        p_bruto: f.bruto_mensual,
        p_huella: huella,
      })
      .abortSignal(AbortSignal.timeout(4000));
    if (error) {
      // P0001 = un tope del día (huella o celda): para quien envía es un rechazo más.
      if (error.code === "P0001") return rechazar("tope");
      console.error("[api/sueldos] ca_sueldos_sumar:", error.code, error.message);
      return json({ ok: false }, 503);
    }
    return json({ ok: true }, 200);
  } catch (e) {
    console.error("[api/sueldos] escritura:", e instanceof Error ? e.message : e);
    return json({ ok: false }, 503);
  }
}
