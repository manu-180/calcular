// Poda de universales sin tráfico (docs/seo/ESTANDAR-SEO-MULTIPAIS.md §3): por cada mercado de
// calcularya publicado hace 90 días o más, las universales con 0 impresiones en Search Console en los
// últimos 90 días pasan a src/motor/universales/podadas.json. El motor las saca del sitemap y del
// clúster hreflang y les pone noindex, follow (check_poda). Las locales nunca se podan.
//
//   envkit run -p apex-manager --only GSC_SERVICE_ACCOUNT_JSON -- npx tsx scripts/poda-universales.ts --dry
//   (sin --dry escribe podadas.json; lo corre la ronda mensual, scripts/cron/mensual.ts)
//
// Decisiones que no se ven en el código:
// - La poda es pegajosa: una podada no vuelve sola. Con noindex no junta impresiones, así que releerla
//   la dejaría podada igual, y si volviera por impresiones viejas que todavía arrastra entraría y saldría
//   del índice mes a mes. Para devolverla, se borra a mano su línea del JSON.
// - La edad cuenta desde lo último que pasó: el país pasó a "publicado" (primer commit que puso
//   `estado: "publicado"` en src/paises/<m>/mercado.ts) o nació la universal (primer commit de
//   src/motor/universales/<id>/). Una universal nueva en un país viejo tiene sus 90 días propios.
// - Si -S no encuentra el commit (el estado entró en la resolución de un merge, pasó con jp) vale el
//   primer commit del mercado.ts, que es más viejo o igual: a lo sumo adelanta la poda de ese país.
// - Sin historia de git (clon superficial) las fechas salen de hoy: no se poda nada, que es el lado seguro.
// - Si Search Console devuelve 0 filas para todo el sitio no se escribe nada: es una falla de la API o
//   de permisos, no un sitio sin tráfico.
import "./sin-server-only";
import { createSign } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Registro } from "../src/motor/registro";
import type { FechaISO } from "../src/motor/tipos";
import type { Podadas } from "../src/motor/universales/poda";

process.env.NEXT_PUBLIC_SITIO_INTL_URL ||= "https://calcularya.com";
process.env.VERCEL_ENV = "production";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ARCHIVO = path.join(RAIZ, "src/motor/universales/podadas.json");
const PROPIEDAD = "sc-domain:calcularya.com";
const DIAS = 90;
const DIA = 86_400_000;
const seco = process.argv.includes("--dry");
// Diagnóstico: cuántas saldrían si todos los mercados ya tuvieran 90 días. Solo con --dry.
const sinEdad = seco && process.argv.includes("--sin-edad");

const iso = (d: Date) => d.toISOString().slice(0, 10);
const hoy = iso(new Date()) as FechaISO;
const diasDesde = (f: string) => Math.floor((Date.parse(hoy) - Date.parse(f)) / DIA);

async function tokenGoogle(crudo: string): Promise<string> {
  const sa = JSON.parse(crudo) as { client_email: string; private_key: string };
  const ahora = Math.floor(Date.now() / 1000);
  const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const sinFirma = `${b64({ alg: "RS256", typ: "JWT" })}.${b64({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: ahora,
    exp: ahora + 3600,
  })}`;
  const firma = createSign("RSA-SHA256").update(sinFirma).sign(sa.private_key, "base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${sinFirma}.${firma}` }),
  });
  const j = (await r.json()) as { access_token?: string; error?: string };
  if (!j.access_token) throw new Error(`token de Google: ${j.error ?? r.status}`);
  return j.access_token;
}

// Paths con al menos una impresión en la ventana. Search Console va 2-3 días atrasado: la ventana se
// corre 3 días para no contar como cero lo que todavía no cargó.
async function conImpresiones(token: string): Promise<{ paths: Set<string>; filas: number; desde: string; hasta: string }> {
  const hasta = iso(new Date(Date.now() - 3 * DIA));
  const desde = iso(new Date(Date.now() - (3 + DIAS) * DIA));
  const paths = new Set<string>();
  let filas = 0;
  for (let startRow = 0; ; startRow += 25000) {
    const r = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(PROPIEDAD)}/searchAnalytics/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ startDate: desde, endDate: hasta, dimensions: ["page"], rowLimit: 25000, startRow }),
    });
    if (!r.ok) throw new Error(`Search Console ${PROPIEDAD}: ${r.status} ${(await r.text()).slice(0, 300)}`);
    const j = (await r.json()) as { rows?: { keys: string[]; impressions: number }[] };
    const rows = j.rows ?? [];
    filas += rows.length;
    for (const x of rows) if (x.impressions > 0) paths.add(decodeURIComponent(new URL(x.keys[0]).pathname).replace(/\/+$/, "") || "/");
    if (rows.length < 25000) break;
  }
  return { paths, filas, desde, hasta };
}

// Primera fecha por archivo o carpeta en un `git log --reverse --format=@%as --name-only`.
function primeras(args: string[], clave: (archivo: string) => string | null): Map<string, string> {
  const salida = execFileSync("git", ["log", "--reverse", "--format=@%as", "--name-only", ...args], { cwd: RAIZ, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  const r = new Map<string, string>();
  let fecha = "";
  for (const linea of salida.split("\n")) {
    if (linea.startsWith("@")) fecha = linea.slice(1);
    else if (linea.trim()) {
      const k = clave(linea.trim());
      if (k && !r.has(k)) r.set(k, fecha);
    }
  }
  return r;
}

async function main(): Promise<number> {
  const crudo = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!crudo) {
    console.log("⚠️ poda: falta GSC_SERVICE_ACCOUNT_JSON (envkit apex-manager); no se toca podadas.json");
    return 0;
  }
  const { esUniversal } = await import("../src/motor/registro");
  const { hoyEn } = await import("../src/motor/vigencia");
  const mod = (await import("../src/paises")) as { registro?: Registro; default?: { registro: Registro } };
  const registro = mod.registro ?? mod.default!.registro;

  const superficial = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: RAIZ, encoding: "utf8" }).trim() === "true";
  if (superficial) console.log("⚠️ poda: clon superficial, las fechas de publicación salen de hoy y no se poda nada");
  const publicadoEl = primeras(["-S", 'estado: "publicado"', "--", "src/paises/*/mercado.ts"], (a) => a.match(/^src\/paises\/([^/]+)\/mercado\.ts$/)?.[1] ?? null);
  const creadoEl = primeras(["--diff-filter=A", "--", "src/paises/*/mercado.ts"], (a) => a.match(/^src\/paises\/([^/]+)\/mercado\.ts$/)?.[1] ?? null);
  const nacioEl = primeras(["--diff-filter=A", "--", "src/motor/universales"], (a) => a.match(/^src\/motor\/universales\/([^/]+)\//)?.[1] ?? null);

  const { paths, filas, desde, hasta } = await conImpresiones(await tokenGoogle(crudo));
  if (filas === 0) {
    console.log(`❌ poda: Search Console devolvió 0 filas para ${PROPIEDAD} (${desde} a ${hasta}); no se escribe nada`);
    return 1;
  }

  const actual = JSON.parse(readFileSync(ARCHIVO, "utf8")) as Podadas;
  const nuevas: Podadas["mercados"] = structuredClone(actual.mercados);
  const resumen: string[] = [];
  let agregadas = 0;
  let jovenes = 0;
  let evaluadas = 0;
  for (const m of registro.mercados("produccion")) {
    if (m.codigo === "global") continue;
    const desdePais = sinEdad ? "2000-01-01" : superficial ? hoy : (publicadoEl.get(m.codigo) ?? creadoEl.get(m.codigo));
    if (!desdePais) {
      resumen.push(`  ${m.codigo}: sin fecha de publicación en git, se saltea`);
      continue;
    }
    if (diasDesde(desdePais) < DIAS) {
      jovenes++;
      continue;
    }
    const sinTrafico: string[] = [];
    for (const c of registro.calculadorasPublicables(m.codigo, hoyEn(m), "produccion")) {
      if (!esUniversal(c) || nuevas[m.codigo]?.[c.universal.id]) continue;
      const nacio = sinEdad ? desdePais : superficial ? hoy : (nacioEl.get(c.universal.id) ?? desdePais);
      if (diasDesde(nacio > desdePais ? nacio : desdePais) < DIAS) continue;
      evaluadas++;
      if (paths.has(`/${m.codigo}/${c.definicion.slug}`)) continue;
      sinTrafico.push(c.universal.id);
    }
    if (!sinTrafico.length) continue;
    nuevas[m.codigo] = { ...(nuevas[m.codigo] ?? {}), ...Object.fromEntries(sinTrafico.map((id) => [id, hoy])) };
    agregadas += sinTrafico.length;
    resumen.push(`  ${m.codigo}${sinEdad ? "" : ` (publicado ${desdePais})`}: ${sinTrafico.length} → ${sinTrafico.join(", ")}`);
  }

  const total = Object.values(nuevas).reduce((n, x) => n + Object.keys(x ?? {}).length, 0);
  console.log(`poda ${hoy} · Search Console ${desde} a ${hasta}: ${filas} páginas, ${paths.size} con impresiones · ${jovenes} mercados con menos de ${DIAS} días`);
  for (const l of resumen) console.log(l);
  console.log(`poda: ${agregadas} de ${evaluadas} universales evaluadas sin impresiones · ${total} podadas en total`);
  if (!agregadas) return 0;
  if (seco) {
    console.log("(seco) no se escribe podadas.json");
    return 0;
  }
  const ordenado: Podadas["mercados"] = Object.fromEntries(
    Object.keys(nuevas)
      .sort()
      .map((k) => [k, Object.fromEntries(Object.entries(nuevas[k] ?? {}).sort(([a], [b]) => a.localeCompare(b)))]),
  );
  writeFileSync(ARCHIVO, `${JSON.stringify({ actualizadoEl: hoy, mercados: ordenado } satisfies Podadas, null, 2)}\n`);
  console.log(`poda: escrito ${path.relative(RAIZ, ARCHIVO)}`);
  return 0;
}

main().then(
  (c) => process.exit(c),
  (e) => {
    console.error(`❌ poda: ${e instanceof Error ? e.message : e}`);
    process.exit(1);
  },
);
