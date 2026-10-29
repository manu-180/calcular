// Poda de universales sin tráfico (ESTANDAR-SEO-MULTIPAIS §3, src/motor/universales/poda.ts):
// - podadas.json solo nombra mercados y universales que existen, con fechas válidas;
// - con una lista de prueba, la universal podada sigue publicada pero sale del sitemap del mercado, del
//   clúster hreflang de las demás ediciones y de su propio <head>, y lleva robots noindex, follow;
// - una local nunca se poda aunque figure en la lista.
// No necesita server: corre en check-all.
import "./sin-server-only";
import type { Registro } from "../src/motor/registro";

process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";
process.env.VERCEL_ENV = "production";

const fallas: string[] = [];
const verdad = (nombre: string, ok: boolean, detalle = "") => {
  if (!ok) fallas.push(`${nombre}${detalle ? `: ${detalle}` : ""}`);
};

async function main() {
  const { crearRegistro, esUniversal } = await import("../src/motor/registro");
  const { PODADAS } = await import("../src/motor/universales/poda");
  const { UNIVERSALES } = await import("../src/motor/universales");
  const mapa = await import("../src/motor/mapa");
  const seo = await import("../src/motor/seo");
  const { contextoSitio } = await import("../src/motor/ui/contexto");
  const { metadatosDe } = await import("../src/motor/ui/metadatos");
  const { hoyEn } = await import("../src/motor/vigencia");
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const real = mod.registro ?? mod.default!.registro;

  const ids = new Set(UNIVERSALES.map((u) => u.id));
  const fecha = /^\d{4}-\d{2}-\d{2}$/;
  if (PODADAS.actualizadoEl !== null && !fecha.test(PODADAS.actualizadoEl)) fallas.push(`podadas.json: actualizadoEl inválido (${PODADAS.actualizadoEl})`);
  let enLista = 0;
  for (const [codigo, porId] of Object.entries(PODADAS.mercados)) {
    if (!real.pais(codigo)) fallas.push(`podadas.json: el mercado ${codigo} no existe`);
    for (const [id, f] of Object.entries(porId ?? {})) {
      enLista++;
      if (!ids.has(id)) fallas.push(`podadas.json: ${codigo}/${id} no es una universal`);
      if (!fecha.test(f)) fallas.push(`podadas.json: ${codigo}/${id} con fecha inválida (${f})`);
    }
  }

  // Una universal que esté publicada en dos mercados a la vez: se poda en el primero.
  const modo = "produccion" as const;
  const mercados = real.mercados(modo).filter((m) => m.codigo !== "global");
  let caso: { a: string; b: string; id: string; slugA: string; slugB: string } | null = null;
  for (const m of mercados) {
    const u = real.calculadorasPublicables(m.codigo, hoyEn(m), modo).find(esUniversal);
    if (!u || !esUniversal(u)) continue;
    const otro = real.equivalentes(u.definicion.concepto, (x) => hoyEn(x), modo).find((e) => e.mercado !== m.codigo);
    if (otro) {
      caso = { a: m.codigo, b: otro.mercado, id: u.universal.id, slugA: u.definicion.slug, slugB: otro.slug };
      break;
    }
  }
  verdad("hay una universal publicada en dos mercados para probar", Boolean(caso));
  if (caso) {
    const pais = real.pais(caso.a)!;
    const local = pais.calculadoras.find((c) => !esUniversal(c));
    const reg = crearRegistro(real.paises, {
      actualizadoEl: "2026-01-01",
      mercados: { [caso.a]: { [caso.id]: "2026-01-01", ...(local ? { [local.definicion.id]: "2026-01-01" } : {}) } },
    });
    const ma = mercados.find((m) => m.codigo === caso!.a)!;
    const mb = mercados.find((m) => m.codigo === caso!.b)!;
    const urlA = seo.urlIntl(caso.a, caso.slugA);

    verdad("registro.podada marca la universal", reg.podada(caso.a, caso.slugA));
    verdad("la misma universal en otro mercado no se poda", !reg.podada(caso.b, caso.slugB));
    if (local) verdad("una local nunca se poda", !reg.podada(caso.a, local.definicion.slug), local.definicion.slug);

    const pa = reg.pagina(caso.a, caso.slugA, hoyEn(ma), modo);
    verdad("la podada sigue publicada (pagina() no es null)", Boolean(pa));
    verdad("pagina() la marca como podada", pa?.podada === true);
    verdad("la podada no tiene clúster propio", (pa?.equivalentes.length ?? -1) === 0);

    const pb = reg.pagina(caso.b, caso.slugB, hoyEn(mb), modo);
    verdad("las demás ediciones no la listan en su clúster", Boolean(pb) && !pb!.equivalentes.some((e) => e.mercado === caso!.a));

    const urls = (mapa.entradasDelMercado(reg, caso.a, { conAlternos: true }) ?? []).map((e) => e.url);
    verdad("la podada no está en el sitemap del mercado", urls.length > 0 && !urls.includes(urlA), urlA);
    const alternos = (mapa.entradasDelMercado(reg, caso.b, { conAlternos: true }) ?? []).flatMap((e) => Object.values(e.alternos ?? {}));
    verdad("ningún xhtml:link del sitemap apunta a la podada", !alternos.includes(urlA));

    const ctx = contextoSitio(reg, caso.a);
    const md = ctx && pa ? metadatosDe(ctx, { tipo: "calculadora", pagina: pa }) : null;
    verdad("robots noindex, follow en la podada", md?.robots?.index === false && md?.robots?.follow === true, JSON.stringify(md?.robots));
    verdad("la podada no lleva hreflang en el <head>", !md?.alternates.languages);
    verdad("el canonical de la podada es ella misma", md?.alternates.canonical === urlA);

    const ctxB = contextoSitio(reg, caso.b);
    const mdB = ctxB && pb ? metadatosDe(ctxB, { tipo: "calculadora", pagina: pb }) : null;
    verdad("una no podada no lleva robots", mdB !== null && mdB.robots === undefined);
  }

  console.log(`check_poda: ${enLista} universales en podadas.json${caso ? ` · caso de prueba ${caso.a}/${caso.slugA}` : ""}`);
  if (fallas.length) {
    console.log(`FALLAS (${fallas.length}):`);
    for (const f of fallas) console.log(`  ❌ ${f}`);
    process.exit(1);
  }
  console.log("OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
