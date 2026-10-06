import { NextRequest } from "next/server";
import { PRODUCTOS } from "@/lib/mp";
import { servirPlanilla } from "@/lib/entrega";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/planilla-mi-sueldo/download?payment_id=...
// Ruta estática por producto: la inclusión del .xlsx en el bundle se declara por ruta literal en
// next.config.ts (ver /api/planilla-uocra/download).
export async function GET(req: NextRequest) {
  return servirPlanilla(req, PRODUCTOS["planilla-mi-sueldo"]);
}
