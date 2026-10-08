import { NextResponse, type NextRequest } from "next/server";
import { entornoDePrueba } from "@/motor/sitio";

// País del visitante para el aviso de país de calcularya (ADR 0001, D6). NextRequest ya no tiene
// geo desde Next 15: lo da el header de Vercel. Nunca se cachea: la respuesta es de cada persona.
export const dynamic = "force-dynamic";

const RE_PAIS = /^[A-Z]{2}$/;

export function GET(req: NextRequest) {
  let pais = req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? null;
  // Solo en previews y next dev (allowlist, ver entornoDePrueba): la cookie que pone /api/dev/sitio.
  if (!pais && entornoDePrueba()) pais = req.cookies.get("geo_prueba")?.value?.toUpperCase() ?? null;
  return NextResponse.json({ pais: pais && RE_PAIS.test(pais) ? pais : null }, { headers: { "cache-control": "private, no-store" } });
}
