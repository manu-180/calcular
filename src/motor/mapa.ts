import { ACTUALIZACION_PAGINAS_GLOBALES, PAGINAS_GLOBALES, PAGINAS_MERCADO } from "./paginas";
import { resolverValores, type DatoUsado, type PaginaResuelta, type Registro } from "./registro";
import { origenPublicoIntl, urlIntl } from "./seo";
import { intlActivo, modoPublicacion } from "./sitio";
import type { CodigoMercado, EntradaCalculadora, FechaISO, Mercado } from "./tipos";
import { hoyEn } from "./vigencia";

const masNueva = (fechas: readonly (FechaISO | undefined)[], tope: FechaISO): FechaISO | undefined =>
  fechas.filter((f): f is FechaISO => Boolean(f) && f! <= tope).sort().at(-1);

// Cuándo cambió por última vez lo que muestra la página: la revisión más reciente de los datos que
// usa, el último punto de sus series y las novedades que la nombran. No es la fecha del build: un
// deploy que no toca datos no la mueve, y Google deja de creerle a un lastmod que cambia siempre.
function actualizacion(registro: Registro, codigo: CodigoMercado, id: string, usados: readonly DatoUsado[], fecha: FechaISO): FechaISO | undefined {
  const novedades = registro.pais(codigo)?.novedades ?? [];
  return masNueva(
    [...usados.map((u) => (u.clase === "serie" ? u.desde : u.fuente.verificadoEl)), ...novedades.filter((n) => n.calculadoras.includes(id)).map((n) => n.fecha)],
    fecha,
  );
}

export function actualizacionDePagina(registro: Registro, pagina: PaginaResuelta, fecha: FechaISO): FechaISO | undefined {
  return actualizacion(registro, pagina.mercado.codigo, pagina.calculadora.id, pagina.usados, fecha);
}

// Lo mismo sin armar la página entera: registro.pagina() calcula los equivalentes de todos los
// países, y en un sitemap o una home eso multiplica el trabajo por la cantidad de calculadoras.
export function actualizacionDeCalculadora(registro: Registro, codigo: CodigoMercado, entrada: EntradaCalculadora, fecha: FechaISO): FechaISO | undefined {
  const pais = registro.pais(codigo);
  if (!pais) return undefined;
  const r = resolverValores(pais, entrada.definicion, fecha);
  return r.ok ? actualizacion(registro, codigo, entrada.definicion.id, r.usados, fecha) : undefined;
}

export function actualizacionDeFuentes(registro: Registro, codigo: CodigoMercado, fecha: FechaISO): FechaISO | undefined {
  return masNueva(
    [
      ...registro.fichas(codigo, fecha).flatMap((f) => f.vigentes.map((v) => v.fuente.verificadoEl)),
      ...registro.fichasSeries(codigo, fecha).map((s) => s.vigente?.fecha),
    ],
    fecha,
  );
}

export function actualizacionDeNovedades(registro: Registro, codigo: CodigoMercado, fecha: FechaISO): FechaISO | undefined {
  return masNueva((registro.pais(codigo)?.novedades ?? []).map((n) => n.fecha), fecha);
}

export interface EntradaSitemap {
  url: string;
  lastmod?: FechaISO;
}

function entradasDePais(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>): EntradaSitemap[] {
  const fecha = hoyEn(m);
  const calculadoras = registro
    .calculadorasPublicables(m.codigo, fecha, modo)
    .map((c) => ({ url: urlIntl(m.codigo, c.definicion.slug), lastmod: actualizacionDeCalculadora(registro, m.codigo, c, fecha) }));
  const fuentes = actualizacionDeFuentes(registro, m.codigo, fecha);
  const novedades = actualizacionDeNovedades(registro, m.codigo, fecha);
  const porPagina: Record<(typeof PAGINAS_MERCADO)[number], FechaISO | undefined> = { fuentes, novedades };
  const inicio = masNueva([...calculadoras.map((c) => c.lastmod), novedades], fecha);
  return [{ url: urlIntl(m.codigo), lastmod: inicio }, ...calculadoras, ...PAGINAS_MERCADO.map((p) => ({ url: urlIntl(m.codigo, p), lastmod: porPagina[p] }))];
}

// La home de un país cambia cuando cambia cualquiera de sus calculadoras o llega una novedad.
export function actualizacionDeInicioPais(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>): FechaISO | undefined {
  return entradasDePais(registro, m, modo)[0].lastmod;
}

// Lo que va en los sitemaps de calcularya: solo lo publicable en el modo actual. Lo usan los
// route handlers y check_hreflang (para que sitemap y hreflang hablen de las mismas páginas).
export function entradasDelMercado(registro: Registro, codigo: CodigoMercado): EntradaSitemap[] | null {
  if (!intlActivo()) return null;
  const modo = modoPublicacion();
  const mercados = registro.mercados(modo);
  const m = mercados.find((x) => x.codigo === codigo);
  if (!m) return null;
  if (m.codigo !== "global") return entradasDePais(registro, m, modo);
  const paises = mercados.filter((x) => x.codigo !== "global");
  const inicio = masNueva(
    paises.map((p) => entradasDePais(registro, p, modo)[0].lastmod),
    hoyEn(m),
  );
  return [{ url: urlIntl("global"), lastmod: inicio }, ...PAGINAS_GLOBALES.map((p) => ({ url: urlIntl("global", p), lastmod: ACTUALIZACION_PAGINAS_GLOBALES }))];
}

export function urlsDelMercado(registro: Registro, codigo: CodigoMercado): string[] | null {
  return entradasDelMercado(registro, codigo)?.map((e) => e.url) ?? null;
}

export function sitemapsDelIndice(registro: Registro): EntradaSitemap[] | null {
  if (!intlActivo()) return null;
  const ultima = (codigo: CodigoMercado) => masNueva((entradasDelMercado(registro, codigo) ?? []).map((e) => e.lastmod), "9999-12-31");
  const paises = registro.mercados(modoPublicacion()).filter((m) => m.codigo !== "global");
  return [
    { url: `${origenPublicoIntl()}/sitemap-global.xml`, lastmod: ultima("global") },
    ...paises.map((m) => ({ url: `${origenPublicoIntl()}/${m.codigo}/sitemap.xml`, lastmod: ultima(m.codigo) })),
  ];
}

const escapar = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lastmod = (f?: FechaISO) => (f ? `<lastmod>${f}</lastmod>` : "");

export function xmlUrlset(entradas: readonly EntradaSitemap[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entradas.map((e) => `  <url><loc>${escapar(e.url)}</loc>${lastmod(e.lastmod)}</url>`).join("\n")}\n</urlset>\n`;
}

export function xmlIndice(entradas: readonly EntradaSitemap[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entradas.map((e) => `  <sitemap><loc>${escapar(e.url)}</loc>${lastmod(e.lastmod)}</sitemap>`).join("\n")}\n</sitemapindex>\n`;
}

export function textoRobots(): string {
  const origen = origenPublicoIntl();
  // Fuera de producción (previews, local) nada se indexa: zz y los mercados internos viven ahí.
  // /intl/ se cierra aunque ya responda 404: es el árbol interno y no tiene que gastar rastreo.
  const regla = modoPublicacion() === "produccion" ? "Allow: /\nDisallow: /api/\nDisallow: /intl/" : "Disallow: /";
  return `User-agent: *\n${regla}\n\nSitemap: ${origen}/sitemap.xml\n`;
}
