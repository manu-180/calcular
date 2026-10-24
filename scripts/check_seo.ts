// Infraestructura SEO que no se ve romperse: sitemap, robots y el JSON-LD que arma src/lib/seo.ts.
// Correr con: npx tsx scripts/check_seo.ts  (o vía scripts/check-all.ts)
//
// POR QUÉ (6/10/2026): la auditoría encontró, todo a la vez, un sitemap con lastmod de enero en
// páginas reescritas en septiembre, tres años de /inflacion construidos e indexables pero fuera del
// sitemap (la lista de años estaba escrita a mano), 26 páginas con dateModified en castellano
// («6 de septiembre de 2026», inválido para Google) y 106 Article firmados con un @id que no se
// resolvía en la página. Nada de eso rompe el build ni lo ve un usuario.

import "./sin-server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { armarSitemap } from "../src/app/sitemap";
import robots from "../src/app/robots";
import { fechaISO, migas, prepararJsonLd, grafoDelSitio, SITIO } from "../src/lib/seo";
import { AUTOR } from "../src/lib/schema";
import { aniosDisponibles } from "../src/lib/inflacion";
import { MESES_COMERCIO } from "../src/data/convenios/comercio";
import { hoyAR } from "../src/lib/hoy";

const RAIZ = resolve(import.meta.dirname, "..");
const APP = join(RAIZ, "src", "app", "(ar)");

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

/** Rutas que a propósito no van al sitemap: privadas, noindex o transaccionales. */
const FUERA_DEL_SITEMAP = new Set<string>([
  "/contacto",
  "/privacidad",
  "/terminos",
  "/planillas/gracias",
  "/planillas/comprar",
  "/login",
  "/registro",
  "/recuperar",
  "/dashboard",
  // Redirección permanente a /jubilacion (src/app/(ar)/jubilaciones/page.tsx), no es una página.
  "/jubilaciones",
]);
/** Rutas que entran al sitemap solo cuando sus datos lo piden: ni obligatorias ni prohibidas. */
const CONDICIONALES = new Set<string>([
  "/sueldos-reales", // entra cuando la foto diaria publica una ocupación (paisesConSueldos); si no, noindex
]);
const PREFIJOS_FUERA = ["/cuenta", "/dashboard/", "/auth/", "/informes/cuota-alimentaria/ver", "/informes/indemnizacion/ver", "/informes/ganancias/ver", "/informes/inflacion/ver", "/informes/credito-laboral/ver"];

function rutasEnDisco(dir: string, base = ""): string[] {
  const salida: string[] = [];
  if (existsSync(join(dir, "page.tsx"))) salida.push(base === "" ? "/" : base);
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith("_") || e.name === "api") continue;
    salida.push(...rutasEnDisco(join(dir, e.name), `${base}/${e.name}`));
  }
  return salida;
}

const hoy = hoyAR();
const entradas = armarSitemap(true);
const porRuta = new Map(
  entradas.map((e) => [e.url === SITIO ? "/" : e.url.slice(SITIO.length), e.lastModified ? String(e.lastModified).slice(0, 10) : ""]),
);

// ===========================================================================
// 1 · Sitemap: todo lo indexable adentro, nada que no exista
// ===========================================================================
{
  const estaticas = rutasEnDisco(APP).filter((r) => !r.includes("["));
  const deben = estaticas.filter((r) => !FUERA_DEL_SITEMAP.has(r) && !CONDICIONALES.has(r) && !PREFIJOS_FUERA.some((p) => r.startsWith(p)));
  check(`las ${deben.length} páginas estáticas indexables están en el sitemap`, deben.every((r) => porRuta.has(r)), deben.filter((r) => !porRuta.has(r)));

  const privadas = [...porRuta.keys()].filter((r) => FUERA_DEL_SITEMAP.has(r) || PREFIJOS_FUERA.some((p) => r.startsWith(p)));
  check("el sitemap no lista rutas privadas ni noindex fijas", privadas.length === 0, privadas);

  const dinamicas = new Set(rutasEnDisco(APP).filter((r) => r.includes("[")).map((r) => r.slice(0, r.lastIndexOf("/"))));
  const huerfanas = [...porRuta.keys()].filter((r) => !estaticas.includes(r) && !dinamicas.has(r.slice(0, r.lastIndexOf("/"))));
  check("toda URL del sitemap resuelve a una página real", huerfanas.length === 0, huerfanas);

  check("sin URLs repetidas", porRuta.size === entradas.length, entradas.length - porRuta.size);
  check("todas las URLs son del dominio canónico, sin barra final", entradas.every((e) => e.url.startsWith(SITIO) && !/\/$/.test(e.url.slice(SITIO.length))));

  const anios = aniosDisponibles().map((a) => `/inflacion/${a}`);
  check("cada año de la serie de IPC está en el sitemap (salen de los datos)", anios.every((r) => porRuta.has(r)), anios.filter((r) => !porRuta.has(r)));
  const comercio = MESES_COMERCIO.map((m) => `/convenios/comercio/${m.id}`);
  check("cada mes de escala de Comercio está en el sitemap", comercio.every((r) => porRuta.has(r)));
}

// ===========================================================================
// 2 · lastmod creíble
// ===========================================================================
{
  const malas = [...porRuta.entries()].filter(([, f]) => f && !/^\d{4}-\d{2}-\d{2}$/.test(f));
  check("todo lastmod es una fecha ISO", malas.length === 0, malas);
  const futuras = [...porRuta.entries()].filter(([, f]) => f && f > hoy);
  check(`ningún lastmod está en el futuro (hoy ${hoy})`, futuras.length === 0, futuras);

  // Una página que sube su fecha literal y deja el sitemap atrás le dice a Google que no cambió.
  const atrasadas: string[] = [];
  for (const ruta of rutasEnDisco(APP).filter((r) => !r.includes("[") && porRuta.has(r))) {
    const src = readFileSync(join(APP, ...ruta.split("/").filter(Boolean), "page.tsx"), "utf8");
    const fechas = [...src.matchAll(/(?:modificado|dateModified)\s*:\s*["'`]([^"'`$]+)["'`]/g)]
      .map((m) => fechaISO(m[1]))
      .filter((f) => /^\d{4}-\d{2}-\d{2}$/.test(f));
    const max = fechas.sort().pop();
    const enSitemap = porRuta.get(ruta) ?? "";
    if (max && (!enSitemap || enSitemap < max)) atrasadas.push(`${ruta}: sitemap ${enSitemap || "sin fecha"} < página ${max}`);
  }
  check("el lastmod del sitemap no queda atrás de la fecha literal de su página", atrasadas.length === 0, atrasadas);
}

// ===========================================================================
// 3 · robots.txt
// ===========================================================================
{
  const r = robots();
  const reglas = Array.isArray(r.rules) ? r.rules : [r.rules];
  check("robots declara el sitemap canónico", r.sitemap === `${SITIO}/sitemap.xml`);
  const bloqueanTodo = reglas.filter((x) => [x.disallow].flat().includes("/"));
  check("ningún user-agent (buscadores ni bots de IA) tiene Disallow: /", bloqueanTodo.length === 0, bloqueanTodo.map((x) => x.userAgent));
  const general = reglas.find((x) => x.userAgent === "*");
  const dis = [general?.disallow].flat();
  check("robots tapa las rutas privadas y la API", ["/api/", "/cuenta/", "/dashboard/", "/login$"].every((d) => dis.includes(d)), dis);
  const enSitemapBloqueadas = [...porRuta.keys()].filter((ruta) =>
    dis.some((d) => d && (d.endsWith("$") ? ruta === d.slice(0, -1) : ruta.startsWith(d))),
  );
  check("ninguna URL del sitemap está bloqueada por robots", enSitemapBloqueadas.length === 0, enSitemapBloqueadas);
}

// ===========================================================================
// 4 · JSON-LD: lo que agrega src/lib/seo.ts
// ===========================================================================
{
  check("fechaISO: «6 de septiembre de 2026» -> 2026-09-06", fechaISO("6 de septiembre de 2026") === "2026-09-06");
  check("fechaISO: «1° de octubre de 2026» -> 2026-10-01", fechaISO("1° de octubre de 2026") === "2026-10-01");
  check("fechaISO: lo ISO queda igual", fechaISO("2026-06-13") === "2026-06-13");
  check("fechaISO: lo que no reconoce queda igual", fechaISO("julio 2026") === "julio 2026");

  const pagina = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebApplication", name: "Calculadora", url: `${SITIO}/sueldo-neto/comercio` },
      {
        "@type": "Article",
        headline: "Sueldo neto de Comercio",
        mainEntityOfPage: `${SITIO}/sueldo-neto/comercio`,
        dateModified: "8 de septiembre de 2026",
        datePublished: "8 de septiembre de 2026",
        author: { "@id": AUTOR["@id"] },
      },
    ],
  };
  const listo = prepararJsonLd(pagina) as { "@graph": Record<string, unknown>[] };
  const art = listo["@graph"].find((n) => n["@type"] === "Article")!;
  check("prepararJsonLd: dateModified en castellano sale en ISO", art.dateModified === "2026-09-08" && art.datePublished === "2026-09-08");
  const autor = art.author as Record<string, unknown>;
  check("prepararJsonLd: el autor por @id sale con nombre y url", autor.name === AUTOR.name && autor.url === AUTOR.url);
  check("prepararJsonLd: no publica el mail del autor en cada página", !("email" in autor));
  const lista = listo["@graph"].find((n) => n["@type"] === "BreadcrumbList") as { itemListElement: { item: string; position: number }[] } | undefined;
  check("prepararJsonLd: agrega migas cuando la página no las trae", Boolean(lista));
  const items = lista?.itemListElement ?? [];
  check("migas: arrancan en el Inicio y terminan en la URL de la página", items[0]?.item === SITIO && items.at(-1)?.item === `${SITIO}/sueldo-neto/comercio`, items);
  check("migas: incluyen el tramo intermedio que es página real", items.some((i) => i.item === `${SITIO}/sueldo-neto`), items);
  check("migas: posiciones 1..n", items.every((i, k) => i.position === k + 1));

  const conMigas = { "@graph": [{ "@type": "BreadcrumbList", itemListElement: [] }, { "@type": "WebPage", url: `${SITIO}/blog` }] };
  const igual = prepararJsonLd(conMigas) as { "@graph": unknown[] };
  check("prepararJsonLd: no duplica migas si la página ya trae las suyas", igual["@graph"].length === 2);
  check("migas: la home no lleva migas", migas("/", "Inicio") === null);

  const sitio = grafoDelSitio() as { "@graph": Record<string, unknown>[] };
  const tiposSitio = sitio["@graph"].map((n) => n["@type"]);
  check("grafo del sitio: WebSite + Organization + Person", ["WebSite", "Organization", "Person"].every((t) => tiposSitio.includes(t)), tiposSitio);
  check("grafo del sitio: la Organization tiene logo", Boolean(sitio["@graph"].find((n) => n["@type"] === "Organization")?.logo));
  check("grafo del sitio: sin mail en el HTML de cada página", !JSON.stringify(sitio).includes("@gmail"));
}

// ===========================================================================
// 5 · Aviso (no falla): títulos largos para el equipo de redacción
// ===========================================================================
{
  const largos: string[] = [];
  for (const ruta of rutasEnDisco(APP).filter((r) => !r.includes("[") && porRuta.has(r))) {
    const src = readFileSync(join(APP, ...ruta.split("/").filter(Boolean), "page.tsx"), "utf8");
    const t = src.match(/export const metadata[\s\S]*?title:\s*\n?\s*["'`]([^"'`]+)["'`]/);
    if (t && t[1].length > 60) largos.push(ruta);
  }
  console.log(`AVISO ${largos.length} páginas con title literal de más de 60 caracteres (ver docs/seo/auditoria-2026-10-06.md)`);
}

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`SEO OK (${entradas.length} URLs en el sitemap).`);
}
