import type { NextRequest } from "next/server";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { TIPOS_BOCA_A_BOCA } from "@/lib/rastreo";
import { servicio } from "@/lib/supabase/servicio";
import {
  CLAVES_BASE_CIERRE,
  claveCliente,
  dentroDelLimite,
  dispositivo,
  esBot,
  leerCuerpo,
  pais,
  sitioDeOrigen,
  validarLote,
  type ArgsCierre,
  type FilaEvento,
  type Lote,
} from "./protocolo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

const DEV = process.env.NODE_ENV !== "production";

// Siempre 204 y sin cuerpo: a quien manda basura no se le dice qué estuvo mal.
const listo = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

function descartar(motivo: string) {
  console.warn(`[api/e] descartado: ${motivo}`);
  return listo();
}

// Antes de la migración 20261008120000 las columnas sitio/mercado no existen: una fila intl
// cargada sin ellas quedaría contada como Argentina, así que se descarta en vez de reintentarse.
const SIN_COLUMNA = new Set(["PGRST204", "42703"]);
let avisoSinColumna = false;
let avisoSinTipos = false;
let avisoSinFugas = false;

function sinFugas() {
  if (!avisoSinFugas) {
    avisoSinFugas = true;
    console.warn("[api/e] falta la migración 20261024160000 (fugas): se guarda sólo el cierre básico");
  }
}

// Sin ca_cerrar_vista2 (antes de la migración) el cierre básico sigue entrando por la función vieja;
// los vitals sueltos no tienen dónde ir y se pierden.
async function cerrarVista(db: ReturnType<typeof servicio>, c: ArgsCierre, tope: () => AbortSignal) {
  const { error } = await db.rpc("ca_cerrar_vista2", c).abortSignal(tope());
  if (!error) return;
  if (error.code !== "PGRST202") return console.error("[api/e] ca_cerrar_vista2:", error.code, error.message);
  sinFugas();
  if (c.p_activo_ms === undefined) return;
  const base = Object.fromEntries(CLAVES_BASE_CIERRE.map((k) => [k, c[k] ?? (k === "p_uso" ? false : 0)]));
  const viejo = await db.rpc("ca_cerrar_vista", base).abortSignal(tope());
  if (viejo.error) console.error("[api/e] ca_cerrar_vista:", viejo.error.code, viejo.error.message);
}

function sinMigracion(error: { code?: string } | null, intl: boolean): boolean {
  if (!error || !intl || !SIN_COLUMNA.has(error.code ?? "")) return false;
  if (!avisoSinColumna) {
    avisoSinColumna = true;
    console.warn("[api/e] falta la migración de sitio/mercado: se descartan las vistas de calcularya hasta correrla");
  }
  return true;
}

async function escribir(lote: Lote, intl: boolean) {
  const db = servicio();
  const tope = () => AbortSignal.timeout(4000);

  // Las vistas primero: el cierre y los eventos del mismo lote pueden apuntar a una vista que
  // recién se abre en este mismo envío.
  if (lote.vistas.length) {
    const upsert = (filas: Lote["vistas"]) =>
      db.from("ca_vistas").upsert(filas, { onConflict: "id", ignoreDuplicates: true }).abortSignal(tope());
    let { error } = await upsert(lote.vistas);
    if (error && SIN_COLUMNA.has(error.code ?? "") && lote.vistas.some((v) => v.exp)) {
      sinFugas();
      ({ error } = await upsert(lote.vistas.map(({ exp: _e, ...resto }) => resto)));
    }
    if (error && !sinMigracion(error, intl)) console.error("[api/e] ca_vistas:", error.code, error.message);
  }

  await Promise.all([
    ...lote.cierres.map((c) => cerrarVista(db, c, tope)),
    (async () => {
      if (!lote.eventos.length) return;
      const insertar = async (filas: FilaEvento[]) => {
        let { error } = await db.from("ca_eventos").insert(filas).abortSignal(tope());
        // Antes de 20261014120000 ca_eventos no tiene país: el evento vale más que el país, va sin él.
        if (error && SIN_COLUMNA.has(error.code ?? "")) {
          const sinPais = filas.map(({ pais: _p, ...resto }) => resto);
          ({ error } = await db.from("ca_eventos").insert(sinPais).abortSignal(tope()));
        }
        return error;
      };
      let error = await insertar(lote.eventos);
      // 23514 = CHECK de tipo: antes de 20261023130000 la base no conoce llegada ni puente_*. Un tipo
      // desconocido tira el insert entero, así que los demás eventos del lote se reintentan sin ellos.
      if (error?.code === "23514" && lote.eventos.some((e) => TIPOS_BOCA_A_BOCA.has(e.tipo))) {
        if (!avisoSinTipos) {
          avisoSinTipos = true;
          console.warn("[api/e] falta la migración de boca en boca: se descartan llegada y puente_* hasta correrla");
        }
        const previos = lote.eventos.filter((e) => !TIPOS_BOCA_A_BOCA.has(e.tipo));
        error = previos.length ? await insertar(previos) : null;
      }
      if (error && !sinMigracion(error, intl)) console.error("[api/e] ca_eventos:", error.code, error.message);
    })(),
  ]);
}

export async function POST(req: NextRequest) {
  if (!CUENTAS_ACTIVAS) return listo();
  const h = req.headers;
  const origen = sitioDeOrigen(h.get("origin"), h.get("referer"), DEV);
  if (!origen) return descartar("origen");
  const ua = h.get("user-agent");
  if (esBot(ua)) return descartar("bot");
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip");
  if (!dentroDelLimite(claveCliente(ip))) return descartar("límite");

  const texto = await leerCuerpo(req).catch(() => null);
  if (!texto) return descartar("tamaño");
  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(texto);
  } catch {
    return descartar("json");
  }

  const sitio =
    origen === "dev" ? ((cuerpo as { s?: unknown } | null)?.s === "intl" ? "intl" : "ar") : origen;
  const lote = validarLote(cuerpo, {
    dispositivo: dispositivo(ua, h.get("sec-ch-ua-mobile")),
    pais: pais(h.get("x-vercel-ip-country")),
    sitio,
  });
  if ("error" in lote) return descartar(lote.error);
  if (lote.descartados.length) console.warn(`[api/e] items descartados: ${lote.descartados.join(",")}`);

  try {
    await escribir(lote, sitio === "intl");
  } catch (e) {
    console.error("[api/e] escritura:", e instanceof Error ? e.message : e);
  }
  return listo();
}
