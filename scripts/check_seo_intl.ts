// SEO técnico de calcularya, página por página (ADR 0001, D6). Dos modos:
//
//   npx -y tsx scripts/check_seo_intl.ts                 sin server: arma la metadata y renderiza el
//                                                         cuerpo con las mismas funciones que las
//                                                         páginas (src/motor/ui/metadatos.ts), en
//                                                         modo producción e interno. Lo corre check-all.
//   npx -y tsx scripts/check_seo_intl.ts --base <url>    contra un `next start` ya levantado: recorre
//                                                         el sitemap del host intl y lee el HTML real
//                                                         (head entero, JSON-LD, h1) y pide cada
//                                                         imagen OG. El build y este script tienen que
//                                                         tener la misma NEXT_PUBLIC_SITIO_INTL_URL.
//
// Falla si una página tiene title de más de 60 caracteres (con los valores ya puestos), description
// de más de 160, canonical que no es la URL pública (o lleva /intl), JSON-LD que no parsea o repite
// un @id o un tipo que va una sola vez, más o menos de un h1, un salto de nivel en los títulos, o le
// falta la imagen OG. También si dos páginas de un mismo país comparten title o description.
import http from "node:http";
import { createElement, type ComponentType, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { anchoVisual } from "../src/motor/ancho";
import type { ContextoSitio } from "../src/motor/ui/contexto";
import type { PaginaIntl } from "../src/motor/ui/metadatos";
import type { Registro } from "../src/motor/registro";

process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";

const LARGO_TITULO = 60;
const LARGO_DESCRIPCION = 160;
const UNICOS = new Set(["WebSite", "Organization", "WebApplication", "BreadcrumbList", "FAQPage", "CollectionPage", "AboutPage", "ContactPage"]);

const fallas: string[] = [];
const falla = (s: string) => fallas.push(s);

const decodificar = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

export function revisarTexto(id: string, title: string, description: string): string[] {
  const e: string[] = [];
  if (!title.trim()) e.push(`${id}: title vacío`);
  if (anchoVisual(title) > LARGO_TITULO) e.push(`${id}: title de ${anchoVisual(title)} de ancho (máx. ${LARGO_TITULO}): ${title}`);
  if (!description.trim()) e.push(`${id}: description vacía`);
  if (anchoVisual(description) > LARGO_DESCRIPCION) e.push(`${id}: description de ${anchoVisual(description)} de ancho (máx. ${LARGO_DESCRIPCION})`);
  if (/\{\{|\}\}/.test(title + description)) e.push(`${id}: marcador {{...}} sin resolver en title o description`);
  return e;
}

export function revisarCanonical(id: string, canonical: string | undefined, esperado: string, origen: string): string[] {
  if (!canonical) return [`${id}: sin canonical`];
  // Next escribe la raíz sin barra (https://calcularya.com); para Google es la misma URL que con barra.
  if (canonical === origen) canonical = `${origen}/`;
  const e: string[] = [];
  if (canonical !== esperado) e.push(`${id}: canonical ${canonical}, se esperaba ${esperado}`);
  if (!canonical.startsWith(`${origen}/`)) e.push(`${id}: canonical fuera del dominio público (${canonical})`);
  if (canonical.includes("/intl")) e.push(`${id}: canonical con el path interno /intl`);
  if (canonical !== `${origen}/` && canonical.endsWith("/")) e.push(`${id}: canonical con barra final`);
  return e;
}

// Cada bloque es un objeto con @graph o un nodo suelto. Ningún @id dos veces y los tipos de UNICOS
// una sola vez por página (dos BreadcrumbList o dos FAQPage confunden al validador de Google).
export function revisarLd(id: string, bloques: readonly string[]): { errores: string[]; nodos: Record<string, unknown>[] } {
  const errores: string[] = [];
  const nodos: Record<string, unknown>[] = [];
  for (const b of bloques) {
    let datos: unknown;
    try {
      datos = JSON.parse(b);
    } catch (err) {
      errores.push(`${id}: JSON-LD que no parsea (${(err as Error).message})`);
      continue;
    }
    const lista = Array.isArray(datos) ? datos : [datos];
    for (const d of lista as Record<string, unknown>[]) {
      if (d["@context"] !== "https://schema.org") errores.push(`${id}: bloque JSON-LD sin @context https://schema.org`);
      const g = d["@graph"];
      nodos.push(...(Array.isArray(g) ? (g as Record<string, unknown>[]) : [d]));
    }
  }
  const ids = nodos.map((n) => n["@id"]).filter((x): x is string => typeof x === "string");
  const idRepetido = ids.find((x, i) => ids.indexOf(x) !== i);
  if (idRepetido) errores.push(`${id}: JSON-LD repite el @id ${idRepetido}`);
  const tipos = nodos.map((n) => String(n["@type"]));
  for (const t of UNICOS) if (tipos.filter((x) => x === t).length > 1) errores.push(`${id}: JSON-LD con ${tipos.filter((x) => x === t).length} nodos ${t}`);
  for (const n of nodos) {
    if (n["@type"] === "WebApplication") {
      const offers = n.offers as { price?: string; priceCurrency?: string } | undefined;
      if (n.applicationCategory !== "FinanceApplication") errores.push(`${id}: WebApplication sin applicationCategory FinanceApplication`);
      if (offers?.price !== "0" || !offers.priceCurrency) errores.push(`${id}: WebApplication sin offers de precio 0 con moneda`);
      if (!n.inLanguage) errores.push(`${id}: WebApplication sin inLanguage`);
      if (!n.areaServed) errores.push(`${id}: WebApplication sin areaServed`);
      if ("dateModified" in n && !/^\d{4}-\d{2}-\d{2}$/.test(String(n.dateModified))) errores.push(`${id}: dateModified ${String(n.dateModified)} no es una fecha ISO`);
    }
    if (n["@type"] === "BreadcrumbList") {
      const items = (n.itemListElement as { item?: string }[] | undefined) ?? [];
      if (!items.length || items.some((it) => !it.item?.startsWith("http"))) errores.push(`${id}: BreadcrumbList con ítems sin URL absoluta`);
    }
    if (n["@type"] === "WebSite" && "potentialAction" in n) errores.push(`${id}: WebSite con SearchAction y el sitio no tiene buscador`);
  }
  return { errores, nodos };
}

export function revisarTitulos(id: string, html: string): string[] {
  const e: string[] = [];
  const niveles = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  const h1 = niveles.filter((n) => n === 1).length;
  if (h1 !== 1) e.push(`${id}: ${h1} h1 (tiene que haber uno)`);
  if (niveles[0] !== undefined && niveles[0] !== 1) e.push(`${id}: el primer título es h${niveles[0]}, no h1`);
  for (let i = 1; i < niveles.length; i++) {
    if (niveles[i] > niveles[i - 1] + 1) {
      e.push(`${id}: salto de h${niveles[i - 1]} a h${niveles[i]}`);
      break;
    }
  }
  return e;
}

function repetidos(id: string, pares: readonly { url: string; title: string; description: string }[]): string[] {
  const e: string[] = [];
  for (const campo of ["title", "description"] as const) {
    const vistos = new Map<string, string>();
    for (const p of pares) {
      const previo = vistos.get(p[campo]);
      if (previo) e.push(`${id}: ${previo} y ${p.url} comparten ${campo}: ${p[campo]}`);
      else vistos.set(p[campo], p.url);
    }
  }
  return e;
}

function pruebasNegativas() {
  const largo = revisarTexto("neg", "x".repeat(61), "y".repeat(161));
  if (largo.length !== 2) falla("prueba negativa: no detectó title y description largos");
  if (!revisarCanonical("neg", "https://calcularya.com/intl/mx/x", "https://calcularya.com/mx/x", "https://calcularya.com").some((e) => e.includes("/intl"))) {
    falla("prueba negativa: no detectó un canonical con /intl");
  }
  const ld = revisarLd("neg", ['{"@context":"https://schema.org","@graph":[{"@type":"FAQPage","@id":"a"},{"@type":"FAQPage","@id":"a"}]}', "{roto"]);
  if (ld.errores.length < 3) falla("prueba negativa: no detectó JSON-LD roto, @id repetido y FAQPage doble");
  if (revisarTitulos("neg", "<h1>a</h1><h1>b</h1><h3>c</h3>").length < 2) falla("prueba negativa: no detectó dos h1 y un salto de nivel");
}

const nada = () => {};
const ROUTER_QUIETO = { back: nada, forward: nada, refresh: nada, hmrRefresh: nada, push: nada, replace: nada, prefetch: nada } as unknown as NonNullable<React.ContextType<typeof AppRouterContext>>;

interface Paquete {
  registro: Registro;
  sitio: typeof import("../src/motor/sitio");
  seo: typeof import("../src/motor/seo");
  ctxMod: typeof import("../src/motor/ui/contexto");
  meta: typeof import("../src/motor/ui/metadatos");
  ui: {
    Sitio: typeof import("../src/motor/ui/Sitio");
    Inicio: typeof import("../src/motor/ui/Inicio");
    Calc: typeof import("../src/motor/ui/PaginaCalculadora");
    Fuentes: typeof import("../src/motor/ui/Fuentes");
    Legales: typeof import("../src/motor/ui/Legales");
  };
  shell: {
    Encabezado: typeof import("../src/components/shell/EncabezadoIntl");
    Pie: typeof import("../src/components/shell/PieIntl");
  };
}

async function cargar(): Promise<Paquete> {
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  return {
    registro: mod.registro ?? mod.default!.registro,
    sitio: await import("../src/motor/sitio"),
    seo: await import("../src/motor/seo"),
    ctxMod: await import("../src/motor/ui/contexto"),
    meta: await import("../src/motor/ui/metadatos"),
    ui: {
      Sitio: await import("../src/motor/ui/Sitio"),
      Inicio: await import("../src/motor/ui/Inicio"),
      Calc: await import("../src/motor/ui/PaginaCalculadora"),
      Fuentes: await import("../src/motor/ui/Fuentes"),
      Legales: await import("../src/motor/ui/Legales"),
    },
    shell: {
      Encabezado: await import("../src/components/shell/EncabezadoIntl"),
      Pie: await import("../src/components/shell/PieIntl"),
    },
  };
}

function cuerpo(p: Paquete, ctx: ContextoSitio, r: PaginaIntl | null): ReactElement {
  const { Inicio, Calc, Fuentes, Legales } = p.ui;
  if (!r) return ctx.mercado.codigo === "global" ? createElement(Inicio.InicioGlobal, { ctx }) : createElement(Inicio.InicioPais, { ctx });
  switch (r.tipo) {
    case "legal":
      return createElement(Legales.PaginaLegalVista, { ctx, slug: r.slug });
    case "fuentes":
      return createElement(Fuentes.PaginaFuentes, { ctx });
    case "novedades":
      return createElement(Fuentes.PaginaNovedades, { ctx });
    case "calculadora": {
      const Nada: ComponentType = () => null;
      return createElement(Calc.PaginaCalculadora, { ctx, pagina: r.pagina, Cliente: Nada });
    }
  }
}

const bloquesLd = (html: string) => [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);

async function sinServer() {
  const p = await cargar();
  const { registro, seo, ctxMod, meta } = p;
  let revisadas = 0;
  const silenciar = console.error;
  for (const modo of ["produccion", "interno"] as const) {
    process.env.VERCEL_ENV = modo === "produccion" ? "production" : "preview";
    const origen = seo.origenPublicoIntl();
    for (const m of registro.mercados(modo)) {
      const ctx = ctxMod.contextoSitio(registro, m.codigo);
      if (!ctx) {
        falla(`[${modo}] ${m.codigo}: contextoSitio devuelve null para un mercado visible`);
        continue;
      }
      const slugs =
        m.codigo === "global"
          ? ["privacidad", "terminos", "contacto", "sobre"]
          : [...registro.calculadorasPublicables(m.codigo, ctx.fecha, modo).map((c) => c.definicion.slug), "fuentes", "novedades", "privacidad", "terminos", "contacto", "sobre"];
      const pares: { url: string; title: string; description: string }[] = [];
      for (const slug of [null, ...slugs]) {
        const r = slug ? meta.resolverPagina(ctx, slug) : null;
        const url = seo.urlIntl(m.codigo, slug ?? undefined);
        const id = `[${modo}] ${url.replace(origen, "")}`;
        if (slug && !r) {
          falla(`${id}: publicable pero resolverPagina devuelve null`);
          continue;
        }
        revisadas++;
        const md = meta.metadatosDe(ctx, r);
        fallas.push(...revisarTexto(id, md.title.absolute, md.description));
        fallas.push(...revisarCanonical(id, md.alternates.canonical, url, origen));
        if (md.openGraph.url !== url) falla(`${id}: og:url ${md.openGraph.url} distinto del canonical`);
        if (md.openGraph.siteName !== "CalcularYa") falla(`${id}: og:site_name ${md.openGraph.siteName}`);
        if (md.openGraph.locale !== seo.ogLocale(m.locale)) falla(`${id}: og:locale ${md.openGraph.locale}`);
        const img = md.openGraph.images[0]?.url ?? "";
        if (!img.startsWith(`${origen}/`) || img.includes("/intl")) falla(`${id}: og:image ausente o fuera del dominio público (${img})`);
        const tam = md.openGraph.images[0];
        if (tam?.width !== 1200 || tam?.height !== 630) falla(`${id}: og:image sin :width y :height 1200 x 630`);
        if (md.twitter.card !== "summary_large_image") falla(`${id}: twitter:card no es summary_large_image`);
        pares.push({ url, title: md.title.absolute, description: md.description });

        // Lo que pinta la página dentro de <main>, más el header y el footer del layout.
        let html = "";
        console.error = () => {};
        try {
          // El header es el de calcular.ar (client, con useRouter y usePathname): fuera de Next
          // necesita los contextos del App Router, con la ruta pública que ve el navegador.
          const pagina = createElement("div", null, createElement(p.shell.Encabezado.EncabezadoIntl, { ctx }), createElement("main", null, cuerpo(p, ctx, r)), createElement(p.shell.Pie.PieIntl, { ctx }));
          html = renderToStaticMarkup(
            createElement(AppRouterContext.Provider, { value: ROUTER_QUIETO }, createElement(PathnameContext.Provider, { value: seo.rutaIntl(m.codigo, slug ?? undefined) }, pagina)),
          );
        } catch (err) {
          falla(`${id}: no renderiza (${(err as Error).message})`);
        } finally {
          console.error = silenciar;
        }
        if (!html) continue;
        fallas.push(...revisarTitulos(id, html));
        const ld = revisarLd(id, bloquesLd(html));
        fallas.push(...ld.errores);
        const app = ld.nodos.find((n) => n["@type"] === "WebApplication");
        if (r?.tipo === "calculadora" && !app) falla(`${id}: calculadora sin WebApplication`);
        // Una calculadora sin datos (una fórmula de ley, como el aguinaldo de Uruguay) no tiene fecha
        // que mostrar; una que usa datos sí, y es la que Google tiene que ver como fresca.
        if (r?.tipo === "calculadora" && r.pagina.usados.length && !app?.dateModified) falla(`${id}: usa datos y su WebApplication no lleva dateModified`);
        if (r?.tipo === "calculadora" && r.pagina.contenido.faq.length && !ld.nodos.some((n) => n["@type"] === "FAQPage")) falla(`${id}: tiene preguntas y no FAQPage`);
        if (!r && m.codigo !== "global" && !ld.nodos.some((n) => n["@type"] === "CollectionPage")) falla(`${id}: home de país sin CollectionPage`);
        // WebSite y Organization van en la home global, que es de donde Google toma el nombre del sitio.
        const enHome = !r && m.codigo === "global";
        for (const t of ["WebSite", "Organization"]) {
          const tiene = ld.nodos.some((n) => n["@type"] === t);
          if (enHome && !tiene) falla(`${id}: la home global no tiene ${t}`);
        }
        if (html.includes('href="/intl')) falla(`${id}: enlace interno a /intl`);
      }
      fallas.push(...repetidos(`[${modo}] ${m.codigo}`, pares));
    }
  }
  return revisadas;
}

function pedir(base: string, host: string, ruta: string): Promise<{ status: number; tipo: string; cuerpo: string; bytes: number }> {
  const u = new URL(ruta, base);
  return new Promise((resolver) => {
    const req = http.request({ hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: "GET", headers: { host, "user-agent": "check_seo_intl" } }, (res) => {
      const partes: Buffer[] = [];
      res.on("data", (c: Buffer) => partes.push(c));
      res.on("end", () => {
        const b = Buffer.concat(partes);
        resolver({ status: res.statusCode ?? 0, tipo: String(res.headers["content-type"] ?? ""), cuerpo: b.toString("utf8"), bytes: b.length });
      });
    });
    // Una imagen OG que revienta a mitad del stream corta el socket: cuenta como status 0, no tira el check.
    req.on("error", () => resolver({ status: 0, tipo: "", cuerpo: "", bytes: 0 }));
    req.end();
  });
}

const meta = (html: string, atributo: "name" | "property", clave: string) => {
  const m = html.match(new RegExp(`<meta ${atributo}="${clave.replace(/[:.]/g, "\\$&")}" content="([^"]*)"`));
  return m ? decodificar(m[1]) : undefined;
};

async function conServer(base: string) {
  const origen = process.env.NEXT_PUBLIC_SITIO_INTL_URL!.replace(/\/$/, "");
  const host = new URL(origen).host;
  const indice = await pedir(base, host, "/sitemap.xml");
  if (indice.status !== 200) {
    falla(`/sitemap.xml respondió ${indice.status}`);
    return 0;
  }
  const hijos = [...indice.cuerpo.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls: string[] = [];
  for (const h of hijos) {
    const r = await pedir(base, host, h.replace(origen, ""));
    if (r.status !== 200) falla(`${h} respondió ${r.status}`);
    urls.push(...[...r.cuerpo.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  const imagenes = new Map<string, number>();
  const pares: { url: string; title: string; description: string }[] = [];
  let maxBytes = 0;
  let masPesada = "";
  const pesos: number[] = [];
  for (const url of urls) {
    const ruta = url.replace(origen, "") || "/";
    const r = await pedir(base, host, ruta);
    if (r.status !== 200) {
      falla(`${ruta}: status ${r.status}`);
      continue;
    }
    const html = r.cuerpo;
    if (/^\/[a-z]{2}\/[a-z0-9-]+$/.test(ruta) && !/\/(fuentes|novedades)$/.test(ruta)) {
      if (r.bytes > maxBytes) [maxBytes, masPesada] = [r.bytes, ruta];
      pesos.push(r.bytes);
    }
    const title = decodificar(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = meta(html, "name", "description") ?? "";
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    fallas.push(...revisarTexto(ruta, title, description));
    fallas.push(...revisarCanonical(ruta, canonical, url, origen));
    if ((html.match(/<title>/g) ?? []).length !== 1) falla(`${ruta}: más de un <title>`);
    if (!/<html lang="[a-z]{2}(?:-[A-Z][a-z]{3})?-[A-Z0-9]{2,3}"/.test(html)) falla(`${ruta}: <html> sin lang de mercado`);
    for (const [attr, clave] of [
      ["property", "og:title"],
      ["property", "og:description"],
      ["property", "og:url"],
      ["property", "og:site_name"],
      ["property", "og:locale"],
      ["property", "og:image"],
      ["property", "og:image:width"],
      ["property", "og:image:height"],
      ["property", "og:type"],
      ["name", "twitter:card"],
    ] as const) {
      if (!meta(html, attr, clave)) falla(`${ruta}: falta ${clave}`);
    }
    const ogUrl = meta(html, "property", "og:url");
    if (ogUrl !== url && `${ogUrl}/` !== url) falla(`${ruta}: og:url distinto del canonical`);
    const robots = meta(html, "name", "robots") ?? "";
    if (!robots) falla(`${ruta}: sin meta robots`);
    const og = meta(html, "property", "og:image");
    if (og) imagenes.set(og, (imagenes.get(og) ?? 0) + 1);
    fallas.push(...revisarTitulos(ruta, html.slice(html.indexOf("<body"))));
    fallas.push(...revisarLd(ruta, bloquesLd(html)).errores);
    if (/href="\/intl/.test(html)) falla(`${ruta}: enlace interno a /intl`);
    pares.push({ url, title, description });
  }
  for (const m of new Set(urls.map((u) => u.replace(origen, "").split("/")[1] ?? ""))) {
    fallas.push(...repetidos(`/${m}`, pares.filter((p) => (p.url.replace(origen, "").split("/")[1] ?? "") === m)));
  }
  for (const img of imagenes.keys()) {
    const r = await pedir(base, host, img.replace(origen, ""));
    if (r.status !== 200 || !r.tipo.startsWith("image/png")) falla(`og:image ${img}: status ${r.status}, ${r.tipo}`);
  }
  const no = await pedir(base, host, "/zz-no-existe/tampoco");
  if (no.status !== 404) falla(`una URL que no existe respondió ${no.status}, no 404`);
  if (!/<meta name="robots" content="noindex/.test(no.cuerpo)) falla("el 404 no lleva noindex");
  const interno = await pedir(base, host, "/intl/global");
  if (interno.status !== 404) falla(`/intl/global respondió ${interno.status} en el host público`);
  pesos.sort((a, b) => a - b);
  const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;
  console.log(`HTML de calculadoras: mediana ${kb(pesos[Math.floor(pesos.length / 2)] ?? 0)}, máximo ${kb(maxBytes)} (${masPesada}); ${imagenes.size} imágenes OG pedidas`);
  // El presupuesto de 130 KB es de producto (Lighthouse móvil), no de SEO: se informa y se mide en
  // otro gate. Acá solo se avisa para que el número quede a la vista en cada corrida.
  if (maxBytes > 130 * 1024) console.log(`⚠ ${pesos.filter((p) => p > 130 * 1024).length} calculadoras pasan los 130 KB de HTML`);
  return urls.length;
}

async function main() {
  pruebasNegativas();
  const args = process.argv.slice(2);
  const i = args.indexOf("--base");
  const revisadas = i >= 0 ? await conServer(args[i + 1]) : await sinServer();
  for (const f of fallas) console.error(`❌ ${f}`);
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${revisadas} páginas intl revisadas${i >= 0 ? " contra el server" : " en los dos modos"}`);
  process.exit(fallas.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
