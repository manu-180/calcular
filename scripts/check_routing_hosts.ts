// Ruteo por dominio (ADR 0001, D2, tabla «Comportamiento por dominio», y el spike de Next 16):
// pide cada fila con el Host de calcular.ar y con el de calcularya y compara status, location y
// una marca del cuerpo. Prueba también lo que el spike dijo que se rompe primero: robots y sitemap
// reescritos (los rewrites encadenan), _next/static y un archivo de public/.
//
//   npx -y tsx scripts/check_routing_hosts.ts --start          next start sobre .next (puerto 3241)
//   npx -y tsx scripts/check_routing_hosts.ts --base <url>     server ya levantado
//
// El build tiene que haber salido con NEXT_PUBLIC_SITIO_INTL_URL definida (las reglas se hornean en
// el build) y la misma variable tiene que estar en el entorno de este script. Sin --start ni
// --base sale 0 con "omitido": check-all corre sin server.
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import type { Registro } from "../src/motor/registro";

const RAIZ = path.resolve(import.meta.dirname, "..");
const PUERTO = 3241;
const args = process.argv.slice(2);
const iBase = args.indexOf("--base");
const baseArg = iBase >= 0 ? args[iBase + 1] : undefined;
const iniciar = args.includes("--start");

if (!baseArg && !iniciar) {
  console.log("check_routing_hosts: omitido (necesita --start sobre un build o --base <url>)");
  process.exit(0);
}

const ORIGEN_INTL = process.env.NEXT_PUBLIC_SITIO_INTL_URL;
if (!ORIGEN_INTL) {
  console.error("check_routing_hosts: definí NEXT_PUBLIC_SITIO_INTL_URL (la misma con la que se hizo el build)");
  process.exit(2);
}
const ORIGEN_AR = (process.env.NEXT_PUBLIC_SITIO_AR_URL || "https://calcular.ar").replace(/\/$/, "");
const HOST_INTL = new URL(ORIGEN_INTL).host;
const HOST_AR = "calcular.ar";

interface Respuesta {
  status: number;
  location: string | null;
  tipo: string;
  cache: string | null;
  cuerpo: string;
}

function pedir(base: string, host: string, ruta: string, cookie?: string): Promise<Respuesta> {
  const u = new URL(ruta, base);
  return new Promise((resolver, rechazar) => {
    const req = http.request(
      { hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: "GET", headers: { host, "user-agent": "check_routing_hosts", ...(cookie ? { cookie } : {}) } },
      (res) => {
        const partes: Buffer[] = [];
        res.on("data", (c: Buffer) => partes.push(c));
        res.on("end", () =>
          resolver({
            status: res.statusCode ?? 0,
            location: (res.headers.location as string | undefined) ?? null,
            tipo: String(res.headers["content-type"] ?? ""),
            cache: (res.headers["cache-control"] as string | undefined) ?? null,
            cuerpo: Buffer.concat(partes).toString("utf8"),
          }),
        );
      },
    );
    req.on("error", rechazar);
    req.end();
  });
}

interface Fila {
  nombre: string;
  host: string;
  ruta: string;
  cookie?: string;
  status: number;
  location?: string;
  contiene?: readonly string[];
  noContiene?: readonly string[];
  cache?: string;
}

async function levantar(): Promise<{ base: string; proceso: ChildProcess }> {
  if (!existsSync(path.join(RAIZ, ".next", "BUILD_ID"))) {
    console.error("check_routing_hosts: no hay build en .next");
    process.exit(2);
  }
  const proceso = spawn(`npx next start -p ${PUERTO}`, { cwd: RAIZ, shell: true, stdio: "ignore", env: process.env });
  const base = `http://127.0.0.1:${PUERTO}`;
  for (let i = 0; i < 120; i++) {
    try {
      await pedir(base, HOST_AR, "/robots.txt");
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

async function main() {
  process.env.VERCEL_ENV ||= "preview";
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;
  const { modoPublicacion } = await import("../src/motor/sitio");
  const { hoyEn } = await import("../src/motor/vigencia");
  const modo = modoPublicacion();
  const mercado = registro.mercados(modo).find((m) => m.codigo !== "global");
  if (!mercado) {
    console.error(`check_routing_hosts: no hay ningún mercado visible en modo ${modo}`);
    process.exit(2);
  }
  const m = mercado.codigo;
  const slug = registro.calculadorasPublicables(m, hoyEn(mercado), modo)[0]?.definicion.slug;
  if (!slug) {
    console.error(`check_routing_hosts: ${m} no tiene calculadoras publicables`);
    process.exit(2);
  }
  const intl = ORIGEN_INTL!.replace(/\/$/, "");
  const MARCA_AR = 'lang="es-AR"';

  const filas: Fila[] = [
    { nombre: "AR: página AR", host: HOST_AR, ruta: "/aguinaldo", status: 200, contiene: [MARCA_AR] },
    { nombre: "AR: mercado publicado", host: HOST_AR, ruta: `/${m}/${slug}`, status: 308, location: `${intl}/${m}/${slug}` },
    { nombre: "AR: mercado no publicado", host: HOST_AR, ruta: "/xx/foo", status: 404, contiene: [MARCA_AR] },
    { nombre: "AR: path interno", host: HOST_AR, ruta: `/intl/${m}/${slug}`, status: 404, contiene: [MARCA_AR] },
    { nombre: "AR: home", host: HOST_AR, ruta: "/", status: 200, contiene: [MARCA_AR] },
    { nombre: "AR: privacidad", host: HOST_AR, ruta: "/privacidad", status: 200, contiene: [MARCA_AR] },
    { nombre: "AR: robots", host: HOST_AR, ruta: "/robots.txt", status: 200, contiene: ["https://calcular.ar/sitemap.xml"] },
    { nombre: "AR: sitemap", host: HOST_AR, ruta: "/sitemap.xml", status: 200, contiene: ["<loc>https://calcular.ar/"], noContiene: [intl] },
    { nombre: "intl: página AR", host: HOST_INTL, ruta: "/aguinaldo", status: 308, location: `${ORIGEN_AR}/aguinaldo` },
    { nombre: "intl: subpágina AR", host: HOST_INTL, ruta: "/aguinaldo/fechas", status: 308, location: `${ORIGEN_AR}/aguinaldo/fechas` },
    { nombre: "intl: calculadora", host: HOST_INTL, ruta: `/${m}/${slug}`, status: 200, contiene: [`lang="${mercado.locale}"`, `rel="canonical" href="${intl}/${m}/${slug}"`, "cy-calc"], noContiene: ["/intl/"] },
    { nombre: "intl: home del mercado", host: HOST_INTL, ruta: `/${m}`, status: 200, contiene: [`lang="${mercado.locale}"`] },
    { nombre: "intl: fuentes", host: HOST_INTL, ruta: `/${m}/fuentes`, status: 200, contiene: ["cy-ficha"] },
    { nombre: "intl: novedades", host: HOST_INTL, ruta: `/${m}/novedades`, status: 200 },
    { nombre: "intl: mercado no publicado", host: HOST_INTL, ruta: "/xx/foo", status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: slug inexistente", host: HOST_INTL, ruta: `/${m}/no-existe`, status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: más profundo que una página", host: HOST_INTL, ruta: `/${m}/${slug}/extra`, status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: path interno", host: HOST_INTL, ruta: `/intl/${m}/${slug}`, status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: home (selector)", host: HOST_INTL, ruta: "/", status: 200, contiene: ['lang="es-419"', "cy-paises-grilla", `href="/${m}"`] },
    { nombre: "intl: privacidad", host: HOST_INTL, ruta: "/privacidad", status: 200, contiene: ["CalcularYa"], noContiene: [MARCA_AR] },
    { nombre: "intl: términos", host: HOST_INTL, ruta: "/terminos", status: 200, noContiene: [MARCA_AR] },
    { nombre: "intl: contacto", host: HOST_INTL, ruta: "/contacto", status: 200, contiene: ["mailto:"] },
    { nombre: "intl: sobre", host: HOST_INTL, ruta: "/sobre", status: 200 },
    { nombre: "intl: robots", host: HOST_INTL, ruta: "/robots.txt", status: 200, contiene: [`Sitemap: ${intl}/sitemap.xml`] },
    { nombre: "intl: índice de sitemaps", host: HOST_INTL, ruta: "/sitemap.xml", status: 200, contiene: ["<sitemapindex", `${intl}/${m}/sitemap.xml`, `${intl}/sitemap-global.xml`], noContiene: ["calcular.ar"] },
    { nombre: "intl: sitemap del mercado", host: HOST_INTL, ruta: `/${m}/sitemap.xml`, status: 200, contiene: [`<loc>${intl}/${m}/${slug}</loc>`], noContiene: ["/intl/"] },
    { nombre: "intl: sitemap de global", host: HOST_INTL, ruta: "/sitemap-global.xml", status: 200, contiene: [`<loc>${intl}/privacidad</loc>`] },
    { nombre: "intl: archivo de public", host: HOST_INTL, ruta: "/ads.txt", status: 200 },
    { nombre: "intl: api compartida", host: HOST_INTL, ruta: "/api/geo", status: 200, contiene: ['"pais"'], cache: "private, no-store" },
    { nombre: "preview: cookie sitio=intl", host: "calcular-ar-git-x.vercel.app", ruta: `/${m}/${slug}`, cookie: "sitio=intl", status: 200, contiene: ["cy-calc"] },
  ];

  const servidor = baseArg ? undefined : await levantar();
  const base = (baseArg ?? servidor!.base).replace(/\/$/, "");
  const fallas: string[] = [];
  try {
    const calc = await pedir(base, HOST_INTL, `/${m}/${slug}`);
    const estatico = /<script[^>]+src="(\/_next\/static\/[^"]+\.js)"/.exec(calc.cuerpo)?.[1];
    if (estatico) filas.push({ nombre: "intl: _next/static", host: HOST_INTL, ruta: estatico, status: 200 });
    else fallas.push("intl: la calculadora no trae ningún <script src=/_next/static/...>");

    for (const f of filas) {
      const r = await pedir(base, f.host, f.ruta, f.cookie);
      const problemas: string[] = [];
      if (r.status !== f.status) problemas.push(`status ${r.status}, se esperaba ${f.status}`);
      if (f.location !== undefined && r.location !== f.location) problemas.push(`location ${r.location}, se esperaba ${f.location}`);
      for (const c of f.contiene ?? []) if (!r.cuerpo.includes(c)) problemas.push(`no contiene ${JSON.stringify(c)}`);
      for (const c of f.noContiene ?? []) if (r.cuerpo.includes(c)) problemas.push(`contiene ${JSON.stringify(c)}`);
      if (f.cache && r.cache !== f.cache) problemas.push(`cache-control ${r.cache}, se esperaba ${f.cache}`);
      const linea = `${f.nombre.padEnd(36)} ${f.host.padEnd(28)} ${f.ruta.padEnd(28)} ${r.status}${r.location ? ` -> ${r.location}` : ""}`;
      if (problemas.length) {
        console.error(`❌ ${linea}\n   ${problemas.join("\n   ")}`);
        fallas.push(f.nombre);
      } else console.log(`✅ ${linea}`);
    }
  } finally {
    if (servidor) bajar(servidor.proceso);
  }
  console.log(fallas.length ? `${fallas.length} FALLAS` : `TODO OK: ${filas.length} filas`);
  return fallas.length ? 1 : 0;
}

main().then(
  (c) => process.exit(c),
  (e) => {
    console.error(e);
    process.exit(1);
  },
);
