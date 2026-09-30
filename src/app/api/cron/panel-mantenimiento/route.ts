import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";
import { servicio } from "@/lib/supabase/servicio";

// Cada hora (vercel.json). Resume los días cerrados en ca_resumen y poda lo crudo viejo: sin esto
// el panel lee todo de ca_vistas y se vuelve lento. Es la red de seguridad si la base no tiene
// pg_cron; correr las dos veces no hace daño (ca_mantenimiento es idempotente).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function autorizado(req: NextRequest): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const recibido = Buffer.from(req.headers.get("authorization") ?? "");
  const esperado = Buffer.from(`Bearer ${secreto}`);
  return recibido.length === esperado.length && timingSafeEqual(recibido, esperado);
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!CUENTAS_ACTIVAS) return NextResponse.json({ omitido: "cuentas apagadas" });

  const inicio = Date.now();
  const { data, error } = await servicio().rpc("ca_mantenimiento");
  if (error) {
    console.error("[panel-mantenimiento]", error.code, error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, resultado: data, ms: Date.now() - inicio });
}
