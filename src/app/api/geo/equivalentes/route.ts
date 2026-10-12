import { NextResponse } from "next/server";
import { CONCEPTOS, esConcepto } from "@/motor/conceptos";
import { intlActivo, modoPublicacion, origenAR } from "@/motor/sitio";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// Mapa de calculadoras equivalentes para el selector de país: con él, cambiar de México a Perú
// estando en el aguinaldo lleva a la gratificación y no al inicio de Perú. Vive bajo /api/geo porque
// es la única API que el host de calcularya deja pasar (API_INTL_PERMITIDAS en src/motor/hosts.ts).
// Es igual para todos: se cachea y se regenera cada hora, como las páginas (la fecha de cada mercado
// decide qué está publicado).
export const revalidate = 3600;

export function GET() {
  if (!intlActivo()) return NextResponse.json({ porMercado: {}, ar: {}, origenAR: origenAR() });
  const modo = modoPublicacion();
  const porMercado: Record<string, Record<string, string>> = {};
  for (const m of registro.mercados(modo)) {
    if (m.codigo === "global") continue;
    const slugs: Record<string, string> = {};
    for (const c of registro.calculadorasPublicables(m.codigo, hoyEn(m), modo)) {
      if (c.definicion.concepto !== "propio") slugs[c.definicion.slug] = c.definicion.concepto;
    }
    porMercado[m.codigo] = slugs;
  }
  const ar: Record<string, string> = {};
  for (const [concepto, info] of Object.entries(CONCEPTOS)) {
    const ruta = (info as { rutaAR?: string }).rutaAR;
    if (ruta && esConcepto(concepto)) ar[concepto] = `${origenAR()}${ruta}`;
  }
  return NextResponse.json({ porMercado, ar, origenAR: origenAR() }, { headers: { "cache-control": "public, max-age=300, s-maxage=3600" } });
}
