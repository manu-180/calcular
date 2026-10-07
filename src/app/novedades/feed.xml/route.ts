import { NOVEDADES, SITIO, fechaEnElSitio, fechaLargaNovedad, fechaRss, ultimoCambio } from "@/lib/novedades";

export const dynamic = "force-static";

function xml(texto: string): string {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const ultimo = ultimoCambio();
  const items = NOVEDADES.map((n) => {
    const link = `${SITIO}/novedades#${n.id}`;
    const partes = [
      n.detalle,
      n.rigeDesde ? `Rige desde el ${fechaLargaNovedad(n.rigeDesde)}.` : "",
      `Fuente oficial: ${n.fuente.nombre} (${n.fuente.url}).`,
    ].filter(Boolean);
    return `    <item>
      <title>${xml(n.titulo)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">calcular.ar-novedad-${n.id}</guid>
      <pubDate>${fechaRss(fechaEnElSitio(n))}</pubDate>
      <category>${xml(n.organismo)}</category>
      <description>${xml(partes.join(" "))}</description>
    </item>`;
  });

  const cuerpo = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Novedades de CalculAR</title>
    <link>${SITIO}/novedades</link>
    <atom:link href="${SITIO}/novedades/feed.xml" rel="self" type="application/rss+xml" />
    <description>Cada dato oficial nuevo que llega a las calculadoras de CalculAR, con su vigencia y su fuente.</description>
    <language>es-AR</language>
${ultimo ? `    <lastBuildDate>${fechaRss(ultimo)}</lastBuildDate>\n` : ""}${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
