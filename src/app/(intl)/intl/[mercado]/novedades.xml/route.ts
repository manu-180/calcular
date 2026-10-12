import { intlActivo, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import { origenPublicoIntl, urlIntl } from "@/motor/seo";
import { ultimaEntrada } from "@/motor/novedades";
import type { CodigoMercado, FechaISO } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import { registroNovedades, textoDe } from "../novedades/entradas";

// Feed Atom de /<m>/novedades: las mismas entradas que la página (entradas.ts), con un id estable por
// entrada. Cada punto nuevo de una serie o tramo nuevo es una entrada nueva, así un lector de feeds
// (o un agregador) recibe los cambios a medida que el cron o un PR los publican.
export const revalidate = 3600;

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const instante = (f: FechaISO) => `${f}T00:00:00Z`;

export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  const ctx = intlActivo() ? contextoSitio(registro, mercado as CodigoMercado) : null;
  if (!ctx || ctx.mercado.codigo === "global") return new Response("No encontrado", { status: 404 });
  const m = ctx.mercado;
  const r = registroNovedades(ctx);
  const pagina = urlIntl(m.codigo, "novedades");
  const yo = urlIntl(m.codigo, "novedades.xml");
  const actualizado = ultimaEntrada(r.feed) ?? ctx.fecha;
  const entradas = r.feed.map((e) => {
    const { titulo, resumen } = textoDe(e, r);
    const url = `${pagina}#${e.id}`;
    return `  <entry>
    <id>${escapar(url)}</id>
    <title>${escapar(titulo)}</title>
    <link rel="alternate" type="text/html" href="${escapar(url)}"/>
    <updated>${instante(e.fecha)}</updated>
    <published>${instante(e.fecha)}</published>
    <category term="${e.tipo === "dato" && e.proximo ? "proximo" : e.tipo}" label="${escapar(r.tn.etiqueta[e.tipo === "dato" && e.proximo ? "proximo" : e.tipo])}"/>
    <summary type="text">${escapar(resumen)}</summary>
  </entry>`;
  });
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${escapar(m.locale)}">
  <id>${escapar(pagina)}</id>
  <title>${escapar(r.tn.feedTitulo(m.nombre))}</title>
  <subtitle>${escapar(r.tn.feedSubtitulo(m.nombre))}</subtitle>
  <link rel="alternate" type="text/html" href="${escapar(pagina)}"/>
  <link rel="self" type="application/atom+xml" href="${escapar(yo)}"/>
  <updated>${instante(actualizado)}</updated>
  <author><name>${NOMBRE_SITIO_INTL}</name><uri>${escapar(origenPublicoIntl())}</uri></author>
  <generator uri="${escapar(origenPublicoIntl())}">${NOMBRE_SITIO_INTL}</generator>
${entradas.join("\n")}
</feed>
`;
  return new Response(xml, { headers: { "content-type": "application/atom+xml; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
