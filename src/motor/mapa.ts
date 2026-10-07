import { PAGINAS_GLOBALES, PAGINAS_MERCADO } from "./paginas";
import type { Registro } from "./registro";
import { origenPublicoIntl, urlIntl } from "./seo";
import { intlActivo, modoPublicacion } from "./sitio";
import type { CodigoMercado } from "./tipos";
import { hoyEn } from "./vigencia";

// Lo que va en los sitemaps de calcularya: solo lo publicable en el modo actual. Lo usan los
// route handlers y check_hreflang (para que sitemap y hreflang hablen de las mismas páginas).
export function urlsDelMercado(registro: Registro, codigo: CodigoMercado): string[] | null {
  if (!intlActivo()) return null;
  const modo = modoPublicacion();
  const m = registro.mercados(modo).find((x) => x.codigo === codigo);
  if (!m) return null;
  if (m.codigo === "global") return [urlIntl("global"), ...PAGINAS_GLOBALES.map((p) => urlIntl("global", p))];
  const calculadoras = registro.calculadorasPublicables(m.codigo, hoyEn(m), modo).map((c) => urlIntl(m.codigo, c.definicion.slug));
  return [urlIntl(m.codigo), ...calculadoras, ...PAGINAS_MERCADO.map((p) => urlIntl(m.codigo, p))];
}

export function sitemapsDelIndice(registro: Registro): string[] | null {
  if (!intlActivo()) return null;
  const paises = registro.mercados(modoPublicacion()).filter((m) => m.codigo !== "global");
  return [`${origenPublicoIntl()}/sitemap-global.xml`, ...paises.map((m) => `${origenPublicoIntl()}/${m.codigo}/sitemap.xml`)];
}

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function xmlUrlset(urls: readonly string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${escapar(u)}</loc></url>`).join("\n")}\n</urlset>\n`;
}

export function xmlIndice(urls: readonly string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <sitemap><loc>${escapar(u)}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`;
}

export function textoRobots(): string {
  const origen = origenPublicoIntl();
  // Fuera de producción (previews, local) nada se indexa: zz y los mercados internos viven ahí.
  const regla = modoPublicacion() === "produccion" ? "Allow: /\nDisallow: /api/" : "Disallow: /";
  return `User-agent: *\n${regla}\n\nSitemap: ${origen}/sitemap.xml\nHost: ${origen}\n`;
}
