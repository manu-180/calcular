// Verificación de supabase/migrations (medición propia, cuentas, compras y ca_panel) sobre un
// Postgres de verdad: PGlite (Postgres en WASM) con los roles de Supabase (anon, authenticated,
// service_role) y auth.uid() simulados. Prueba RLS, grants, funciones, idempotencia y que el JSON
// de ca_panel tenga la forma exacta que src/lib/panel/datos.ts convierte en PanelDatos.
//
// Correr con: npx tsx scripts/check_panel_sql.ts
// Medir ca_panel con carga: CA_PANEL_CARGA=1000000 npx tsx scripts/check_panel_sql.ts
//
// PGlite se busca en node_modules del repo o en PGLITE_DIR (una carpeta con
// node_modules/@electric-sql/pglite). Si no está, corre sólo los chequeos estáticos del SQL
// y lo avisa: así check-all no se pone rojo en una máquina sin la dependencia.

import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Lectura, PanelDatos } from "../src/lib/panel/tipos";

type Fila = Record<string, unknown>;
type Resultado = { rows: Fila[]; affectedRows?: number };
interface Db {
  query(sql: string, params?: unknown[]): Promise<Resultado>;
  exec(sql: string): Promise<Resultado[]>;
  close(): Promise<void>;
}
type Rol = "anon" | "authenticated" | "service_role";
type ModDatos = typeof import("../src/lib/panel/datos");
type ModLecturas = typeof import("../src/lib/panel/lecturas");

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirMigraciones = path.join(raiz, "supabase", "migrations");
const migraciones = readdirSync(dirMigraciones)
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .map((f) => ({ f, sql: readFileSync(path.join(dirMigraciones, f), "utf8") }));

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
// jsonb ordena las claves por largo: se compara con las claves ordenadas para no depender de eso.
function canon(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(canon);
  if (v && typeof v === "object") {
    return Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, canon((v as Record<string, unknown>)[k])]));
  }
  return v;
}
function igual(real: unknown, esperado: unknown, que: string) {
  const a = JSON.stringify(canon(real));
  const b = JSON.stringify(canon(esperado));
  ok(a === b, que, `esperaba ${b}, vino ${a}`);
}
function seccion(nombre: string) {
  console.log(`\n· ${nombre}`);
}

// ─── Chequeos estáticos (sin base) ──────────────────────────────────────────────────────────
function chequeosEstaticos() {
  seccion("SQL estático");
  const todo = migraciones.map((m) => m.sql).join("\n");
  const tablas = [...todo.matchAll(/create table if not exists public\.(ca_\w+)/g)].map((m) => m[1]);
  igual(
    tablas.sort(),
    ["ca_calculos", "ca_checkouts", "ca_compras", "ca_eventos", "ca_limites", "ca_opiniones", "ca_perfiles", "ca_resumen", "ca_resumen_mercado", "ca_soporte_hilos", "ca_soporte_mensajes", "ca_tipo_cambio", "ca_vistas"],
    "están las 13 tablas",
  );
  for (const t of tablas) {
    ok(todo.includes(`alter table public.${t} enable row level security;`), `${t}: enable row level security`);
    ok(todo.includes(`alter table public.${t} force row level security;`), `${t}: force row level security`);
  }
  const bloques = [...todo.matchAll(/create or replace function public\.(\w+)\(([\s\S]*?)\n\$\$;/g)];
  igual(bloques.length, 49, "se encontraron las 49 definiciones de funciones");
  const revocadas = [...todo.matchAll(/revoke execute on function([\s\S]*?)from public, anon, authenticated;/g)].map((m) => m[1]).join("\n");
  for (const [, nombre, cuerpo] of bloques) {
    ok(/\nset search_path = ''\n/.test(cuerpo), `${nombre}: set search_path = ''`);
    ok(revocadas.includes(`public.${nombre}(`), `${nombre}: revoke execute de public, anon, authenticated`);
    const definer = /\nsecurity definer\n/.test(cuerpo);
    ok(definer === (nombre === "ca_vincular_compras"), `${nombre}: security definer sólo en ca_vincular_compras`);
  }
  ok(!/\bto anon\b/.test(todo), "ningún grant a anon");
  ok(!/grant (all|select|insert|update|delete)[^;]*\bon (table )?public\.ca_(vistas|eventos|checkouts|limites|resumen|resumen_mercado|tipo_cambio)\b[^;]*\bto authenticated/.test(todo), "tablas de medición sin grants a authenticated");
}

// ─── PGlite ─────────────────────────────────────────────────────────────────────────────────
function cargarPGlite(): (new (dataDir?: string) => Db) | null {
  for (const base of [raiz, process.env.PGLITE_DIR].filter((b): b is string => !!b)) {
    try {
      const req = createRequire(path.join(base, "package.json"));
      const mod = req("@electric-sql/pglite") as { PGlite: new (dataDir?: string) => Db };
      if (mod.PGlite) return mod.PGlite;
    } catch {
      continue;
    }
  }
  return null;
}

// Réplica mínima de lo que Supabase trae de fábrica. `dueno` hace de `postgres`: no es
// superusuario pero bypassea RLS, que es justo lo que la migración exige al dueño.
function sqlSupabase(defaults: "legado" | "nuevo"): string {
  const tablas =
    defaults === "legado"
      ? `alter default privileges for role dueno in schema public grant all on tables to anon, authenticated, service_role;
         alter default privileges for role dueno in schema public grant all on sequences to anon, authenticated, service_role;`
      : "";
  return `
    create role anon nologin noinherit;
    create role authenticated nologin noinherit;
    create role service_role nologin noinherit bypassrls;
    create role dueno nologin noinherit bypassrls;
    create schema auth;
    create table auth.users (id uuid primary key, email text);
    create function auth.uid() returns uuid language sql stable as $$
      select coalesce(
        nullif(current_setting('request.jwt.claim.sub', true), ''),
        (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
      )::uuid
    $$;
    grant usage on schema auth to anon, authenticated, service_role, dueno;
    grant execute on function auth.uid() to anon, authenticated, service_role, dueno;
    grant select, references on auth.users to dueno;
    grant usage on schema public to anon, authenticated, service_role;
    grant usage, create on schema public to dueno;
    ${tablas}
    alter default privileges for role dueno in schema public grant all on functions to anon, authenticated, service_role;
  `;
}

async function aplicarMigraciones(db: Db, hasta?: string) {
  for (const m of migraciones) {
    if (m.f.includes("_cron")) continue;
    if (hasta && m.f > hasta) continue;
    await db.exec("set role dueno");
    try {
      await db.exec(m.sql);
    } finally {
      await db.exec("reset role");
    }
  }
}

async function nuevaBase(PGlite: new (dataDir?: string) => Db, defaults: "legado" | "nuevo", dataDir?: string, hasta?: string): Promise<Db> {
  const db = new PGlite(dataDir);
  await db.exec(sqlSupabase(defaults));
  await aplicarMigraciones(db, hasta);
  return db;
}

async function como<T>(db: Db, rol: Rol, sub: string | null, fn: () => Promise<T>): Promise<T> {
  await db.query("select set_config('request.jwt.claims', $1, false)", [sub ? JSON.stringify({ sub, role: rol }) : ""]);
  await db.exec(`set role ${rol}`);
  try {
    return await fn();
  } finally {
    await db.exec("reset role");
    await db.query("select set_config('request.jwt.claims', '', false)");
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

const U = {
  a: "aaaaaaaa-0000-4000-8000-000000000001",
  b: "aaaaaaaa-0000-4000-8000-000000000002",
  c: "aaaaaaaa-0000-4000-8000-000000000003",
  d: "aaaaaaaa-0000-4000-8000-000000000004",
};
const V = (i: number) => `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`;
const S = (i: number) => `11111111-0000-4000-8000-${String(i).padStart(12, "0")}`;
const CK = (i: number) => `22222222-0000-4000-8000-${String(i).padStart(12, "0")}`;

const SEMANA = { desde: "2026-09-01T00:00:00-03:00", hasta: "2026-09-08T00:00:00-03:00" };

async function sembrar(db: Db) {
  await db.exec(`
    insert into auth.users (id, email) values
      ('${U.a}', 'comprador@gmail.com'), ('${U.b}', 'otro@hotmail.com'),
      ('${U.c}', 'x@y.com'), ('${U.d}', 'd@d.com');
  `);
  await como(db, "service_role", null, () =>
    db.exec(`
      insert into public.ca_perfiles (user_id, email, perfil) values ('${U.a}', ' Comprador@Gmail.com ', 'contador');
      insert into public.ca_perfiles (user_id, email, perfil, verificado_at) values ('${U.b}', 'otro@hotmail.com', 'empleador', now());
      insert into public.ca_perfiles (user_id, email, created_at) values ('${U.c}', 'x@y.com', '2026-09-04T10:00:00-03:00');
      insert into public.ca_perfiles (user_id, email, verificado_at) values ('${U.d}', 'd@d.com', now());

      insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, utm_source, dispositivo, pais, activo_ms, uso_calc) values
        (gen_random_uuid(), '2026-09-01T10:00:00-03:00', '${V(1)}', '${S(1)}', '/sueldo-neto', 'www.google.com', null, 'movil', 'AR', 60000, true),
        (gen_random_uuid(), '2026-09-01T10:05:00-03:00', '${V(1)}', '${S(1)}', '/aguinaldo', 'calcular.ar', null, 'movil', 'AR', 30000, true),
        (gen_random_uuid(), '2026-09-02T12:00:00-03:00', '${V(2)}', '${S(2)}', '/sueldo-neto', null, 'whatsapp', 'escritorio', 'AR', 5000, false),
        (gen_random_uuid(), '2026-09-03T09:00:00-03:00', '${V(3)}', '${S(3)}', '/convenios/comercio', null, null, 'escritorio', 'UY', 120000, true),
        (gen_random_uuid(), '2026-09-03T09:02:10-03:00', '${V(3)}', '${S(3)}', '/planillas', null, null, 'escritorio', 'UY', 20000, false),
        (gen_random_uuid(), '2026-09-03T09:20:00-03:00', '${V(3)}', '${S(3)}', '/planillas/gracias', 'www.mercadopago.com.ar', null, 'escritorio', 'UY', 3000, false),
        (gen_random_uuid(), '2026-09-05T09:00:00-03:00', '${V(3)}', '${S(4)}', '/sueldo-neto', 'chatgpt.com', null, 'escritorio', 'UY', 90000, true),
        (gen_random_uuid(), '2026-09-07T23:30:00-03:00', '${V(4)}', '${S(5)}', '/sueldo-neto', 'l.facebook.com', null, 'movil', null, 1000, false),
        (gen_random_uuid(), '2026-09-08T00:00:00-03:00', '${V(5)}', '${S(6)}', '/sueldo-neto', null, null, 'movil', 'AR', 7000, true),
        (gen_random_uuid(), '2026-08-31T23:59:59-03:00', '${V(5)}', '${S(7)}', '/sueldo-neto', null, null, 'movil', 'AR', 40000, true),
        (gen_random_uuid(), '2026-08-26T10:00:00-03:00', '${V(1)}', '${S(8)}', '/aguinaldo', null, null, 'movil', 'AR', 2000, false);

      insert into public.ca_vistas (id, ts, vid, sid, path, cerrada_at) values
        (gen_random_uuid(), now() - interval '2 minutes', '${V(6)}', '${S(9)}', '/sueldo-neto', null),
        (gen_random_uuid(), now() - interval '1 hour', '${V(7)}', '${S(10)}', '/aguinaldo', now() - interval '2 minutes'),
        (gen_random_uuid(), now() - interval '50 minutes', '${V(8)}', '${S(11)}', '/aguinaldo', null),
        (gen_random_uuid(), now() - interval '10 minutes', '${V(9)}', '${S(12)}', '/aguinaldo', now() - interval '8 minutes');

      insert into public.ca_eventos (ts, vid, tipo, path, producto, props) values
        ('2026-09-03T09:01:00-03:00', '${V(3)}', 'vista_oferta', '/convenios/comercio', 'planilla-comercio', null),
        ('2026-09-03T09:02:00-03:00', '${V(3)}', 'cta_compra', '/convenios/comercio', 'planilla-comercio', null),
        ('2026-09-03T09:02:30-03:00', '${V(3)}', 'dialogo_compra', '/planillas', 'planilla-comercio', null),
        ('2026-09-01T10:06:00-03:00', '${V(1)}', 'vista_oferta', '/aguinaldo', 'planilla-casas-particulares', null),
        ('2026-09-01T10:06:30-03:00', '${V(1)}', 'cta_compra', '/aguinaldo', 'planilla-casas-particulares', null),
        ('2026-09-02T12:01:00-03:00', '${V(2)}', 'compartir', '/sueldo-neto', null, '{"canal":"whatsapp"}'),
        ('2026-09-01T10:07:00-03:00', '${V(1)}', 'busqueda', '/', null, '{"q":"Aguinaldo ","resultados":3}'),
        ('2026-09-02T12:02:00-03:00', '${V(2)}', 'busqueda', '/', null, '{"q":"aguinaldo","resultados":3}'),
        ('2026-09-07T23:31:00-03:00', '${V(4)}', 'busqueda', '/', null, '{"q":"planilla gastronomicos","resultados":0}'),
        ('2026-09-07T23:32:00-03:00', '${V(4)}', 'busqueda', '/', null, '{"q":"mi cuil 20123456789","resultados":0}'),
        ('2026-08-31T12:00:00-03:00', '${V(5)}', 'cta_compra', '/sueldo-neto', 'planilla-comercio', null);

      insert into public.ca_checkouts (id, ts, producto, email, vid, desde, estado) values
        ('${CK(1)}', '2026-09-03T09:03:00-03:00', 'planilla-comercio', 'comprador@gmail.com', '${V(3)}', '/planillas', 'iniciado'),
        ('${CK(2)}', '2026-09-03T09:10:00-03:00', 'planilla-comercio', 'comprador@gmail.com', '${V(3)}', 'planillas', 'pagado'),
        ('${CK(3)}', '2026-09-06T15:00:00-03:00', 'planilla-uocra', 'otro@hotmail.com', null, null, 'reembolsado'),
        ('${CK(4)}', '2026-08-30T15:00:00-03:00', 'planilla-comercio', null, null, null, 'iniciado'),
        ('${CK(5)}', '2026-09-02T12:05:00-03:00', 'planilla-monotributo', null, '${V(2)}', '/planillas/monotributo', 'iniciado'),
        ('${CK(6)}', '2026-09-06T16:00:00-03:00', 'planilla-monotributo', null, null, null, 'pagado');

      insert into public.ca_compras (mp_payment_id, producto, email, monto, estado, legado, checkout_id, pagado_at) values
        ('111', 'planilla-comercio', 'Comprador@Gmail.com', 14900, 'aprobado', false, '${CK(2)}', '2026-09-03T09:15:00-03:00'),
        ('222', 'planilla-uocra', 'otro@hotmail.com', 14900, 'reembolsado', false, '${CK(3)}', '2026-09-06T15:05:00-03:00'),
        ('666', 'planilla-monotributo', null, 9900, 'aprobado', false, '${CK(6)}', '2026-09-06T16:05:00-03:00'),
        ('333', 'planilla-comercio-2026', 'comprador@gmail.com', 14900, 'aprobado', true, null, '2026-08-28T10:00:00-03:00'),
        ('444', 'planilla-monotributo', null, 9900, 'aprobado', false, null, '2026-09-08T00:00:00-03:00'),
        ('555', 'planilla-casas-particulares', 'd@d.com', 9900, 'aprobado', false, null, '2026-07-01T10:00:00-03:00');
    `),
  );
}

async function filas(db: Db, sql: string, params?: unknown[]) {
  return (await db.query(sql, params)).rows;
}

// 1 dólar = 1.000 pesos, para que las cuentas en USD se lean a ojo. Las ventas del 1/7, 28/8, 3/9, 6/9 y
// 8/9 toman la cotización del día hábil anterior más cercano.
async function cargarCambio(db: Db) {
  await como(db, "service_role", null, () =>
    db.exec(`select public.ca_tipo_cambio_cargar(d::date, '{"ARS": 0.001, "EUR": 1.1}') from unnest(array['2026-06-30', '2026-08-27', '2026-09-02', '2026-09-05']) d;`),
  );
}

async function probarCuentasYRls(db: Db) {
  seccion("normalización y triggers");
  const compras = await filas(db, "select mp_payment_id, email, user_id from public.ca_compras order by mp_payment_id");
  igual(compras.find((c) => c.mp_payment_id === "111")?.email, "comprador@gmail.com", "ca_compras guarda el mail en minúsculas y sin espacios");
  igual(compras.find((c) => c.mp_payment_id === "111")?.user_id, null, "no vincula con un perfil sin verificar");
  igual(compras.find((c) => c.mp_payment_id === "222")?.user_id, U.b, "el trigger vincula con un perfil verificado");
  igual((await filas(db, `select email from public.ca_perfiles where user_id = '${U.a}'`))[0]?.email, "comprador@gmail.com", "ca_perfiles normaliza el mail");

  seccion("ca_vincular_compras");
  igual((await como(db, "authenticated", U.a, () => filas(db, "select public.ca_vincular_compras() as n")))[0].n, 0, "sin verificar no vincula nada");
  igual((await como(db, "authenticated", U.a, () => filas(db, "select count(*)::int as n from public.ca_compras")))[0].n, 0, "sin vincular no ve compras");
  await como(db, "service_role", null, () => db.exec(`update public.ca_perfiles set verificado_at = now() where user_id = '${U.a}'`));
  igual((await como(db, "authenticated", U.a, () => filas(db, "select public.ca_vincular_compras() as n")))[0].n, 2, "verificado vincula sus 2 compras");
  igual((await como(db, "authenticated", U.a, () => filas(db, "select public.ca_vincular_compras() as n")))[0].n, 0, "es idempotente");
  igual((await como(db, "authenticated", U.a, () => filas(db, "select mp_payment_id from public.ca_compras order by 1"))).map((f) => f.mp_payment_id), ["111", "333"], "ve sólo sus compras");
  igual((await como(db, "authenticated", U.a, () => filas(db, `select count(*)::int as n from public.ca_compras where user_id = '${U.b}'`)))[0].n, 0, "no ve compras de otro aunque filtre por su id");
  igual((await como(db, "authenticated", U.b, () => filas(db, "select mp_payment_id from public.ca_compras"))).map((f) => f.mp_payment_id), ["222"], "el otro usuario ve sólo la suya");
  igual((await como(db, "service_role", null, () => filas(db, `select public.ca_vincular_compras_de('${U.c}') as n`)))[0].n, 0, "ca_vincular_compras_de respeta la verificación");

  seccion("verificado_at sigue al mail");
  igual(compras.find((c) => c.mp_payment_id === "555")?.user_id, U.d, "compra vinculada a d");
  await como(db, "service_role", null, () => db.exec(`update public.ca_perfiles set email = 'Nuevo@D.com' where user_id = '${U.d}'`));
  const d = (await filas(db, `select email, verificado_at from public.ca_perfiles where user_id = '${U.d}'`))[0];
  igual([d.email, d.verificado_at], ["nuevo@d.com", null], "cambiar el mail borra la verificación");
  await db.exec(`delete from auth.users where id = '${U.d}'`);
  igual((await filas(db, `select count(*)::int as n from public.ca_perfiles where user_id = '${U.d}'`))[0].n, 0, "borrar el usuario borra el perfil");
  igual((await filas(db, "select user_id from public.ca_compras where mp_payment_id = '555'"))[0].user_id, null, "y deja la compra sin dueño (no la borra)");

  seccion("RLS · ca_perfiles");
  await como(db, "authenticated", U.a, async () => {
    igual((await filas(db, "select user_id from public.ca_perfiles")).map((f) => f.user_id), [U.a], "ve sólo su perfil");
    igual((await db.query("update public.ca_perfiles set nombre = 'Ana', perfil = 'empleador', novedades = true where user_id = $1", [U.a])).affectedRows, 1, "edita nombre, perfil y novedades propios");
    igual((await db.query("update public.ca_perfiles set nombre = 'Hack' where user_id = $1", [U.b])).affectedRows, 0, "no edita el perfil de otro");
    await falla(db.query("update public.ca_perfiles set verificado_at = now() where user_id = $1", [U.a]), "42501", "no puede tocar verificado_at");
    await falla(db.query("update public.ca_perfiles set email = 'x@x.com' where user_id = $1", [U.a]), "42501", "no puede tocar el mail");
    await falla(db.query("insert into public.ca_perfiles (user_id, email) values ($1, 'z@z.com')", [U.a]), "42501", "no puede crear perfiles");
    await falla(db.query("delete from public.ca_perfiles where user_id = $1", [U.a]), "42501", "no puede borrar su perfil");
    await falla(db.query("update public.ca_perfiles set perfil = 'hacker' where user_id = $1", [U.a]), "23514", "perfil fuera de la lista");
  });
  await como(db, "service_role", null, () => db.exec(`update public.ca_perfiles set perfil = 'contador' where user_id = '${U.a}'`));

  seccion("RLS · ca_calculos");
  const campos = JSON.stringify({ sueldo: 100000 });
  const id = await como(db, "authenticated", U.a, async () => {
    const r = await filas(db, "insert into public.ca_calculos (path, titulo, campos, resumen) values ('/sueldo-neto', 'Mi sueldo', $1, 'Neto $82.000') returning id, user_id", [campos]);
    igual(r[0]?.user_id, U.a, "insert propio sin mandar user_id");
    await falla(db.query("insert into public.ca_calculos (user_id, path, titulo, campos) values ($1, '/x', 't', '{}')", [U.b]), "42501", "no puede guardar a nombre de otro");
    await falla(db.query("insert into public.ca_calculos (path, titulo, campos) values ('/x', $1, '{}')", ["t".repeat(81)]), "23514", "titulo > 80");
    await falla(db.query("insert into public.ca_calculos (path, titulo, campos) values ('/x', 't', $1)", [JSON.stringify({ x: "y".repeat(8200) })]), "23514", "campos > 8 KB");
    await falla(db.query("insert into public.ca_calculos (path, titulo, campos, resumen) values ('/x', 't', '{}', $1)", ["r".repeat(201)]), "23514", "resumen > 200");
    igual((await db.query("update public.ca_calculos set titulo = 'Otro título' where id = $1", [r[0].id])).affectedRows, 1, "edita el suyo");
    await falla(db.query("update public.ca_calculos set user_id = $1 where id = $2", [U.b, r[0].id]), "42501", "no puede pasarle el cálculo a otro");
    return r[0].id as string;
  });
  await como(db, "authenticated", U.b, async () => {
    igual((await filas(db, "select id from public.ca_calculos")).length, 0, "otro usuario no ve el cálculo");
    igual((await db.query("update public.ca_calculos set titulo = 'x' where id = $1", [id])).affectedRows, 0, "otro usuario no lo edita");
    igual((await db.query("delete from public.ca_calculos where id = $1", [id])).affectedRows, 0, "otro usuario no lo borra");
  });
  await como(db, "authenticated", U.a, async () => {
    igual((await db.query("delete from public.ca_calculos where id = $1", [id])).affectedRows, 1, "borra el suyo");
  });
  await como(db, "service_role", null, () =>
    db.exec(`insert into public.ca_calculos (user_id, path, titulo, campos) select '${U.a}', '/x', 'c' || g, '{}' from generate_series(1, 200) g`),
  );
  await como(db, "authenticated", U.a, () =>
    falla(db.query("insert into public.ca_calculos (path, titulo, campos) values ('/x', 'el 201', '{}')"), "P0001", "tope de 200 cálculos por usuario"),
  );
  await como(db, "authenticated", U.b, async () => {
    await db.query("insert into public.ca_calculos (path, titulo, campos) values ('/x', 'el primero de b', '{}')");
    ok(true, "el tope es por usuario");
  });
  await db.exec(`delete from public.ca_calculos where user_id = '${U.a}'`);

  seccion("RLS · anon y authenticated contra lo interno");
  const tablas = ["ca_vistas", "ca_eventos", "ca_checkouts", "ca_compras", "ca_perfiles", "ca_calculos", "ca_limites", "ca_resumen"];
  for (const t of tablas) {
    await como(db, "anon", null, () => falla(db.query(`select * from public.${t} limit 1`), "42501", `anon no lee ${t}`));
  }
  for (const t of ["ca_vistas", "ca_eventos", "ca_checkouts", "ca_limites", "ca_resumen"]) {
    await como(db, "authenticated", U.a, () => falla(db.query(`select * from public.${t} limit 1`), "42501", `authenticated no lee ${t}`));
  }
  await como(db, "authenticated", U.a, async () => {
    await falla(db.query("insert into public.ca_compras (mp_payment_id, producto, monto) values ('x', 'y', 1)"), "42501", "authenticated no inserta compras");
    await falla(db.query("update public.ca_compras set monto = 0"), "42501", "authenticated no edita compras");
    await falla(db.query("insert into public.ca_vistas (id, vid, sid, path) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/')"), "42501", "authenticated no inserta vistas");
  });
  const llamadas: [string, Rol[]][] = [
    ["select public.ca_panel(now() - interval '1 day', now())", ["anon", "authenticated"]],
    ["select public.ca_limite('x', 1, 60)", ["anon", "authenticated"]],
    ["select public.ca_cerrar_vista(gen_random_uuid(), 1, 1, 1, true)", ["anon", "authenticated"]],
    ["select public.ca_mantenimiento()", ["anon", "authenticated"]],
    ["select public.ca_fuente('google.com', null, null)", ["anon", "authenticated"]],
    [`select public.ca_vincular_compras_de('${U.a}')`, ["anon", "authenticated"]],
    ["select public.ca_resumir(current_date - 2, current_date - 1)", ["anon", "authenticated"]],
    ["select * from public.ca_resumen_calcular(now() - interval '1 day', now(), 'day', 'completo', '*')", ["anon", "authenticated"]],
    ["select * from public.ca_resumen_rango(now() - interval '1 day', now(), 'completo', '*')", ["anon", "authenticated"]],
    ["select public.ca_panel(now() - interval '1 day', now(), 'mx')", ["anon", "authenticated"]],
    ["select public.ca_hll_estimar('{1,2}')", ["anon", "authenticated"]],
    ["select public.ca_hist_mediana('{1,2}')", ["anon", "authenticated"]],
    ["select public.ca_pagina_de_checkout(gen_random_uuid(), now(), '/x')", ["anon", "authenticated"]],
    ["select public.ca_vincular_compras()", ["anon"]],
  ];
  for (const [sql, roles] of llamadas) {
    for (const rol of roles) {
      const nombre = sql.match(/public\.(\w+)/)?.[1];
      await como(db, rol, rol === "authenticated" ? U.a : null, () => falla(db.query(sql), "42501", `${rol} no ejecuta ${nombre}`));
    }
  }
}

async function probarFunciones(db: Db) {
  seccion("ca_limite");
  const r = await como(db, "service_role", null, async () => {
    const salida: unknown[] = [];
    for (let i = 0; i < 5; i++) salida.push((await filas(db, "select public.ca_limite('login:abc', 3, 60) as ok"))[0].ok);
    salida.push((await filas(db, "select public.ca_limite('login:otra', 3, 60) as ok"))[0].ok);
    return salida;
  });
  igual(r, [true, true, true, false, false, true], "3 permitidos por ventana y por clave");
  igual((await filas(db, "select n from public.ca_limites where clave = 'login:abc'"))[0]?.n, 4, "pasado el tope no sigue escribiendo");
  await como(db, "service_role", null, () => falla(db.query("select public.ca_limite('x', 1, 0)"), "22023", "ventana inválida"));

  seccion("ca_cerrar_vista");
  const vistaId = "33333333-0000-4000-8000-000000000001";
  await como(db, "service_role", null, async () => {
    await db.query("insert into public.ca_vistas (id, vid, sid, path, activo_ms) values ($1, gen_random_uuid(), gen_random_uuid(), '/x', 1000)", [vistaId]);
    igual((await filas(db, "select public.ca_cerrar_vista($1, 500, 3, 40, true) as ok", [vistaId]))[0].ok, true, "cierra una vista existente");
    await db.query("select public.ca_cerrar_vista($1, 999999999, 1, 200, false)", [vistaId]);
    const v = (await filas(db, "select activo_ms, interacciones, scroll_pct, uso_calc, cerrada_at is not null as cerrada from public.ca_vistas where id = $1", [vistaId]))[0];
    igual([v.activo_ms, v.interacciones, v.scroll_pct, v.uso_calc, v.cerrada], [14400000, 3, 100, true, true], "sólo sube valores, con tope de 4 h y scroll 100");
    igual((await filas(db, "select public.ca_cerrar_vista(gen_random_uuid(), 1, 1, 1, true) as ok"))[0].ok, false, "una vista que no existe devuelve false");
    await db.query("delete from public.ca_vistas where id = $1", [vistaId]);
  });

  seccion("ca_checkouts: atribución de fuente");
  igual(
    (await filas(db, `select fuente from public.ca_checkouts where id in ('${CK(1)}', '${CK(2)}', '${CK(3)}') order by id`)).map((f) => f.fuente),
    ["Directo", "Directo", null],
    "los checkouts sembrados quedan con la fuente de su sesión (o sin dato si no hay visitante)",
  );
  igual(
    (await filas(db, `select desde, pagina from public.ca_checkouts where id in ('${CK(1)}', '${CK(2)}', '${CK(3)}', '${CK(5)}') order by id`)).map((f) => [f.desde, f.pagina]),
    [["/planillas", "/convenios/comercio"], ["/planillas", "/convenios/comercio"], [null, null], ["/planillas/monotributo", "/planillas/monotributo"]],
    "la página que vende es la última oferta o botón antes de pagar; si no hay, la ruta del checkout (y el formato viejo sin barra se normaliza)",
  );
  await como(db, "service_role", null, async () => {
    const desdes = await filas(
      db,
      `insert into public.ca_checkouts (id, producto, desde) values
         ($1, 'planilla-uocra', 'https://calcular.ar/convenios/uocra?x=1'),
         ($2, 'planilla-uocra', '//evil.com'),
         ($3, 'planilla-uocra', '/\\evil.com')
       returning desde`,
      [CK(40), CK(41), CK(42)],
    );
    igual(desdes.map((f) => f.desde), ["/convenios/uocra", null, null], "desde se limpia y una ruta a otro sitio se descarta");
    await db.query("delete from public.ca_checkouts where id in ($1, $2, $3)", [CK(40), CK(41), CK(42)]);

    await db.query(
      `insert into public.ca_eventos (ts, vid, tipo, path, producto) values
         ('2026-09-09T09:00:00-03:00', $1, 'vista_oferta', '/aguinaldo', 'planilla-comercio')`,
      [V(30)],
    );
    await db.query("insert into public.ca_checkouts (id, ts, producto, vid, desde) values ($1, '2026-09-10T10:00:00-03:00', 'planilla-comercio', $2, '/planillas')", [CK(30), V(30)]);
    igual((await filas(db, "select pagina from public.ca_checkouts where id = $1", [CK(30)]))[0].pagina, "/planillas", "una oferta de hace más de 24 h no cuenta");
    await db.query(
      `insert into public.ca_eventos (ts, vid, tipo, path, producto) values
         ('2026-09-10T09:59:50-03:00', $1, 'cta_compra', '/sueldo-neto', 'planilla-comercio')`,
      [V(30)],
    );
    await db.query("select public.ca_resumir('2026-09-10', '2026-09-10')");
    igual((await filas(db, "select pagina from public.ca_checkouts where id = $1", [CK(30)]))[0].pagina, "/sueldo-neto", "ca_resumir corrige la página si el evento llegó después del checkout");
    await db.query("delete from public.ca_checkouts where id = $1", [CK(30)]);
    await db.query("delete from public.ca_eventos where vid = $1", [V(30)]);
  });

  seccion("rutas seguras (// y /\\ son otro sitio)");
  await como(db, "service_role", null, async () => {
    await falla(db.query("insert into public.ca_vistas (id, vid, sid, path) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '//evil.com')"), "23514", "ca_vistas rechaza //");
    await falla(db.query("insert into public.ca_vistas (id, vid, sid, path) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/\\evil.com')"), "23514", "ca_vistas rechaza /\\");
    await falla(db.query("insert into public.ca_eventos (tipo, path) values ('error', 'sin-barra')"), "23514", "ca_eventos exige ruta con /");
    await falla(db.query("insert into public.ca_eventos (tipo, path) values ('error', '//evil.com')"), "23514", "ca_eventos rechaza //");
    await falla(db.query("update public.ca_checkouts set desde = '//evil.com' where id = $1", [CK(1)]), "23514", "ca_checkouts.desde rechaza // también en updates");
  });
  await como(db, "authenticated", U.a, () =>
    falla(db.query("insert into public.ca_calculos (path, titulo, campos) values ('//evil.com', 't', '{}')"), "23514", "ca_calculos rechaza //"),
  );
  await como(db, "service_role", null, async () => {
    await db.query(
      `insert into public.ca_vistas (id, ts, vid, sid, path, ref_host) values
         (gen_random_uuid(), now() - interval '10 minutes', $1, $2, '/x', 'www.google.com'),
         (gen_random_uuid(), now() - interval '5 minutes', $1, $2, '/y', 'calcular.ar')`,
      [V(20), S(20)],
    );
    const r = await filas(db, "insert into public.ca_checkouts (id, producto, vid) values ($1, 'planilla-comercio', $2) returning fuente", [CK(20), V(20)]);
    igual(r[0]?.fuente, "Google", "el checkout hereda la fuente externa de la sesión, no la navegación interna");
    const r2 = await filas(db, "insert into public.ca_checkouts (id, producto, vid) values ($1, 'planilla-comercio', $2) returning fuente", [CK(21), V(21)]);
    igual(r2[0]?.fuente, null, "sin vistas recientes queda sin fuente");
    await db.query("delete from public.ca_vistas where vid = $1", [V(20)]);
    await db.query("delete from public.ca_checkouts where id in ($1, $2)", [CK(20), CK(21)]);
  });

  seccion("ca_mantenimiento");
  await como(db, "service_role", null, async () => {
    await db.exec(`
      insert into public.ca_vistas (id, ts, vid, sid, path) values (gen_random_uuid(), now() - interval '500 days', gen_random_uuid(), gen_random_uuid(), '/vieja');
      insert into public.ca_eventos (ts, tipo) values (now() - interval '500 days', 'error');
      insert into public.ca_limites (clave, ventana, vence, n) values ('vieja', now() - interval '2 days', now() - interval '1 day', 1);
    `);
    const m = (await filas(db, "select public.ca_mantenimiento() as m"))[0].m as Record<string, number>;
    igual([m.vistas, m.eventos, m.limites >= 1], [1, 1, true], "borra crudos de más de 400 días y límites vencidos");
    igual(m.dias_resumidos, 9, "resume los 2 últimos días cerrados y hasta 7 faltantes por corrida");
    igual((await filas(db, "select count(*)::int as n from public.ca_resumen where dim = 'total' and dia >= current_date"))[0].n, 0, "nunca resume hoy");
    igual((await filas(db, "select public.ca_resumir(current_date, current_date + 3) as n"))[0].n, 0, "ca_resumir no toca días abiertos");
    igual((await filas(db, "select count(*)::int as n from public.ca_vistas where path = '/vieja'"))[0].n, 0, "la vista vieja ya no está");
    igual((await filas(db, "select count(*)::int as n from public.ca_limites where clave = 'login:abc'"))[0].n, 1, "no toca límites vigentes");
  });

  seccion("ca_fuente");
  const casos: [string | null, string | null, string | null, string | null][] = [
    ["www.google.com", null, null, "Google"],
    ["google.com.ar", null, null, "Google"],
    ["com.google.android.googlequicksearchbox", null, null, "Google"],
    ["news.google.com", null, null, "Google"],
    ["mail.google.com", null, null, "Email"],
    ["gemini.google.com", null, null, "Gemini"],
    ["www.bing.com", null, null, "Bing"],
    ["duckduckgo.com", null, null, "Otros buscadores"],
    ["l.facebook.com", null, null, "Facebook"],
    ["m.facebook.com", null, null, "Facebook"],
    ["l.instagram.com", null, null, "Instagram"],
    ["web.whatsapp.com", null, null, "WhatsApp"],
    ["l.wl.co", null, null, "WhatsApp"],
    [null, "whatsapp", "share", "WhatsApp"],
    ["chatgpt.com", null, null, "ChatGPT"],
    [null, "chatgpt.com", null, "ChatGPT"],
    ["www.perplexity.ai", null, null, "Perplexity"],
    ["claude.ai", null, null, "Claude"],
    ["t.co", null, null, "X"],
    ["youtube.com", null, null, "YouTube"],
    [null, "recordatorio", "email", "Email"],
    [null, "google", "cpc", "Anuncios"],
    [null, null, null, "Directo"],
    ["", "", "", "Directo"],
    ["calcular.ar", null, null, null],
    ["www.calcular.ar", null, null, null],
    ["calcular-ar-git-x.vercel.app", null, null, null],
    ["calcular.ar", "whatsapp", null, "WhatsApp"],
    ["foro.contadores.com.ar", null, null, "Otros sitios"],
    ["www.mercadopago.com.ar", null, null, null],
    ["mercadopago.com", null, null, null],
    ["www.mercadolibre.com.ar", null, null, null],
    [null, "link", "share", "Compartido"],
    [null, "nativo", "share", "Compartido"],
    [null, "whatsapp", "share", "WhatsApp"],
  ];
  for (const [r, s, m, esperado] of casos) {
    const f = (await como(db, "service_role", null, () => filas(db, "select public.ca_fuente($1, $2, $3) as f", [r, s, m])))[0].f;
    igual(f, esperado, `ca_fuente(${r}, ${s}, ${m})`);
  }

  seccion("fuente de la sesión = la de su primera vista");
  await como(db, "service_role", null, async () => {
    await db.query(
      `insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, utm_source, utm_medium) values
         (gen_random_uuid(), '2026-05-01T10:00:00-03:00', $1, $2, '/a', null, 'whatsapp', 'share'),
         (gen_random_uuid(), '2026-05-01T10:01:00-03:00', $1, $2, '/b', 'www.google.com', null, null),
         (gen_random_uuid(), '2026-05-01T09:00:00-03:00', $3, $4, '/a', 'www.google.com', null, null),
         (gen_random_uuid(), '2026-05-01T09:30:00-03:00', $3, $4, '/planillas/gracias', 'www.mercadopago.com.ar', null, null),
         (gen_random_uuid(), '2026-05-01T11:00:00-03:00', $5, $6, '/a', null, 'link', 'share')`,
      [V(40), S(40), V(41), S(41), V(42), S(42)],
    );
    const f = await filas(db, "select clave, visitantes, sesiones from public.ca_resumen_calcular('2026-05-01T00:00:00-03:00', '2026-05-02T00:00:00-03:00', 'day', 'completo', '*') where dim = 'fuente' order by clave");
    igual(f.map((x) => [x.clave, x.visitantes]), [["Compartido", 1], ["Google", 1], ["WhatsApp", 1]], "primera vista manda (no el orden alfabético) y volver de Mercado Pago no es fuente");
    await db.query("delete from public.ca_vistas where ts >= '2026-05-01T00:00:00-03:00' and ts < '2026-05-02T00:00:00-03:00'");
  });
}

type Forma = "number" | "string" | "boolean" | "string|null" | "number|null" | Forma[] | { [k: string]: Forma };
const REPARTO: Forma = [{ clave: "string", n: "number" }];
const FORMA_PANEL: Forma = {
  granularidad: "string",
  desde: "string",
  hasta: "string",
  anteriorDesde: "string",
  anteriorHasta: "string",
  mercado: "string|null",
  cubos: ["string"],
  hayVistas: "boolean",
  kpis: [{ clave: "string", valor: "number", anterior: "number", serie: [{ t: "string", v: "number" }] }],
  paginas: [
    {
      path: "string",
      vistas: "number",
      visitantes: "number",
      usos: "number",
      tiempoMedianoMs: "number",
      compartidos: "number",
      ofertas: "number",
      interesCompra: "number",
      checkouts: "number",
      ventas: "number",
      ingresosUsd: "number",
      producto: "string|null",
      serieUsos: ["number"],
    },
  ],
  ingresos: { moneda: "string", porMoneda: [{ moneda: "string", monto: "number", montoUsd: "number|null", ventas: "number" }], sinCotizacion: "number" },
  embudos: [{ producto: "string", pasos: [{ paso: "string", n: "number" }], ingresos: "number", moneda: "string|null", ingresosUsd: "number" }],
  fuentes: [{ fuente: "string", visitantes: "number", usos: "number", ventas: "number" }],
  dispositivos: REPARTO,
  paises: REPARTO,
  paisesCompra: REPARTO,
  busquedas: [{ q: "string", n: "number", sinResultados: "boolean" }],
  compras: [
    {
      id: "string",
      fecha: "string",
      producto: "string",
      monto: "number",
      moneda: "string",
      montoUsd: "number|null",
      pais: "string|null",
      mercado: "string",
      emailEnmascarado: "string",
      conCuenta: "boolean",
      desde: "string|null",
      estado: "string",
    },
  ],
  cuentas: { total: "number", nuevas: "number", verificadas: "number", conCompras: "number", perfiles: REPARTO },
  vivo: { ahora: "number", paginas: REPARTO },
  mercados: [
    {
      mercado: "string",
      visitantes: "number",
      usos: "number",
      ventas: "number",
      ingresos: [{ moneda: "string", monto: "number" }],
      ingresosUsd: "number",
      usaron: "number",
      ofertas: "number",
      clics: "number",
      checkouts: "number",
    },
  ],
};

function validarForma(valor: unknown, forma: Forma, donde: string, errores: string[]) {
  if (typeof forma === "string") {
    const tipo = valor === null ? "null" : typeof valor;
    const permitidos = forma.split("|");
    if (!permitidos.includes(tipo)) errores.push(`${donde}: esperaba ${forma}, vino ${tipo}`);
    else if (tipo === "number" && !Number.isFinite(valor)) errores.push(`${donde}: número no finito`);
    return;
  }
  if (Array.isArray(forma)) {
    if (!Array.isArray(valor)) return void errores.push(`${donde}: esperaba lista`);
    valor.forEach((v, i) => validarForma(v, forma[0], `${donde}[${i}]`, errores));
    return;
  }
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) return void errores.push(`${donde}: esperaba objeto`);
  const obj = valor as Record<string, unknown>;
  for (const k of Object.keys(forma)) {
    if (!(k in obj)) errores.push(`${donde}.${k}: falta`);
    else validarForma(obj[k], forma[k], `${donde}.${k}`, errores);
  }
  for (const k of Object.keys(obj)) if (!(k in forma)) errores.push(`${donde}.${k}: sobra (no está en el contrato)`);
}

async function panel(db: Db, desde: string, hasta: string): Promise<Record<string, unknown>> {
  return (await como(db, "service_role", null, () => filas(db, "select public.ca_panel($1, $2) as p", [desde, hasta])))[0].p as Record<string, unknown>;
}

function cargarDatos(): { datos: ModDatos; lecturas: ModLecturas } {
  const req = createRequire(path.join(raiz, "package.json"));
  const so = req.resolve("server-only");
  // datos.ts importa "server-only", que tira fuera de un Server Component: se lo reemplaza por
  // un módulo vacío en la caché de require antes de cargarlo.
  req.cache[so] = { id: so, filename: so, loaded: true, exports: {} } as NodeJS.Module;
  return {
    datos: req(path.join(raiz, "src/lib/panel/datos.ts")) as ModDatos,
    lecturas: req(path.join(raiz, "src/lib/panel/lecturas.ts")) as ModLecturas,
  };
}

function kpi(p: Record<string, unknown>, clave: string) {
  return (p.kpis as { clave: string; valor: number; anterior: number; serie: { t: string; v: number }[] }[]).find((k) => k.clave === clave)!;
}

async function probarPanel(db: Db, mods: { datos: ModDatos; lecturas: ModLecturas }) {
  seccion("ca_panel · semana fija (1 al 7/9/2026)");
  const p = await panel(db, SEMANA.desde, SEMANA.hasta);
  const errores: string[] = [];
  validarForma(p, FORMA_PANEL, "ca_panel", errores);
  ok(errores.length === 0, "el JSON respeta el contrato", errores.slice(0, 8));
  igual(p.granularidad, "dia", "más de un día → por día");
  igual((p.cubos as string[]).length, 7, "7 cubos, vacíos incluidos");
  igual((p.cubos as string[])[0], "2026-09-01T00:00:00-03:00", "los cubos arrancan a la medianoche argentina");
  igual([p.anteriorDesde, p.anteriorHasta], ["2026-08-25T00:00:00-03:00", "2026-09-01T00:00:00-03:00"], "período anterior del mismo largo");
  igual([kpi(p, "visitantes").valor, kpi(p, "visitantes").anterior], [4, 2], "visitantes (el borde de hasta no entra)");
  igual(kpi(p, "visitantes").serie.map((s) => s.v), [1, 1, 1, 0, 1, 0, 1], "serie de visitantes con ceros");
  igual([kpi(p, "usos").valor, kpi(p, "usos").anterior], [4, 1], "usos");
  const tiempo = kpi(p, "tiempo");
  ok(Math.abs(tiempo.valor - 75000) / 75000 <= 0.15, "tiempo de varios días ≈ mediana real (histograma, ±15 %)", tiempo.valor);
  ok(Math.abs(tiempo.anterior - 40000) / 40000 <= 0.15, "tiempo anterior ≈ mediana real", tiempo.anterior);
  igual(tiempo.serie.map((s) => s.v), [45000, 0, 120000, 0, 90000, 0, 0], "tiempo por día = mediana exacta del día");
  igual([kpi(p, "interes").valor, kpi(p, "interes").anterior], [2, 1], "interés = visitantes distintos con cta o diálogo");
  igual(kpi(p, "interes").serie.map((s) => s.v), [1, 0, 1, 0, 0, 0, 0], "serie de interés");
  igual([kpi(p, "checkouts").valor, kpi(p, "checkouts").anterior], [5, 1], "checkouts");
  igual([kpi(p, "ventas").valor, kpi(p, "ventas").anterior], [2, 1], "ventas aprobadas por pagado_at (reembolso fuera)");
  igual([kpi(p, "ingresos").valor, kpi(p, "ingresos").anterior], [24.8, 14.9], "ingresos en dólares (1 USD = 1.000 ARS)");
  igual(kpi(p, "ingresos").serie.map((s) => s.v), [0, 0, 14.9, 0, 0, 9.9, 0], "serie de ingresos en dólares");
  igual(p.ingresos, { moneda: "USD", porMoneda: [{ moneda: "ARS", monto: 24800, montoUsd: 24.8, ventas: 2 }], sinCotizacion: 0 }, "desglose por moneda");
  igual(p.paisesCompra, [{ clave: "UY", n: 1 }, { clave: "desconocido", n: 1 }], "país real de quien compró (sale de la vista del checkout)");

  const paginas = p.paginas as Record<string, unknown>[];
  igual(paginas.map((x) => x.path), ["/sueldo-neto", "/aguinaldo", "/convenios/comercio", "/planillas", "/planillas/gracias"], "páginas por vistas");
  const sueldo = paginas[0];
  igual([sueldo.vistas, sueldo.visitantes, sueldo.usos, sueldo.tiempoMedianoMs, sueldo.compartidos], [4, 4, 2, 60000, 1], "fila de /sueldo-neto (tiempo = mediana de medianas diarias)");
  igual(sueldo.serieUsos, [1, 0, 0, 0, 1, 0, 0], "serieUsos alineada a los cubos");
  const comercio = paginas[2];
  igual([comercio.interesCompra, comercio.checkouts, comercio.ventas, comercio.producto], [1, 2, 1, "planilla-comercio"], "/convenios/comercio se lleva los checkouts abiertos en /planillas");
  igual([paginas[1].producto, paginas[1].interesCompra], ["planilla-casas-particulares", 1], "producto de la página sale de vista_oferta");
  igual([paginas[3].checkouts, paginas[3].ventas, paginas[3].interesCompra], [0, 0, 1], "la landing no se queda con la venta de la página que la mandó");

  const fuentes = Object.fromEntries((p.fuentes as { fuente: string; visitantes: number; usos: number; ventas: number }[]).map((f) => [f.fuente, [f.visitantes, f.usos, f.ventas]]));
  igual(fuentes, { ChatGPT: [1, 1, 0], Directo: [1, 1, 1], Facebook: [1, 0, 0], Google: [1, 2, 0], WhatsApp: [1, 0, 0] }, "fuentes por sesión; la venta va a la fuente de la sesión del checkout");
  igual(p.dispositivos, [{ clave: "escritorio", n: 3 }, { clave: "movil", n: 2 }], "dispositivos = suma de visitantes por día");
  igual(p.paises, [{ clave: "AR", n: 2 }, { clave: "UY", n: 2 }, { clave: "desconocido", n: 1 }], "países = suma de visitantes por día");
  igual(p.busquedas, [
    { q: "aguinaldo", n: 2, sinResultados: false },
    { q: "mi cuil …", n: 1, sinResultados: true },
    { q: "planilla gastronomicos", n: 1, sinResultados: true },
  ], "búsquedas normalizadas, sin resultados marcadas y números tapados");

  const embudos = Object.fromEntries((p.embudos as { producto: string; pasos: { n: number }[]; ingresos: number }[]).map((e) => [e.producto, [...e.pasos.map((x) => x.n), e.ingresos]]));
  igual(embudos, {
    "planilla-casas-particulares": [1, 0, 0, 0, 0],
    "planilla-comercio": [1, 1, 2, 1, 14900],
    "planilla-monotributo": [0, 0, 2, 1, 9900],
    "planilla-uocra": [0, 0, 1, 0, 0],
  }, "embudos: abrió la compra cuenta sólo el diálogo (el cta de /aguinaldo no)");

  igual(p.compras, [
    { id: "666", fecha: "2026-09-06T16:05:00-03:00", producto: "planilla-monotributo", monto: 9900, moneda: "ARS", montoUsd: 9.9, pais: null, mercado: "ar", emailEnmascarado: "sin mail", conCuenta: false, desde: null, estado: "aprobado" },
    { id: "222", fecha: "2026-09-06T15:05:00-03:00", producto: "planilla-uocra", monto: 14900, moneda: "ARS", montoUsd: 14.9, pais: null, mercado: "ar", emailEnmascarado: "ot***@hotmail.com", conCuenta: true, desde: null, estado: "reembolsado" },
    { id: "111", fecha: "2026-09-03T09:15:00-03:00", producto: "planilla-comercio", monto: 14900, moneda: "ARS", montoUsd: 14.9, pais: "UY", mercado: "ar", emailEnmascarado: "co***@gmail.com", conCuenta: true, desde: "/convenios/comercio", estado: "aprobado" },
  ], "compras del período, enmascaradas");
  const json = JSON.stringify(p);
  ok(!/comprador@gmail\.com|otro@hotmail\.com|x@y\.com|20123456789/.test(json), "ningún mail completo ni número largo sale de la base");
  igual(p.cuentas, { total: 3, nuevas: 1, verificadas: 2, conCompras: 1, perfiles: [{ clave: "contador", n: 1 }, { clave: "empleador", n: 1 }, { clave: "sin_perfil", n: 1 }] }, "cuentas");
  igual(p.vivo, { ahora: 2, paginas: [{ clave: "/aguinaldo", n: 1 }, { clave: "/sueldo-neto", n: 1 }] }, "en vivo: abiertas recientes o con actividad en 5 min");
  igual(p.hayVistas, true, "hay vistas");

  seccion("ca_panel · por hora");
  const h = await panel(db, "2026-09-03T00:00:00-03:00", "2026-09-03T12:00:00-03:00");
  igual(h.granularidad, "hora", "un día o menos → por hora");
  igual((h.cubos as string[]).length, 12, "12 cubos de una hora");
  igual(kpi(h, "visitantes").serie[9], { t: "2026-09-03T09:00:00-03:00", v: 1 }, "la vista de las 9 cae en su hora");
  igual([h.anteriorDesde, kpi(h, "visitantes").anterior], ["2026-09-02T00:00:00-03:00", 0], "se compara con ayer a la misma hora");
  const vacio = await panel(db, "2020-01-01T00:00:00-03:00", "2020-01-08T00:00:00-03:00");
  igual([vacio.hayVistas, (vacio.paginas as unknown[]).length, kpi(vacio, "visitantes").serie.length], [false, 0, 7], "período sin datos: listas vacías y serie en cero");
  const errVacio: string[] = [];
  validarForma(vacio, FORMA_PANEL, "ca_panel(vacío)", errVacio);
  ok(errVacio.length === 0, "el JSON vacío también respeta el contrato", errVacio.slice(0, 5));
  await como(db, "service_role", null, async () => {
    await falla(db.query("select public.ca_panel($1, $1)", [SEMANA.desde]), "22023", "rango vacío");
    await falla(db.query("select public.ca_panel(now() - interval '401 days', now())"), "22023", "rango de más de 400 días");
  });

  seccion("datos.ts · armarPanel");
  const desde = new Date(SEMANA.desde);
  const hasta = new Date(SEMANA.hasta);
  const armado: PanelDatos = mods.datos.armarPanel("7d", desde, hasta, p, new Date("2026-09-08T03:00:00Z"));
  igual(armado.kpis.map((k) => k.clave), ["visitantes", "usos", "tiempo", "interes", "checkouts", "ventas", "ingresos"], "los 7 indicadores en orden");
  ok(armado.kpis.every((k) => k.serie.length === 7 && k.serie.every((s) => !Number.isNaN(Date.parse(s.t)))), "series con fechas ISO válidas");
  igual(armado.kpis[0].serie[0].t, "2026-09-01T03:00:00.000Z", "las fechas salen en ISO UTC");
  ok(armado.paginas.every((x) => x.serieUsos.length === 7 && x.titulo.length > 0), "páginas con título y serie completa");
  igual(armado.paginas[0].tasaUso, 0.5, "tasaUso = usos / vistas");
  igual(
    armado.embudos.map((e) => e.producto),
    [
      "planilla-comercio",
      "planilla-casas-particulares",
      "planilla-monotributo",
      "planilla-alquileres",
      "planilla-uocra",
      "informe-cuota-alimentaria",
      "planilla-camioneros",
      "planilla-vacaciones",
      "planilla-mi-sueldo",
      "planilla-plazo-fijo",
      "informe-indemnizacion",
      "informe-ganancias",
      "informe-credito-laboral",
      "informe-inflacion",
    ],
    "siempre todos los productos del catálogo, aunque no tengan movimiento",
  );
  const cuota = mods.datos.armarPanel("7d", desde, hasta, {
    ...p,
    paginas: [{ path: "/cuota-alimentaria", vistas: 1 }, { path: "/inflacion/alquiler", vistas: 1 }],
  });
  igual(
    cuota.paginas.map((x) => x.producto),
    ["informe-cuota-alimentaria", "planilla-alquileres"],
    "la calculadora de cuota vende el informe y la de alquiler la planilla de alquileres",
  );
  igual(armado.embudos.find((e) => e.producto === "planilla-monotributo")?.pasos.map((x) => x.n), [0, 0, 2, 1], "una venta con checkout sin visitante (fuente null) no rompe nada");
  ok(armado.embudos.every((e) => e.titulo && e.precio > 0), "títulos y precios del catálogo");
  igual([armado.sinDatos, armado.lecturas.length, armado.rango, armado.desde], [false, 0, "7d", desde.toISOString()], "sin señal suficiente no inventa lecturas");
  const armadoVacio = mods.datos.armarPanel("7d", desde, hasta, vacio);
  igual([armadoVacio.sinDatos, armadoVacio.lecturas.length], [true, 0], "sinDatos cuando no hay vistas");
  let tiro = false;
  try {
    mods.datos.armarPanel("7d", desde, hasta, { granularidad: "dia" });
  } catch (e) {
    tiro = e instanceof Error && e.message.includes("ca_panel");
  }
  ok(tiro, "un JSON roto tira con mensaje claro");
  igual([armado.mercado, armado.mercados?.map((m) => m.mercado)], [null, ["ar"]], "armarPanel lee el filtro y la comparativa");
  igual([armado.ingresos.moneda, armado.kpis.find((k) => k.clave === "ingresos")?.valor, armado.paisesCompra?.length], ["USD", 24.8, 2], "ingresos en dólares y país de compra");
  igual(armado.mercados?.[0].embudo, { visitas: 5, usaron: 3, ofertas: 2, clics: 2, checkouts: 5, ventas: 2 }, "embudo del mercado (una persona por día)");
  const crudoViejo: Record<string, unknown> = { ...p };
  delete crudoViejo.mercado;
  delete crudoViejo.mercados;
  crudoViejo.compras = (p.compras as Record<string, unknown>[]).map((c) => {
    const x = { ...c };
    delete x.moneda;
    return x;
  });
  const armadoViejo = mods.datos.armarPanel("7d", desde, hasta, crudoViejo);
  igual([armadoViejo.mercado, armadoViejo.mercados, armadoViejo.compras.map((c) => c.moneda)], [null, null, ["ARS", "ARS", "ARS"]], "con el ca_panel de antes de la migración: sin comparativa y todo en pesos");
  const crudo1008: Record<string, unknown> = { ...p, kpis: (p.kpis as Record<string, unknown>[]).map((k) => (k.clave === "ingresos" ? { ...k, valor: 24800, anterior: 14900 } : k)) };
  delete crudo1008.ingresos;
  delete crudo1008.paisesCompra;
  crudo1008.mercados = (p.mercados as Record<string, unknown>[]).map(({ mercado, usos, ventas, ingresos }) => ({ mercado, visitantes: 4, usos, ventas, ingresos }));
  crudo1008.paginas = (p.paginas as Record<string, unknown>[]).map(({ ofertas: _o, ingresosUsd: _i, ...resto }) => resto);
  crudo1008.compras = (p.compras as Record<string, unknown>[]).map(({ montoUsd: _m, pais: _p, mercado: _x, ...resto }) => resto);
  crudo1008.embudos = (p.embudos as Record<string, unknown>[]).map(({ moneda: _m, ingresosUsd: _i, ...resto }) => resto);
  const armado1008 = mods.datos.armarPanel("7d", desde, hasta, crudo1008);
  igual(
    [armado1008.ingresos.moneda, armado1008.ingresos.porMoneda, armado1008.paisesCompra, armado1008.mercados?.[0].embudo, armado1008.mercados?.[0].ingresosUsd, armado1008.paginas[0].ofertas, armado1008.compras[0].montoUsd],
    ["ARS", [{ moneda: "ARS", monto: 24800, montoUsd: null, ventas: 2 }], null, null, 0, 0, null],
    "con el ca_panel de 20261008 (sin la migración del mundo): ingresos en pesos, sin embudo por país, nada se rompe",
  );
  igual(mods.datos.armarPanel("7d", desde, hasta, { ...p, mercado: "zz" }).mercado, null, "un mercado que no se mide no se toma como filtro");

  seccion("datos.ts · límites del rango en hora argentina");
  const l1 = mods.datos.limitesDelRango("hoy", new Date("2026-09-30T04:22:33Z"));
  igual(l1.desde.toISOString(), "2026-09-30T03:00:00.000Z", "hoy empieza a las 00:00 AR");
  const l2 = mods.datos.limitesDelRango("hoy", new Date("2026-09-30T02:30:00Z"));
  igual(l2.desde.toISOString(), "2026-09-29T03:00:00.000Z", "a las 23:30 AR todavía es el día anterior");
  const l3 = mods.datos.limitesDelRango("7d", new Date("2026-09-30T15:00:00Z"));
  igual([l3.desde.toISOString(), l3.hasta.toISOString()], ["2026-09-24T03:00:00.000Z", "2026-09-30T15:00:00.000Z"], "7d = hoy y los 6 días anteriores, hasta ahora");

  seccion("lecturas.ts");
  const base: Omit<PanelDatos, "lecturas"> = { ...armado };
  const conSenal: Omit<PanelDatos, "lecturas"> = {
    ...base,
    kpis: base.kpis.map((k) => (k.clave === "visitantes" ? { ...k, valor: 1000, anterior: 700 } : k)),
    embudos: base.embudos.map((e) =>
      e.producto === "planilla-comercio"
        ? { ...e, pasos: [{ paso: "vio_oferta", n: 300 }, { paso: "abrio_compra", n: 40 }, { paso: "fue_a_pagar", n: 10 }, { paso: "pago", n: 1 }] }
        : e,
    ),
    paginas: [{ ...armado.paginas[0], path: "/aguinaldo", titulo: "Aguinaldo", usos: 320, vistas: 900, producto: null, interesCompra: 0, ventas: 0 }],
    busquedas: [{ q: "planilla gastronomicos", n: 12, sinResultados: true }],
    fuentes: [
      { fuente: "Google", visitantes: 700, usos: 300, ventas: 1 },
      { fuente: "WhatsApp", visitantes: 200, usos: 90, ventas: 0 },
      { fuente: "ChatGPT", visitantes: 60, usos: 40, ventas: 0 },
    ],
  };
  const lecturas: Lectura[] = mods.lecturas.generarLecturas(conSenal);
  igual(lecturas.map((x) => x.id), [
    "embudo-antes-de-pagar-planilla-comercio",
    "embudo-en-el-pago-planilla-comercio",
    "candidata-/aguinaldo",
    "variacion-visitantes",
    "busqueda-planilla gastronomicos",
    "fuente-whatsapp",
  ], "máximo 6, ordenadas por plata en juego");
  ok(lecturas.every((x) => ["oportunidad", "alerta", "logro", "dato"].includes(x.tono) && x.titulo && x.detalle), "tono y textos presentes");
  igual(lecturas[0].titulo, "75 de cada 100 que abren la compra de la Planilla Comercio 2026 no llegan a Mercado Pago", "título del embudo");
  igual(lecturas.find((x) => x.id === "fuente-whatsapp")?.titulo, "WhatsApp trae 21 de cada 100 visitas", "el porcentaje por fuente se calcula sobre la suma de fuentes");
  const sumaMayor = mods.lecturas.generarLecturas({
    ...conSenal,
    kpis: conSenal.kpis.map((k) => (k.clave === "visitantes" ? { ...k, valor: 150 } : k)),
  });
  ok(
    sumaMayor.every((x) => [...`${x.titulo} ${x.detalle}`.matchAll(/(\d+) de cada 100/g)].every((m) => Number(m[1]) <= 100)),
    "nunca más de 100 de cada 100, aunque el KPI de visitantes sea menor que la suma de fuentes",
  );
  igual(mods.lecturas.generarLecturas({ ...conSenal, sinDatos: true }).length, 0, "sin datos no hay lecturas");
}

async function probarResumen(db: Db) {
  seccion("resumen diario = crudo");
  const sinVivo = (p: Record<string, unknown>) => JSON.stringify(canon({ ...p, vivo: null }));
  const HORA = { desde: "2026-09-03T00:00:00-03:00", hasta: "2026-09-03T12:00:00-03:00" };
  const crudo = await panel(db, SEMANA.desde, SEMANA.hasta);
  const crudoHora = await panel(db, HORA.desde, HORA.hasta);
  const n = await como(db, "service_role", null, () =>
    filas(db, "select public.ca_resumir('2026-08-31', '2026-09-02') + public.ca_resumir('2026-09-05', '2026-09-05') as n"),
  );
  igual(n[0].n, 4, "resume los días pedidos");
  ok(sinVivo(await panel(db, SEMANA.desde, SEMANA.hasta)) === sinVivo(crudo), "con días resumidos y un hueco en el medio da lo mismo que el crudo");
  await como(db, "service_role", null, async () => {
    await db.query("select public.ca_resumir('2026-08-20', '2026-09-10'), public.ca_resumir_mercado('2026-08-20', '2026-09-10')");
    await db.query("select public.ca_resumir('2026-08-20', '2026-09-10'), public.ca_resumir_mercado('2026-08-20', '2026-09-10')");
  });
  igual((await filas(db, "select count(*)::int as n from public.ca_resumen where mercado = '*' and dim = 'total' and dia between '2026-08-20' and '2026-09-10'"))[0].n, 22, "una fila total por día, también los días sin visitas");
  ok(sinVivo(await panel(db, SEMANA.desde, SEMANA.hasta)) === sinVivo(crudo), "todo resumido (y re-resumido) da lo mismo que el crudo");
  await db.exec("delete from public.ca_vistas where ts >= '2026-08-20' and ts < '2026-09-10'");
  ok(sinVivo(await panel(db, SEMANA.desde, SEMANA.hasta)) === sinVivo(crudo), "sin el crudo, el panel sale entero del resumen");
  const hora = await panel(db, HORA.desde, HORA.hasta);
  igual(kpi(hora, "visitantes").valor, 0, "por hora (un día a medias) lee el crudo, no el resumen");
  void crudoHora;

  seccion("HyperLogLog e histograma contra el conteo exacto");
  await como(db, "service_role", null, () =>
    db.exec(`
      insert into public.ca_vistas (id, ts, vid, sid, path, activo_ms, uso_calc)
      select gen_random_uuid(),
             case when g <= 3000 then '2026-06-10T12:00:00-03:00'::timestamptz else '2026-06-11T12:00:00-03:00'::timestamptz end,
             ('44444444-0000-4000-8000-' || lpad(to_hex(case when g <= 3000 then g else g - 1000 end), 12, '0'))::uuid,
             gen_random_uuid(), '/carga', (1000 + (g * 7919) % 400000), true
      from generate_series(1, 6000) g;
    `),
  );
  const exacto = (await filas(db, `
    select count(distinct vid)::int as vis, percentile_cont(0.5) within group (order by activo_ms) as med
    from public.ca_vistas where ts >= '2026-06-10T00:00:00-03:00' and ts < '2026-06-12T00:00:00-03:00'`))[0] as { vis: number; med: number };
  const antes = await panel(db, "2026-06-10T00:00:00-03:00", "2026-06-12T00:00:00-03:00");
  await como(db, "service_role", null, () => db.query("select public.ca_resumir('2026-06-10', '2026-06-11')"));
  const despues = await panel(db, "2026-06-10T00:00:00-03:00", "2026-06-12T00:00:00-03:00");
  const vis = kpi(despues, "visitantes").valor;
  ok(Math.abs(vis - exacto.vis) / exacto.vis <= 0.05, `visitantes ≈ exacto (${exacto.vis}) ±5 %`, vis);
  igual(kpi(despues, "visitantes").serie.map((s) => s.v), [3000, 3000], "visitantes por día exactos");
  const med = kpi(despues, "tiempo").valor;
  ok(Math.abs(med - exacto.med) / exacto.med <= 0.1, `tiempo ≈ mediana exacta (${Math.round(exacto.med)}) ±10 %`, med);
  igual(sinVivo(despues), sinVivo(antes), "mismo resultado antes y después de resumir");
  await db.exec("delete from public.ca_vistas where path = '/carga'; delete from public.ca_resumen where dia between '2026-06-10' and '2026-06-11';");
}

async function probarIdempotencia(db: Db) {
  seccion("idempotencia");
  const antes = await panel(db, SEMANA.desde, SEMANA.hasta);
  await aplicarMigraciones(db);
  await aplicarMigraciones(db);
  const despues = await panel(db, SEMANA.desde, SEMANA.hasta);
  igual(JSON.stringify({ ...despues, vivo: null }) === JSON.stringify({ ...antes, vivo: null }), true, "re-aplicar las migraciones con datos no cambia nada");
  const politicas = (await filas(db, "select count(*)::int as n from pg_policies where tablename like 'ca\\_%'"))[0].n;
  igual(politicas, 9, "9 policies, sin duplicados");
}

async function probarDefaultsNuevos(PGlite: new (dataDir?: string) => Db) {
  seccion("Supabase sin grants por defecto (desde 30/10/2026)");
  const db = await nuevaBase(PGlite, "nuevo");
  try {
    await sembrar(db);
    await cargarCambio(db);
    ok(true, "service_role inserta en todas las tablas con los grants explícitos");
    igual((await como(db, "authenticated", U.b, () => filas(db, "select mp_payment_id from public.ca_compras"))).map((f) => f.mp_payment_id), ["222"], "authenticated lee sus compras");
    await como(db, "anon", null, () => falla(db.query("select * from public.ca_compras"), "42501", "anon sigue sin leer"));
    const p = await panel(db, SEMANA.desde, SEMANA.hasta);
    igual(kpi(p, "visitantes").valor, 4, "ca_panel funciona igual");
  } finally {
    await db.close();
  }
}

async function probarCarga(PGlite: new (dataDir?: string) => Db, n: number) {
  seccion(`carga: ${n.toLocaleString("es-AR")} vistas en 90 días + otras tantas en los 90 anteriores`);
  // En disco y no en memoria: con millones de filas la base en memoria pasa el límite de WASM.
  const dir = mkdtempSync(path.join(tmpdir(), "ca-panel-carga-"));
  const db = await nuevaBase(PGlite, "legado", dir);
  try {
    const t0 = Date.now();
    await db.exec(`
      insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, utm_source, dispositivo, pais, activo_ms, uso_calc, cerrada_at)
      select gen_random_uuid(),
             now() - interval '180 days' + (g::float8 / ${2 * n}) * interval '180 days',
             ('00000000-0000-4000-8000-' || lpad(to_hex((random() * ${Math.round(n * 1.2)})::int), 12, '0'))::uuid,
             ('11111111-0000-4000-8000-' || lpad(to_hex((g / 2)::int), 12, '0'))::uuid,
             '/calc-' || (floor(pow(random(), 2) * 90))::int,
             (array['www.google.com', 'www.google.com', 'www.google.com', 'calcular.ar', null, 'chatgpt.com', 'l.facebook.com', 'www.bing.com'])[1 + floor(random() * 8)::int],
             case when random() < 0.05 then 'whatsapp' end,
             (array['movil', 'movil', 'escritorio', 'tablet'])[1 + floor(random() * 4)::int],
             (array['AR', 'AR', 'AR', 'AR', 'UY', 'ES', null])[1 + floor(random() * 7)::int],
             (random() * 300000)::int,
             random() < 0.38,
             now()
      from generate_series(1, ${2 * n}) g;
      insert into public.ca_eventos (ts, vid, tipo, path, producto, props)
      select now() - interval '180 days' + (g::float8 / ${Math.round(n / 2.5)}) * interval '180 days',
             ('00000000-0000-4000-8000-' || lpad(to_hex((random() * ${Math.round(n * 1.2)})::int), 12, '0'))::uuid,
             (array['vista_oferta', 'vista_oferta', 'cta_compra', 'dialogo_compra', 'compartir', 'busqueda', 'copiar_resultado'])[1 + floor(random() * 7)::int],
             '/calc-' || (floor(pow(random(), 2) * 90))::int,
             (array['planilla-comercio', 'planilla-uocra', 'planilla-monotributo', 'planilla-casas-particulares'])[1 + floor(random() * 4)::int],
             jsonb_build_object('q', 'consulta ' || (random() * 200)::int, 'resultados', (random() * 3)::int)
      from generate_series(1, ${Math.round(n / 2.5)}) g;
      analyze;
      insert into public.ca_checkouts (id, ts, producto, vid, desde)
      select gen_random_uuid(), now() - interval '180 days' + (g::float8 / ${Math.round(n / 250)}) * interval '180 days',
             'planilla-comercio', ('00000000-0000-4000-8000-' || lpad(to_hex(g), 12, '0'))::uuid, 'calc-' || (g % 90)
      from generate_series(1, ${Math.round(n / 250)}) g;
      insert into public.ca_compras (mp_payment_id, producto, email, monto, checkout_id, pagado_at)
      select 'carga-' || g, 'planilla-comercio', 'c' || g || '@gmail.com', 14900, null,
             now() - interval '180 days' + (g::float8 / ${Math.round(n / 5000)}) * interval '180 days'
      from generate_series(1, ${Math.max(1, Math.round(n / 5000))}) g;
      analyze;
    `);
    console.log(`  siembra: ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    const tr = Date.now();
    await como(db, "service_role", null, () => db.query("select public.ca_resumir(current_date - 182, current_date - 1)"));
    console.log(`  ca_resumir de 182 días (lo que el cron hace de a uno): ${((Date.now() - tr) / 1000).toFixed(1)} s`);
    const tm = Date.now();
    await como(db, "service_role", null, () => db.query("select public.ca_mantenimiento()"));
    console.log(`  ca_mantenimiento (una corrida horaria): ${Date.now() - tm} ms`);
    for (const dias of [1, 7, 30, 90]) {
      const tiempos: number[] = [];
      for (let i = 0; i < 2; i++) {
        const t = Date.now();
        await como(db, "service_role", null, () =>
          db.query(`select public.ca_panel(date_trunc('day', now(), 'America/Argentina/Buenos_Aires') - interval '${dias - 1} days', now()) as p`),
        );
        tiempos.push(Date.now() - t);
      }
      console.log(`  ca_panel ${String(dias).padStart(2)} días: ${tiempos.map((x) => `${x} ms`).join(" · ")}`);
    }
    const plan = await filas(db, "explain select count(*) from public.ca_vistas where ts >= now() - interval '1 day'");
    console.log(`  plan de "hoy": ${plan.map((f) => Object.values(f)[0]).join(" | ")}`);
  } finally {
    await db.close();
    rmSync(dir, { recursive: true, force: true });
  }
}


const MIGRACION_MERCADO = migraciones.find((m) => m.f.includes("_ca_medicion_mercado"))?.f ?? "";

// Lo que agregaron 20261008 (mercado) y 20261014 (mundo: dólares, país real, embudo por mercado) no
// existe en el ca_panel de antes: se compara lo demás.
function sinMercado(p: Record<string, unknown>): string {
  const resto: Record<string, unknown> = { ...p };
  delete resto.mercado;
  delete resto.mercados;
  delete resto.vivo;
  delete resto.ingresos;
  delete resto.paisesCompra;
  resto.kpis = (p.kpis as Record<string, unknown>[]).filter((k) => k.clave !== "ingresos");
  resto.paginas = (p.paginas as Record<string, unknown>[]).map(({ ofertas: _o, ingresosUsd: _i, ...x }) => x);
  resto.embudos = (p.embudos as Record<string, unknown>[]).map(({ moneda: _m, ingresosUsd: _i, ...x }) => x);
  resto.compras = (p.compras as Record<string, unknown>[]).map((c) => {
    const x = { ...c };
    delete x.moneda;
    delete x.montoUsd;
    delete x.pais;
    delete x.mercado;
    return x;
  });
  return JSON.stringify(canon(resto));
}

const sinVivo = (p: Record<string, unknown>) => JSON.stringify(canon({ ...p, vivo: null }));

async function panelDe(db: Db, desde: string, hasta: string, mercado: string | null): Promise<Record<string, unknown>> {
  return (await como(db, "service_role", null, () => filas(db, "select public.ca_panel($1, $2, $3) as p", [desde, hasta, mercado])))[0].p as Record<string, unknown>;
}

async function probarMercados(PGlite: new (dataDir?: string) => Db) {
  seccion("mercados · migración sobre datos existentes");
  ok(MIGRACION_MERCADO !== "", "existe la migración de mercado");
  const anterior = migraciones.filter((m) => m.f < MIGRACION_MERCADO).map((m) => m.f).pop()!;
  const db = await nuevaBase(PGlite, "legado", undefined, anterior);
  try {
    await sembrar(db);
    await como(db, "service_role", null, () => db.query("select public.ca_resumir('2026-08-31', '2026-09-02')"));
    const viejo = await panel(db, SEMANA.desde, SEMANA.hasta);
    const viejoHora = await panel(db, "2026-09-03T00:00:00-03:00", "2026-09-03T12:00:00-03:00");
    const filasViejas = (await filas(db, "select count(*)::int as n from public.ca_resumen where dim <> 'total' or hll is not null"))[0].n;
    await aplicarMigraciones(db);
    ok(true, "la migración corre sobre una base con datos y días resumidos");
    await cargarCambio(db);

    const todos = await panelDe(db, SEMANA.desde, SEMANA.hasta, null);
    ok(sinMercado(todos) === sinMercado(viejo), "Todos da lo mismo que antes de la migración");
    ok(sinMercado(await panel(db, "2026-09-03T00:00:00-03:00", "2026-09-03T12:00:00-03:00")) === sinMercado(viejoHora), "por hora también");
    const ar = await panelDe(db, SEMANA.desde, SEMANA.hasta, "ar");
    ok(sinMercado(ar) === sinMercado(viejo), "Argentina = Todos mientras no haya datos intl");
    igual([todos.mercado, ar.mercado], [null, "ar"], "el JSON dice qué mercado filtró");
    igual(
      (await filas(db, "select count(*)::int as n from public.ca_resumen where mercado = 'ar'"))[0].n,
      filasViejas,
      "lo histórico resumido se copió una vez a 'ar' (sin las filas marca)",
    );
    const vistas = (await filas(db, "select count(*)::int as n, count(*) filter (where sitio = 'ar' and mercado = 'ar')::int as ar from public.ca_vistas"))[0];
    igual(vistas.n, vistas.ar, "todas las vistas existentes quedan en ar/ar");
    igual(
      todos.mercados,
      [{ mercado: "ar", visitantes: 5, usos: 4, ventas: 2, ingresos: [{ moneda: "ARS", monto: 24800 }], ingresosUsd: 24.8, usaron: 3, ofertas: 2, clics: 2, checkouts: 5 }],
      "comparativa con un solo mercado",
    );

    seccion("mercados · reglas de las columnas");
    await como(db, "service_role", null, async () => {
      await falla(db.query("insert into public.ca_vistas (id, vid, sid, path, sitio, mercado) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/x', 'ar', 'mx')"), "23514", "sitio ar no puede tener otro mercado");
      await falla(db.query("insert into public.ca_vistas (id, vid, sid, path, sitio, mercado) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/x', 'intl', 'ar')"), "23514", "sitio intl no puede ser ar");
      await falla(db.query("insert into public.ca_eventos (tipo, sitio, mercado) values ('error', 'intl', 'MX')"), "23514", "mercado en minúsculas");
      await falla(db.query("insert into public.ca_compras (mp_payment_id, producto, monto, sitio) values ('z', 'y', 1, 'otro')"), "23514", "sitio fuera de la lista");
      await falla(db.query("select public.ca_panel(now() - interval '1 day', now(), '*')"), "22023", "ca_panel rechaza un mercado inválido");
    });
    await como(db, "authenticated", U.b, async () => {
      await falla(db.query("insert into public.ca_opiniones (tipo, mensaje, mercado) values ('idea', 'hola mundo', 'mx')"), "42501", "authenticated no elige el mercado de su opinión");
      await falla(db.query("insert into public.ca_calculos (path, titulo, campos, mercado) values ('/x', 't', '{}', 'mx')"), "42501", "authenticated no elige el mercado de su cálculo");
      await falla(db.query("update public.ca_perfiles set mercado = 'mx' where user_id = $1", [U.b]), "42501", "authenticated no cambia el mercado de su perfil");
    });

    seccion("mercados · datos intl");
    await como(db, "service_role", null, () =>
      db.exec(`
        insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, dispositivo, pais, activo_ms, uso_calc, sitio, mercado) values
          (gen_random_uuid(), '2026-09-05T10:00:00-03:00', '${V(60)}', '${S(60)}', '/mx/aguinaldo', 'www.google.com', 'movil', 'MX', 50000, true, 'intl', 'mx'),
          (gen_random_uuid(), '2026-09-05T10:05:00-03:00', '${V(60)}', '${S(60)}', '/mx/finiquito', 'www.google.com', 'movil', 'MX', 10000, false, 'intl', 'mx'),
          (gen_random_uuid(), '2026-09-04T11:00:00-03:00', '${V(61)}', '${S(61)}', '/mx/aguinaldo', null, 'escritorio', 'MX', 30000, true, 'intl', 'mx'),
          (gen_random_uuid(), '2026-09-04T12:00:00-03:00', '${V(62)}', '${S(62)}', '/co/prima', null, 'movil', 'CO', 20000, true, 'intl', 'co'),
          (gen_random_uuid(), '2026-09-04T12:30:00-03:00', '${V(63)}', '${S(63)}', '/', 'calcularya.com', 'movil', 'PE', 1000, false, 'intl', 'global');
        insert into public.ca_eventos (ts, vid, tipo, path, props, sitio, mercado) values
          ('2026-09-05T10:01:00-03:00', '${V(60)}', 'busqueda', '/mx', '{"q":"aguinaldo mexico","resultados":2}', 'intl', 'mx'),
          ('2026-09-04T12:01:00-03:00', '${V(62)}', 'compartir', '/co/prima', '{"canal":"whatsapp"}', 'intl', 'co');
        insert into public.ca_compras (mp_payment_id, producto, monto, moneda, pagado_at, sitio, mercado) values
          ('pp-1', 'planilla-sueldo-mx', 9, 'USD', '2026-09-04T13:00:00-03:00', 'intl', 'mx');
      `),
    );
    const t2 = await panelDe(db, SEMANA.desde, SEMANA.hasta, null);
    igual([kpi(t2, "visitantes").valor, kpi(t2, "usos").valor, kpi(t2, "ventas").valor, kpi(t2, "ingresos").valor], [8, 7, 3, 33.8], "Todos suma los mercados; los ingresos del KPI son en dólares (pesos convertidos más USD)");
    const ar2 = await panelDe(db, SEMANA.desde, SEMANA.hasta, "ar");
    ok(sinMercado(ar2) === sinMercado(viejo), "Argentina no se mueve con los datos intl");
    const mx = await panelDe(db, SEMANA.desde, SEMANA.hasta, "mx");
    igual([kpi(mx, "visitantes").valor, kpi(mx, "usos").valor, kpi(mx, "ventas").valor, kpi(mx, "ingresos").valor], [2, 2, 1, 9], "México solo");
    igual((mx.paginas as { path: string; vistas: number }[]).map((x) => [x.path, x.vistas]), [["/mx/aguinaldo", 2], ["/mx/finiquito", 1]], "páginas de México");
    igual(mx.busquedas, [{ q: "aguinaldo mexico", n: 1, sinResultados: false }], "búsquedas de México");
    igual(mx.fuentes, [{ fuente: "Directo", visitantes: 1, usos: 1, ventas: 0 }, { fuente: "Google", visitantes: 1, usos: 1, ventas: 0 }], "fuentes de México");
    igual((mx.compras as { id: string; moneda: string }[]).map((c) => [c.id, c.moneda]), [["pp-1", "USD"]], "compras de México con su moneda");
    igual(mx.cuentas, { total: 0, nuevas: 0, verificadas: 0, conCompras: 0, perfiles: [] }, "cuentas de México (todavía no hay altas intl)");
    const vacio = await panelDe(db, SEMANA.desde, SEMANA.hasta, "bo");
    igual([vacio.hayVistas, (vacio.paginas as unknown[]).length], [false, 0], "un mercado sin datos da el panel vacío");
    const errores: string[] = [];
    validarForma(mx, FORMA_PANEL, "ca_panel(mx)", errores);
    ok(errores.length === 0, "el JSON filtrado respeta el contrato", errores.slice(0, 5));
    igual(t2.mercados, [
      { mercado: "ar", visitantes: 5, usos: 4, ventas: 2, ingresos: [{ moneda: "ARS", monto: 24800 }], ingresosUsd: 24.8, usaron: 3, ofertas: 2, clics: 2, checkouts: 5 },
      { mercado: "mx", visitantes: 2, usos: 2, ventas: 1, ingresos: [{ moneda: "USD", monto: 9 }], ingresosUsd: 9, usaron: 2, ofertas: 0, clics: 0, checkouts: 0 },
      { mercado: "co", visitantes: 1, usos: 1, ventas: 0, ingresos: [], ingresosUsd: 0, usaron: 1, ofertas: 0, clics: 0, checkouts: 0 },
      { mercado: "global", visitantes: 1, usos: 0, ventas: 0, ingresos: [], ingresosUsd: 0, usaron: 0, ofertas: 0, clics: 0, checkouts: 0 },
    ], "comparativa por mercado, ordenada por visitantes");
    ok(JSON.stringify(mx.mercados) === JSON.stringify(t2.mercados), "la comparativa no depende del filtro");

    seccion("mercados · resumen = crudo");
    const lista = [null, "ar", "mx", "co"];
    const crudos: Record<string, unknown>[] = [];
    for (const m of lista) crudos.push(await panelDe(db, SEMANA.desde, SEMANA.hasta, m));
    await como(db, "service_role", null, () => db.query("select public.ca_resumir('2026-08-25', '2026-09-07'), public.ca_resumir_mercado('2026-08-25', '2026-09-07')"));
    for (const [i, m] of lista.entries()) {
      ok(sinVivo(await panelDe(db, SEMANA.desde, SEMANA.hasta, m)) === sinVivo(crudos[i]), `resumido = crudo (${m ?? "todos"})`);
    }
    igual((await filas(db, "select count(*)::int as n from public.ca_resumen where mercado = 'mx' and dim = 'total'"))[0].n, 2, "México tiene fila total sólo los días con actividad");
    await aplicarMigraciones(db);
    ok(sinVivo(await panelDe(db, SEMANA.desde, SEMANA.hasta, "ar")) === sinVivo(crudos[1]), "re-aplicar la migración no vuelve a copiar a 'ar'");
  } finally {
    await db.close();
  }
}

async function probarPagos(PGlite: new (dataDir?: string) => Db) {
  seccion("proveedor de pago (20261009120000)");
  const db = await nuevaBase(PGlite, "legado", undefined, "20261008999999");
  try {
    await como(db, "service_role", null, () =>
      db.exec("insert into public.ca_compras (mp_payment_id, producto, monto) values ('900', 'planilla-comercio', 14900)"),
    );
    await aplicarMigraciones(db);
    await aplicarMigraciones(db);
    const vieja = (await filas(db, "select proveedor, pago_id from public.ca_compras where mp_payment_id = '900'"))[0];
    igual([vieja.proveedor, vieja.pago_id], ["mercadopago", "900"], "la compra de MP previa queda con proveedor y pago_id");
    await como(db, "service_role", null, () =>
      db.exec("insert into public.ca_compras (mp_payment_id, producto, monto) values ('901', 'planilla-uocra', 14900)"),
    );
    igual((await filas(db, "select pago_id from public.ca_compras where mp_payment_id = '901'"))[0].pago_id, "901", "el webhook de MP sin pago_id: lo completa el trigger");
    await como(db, "service_role", null, () =>
      db.exec(
        "insert into public.ca_compras (mp_payment_id, producto, monto, moneda, sitio, mercado, proveedor, pago_id) values ('paypal:5O190127TN364715T', 'mx/planilla-sueldo', 9, 'USD', 'intl', 'mx', 'paypal', '5O190127TN364715T')",
      ),
    );
    ok(true, "una compra de PayPal entra con mp_payment_id prefijado");
    await como(db, "service_role", null, () =>
      falla(
        db.query("insert into public.ca_compras (mp_payment_id, producto, monto, proveedor, pago_id, sitio, mercado) values ('paypal:otro', 'mx/x', 9, 'paypal', '5O190127TN364715T', 'intl', 'mx')"),
        "23505",
        "pago_id repetido del mismo proveedor: rechazado",
      ),
    );
    await como(db, "service_role", null, () =>
      falla(db.query("insert into public.ca_compras (mp_payment_id, producto, monto, proveedor) values ('x1', 'mx/x', 9, 'bitcoin')"), "23514", "proveedor fuera de la lista: rechazado"),
    );
    await como(db, "service_role", null, () =>
      db.exec("insert into public.ca_checkouts (id, producto, sitio, mercado, proveedor) values (gen_random_uuid(), 'mx/planilla-sueldo', 'intl', 'mx', 'paypal')"),
    );
    ok(true, "ca_checkouts acepta un checkout intl de PayPal");
  } finally {
    await db.close();
  }
}

const SEMANA_MUNDO = { desde: "2026-09-14T00:00:00-03:00", hasta: "2026-09-21T00:00:00-03:00" };
const PRODUCTO_MX = "mx/sueldo-y-liquidacion";

async function probarMundo(PGlite: new (dataDir?: string) => Db, mods: { datos: ModDatos; lecturas: ModLecturas }) {
  seccion("mundo · mercados con forma de país o edición (20261014120000)");
  const db = await nuevaBase(PGlite, "legado");
  try {
    await como(db, "service_role", null, async () => {
      await db.query(
        "insert into public.ca_vistas (id, ts, vid, sid, path, pais, uso_calc, sitio, mercado) values (gen_random_uuid(), '2026-09-14T10:00:00-03:00', $1, $2, '/ca-fr/pret', 'CA', true, 'intl', 'ca-fr')",
        [V(70), S(70)],
      );
      ok(true, "una edición (ca-fr) entra en ca_vistas");
      await falla(db.query("insert into public.ca_vistas (id, vid, sid, path, sitio, mercado) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/x', 'intl', 'ca_fr')"), "23514", "ca_fr no tiene forma de mercado");
      await falla(db.query("insert into public.ca_vistas (id, vid, sid, path, sitio, mercado) values (gen_random_uuid(), gen_random_uuid(), gen_random_uuid(), '/x', 'intl', 'mexico')"), "23514", "un nombre largo tampoco");
      await falla(db.query("insert into public.ca_eventos (tipo, pais) values ('error', 'mx')"), "23514", "el país de un evento va en mayúsculas ISO");
      await falla(db.query("select public.ca_panel(now() - interval '1 day', now(), 'CA-FR')"), "22023", "ca_panel rechaza un mercado con mayúsculas");
    });
    const caFr = await panelDe(db, "2026-09-14T00:00:00-03:00", "2026-09-15T00:00:00-03:00", "ca-fr");
    igual([kpi(caFr, "visitantes").valor, kpi(caFr, "usos").valor], [1, 1], "ca_panel filtra por una edición");

    seccion("mundo · embudo de calcularya de punta a punta");
    await como(db, "service_role", null, () =>
      db.exec(`
        insert into public.ca_vistas (id, ts, vid, sid, path, ref_host, pais, uso_calc, activo_ms, sitio, mercado) values
          (gen_random_uuid(), '2026-09-15T10:00:00-03:00', '${V(71)}', '${S(71)}', '/mx/aguinaldo', 'www.google.com', 'CO', true, 40000, 'intl', 'mx'),
          (gen_random_uuid(), '2026-09-15T11:00:00-03:00', '${V(72)}', '${S(72)}', '/mx/aguinaldo', null, 'MX', false, 2000, 'intl', 'mx'),
          (gen_random_uuid(), '2026-09-16T09:00:00-03:00', '${V(71)}', '${S(73)}', '/mx/finiquito', null, 'CO', true, 30000, 'intl', 'mx');
        insert into public.ca_eventos (ts, vid, tipo, path, producto, pais, sitio, mercado) values
          ('2026-09-15T10:01:00-03:00', '${V(71)}', 'vista_oferta', '/mx/aguinaldo', '${PRODUCTO_MX}', 'CO', 'intl', 'mx'),
          ('2026-09-15T10:02:00-03:00', '${V(71)}', 'cta_compra', '/mx/aguinaldo', '${PRODUCTO_MX}', 'CO', 'intl', 'mx'),
          ('2026-09-15T11:01:00-03:00', '${V(72)}', 'vista_oferta', '/mx/aguinaldo', '${PRODUCTO_MX}', 'MX', 'intl', 'mx');
        insert into public.ca_checkouts (id, ts, producto, vid, desde, sitio, mercado, proveedor) values
          ('${CK(70)}', '2026-09-15T10:03:00-03:00', '${PRODUCTO_MX}', '${V(71)}', '/mx/planillas/sueldo-y-liquidacion', 'intl', 'mx', 'paypal'),
          ('${CK(71)}', '2026-09-15T11:05:00-03:00', '${PRODUCTO_MX}', '${V(72)}', '/mx/planillas/sueldo-y-liquidacion', 'intl', 'mx', 'paypal');
        update public.ca_checkouts set pais = 'PE' where id = '${CK(71)}';
        insert into public.ca_compras (mp_payment_id, producto, monto, moneda, checkout_id, pagado_at, sitio, mercado, proveedor, pago_id) values
          ('paypal:X1', '${PRODUCTO_MX}', 9, 'USD', '${CK(70)}', '2026-09-15T10:10:00-03:00', 'intl', 'mx', 'paypal', 'X1');
        insert into public.ca_compras (mp_payment_id, producto, monto, pagado_at) values ('777', 'planilla-comercio', 14900, '2026-09-19T15:00:00-03:00');
      `),
    );
    const ck = (await filas(db, "select pais, fuente, pagina, vid from public.ca_checkouts where id = $1", [CK(70)]))[0];
    igual([ck.pais, ck.fuente, ck.pagina, ck.vid], ["CO", "Google", "/mx/aguinaldo", V(71)], "el checkout intl con vid hereda país real, fuente y página de la visita");
    const compra = (await filas(db, "select pais, monto_usd from public.ca_compras where mp_payment_id = 'paypal:X1'"))[0];
    igual([compra.pais, Number(compra.monto_usd)], ["CO", 9], "la compra toma el país del checkout y en USD vale lo mismo");
    igual((await filas(db, "select monto_usd from public.ca_compras where mp_payment_id = '777'"))[0].monto_usd, null, "una venta en pesos sin cotización queda sin monto en USD (no en cero)");
    igual(
      (await como(db, "service_role", null, () => filas(db, "select dia::text as dia, moneda from public.ca_usd_pendientes()"))).map((f) => [f.dia, f.moneda]),
      [["2026-09-19", "ARS"]],
      "ca_usd_pendientes avisa qué día falta cotizar",
    );

    const mx = await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, "mx");
    const errores: string[] = [];
    validarForma(mx, FORMA_PANEL, "ca_panel(mx)", errores);
    ok(errores.length === 0, "el JSON del mundo respeta el contrato", errores.slice(0, 5));
    const emb = (mx.embudos as { producto: string; pasos: { n: number }[]; ingresos: number; moneda: string; ingresosUsd: number }[]).find((e) => e.producto === PRODUCTO_MX);
    igual(emb && [...emb.pasos.map((x) => x.n), emb.ingresos, emb.moneda, emb.ingresosUsd], [2, 1, 2, 1, 9, "USD", 9], "embudo del producto intl: abrir la compra es el clic en la oferta (cta_compra)");
    const aguinaldo = (mx.paginas as Record<string, unknown>[]).find((x) => x.path === "/mx/aguinaldo");
    igual(
      aguinaldo && [aguinaldo.ofertas, aguinaldo.interesCompra, aguinaldo.checkouts, aguinaldo.ventas, aguinaldo.ingresosUsd],
      [2, 1, 2, 1, 9],
      "la calculadora se lleva la oferta, el clic, los checkouts y la venta",
    );
    igual(mx.paisesCompra, [{ clave: "CO", n: 1 }], "compran desde Colombia aunque el contenido sea de México");
    const filaMx = (mx.mercados as Record<string, unknown>[]).find((m) => m.mercado === "mx");
    igual(
      filaMx && [filaMx.visitantes, filaMx.usaron, filaMx.ofertas, filaMx.clics, filaMx.checkouts, filaMx.ventas, filaMx.ingresosUsd],
      [3, 2, 2, 1, 2, 1, 9],
      "embudo de México con una persona por día",
    );
    const todos = await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, null);
    igual(
      todos.ingresos,
      { moneda: "USD", porMoneda: [{ moneda: "USD", monto: 9, montoUsd: 9, ventas: 1 }, { moneda: "ARS", monto: 14900, montoUsd: null, ventas: 1 }], sinCotizacion: 1 },
      "en Todos, la venta sin cotización se ve aparte y no suma al KPI",
    );
    igual(kpi(todos, "ingresos").valor, 9, "KPI de ingresos en dólares");

    seccion("mundo · tipo de cambio");
    await como(db, "service_role", null, async () => {
      igual((await filas(db, `select public.ca_tipo_cambio_cargar('2026-09-18', '{"ARS": 0.001}') as n`))[0].n, 1, "carga la cotización del viernes");
      igual(Number((await filas(db, "select monto_usd from public.ca_compras where mp_payment_id = '777'"))[0].monto_usd), 14.9, "la venta del sábado usa la del viernes");
      igual((await filas(db, "select count(*)::int as n from public.ca_usd_pendientes()"))[0].n, 0, "ya no queda nada pendiente");
      await db.query(`select public.ca_tipo_cambio_cargar('2026-09-19', '{"ARS": 0.002}')`);
      igual(Number((await filas(db, "select monto_usd from public.ca_compras where mp_payment_id = '777'"))[0].monto_usd), 29.8, "si llega la del mismo día, se recalcula con esa");
      igual(
        (await filas(db, `select public.ca_tipo_cambio_cargar('2026-09-18', '{"USD": 1, "AR$": 2, "EUR": -1, "GBP": "x", "jpy": 0.0067}') as n`))[0].n,
        1,
        "descarta USD, códigos raros, negativos y textos; normaliza a mayúsculas",
      );
      await falla(db.query("select public.ca_tipo_cambio_cargar(null, '{}')"), "22023", "sin día no carga");
      await falla(db.query("select public.ca_tipo_cambio_cargar(current_date + 5, '{}')"), "22023", "un día futuro no carga");
      await falla(db.query("select public.ca_tipo_cambio_cargar(current_date, '[1]')"), "22023", "las tasas son un objeto");
    });

    seccion("mundo · resumen por mercado = crudo");
    const antes = await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, null);
    const antesMx = await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, "mx");
    igual((await como(db, "service_role", null, () => filas(db, "select public.ca_resumir_mercado('2026-09-14', '2026-09-20') as n")))[0].n, 7, "resume 7 días");
    ok(sinVivo(await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, null)) === sinVivo(antes), "Todos: resumido = crudo");
    ok(sinVivo(await panelDe(db, SEMANA_MUNDO.desde, SEMANA_MUNDO.hasta, "mx")) === sinVivo(antesMx), "México: resumido = crudo");
    igual((await filas(db, "select count(*)::int as n from public.ca_resumen_mercado where mercado = '*' and dia between '2026-09-14' and '2026-09-20'"))[0].n, 7, "una marca por día, también sin actividad");
    const m = (await como(db, "service_role", null, () => filas(db, "select public.ca_mantenimiento() as m")))[0].m as Record<string, number>;
    ok(typeof m.dias_mercado === "number" && m.dias_mercado >= 2, "ca_mantenimiento también resume por mercado", m);

    seccion("mundo · permisos");
    for (const t of ["ca_tipo_cambio", "ca_resumen_mercado"]) {
      await como(db, "anon", null, () => falla(db.query(`select * from public.${t} limit 1`), "42501", `anon no lee ${t}`));
      await como(db, "authenticated", U.a, () => falla(db.query(`select * from public.${t} limit 1`), "42501", `authenticated no lee ${t}`));
    }
    for (const sql of [
      "select public.ca_tipo_cambio_cargar(current_date, '{}')",
      "select * from public.ca_usd_pendientes()",
      "select public.ca_resumir_mercado(current_date - 1, current_date - 1)",
      "select * from public.ca_resumen_mercado_rango(now() - interval '1 day', now())",
      "select * from public.ca_resumen_mercado_calcular(now() - interval '1 day', now())",
      "select public.ca_usd_de('ARS', current_date)",
    ]) {
      const nombre = sql.match(/public\.(\w+)/)?.[1];
      for (const rol of ["anon", "authenticated"] as Rol[]) {
        await como(db, rol, rol === "authenticated" ? U.a : null, () => falla(db.query(sql), "42501", `${rol} no ejecuta ${nombre}`));
      }
    }

    seccion("mundo · datos.ts con productos y páginas de calcularya");
    const armado = mods.datos.armarPanel("7d", new Date(SEMANA_MUNDO.desde), new Date(SEMANA_MUNDO.hasta), mx);
    const embMx = armado.embudos.find((e) => e.producto === PRODUCTO_MX);
    ok(!!embMx && embMx.titulo !== PRODUCTO_MX && embMx.moneda === "USD" && embMx.mercado === "mx" && embMx.precio > 0, "el embudo intl lleva título, precio y moneda del catálogo", embMx);
    ok(armado.embudos.every((e) => e.mercado === "mx"), "mirando México, sólo productos de México");
    igual(armado.paginas.find((x) => x.path === "/mx/aguinaldo")?.titulo, "Aguinaldo", "título de la calculadora sin el país cuando se filtra");
    ok(/México/.test(mods.datos.tituloDePagina("/mx/aguinaldo", null)), "en Todos, el título lleva el país");
    igual(mods.datos.tituloDePagina("/aguinaldo", null), "Aguinaldo (SAC)", "una página de calcular.ar queda con su título");
    igual(armado.mercados?.find((x) => x.mercado === "mx")?.embudo, { visitas: 3, usaron: 2, ofertas: 2, clics: 1, checkouts: 2, ventas: 1 }, "armarPanel lee el embudo por mercado");
  } finally {
    await db.close();
  }
}

// Los 190 países con 90 días resumidos: lo que más pesa en ca_panel es la comparativa por mercado
// (HyperLogLog de cada país) y el resumen por mercado. Correr con CA_PANEL_MUNDO=1.
async function probarCargaMundo(PGlite: new (dataDir?: string) => Db) {
  seccion("carga · 190 mercados × 90 días resumidos");
  const dir = mkdtempSync(path.join(tmpdir(), "ca-panel-mundo-"));
  const db = await nuevaBase(PGlite, "legado", dir);
  try {
    const t0 = Date.now();
    await db.exec(`
      create temporary table mercados_carga as
        select 'ar' as m
        union all
        (select x.c from (select distinct chr(97 + (g / 26) % 26) || chr(97 + g % 26) as c from generate_series(0, 300) g) x where x.c <> 'ar' order by x.c limit 189);
      create temporary table regs_carga as
        select i, array(select (floor(random() * 7))::smallint from generate_series(1, 1024)) as hll
        from generate_series(0, 49) i;
      insert into public.ca_resumen (dia, mercado, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms, hll, hist)
      select d::date, x.m, 'total', '', 1000, 400, 300, 0, 60000, r.hll, array_fill(3, array[64])
      from generate_series(current_date - 90, current_date - 1, interval '1 day') d
      cross join (select distinct m from mercados_carga) x
      join regs_carga r on r.i = (abs(hashtext(x.m || d::text)) % 50)
      on conflict do nothing;
      insert into public.ca_resumen (dia, mercado, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms, hll, hist)
      select d::date, '*', 'total', '', 190000, 76000, 57000, 0, 60000, (select hll from regs_carga where i = 0), array_fill(570, array[64])
      from generate_series(current_date - 90, current_date - 1, interval '1 day') d
      on conflict do nothing;
      insert into public.ca_resumen (dia, mercado, dim, clave, vistas, visitantes, usos, sesiones, tiempo_ms)
      select d::date, '*', 'pagina', '/' || x.m || '/calc-' || k, 50, 20, 15, 0, 60000
      from generate_series(current_date - 90, current_date - 1, interval '1 day') d
      cross join (select distinct m from mercados_carga) x
      cross join generate_series(1, 5) k
      on conflict do nothing;
      insert into public.ca_resumen_mercado (dia, mercado, visitantes, usaron, ofertas, clics)
      select d::date, x.m, 400, 250, 100, 8
      from generate_series(current_date - 90, current_date - 1, interval '1 day') d
      cross join (select distinct m from mercados_carga) x
      on conflict do nothing;
      insert into public.ca_resumen_mercado (dia, mercado)
      select d::date, '*' from generate_series(current_date - 90, current_date - 1, interval '1 day') d
      on conflict do nothing;
      insert into public.ca_compras (mp_payment_id, producto, monto, moneda, pagado_at, sitio, mercado)
      select 'c' || g, 'x/y', 9, 'USD', now() - (g % 80) * interval '1 day', 'intl', (select m from mercados_carga where m <> 'ar' order by m offset g % 189 limit 1)
      from generate_series(1, 3000) g;
      analyze;
    `);
    console.log(`  siembra: ${((Date.now() - t0) / 1000).toFixed(1)} s`);
    for (const [nombre, mercado] of [["Todos", null], ["un país", "mx"]] as const) {
      const tiempos: number[] = [];
      let p: Record<string, unknown> = {};
      for (let i = 0; i < 2; i++) {
        const t = Date.now();
        p = await panelDe(db, new Date(Date.now() - 89 * 86_400_000).toISOString(), new Date().toISOString(), mercado);
        tiempos.push(Date.now() - t);
      }
      console.log(`  ca_panel 90 días, ${nombre}: ${tiempos.map((x) => `${x} ms`).join(" · ")} (${(p.mercados as unknown[]).length} mercados)`);
      ok(Math.min(...tiempos) < 20_000, `ca_panel 90 días (${nombre}) entra en el timeout de 20 s`, tiempos);
      ok((p.mercados as unknown[]).length === 190, "la comparativa trae los 190 mercados");
    }
  } finally {
    await db.close();
    rmSync(dir, { recursive: true, force: true });
  }
}

// Medición de fugas (20261024160000): cierre parcial sin pisar datos, vitals sueltos y el informe.
async function probarFugas(PGlite: new (dataDir?: string) => Db) {
  seccion("fugas: ca_cerrar_vista2 y ca_fugas");
  const db = await nuevaBase(PGlite, "legado");
  try {
    const ahora = "now() - interval '1 hour'";
    await como(db, "service_role", null, () =>
      db.exec(`
        insert into public.ca_vistas (id, ts, vid, sid, path, dispositivo, exp) values
          ('${V(1)}', ${ahora}, '${U.a}', '${S(1)}', '/sueldo-neto', 'movil', '{"hero":"a"}'),
          ('${V(2)}', ${ahora}, '${U.b}', '${S(2)}', '/sueldo-neto', 'escritorio', '{"hero":"b"}'),
          ('${V(3)}', ${ahora}, '${U.c}', '${S(3)}', '/sueldo-neto', 'movil', null),
          ('${V(4)}', ${ahora} + interval '1 minute', '${U.c}', '${S(3)}', '/aguinaldo', 'movil', null);
        insert into public.ca_eventos (vid, sid, vista_id, tipo, path) values
          ('${U.b}', '${S(2)}', '${V(2)}', 'compartir', '/sueldo-neto'),
          ('${U.c}', '${S(3)}', '${V(3)}', 'error', '/sueldo-neto');
      `),
    );
    const cerrar = (args: Record<string, unknown>) =>
      como(db, "service_role", null, () => {
        const claves = Object.keys(args);
        const sql = `select public.ca_cerrar_vista2(${claves.map((k, i) => `${k} => $${i + 1}`).join(", ")}) as ok`;
        return db.query(sql, Object.values(args));
      });
    await cerrar({ p_id: V(1), p_lcp_ms: 3100, p_lcp_el: "main>h1", p_ttfb_ms: 400 });
    await cerrar({ p_id: V(1), p_activo_ms: 20000, p_interacciones: 3, p_scroll: 60, p_uso: true, p_campo_ult: "Sueldo bruto" });
    await cerrar({ p_id: V(1), p_inp_ms: 350, p_inp_el: "button.calc", p_cls_milli: 120 });
    await cerrar({ p_id: V(1), p_inp_ms: 90, p_inp_el: "a.otro", p_lcp_ms: 2900 });
    await cerrar({ p_id: V(2), p_activo_ms: 40000, p_interacciones: 5, p_scroll: 90, p_uso: true, p_resultado_ms: 8000, p_rabia: 2, p_rabia_el: "button#calcular" });
    await cerrar({ p_id: V(2), p_resultado_ms: 99000, p_rabia: 1, p_activo_ms: 1000 });
    const [v1] = await filas(db, `select * from public.ca_vistas where id = '${V(1)}'`);
    igual(
      { a: v1.activo_ms, u: v1.uso_calc, c: v1.campo_ult, lcp: v1.lcp_ms, le: v1.lcp_el, inp: v1.inp_ms, ie: v1.inp_el, cls: v1.cls_milli, ttfb: v1.ttfb_ms, r: v1.resultado_ms },
      { a: 20000, u: true, c: "Sueldo bruto", lcp: 2900, le: "main>h1", inp: 350, ie: "button.calc", cls: 120, ttfb: 400, r: null },
      "los vitals sueltos no pisan el cierre, INP queda con el peor y LCP con el último",
    );
    const [v2] = await filas(db, `select * from public.ca_vistas where id = '${V(2)}'`);
    igual({ a: v2.activo_ms, r: v2.resultado_ms, g: v2.rabia }, { a: 40000, r: 8000, g: 2 }, "el primer resultado y el mayor activo quedan");
    await falla(como(db, "anon", null, () => db.query(`select public.ca_cerrar_vista2('${V(1)}')`)), "42501", "anon no puede cerrar vistas");
    await falla(como(db, "anon", null, () => db.query("select public.ca_fugas(now() - interval '1 day', now())")), "42501", "anon no lee el informe");

    const [{ f }] = await como(db, "service_role", null, () =>
      filas(db, "select public.ca_fugas(now() - interval '1 day', now() + interval '1 hour', 1) as f"),
    );
    const inf = f as Record<string, Array<Record<string, unknown>>>;
    const sn = inf.paginas.find((x) => x.path === "/sueldo-neto")!;
    igual(
      { vistas: sn.vistas, entradas: sn.entradas, usos: sn.usos, medidos: sn.usos_medidos, resultados: sn.resultados, acciones: sn.acciones, salidas: sn.salidas, rabia: sn.con_rabia, error: sn.con_error, rebotes: sn.rebotes },
      { vistas: 3, entradas: 3, usos: 2, medidos: 1, resultados: 1, acciones: 1, salidas: 2, rabia: 1, error: 1, rebotes: 0 },
      "embudo por página",
    );
    igual(inf.campos.map((c) => [c.path, c.campo, c.n]), [["/sueldo-neto", "Sueldo bruto", 1]], "campo donde se trabó quien no llegó al resultado");
    igual(
      inf.experimentos.map((x) => [x.exp, x.variante, x.vistas, x.resultados]).sort(),
      [["hero", "a", 1, 0], ["hero", "b", 1, 1]],
      "experimentos por variante",
    );
    igual(inf.mercados.map((m) => [m.mercado, m.sesiones, m.vistas]), [["ar", 3, 4]], "totales por mercado");
    await aplicarMigraciones(db);
    ok(true, "la migración de fugas se re-aplica sobre una base con datos");
  } finally {
    await db.close();
  }
}

async function main() {
  chequeosEstaticos();
  const PGlite = cargarPGlite();
  if (!PGlite) {
    console.warn("\n⚠️  PGlite no está instalado: se saltó la prueba sobre Postgres (RLS, funciones, ca_panel).");
    console.warn("   Instalalo con `npm i -D @electric-sql/pglite` o apuntá PGLITE_DIR a una carpeta que lo tenga.");
  } else {
    const mods = cargarDatos();
    const db = await nuevaBase(PGlite, "legado");
    try {
      await aplicarMigraciones(db);
      ok(true, "las migraciones se aplican dos veces seguidas sobre una base vacía");
      await sembrar(db);
      await cargarCambio(db);
      await probarCuentasYRls(db);
      await probarFunciones(db);
      await probarPanel(db, mods);
      await probarResumen(db);
      await probarIdempotencia(db);
    } finally {
      await db.close();
    }
    await probarDefaultsNuevos(PGlite);
    await probarMercados(PGlite);
    await probarPagos(PGlite);
    await probarMundo(PGlite, mods);
    await probarFugas(PGlite);
    if (process.env.CA_PANEL_MUNDO) await probarCargaMundo(PGlite);
    const carga = Number(process.env.CA_PANEL_CARGA ?? 0);
    if (carga > 0) await probarCarga(PGlite, carga);
  }
  console.log(`\n${fallas === 0 ? "✅" : "❌"} check_panel_sql: ${pasadas} ok, ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  const err = e as { message?: string; where?: string; hint?: string };
  console.error("❌ check_panel_sql se cortó:", err.message ?? e, err.where ? `
   ${err.where}` : "", err.hint ? `
   ${err.hint}` : "");
  process.exit(1);
});
