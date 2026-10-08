import { NextResponse, type NextRequest } from "next/server";
import { entornoDePrueba } from "@/motor/sitio";
import { registro } from "@/paises";

// País del visitante para el aviso de país de calcularya (ADR 0001, D6). NextRequest ya no tiene
// geo desde Next 15: lo da el header de Vercel. Nunca se cachea: la respuesta es de cada persona.
export const dynamic = "force-dynamic";

const RE_PAIS = /^[A-Z]{2}$/;

// Solo países con un mercado publicado, también en previews: ahí el registro trae zz y los mercados
// en estado "interno", y el aviso de país no puede ofrecerlos nunca (salía «Parece que estás en
// Zetalandia»). El aviso solo aparece si este país coincide con uno de sus destinos.
const PUBLICADOS = new Set(
  registro
    .mercados("produccion")
    .map((m) => m.pais)
    .filter(Boolean),
);

export function GET(req: NextRequest) {
  let pais = req.headers.get("x-vercel-ip-country")?.toUpperCase() ?? null;
  // Solo en previews y next dev (allowlist, ver entornoDePrueba): la cookie que pone /api/dev/sitio.
  if (!pais && entornoDePrueba()) pais = req.cookies.get("geo_prueba")?.value?.toUpperCase() ?? null;
  const valido = pais !== null && RE_PAIS.test(pais) && PUBLICADOS.has(pais);
  return NextResponse.json({ pais: valido ? pais : null }, { headers: { "cache-control": "private, no-store" } });
}
