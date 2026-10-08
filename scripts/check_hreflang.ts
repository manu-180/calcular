// hreflang de calcularya (ADR 0001, D6 y D9): recíproco o nada. Por cada calculadora publicable en
// cada modo (producción e interno) arma los alternates con el mismo código que usan las páginas
// (src/motor/seo.ts) y falla si:
// - un clúster no es recíproco (A apunta a B y B no a A, o los dos no listan lo mismo),
// - un hreflang apunta a algo que no se publica o que no está en el sitemap,
// - falta x-default o no es la home de calcularya,
// - dos mercados del mismo clúster comparten locale (el segundo pisaría al primero),
// - aparece calcular.ar con el flag apagado.
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

  let revisadas = 0;
  for (const modo of ["produccion", "interno"] as ModoPublicacion[]) {
    process.env.VERCEL_ENV = modo === "produccion" ? "production" : "preview";
    const mercados = registro.mercados(modo).filter((m) => m.codigo !== "global");
    const publicadas = new Set<string>();
    for (const m of registro.mercados(modo)) for (const u of mapa.urlsDelMercado(registro, m.codigo) ?? []) publicadas.add(u);
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
        paginas.push({ url, locale: m.locale, concepto: p.calculadora.concepto, idiomas: seo.hreflangDe(p.calculadora.concepto, p.equivalentes) });
      }
    }
    revisadas += paginas.length;
    fallas.push(...revisarClusteres(paginas, publicadas, seo.urlIntl("global"), sitio.hreflangARActivo()).map((e) => `[${modo}] ${e}`));
  }

  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisadas} páginas revisadas en los dos modos, clústeres recíprocos`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
