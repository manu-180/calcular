import type { NextRequest } from "next/server";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { servicio } from "@/lib/supabase/servicio";
import {
  claveCliente,
  dentroDelLimite,
  dispositivo,
  esBot,
  leerCuerpo,
  origenPermitido,
  pais,
  validarLote,
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

async function escribir(lote: Lote) {
  const db = servicio();
  const tope = () => AbortSignal.timeout(4000);

  // Las vistas primero: el cierre y los eventos del mismo lote pueden apuntar a una vista que
  // recién se abre en este mismo envío.
  if (lote.vistas.length) {
    const { error } = await db
      .from("ca_vistas")
      .upsert(lote.vistas, { onConflict: "id", ignoreDuplicates: true })
      .abortSignal(tope());
    if (error) console.error("[api/e] ca_vistas:", error.code, error.message);
  }

  await Promise.all([
    ...lote.cierres.map(async (c) => {
      const { error } = await db.rpc("ca_cerrar_vista", c).abortSignal(tope());
      if (error) console.error("[api/e] ca_cerrar_vista:", error.code, error.message);
    }),
    (async () => {
      if (!lote.eventos.length) return;
      const { error } = await db.from("ca_eventos").insert(lote.eventos).abortSignal(tope());
      if (error) console.error("[api/e] ca_eventos:", error.code, error.message);
    })(),
  ]);
}

export async function POST(req: NextRequest) {
  if (!CUENTAS_ACTIVAS) return listo();
  const h = req.headers;
  if (!origenPermitido(h.get("origin"), h.get("referer"), DEV)) return descartar("origen");
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

  const lote = validarLote(cuerpo, {
    dispositivo: dispositivo(ua, h.get("sec-ch-ua-mobile")),
    pais: pais(h.get("x-vercel-ip-country")),
  });
  if ("error" in lote) return descartar(lote.error);
  if (lote.descartados.length) console.warn(`[api/e] items descartados: ${lote.descartados.join(",")}`);

  try {
    await escribir(lote);
  } catch (e) {
    console.error("[api/e] escritura:", e instanceof Error ? e.message : e);
  }
  return listo();
}
