// Calculadora embebible (src/motor/embed). No necesita server: corre en check-all.
// - SCRIPT_OPCIONES (lo que aplica ?tema y ?acento antes del primer pintado) decide igual que temaDe y
//   acentoDe, que son los que validan lo que llega por la URL.
// - Un tema o un acento raro nunca llega a un atributo ni a un style.
// - El código para pegar escapa lo que escapa y no se rompe con comillas ni «<» en un título.
// - Las reglas de ruteo y de headers cubren /<m>/embed/<slug> y nada más, en cada mercado del registro.
// - Ningún mercado ni calculadora se llama «embed» (la ruta /<m>/embed es del generador).
// - Título y descripción del generador entran en 60 y 160 en cada mercado.
import vm from "node:vm";
import type { Registro } from "../src/motor/registro";

process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";

const fallas: string[] = [];
const falla = (m: string) => fallas.push(m);

async function main() {
  const { ACENTO_BASE, ACENTOS, SCRIPT_OPCIONES, acentoDe, temaDe } = await import("../src/motor/embed/opciones");
  const { codigoParaPegar, consultaEmbed } = await import("../src/motor/embed/codigo");
  const { reglasEmbed, RAIZ_INTERNA_EMBED } = await import("../src/motor/embed/rutas");
  const { textosEmbed } = await import("../src/motor/i18n/embed");
  const { anchoVisual } = await import("../src/motor/ancho");
  const { elegirTitulo, LARGO_DESCRIPCION, LARGO_TITULO } = await import("../src/motor/seo");
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;

  // 1. El script de <head> y los validadores dicen lo mismo.
  const muestras = [
    "", "claro", "oscuro", "dark", "light", "DARK", "Oscuro", "auto", "<script>", "oscuro\"onload=\"x",
  ];
  for (const t of muestras) {
    const doc = { documentElement: { attrs: {} as Record<string, string>, style: { props: {} as Record<string, string>, setProperty(k: string, v: string) { this.props[k] = v; } }, setAttribute(k: string, v: string) { this.attrs[k] = v; } } };
    vm.runInNewContext(SCRIPT_OPCIONES, { document: doc, location: { search: `?tema=${encodeURIComponent(t)}` }, URLSearchParams, parseInt, Math });
    const enScript = doc.documentElement.attrs["data-tema"] ?? "claro";
    if (enScript !== temaDe(t)) falla(`tema «${t}»: el script aplica ${enScript} y temaDe da ${temaDe(t)}`);
  }
  const acentos = ["2563eb", "#2563EB", "fff", "#fff", "ffffff", "e11d48", "475569", "10b981", "ffff00", "f5f5f5", "zzzzzz", "12345", "2563eb;color:red", "url(x)", "", "#00f", "000"];
  for (const a of acentos) {
    const doc = { documentElement: { attrs: {} as Record<string, string>, style: { props: {} as Record<string, string>, setProperty(k: string, v: string) { this.props[k] = v; } }, setAttribute() {} } };
    vm.runInNewContext(SCRIPT_OPCIONES, { document: doc, location: { search: `?acento=${encodeURIComponent(a)}` }, URLSearchParams, parseInt, Math });
    const enScript = doc.documentElement.style.props["--cye-acento"] ?? null;
    const enTs = acentoDe(a);
    if (enScript !== enTs) falla(`acento «${a}»: el script aplica ${enScript} y acentoDe da ${enTs}`);
    if (enTs && !/^#[0-9a-f]{6}$/.test(enTs)) falla(`acento «${a}»: acentoDe devolvió «${enTs}», que no es #rrggbb`);
  }
  if (acentoDe("ffff00") !== null || acentoDe("f5f5f5") !== null) falla("un acento casi blanco tiene que descartarse (contraste con la tarjeta)");
  // El verde de la marca no llega a 3:1 contra blanco (se descarta como acento, y da igual: es el base).
  // Los demás del generador sí tienen que pasar, o elegirlos no haría nada.
  for (const hex of ACENTOS) if (hex !== ACENTO_BASE && acentoDe(hex) !== hex) falla(`el acento ${hex} del generador no pasa acentoDe`);

  // 2. La query del código para pegar no lleva lo que es el valor base.
  if (consultaEmbed({ tema: "claro", acento: null }) !== "") falla("claro y verde no escriben query");
  if (consultaEmbed({ tema: "oscuro", acento: "#2563eb" }) !== "?tema=oscuro&acento=2563eb") falla("query de oscuro y azul mal armada");

  // 3. El código para pegar escapa lo que va entre comillas.
  const codigo = codigoParaPegar({
    origen: "https://calcularya.com",
    mercado: "mx",
    slug: "sueldo-neto",
    tema: "oscuro",
    acento: "#2563eb",
    anchoPx: 520,
    tituloIframe: 'Sueldo "neto" <b> & más',
    credito: { texto: "Calculadora de CalcularYa", href: "https://calcularya.com/mx/sueldo-neto" },
  });
  if (/title="[^"]*"[^ >][^>]*"[^>]*<b>/.test(codigo) || codigo.includes("<b>")) falla("el título del iframe no se escapó");
  if (!codigo.includes('loading="lazy"') || !codigo.includes("embed.js") || !codigo.includes('rel="noopener"')) falla("al código para pegar le falta lazy, el script o el noopener del crédito");
  if ((codigo.match(/<iframe/g) ?? []).length !== 1 || (codigo.match(/<\/iframe>/g) ?? []).length !== 1) falla("el código para pegar tiene que llevar un solo iframe");

  // 4. Reglas de ruteo.
  const mercados = registro.mercados("interno").map((m) => m.codigo).filter((c) => c !== "global");
  const reglas = reglasEmbed({ origenIntl: "https://calcularya.com", mercados, cookiePreview: false });
  if (reglasEmbed({ origenIntl: null, mercados, cookiePreview: false }).length) falla("sin sitio intl no hay reglas de embed");
  const principal = reglas.filter((r) => r.destination === `/${RAIZ_INTERNA_EMBED}/:mercado/:slug`);
  if (principal.length !== 1 || !principal[0].has?.some((c) => c.type === "host")) falla("la regla del embed tiene que ir atada al host de calcularya");
  const conCookie = reglasEmbed({ origenIntl: "https://calcularya.com", mercados, cookiePreview: true });
  if (conCookie.filter((r) => r.destination === `/${RAIZ_INTERNA_EMBED}/:mercado/:slug`).length !== 2) falla("en un preview el embed tiene que entrar también por la cookie sitio=intl");

  // 5. «embed» no es de nadie.
  if (mercados.includes("embed")) falla("hay un mercado llamado embed");
  for (const m of mercados) {
    for (const c of registro.calculadorasPublicables(m as never, "2026-10-23", "interno")) {
      if (c.definicion.slug === "embed") falla(`${m}: una calculadora tiene el slug «embed», que es del generador`);
    }
  }

  // 6. SEO del generador en cada mercado.
  for (const m of registro.mercados("interno")) {
    if (m.codigo === "global") continue;
    const t = textosEmbed(m.idioma, m.trato, m.locale).pagina;
    const titulo = elegirTitulo(t.titulo(m.nombre));
    if (anchoVisual(titulo) > LARGO_TITULO) falla(`${m.codigo}: título de ${anchoVisual(titulo)} de ancho (máximo ${LARGO_TITULO}): ${titulo}`);
    const d = t.descripcion(m.nombre);
    if (anchoVisual(d) > LARGO_DESCRIPCION) falla(`${m.codigo}: descripción de ${anchoVisual(d)} de ancho (máximo ${LARGO_DESCRIPCION})`);
  }

  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: embed en ${mercados.length} mercados`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
