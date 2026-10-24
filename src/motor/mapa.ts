import { feedDe } from "./novedades";
import { ACTUALIZACION_PAGINAS_GLOBALES, PAGINAS_GLOBALES, PAGINAS_MERCADO } from "./paginas";
import { resolverValores, type DatoUsado, type PaginaResuelta, type Registro } from "./registro";
import { hreflangDe, hreflangVaAlSitemap, origenPublicoIntl, urlIntl, type Idiomas } from "./seo";
import { intlActivo, modoPublicacion } from "./sitio";
import type { CodigoMercado, EntradaCalculadora, FechaISO, Mercado } from "./tipos";
import { fechasDesde, hoyEn } from "./vigencia";
import { hreflangMundo, urlMundo } from "./mundo/ui/seo";
import { hreflangIndice, hreflangRanking, urlsRankings } from "./rankings/seo";
import { paginasHoras, SIN_HORAS, type PublicacionHoras } from "./horas/publicacion";
import { hreflangHoras, urlHoras } from "./horas/ui/seo";
import { calendarioPublicado, urlCalendario } from "./calendario/rutas";
import { edicionPrincipal } from "./mundo/rutas";
import { hreflangSueldos, urlSueldosIntl } from "./sueldos/seo";

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

// /<m>/novedades también lista lo que se movió solo (tramos nuevos, último punto de cada serie,
// revisiones): su fecha es la de la entrada más nueva de ese registro, no solo la de las notas.
export function actualizacionDeNovedades(registro: Registro, codigo: CodigoMercado, fecha: FechaISO): FechaISO | undefined {
  return masNueva([...(registro.pais(codigo)?.novedades ?? []).map((n) => n.fecha), ...feedDe(registro, codigo, fecha).map((e) => e.fecha)], fecha);
}

export interface EntradaSitemap {
  url: string;
  lastmod?: FechaISO;
  // Solo en clústeres que no entran en el <head> (seo.ts, MAX_HREFLANG_HEAD).
  alternos?: Idiomas;
}

// Mismos equivalentes que registro.pagina() (cada mercado en su fecha, vista desde la de la página),
// así sitemap y <head> nunca describen dos clústeres distintos.
function alternosEnSitemap(registro: Registro, m: Mercado, c: EntradaCalculadora, fecha: FechaISO, modo: ReturnType<typeof modoPublicacion>): Idiomas | undefined {
  const idiomas = hreflangDe(c.definicion.concepto, registro.equivalentes(c.definicion.concepto, fechasDesde(m, fecha), modo));
  return hreflangVaAlSitemap(idiomas) ? idiomas : undefined;
}

// «Tu sueldo en el mundo» de la edición. Su clúster (todas las ediciones) pasa de MAX_HREFLANG_HEAD,
// así que con conAlternos va acá entero y no en el <head>. Sin lastmod: la fecha es la de la grilla, que
// vive del lado del servidor (server-only) y este módulo lo usan también los checks.
function entradaMundo(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>, conAlternos: boolean): EntradaSitemap {
  const idiomas = conAlternos ? hreflangMundo(registro, modo) : undefined;
  return { url: urlMundo(m), ...(idiomas && hreflangVaAlSitemap(idiomas) ? { alternos: idiomas } : {}) };
}

// Rankings de países de la edición: el índice y cada ranking, como «Tu sueldo en el mundo» (sin
// lastmod y con el clúster entero acá cuando pasa de MAX_HREFLANG_HEAD).
function entradasRankings(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>, conAlternos: boolean): EntradaSitemap[] {
  return urlsRankings(m).map(({ url, id }) => {
    const idiomas = conAlternos ? (id ? hreflangRanking(registro, modo, id) : hreflangIndice(registro, modo)) : undefined;
    return { url, ...(idiomas && hreflangVaAlSitemap(idiomas) ? { alternos: idiomas } : {}) };
  });
}

// «¿Cuántas horas de trabajo cuesta?»: el índice y una página por producto publicado (menos el que muestra
// el índice, que lleva canonical ahí), cada una con su clúster entre ediciones. Qué se publica lo dice
// `horas` (publicacionHoras() de src/lib/horas, del lado del servidor): sin eso no se lista nada, así un
// precio vencido nunca deja en el sitemap una página que da 404. Sin lastmod por la misma razón.
function entradasHoras(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>, conAlternos: boolean, horas: PublicacionHoras): EntradaSitemap[] {
  return paginasHoras(horas).map((producto) => {
    const idiomas = conAlternos ? hreflangHoras(registro, modo, producto) : undefined;
    return { url: urlHoras(m, producto), ...(idiomas && hreflangVaAlSitemap(idiomas) ? { alternos: idiomas } : {}) };
  });
}

// Calendario laboral de la edición, solo si tiene fechas por delante. Su lastmod es la última fecha que
// ya pasó o la última verificación de sus fuentes: lo que cambia lo que muestra la página.
function entradaCalendario(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>): EntradaSitemap[] {
  const c = calendarioPublicado(registro, m, modo);
  if (!c) return [];
  return [{ url: urlCalendario(m), lastmod: masNueva(c.eventos.flatMap((e) => [e.fecha, e.fuente.verificadoEl]), c.fecha) }];
}

// «Sueldos reales» del país, solo si tiene alguna ocupación publicada (la página es noindex hasta
// entonces). `sueldos` son los países publicados, leídos de la base por quien arma el sitemap; sin él
// (los checks, llms.txt, las fechas) la página no entra. Sin lastmod: la foto se rehace cada día.
function entradaSueldos(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>, conAlternos: boolean, sueldos?: ReadonlySet<string>): EntradaSitemap[] {
  if (!sueldos?.has(edicionPrincipal(m.codigo))) return [];
  const idiomas = conAlternos ? hreflangSueldos(registro, modo, edicionPrincipal(m.codigo)) : undefined;
  return [{ url: urlSueldosIntl(m), ...(idiomas && hreflangVaAlSitemap(idiomas) ? { alternos: idiomas } : {}) }];
}

function entradasDePais(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>, conAlternos = false, horas: PublicacionHoras = SIN_HORAS, sueldos?: ReadonlySet<string>): EntradaSitemap[] {
  const fecha = hoyEn(m);
  const calculadoras = registro.calculadorasPublicables(m.codigo, fecha, modo).map((c) => {
    const alternos = conAlternos ? alternosEnSitemap(registro, m, c, fecha, modo) : undefined;
    return { url: urlIntl(m.codigo, c.definicion.slug), lastmod: actualizacionDeCalculadora(registro, m.codigo, c, fecha), ...(alternos ? { alternos } : {}) };
  });
  const fuentes = actualizacionDeFuentes(registro, m.codigo, fecha);
  const novedades = actualizacionDeNovedades(registro, m.codigo, fecha);
  const porPagina: Record<(typeof PAGINAS_MERCADO)[number], FechaISO | undefined> = { fuentes, novedades };
  const inicio = masNueva([...calculadoras.map((c) => c.lastmod), novedades], fecha);
  return [
    { url: urlIntl(m.codigo), lastmod: inicio },
    entradaMundo(registro, m, modo, conAlternos),
    ...entradasRankings(registro, m, modo, conAlternos),
    ...entradasHoras(registro, m, modo, conAlternos, horas),
    ...entradaCalendario(registro, m, modo),
    ...entradaSueldos(registro, m, modo, conAlternos, sueldos),
    ...calculadoras,
    ...PAGINAS_MERCADO.map((p) => ({ url: urlIntl(m.codigo, p), lastmod: porPagina[p] })),
  ];
}

// La home de un país cambia cuando cambia cualquiera de sus calculadoras o llega una novedad.
export function actualizacionDeInicioPais(registro: Registro, m: Mercado, modo: ReturnType<typeof modoPublicacion>): FechaISO | undefined {
  return entradasDePais(registro, m, modo)[0].lastmod;
}

// Lo que va en los sitemaps de calcularya: solo lo publicable en el modo actual. Lo usan los
// route handlers y check_hreflang (para que sitemap y hreflang hablen de las mismas páginas).
// conAlternos: el sitemap del mercado (mapa-xml) y check_hreflang; el índice, llms.txt y las fechas
// solo necesitan url y lastmod.
export function entradasDelMercado(registro: Registro, codigo: CodigoMercado, opciones: { conAlternos?: boolean; horas?: PublicacionHoras; sueldos?: ReadonlySet<string> } = {}): EntradaSitemap[] | null {
  if (!intlActivo()) return null;
  const modo = modoPublicacion();
  const mercados = registro.mercados(modo);
  const m = mercados.find((x) => x.codigo === codigo);
  if (!m) return null;
  const horas = opciones.horas ?? SIN_HORAS;
  if (m.codigo !== "global") return entradasDePais(registro, m, modo, opciones.conAlternos, horas, opciones.sueldos);
  const paises = mercados.filter((x) => x.codigo !== "global");
  const inicio = masNueva(
    paises.map((p) => entradasDePais(registro, p, modo)[0].lastmod),
    hoyEn(m),
  );
  return [
    { url: urlIntl("global"), lastmod: inicio },
    entradaMundo(registro, m, modo, opciones.conAlternos ?? false),
    ...entradasRankings(registro, m, modo, opciones.conAlternos ?? false),
    ...entradasHoras(registro, m, modo, opciones.conAlternos ?? false, horas),
    ...PAGINAS_GLOBALES.map((p) => ({ url: urlIntl("global", p), lastmod: ACTUALIZACION_PAGINAS_GLOBALES })),
  ];
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

const alternos = (a?: Idiomas) =>
  a
    ? Object.entries(a)
        .map(([hreflang, href]) => `\n    <xhtml:link rel="alternate" hreflang="${escapar(hreflang)}" href="${escapar(href)}"/>`)
        .join("") + "\n  "
    : "";

export function xmlUrlset(entradas: readonly EntradaSitemap[]): string {
  const xhtml = entradas.some((e) => e.alternos) ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xhtml}>\n${entradas.map((e) => `  <url><loc>${escapar(e.url)}</loc>${lastmod(e.lastmod)}${alternos(e.alternos)}</url>`).join("\n")}\n</urlset>\n`;
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
