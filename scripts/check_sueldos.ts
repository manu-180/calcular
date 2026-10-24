// Gate de «Sueldos reales»: k-anonimato con diversidad (10 aportes limpios de 3 días y 2 meses), que la
// diferenciación con aportes falsos no publique nada, publicación diaria por foto, topes por huella y
// por celda, piso del IQR, espejo TypeScript = SQL, validación del endpoint, que anon y authenticated no
// ejecuten ni lean nada, textos en los diez idiomas y slugs sin choques. La parte de Postgres corre
// sobre PGlite con los roles de Supabase simulados, igual que check_opiniones.ts, y aplica la migración
// de endurecimiento encima de la primera (con datos) además de volver a correr las dos.
//
// Correr con: npx tsx scripts/check_sueldos.ts

import "./sin-server-only";
import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DICCIONARIOS_SUELDOS, textosSueldos, type TextosSueldos } from "../src/motor/i18n/sueldos";
import { SLUG_MUNDO } from "../src/motor/mundo/rutas";
import { PAGINAS_GLOBALES, PAGINAS_MERCADO } from "../src/motor/paginas";
import { edicionValida } from "../src/lib/sueldos/paises";
import { CERCA, EXPERIENCIAS, K, MIN_DIAS, MIN_MESES, OCUPACIONES } from "../src/motor/sueldos/catalogo";
import { celdaDe, percentil, percentilAproximado, redondearPublicado, sinAtipicos, tramoDe, type AporteCelda } from "../src/motor/sueldos/estadistica";
import { agregadosDeFilas, type FilaAgregada } from "../src/motor/sueldos/filas";
import { dentroDeLimites, dosCifras, limitesDe, mesDe, validarAporte, type PaisAportable } from "../src/motor/sueldos/reglas";
import { SLUG_SUELDOS } from "../src/motor/sueldos/rutas";
import { edicionDeBase } from "../src/motor/sueldos/ui/comun";
import { IDIOMAS, type Idioma, type Trato } from "../src/motor/tipos";
import { registro } from "../src/paises";
import { problemasDeTexto } from "./reglas_idioma";

type Fila = Record<string, unknown>;
interface Db {
  query(sql: string, params?: unknown[]): Promise<{ rows: Fila[] }>;
  exec(sql: string): Promise<unknown>;
  close(): Promise<void>;
}
type Rol = "anon" | "authenticated" | "service_role" | "dueno";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(raiz, "supabase", "migrations");
const migraciones = readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .map((f) => ({ f, sql: readFileSync(path.join(dir, f), "utf8") }));
const propia = migraciones.find((m) => /_ca_sueldos\.sql$/.test(m.f));
const endurecer = migraciones.find((m) => /_ca_sueldos_endurecer\.sql$/.test(m.f));

let pasadas = 0;
let fallas = 0;
function ok(cond: boolean, que: string, detalle?: unknown) {
  if (cond) {
    pasadas++;
    return;
  }
  fallas++;
  console.error(`  ✗ ${que}${detalle === undefined ? "" : ` → ${typeof detalle === "string" ? detalle : JSON.stringify(detalle)}`}`);
}
const seccion = (n: string) => console.log(`\n· ${n}`);

function estaticos() {
  seccion("migración");
  ok(!!propia, "existe supabase/migrations/*_ca_sueldos.sql");
  if (!propia) return;
  const sql = propia.sql;
  ok(sql.includes("alter table public.ca_sueldos_aportes enable row level security;"), "enable row level security");
  ok(sql.includes("alter table public.ca_sueldos_aportes force row level security;"), "force row level security");
  ok(sql.includes("revoke all on table public.ca_sueldos_aportes from public, anon, authenticated;"), "revoke all de public, anon y authenticated");
  ok(!/create policy/i.test(sql), "sin policies: nadie fuera de service_role toca la tabla");
  ok(!/\b(ip|user_agent|vid|sid|created_at|ts)\b\s+(text|uuid|timestamptz|inet)/i.test(sql), "la tabla no tiene IP, user agent, vid ni fecha exacta");
  ok(sql.includes(`when c.n >= ${K} then`), `la base publica con el mismo K (${K})`);
  ok(sql.includes("interval '11 months'"), "ventana de 12 meses");
  ok(sql.includes(`experiencia in (${EXPERIENCIAS.map((e) => `'${e}'`).join(", ")})`), "rangos de experiencia iguales que el código");
  ok(/revoke execute on function public\.ca_sueldos_aportar\([^)]*\) from public, anon, authenticated;/.test(sql), "aportar solo para service_role");
  ok(/revoke execute on function public\.ca_sueldos_tope\(\) from public, anon, authenticated;/.test(sql), "el tope no se ejecuta suelto");
  ok((sql.match(/set search_path = ''/g) ?? []).length >= 4, "toda función fija search_path");

  seccion("migración de endurecimiento");
  ok(!!endurecer, "existe supabase/migrations/*_ca_sueldos_endurecer.sql");
  if (!endurecer) return;
  const e = endurecer.sql;
  ok(endurecer.f > propia.f, "va después de la primera");
  ok(!/create policy/i.test(e), "sin policies");
  ok(!/\bcreate table (?!if not exists)/i.test(e) && !/\bcreate function\b/i.test(e), "re-ejecutable: create table if not exists y create or replace");
  ok(e.includes(`c.n >= ${K} and coalesce(d.dias, 0) >= ${MIN_DIAS} and c.meses >= ${MIN_MESES}`), `publica con K = ${K}, ${MIN_DIAS} días y ${MIN_MESES} meses, como catalogo.ts`);
  ok(e.includes(`when j.n >= ${CERCA} then 'cerca'`), `«cerca» desde ${CERCA}, como catalogo.ts`);
  ok(e.includes("greatest(q.q3 - q.q1, 0.1 * q.q2)"), "piso del IQR al 10 % de la mediana, como estadistica.ts");
  ok(e.includes("drop function if exists public.ca_sueldos_agregados(text, text);"), "la lectura en vivo que tenía anon se borra");
  ok(e.includes("drop function if exists public.ca_sueldos_aportar("), "la carga que devolvía la celda se borra");
  for (const f of ["ca_sueldos_sumar", "ca_sueldos_leer", "ca_sueldos_paises", "ca_sueldos_publicar", "ca_sueldos_calcular", "ca_sueldos_redondear", "ca_sueldos_al_dia"]) {
    ok(new RegExp(`revoke execute on function public\\.${f}\\([^)]*\\) from public, anon, authenticated`).test(e), `${f}: revoke de public, anon y authenticated`);
  }
  ok((e.match(/set search_path = ''/g) ?? []).length >= 7, "toda función fija search_path");
  ok(!/\bip\b\s+(text|inet)/i.test(e), "ninguna tabla guarda la IP");

  seccion("endpoints");
  const post = readFileSync(path.join(raiz, "src", "app", "api", "sueldos", "route.ts"), "utf8");
  ok(post.includes("json({ ok: true }, 200)") && !/celda/.test(post.replace(/\/\/.*$/gm, "")), "el POST responde solo { ok: true }, sin la celda");
  ok(post.includes("ca_sueldos_sumar") && !post.includes("ca_sueldos_aportar"), "el POST usa ca_sueldos_sumar");
  const lectura = readFileSync(path.join(raiz, "src", "lib", "sueldos", "lectura.ts"), "utf8");
  ok(!lectura.includes("SUPABASE_ANON_KEY") && lectura.includes("ca_sueldos_leer"), "la lectura pasa por la service role y ca_sueldos_leer, nunca por la anon key");
  ok(edicionValida("mx") && edicionValida("ar") && edicionValida("global"), "?e= acepta ediciones del registro, ar y global");
  ok(!edicionValida("qq") && !edicionValida("mx-qq") && !edicionValida("MX") && !edicionValida("x".repeat(40)), "?e= rechaza lo que no es una edición");
}

const PAIS: PaisAportable = { mercado: "mx", moneda: "MXN", ppa: 10 };
const buscar = (m: string) => (m === "mx" ? PAIS : undefined);
const AHORA = new Date("2026-10-24T12:00:00Z");
const ID = "0f8fad5b-d9cb-4c4f-9f8e-0c5f5f0c5f5f";
const cuerpo = (extra: Record<string, unknown> = {}) => ({ id: ID, m: "mx", o: "enfermeria", e: "3-5", b: 23456, ok: true, ...extra });

function reglas() {
  seccion("reglas del aporte");
  ok(dosCifras(1_234_567) === 1_200_000, "dos cifras: 1.234.567 → 1.200.000", dosCifras(1_234_567));
  ok(dosCifras(1250) === 1300 && dosCifras(99.6) === 100 && dosCifras(0.347) === 0.35, "dos cifras redondea como Postgres", [dosCifras(1250), dosCifras(99.6), dosCifras(0.347)]);
  const v = validarAporte(cuerpo(), buscar, AHORA);
  ok("fila" in v && v.fila.bruto_mensual === 23000 && v.fila.mes === "2026-10" && v.fila.moneda === "MXN", "acepta un aporte normal y lo guarda redondeado y con el mes", v);
  ok("error" in validarAporte(cuerpo({ ok: false }), buscar, AHORA), "sin consentimiento no se guarda");
  ok("error" in validarAporte({ ...cuerpo(), vid: "x" }, buscar, AHORA), "una clave de más se rechaza");
  ok("error" in validarAporte(cuerpo({ id: "no-es-uuid" }), buscar, AHORA), "id que no es uuid v4");
  ok("error" in validarAporte(cuerpo({ m: "zz" }), buscar, AHORA), "país fuera de la grilla");
  ok("error" in validarAporte(cuerpo({ o: "astronauta" }), buscar, AHORA), "ocupación fuera de la lista");
  ok("error" in validarAporte(cuerpo({ e: "20+" }), buscar, AHORA), "experiencia fuera de los rangos");
  ok("error" in validarAporte(cuerpo({ b: "23456" }), buscar, AHORA), "monto que no es número");
  const { min, max } = limitesDe(PAIS);
  ok(min === 1000 && max === 1_500_000, "límites por PPA (100 y 150.000 dólares PPA por mes)", { min, max });
  ok("error" in validarAporte(cuerpo({ b: 500 }), buscar, AHORA), "debajo del piso se rechaza");
  ok("error" in validarAporte(cuerpo({ b: 2_000_000 }), buscar, AHORA), "arriba del techo se rechaza");
  ok(dentroDeLimites(min, PAIS) && dentroDeLimites(max, PAIS), "los bordes entran");
  ok(limitesDe({ ...PAIS, minimoMensual: 10_000 }).min === 3000, "con salario mínimo, el piso es 0,3 veces el mínimo");
  ok(mesDe(new Date("2026-01-31T23:59:59Z")) === "2026-01", "el mes es UTC");
  ok(edicionDeBase("https://calcularya.com/mx/sueldo-en-el-mundo") === "mx", "edición desde la URL del mundo");
  ok(edicionDeBase("https://calcularya.com/ca-fr/salaire-dans-le-monde") === "ca-fr", "edición con idioma");
  ok(edicionDeBase("https://calcular.ar/sueldo-en-el-mundo") === "ar", "calcular.ar es ar");
  ok(edicionDeBase("https://calcularya.com/salary-around-the-world") === "global", "la home global");
}

// Aportes con valores dados, repartidos en los meses (el día lo cuenta quien llama).
const deMes = (valores: readonly number[], meses: readonly string[]): AporteCelda[] => valores.map((b, i) => ({ b, mes: meses[i % meses.length] }));

function estadistica() {
  seccion("estadística (espejo de la base)");
  ok(percentil([1, 2, 3, 4], 0.5) === 2.5 && percentil([10], 0.75) === 10, "percentil como percentile_cont");
  const dosMeses = ["2026-09", "2026-10"];
  const nueve = Array.from({ length: 9 }, (_, i) => 1000 + i * 100);
  ok(celdaDe(deMes(nueve, dosMeses), 5).cifras === null, "con 9 aportes no se publica");
  ok(celdaDe(deMes([...nueve, 1900], dosMeses), 5).cifras !== null, "con 10 de 3 días y 2 meses sí");
  ok(celdaDe(deMes([...nueve, 1900], dosMeses), 2).cifras === null, "con 10 de 2 días, no");
  ok(celdaDe(deMes([...nueve, 1900], ["2026-10"]), 9).cifras === null, "con 10 de un solo mes, no");
  ok(
    tramoDe(9, false) === "cerca" && tramoDe(6, false) === "lejos" && tramoDe(10, true) === "10-19" && tramoDe(20, true) === "20-49" && tramoDe(50, true) === "50+",
    "tramos: lejos, cerca, 10-19, 20-49, 50+",
  );
  ok(celdaDe(deMes([...nueve, 1900], ["2026-10"]), 9).tramo === "cerca", "sin diversidad queda «cerca», nunca la cuenta");
  const quince = Array.from({ length: 15 }, (_, i) => 20000 + i * 1000);
  const conTroll = [...quince, 1_400_000];
  ok(sinAtipicos(conTroll).length === 15, "un sueldo absurdo queda fuera");
  ok(celdaDe(deMes(conTroll, dosMeses), 9).cifras?.p50 === celdaDe(deMes(quince, dosMeses), 9).cifras?.p50, "y no mueve la mediana");
  ok(celdaDe(deMes([...nueve, 9_000_000], dosMeses), 9).cifras === null, "un atípico no completa una celda: 9 buenos y 1 absurdo no publican");

  seccion("piso del IQR (envenenamiento)");
  const iguales = Array.from({ length: 30 }, () => 25000);
  const reales = [20000, 21000, 22000, 23000, 24000, 26000, 27000, 28000, 29000, 30000];
  ok(sinAtipicos([...iguales, ...reales]).length === 40, "30 valores iguales no borran a los sueldos reales cercanos", sinAtipicos([...iguales, ...reales]).length);
  ok(sinAtipicos([...iguales, 90000]).length === 30, "pero un absurdo sigue afuera");

  seccion("redondeo de publicación");
  ok(redondearPublicado(23456, 23456) === 23000 && redondearPublicado(31234, 23456) === 31000, "múltiplo del 5 % de la mediana y dos cifras", [redondearPublicado(23456, 23456), redondearPublicado(31234, 23456)]);
  ok(redondearPublicado(10, 23456) > 0, "nunca publica cero");
  // Diferenciación con la foto de antes y la de después: el aporte nuevo solo mueve cada cuartil según de
  // qué lado cae, así que 19 montos distintos dan a lo sumo 4 fotos distintas (el cuarto en que cayó),
  // nunca el monto.
  const base = Array.from({ length: 30 }, (_, i) => 20000 + i * 600);
  const fotos = new Set<string>();
  for (let v = 20000; v <= 38000; v += 1000) fotos.add(JSON.stringify(celdaDe(deMes([...base, v], dosMeses), 9).cifras));
  ok(fotos.size <= 4, "con la foto de antes y la de después no se recupera el monto de un aporte", `${fotos.size} fotos para 19 montos`);

  const c = { p25: 1000, p50: 1500, p75: 2200 };
  ok(percentilAproximado(1500, c) === 50, "en la mediana, 50", percentilAproximado(1500, c));
  ok(percentilAproximado(1000, c) === 25 && percentilAproximado(2200, c) === 75, "en los cuartiles, 25 y 75", [percentilAproximado(1000, c), percentilAproximado(2200, c)]);
  ok(percentilAproximado(1, c) === 5 && percentilAproximado(1e9, c) === 95, "acotado entre 5 y 95");
}

function cargarPGlite(): (new () => Db) | null {
  for (const base of [raiz, process.env.PGLITE_DIR].filter((b): b is string => !!b)) {
    try {
      const mod = createRequire(path.join(base, "package.json"))("@electric-sql/pglite") as { PGlite?: new () => Db };
      if (mod.PGlite) return mod.PGlite;
    } catch {
      continue;
    }
  }
  return null;
}

const SUPABASE = `
  create role anon nologin noinherit;
  create role authenticated nologin noinherit;
  create role service_role nologin noinherit bypassrls;
  create role dueno nologin noinherit bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as $$
    select (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')::uuid
  $$;
  grant usage on schema auth to anon, authenticated, service_role, dueno;
  grant execute on function auth.uid() to anon, authenticated, service_role, dueno;
  grant select, references on auth.users to dueno;
  grant usage on schema public to anon, authenticated, service_role;
  grant usage, create on schema public to dueno;
  alter default privileges for role dueno in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges for role dueno in schema public grant all on functions to anon, authenticated, service_role;
`;

async function aplicar(db: Db, lista: readonly { f: string; sql: string }[] = migraciones) {
  for (const m of lista) {
    if (m.f.includes("_cron")) continue;
    await db.exec("set role dueno");
    try {
      await db.exec(m.sql);
    } finally {
      await db.exec("reset role");
    }
  }
}

async function como<T>(db: Db, rol: Rol, fn: () => Promise<T>): Promise<T> {
  await db.exec(`set role ${rol}`);
  try {
    return await fn();
  } finally {
    await db.exec("reset role");
  }
}

async function falla(p: Promise<unknown>, codigo: string, que: string) {
  try {
    await p;
    ok(false, que, `no falló (esperaba ${codigo})`);
  } catch (e) {
    const err = e as { code?: string; message?: string };
    ok(err.code === codigo, que, `${err.code} ${err.message}`);
  }
}

let n = 0;
const uuid = () => `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`;
let nh = 0;
const huella = () => `huella-de-prueba-${String(++nh).padStart(8, "0")}`;
const MES = mesDe(new Date());
const DIA_MS = 86_400_000;
const hace = (dias: number) => new Date(Date.now() - dias * DIA_MS).toISOString().slice(0, 10);
// Día `dia` de hace `meses` meses calendario (UTC), siempre antes de hoy.
const delMes = (meses: number, dia: number) => {
  const h = new Date();
  return new Date(Date.UTC(h.getUTCFullYear(), h.getUTCMonth() - meses, dia)).toISOString().slice(0, 10);
};
const mesDeDia = (dia: string) => dia.slice(0, 7);

interface Aporte {
  mercado?: string;
  ocupacion?: string;
  experiencia?: string;
  bruto: number;
  id?: string;
  moneda?: string;
  huella?: string;
}

// La carga real, como el endpoint: hoy (UTC) y con huella.
async function sumar(db: Db, o: Aporte) {
  return como(db, "service_role", () =>
    db.query("select public.ca_sueldos_sumar($1, $2, $3, $4, $5, $6, $7)", [o.id ?? uuid(), o.mercado ?? "mx", o.moneda ?? "MXN", o.ocupacion ?? "enfermeria", o.experiencia ?? "3-5", o.bruto, o.huella ?? huella()]),
  );
}

// Un aporte pendiente de un día dado (lo que habría dejado ca_sueldos_sumar ese día), para armar
// celdas con varios días y meses sin esperar.
async function sembrar(db: Db, o: Aporte & { dia: string }) {
  return como(db, "dueno", () =>
    db.query("insert into public.ca_sueldos_pendientes values ($1, $2, $3, $4, $5, $6, to_char($7::date, 'YYYY-MM'), $7::date)", [
      o.id ?? uuid(),
      o.mercado ?? "mx",
      o.moneda ?? "MXN",
      o.ocupacion ?? "enfermeria",
      o.experiencia ?? "3-5",
      o.bruto,
      o.dia,
    ]),
  );
}

// Lo de hoy pasa a ser de hace `dias` días: así se prueba qué publica la foto de mañana.
async function pasarDias(db: Db, dias: number) {
  await como(db, "dueno", async () => {
    await db.query("update public.ca_sueldos_pendientes set dia = dia - $1::int, mes = to_char(dia - $1::int, 'YYYY-MM') where dia >= (now() at time zone 'utc')::date", [dias]);
    await db.query("update public.ca_sueldos_huellas set dia = dia - $1::int where dia >= (now() at time zone 'utc')::date", [dias]);
  });
}

async function publicar(db: Db, forzar = true): Promise<boolean> {
  const r = await como(db, "service_role", () => db.query("select public.ca_sueldos_publicar($1) as ok", [forzar]));
  return r.rows[0]?.ok === true;
}

async function leer(db: Db, rol: Rol, mercado = "mx") {
  return (await como(db, rol, () => db.query("select * from public.ca_sueldos_leer($1)", [mercado]))).rows as unknown as FilaAgregada[];
}

const celda = (filas: FilaAgregada[], ocupacion: string, experiencia: string | null = null) => filas.find((f) => f.ocupacion === ocupacion && f.experiencia === experiencia);
const cuenta = async (db: Db, sql: string) => Number((await como(db, "dueno", () => db.query(sql))).rows[0]?.n);
const COLUMNAS_LECTURA = "ocupacion,experiencia,moneda,tramo,p25,p50,p75,desde,hasta";

function igualQueTs(fila: FilaAgregada | undefined, ts: ReturnType<typeof celdaDe>, que: string) {
  const base = fila ? { tramo: fila.tramo, p25: fila.p25 === null ? null : Number(fila.p25), p50: fila.p50 === null ? null : Number(fila.p50), p75: fila.p75 === null ? null : Number(fila.p75) } : null;
  const espejo = { tramo: ts.tramo, p25: ts.cifras?.p25 ?? null, p50: ts.cifras?.p50 ?? null, p75: ts.cifras?.p75 ?? null };
  ok(JSON.stringify(base) === JSON.stringify(espejo), que, { base, ts: espejo });
}

async function sobreLaVieja(PGlite: new () => Db) {
  seccion("la migración nueva sobre la vieja (con datos)");
  const db = new PGlite();
  try {
    await db.exec(SUPABASE);
    await aplicar(db, migraciones.filter((m) => m !== endurecer));
    for (let i = 0; i < 3; i++) {
      await como(db, "service_role", () => db.query("select * from public.ca_sueldos_aportar($1, 'mx', 'MXN', 'cocina', '0-2', 20000, $2)", [uuid(), MES]));
    }
    await aplicar(db, [endurecer!]);
    ok((await cuenta(db, "select count(*)::int as n from public.ca_sueldos_aportes")) === 3, "los aportes guardados con la primera siguen");
    const viejas = await db.query("select proname from pg_proc where proname in ('ca_sueldos_aportar', 'ca_sueldos_agregados', 'ca_sueldos_tope')");
    ok(viejas.rows.length === 0, "la lectura en vivo, la carga que devolvía la celda y el trigger viejo ya no existen", viejas.rows);
    ok((await publicar(db)) === true, "se publica sobre los datos viejos");
    const cocina = celda(await leer(db, "service_role"), "cocina");
    ok(cocina?.tramo === "lejos" && cocina.p50 === null, "3 aportes viejos: «lejos», sin cifras", cocina);
    await aplicar(db, [propia!, endurecer!]);
    await aplicar(db, [endurecer!]);
    const otraVez = await db.query("select proname from pg_proc where proname in ('ca_sueldos_aportar', 'ca_sueldos_agregados', 'ca_sueldos_tope')");
    ok(otraVez.rows.length === 0 && (await cuenta(db, "select count(*)::int as n from public.ca_sueldos_aportes")) === 3, "volver a correr las dos deja el mismo estado y los mismos datos");
  } finally {
    await db.close();
  }
}

async function postgres(PGlite: new () => Db) {
  await sobreLaVieja(PGlite);
  const db = new PGlite();
  try {
    await db.exec(SUPABASE);
    await aplicar(db);
    await aplicar(db, [endurecer!]);
    ok(true, "las migraciones se aplican y la de endurecimiento se puede volver a correr");

    seccion("diferenciación con aportes falsos");
    for (let i = 0; i < 9; i++) await sumar(db, { bruto: 20000 + 1000 * i });
    await sumar(db, { bruto: 33000 });
    await publicar(db);
    ok(!celda(await leer(db, "service_role"), "enfermeria"), "9 falsos + 1 real el mismo día: no se ve nada, ni la cuenta (la foto es de días anteriores)");
    await pasarDias(db, 1);
    await publicar(db);
    let enf = celda(await leer(db, "service_role"), "enfermeria");
    ok(enf?.tramo === "cerca" && enf.p25 === null && enf.p50 === null && enf.p75 === null && enf.desde === null, "al día siguiente: «falta poco» y ninguna cifra (un día y un mes no alcanzan)", enf);
    for (let d = 2; d <= 4; d++) await sembrar(db, { bruto: 21000 + d * 1000, ocupacion: "farmacia", dia: delMes(1, d) });
    for (let i = 0; i < 6; i++) await sembrar(db, { bruto: 24000 + i * 1000, ocupacion: "farmacia", dia: delMes(1, 6) });
    await sembrar(db, { bruto: 30000, ocupacion: "farmacia", dia: delMes(1, 9) });
    await publicar(db);
    const far = celda(await leer(db, "service_role"), "farmacia");
    ok(far?.tramo === "cerca" && far.p50 === null, "9 falsos en 3 días + 1 real, todo en un mes: tampoco publica", far);
    const filas = await leer(db, "service_role");
    ok(filas.every((f) => Object.keys(f).join(",") === COLUMNAS_LECTURA), "la lectura no trae cuenta exacta (ni total ni n)", Object.keys(filas[0] ?? {}));

    seccion("publicación con diversidad");
    const dias = [delMes(2, 3), delMes(2, 10), delMes(1, 5), delMes(1, 12), delMes(1, 20)];
    const dev: AporteCelda[] = [];
    for (let i = 0; i < 12; i++) {
      const b = dosCifras(40000 + i * 2300);
      const dia = dias[i % dias.length];
      dev.push({ b, mes: mesDeDia(dia) });
      await sembrar(db, { bruto: b, ocupacion: "desarrollo-software", dia });
    }
    for (let i = 0; i < 12; i++) await sembrar(db, { bruto: 30000 + i * 1000, ocupacion: "cocina", dia: delMes(1, 7) });
    for (let i = 0; i < 12; i++) await sembrar(db, { bruto: 30000 + i * 1000, ocupacion: "ventas", dia: delMes(1, 3 + (i % 3)) });
    for (let i = 0; i < 12; i++) await sembrar(db, { bruto: 30000 + i * 1000, ocupacion: "diseno", dia: i % 2 ? delMes(1, 8) : delMes(2, 8) });
    await publicar(db);
    let mx = await leer(db, "service_role");
    const d = celda(mx, "desarrollo-software");
    ok(d?.tramo === "10-19" && d.p50 !== null, "12 aportes de 5 días y 2 meses: se publica, con la cuenta en rango", d);
    igualQueTs(d, celdaDe(dev, 5), "las cifras de la base son las del espejo en TypeScript");
    igualQueTs(celda(mx, "desarrollo-software", "3-5"), celdaDe(dev, 5), "y la del rango de experiencia también");
    ok(celda(mx, "cocina")?.p50 === null, "12 aportes de un solo día: no");
    ok(celda(mx, "ventas")?.p50 === null, "12 aportes de 3 días de un mes: no");
    ok(celda(mx, "diseno")?.p50 === null, "12 aportes de 2 días en 2 meses: no");
    ok(d?.desde === mesDeDia(dias[0]) && d?.hasta === mesDeDia(dias[4]), "el período es de meses, nunca de días", d);

    seccion("la foto es diaria");
    ok((await publicar(db, false)) === false, "una segunda publicación el mismo día no corre");
    const antes = JSON.stringify(await leer(db, "service_role"));
    for (let i = 0; i < 3; i++) await sumar(db, { bruto: 52000, ocupacion: "desarrollo-software" });
    ok(JSON.stringify(await leer(db, "service_role")) === antes, "aportes de hoy no cambian lo publicado hoy");
    ok((await cuenta(db, "select count(*)::int as n from public.ca_sueldos_pendientes where dia < (now() at time zone 'utc')::date")) === 0, "no quedan pendientes de días cerrados");
    ok((await cuenta(db, "select count(*)::int as n from public.ca_sueldos_huellas where dia < (now() at time zone 'utc')::date")) === 0, "ni huellas de días cerrados");
    const cols = await db.query("select column_name from information_schema.columns where table_schema = 'public' and table_name = 'ca_sueldos_aportes' order by ordinal_position");
    ok(cols.rows.map((r) => r.column_name).join(",") === "id,mercado,moneda,ocupacion,experiencia,bruto_mensual,mes", "lo publicado no guarda el día: la tabla sigue con 7 columnas", cols.rows);
    const colsDias = await db.query("select column_name from information_schema.columns where table_schema = 'public' and table_name = 'ca_sueldos_dias' order by ordinal_position");
    ok(colsDias.rows.map((r) => r.column_name).join(",") === "mercado,ocupacion,experiencia,mes,dias", "de los días solo queda la cuenta por celda y mes", colsDias.rows);

    seccion("topes del día");
    const h = huella();
    const id = uuid();
    await sumar(db, { id, bruto: 30000, ocupacion: "seguridad", huella: h });
    await sumar(db, { id, bruto: 30000, ocupacion: "seguridad", huella: h });
    ok((await cuenta(db, `select count(*)::int as n from public.ca_sueldos_pendientes where id = '${id}'`)) === 1, "el mismo id dos veces es un reintento: cuenta una y no choca con los topes");
    await falla(sumar(db, { bruto: 31000, ocupacion: "seguridad", huella: h }), "P0001", "la misma huella no carga dos veces la misma celda en el día");
    await sumar(db, { bruto: 30000, ocupacion: "limpieza", huella: h });
    await sumar(db, { bruto: 30000, ocupacion: "comercio", huella: h });
    await falla(sumar(db, { bruto: 30000, ocupacion: "salon", huella: h }), "P0001", "una huella carga 3 aportes por día, no 4");
    await falla(sumar(db, { bruto: 30000, ocupacion: "salon", huella: "corta" }), "P0001", "una huella con otra forma se rechaza");
    for (let i = 0; i < 30; i++) await sumar(db, { bruto: 30000, ocupacion: "transporte" });
    await falla(sumar(db, { bruto: 30000, ocupacion: "transporte" }), "P0001", "una celda recibe hasta 30 aportes por día");
    await pasarDias(db, 1);
    await publicar(db);
    await sumar(db, { bruto: 30000, ocupacion: "transporte" });
    ok(true, "al día siguiente la celda vuelve a recibir");
    ok((await cuenta(db, "select count(*)::int as n from public.ca_sueldos_huellas where dia < (now() at time zone 'utc')::date")) === 0, "la publicación borra las huellas del día cerrado");

    seccion("piso del IQR en la base");
    const diasLog = [delMes(2, 4), delMes(1, 4), delMes(1, 14)];
    const valoresLog = [...Array.from({ length: 15 }, () => 25000), 20000, 21000, 22000, 23000, 24000, 26000, 27000, 28000, 29000, 30000];
    const log: AporteCelda[] = [];
    for (const [i, b] of valoresLog.entries()) {
      const dia = diasLog[i % 3];
      log.push({ b, mes: mesDeDia(dia) });
      await sembrar(db, { bruto: b, ocupacion: "logistica", dia });
    }
    await publicar(db);
    const lg = celda(await leer(db, "service_role"), "logistica");
    ok(lg?.tramo === "20-49", "15 valores iguales no borran a los 10 reales (25 aportes: 20 a 49)", lg);
    igualQueTs(lg, celdaDe(log, 3), "y la base filtra igual que el espejo");

    seccion("ventana y moneda");
    for (let i = 0; i < 12; i++) await sembrar(db, { bruto: 30000, ocupacion: "periodismo", dia: hace(400 + (i % 3) * 20) });
    for (let i = 0; i < 10; i++) await sembrar(db, { bruto: 3000, mercado: "ve", moneda: "VEF", ocupacion: "ventas", dia: delMes(3, 1 + i) });
    for (let i = 0; i < 3; i++) await sembrar(db, { bruto: 300, mercado: "ve", moneda: "VES", ocupacion: "ventas", dia: delMes(1, 1 + i) });
    await publicar(db);
    ok(!celda(await leer(db, "service_role"), "periodismo"), "aportes de hace más de 12 meses no cuentan");
    const ve = await leer(db, "service_role", "ve");
    ok(ve.length > 0 && ve.every((f) => f.moneda === "VES"), "una sola moneda por país, la del aporte más nuevo", ve);

    seccion("checks de la tabla");
    await falla(sumar(db, { bruto: 1234, ocupacion: "mecanica" }), "23514", "un monto sin redondear se rechaza");
    await falla(sumar(db, { bruto: 0, ocupacion: "mecanica" }), "23514", "monto cero se rechaza");
    await falla(sumar(db, { bruto: 1200, experiencia: "20+", ocupacion: "mecanica" }), "23514", "experiencia inventada");
    await falla(sumar(db, { bruto: 1200, mercado: "MX", ocupacion: "mecanica" }), "23514", "mercado en mayúsculas");

    seccion("RLS y grants");
    const tablas = ["ca_sueldos_aportes", "ca_sueldos_pendientes", "ca_sueldos_huellas", "ca_sueldos_dias", "ca_sueldos_publicados", "ca_sueldos_estado"];
    for (const rol of ["anon", "authenticated"] as const) {
      for (const t of tablas) await como(db, rol, () => falla(db.query(`select * from public.${t}`), "42501", `${rol} no lee ${t}`));
      await como(db, rol, () => falla(db.query("insert into public.ca_sueldos_pendientes values ($1, 'mx', 'MXN', 'cocina', '0-2', 20000, $2, current_date)", [uuid(), MES]), "42501", `${rol} no inserta directo`));
      await como(db, rol, () => falla(db.query("select * from public.ca_sueldos_leer('mx')"), "42501", `${rol} no ejecuta ca_sueldos_leer`));
      await como(db, rol, () => falla(db.query("select * from public.ca_sueldos_paises()"), "42501", `${rol} no ejecuta ca_sueldos_paises`));
      await como(db, rol, () => falla(db.query("select public.ca_sueldos_publicar(true)"), "42501", `${rol} no ejecuta ca_sueldos_publicar`));
      await como(db, rol, () =>
        falla(db.query("select public.ca_sueldos_sumar($1, 'mx', 'MXN', 'cocina', '0-2', 20000, $2)", [uuid(), huella()]), "42501", `${rol} no ejecuta ca_sueldos_sumar`),
      );
      const ejecutables = await db.query(
        `select p.proname from pg_proc p join pg_namespace s on s.oid = p.pronamespace
         where s.nspname = 'public' and p.proname like 'ca\\_sueldos\\_%' and p.proname <> 'ca_sueldos_dos_cifras' and has_function_privilege('${rol}', p.oid, 'execute')`,
      );
      ok(ejecutables.rows.length === 0, `${rol} no ejecuta ninguna función de sueldos`, ejecutables.rows);
    }
    const paises = await como(db, "service_role", () => db.query("select * from public.ca_sueldos_paises()"));
    ok(paises.rows.map((r) => r.mercado).join(",") === "mx", "ca_sueldos_paises lista solo los países con algo publicado", paises.rows);
    const firma = await db.query("select pg_get_function_result(p.oid) as r from pg_proc p where p.proname = 'ca_sueldos_sumar'");
    ok(firma.rows[0]?.r === "void", "ca_sueldos_sumar no devuelve nada", firma.rows);
    const definer = await db.query("select p.proname, p.prosecdef, p.proconfig from pg_proc p where p.proname in ('ca_sueldos_leer', 'ca_sueldos_sumar', 'ca_sueldos_publicar', 'ca_sueldos_paises')");
    ok(definer.rows.length === 4 && definer.rows.every((r) => r.prosecdef === true && String(r.proconfig).includes("search_path=")), "lectura, carga y publicación son security definer con search_path fijo", definer.rows);

    seccion("forma de la página");
    mx = await leer(db, "service_role");
    const pais = agregadosDeFilas("mx", mx);
    ok(pais.moneda === "MXN" && pais.ocupaciones["desarrollo-software"]?.cifras !== null && pais.ocupaciones["desarrollo-software"]?.tramo === "10-19", "agregadosDeFilas arma la ocupación publicada", pais.ocupaciones["desarrollo-software"]);
    ok(pais.ocupaciones.enfermeria?.cifras === null && pais.ocupaciones.enfermeria?.tramo === "cerca", "y la que todavía no", pais.ocupaciones.enfermeria);
    ok(pais.ocupaciones["desarrollo-software"]?.porExperiencia["3-5"]?.tramo === "10-19", "y sus rangos de experiencia");
    ok(!JSON.stringify(pais).match(/"(total|n)":/), "la forma de la página no tiene cuenta exacta");
  } finally {
    await db.close();
  }
}

// ─────────────────────────── textos ───────────────────────────

const TRATOS: readonly Trato[] = ["tu", "usted", "vos"];
const LOCALES: Partial<Record<Idioma, string[]>> = { es: ["es-MX", "es-AR"], de: ["de-DE", "de-CH"], fr: ["fr-FR", "fr-CA"], zh: ["zh-TW"], pt: ["pt-BR", "pt-PT"], en: ["en-US"] };
// Palabras que se escriben igual que en español en ese idioma (marca, préstamo o cognado exacto).
const IGUALES = new Set([
  "pt:ocupaciones.marketing",
  "pt:ocupaciones.recursos-humanos",
  "pt:ocupaciones.medicina",
  "pt:experienciasCortas.0-2",
  "pt:experienciasCortas.3-5",
  "pt:experienciasCortas.6-10",
  "pt:pagina.colMediana",
  "pt:pagina.entre",
  "pt:aporte.ceja",
  "en:ocupaciones.marketing",
  "it:ocupaciones.cocina",
  "it:pagina.colMediana",
  "nl:ocupaciones.marketing",
  "cs:ocupaciones.marketing",
  "ja:aporte.cargando",
  "*:pagina.entre",
]);

function hojas(x: unknown, ruta = ""): [string, string][] {
  if (typeof x === "string") return [[ruta, x]];
  if (Array.isArray(x)) return x.flatMap((v, i) => hojas(v, `${ruta}[${i}]`));
  if (x && typeof x === "object") return Object.entries(x).flatMap(([k, v]) => hojas(v, ruta ? `${ruta}.${k}` : k));
  return [];
}

// {enPais} y {pais} son el mismo dato: en CJK el país va suelto y la partícula la pone la frase.
const marcas = (s: string) => [...new Set([...s.matchAll(/\{(\w+)\}/g)].map((m) => (m[1] === "enPais" ? "pais" : m[1])))].sort().join(",");

function textos() {
  seccion("textos en diez idiomas");
  const es = new Map(hojas(textosSueldos("es", "tu")));
  for (const idioma of IDIOMAS) {
    ok(Boolean(DICCIONARIOS_SUELDOS[idioma]), `hay diccionario ${idioma}`);
    for (const trato of TRATOS) {
      for (const locale of LOCALES[idioma] ?? [undefined]) {
        if (trato === "vos" && idioma === "es" && locale !== "es-AR") continue;
        const t: TextosSueldos = textosSueldos(idioma, trato, locale);
        ok(OCUPACIONES.every((o) => t.ocupaciones[o]?.trim()), `${idioma}/${trato}: todas las ocupaciones con nombre`);
        ok(EXPERIENCIAS.every((e) => t.experiencias[e]?.trim() && t.experienciasCortas[e]?.trim()), `${idioma}/${trato}: todos los rangos con nombre`);
        for (const [ruta, texto] of hojas(t)) {
          ok(texto.trim().length > 0, `${idioma}/${trato} ${ruta} vacío`);
          const base = es.get(ruta);
          if (base !== undefined) ok(marcas(texto) === marcas(base), `${idioma}/${trato} ${ruta}: marcadores distintos al español`, [marcas(texto), marcas(base)]);
          const prob = problemasDeTexto(texto.replace(/\{\w+\}/g, "X"), idioma, trato, locale);
          ok(prob.length === 0, `${idioma}/${trato}${locale ? `/${locale}` : ""} ${ruta}`, `${prob.join("; ")}: ${texto}`);
          if (idioma !== "es" && trato === "tu" && base === texto && /\p{L}{3}/u.test(texto)) {
            ok(IGUALES.has(`${idioma}:${ruta}`) || IGUALES.has(`*:${ruta}`), `${idioma} ${ruta} igual al español (¿sin traducir?)`, texto);
          }
        }
      }
    }
  }
  const nombres = new Set(OCUPACIONES.map((o) => textosSueldos("es", "tu").ocupaciones[o]));
  ok(nombres.size === OCUPACIONES.length, "ninguna ocupación repite nombre");
}

function slugs() {
  seccion("slugs");
  const todos = Object.values(SLUG_SUELDOS);
  ok(new Set(todos).size === todos.length, "un slug por idioma, sin repetir");
  const reservados = new Set<string>([...PAGINAS_GLOBALES, ...PAGINAS_MERCADO, ...Object.values(SLUG_MUNDO), "og", "embed", "informes", "planillas", "novedades"]);
  ok(todos.every((s) => !reservados.has(s)), "no chocan con páginas del sitio");
  const choques: string[] = [];
  for (const m of registro.mercados("interno")) {
    const slug = SLUG_SUELDOS[m.idioma];
    if (registro.calculadora(m.codigo, slug)) choques.push(`${m.codigo}/${slug}`);
  }
  ok(choques.length === 0, "ninguna calculadora del registro usa el slug", choques);
  const ar = readdirSync(path.join(raiz, "src", "app", "(ar)"));
  ok(ar.includes("sueldos-reales") && !ar.includes("sueldos-reales-ar"), "calcular.ar tiene /sueldos-reales");
}

async function main() {
  estaticos();
  reglas();
  estadistica();
  textos();
  slugs();
  const PGlite = cargarPGlite();
  if (PGlite) await postgres(PGlite);
  else console.warn("\n  (sin @electric-sql/pglite: se saltea la parte de Postgres)");
  console.log(`\n${fallas ? "✗" : "✓"} check_sueldos: ${pasadas} pasadas, ${fallas} fallas`);
  if (fallas) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
