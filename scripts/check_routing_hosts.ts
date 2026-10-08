// Ruteo por dominio (ADR 0001, D2, tabla «Comportamiento por dominio», y el spike de Next 16):
// pide cada fila con el Host de calcular.ar y con el de calcularya y compara status, location y
// una marca del cuerpo. Prueba también lo que el spike dijo que se rompe primero: robots y sitemap
// reescritos (los rewrites encadenan), _next/static y un archivo de public/.
//
//   npx -y tsx scripts/check_routing_hosts.ts --start          next start sobre .next (puerto 3241)
//   npx -y tsx scripts/check_routing_hosts.ts --base <url>     server ya levantado
//
// El build tiene que haber salido con NEXT_PUBLIC_SITIO_INTL_URL definida (las reglas se hornean en
// el build) y la misma variable tiene que estar en el entorno de este script. También con
// VERCEL_ENV=preview: la fila de la cookie y el mercado elegido (zz) son de modo interno, y fuera
// de un preview o de next dev el build es de producción (entornoDePrueba en src/motor/sitio.ts).
// Sin --start ni --base corre solo el chequeo de carpetas de (ar) y sale: check-all corre sin server.
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import type { Registro } from "../src/motor/registro";

const RAIZ = path.resolve(import.meta.dirname, "..");
const PUERTO = 3241;
const args = process.argv.slice(2);
const iBase = args.indexOf("--base");
const baseArg = iBase >= 0 ? args[iBase + 1] : undefined;
const iniciar = args.includes("--start");

// next.config.ts arma la lista de rutas AR que redirigen desde calcularya con las carpetas de
// primer nivel de src/app/(ar) que empiezan con letra o número. Un grupo "(x)" o un dinámico "[x]"
// ahí quedaría fuera de esa lista y sus páginas se servirían con la marca AR en el dominio intl.
const raras = readdirSync(path.join(RAIZ, "src", "app", "(ar)"), { withFileTypes: true }).filter((d) => d.isDirectory() && /^[([]/.test(d.name));
if (raras.length) {
  console.error(`❌ src/app/(ar) tiene carpetas de primer nivel que el ruteo por host no ve: ${raras.map((d) => d.name).join(", ")}`);
  process.exit(1);
}

if (!baseArg && !iniciar) {
  console.log("check_routing_hosts: carpetas de (ar) OK; ruteo omitido (necesita --start sobre un build o --base <url>)");
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

function pedir(base: string, host: string, ruta: string, cookie?: string, post?: { origin: string; cuerpo: string }): Promise<Respuesta> {
  const u = new URL(ruta, base);
  return new Promise((resolver, rechazar) => {
    const extra = post ? { origin: post.origin, "content-type": "text/plain", "content-length": String(Buffer.byteLength(post.cuerpo)) } : {};
    const req = http.request(
      { hostname: u.hostname, port: u.port, path: u.pathname + u.search, method: post ? "POST" : "GET", headers: { host, "user-agent": "check_routing_hosts", ...(cookie ? { cookie } : {}), ...extra } },
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
    req.end(post?.cuerpo);
  });
}

interface Fila {
  nombre: string;
  host: string;
  ruta: string;
  cookie?: string;
  post?: { origin: string; cuerpo: string };
  status: number;
  location?: string;
  // El proxy arma la URL absoluta con el host del pedido: alcanza con que termine así y no salga del host.
  locationFin?: string;
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
  const publicado = registro.mercados("produccion").find((x) => x.codigo !== "global");
  if (!publicado) {
    console.error("check_routing_hosts: no hay ningún mercado publicado");
    process.exit(2);
  }
  const cuentasActivas = process.env.NEXT_PUBLIC_CUENTAS_ACTIVAS === "1";
  const NEXT_VACIO = '<input type="hidden" name="next" value=""/>';
  const SIN_EVIL = ['value="//evil', 'value="https://evil', 'href="//evil', "next=%2F%2Fevil.com&quot;", 'href="/registro?next=', 'href="/login?next='];
  const intl = ORIGEN_INTL!.replace(/\/$/, "");
  const MARCA_AR = 'lang="es-AR"';
  // Lote válido con ids que no existen: con las cuentas apagadas o sin base, /api/e igual responde 204.
  const MEDICION = JSON.stringify({
    vid: "00000000-0000-4000-8000-00000000c4ec",
    sid: "00000000-0000-4000-8000-00000000c4ed",
    i: [{ t: "x", id: "00000000-0000-4000-8000-00000000c4ee", a: 0, n: 0, s: 0, u: false }],
  });

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
    { nombre: "intl: api de AR", host: HOST_INTL, ruta: "/api/subscribe", status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: api de AR anidada", host: HOST_INTL, ruta: "/api/planilla-comercio/download", status: 404, noContiene: [MARCA_AR] },
    // src/proxy.ts corre antes que los rewrites: en el host intl deja pasar /api/* para que caiga en
    // el 404 intl y no en el de AR (que es lo que sigue dando en calcular.ar con las cuentas apagadas).
    cuentasActivas
      ? { nombre: "intl: api de cuenta sin sesión", host: HOST_INTL, ruta: "/api/cuenta/calculos", status: 401, contiene: ['"codigo":"sesion"', "Ingresa a tu cuenta"] }
      : { nombre: "intl: api de cuenta", host: HOST_INTL, ruta: "/api/cuenta/calculos", status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: api de cuenta sin ruta", host: HOST_INTL, ruta: "/api/cuenta", status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: api de checkout", host: HOST_INTL, ruta: "/api/mp/checkout", status: 404, noContiene: [MARCA_AR] },
    // La medición sí existe en calcularya: el GET llega a la ruta (405, sólo acepta POST) y el POST
    // con Origin de calcularya responde el 204 de siempre. Un prefijo parecido sigue en el 404.
    { nombre: "intl: medición (GET)", host: HOST_INTL, ruta: "/api/e", status: 405, noContiene: [MARCA_AR] },
    { nombre: "intl: medición (POST)", host: HOST_INTL, ruta: "/api/e", post: { origin: intl, cuerpo: MEDICION }, status: 204 },
    { nombre: "intl: webhook de PayPal (GET de diagnóstico)", host: HOST_INTL, ruta: "/api/pagos/paypal/webhook", status: 200, noContiene: [MARCA_AR] },
    { nombre: "intl: api parecida a la medición", host: HOST_INTL, ruta: "/api/eventos", status: 404, noContiene: [MARCA_AR] },
    { nombre: "AR: medición (POST)", host: HOST_AR, ruta: "/api/e", post: { origin: "https://calcular.ar", cuerpo: MEDICION }, status: 204 },
    { nombre: "preview: api de cuenta con cookie", host: "calcular-ar-git-x.vercel.app", ruta: "/api/cuenta", cookie: "sitio=intl", status: 404, noContiene: [MARCA_AR] },
    ...(cuentasActivas
      ? [
          // Cuentas en calcularya: mismas rutas públicas, pantallas propias, sin pasar por calcular.ar.
          { nombre: "intl: login", host: HOST_INTL, ruta: "/login", status: 200, contiene: ["Ingresa a tu cuenta", "CalcularYa", 'name="robots" content="noindex'], noContiene: [MARCA_AR, "Entrá"] },
          { nombre: "intl: registro", host: HOST_INTL, ruta: "/registro", status: 200, contiene: ["Crea tu cuenta"], noContiene: [MARCA_AR] },
          { nombre: "intl: recuperar", host: HOST_INTL, ruta: "/recuperar", status: 200, contiene: ["¿Olvidaste tu contraseña?"], noContiene: [MARCA_AR] },
          { nombre: "intl: confirmar sin token", host: HOST_INTL, ruta: "/auth/confirmar", status: 200, contiene: ["Este enlace no está completo"], noContiene: [MARCA_AR] },
          { nombre: "intl: cuenta sin sesión", host: HOST_INTL, ruta: "/cuenta", status: 307, locationFin: "/login?next=%2Fcuenta" },
          { nombre: "intl: clave sin sesión", host: HOST_INTL, ruta: "/cuenta/clave", status: 307, locationFin: "/login?next=%2Fcuenta%2Fclave" },
          { nombre: "intl: opiniones sin sesión", host: HOST_INTL, ruta: "/cuenta/opiniones", status: 307, locationFin: "/login?next=%2Fcuenta%2Fopiniones" },
          { nombre: "intl: cuenta con cookie inventada", host: HOST_INTL, ruta: "/cuenta", cookie: "sb-x-auth-token=basura", status: 307, locationFin: "/login?next=%2Fcuenta" },
          { nombre: "intl: panel sigue en AR", host: HOST_INTL, ruta: "/dashboard", status: 308, location: `${ORIGEN_AR}/dashboard` },
          // El payload RSC de Next repite la URL pedida como dato: lo que importa es que el next saneado
          // quede vacío en el formulario y en los enlaces, que son los que terminan en un redirect.
          { nombre: "intl: login no repite next ajeno", host: HOST_INTL, ruta: "/login?next=//evil.com", status: 200, contiene: [NEXT_VACIO, 'href="/registro"'], noContiene: SIN_EVIL },
          { nombre: "intl: login no repite next con esquema", host: HOST_INTL, ruta: "/login?next=https%3A%2F%2Fevil.com", status: 200, contiene: [NEXT_VACIO], noContiene: SIN_EVIL },
          { nombre: "intl: registro no repite next ajeno", host: HOST_INTL, ruta: "/registro?next=/%2e%2e//evil.com", status: 200, contiene: [NEXT_VACIO, 'href="/login"'], noContiene: SIN_EVIL },
          { nombre: "intl: salir desde otro origen", host: HOST_INTL, ruta: "/auth/salir", post: { origin: "https://evil.com", cuerpo: "" }, status: 403 },
          { nombre: "intl: login de un país no existe", host: HOST_INTL, ruta: `/${m}/login`, status: 404, noContiene: [MARCA_AR] },
          { nombre: "intl: path interno de la cuenta", host: HOST_INTL, ruta: "/intl/global/login", status: 404, noContiene: [MARCA_AR] },
          { nombre: "preview: login con cookie", host: "calcular-ar-git-x.vercel.app", ruta: "/login", cookie: "sitio=intl", status: 200, contiene: ["Ingresa a tu cuenta"], noContiene: [MARCA_AR] },
          { nombre: "AR: login sigue igual", host: HOST_AR, ruta: "/login", status: 200, contiene: [MARCA_AR, "Entrá a tu cuenta"] },
          { nombre: "AR: cuenta sin sesión", host: HOST_AR, ruta: "/cuenta", status: 307, locationFin: "/login?next=%2Fcuenta" },
        ]
      : [
          { nombre: "AR: api de cuenta", host: HOST_AR, ruta: "/api/cuenta", status: 404, contiene: [MARCA_AR] },
          { nombre: "AR: api de cuenta anidada", host: HOST_AR, ruta: "/api/cuenta/calculos", status: 404, contiene: [MARCA_AR] },
        ]),
    // El aviso de país solo ofrece mercados publicados: zz (estado interno) nunca sale de /api/geo.
    { nombre: "intl: geo de mercado publicado", host: HOST_INTL, ruta: "/api/geo", cookie: `geo_prueba=${publicado.pais}`, status: 200, contiene: [`"pais":"${publicado.pais}"`] },
    { nombre: "intl: geo de zz", host: HOST_INTL, ruta: "/api/geo", cookie: "geo_prueba=ZZ", status: 200, contiene: ['"pais":null'] },
    { nombre: "intl: og de global", host: HOST_INTL, ruta: "/og", status: 200 },
    { nombre: "intl: og de AR con path", host: HOST_INTL, ruta: "/og/x", status: 404, noContiene: [MARCA_AR] },
    { nombre: "intl: llms.txt propio", host: HOST_INTL, ruta: "/llms.txt", status: 200, contiene: ["# CalcularYa", `${intl}/${m}`], noContiene: ["calcular.ar", "\u2014"] },
    { nombre: "intl: dev/sitio en preview", host: HOST_INTL, ruta: "/api/dev/sitio", status: 200, contiene: ['method="post"'] },
    { nombre: "AR: llms.txt", host: HOST_AR, ruta: "/llms.txt", status: 200, contiene: ["# CalculAR"] },
    { nombre: "AR: api sigue", host: HOST_AR, ruta: "/api/geo", status: 200, contiene: ['"pais"'] },
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
      const r = await pedir(base, f.host, f.ruta, f.cookie, f.post);
      const problemas: string[] = [];
      if (r.status !== f.status) problemas.push(`status ${r.status}, se esperaba ${f.status}`);
      if (f.location !== undefined && r.location !== f.location) problemas.push(`location ${r.location}, se esperaba ${f.location}`);
      if (f.locationFin !== undefined) {
        const destino = r.location ? new URL(r.location, `http://${f.host}`) : null;
        if (!destino || `${destino.pathname}${destino.search}` !== f.locationFin || (destino.host !== f.host && !destino.host.startsWith("127.0.0.1"))) {
          problemas.push(`location ${r.location}, se esperaba …${f.locationFin} en ${f.host}`);
        }
      }
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
