import { NextResponse, type NextRequest } from "next/server";

// País del visitante para el aviso de país de calcularya (ADR 0001, D6). NextRequest ya no tiene
// geo desde Next 15: lo da el header de Vercel. Nunca se cachea: la respuesta es de cada persona.
export const dynamic = "force-dynamic";

const RE_PAIS = /^[A-Z]{2}$/;

export function GET(req: NextRequest) {
  let pais = req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? null;
  // Fuera de producción no hay header de Vercel: /api/dev/sitio?geo=PE deja simular un país.
  if (!pais && process.env.VERCEL_ENV !== "production") pais = req.cookies.get("geo_prueba")?.value?.toUpperCase() ?? null;
  return NextResponse.json({ pais: pais && RE_PAIS.test(pais) ? pais : null }, { headers: { "cache-control": "private, no-store" } });
}
