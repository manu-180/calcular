// hreflang de calcularya (ADR 0001, D6 y D9): recíproco o nada. Por cada calculadora publicable en
// cada modo (producción e interno) arma los alternates con el mismo código que usan las páginas
// (src/motor/seo.ts) y falla si:
// - un clúster no es recíproco (A apunta a B y B no a A, o los dos no listan lo mismo),
// - un hreflang apunta a algo que no se publica o que no está en el sitemap,
// - falta x-default o no es la home de calcularya,
// - dos mercados del mismo clúster comparten locale (el segundo pisaría al primero),
// - aparece calcular.ar con el flag apagado,
// - un clúster de más de MAX_HREFLANG_HEAD no está entero en el sitemap del mercado (xhtml:link) o
//   sigue en el <head>, o uno chico no está en el <head> o aparece repetido en el sitemap.
// No necesita server: corre en check-all.
import type { ModoPublicacion, Registro } from "../src/motor/registro";
import type { Idiomas } from "../src/motor/seo";

// Sin la variable el árbol intl está apagado y no hay nada que revisar: se fija el dominio público
// solo para armar las URL de este check.
process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";

const fallas: string[] = [];

export interface PaginaConIdiomas {
  url: string;
  locale: string;
  concepto: string;
  idiomas: Idiomas | undefined;
}

export function revisarClusteres(paginas: readonly PaginaConIdiomas[], publicadas: ReadonlySet<string>, xDefault: string, hreflangAR: boolean): string[] {
  const errores: string[] = [];
  const porUrl = new Map(paginas.map((p) => [p.url, p]));
  const porConcepto = new Map<string, PaginaConIdiomas[]>();
  for (const p of paginas) porConcepto.set(p.concepto, [...(porConcepto.get(p.concepto) ?? []), p]);

  for (const [concepto, grupo] of porConcepto) {
    if (concepto === "propio") continue;
    const locales = grupo.map((p) => p.locale);
    const repetido = locales.find((l, i) => locales.indexOf(l) !== i);
    if (repetido) errores.push(`${concepto}: dos páginas del clúster comparten el locale ${repetido}`);
    if (grupo.length > 1 && grupo.some((p) => !p.idiomas)) errores.push(`${concepto}: hay ${grupo.length} páginas equivalentes y alguna no lleva hreflang`);
  }

  for (const p of paginas) {
    if (!p.idiomas) continue;
    const { "x-default": xd, ...resto } = p.idiomas;
    if (xd !== xDefault) errores.push(`${p.url}: x-default ${xd ?? "(falta)"}, se esperaba ${xDefault}`);
    if (resto[p.locale] !== p.url) errores.push(`${p.url}: no se lista a sí misma en ${p.locale}`);
    if ("es-AR" in resto && !hreflangAR) errores.push(`${p.url}: hreflang a calcular.ar con el flag apagado`);
    for (const [locale, href] of Object.entries(resto)) {
      if (locale === "es-AR") continue;
      if (!publicadas.has(href)) errores.push(`${p.url}: hreflang ${locale} a ${href}, que no se publica o no está en el sitemap`);
      const otra = porUrl.get(href);
      if (!otra) continue;
      if (!otra.idiomas || otra.idiomas[p.locale] !== p.url) errores.push(`${p.url} -> ${href}: no es recíproco`);
      else if (JSON.stringify(Object.entries(otra.idiomas).sort()) !== JSON.stringify(Object.entries(p.idiomas).sort())) {
        errores.push(`${p.url} y ${href}: el clúster no lista las mismas páginas`);
      }
    }
  }
  return errores;
}

async function main() {
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;
  const seo = await import("../src/motor/seo");
  const mapa = await import("../src/motor/mapa");
  const sitio = await import("../src/motor/sitio");
  const { hoyEn } = await import("../src/motor/vigencia");

  // Prueba negativa: el checker tiene que ver un clúster roto.
  const a = "https://calcularya.com/aa/x";
  const b = "https://calcularya.com/bb/x";
  const roto = revisarClusteres(
    [
      { url: a, locale: "es-AA", concepto: "bono-semestral", idiomas: { "es-AA": a, "es-BB": b, "x-default": "https://calcularya.com/" } },
      { url: b, locale: "es-BB", concepto: "bono-semestral", idiomas: { "es-BB": b, "x-default": "https://calcularya.com/" } },
    ],
    new Set([a, b]),
    "https://calcularya.com/",
    false,
  );
  if (!roto.some((e) => e.includes("no es recíproco"))) fallas.push("la prueba negativa no detectó un clúster no recíproco");

  // Umbral del <head>: un clúster de MAX_HREFLANG_HEAD + 1 páginas pasa al sitemap, uno justo en el tope no.
  const ficticios = (n: number) => Array.from({ length: n }, (_, i) => ({ mercado: "mx" as const, locale: `es-X${i}`, slug: `s${i}` }));
  if (seo.hreflangDelHead("bono-semestral", ficticios(seo.MAX_HREFLANG_HEAD + 1)) !== undefined) fallas.push("un clúster de más del tope sigue en el <head>");
  if (seo.hreflangDelHead("bono-semestral", ficticios(seo.MAX_HREFLANG_HEAD)) === undefined) fallas.push("un clúster en el tope salió del <head>");
  const xml = mapa.xmlUrlset([{ url: a, alternos: { "es-AA": a, "x-default": "https://calcularya.com/" } }]);
  if (!xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"') || !xml.includes('<xhtml:link rel="alternate" hreflang="es-AA" href="https://calcularya.com/aa/x"/>')) {
    fallas.push("el sitemap no escribe xhtml:link");
  }

  let revisadas = 0;
  for (const modo of ["produccion", "interno"] as ModoPublicacion[]) {
    process.env.VERCEL_ENV = modo === "produccion" ? "production" : "preview";
    const mercados = registro.mercados(modo).filter((m) => m.codigo !== "global");
    const publicadas = new Set<string>();
    const enSitemap = new Map<string, Idiomas>();
    for (const m of registro.mercados(modo)) {
      for (const e of mapa.entradasDelMercado(registro, m.codigo, { conAlternos: true }) ?? []) {
        publicadas.add(e.url);
        if (e.alternos) enSitemap.set(e.url, e.alternos);
      }
    }
    const paginas: PaginaConIdiomas[] = [];
    for (const m of mercados) {
      const fecha = hoyEn(m);
      for (const c of registro.calculadorasPublicables(m.codigo, fecha, modo)) {
        const p = registro.pagina(m.codigo, c.definicion.slug, fecha, modo);
        if (!p) {
          fallas.push(`[${modo}] ${m.codigo}/${c.definicion.slug}: publicable pero pagina() devuelve null`);
          continue;
        }
        const url = seo.urlIntl(m.codigo, c.definicion.slug);
        if (!publicadas.has(url)) fallas.push(`[${modo}] ${url}: se publica y no está en el sitemap del mercado`);
        const idiomas = seo.hreflangDe(p.calculadora.concepto, p.equivalentes);
        // El clúster va entero en un solo lugar: el <head> hasta MAX_HREFLANG_HEAD, el sitemap arriba de eso.
        const head = seo.hreflangDelHead(p.calculadora.concepto, p.equivalentes);
        const sitemap = enSitemap.get(url);
        const igual = (a?: Idiomas, b?: Idiomas) => JSON.stringify(Object.entries(a ?? {}).sort()) === JSON.stringify(Object.entries(b ?? {}).sort());
        if (seo.hreflangVaAlSitemap(idiomas)) {
          if (head) fallas.push(`[${modo}] ${url}: clúster de más de ${seo.MAX_HREFLANG_HEAD} y sigue en el <head>`);
          if (!igual(sitemap, idiomas)) fallas.push(`[${modo}] ${url}: clúster de más de ${seo.MAX_HREFLANG_HEAD} y el sitemap no lo lista entero`);
        } else {
          if (!igual(head, idiomas)) fallas.push(`[${modo}] ${url}: el <head> no lleva el clúster`);
          if (sitemap) fallas.push(`[${modo}] ${url}: clúster chico repetido en el sitemap`);
        }
        paginas.push({ url, locale: m.locale, concepto: p.calculadora.concepto, idiomas });
      }
    }
    revisadas += paginas.length;
    fallas.push(...revisarClusteres(paginas, publicadas, seo.urlIntl("global"), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));

    // «Tu sueldo en el mundo»: una página por edición, todas en un clúster, x-default en la de global.
    const mundoSeo = await import("../src/motor/mundo/ui/seo");
    const idiomasMundo = mundoSeo.hreflangMundo(registro, modo);
    const mundo: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: mundoSeo.urlMundo(m), locale: m.locale, concepto: "mundo", idiomas: idiomasMundo }));
    for (const p of mundo) {
      if (!publicadas.has(p.url)) fallas.push(`[${modo}] ${p.url}: «sueldo en el mundo» no está en el sitemap del mercado`);
      const sitemap = enSitemap.get(p.url);
      const vaAlSitemap = seo.hreflangVaAlSitemap(idiomasMundo);
      if (vaAlSitemap && JSON.stringify(Object.entries(sitemap ?? {}).sort()) !== JSON.stringify(Object.entries(idiomasMundo ?? {}).sort())) fallas.push(`[${modo}] ${p.url}: el sitemap no lista el clúster entero`);
      if (!vaAlSitemap && sitemap) fallas.push(`[${modo}] ${p.url}: clúster chico repetido en el sitemap`);
    }
    const global = registro.mercados(modo).find((m) => m.codigo === "global");
    if (global) fallas.push(...revisarClusteres(mundo, publicadas, mundoSeo.urlMundo(global), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));
    revisadas += mundo.length;

    // Rankings de países: el índice y cada ranking forman su propio clúster con todas las ediciones.
    const rk = await import("../src/motor/rankings/seo");
    const rutasRk = await import("../src/motor/rankings/rutas");
    const urlsRk = await import("../src/motor/rankings/urls");
    const clusteresRk: { concepto: string; idiomas: Idiomas | undefined; url: (m: (typeof mercados)[number]) => string }[] = [
      { concepto: "rankings", idiomas: rk.hreflangIndice(registro, modo), url: (m) => urlsRk.urlIndice(m) },
      ...rutasRk.IDS_RANKING.map((id) => ({ concepto: `ranking-${id}`, idiomas: rk.hreflangRanking(registro, modo, id), url: (m: (typeof mercados)[number]) => urlsRk.urlRanking(m, id) })),
    ];
    for (const c of clusteresRk) {
      const paginasRk: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: c.url(m), locale: m.locale, concepto: c.concepto, idiomas: c.idiomas }));
      for (const p of paginasRk) {
        if (!publicadas.has(p.url)) fallas.push(`[${modo}] ${p.url}: «${c.concepto}» no está en el sitemap del mercado`);
        const sitemap = enSitemap.get(p.url);
        const vaAlSitemap = seo.hreflangVaAlSitemap(c.idiomas);
        if (vaAlSitemap && JSON.stringify(Object.entries(sitemap ?? {}).sort()) !== JSON.stringify(Object.entries(c.idiomas ?? {}).sort())) fallas.push(`[${modo}] ${p.url}: el sitemap no lista el clúster entero`);
        if (!vaAlSitemap && sitemap) fallas.push(`[${modo}] ${p.url}: clúster chico repetido en el sitemap`);
      }
      if (global) fallas.push(...revisarClusteres(paginasRk, publicadas, c.url(global), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));
      revisadas += paginasRk.length;
    }
  }

  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisadas} páginas revisadas en los dos modos, clústeres recíprocos`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
