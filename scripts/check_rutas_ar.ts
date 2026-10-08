// Foto de rutas de calcular.ar (ADR 0001, fase 0.1): por cada URL del sitemap más una lista fija
// guarda status, head, headers de seguridad y caché, y un hash del texto de <main> y del resto del
// <body>. Sirve para probar que un cambio estructural (mover AR a src/app/(ar), sumar el árbol
// intl) no cambió nada observable.
//
//   npx -y tsx scripts/check_rutas_ar.ts --start            compara contra la foto (next start sobre .next)
//   npx -y tsx scripts/check_rutas_ar.ts --base <url>       compara contra un server ya levantado
//   npx -y tsx scripts/check_rutas_ar.ts --start --grabar   graba la foto
//
// Sin --base ni --start no hace nada y sale 0: check-all.ts corre todo scripts/check_*.ts y no hay
// build ni server en esa pasada.
//
// Los dos builds que se comparan tienen que salir con el mismo CALCULAR_HOY (next.config.ts congela
// el "hoy" del build): la foto no normaliza fechas, porque datos-vivos cambia contenido real todos
// los días y una foto de otro día ya no es una línea base.

import { createHash } from "node:crypto";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..");
const FOTO = path.join(RAIZ, "scripts", "snapshots", "rutas-ar.json");
const PUERTO = 3240;
const ORIGEN_PUBLICO = "https://calcular.ar";
const CONCURRENCIA = 6;

const FIJAS = [
  "/",
  "/robots.txt",
  "/sitemap.xml",
  "/og",
  "/icon.svg",
  "/apple-icon",
  "/llms.txt",
  "/ads.txt",
  "/cuenta",
  "/cuenta/compras",
  "/dashboard",
  "/login",
  "/registro",
  "/recuperar",
  "/auth/confirmar",
  "/informes/indemnizacion/ver",
  "/radar",
  "/esta-pagina-no-existe",
  "/aguinaldo/esta-tampoco",
  "/convenios/comercio/no-existe",
  "/inflacion/1900",
  "/planillas/comprar",
  "/planillas/comprar?producto=no-existe",
  "/intl/uy/aguinaldo",
  "/uy/aguinaldo",
];

const HEADERS = ["content-type", "content-security-policy", "x-robots-tag", "cache-control", "referrer-policy", "location"];

type Foto = {
  status: number;
  headers: Record<string, string>;
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  raiz?: string[];
  head?: string;
  alternates?: string[];
  jsonld?: string;
  main?: string;
  chrome?: string;
  cuerpo?: string;
};

const args = process.argv.slice(2);
const grabar = args.includes("--grabar");
const iniciar = args.includes("--start");
const iBase = args.indexOf("--base");
const baseArg = iBase >= 0 ? args[iBase + 1] : undefined;

if (!baseArg && !iniciar) {
  console.log("check_rutas_ar: omitido (necesita --start sobre un build o --base <url>)");
  process.exit(0);
}

const sha = (s: string | Buffer) => createHash("sha256").update(s).digest("hex").slice(0, 16);

function decodificar(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, "&");
}

function texto(html: string): string {
  return decodificar(
    html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<(script|style|template|noscript)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function atributos(tag: string): Record<string, string> {
  const r: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) r[m[1].toLowerCase()] = decodificar(m[3] ?? m[4] ?? "");
  return r;
}

function etiquetas(html: string, nombre: string): Record<string, string>[] {
  return [...html.matchAll(new RegExp(`<${nombre}\\b[^>]*>`, "gi"))].map((m) => atributos(m[0]));
}

function bloque(html: string, nombre: string): { inicio: number; fin: number; interior: string } | undefined {
  const abre = new RegExp(`<${nombre}\\b[^>]*>`, "i").exec(html);
  if (!abre) return undefined;
  const cierre = html.lastIndexOf(`</${nombre}>`);
  if (cierre < abre.index) return undefined;
  return { inicio: abre.index, fin: cierre + nombre.length + 3, interior: html.slice(abre.index + abre[0].length, cierre) };
}

function analizarHtml(html: string, f: Foto) {
  const head = bloque(html, "head")?.interior ?? "";
  const t = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(head);
  if (t) f.title = decodificar(t[1]).trim();
  const metas = etiquetas(head, "meta");
  f.description = metas.find((m) => m.name === "description")?.content;
  const robots = metas.filter((m) => m.name === "robots").map((m) => m.content);
  if (robots.length) f.robots = robots.join(" | ");
  const links = etiquetas(head, "link");
  f.canonical = links.find((l) => l.rel === "canonical")?.href;
  const alt = links
    .filter((l) => l.rel === "alternate")
    .map((l) => [l.hreflang && `hreflang=${l.hreflang}`, l.type && `type=${l.type}`, `href=${l.href}`].filter(Boolean).join(" "))
    .sort();
  if (alt.length) f.alternates = alt;
  // Todas las <html> y <body>, no solo la primera: un 404 armado sin layout raíz sale con un
  // <html> anidado y el navegador lo aplana sin avisar.
  f.raiz = [...html.matchAll(/<(html|body)\b[^>]*>/gi)].map((m) => m[0]);
  f.head = sha(
    [...head.matchAll(/<(meta|link|title)\b[^>]*>/gi)]
      .map((m) => m[0].replace(/\/_next\/static\/[^"?]*?(\.[a-z0-9]+)"/gi, '/_next/static/*$1"'))
      .sort()
      .join("\n"),
  );
  const ld = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1].trim());
  if (ld.length) f.jsonld = sha(ld.join("\n"));
  const body = bloque(html, "body");
  const main = body ? bloque(body.interior, "main") : undefined;
  if (main) f.main = sha(texto(main.interior));
  if (body) {
    const resto = main ? body.interior.slice(0, main.inicio) + body.interior.slice(main.fin) : body.interior;
    f.chrome = sha(texto(resto));
  }
}

async function fotografiar(base: string, ruta: string): Promise<Foto> {
  let ultimo: unknown;
  for (let intento = 0; intento < 3; intento++) {
    try {
      const r = await fetch(base + ruta, { redirect: "manual", headers: { "user-agent": "check_rutas_ar" } });
      const f: Foto = { status: r.status, headers: {} };
      for (const h of HEADERS) {
        const v = r.headers.get(h);
        if (v !== null) f.headers[h] = h === "location" ? v.replace(base, "") : v;
      }
      const buf = Buffer.from(await r.arrayBuffer());
      if ((r.headers.get("content-type") ?? "").includes("text/html")) analizarHtml(buf.toString("utf8"), f);
      else f.cuerpo = sha(buf.toString("utf8").replaceAll(base, ORIGEN_PUBLICO));
      return f;
    } catch (e) {
      ultimo = e;
    }
  }
  throw new Error(`${ruta}: ${String(ultimo)}`);
}

async function rutasDelSitemap(base: string): Promise<string[]> {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decodificar(m[1]).trim());
  if (locs.length === 0) throw new Error("el sitemap no trajo ninguna <loc>");
  return locs.map((u) => {
    if (!u.startsWith(ORIGEN_PUBLICO)) throw new Error(`URL del sitemap fuera de ${ORIGEN_PUBLICO}: ${u}`);
    return u.slice(ORIGEN_PUBLICO.length) || "/";
  });
}

// Las prerenderizadas que no están en el sitemap (meses de archivo, feeds, /_not-found) también
// cuentan. /intl queda afuera: es el árbol de los otros países y su gate es otro.
function rutasDelBuild(): string[] {
  const manifiesto = path.join(RAIZ, ".next", "prerender-manifest.json");
  if (baseArg || !existsSync(manifiesto)) return [];
  const rutas = Object.keys(JSON.parse(readFileSync(manifiesto, "utf8")).routes as Record<string, unknown>);
  return rutas.filter((r) => r !== "/intl" && !r.startsWith("/intl/"));
}

async function levantar(): Promise<{ base: string; proceso: ChildProcess }> {
  if (!existsSync(path.join(RAIZ, ".next", "BUILD_ID"))) {
    console.error("check_rutas_ar: no hay build en .next (correr antes `npm run build`)");
    process.exit(2);
  }
  const proceso = spawn(`npx next start -p ${PUERTO}`, { cwd: RAIZ, shell: true, stdio: "ignore" });
  const base = `http://localhost:${PUERTO}`;
  for (let i = 0; i < 120; i++) {
    try {
      await fetch(base + "/robots.txt");
      return { base, proceso };
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  throw new Error(`next start no respondió en el puerto ${PUERTO}`);
}

function bajar(proceso: ChildProcess) {
  if (!proceso.pid) return;
  if (process.platform === "win32") spawnSync(`taskkill /pid ${proceso.pid} /T /F`, { shell: true, stdio: "ignore" });
  else proceso.kill("SIGTERM");
}

function comparar(antes: Record<string, Foto>, ahora: Record<string, Foto>): string[] {
  const difs: string[] = [];
  for (const ruta of new Set([...Object.keys(antes), ...Object.keys(ahora)])) {
    const a = antes[ruta];
    const b = ahora[ruta];
    if (!a) {
      difs.push(`+ ${ruta}: ruta nueva (status ${b.status})`);
      continue;
    }
    if (!b) {
      difs.push(`- ${ruta}: ruta que ya no está (antes status ${a.status})`);
      continue;
    }
    const campos = new Set([...Object.keys(a), ...Object.keys(b)]) as Set<keyof Foto>;
    for (const c of campos) {
      if (c === "headers") {
        for (const h of new Set([...Object.keys(a.headers), ...Object.keys(b.headers)])) {
          if (a.headers[h] !== b.headers[h]) difs.push(`~ ${ruta} header ${h}: ${JSON.stringify(a.headers[h])} -> ${JSON.stringify(b.headers[h])}`);
        }
      } else if (JSON.stringify(a[c]) !== JSON.stringify(b[c])) {
        difs.push(`~ ${ruta} ${c}: ${JSON.stringify(a[c])} -> ${JSON.stringify(b[c])}`);
      }
    }
  }
  return difs;
}

async function main() {
  const servidor = baseArg ? undefined : await levantar();
  const base = (baseArg ?? servidor!.base).replace(/\/$/, "");
  try {
    const fotoPrevia: Record<string, Foto> = existsSync(FOTO) ? JSON.parse(readFileSync(FOTO, "utf8")) : {};
    const previas = grabar ? [] : Object.keys(fotoPrevia);
    const rutas = [...new Set([...(await rutasDelSitemap(base)), ...FIJAS, ...rutasDelBuild(), ...previas])].sort();
    const fotos: Record<string, Foto> = {};
    let i = 0;
    await Promise.all(
      Array.from({ length: CONCURRENCIA }, async () => {
        while (i < rutas.length) {
          const ruta = rutas[i++];
          fotos[ruta] = await fotografiar(base, ruta);
        }
      }),
    );
    const ordenadas = Object.fromEntries(Object.keys(fotos).sort().map((k) => [k, fotos[k]]));

    if (grabar) {
      mkdirSync(path.dirname(FOTO), { recursive: true });
      writeFileSync(FOTO, JSON.stringify(ordenadas, null, 2) + "\n");
      console.log(`check_rutas_ar: foto grabada, ${rutas.length} rutas en ${path.relative(RAIZ, FOTO)}`);
      return 0;
    }
    if (!existsSync(FOTO)) {
      console.error("check_rutas_ar: no hay foto grabada (correr con --grabar)");
      return 1;
    }
    const difs = comparar(fotoPrevia, ordenadas);
    if (difs.length) {
      console.error(difs.join("\n"));
      console.error(`check_rutas_ar: ${difs.length} diferencias en ${rutas.length} rutas`);
      return 1;
    }
    console.log(`check_rutas_ar: idéntico, ${rutas.length} rutas`);
    return 0;
  } finally {
    if (servidor) bajar(servidor.proceso);
  }
}

main().then(
  (code) => process.exit(code),
  (e) => {
    console.error(e);
    process.exit(1);
  },
);
