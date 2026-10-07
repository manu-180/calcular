// Gate de las opiniones (ca_opiniones): la migración tiene RLS enable + force, policies sólo
// propias, grants por columna y tope diario; y la validación del servidor (src/lib/opiniones.ts)
// coincide con los checks de la tabla. La parte de Postgres corre sobre PGlite con los roles de
// Supabase simulados, igual que check_panel_sql.ts.
//
// Correr con: npx tsx scripts/check_opiniones.ts

import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  MAX_DESDE,
  MAX_MENSAJE,
  MIN_MENSAJE,
  TOPE_DIARIO,
  TIPOS_OPINION,
  ESTADOS_OPINION,
  limpiarMensaje,
  rutaDeOrigen,
  validarOpinion,
} from "../src/lib/opiniones";

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
const propia = migraciones.find((m) => /_ca_opiniones\.sql$/.test(m.f));

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
  ok(!!propia, "existe supabase/migrations/*_ca_opiniones.sql");
  if (!propia) return;
  const sql = propia.sql;
  ok(sql.includes("alter table public.ca_opiniones enable row level security;"), "enable row level security");
  ok(sql.includes("alter table public.ca_opiniones force row level security;"), "force row level security");
  ok(/revoke all on table public\.ca_opiniones from public, anon, authenticated;/.test(sql), "revoke all de public, anon, authenticated");
  ok(!/\bto anon\b/.test(sql), "ningún grant ni policy para anon");
  ok(!/grant[^;]*\b(update|delete)\b[^;]*to authenticated/.test(sql), "authenticated sin update ni delete");
  ok(/grant insert \(tipo, mensaje, desde\) on table public\.ca_opiniones to authenticated;/.test(sql), "insert de authenticated sólo en tipo, mensaje y desde");
  const policies = [...sql.matchAll(/create policy (\w+) on public\.ca_opiniones\s+for (\w+) to (\w+)\s+(?:using|with check) \(\(select auth\.uid\(\)\) = user_id/g)];
  ok(policies.length === 2, "dos policies, las dos atadas a auth.uid() = user_id", policies.map((p) => p[1]));
  ok(policies.every((p) => p[3] === "authenticated"), "policies sólo para authenticated");
  ok(!/security definer/i.test(sql), "sin security definer");
  ok(/\nset search_path = ''\n/.test(sql), "la función del tope fija search_path");
  ok(/revoke execute on function public\.ca_opiniones_tope\(\) from public, anon, authenticated;/.test(sql), "execute del tope revocado");
  ok(sql.includes(`between ${MIN_MENSAJE} and ${MAX_MENSAJE}`), `largo del mensaje igual que el servidor (${MIN_MENSAJE} a ${MAX_MENSAJE})`);
  ok(sql.includes(`between 1 and ${MAX_DESDE}`), `largo de desde igual que el servidor (${MAX_DESDE})`);
  ok(sql.includes(`>= ${TOPE_DIARIO} then`), `tope diario igual que el servidor (${TOPE_DIARIO})`);
  ok(sql.includes(`tipo in (${TIPOS_OPINION.map((t) => `'${t}'`).join(", ")})`), "tipos iguales que el servidor");
  ok(sql.includes(`estado in (${ESTADOS_OPINION.map((t) => `'${t}'`).join(", ")})`), "estados iguales que el servidor");
}

function validacion() {
  seccion("validación del servidor");
  ok(validarOpinion({ tipo: "idea", mensaje: "Sumen horas extras" }).ok, "acepta una opinión normal");
  ok(!validarOpinion({ tipo: "otro", mensaje: "Sumen horas extras" }).ok, "rechaza un tipo inventado");
  ok(!validarOpinion({ tipo: "idea", mensaje: "  hola " }).ok, "rechaza menos de 5 caracteres sin espacios");
  ok(!validarOpinion({ tipo: "idea", mensaje: "x".repeat(MAX_MENSAJE + 1) }).ok, "rechaza más del máximo");
  ok(validarOpinion({ tipo: "idea", mensaje: "é".repeat(MAX_MENSAJE) }).ok, "cuenta caracteres, no bytes");
  ok(limpiarMensaje("a\u0000b\r\nc\u0007") === "ab\nc", "saca caracteres de control y normaliza saltos");
  ok(rutaDeOrigen("/aguinaldo?sueldo=900000#x") === "/aguinaldo", "desde guarda sólo el path");
  ok(rutaDeOrigen("//evil.com") === null, "desde rechaza //otro-sitio");
  ok(rutaDeOrigen("/\\evil.com") === null, "desde rechaza /\\otro-sitio");
  ok(rutaDeOrigen("/..//evil.com") === null, "desde rechaza lo que se normaliza a //");
  ok(rutaDeOrigen("https://evil.com/x") === null, "desde rechaza URLs absolutas");
  ok(rutaDeOrigen(`/${"a".repeat(MAX_DESDE)}`) === null, "desde rechaza rutas largas");
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

async function aplicar(db: Db) {
  for (const m of migraciones) {
    if (m.f.includes("_cron")) continue;
    await db.exec("set role dueno");
    try {
      await db.exec(m.sql);
    } finally {
      await db.exec("reset role");
    }
  }
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

const A = "bbbbbbbb-0000-4000-8000-000000000001";
const B = "bbbbbbbb-0000-4000-8000-000000000002";
const insertar = (db: Db, tipo: string, mensaje: string, desde: string | null = null) =>
  db.query("insert into public.ca_opiniones (tipo, mensaje, desde) values ($1, $2, $3) returning id, user_id, estado, mensaje", [tipo, mensaje, desde]);

async function postgres(PGlite: new () => Db) {
  const db = new PGlite();
  try {
    await db.exec(SUPABASE);
    await aplicar(db);
    await aplicar(db);
    ok(true, "las migraciones se aplican dos veces seguidas");
    await db.exec(`insert into auth.users (id, email) values ('${A}', 'a@prueba.test'), ('${B}', 'b@prueba.test');`);

    seccion("RLS y grants");
    const r = await como(db, "authenticated", A, () => insertar(db, "idea", "  Sumen horas extras  ", "/horas-extras"));
    const fila = r.rows[0];
    ok(fila?.user_id === A, "user_id sale de auth.uid()", fila?.user_id);
    ok(fila?.estado === "nueva", "arranca como nueva", fila?.estado);
    ok(fila?.mensaje === "Sumen horas extras", "el mensaje se guarda sin espacios de borde", fila?.mensaje);
    const id = String(fila?.id);

    await como(db, "authenticated", A, () =>
      falla(db.query("insert into public.ca_opiniones (user_id, tipo, mensaje) values ($1, 'idea', 'a nombre de otro')", [B]), "42501", "no puede elegir user_id"),
    );
    await como(db, "authenticated", A, () =>
      falla(db.query("insert into public.ca_opiniones (tipo, mensaje, estado) values ('idea', 'ya resuelta', 'resuelta')"), "42501", "no puede elegir el estado"),
    );
    await como(db, "authenticated", A, () => falla(db.query("update public.ca_opiniones set estado = 'resuelta'"), "42501", "no puede cambiar el estado"));
    await como(db, "authenticated", A, () => falla(db.query("update public.ca_opiniones set mensaje = 'otro'"), "42501", "no puede editar el mensaje"));
    await como(db, "authenticated", A, () => falla(db.query("delete from public.ca_opiniones"), "42501", "no puede borrar"));
    await como(db, "anon", null, () => falla(db.query("select id from public.ca_opiniones"), "42501", "anon no lee"));
    await como(db, "anon", null, () => falla(insertar(db, "idea", "anónima sin cuenta"), "42501", "anon no inserta"));

    const deB = await como(db, "authenticated", B, () => db.query("select id from public.ca_opiniones"));
    ok(deB.rows.length === 0, "otra cuenta no ve las ajenas", deB.rows.length);
    const filtroB = await como(db, "authenticated", B, () => db.query("select id from public.ca_opiniones where id = $1", [id]));
    ok(filtroB.rows.length === 0, "ni pidiéndola por id");
    const deA = await como(db, "authenticated", A, () => db.query("select id, estado from public.ca_opiniones"));
    ok(deA.rows.length === 1, "cada cuenta ve las suyas", deA.rows.length);

    seccion("checks de la tabla");
    await como(db, "authenticated", A, () => falla(insertar(db, "otro", "tipo inventado"), "23514", "tipo inventado"));
    await como(db, "authenticated", A, () => falla(insertar(db, "idea", "  ab  "), "23514", "mensaje corto"));
    await como(db, "authenticated", A, () => falla(insertar(db, "idea", "x".repeat(MAX_MENSAJE + 1)), "23514", "mensaje largo"));
    await como(db, "authenticated", A, () => falla(insertar(db, "idea", "desde raro", "//evil.com"), "23514", "desde //otro-sitio"));
    await como(db, "authenticated", A, () => falla(insertar(db, "idea", "desde raro", "aguinaldo"), "23514", "desde sin barra"));

    seccion("tope diario");
    for (let i = 1; i < TOPE_DIARIO; i++) await como(db, "authenticated", A, () => insertar(db, "otra", `opinión número ${i}`));
    await como(db, "authenticated", A, () => falla(insertar(db, "otra", "una de más"), "P0001", `la ${TOPE_DIARIO + 1}ª del día se rechaza`));
    const otraCuenta = await como(db, "authenticated", B, () => insertar(db, "error", "el tope es por cuenta"));
    ok(otraCuenta.rows.length === 1, "el tope de una cuenta no frena a otra");
    await db.exec(`update public.ca_opiniones set created_at = now() - interval '25 hours' where user_id = '${A}'`);
    const alOtroDia = await como(db, "authenticated", A, () => insertar(db, "idea", "al día siguiente"));
    ok(alOtroDia.rows.length === 1, "pasadas 24 horas vuelve a dejar");

    seccion("panel (service role)");
    const todas = await como(db, "service_role", null, () => db.query("select count(*)::int as n from public.ca_opiniones"));
    ok(todas.rows[0]?.n === TOPE_DIARIO + 2, "service role lee todas", todas.rows[0]?.n);
    const antes = await db.query("select updated_at::text as t from public.ca_opiniones where id = $1", [id]);
    await new Promise((res) => setTimeout(res, 5));
    await como(db, "service_role", null, () => db.query("update public.ca_opiniones set estado = 'leida' where id = $1", [id]));
    const despues = await db.query("select estado, updated_at::text as t from public.ca_opiniones where id = $1", [id]);
    ok(despues.rows[0]?.estado === "leida", "service role cambia el estado");
    ok(despues.rows[0]?.t !== antes.rows[0]?.t, "updated_at se mueve solo", [antes.rows[0]?.t, despues.rows[0]?.t]);
    const vista = await como(db, "authenticated", A, () => db.query("select estado from public.ca_opiniones where id = $1", [id]));
    ok(vista.rows[0]?.estado === "leida", "la persona ve el estado nuevo");
    await como(db, "service_role", null, () => falla(db.query("update public.ca_opiniones set estado = 'archivada' where id = $1", [id]), "23514", "estado inventado"));

    seccion("baja de cuenta");
    await db.exec(`delete from auth.users where id = '${A}'`);
    const quedan = await db.query("select count(*)::int as n from public.ca_opiniones where user_id = $1", [A]);
    ok(quedan.rows[0]?.n === 0, "borrar la cuenta borra sus opiniones");

    const politicas = await db.query("select count(*)::int as n from pg_policies where tablename = 'ca_opiniones'");
    ok(politicas.rows[0]?.n === 2, "2 policies sin duplicados tras reaplicar", politicas.rows[0]?.n);
    const rls = await db.query("select relrowsecurity, relforcerowsecurity from pg_class where oid = 'public.ca_opiniones'::regclass");
    ok(rls.rows[0]?.relrowsecurity === true && rls.rows[0]?.relforcerowsecurity === true, "RLS enable + force en la base");
  } finally {
    await db.close();
  }
}

async function main() {
  estaticos();
  validacion();
  const PGlite = cargarPGlite();
  if (!PGlite) console.warn("\n⚠️  PGlite no está instalado: se saltó la prueba sobre Postgres (RLS, tope, grants).");
  else await postgres(PGlite);
  console.log(`\n${fallas === 0 ? "✅" : "❌"} check_opiniones: ${pasadas} ok, ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("❌ check_opiniones se cortó:", (e as Error).message ?? e);
  process.exit(1);
});
