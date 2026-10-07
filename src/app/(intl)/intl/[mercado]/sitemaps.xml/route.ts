import { sitemapsDelIndice, xmlIndice } from "@/motor/mapa";
import { registro } from "@/paises";

// Índice de sitemaps de calcularya (/sitemap.xml en el host intl). Vive bajo [mercado] y no en
// /intl para que, con el sitio apagado, no quede ninguna ruta /intl prerenderizada. Lo cachea el
// CDN por el s-maxage de la respuesta.

export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  const urls = mercado === "global" ? sitemapsDelIndice(registro) : null;
  if (!urls) return new Response("No encontrado", { status: 404 });
  return new Response(xmlIndice(urls), { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
