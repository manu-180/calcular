import { NextRequest } from "next/server";
import { PRODUCTOS } from "@/lib/mp";
import { servirPlanilla } from "@/lib/entrega";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/planilla-comercio/download?payment_id=...
// URL histórica: es el enlace que quedó en el mail y en el marcador de la primera compradora
// (8/8/2026) y en /planillas/gracias. No se toca ni se redirige — se mantiene viva para siempre,
// porque "todas las actualizaciones del año incluidas" se cumple justamente por este enlace.
export async function GET(req: NextRequest) {
  return servirPlanilla(req, PRODUCTOS["planilla-comercio"]);
}
