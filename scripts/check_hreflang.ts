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
import { etiquetaIdioma } from "../src/motor/i18n/direccion";
import "./sin-server-only";
import { paginasHoras } from "../src/motor/horas/publicacion";
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
  // Una firma por página, no un JSON.stringify por cada par: con clústeres de 100 páginas eran 1,5 millones
  // de serializaciones de 5 KB por modo (minutos y gigas de basura), ahora son 15 mil.
  const firmas = new Map(paginas.map((p) => [p.url, p.idiomas ? JSON.stringify(Object.entries(p.idiomas).sort()) : ""]));
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
      else if (firmas.get(otra.url) !== firmas.get(p.url)) {
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
  const { publicacionHoras } = await import("../src/lib/horas/indice");
  const pubHoras = publicacionHoras();

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

  // Cerca de la medianoche cada mercado evalúa los equivalentes con su propia fecha del mismo instante, no
  // con la de la página (si no, un dato que vence en un país lo saca de unos clústeres y no de otros).
  {
    const { fechasDelMismoInstante } = await import("../src/motor/vigencia");
    const fijada = process.env.CALCULAR_HOY;
    delete process.env.CALCULAR_HOY;
    const ahora = new Date("2026-10-24T23:30:00Z");
    const managua = { zonaHoraria: "America/Managua" };
    const londres = { zonaHoraria: "Europe/London" };
    const hoy = fechasDelMismoInstante(managua, "2026-10-24", ahora);
    const antes = fechasDelMismoInstante(managua, "2026-01-10", ahora);
    if (hoy(managua) !== "2026-10-24" || hoy(londres) !== "2026-10-25") fallas.push(`fechasDelMismoInstante: ${hoy(managua)} / ${hoy(londres)}, se esperaba 2026-10-24 / 2026-10-25`);
    if (antes(londres) !== "2026-01-11") fallas.push(`fechasDelMismoInstante con otra fecha: ${antes(londres)}, se esperaba 2026-01-11`);
    if (fijada !== undefined) process.env.CALCULAR_HOY = fijada;
  }
  // Cada mercado del clúster va en su propia fecha: a las 17 UTC Sídney ya está en el día siguiente y
  // Santiago no. Si la página de Sídney evaluara a Santiago en su fecha, una serie que vence esa noche
  // la sacaría del clúster en Sídney y no en Santiago (el clúster dejaría de ser recíproco).
  const { fechasDesde } = await import("../src/motor/vigencia");
  if (!process.env.CALCULAR_HOY) {
    const ahora = new Date("2026-10-24T17:00:00Z");
    const sidney = { zonaHoraria: "Australia/Sydney" };
    const santiago = { zonaHoraria: "America/Santiago" };
    const desdeSidney = fechasDesde(sidney, "2026-10-25", ahora);
    const desdeSantiago = fechasDesde(santiago, "2026-10-24", ahora);
    if (desdeSidney(santiago) !== "2026-10-24" || desdeSantiago(sidney) !== "2026-10-25" || desdeSidney(sidney) !== "2026-10-25") {
      fallas.push("fechasDesde no evalúa a cada mercado en su propia fecha");
    }
    if (fechasDesde(sidney, "2026-01-10", ahora)(santiago) !== "2026-01-09") fallas.push("fechasDesde no corre una fecha fija igual que la diferencia de zonas");
  }

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
      for (const e of mapa.entradasDelMercado(registro, m.codigo, { conAlternos: true, horas: pubHoras }) ?? []) {
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
        // Una universal podada no está en el sitemap ni en ningún clúster (check_poda lo revisa aparte).
        if (p.podada) continue;
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
        paginas.push({ url, locale: etiquetaIdioma(m.locale), concepto: p.calculadora.concepto, idiomas });
      }
    }
    revisadas += paginas.length;
    fallas.push(...revisarClusteres(paginas, publicadas, seo.urlIntl("global"), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));

    // «Tu sueldo en el mundo»: una página por edición, todas en un clúster, x-default en la de global.
    const mundoSeo = await import("../src/motor/mundo/ui/seo");
    const idiomasMundo = mundoSeo.hreflangMundo(registro, modo);
    const mundo: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: mundoSeo.urlMundo(m), locale: etiquetaIdioma(m.locale), concepto: "mundo", idiomas: idiomasMundo }));
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
      const paginasRk: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: c.url(m), locale: etiquetaIdioma(m.locale), concepto: c.concepto, idiomas: c.idiomas }));
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
    // «¿Cuántas horas de trabajo cuesta?»: el índice y cada producto publicado (menos el del índice, que
    // lleva canonical al índice), un clúster por página entre ediciones. Lo no publicado no va al sitemap.
    const horasSeo = await import("../src/motor/horas/ui/seo");
    const { PRODUCTOS } = await import("../src/motor/horas/productos");
    const paginasH = paginasHoras(pubHoras);
    for (const producto of [undefined, ...PRODUCTOS.map((x) => x.id)]) {
      if (!paginasH.includes(producto)) {
        for (const m of registro.mercados(modo)) if (publicadas.has(horasSeo.urlHoras(m, producto))) fallas.push(`[${modo}] ${horasSeo.urlHoras(m, producto)}: «horas de trabajo» no se publica (o es el producto del índice) y está en el sitemap`);
        continue;
      }
      const idiomasHoras = horasSeo.hreflangHoras(registro, modo, producto);
      const horas: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: horasSeo.urlHoras(m, producto), locale: etiquetaIdioma(m.locale), concepto: `horas:${producto ?? "indice"}`, idiomas: idiomasHoras }));
      for (const p of horas) {
        if (!publicadas.has(p.url)) fallas.push(`[${modo}] ${p.url}: «horas de trabajo» no está en el sitemap del mercado`);
        const sitemap = enSitemap.get(p.url);
        const vaAlSitemap = seo.hreflangVaAlSitemap(idiomasHoras);
        if (vaAlSitemap && JSON.stringify(Object.entries(sitemap ?? {}).sort()) !== JSON.stringify(Object.entries(idiomasHoras ?? {}).sort())) fallas.push(`[${modo}] ${p.url}: el sitemap no lista el clúster entero`);
        if (!vaAlSitemap && sitemap) fallas.push(`[${modo}] ${p.url}: clúster chico repetido en el sitemap`);
      }
      if (global) fallas.push(...revisarClusteres(horas, publicadas, horasSeo.urlHoras(global, producto), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));
      revisadas += horas.length;
    }
    // Calendario laboral: una página por edición con fechas por delante; las ediciones de un mismo
    // país forman su clúster (x-default en la edición principal) y un país de una sola edición no lleva.
    const cal = await import("../src/motor/calendario/rutas");
    const porPais = new Map<string, PaginaConIdiomas[]>();
    for (const m of mercados) {
      if (!cal.calendarioPublicado(registro, m, modo)) continue;
      const url = cal.urlCalendario(m);
      if (!publicadas.has(url)) fallas.push(`[${modo}] ${url}: el calendario se publica y no está en el sitemap del mercado`);
      if (enSitemap.has(url)) fallas.push(`[${modo}] ${url}: clúster chico del calendario repetido en el sitemap`);
      const idiomas = cal.hreflangCalendario(registro, m.codigo, modo);
      if (registro.ediciones(m.codigo, modo).filter((e) => cal.calendarioPublicado(registro, e, modo)).length > 1 && !idiomas) fallas.push(`[${modo}] ${url}: país con varias ediciones y el calendario sin hreflang`);
      porPais.set(m.pais, [...(porPais.get(m.pais) ?? []), { url, locale: etiquetaIdioma(m.locale), concepto: `calendario-${m.pais}`, idiomas }]);
    }
    for (const grupo of porPais.values()) {
      const xd = grupo.find((p) => p.idiomas)?.idiomas?.["x-default"];
      if (xd) fallas.push(...revisarClusteres(grupo, publicadas, xd, false).map((e) => `[${modo}] ${e}`));
      revisadas += grupo.length;
    }
    // Legales (sobre, contacto, privacidad, términos): una por edición en su idioma, clúster de todas con
    // la versión en inglés de global como x-default; casi siempre va por sitemap.
    for (const slug of ["privacidad", "terminos", "contacto", "sobre"] as const) {
      const legales: PaginaConIdiomas[] = registro.mercados(modo).map((m) => ({ url: seo.urlIntl(m.codigo, slug), locale: etiquetaIdioma(m.locale), concepto: `legal-${slug}`, idiomas: mapa.hreflangLegal(registro, slug, modo) }));
      for (const p of legales) {
        if (!publicadas.has(p.url)) fallas.push(`[${modo}] ${p.url}: legal sin entrada en el sitemap del mercado`);
        const sitemap = enSitemap.get(p.url);
        const vaAlSitemap = seo.hreflangVaAlSitemap(p.idiomas);
        if (vaAlSitemap && (!sitemap || JSON.stringify(sitemap) !== JSON.stringify(p.idiomas))) fallas.push(`[${modo}] ${p.url}: clúster legal grande que no está entero en el sitemap`);
        if (!vaAlSitemap && sitemap) fallas.push(`[${modo}] ${p.url}: clúster legal chico repetido en el sitemap`);
      }
      fallas.push(...revisarClusteres(legales, publicadas, seo.urlIntl("global", slug), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));
      revisadas += legales.length;
    }
  }

  // calcular.ar (src/lib/hreflang-ar.ts): con el flag prendido cada calculadora de AR con concepto entra
  // a su clúster como es-AR, en el <head> si es chico y en el sitemap de AR si es grande; calcularya la
  // lista con la misma URL. Se prueba con el flag forzado, así el gate no depende del env de la máquina.
  {
    const flag = process.env.NEXT_PUBLIC_HREFLANG_AR;
    process.env.NEXT_PUBLIC_HREFLANG_AR = "1";
    process.env.VERCEL_ENV = "production";
    const ar = await import("../src/lib/hreflang-ar");
    const { armarSitemap } = await import("../src/app/sitemap");
    const { readFileSync } = await import("node:fs");
    const enSitemapAR = new Map<string, Idiomas>(armarSitemap().flatMap((e) => (e.alternates?.languages ? [[e.url, e.alternates.languages as Idiomas] as const] : [])));
    const origenAR = sitio.origenAR();
    for (const ruta of ar.rutasARConCluster()) {
      const url = `${origenAR}${ruta}`;
      const idiomas = ar.clusterAR(ruta);
      if (!idiomas) {
        fallas.push(`[ar] ${ruta}: sin clúster con el flag prendido`);
        continue;
      }
      if (idiomas["es-AR"] !== url) fallas.push(`[ar] ${ruta}: el clúster no lista a calcular.ar como es-AR (${idiomas["es-AR"]})`);
      const head = ar.hreflangHeadAR(ruta);
      const sitemap = enSitemapAR.get(url);
      if (seo.hreflangVaAlSitemap(idiomas)) {
        if (head) fallas.push(`[ar] ${ruta}: clúster grande en el <head>`);
        if (!sitemap || JSON.stringify(sitemap) !== JSON.stringify(idiomas)) fallas.push(`[ar] ${ruta}: clúster grande que no está entero en el sitemap de AR`);
      } else {
        if (!head) fallas.push(`[ar] ${ruta}: clúster chico sin hreflang en el <head>`);
        if (sitemap) fallas.push(`[ar] ${ruta}: clúster chico repetido en el sitemap de AR`);
      }
      // La contraparte: cada equivalente de calcularya lista la misma URL de AR.
      const concepto = ar.conceptoDeRutaAR(ruta)!;
      for (const e of registro.equivalentes(concepto, (m) => hoyEn(m), "produccion")) {
        const p = registro.pagina(e.mercado, e.slug, hoyEn(registro.pais(e.mercado)!.mercado), "produccion");
        const suyo = p ? seo.hreflangDe(concepto, p.equivalentes) : undefined;
        if (suyo?.["es-AR"] !== url) fallas.push(`[ar] ${seo.urlIntl(e.mercado, e.slug)}: no lista a ${url} como es-AR`);
      }
      // Cada página de AR del clúster tiene que pedir el hreflang en su metadata.
      const archivo = `src/app/(ar)${ruta}/page.tsx`;
      if (!readFileSync(archivo, "utf8").includes(`hreflangHeadAR("${ruta}")`)) fallas.push(`[ar] ${archivo}: no usa hreflangHeadAR("${ruta}") en alternates.languages`);
      revisadas++;
    }
    if (flag === undefined) delete process.env.NEXT_PUBLIC_HREFLANG_AR;
    else process.env.NEXT_PUBLIC_HREFLANG_AR = flag;
  }

  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisadas} páginas revisadas en los dos modos, clústeres recíprocos`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
