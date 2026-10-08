// Cuentas en los dos sitios (calcular.ar y calcularya): el origen de los enlaces sale de una lista
// cerrada según el Host, el destino después de entrar es siempre un path propio (redirect abierto
// cero), las reglas de hosts.ts mandan /login y /cuenta de calcularya a sus pantallas propias sólo
// con las cuentas prendidas, y los textos de CalcularYa no tienen voseo, rayas ni emojis.
//
//   npx tsx scripts/check_cuentas_sitio.ts
import { destinoSeguro, inicioTrasEntrar } from "../src/lib/auth/destino";
import { esHostIntl, mercadoDeDesde, origenDeSitio, sitioDeHost } from "../src/lib/auth/sitio";
import { textosDe } from "../src/lib/cuenta/textos";
import { reglasPorHost, RUTAS_CUENTA } from "../src/motor/hosts";

let fallas = 0;
let total = 0;
function igual(nombre: string, obtenido: unknown, esperado: unknown) {
  total++;
  if (JSON.stringify(obtenido) !== JSON.stringify(esperado)) {
    fallas++;
    console.error(`❌ ${nombre}: ${JSON.stringify(obtenido)}, se esperaba ${JSON.stringify(esperado)}`);
  }
}

const env = process.env as Record<string, string | undefined>;
function conEntorno<T>(vars: Record<string, string | undefined>, fn: () => T): T {
  const antes = Object.fromEntries(Object.keys(vars).map((k) => [k, env[k]]));
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete env[k];
    else env[k] = v;
  }
  try {
    return fn();
  } finally {
    for (const [k, v] of Object.entries(antes)) {
      if (v === undefined) delete env[k];
      else env[k] = v;
    }
  }
}

// ─── destinoSeguro: nunca sale un dominio ────────────────────────────────────
const ATAQUES = [
  "//evil.com",
  "/\\evil.com",
  "https://evil.com",
  "http:/evil.com",
  "/..//evil.com",
  "/%2e%2e//evil.com",
  "/%2F%2Fevil.com",
  "/%5Cevil.com",
  "/\t/evil.com",
  "javascript:alert(1)",
  " /cuenta",
  "/login?next=//evil.com",
  "/auth/google",
  "",
  "a".repeat(301),
];
for (const sitio of ["ar", "intl"] as const) {
  for (const a of ATAQUES) igual(`destinoSeguro(${sitio}) ${JSON.stringify(a.slice(0, 30))}`, destinoSeguro(a, "/cuenta", sitio), "/cuenta");
  igual(`destinoSeguro(${sitio}) path propio`, destinoSeguro("/cuenta/opiniones?desde=/x#y", "/cuenta", sitio), "/cuenta/opiniones?desde=/x#y");
  igual(`destinoSeguro(${sitio}) país`, destinoSeguro("/mx/aguinaldo", "/cuenta", sitio), "/mx/aguinaldo");
}
igual("destinoSeguro(ar) panel", destinoSeguro("/dashboard", "/cuenta", "ar"), "/dashboard");
igual("destinoSeguro(intl) panel no existe en calcularya", destinoSeguro("/dashboard/opiniones", "/cuenta", "intl"), "/cuenta");
igual("inicioTrasEntrar admin ar", inicioTrasEntrar("ar", true), "/dashboard");
igual("inicioTrasEntrar admin intl", inicioTrasEntrar("intl", true), "/cuenta");
igual("inicioTrasEntrar ar", inicioTrasEntrar("ar", false), "/cuenta");

// ─── sitio y origen por Host: lista cerrada ──────────────────────────────────
const INTL = "https://calcularya.com";
conEntorno({ NEXT_PUBLIC_SITIO_INTL_URL: INTL, NEXT_PUBLIC_SITIO_AR_URL: undefined, VERCEL_ENV: "production", NODE_ENV: "production" }, () => {
  igual("sitio calcularya", sitioDeHost("calcularya.com", null), "intl");
  igual("sitio www.calcularya", sitioDeHost("www.calcularya.com", null), "intl");
  igual("sitio con puerto", sitioDeHost("calcularya.com:443", null), "intl");
  igual("sitio calcular.ar", sitioDeHost("calcular.ar", null), "ar");
  igual("sitio ajeno", sitioDeHost("evil.com", null), "ar");
  igual("sitio parecido", sitioDeHost("calcularya.com.evil.com", null), "ar");
  igual("cookie sitio=intl no vale en producción", sitioDeHost("calcular.ar", "intl"), "ar");
  igual("esHostIntl sufijo", esHostIntl("evilcalcularya.com"), false);
  igual("origen intl", origenDeSitio("intl", "calcularya.com"), INTL);
  igual("origen ar", origenDeSitio("ar", "calcular.ar"), "https://calcular.ar");
  igual("origen con Host ajeno", origenDeSitio("ar", "evil.com"), "https://calcular.ar");
  igual("origen intl con Host ajeno", origenDeSitio("intl", "evil.com"), INTL);
  igual("producción no usa localhost", origenDeSitio("ar", "localhost:3000"), "https://calcular.ar");
  igual("producción no usa vercel.app", origenDeSitio("intl", "x.vercel.app"), INTL);
});
conEntorno({ NEXT_PUBLIC_SITIO_INTL_URL: INTL, VERCEL_ENV: "preview", NODE_ENV: "production" }, () => {
  igual("preview: cookie sitio=intl", sitioDeHost("calcular-ar-git-x.vercel.app", "intl"), "intl");
  igual("preview: origen del deploy", origenDeSitio("intl", "calcular-ar-git-x.vercel.app"), "https://calcular-ar-git-x.vercel.app");
  igual("preview: Host ajeno", origenDeSitio("intl", "evil.com"), INTL);
  igual("preview: subdominio raro de vercel", origenDeSitio("ar", "a.b.vercel.app"), "https://calcular.ar");
});
conEntorno({ NEXT_PUBLIC_SITIO_INTL_URL: undefined, VERCEL_ENV: "preview", NODE_ENV: "development" }, () => {
  igual("sin sitio intl nunca es intl", sitioDeHost("calcularya.com", "intl"), "ar");
  igual("dev: localhost", origenDeSitio("ar", "localhost:3107"), "http://localhost:3107");
});

// ─── país de la cuenta ──────────────────────────────────────────────────────
igual("mercado de /mx/...", mercadoDeDesde("/mx/aguinaldo"), "mx");
igual("mercado de la home", mercadoDeDesde("/"), "global");
igual("mercado sin desde", mercadoDeDesde(""), "global");
igual("mercado inventado", mercadoDeDesde("/zz/x"), "global");
igual("ar no es un mercado intl", mercadoDeDesde("/ar/x"), "global");

// ─── reglas de hosts ────────────────────────────────────────────────────────
const base = { origenIntl: INTL, origenAR: "https://calcular.ar", mercados: ["mx", "uy"], paginasGlobales: ["privacidad"], rutasAR: ["aguinaldo", "login", "registro", "recuperar", "cuenta", "auth", "dashboard"], cookiePreview: false };
const apagadas = reglasPorHost({ ...base, cuentas: false });
const prendidas = reglasPorHost({ ...base, cuentas: true });
const redirAR = (r: ReturnType<typeof reglasPorHost>) => r.redirects.find((x) => x.destination.startsWith("https://calcular.ar/:ruta"))?.source ?? "";
for (const ruta of RUTAS_CUENTA) {
  igual(`apagadas: /${ruta} de calcularya va a calcular.ar`, redirAR(apagadas).includes(ruta), true);
  igual(`prendidas: /${ruta} de calcularya se queda`, new RegExp(`[(|]${ruta}[|)]`).test(redirAR(prendidas)), false);
}
igual("prendidas: /dashboard sigue yendo a calcular.ar", redirAR(prendidas).includes("dashboard"), true);
igual(
  "prendidas: rewrite a las pantallas intl",
  prendidas.beforeFiles.some((r) => r.destination === "/intl/global/:ruta/:resto*" && r.source.includes("login") && r.source.includes("cuenta")),
  true,
);
igual("apagadas: sin rewrite de cuenta", apagadas.beforeFiles.some((r) => r.destination === "/intl/global/:ruta/:resto*"), false);
const negada = (r: ReturnType<typeof reglasPorHost>) => r.beforeFiles.find((x) => x.source.startsWith("/api/"))!.source;
const apiNegada = (r: ReturnType<typeof reglasPorHost>, p: string) => new RegExp(`^${negada(r).slice("/api/:path(".length, -1)}$`).test(p);
igual("apagadas: /api/cuenta es 404 en calcularya", apiNegada(apagadas, "cuenta/calculos"), true);
igual("prendidas: /api/cuenta existe en calcularya", apiNegada(prendidas, "cuenta/calculos"), false);
igual("prendidas: /api/cuentas (parecida) sigue en 404", apiNegada(prendidas, "cuentas"), true);
igual("prendidas: /api/subscribe sigue en 404", apiNegada(prendidas, "subscribe"), true);

// ─── textos de CalcularYa ───────────────────────────────────────────────────
const VOSEO =
  /\b(entrá|tenés|querés|podés|sabés|elegí|escribí|probá|revisá|mirá|tocá|mandame|pedí|volvé|usá|creá|guardá|bajá|contanos|escribinos|ponele|repetila|creala|encontralos|revisalos|aceptá|esperá|sos|vos|acá|confirmá|recuperá|ingresá|borrá|entrás|mandalo|mandala|cambiás|tocás|elegís|venís|escribís|usás|olvidaste la clave)\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;
function textosPlanos(x: unknown, ruta: string, salida: [string, string][]) {
  if (typeof x === "string") salida.push([ruta, x]);
  else if (typeof x === "function") {
    const r = (x as (...a: unknown[]) => unknown)("X", "Y");
    if (typeof r === "string") salida.push([ruta, r]);
  } else if (Array.isArray(x)) x.forEach((v, i) => textosPlanos(v, `${ruta}[${i}]`, salida));
  else if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) textosPlanos(v, `${ruta}.${k}`, salida);
}
const intl: [string, string][] = [];
textosPlanos(textosDe("intl"), "intl", intl);
const ar: [string, string][] = [];
textosPlanos(textosDe("ar"), "ar", ar);
const claves = (l: [string, string][], pre: string) => [...new Set(l.map(([r]) => r.slice(pre.length).replace(/\[\d+\]/g, "[]")))];
igual("mismas claves en los dos sitios", claves(intl, "intl"), claves(ar, "ar"));
for (const [ruta, t] of intl) {
  total++;
  const problema = VOSEO.test(t) ? `voseo (${t.match(VOSEO)![0]})` : /[–—]/.test(t) ? "raya" : EMOJI.test(t) ? "emoji" : /CalculAR|calcular\.ar/.test(t) ? "marca de calcular.ar" : null;
  if (problema) {
    fallas++;
    console.error(`❌ ${ruta}: ${problema}: ${JSON.stringify(t)}`);
  }
}

console.log(fallas ? `${fallas} de ${total} FALLAS` : `check_cuentas_sitio: TODO OK (${total} casos)`);
process.exit(fallas ? 1 : 0);
