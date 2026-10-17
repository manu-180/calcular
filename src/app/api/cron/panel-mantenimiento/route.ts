import { NextRequest, NextResponse } from "next/server";
import { cronAutorizado } from "@/lib/cron";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { actualizarTipoCambio } from "@/lib/panel/tipo-cambio";
import { servicio } from "@/lib/supabase/servicio";

// Cada hora (vercel.json). Resume los días cerrados en ca_resumen y ca_resumen_mercado, poda lo crudo
// viejo y carga el tipo de cambio del BCRA para pasar las ventas a dólares. Es la red de seguridad si
// la base no tiene pg_cron; correr las dos veces no hace daño (ca_mantenimiento es idempotente).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  if (!cronAutorizado(req.headers)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CUENTAS_ACTIVAS) return NextResponse.json({ omitido: "cuentas apagadas" });

  const inicio = Date.now();
  const db = servicio();
  const { data, error } = await db.rpc("ca_mantenimiento");
  if (error) console.error("[panel-mantenimiento]", error.code, error.message);
  const cambio = await actualizarTipoCambio(db).catch((e: unknown) => ({ error: e instanceof Error ? e.message : String(e) }));
  if ("error" in cambio && cambio.error) console.error("[panel-mantenimiento] tipo de cambio:", cambio.error);
  if (error) return NextResponse.json({ error: error.message, tipoCambio: cambio }, { status: 500 });
  return NextResponse.json({ ok: true, resultado: data, tipoCambio: cambio, ms: Date.now() - inicio });
}
