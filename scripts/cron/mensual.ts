// Ronda mensual de calcularya, sin GitHub Actions: refresca los precios de «¿Cuántas horas de trabajo
// cuesta?» (los de las tiendas y los oficiales de calcular.ar: INDEC y surtidores), saca la foto mensual de los rankings, poda las universales sin impresiones (scripts/poda-universales.ts), valida con check_horas y check_rankings y, si algo
// cambió, commitea SOLO esos archivos de datos y los pushea a main (= deploy en Vercel), como datos-vivos.
// Lo corre el día 1 la tarea programada CalcularYa-Mensual (scripts/cron/mensual.ps1, que deja un
// checkout limpio en origin/main) y, cuando vuelva el billing, .github/workflows/mensual.yml.
//
//   npx tsx scripts/cron/mensual.ts --dry           qué haría, sin leer tiendas ni escribir nada
//   npx tsx scripts/cron/mensual.ts                 corre y publica
//   npx tsx scripts/cron/mensual.ts --sin-publicar  corre y valida, sin commit (lo usa el workflow)
//   npx tsx scripts/cron/mensual.ts --forzar        relee precios aunque ya se hayan leído este mes
//
// Re-ejecutable sin efectos dobles (idempotencia por contenido, así la PC y Actions pueden correr los dos):
// - los precios se releen solo si precios.json no es de este mes; la foto, solo si no existe la del mes;
// - sin diferencias contra origin/main no hay commit; si el otro corredor ya publicó lo mismo, el rebase
//   descarta el commit propio y no se pushea nada.
// Log en CALCULARYA_CRON_LOG (o %LOCALAPPDATA%\calcularya-cron\logs). Sale ≠ 0 si algo falla.
import { execFileSync, spawnSync } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const RAIZ = path.resolve(import.meta.dirname, "..", "..");
const PRECIOS = "src/lib/horas/precios.json";
const COTIDIANOS = "src/lib/horas/cotidianos-ar.json";
const HISTORIAL = "src/motor/rankings/historial";
const PODADAS = "src/motor/universales/podadas.json";
const DATOS = [PRECIOS, COTIDIANOS, HISTORIAL, PODADAS];
// El autor tiene que ser manu-180: Vercel bloquea (BLOCKED, sin avisar) un deploy cuyo autor no es del equipo.
const AUTOR = ["-c", "user.name=manu-180", "-c", "user.email=157671390+manu-180@users.noreply.github.com"];

const args = new Set(process.argv.slice(2));
const seco = args.has("--dry");
const publicar = !seco && !args.has("--sin-publicar");
const forzar = args.has("--forzar");

const sello = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);
const LOG = process.env.CALCULARYA_CRON_LOG || path.join(process.env.LOCALAPPDATA || os.tmpdir(), "calcularya-cron", "logs", `mensual-${sello}.log`);
mkdirSync(path.dirname(LOG), { recursive: true });

function log(m: string) {
  const linea = `[${new Date().toISOString()}] ${m}`;
  console.log(linea);
  appendFileSync(LOG, `${linea}\n`);
}

function git(...a: string[]): string {
  return execFileSync("git", a, { cwd: RAIZ, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function intentarGit(...a: string[]): boolean {
  return spawnSync("git", a, { cwd: RAIZ, stdio: "ignore" }).status === 0;
}

// npx en Windows es un .cmd: con shell para que lo encuentre. Los argumentos son fijos (sin entrada externa).
function correr(titulo: string, script: string, extra: string[] = []): boolean {
  log(`→ ${titulo}: npx tsx ${script} ${extra.join(" ")}`.trimEnd());
  // TSX_DISABLE_CACHE: sin eso check_hreflang muere con EMFILE en Windows (ver check-all.ts).
  const r = spawnSync("npx", ["tsx", script, ...extra], { cwd: RAIZ, encoding: "utf8", shell: process.platform === "win32", maxBuffer: 64 * 1024 * 1024, env: { ...process.env, TSX_DISABLE_CACHE: "1" } });
  appendFileSync(LOG, `${r.stdout ?? ""}${r.stderr ?? ""}\n`);
  const avisos = `${r.stdout ?? ""}`.split("\n").filter((l) => l.includes("⚠️") || l.includes("❌") || /^(OK|TODO OK|FALLAS|\s*FALLAS|poda:)/.test(l.trim()));
  for (const a of avisos.slice(0, 20)) log(`   ${a.trim()}`);
  log(`  ${titulo}: exit ${r.status}`);
  return r.status === 0;
}

// CALCULARYA_CRON_MES=AAAA-MM simula otro mes (solo para --dry: ver qué haría el día 1).
const mesActual = /^\d{4}-\d{2}$/.test(process.env.CALCULARYA_CRON_MES ?? "") && seco ? process.env.CALCULARYA_CRON_MES! : new Date().toISOString().slice(0, 7);

function leerJson<T>(rel: string): T | null {
  try {
    return JSON.parse(readFileSync(path.join(RAIZ, rel), "utf8")) as T;
  } catch {
    return null;
  }
}

function cambios(): string[] {
  const s = git("status", "--porcelain", "--", ...DATOS);
  return s ? s.split("\n").map((l) => l.slice(3)) : [];
}

function descartar() {
  intentarGit("checkout", "--", ...DATOS);
  intentarGit("clean", "-fdq", "--", HISTORIAL);
}

function main(): number {
  log(`ronda mensual ${mesActual} · ${seco ? "seco" : publicar ? "publica" : "sin publicar"} · log ${LOG}`);
  const sucio = git("status", "--porcelain", "--", ...DATOS);
  if (sucio && !seco) {
    log(`❌ los archivos de datos ya tienen cambios sin commitear:\n${sucio}`);
    return 1;
  }

  const precios = leerJson<{ actualizadoEl?: string }>(PRECIOS);
  const preciosAlDia = !!precios?.actualizadoEl?.startsWith(mesActual);
  const tocaPrecios = forzar || !preciosAlDia;
  const cotidianos = leerJson<{ actualizadoEl?: string }>(COTIDIANOS);
  const tocaCotidianos = forzar || !cotidianos?.actualizadoEl?.startsWith(mesActual);
  log(`cotidianos-ar.json leído el ${cotidianos?.actualizadoEl ?? "?"}: ${tocaCotidianos ? "toca releer INDEC y surtidores" : "ya es de este mes"}`);
  const fotoExiste = existsSync(path.join(RAIZ, HISTORIAL, `${mesActual}.json`));
  log(`precios.json leído el ${precios?.actualizadoEl ?? "?"}: ${tocaPrecios ? "toca releer las tiendas" : "ya es de este mes, no se relee"}`);
  // foto_mensual.ts es idempotente (no pisa la foto del mes de la grilla): corre siempre.
  log(`foto de rankings ${mesActual}: ${fotoExiste ? "ya existe, no se rehace" : "falta, se saca"}`);

  if (seco) {
    log(`(seco) correría: ${[tocaPrecios ? "scripts/horas/actualizar_precios.ts" : "", tocaCotidianos ? "scripts/horas/actualizar_cotidianos_ar.ts" : "", "scripts/rankings/foto_mensual.ts", "scripts/check_horas.ts", "scripts/check_horas_ar.ts", "scripts/check_rankings.ts"].filter(Boolean).join(" → ")}`);
    correr("poda de universales (seco)", "scripts/poda-universales.ts", ["--dry"]);
    log(`(seco) commitearía solo ${DATOS.join(" y ")} con autor manu-180 y pushearía a main (pull --rebase, 3 intentos)`);
    const okHoras = correr("check_horas (estado de hoy)", "scripts/check_horas.ts");
    const okHorasAr = correr("check_horas_ar (estado de hoy)", "scripts/check_horas_ar.ts");
    const okRankings = correr("check_rankings (estado de hoy)", "scripts/check_rankings.ts");
    log(`(seco) validación de hoy: ${okHoras && okHorasAr && okRankings ? "verde" : "ROJA, no publicaría"}`);
    return 0;
  }

  if (tocaPrecios && !correr("precios de horas", "scripts/horas/actualizar_precios.ts")) return fallar("el refresco de precios falló");
  if (tocaCotidianos && !correr("precios oficiales de calcular.ar", "scripts/horas/actualizar_cotidianos_ar.ts")) return fallar("el refresco de precios oficiales falló");
  if (!correr("foto de rankings", "scripts/rankings/foto_mensual.ts")) return fallar("la foto de rankings falló");
  if (!correr("check_horas", "scripts/check_horas.ts")) return fallar("check_horas en rojo: no se publica");
  if (!correr("check_horas_ar", "scripts/check_horas_ar.ts")) return fallar("check_horas_ar en rojo: no se publica");
  if (!correr("check_rankings", "scripts/check_rankings.ts")) return fallar("check_rankings en rojo: no se publica");
  // La poda no frena la ronda: si Search Console falla o el hreflang no cierra, se publica lo demás y la
  // poda espera al mes siguiente. Sin GSC_SERVICE_ACCOUNT_JSON el script no toca nada.
  if (!correr("poda de universales", "scripts/poda-universales.ts")) {
    log("⚠️ la poda falló: se descarta y sigue la ronda");
    intentarGit("checkout", "--", PODADAS);
  } else if (git("status", "--porcelain", "--", PODADAS) && !(correr("check_poda", "scripts/check_poda.ts") && correr("check_hreflang", "scripts/check_hreflang.ts"))) {
    log("⚠️ con la poda nueva check_poda o check_hreflang dan rojo: se descarta y sigue la ronda");
    intentarGit("checkout", "--", PODADAS);
  }

  const lista = cambios();
  if (!lista.length) {
    log("✅ nada cambió: no hay nada que publicar");
    return 0;
  }
  log(`cambios: ${lista.join(", ")}`);
  if (!publicar) {
    log("✅ validado; --sin-publicar: queda sin commit");
    return 0;
  }

  git("add", "--", ...DATOS);
  const partes = [lista.some((f) => f.startsWith(PRECIOS)) ? "precios de horas" : "", lista.some((f) => f.startsWith(COTIDIANOS)) ? "precios oficiales de horas en calcular.ar" : "", lista.some((f) => f.startsWith(HISTORIAL)) ? "foto de rankings" : "", lista.some((f) => f.startsWith(PODADAS)) ? "poda de universales sin impresiones" : ""].filter(Boolean);
  git(...AUTOR, "commit", "-q", "-m", `datos(mensual): ${partes.join(" y ")} ${mesActual}`, "-m", "Ronda mensual automática (scripts/cron/mensual.ts): datos validados con check_horas, check_horas_ar y check_rankings; la poda, con check_poda y check_hreflang.");
  log(`commit ${git("log", "--oneline", "-1")}`);

  for (let intento = 1; intento <= 3; intento++) {
    if (!intentarGit("fetch", "-q", "origin", "main")) {
      log(`  fetch falló (intento ${intento})`);
      continue;
    }
    if (!intentarGit(...AUTOR, "rebase", "-q", "origin/main")) {
      intentarGit("rebase", "--abort");
      // Choca solo si el otro corredor publicó otra lectura del mismo mes: la suya vale igual.
      if (yaPublicadoEnMain()) {
        log("✅ origin/main ya tiene los datos de este mes (los publicó el otro corredor): no se pushea");
        return 0;
      }
      return fallar("el rebase contra origin/main chocó");
    }
    if (git("rev-parse", "HEAD") === git("rev-parse", "origin/main")) {
      log("✅ origin/main ya tenía exactamente estos datos: nada que pushear");
      return 0;
    }
    if (intentarGit("push", "-q", "origin", "HEAD:main")) {
      log(`✅ publicado en main: ${git("log", "--oneline", "-1")}`);
      return 0;
    }
    log(`  push rechazado (intento ${intento})`);
  }
  return fallar("no pude pushear después de 3 intentos");
}

function yaPublicadoEnMain(): boolean {
  try {
    const remoto = JSON.parse(git("show", `origin/main:${PRECIOS}`)) as { actualizadoEl?: string };
    const foto = intentarGit("cat-file", "-e", `origin/main:${HISTORIAL}/${mesActual}.json`);
    return !!remoto.actualizadoEl?.startsWith(mesActual) && foto;
  } catch {
    return false;
  }
}

function fallar(motivo: string): number {
  log(`❌ ${motivo}`);
  if (!seco) descartar();
  return 1;
}

let codigo = 1;
try {
  codigo = main();
} catch (err) {
  log(`❌ excepción: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`);
}
process.exit(codigo);
