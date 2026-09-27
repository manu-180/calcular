import { NextRequest } from "next/server";
import { PRODUCTOS } from "@/lib/mp";
import { servirPlanilla } from "@/lib/entrega";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/planilla-casas-particulares/download?payment_id=... — enlace permanente del mail de entrega: no se
// renombra nunca, porque las actualizaciones del año llegan por acá.
export async function GET(req: NextRequest) {
  return servirPlanilla(req, PRODUCTOS["planilla-casas-particulares"]);
}
