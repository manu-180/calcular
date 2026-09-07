import { NextRequest } from "next/server";
import { PRODUCTOS } from "@/lib/mp";
import { servirPlanilla } from "@/lib/entrega";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/planilla-uocra/download?payment_id=...
// Ruta estática (una por producto) en vez de /api/planillas/[slug]/download: la inclusión del
// .xlsx en el bundle se declara por ruta en next.config.ts (outputFileTracingIncludes) y la
// clave literal de una ruta estática es la que ya está probada en producción. Con un segmento
// dinámico, un patrón que no matchee no falla en build: falla en la primera venta, entregando
// un 500 a alguien que acaba de pagar.
export async function GET(req: NextRequest) {
  return servirPlanilla(req, PRODUCTOS["planilla-uocra"]);
}
