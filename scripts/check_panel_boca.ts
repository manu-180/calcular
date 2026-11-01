// «Boca en boca» del panel: ca_panel_boca (20261024200000) sobre un Postgres de verdad (PGlite) con
// eventos sembrados a mano, y cada número contra la cuenta hecha a mano. También armarBoca (datos.ts)
// y el veredicto del A/B de la línea-puente (src/lib/panel/boca.ts).
//
// Correr con: npx tsx scripts/check_panel_boca.ts
// PGlite se busca igual que en check_panel_sql: node_modules del repo o PGLITE_DIR. Sin PGlite corre
// sólo la parte de TypeScript y lo avisa.

import { createRequire } from "node:module";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analizarPuente, coeficiente, diferencia, separarSeccion, wilson, MIN_EXPOSICIONES } from "../src/lib/panel/boca";

type Fila = Record<string, unknown>;
interface Db {
  query(sql: string, params?: unknown[]): Promise<{ rows: Fila[] }>;
  exec(sql: string): Promise<unknown>;
  close(): Promise<void>;
}
type ModDatos = typeof import("../src/lib/panel/datos");

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirMig = path.join(raiz, "supabase", "migrations");
const migraciones = readdirSync(dirMig)
  .filter((f) => f.endsWith(".sql") && !f.includes("_cron"))
  .sort()
  .map((f) => ({ f, sql: readFileSync(path.join(dirMig, f), "utf8") }));

let pasadas = 0;
let fallas = 0;
function ok(cond: boolean, que: string, detalle?: unknown) {
  if (cond) pasadas++;
  else {
    fallas++;
    console.error(`  ✗ ${que}${detalle === undefined ? "" : ` → ${typeof detalle === "string" ? detalle : JSON.stringify(detalle)}`}`);
  }
}
function canon(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(canon);
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, canon((v as Fila)[k])]));
  return v;
}
function igual(real: unknown, esperado: unknown, que: string) {
  const a = JSON.stringify(canon(real));
  const b = JSON.stringify(canon(esperado));
  ok(a === b, que, `esperaba ${b}, vino ${a}`);
}
const seccion = (n: string) => console.log(`\n· ${n}`);

function cargarPGlite(): (new () => Db) | null {
  for (const base of [raiz, process.env.PGLITE_DIR].filter((b): b is string => !!b)) {
    try {
      const mod = createRequire(path.join(base, "package.json"))("@electric-sql/pglite") as { PGlite: new () => Db };
      if (mod.PGlite) return mod.PGlite;
    } catch {
      continue;
    }
  }
  return null;
}

function cargarDatos(): ModDatos {
  const req = createRequire(path.join(raiz, "package.json"));
  const so = req.resolve("server-only");
  req.cache[so] = { id: so, filename: so, loaded: true, exports: {} } as NodeJS.Module;
  return req(path.join(raiz, "src/lib/panel/datos.ts")) as ModDatos;
}

const SUPABASE = `
  create role anon nologin noinherit;
  create role authenticated nologin noinherit;
  create role service_role nologin noinherit bypassrls;
  create role dueno nologin noinherit bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;
  grant usage on schema auth to anon, authenticated, service_role, dueno;
  grant execute on function auth.uid() to anon, authenticated, service_role, dueno;
  grant select, references on auth.users to dueno;
  grant usage on schema public to anon, authenticated, service_role;
  grant usage, create on schema public to dueno;
  alter default privileges for role dueno in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges for role dueno in schema public grant all on functions to anon, authenticated, service_role;
`;

async function aplicar(db: Db) {
  for (const m of migraciones) {
    await db.exec("set role dueno");
    try {
      await db.exec(m.sql);
    } catch (e) {
      throw new Error(`${m.f}: ${(e as Error).message}`);
    } finally {
      await db.exec("reset role");
    }
  }
}

async function como<T>(db: Db, rol: "anon" | "service_role", fn: () => Promise<T>): Promise<T> {
  await db.exec(`set role ${rol}`);
  try {
    return await fn();
  } finally {
    await db.exec("reset role");
  }
}

const id = (p: string, i: number) => `${p}-0000-4000-8000-${String(i).padStart(12, "0")}`;
const P = (i: number) => id("aaaaaaaa", i);
const S = (i: number) => id("11111111", i);
const V = (i: number) => id("00000000", i);
const DESDE = "2026-09-01T00:00:00-03:00";
const HASTA = "2026-09-08T00:00:00-03:00";

async function sembrar(db: Db) {
  const ev = (ts: string, vid: number, sid: number, vista: number | null, tipo: string, pathE: string, sitio: string, mercado: string, props: object) =>
    `('${ts}-03', '${P(vid)}', '${S(sid)}', ${vista === null ? "null" : `'${V(vista)}'`}, '${tipo}', '${pathE}', '${sitio}', '${mercado}', '${JSON.stringify(props)}')`;
  const vi = (i: number, ts: string, vid: number, sid: number, pathV: string, sitio: string, mercado: string, uso: boolean, refHost: string | null = null) =>
    `('${V(i)}', '${ts}-03', '${P(vid)}', '${S(sid)}', '${pathV}', ${refHost ? `'${refHost}'` : "null"}, ${uso}, '${sitio}', '${mercado}')`;
  await db.exec(`
    insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, uso_calc, sitio, mercado) values
      ${vi(1, "2026-09-02 10:00", 1, 1, "/sueldo-neto", "ar", "ar", true)},
      ${vi(10, "2026-09-02 12:00", 4, 10, "/sueldo-neto", "ar", "ar", false, "wa.me")},
      ${vi(11, "2026-09-02 12:05", 4, 10, "/aguinaldo", "ar", "ar", true, "calcular.ar")},
      ${vi(12, "2026-09-03 09:00", 5, 11, "/sueldo-neto", "ar", "ar", false)},
      ${vi(13, "2026-09-05 15:00", 6, 12, "/mx/sueldo-neto", "intl", "mx", true)},
      ${vi(14, "2026-09-06 18:00", 7, 13, "/vacaciones", "ar", "ar", false)},
      ${vi(20, "2026-09-04 10:00", 8, 20, "/mx/sueldo-neto", "intl", "mx", true)},
      ${vi(23, "2026-09-04 10:10", 8, 20, "/mx/aguinaldo", "intl", "mx", true)},
      ${vi(21, "2026-09-04 11:00", 9, 21, "/mx/sueldo-neto", "intl", "mx", true)},
      ${vi(22, "2026-09-04 12:00", 10, 22, "/mx/sueldo-neto", "intl", "mx", true)},
      ${vi(30, "2026-09-05 08:00", 11, 30, "/mx/embed/sueldo-neto", "intl", "mx", true, "blog.ejemplo.com")},
      ${vi(31, "2026-09-05 08:30", 12, 31, "/mx/embed/sueldo-neto", "intl", "mx", false, "blog.ejemplo.com")},
      ${vi(32, "2026-09-05 09:00", 13, 32, "/co/embed/liquidacion", "intl", "co", false)},
      ${vi(40, "2026-09-06 20:00", 14, 40, "/indemnizacion", "ar", "ar", true, "wa.me")},
      ${vi(41, "2026-09-06 21:00", 15, 41, "/aguinaldo", "ar", "ar", false, "l.facebook.com")},
      ${vi(42, "2026-09-07 07:00", 16, 42, "/aguinaldo", "ar", "ar", false, "www.google.com")};
    insert into public.ca_eventos (ts, vid, sid, vista_id, tipo, path, sitio, mercado, props) values
      ${ev("2026-08-20 10:00", 3, 3, null, "compartir", "/mx/sueldo-neto", "intl", "mx", { canal: "x", origen: "calculadora", ref: "cccc1111" })},
      ${ev("2026-09-02 10:01", 1, 1, 1, "compartir", "/sueldo-neto", "ar", "ar", { canal: "whatsapp", origen: "calculadora", ref: "aaaa1111" })},
      ${ev("2026-09-03 11:00", 1, 2, null, "compartir", "/aguinaldo", "ar", "ar", { canal: "copiar", origen: "calculadora", ref: "aaaa2222" })},
      ${ev("2026-09-04 12:01", 10, 22, 22, "compartir", "/mundo", "intl", "global", { canal: "nativo", origen: "mundo", ref: "bbbb1111", v: "sin" })},
      ${ev("2026-09-02 12:00", 4, 10, 10, "llegada", "/sueldo-neto", "ar", "ar", { ref: "aaaa1111", origen: "c", nuevo: true })},
      ${ev("2026-09-03 09:00", 5, 11, 12, "llegada", "/sueldo-neto", "ar", "ar", { ref: "aaaa1111", origen: "c", nuevo: false })},
      ${ev("2026-09-03 12:00", 1, 5, null, "llegada", "/sueldo-neto", "ar", "ar", { ref: "aaaa1111", origen: "c", nuevo: false })},
      ${ev("2026-09-05 15:00", 6, 12, 13, "llegada", "/mx/sueldo-neto", "intl", "mx", { ref: "cccc1111", nuevo: true })},
      ${ev("2026-09-06 18:00", 7, 13, 14, "llegada", "/vacaciones", "ar", "ar", { ref: "zzzz9999", origen: "c", nuevo: true })},
      ${ev("2026-09-04 10:01", 8, 20, 20, "puente_visto", "/mx/sueldo-neto", "intl", "mx", { v: "con" })},
      ${ev("2026-09-04 10:02", 8, 20, 20, "puente_visto", "/mx/sueldo-neto", "intl", "mx", { v: "con" })},
      ${ev("2026-09-04 10:05", 8, 20, 20, "puente_clic", "/mx/sueldo-neto", "intl", "mx", { v: "con" })},
      ${ev("2026-09-04 11:01", 9, 21, 21, "puente_visto", "/mx/sueldo-neto", "intl", "mx", { v: "con" })},
      ${ev("2026-09-04 12:00", 10, 22, 22, "puente_visto", "/mx/sueldo-neto", "intl", "mx", { v: "sin" })},
      ${ev("2026-09-05 10:00", 11, 30, null, "afiliado_clic", "/mundo", "intl", "global", { socio: "wise", pais: "MX" })},
      ${ev("2026-09-05 10:01", 12, 31, null, "afiliado_clic", "/mundo", "intl", "global", { socio: "wise", pais: "MX" })};
    insert into public.ca_sueldos_aportes (id, mercado, moneda, ocupacion, experiencia, bruto_mensual, mes) values
      ('${id("cccccccc", 1)}', 'mx', 'MXN', 'contador', '3-5', 25000, '2026-09'),
      ('${id("cccccccc", 2)}', 'mx', 'MXN', 'contador', '0-2', 18000, '2026-09'),
      ('${id("cccccccc", 3)}', 'ar', 'ARS', 'contador', '0-2', 1200000, '2026-08');
    insert into public.ca_sueldos_pendientes (id, mercado, moneda, ocupacion, experiencia, bruto_mensual, mes, dia) values
      ('${id("dddddddd", 1)}', 'mx', 'MXN', 'contador', '3-5', 26000, '2026-09', '2026-09-03');
    insert into public.ca_sueldos_publicados (mercado, ocupacion, experiencia, moneda, tramo, p25, p50, p75, desde, hasta) values
      ('mx', 'contador', '3-5', 'MXN', '10-19', 20000, 25000, 30000, '2026-01', '2026-09'),
      ('mx', 'contador', '0-2', 'MXN', 'cerca', null, null, null, null, null);
  `);
}

async function boca(db: Db, mercado: string | null = null): Promise<Record<string, any>> {
  const { rows } = await como(db, "service_role", () =>
    db.query("select public.ca_panel_boca($1, $2, $3) as b", [DESDE, HASTA, mercado]),
  );
  return rows[0].b as Record<string, any>;
}

const por = (lista: Fila[], clave: string) => Object.fromEntries(lista.map((x) => [String(x[clave]), x]));

async function probarSql(PGlite: new () => Db, mod: ModDatos) {
  const db = new PGlite();
  try {
    await db.exec(SUPABASE);
    await aplicar(db);
    await aplicar(db);
    ok(true, "las migraciones (con la de boca en boca) se aplican dos veces");
    await sembrar(db);

    seccion("permisos");
    try {
      await como(db, "anon", () => db.query("select public.ca_panel_boca(now() - interval '1 day', now())"));
      ok(false, "anon no ejecuta ca_panel_boca");
    } catch (e) {
      ok((e as { code?: string }).code === "42501", "anon no ejecuta ca_panel_boca", (e as Error).message);
    }

    seccion("resumen y coeficiente");
    const b = await boca(db);
    igual(
      b.resumen,
      { compartidos: 3, compartidosAntes: 0, personas: 2, llegadas: 4, nuevas: 3, usaron: 2, nuevasUsaron: 2, propias: 1, sinCompartido: 1 },
      "resumen: la llegada propia no cuenta y la de un compartido de antes del período sí",
    );
    const datos = mod.armarBoca(b, null);
    igual(coeficiente(datos.resumen), 1.5, "coeficiente = 3 llegadas nuevas / 2 personas que compartieron");

    seccion("serie");
    igual(b.serie.length, 7, "un punto por día del período");
    igual(
      b.serie.map((p: Fila) => [p.compartidos, p.llegadas, p.nuevas]),
      [[0, 0, 0], [1, 1, 1], [1, 1, 0], [1, 0, 0], [0, 1, 1], [0, 1, 1], [0, 0, 0]],
      "compartidos y llegadas por día, en hora argentina",
    );

    seccion("canal y origen");
    const can = por(b.canales, "clave");
    igual([can.whatsapp?.compartidos, can.whatsapp?.llegadas, can.whatsapp?.nuevas, can.whatsapp?.usaron], [1, 2, 1, 1], "whatsapp: 1 compartido, 2 llegadas cruzadas por ref");
    igual([can.x?.compartidos, can.x?.llegadas], [0, 1], "x: el compartido es de agosto pero la llegada cae en el período");
    igual([can.otro?.compartidos, can.otro?.llegadas], [0, 1], "la llegada sin compartido medido va a «otro»");
    igual([can.copiar?.compartidos, can.nativo?.compartidos], [1, 1], "copiar y nativo");
    const ori = por(b.origenes, "clave");
    igual([ori.calculadora?.compartidos, ori.calculadora?.llegadas, ori.mundo?.compartidos], [2, 4, 1], "origen: el código corto de la llegada se expande");
    const sec = separarSeccion(datos.origenes, "mundo");
    igual([sec.nueva.compartidos, sec.resto.compartidos, sec.nueva.llegadas + sec.resto.llegadas], [1, 2, 4], "la sección nueva aparte del resto, sin perder llegadas");

    seccion("páginas, mercados y top");
    const pag = Object.fromEntries((b.paginas as Fila[]).map((p) => [`${p.path}|${p.mercado}`, p]));
    igual([pag["/sueldo-neto|ar"]?.compartidos, pag["/sueldo-neto|ar"]?.llegadas, pag["/sueldo-neto|ar"]?.personas], [1, 2, 1], "sueldo neto trajo 2");
    igual([pag["/mx/sueldo-neto|mx"]?.compartidos, pag["/mx/sueldo-neto|mx"]?.llegadas], [0, 1], "la llegada se anota en la página del compartido");
    igual(pag["/vacaciones|ar"]?.llegadas, 1, "sin compartido, en la página a la que llegó");
    const mer = por(b.mercados, "mercado");
    igual([mer.ar?.compartidos, mer.ar?.llegadas, mer.mx?.llegadas, mer.global?.compartidos], [2, 3, 1, 1], "por mercado");
    igual(b.top.map((t: Fila) => [t.ref, t.llegadas, t.canal]), [["aaaa1111", 2, "whatsapp"], ["cccc1111", 1, "x"]], "top de compartidos: sin el que no tiene compartido medido");
    ok(!JSON.stringify(b.top).includes(P(1)), "el top no lleva vid de nadie");

    seccion("A/B de la línea-puente");
    const pu = por(b.puente, "v");
    igual(
      [pu.con?.exposiciones, pu.con?.personas, pu.con?.clics, pu.con?.siguieron, pu.con?.compartieron],
      [2, 2, 1, 1, 0],
      "con: dos vistas (la repetida cuenta una), un clic, uno siguió usando",
    );
    igual([pu.sin?.exposiciones, pu.sin?.compartieron, pu.sin?.siguieron], [1, 1, 0], "sin: compartió desde la vista expuesta");

    seccion("embebidos, afiliados, redes y sueldos");
    igual([b.embebidos.vistas, b.embebidos.visitantes, b.embebidos.usos], [3, 3, 1], "vistas de /<m>/embed/");
    igual(b.embebidos.sitios.map((s: Fila) => [s.host, s.vistas]), [["blog.ejemplo.com", 2], ["", 1]], "por sitio que la insertó");
    igual(b.embebidos.calculadoras.map((c: Fila) => [c.path, c.vistas, c.sitios]), [["/mx/embed/sueldo-neto", 2, 1], ["/co/embed/liquidacion", 1, 0]], "por calculadora");
    igual(b.afiliados.map((a: Fila) => [a.socio, a.pais, a.clics, a.personas]), [["wise", "MX", 2, 2]], "afiliados por socio y país");
    igual(
      b.sociales.map((s: Fila) => [s.fuente, s.sesiones, s.usaron]).sort(),
      [["Facebook", 1, 0], ["WhatsApp", 1, 1]],
      "redes sin código: la sesión que llegó con código no se cuenta dos veces y Google no es red",
    );
    igual(
      { aportes: b.sueldos?.aportes, celdas: b.sueldos?.celdas },
      { aportes: [{ mercado: "mx", aportes: 2, pendientes: 1 }], celdas: [{ mercado: "mx", publicadas: 1, cerca: 1, ocupaciones: 1 }] },
      "sueldos: sólo cuentas, por país y de los meses del período",
    );
    ok(!/25000|26000|18000|1200000/.test(JSON.stringify(b)), "ningún monto de sueldo sale de la base");

    seccion("filtro de mercado");
    const mx = await boca(db, "mx");
    igual([mx.resumen.compartidos, mx.resumen.llegadas, mx.resumen.nuevas], [0, 1, 1], "mx: la llegada de mx con su compartido de agosto");
    igual(mx.embebidos.vistas, 2, "mx: sólo sus embebidos");
    igual(mx.puente.length, 2, "mx: el A/B corre en mx");
    const ar = await boca(db, "ar");
    igual([ar.resumen.compartidos, ar.resumen.llegadas, ar.puente.length, ar.afiliados.length], [2, 3, 0, 0], "ar: nada de calcularya");

    seccion("por hora y datos.ts");
    const { rows } = await como(db, "service_role", () =>
      db.query("select public.ca_panel_boca($1, $2) as b", ["2026-09-02T00:00:00-03:00", "2026-09-03T00:00:00-03:00"]),
    );
    const h = rows[0].b as Record<string, any>;
    igual([h.granularidad, h.serie.length, h.serie[10].compartidos, h.serie[12].llegadas], ["hora", 24, 1, 1], "un día = 24 horas");
    const armado = mod.armarBoca(b, null);
    igual(armado.paginas.find((p) => p.path === "/mx/sueldo-neto")?.titulo, "Sueldo neto · México", "título con país mirando todos");
    igual(mod.armarBoca(mx, "mx").top[0]?.titulo, "Sueldo neto", "título sin país con el país elegido");
    igual(armado.embebidos.calculadoras[0].titulo, "Sueldo neto · México", "el embed se titula como su calculadora");
    igual(armado.sueldos?.publicadoEl, null, "sin publicación todavía");

    // Sólo la de boca en boca: 20261023130000 vuelve a poner el CHECK sin afiliado_clic y no se puede
    // re-aplicar sobre una base que ya tiene esos eventos (la arregla 20261023170000 al seguir).
    await db.exec("set role dueno");
    try {
      await db.exec(migraciones.find((m) => m.f.endsWith("_ca_panel_boca.sql"))!.sql);
    } finally {
      await db.exec("reset role");
    }
    igual((await boca(db)).resumen.llegadas, 4, "se re-aplica sobre una base con datos");
  } finally {
    await db.close();
  }
}

function probarAnalisis() {
  seccion("análisis del A/B (boca.ts)");
  const [l, u] = wilson(5, 50);
  ok(l > 0.04 && l < 0.05 && u > 0.21 && u < 0.22, "Wilson 5/50", [l, u]);
  const d = diferencia(30, 100, 30, 100);
  ok(d.d === 0 && d.ic[0] < 0 && d.ic[1] > 0, "diferencia nula cruza el cero", d);
  const brazo = (v: "con" | "sin", n: number, sig: number, comp = 5) => ({ v, exposiciones: n, personas: n, clics: v === "con" ? 4 : 0, compartieron: comp, siguieron: sig });
  igual(analizarPuente([]).veredicto.titulo, "Faltan datos para comparar", "sin datos no hay veredicto");
  igual(analizarPuente([brazo("con", 20, 10), brazo("sin", 80, 10)]).veredicto.titulo, "Faltan datos para comparar", `menos de ${MIN_EXPOSICIONES} en un brazo: faltan datos`);
  igual(analizarPuente([brazo("con", 200, 60), brazo("sin", 200, 58)]).veredicto.titulo, "Sin diferencia clara todavía", "diferencia chica: no se declara ganador");
  igual(analizarPuente([brazo("con", 400, 60), brazo("sin", 400, 140)]).veredicto.tono, "alerta", "baja clara del uso: alerta");
  igual(analizarPuente([brazo("con", 400, 160), brazo("sin", 400, 80)]).veredicto.tono, "logro", "suba clara: logro");
  igual(coeficiente({ personas: 0, nuevas: 3 }), null, "sin nadie que compartió no hay coeficiente");
}

async function main() {
  probarAnalisis();
  const PGlite = cargarPGlite();
  if (!PGlite) console.warn("\n⚠️  PGlite no está instalado: se saltó la prueba sobre Postgres.");
  else await probarSql(PGlite, cargarDatos());
  console.log(`\n${fallas === 0 ? "✅" : "❌"} check_panel_boca: ${pasadas} ok, ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("❌ check_panel_boca se cortó:", (e as Error).message ?? e, (e as { where?: string }).where ?? "");
  process.exit(1);
});
