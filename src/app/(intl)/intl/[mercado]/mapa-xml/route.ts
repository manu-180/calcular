import { paisesConSueldos } from "@/lib/sueldos/lectura";
import { entradasDelMercado, xmlUrlset } from "@/motor/mapa";
import type { CodigoMercado } from "@/motor/tipos";
import { registro } from "@/paises";

// Sitemap de un mercado (/<m>/sitemap.xml y /sitemap-global.xml llegan acá por rewrite, ver
// RUTA_SITEMAP en src/motor/hosts.ts). Route handler y no sitemap.ts: un sitemap.ts dentro de
// [mercado] no recibe el segmento y todos los mercados devolvían el mismo XML
// (docs/adr/0001-spike-next16.md, punto 3). Lo cachea el CDN por el s-maxage de la respuesta.

export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  // Los países con «Sueldos reales» publicado salen de la base (cacheado, con tope de espera): si no
  // responde, el sitemap sale igual sin esas páginas.
  const urls = entradasDelMercado(registro, mercado as CodigoMercado, { conAlternos: true, sueldos: await paisesConSueldos() });
  if (!urls) return new Response("No encontrado", { status: 404 });
  return new Response(xmlUrlset(urls), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
