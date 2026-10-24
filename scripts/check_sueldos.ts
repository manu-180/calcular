// Gate de «Sueldos reales»: k-anonimato (con 9 aportes no se publica nada, con 10 sí), filtro de
// atípicos, espejo TypeScript = SQL, validación del endpoint, RLS (anon no lee ni escribe la tabla
// cruda), textos en los diez idiomas y slugs sin choques. La parte de Postgres corre sobre PGlite con
// los roles de Supabase simulados, igual que check_opiniones.ts.
//
// Correr con: npx tsx scripts/check_sueldos.ts

import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DICCIONARIOS_SUELDOS, textosSueldos, type TextosSueldos } from "../src/motor/i18n/sueldos";
import { SLUG_MUNDO } from "../src/motor/mundo/rutas";
import { PAGINAS_GLOBALES, PAGINAS_MERCADO } from "../src/motor/paginas";
import { EXPERIENCIAS, K, OCUPACIONES } from "../src/motor/sueldos/catalogo";
import { cifrasDe, percentil, percentilAproximado, sinAtipicos } from "../src/motor/sueldos/estadistica";
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
type Rol = "anon" | "authenticated" | "service_role";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(raiz, "supabase", "migrations");
const migraciones = readdirSync(dir)
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .map((f) => ({ f, sql: readFileSync(path.join(dir, f), "utf8") }));
const propia = migraciones.find((m) => /_ca_sueldos\.sql$/.test(m.f));

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

function estadistica() {
  seccion("estadística (espejo de la base)");
  ok(percentil([1, 2, 3, 4], 0.5) === 2.5 && percentil([10], 0.75) === 10, "percentil como percentile_cont");
  const nueve = Array.from({ length: 9 }, (_, i) => 1000 + i * 100);
  ok(cifrasDe(nueve) === null, "con 9 aportes no se publica");
  ok(cifrasDe([...nueve, 1900])?.n === 10, "con 10 sí");
  const quince = Array.from({ length: 15 }, (_, i) => 20000 + i * 1000);
  const conTroll = [...quince, 1_400_000];
  ok(sinAtipicos(conTroll).length === 15, "un sueldo absurdo queda fuera");
  ok(cifrasDe(conTroll)?.p50 === cifrasDe(quince)?.p50, "y no mueve la mediana", [cifrasDe(conTroll), cifrasDe(quince)]);
  const nueveYTroll = [...nueve, 9_000_000];
  ok(cifrasDe(nueveYTroll) === null, "un atípico no completa una celda: 9 buenos y 1 absurdo no publican");
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

async function aplicar(db: Db, soloPropia: boolean) {
  for (const m of soloPropia ? [propia!] : migraciones) {
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
const MES = mesDe(new Date());
const VIEJO = mesDe(new Date(Date.now() - 400 * 86_400_000));

async function aportar(db: Db, o: { mercado?: string; ocupacion?: string; experiencia?: string; bruto: number; mes?: string; id?: string; moneda?: string }) {
  return como(db, "service_role", () =>
    db.query("select * from public.ca_sueldos_aportar($1, $2, $3, $4, $5, $6, $7)", [o.id ?? uuid(), o.mercado ?? "mx", o.moneda ?? "MXN", o.ocupacion ?? "enfermeria", o.experiencia ?? "3-5", o.bruto, o.mes ?? MES]),
  );
}

async function leer(db: Db, rol: Rol, mercado = "mx") {
  return (await como(db, rol, () => db.query("select * from public.ca_sueldos_agregados($1)", [mercado]))).rows as unknown as FilaAgregada[];
}

const celda = (filas: FilaAgregada[], ocupacion: string, experiencia: string | null = null) => filas.find((f) => f.ocupacion === ocupacion && f.experiencia === experiencia);

async function postgres(PGlite: new () => Db) {
  const db = new PGlite();
  try {
    await db.exec(SUPABASE);
    await aplicar(db, false);
    await aplicar(db, true);
    ok(true, "las migraciones se aplican y la de sueldos se puede volver a correr");

    seccion("k-anonimato");
    const valores: number[] = [];
    for (let i = 0; i < 9; i++) {
      const b = dosCifras(18000 + i * 1500);
      valores.push(b);
      await aportar(db, { bruto: b, experiencia: i < 5 ? "3-5" : "6-10" });
    }
    let filas = await leer(db, "anon");
    let c = celda(filas, "enfermeria");
    ok(Number(c?.total) === 9 && c?.n === null && c?.p50 === null, "con 9 aportes: la cuenta sí, las cifras no", c);
    ok(filas.every((f) => f.p25 === null && f.p75 === null && f.desde === null), "con 9 aportes ninguna fila trae un monto");
    const r10 = await aportar(db, { bruto: 33000, experiencia: "3-5" });
    valores.push(33000);
    c = (r10.rows as unknown as FilaAgregada[]).find((f) => f.ocupacion === "enfermeria" && f.experiencia === null);
    ok(c?.n === 10, "con el décimo aporte se publica, y aportar lo devuelve al instante", c);
    const esperado = cifrasDe(valores)!;
    ok(Number(c?.p25) === esperado.p25 && Number(c?.p50) === esperado.p50 && Number(c?.p75) === esperado.p75, "las cifras de la base son las del espejo en TypeScript", { base: c, ts: esperado });
    filas = await leer(db, "anon");
    const exp35 = celda(filas, "enfermeria", "3-5");
    const exp610 = celda(filas, "enfermeria", "6-10");
    ok(Number(exp35?.total) === 6 && exp35?.p50 === null, "por experiencia también hace falta K (6 aportes: nada)", exp35);
    ok(Number(exp610?.total) === 4 && exp610?.p50 === null, "4 aportes en otro rango: nada", exp610);
    ok(c?.desde === MES && c?.hasta === MES, "el período es el mes, nunca un día");

    seccion("idempotencia y reintentos");
    const id = uuid();
    await aportar(db, { id, bruto: 21000, ocupacion: "cocina" });
    await aportar(db, { id, bruto: 21000, ocupacion: "cocina" });
    ok(Number(celda(await leer(db, "anon"), "cocina")?.total) === 1, "el mismo id dos veces cuenta una");

    seccion("atípicos");
    const buenos: number[] = [];
    for (let i = 0; i < 14; i++) {
      const b = dosCifras(40000 + i * 2000);
      buenos.push(b);
      await aportar(db, { bruto: b, ocupacion: "desarrollo-software" });
    }
    await aportar(db, { bruto: 1_400_000, ocupacion: "desarrollo-software" });
    const dev = celda(await leer(db, "anon"), "desarrollo-software");
    const espejo = cifrasDe([...buenos, 1_400_000])!;
    ok(Number(dev?.n) === 14 && Number(dev?.total) === 14, "el atípico no entra en la cuenta", dev);
    ok(Number(dev?.p50) === espejo.p50 && Number(dev?.p50) === cifrasDe(buenos)!.p50, "ni mueve la mediana", { base: dev?.p50, ts: espejo.p50 });
    for (let i = 0; i < 9; i++) await aportar(db, { bruto: 25000, ocupacion: "limpieza" });
    await aportar(db, { bruto: 900_000, ocupacion: "limpieza" });
    const limp = celda(await leer(db, "anon"), "limpieza");
    ok(limp?.n === null && Number(limp?.total) === 9, "9 buenos y un absurdo: no se publica", limp);

    seccion("ventana y moneda");
    for (let i = 0; i < 12; i++) await aportar(db, { bruto: 30000, ocupacion: "ventas", mes: VIEJO });
    ok(!celda(await leer(db, "anon"), "ventas"), "aportes de hace más de 12 meses no cuentan");
    for (let i = 0; i < 10; i++) await aportar(db, { bruto: 3000, mercado: "ve", moneda: "VEF", ocupacion: "ventas", mes: VIEJO });
    for (let i = 0; i < 3; i++) await aportar(db, { bruto: 300, mercado: "ve", moneda: "VES", ocupacion: "ventas" });
    const ve = await leer(db, "anon", "ve");
    ok(ve.every((f) => f.moneda === "VES"), "una sola moneda por país, la del aporte más nuevo", ve);

    seccion("checks de la tabla");
    await falla(aportar(db, { bruto: 1234 }), "23514", "un monto sin redondear se rechaza");
    await falla(aportar(db, { bruto: 0 }), "23514", "monto cero se rechaza");
    await falla(aportar(db, { bruto: 1200, experiencia: "20+" }), "23514", "experiencia inventada");
    await falla(aportar(db, { bruto: 1200, mes: "2026-13" }), "23514", "mes inválido");
    await falla(aportar(db, { bruto: 1200, mercado: "MX" }), "23514", "mercado en mayúsculas");

    seccion("RLS y grants");
    for (const rol of ["anon", "authenticated"] as const) {
      await como(db, rol, () => falla(db.query("select * from public.ca_sueldos_aportes"), "42501", `${rol} no lee la tabla cruda`));
      await como(db, rol, () =>
        falla(db.query("insert into public.ca_sueldos_aportes values ($1, 'mx', 'MXN', 'cocina', '0-2', 20000, $2)", [uuid(), MES]), "42501", `${rol} no inserta directo`),
      );
      await como(db, rol, () => falla(db.query("delete from public.ca_sueldos_aportes"), "42501", `${rol} no borra`));
      await como(db, rol, () =>
        falla(db.query("select * from public.ca_sueldos_aportar($1, 'mx', 'MXN', 'cocina', '0-2', 20000, $2)", [uuid(), MES]), "42501", `${rol} no ejecuta aportar`),
      );
      const lectura = await leer(db, rol);
      ok(lectura.length > 0, `${rol} lee los agregados`);
    }
    const crudo = await como(db, "service_role", () => db.query("select count(*)::int as n from public.ca_sueldos_aportes"));
    ok(Number(crudo.rows[0]?.n) > 0, "service_role (el endpoint) lee la tabla pese a FORCE RLS");
    const cols = await db.query("select column_name from information_schema.columns where table_schema = 'public' and table_name = 'ca_sueldos_aportes' order by ordinal_position");
    ok(cols.rows.map((r) => r.column_name).join(",") === "id,mercado,moneda,ocupacion,experiencia,bruto_mensual,mes", "la tabla tiene solo las 7 columnas", cols.rows);
    const definer = await db.query("select p.prosecdef, p.proconfig from pg_proc p where p.proname = 'ca_sueldos_agregados'");
    ok(definer.rows[0]?.prosecdef === true && String(definer.rows[0]?.proconfig).includes("search_path="), "la lectura pública es security definer con search_path fijo");

    seccion("forma de la página");
    const pais = agregadosDeFilas("mx", await leer(db, "anon"));
    ok(pais.moneda === "MXN" && pais.ocupaciones.enfermeria?.cifras?.n === 10 && pais.ocupaciones.cocina?.cifras === null, "agregadosDeFilas arma la ocupación publicada y la que falta", pais.ocupaciones.enfermeria);
    ok(pais.ocupaciones.enfermeria?.porExperiencia["3-5"]?.total === 6, "y sus rangos de experiencia");
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
  "pt:pagina.falta1",
  "pt:aporte.ceja",
  "en:ocupaciones.marketing",
  "it:ocupaciones.cocina",
  "it:pagina.colMediana",
  "nl:ocupaciones.marketing",
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
