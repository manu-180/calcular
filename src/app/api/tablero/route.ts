import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { cargarPanel } from "@/lib/panel/datos";
import type { PanelDatos } from "@/lib/panel/tipos";

// Resumen para el tablero de manager.theapexweb.com (APEX, calcular y FacturApp en una pantalla).
// Sólo números agregados, con un token propio (TABLERO_TOKEN, envkit global): APEX nunca recibe la
// clave de servicio de esta base.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function autorizado(req: NextRequest): boolean {
  const esperado = process.env.TABLERO_TOKEN;
  const dado = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!esperado || dado.length !== esperado.length) return false;
  return timingSafeEqual(Buffer.from(dado), Buffer.from(esperado));
}

function resumir(p: PanelDatos) {
  const kpi = Object.fromEntries(p.kpis.map((k) => [k.clave, { valor: k.valor, anterior: k.anterior }]));
  return {
    desde: p.desde,
    hasta: p.hasta,
    kpis: kpi,
    serie: p.kpis.find((k) => k.clave === "visitantes")?.serie ?? [],
    fuentes: p.fuentes.slice(0, 6),
    paginas: p.paginas.slice(0, 6).map((f) => ({ path: f.path, titulo: f.titulo, vistas: f.vistas })),
  };
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const [hoy, semana, mes] = await Promise.all([cargarPanel("hoy", "ar"), cargarPanel("7d", "ar"), cargarPanel("30d", "ar")]);
    return NextResponse.json(
      { generado: new Date().toISOString(), vivo: hoy.vivo, hoy: resumir(hoy), "7d": resumir(semana), "30d": resumir(mes) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error("[tablero]", e);
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
