// El motor de datos vivos de calcular.ar. Lo corre .github/workflows/datos-vivos.yml varias veces
// por día; también se puede correr a mano: `npx -y tsx scripts/datos-vivos/correr.ts`.
//
// QUÉ HACE, en orden:
//   1. Corre cada actualizador (fuentes oficiales: INDEC, BCRA, ANSES/B.O., datos.gob.ar).
//   2. Si un paso cambió archivos, corre SUS checks. Si alguno sale rojo, revierte ESE paso y lo
//      anota: un dato que no pasa su verificación no se publica, pero tampoco frena a los demás.
//   3. Un cambio que es sólo la fecha de consulta ("Descargado el …") se descarta, salvo que la
//      fecha guardada tenga más de 7 días: así el "verificado el" del sitio no envejece, pero no se
//      redeploya todos los días por nada.
//   4. Si quedó algún cambio real, corre check-all completo (la puerta de siempre). Rojo → revierte
//      todo y avisa.
//   5. Corre el semáforo (scripts/vigia/check-datos-vencen.ts), que mira lo que NO se puede cargar
//      solo (circulares de gremios, PDFs de ARCA, resoluciones que no pasaron el ancla).
//   6. Deja .datos-vivos/resumen.json, .datos-vivos/alerta.md (vacío si no hay nada que avisar) y
//      .datos-vivos/commit.txt. Commitear, pushear y abrir el issue lo hace el workflow.
//
// Sale 0 aunque algo haya fallado: los fallos van al resumen y a la alerta, no al exit code (un
// workflow rojo todos los días por una fuente caída entrena a ignorarlo).

import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { hoyAR } from "../../src/lib/hoy";

const RAIZ = resolve(import.meta.dirname, "..", "..");
const SALIDA = resolve(RAIZ, ".datos-vivos");
const DIAS_REFRESCO_FECHA = 7;

type Paso = { id: string; que: string; script: string; args?: string[]; checks: string[]; timeoutS?: number };

const PASOS: Paso[] = [
  { id: "ipc", que: "Serie del IPC (INDEC vía datos.gob.ar)", script: "scripts/gen_ipc_serie.ts", checks: ["check_inflacion"] },
  { id: "plazofijo", que: "TNA (BCRA) e inflación de referencia de /plazo-fijo", script: "scripts/datos-vivos/rotar_plazofijo.ts", checks: ["check_plazofijo", "check_datos-vivos"] },
  { id: "canasta-basica", que: "Canasta básica CBA/CBT (INDEC)", script: "scripts/gen_canasta_basica.ts", checks: ["check_canasta_basica"] },
  { id: "canasta-crianza", que: "Canasta de crianza (INDEC)", script: "scripts/gen_canasta_crianza.ts", checks: ["check_canasta_crianza", "check_cuota_alimentaria"] },
  {
    id: "anses",
    que: "Resoluciones de ANSES y decreto del bono (Boletín Oficial)",
    script: "scripts/datos-vivos/cargar_anses.ts",
    checks: ["check_jubilaciones", "check_asignaciones", "check_puam", "check_pnc", "check_edad_avanzada", "check_descuento_pami", "check_garantia_82", "check_sueldo"],
    timeoutS: 600,
  },
  { id: "aportes-casas", que: "Aportes, contribuciones y ART de casas particulares (PDF de ARCA)", script: "scripts/gen_aportes_casas.ts", args: ["--escribir"], checks: ["check_aportes_casas", "check_art_casas_particulares", "check_deduccion_domestica"] },
  { id: "uma", que: "UMA de honorarios (resoluciones de la CSJN)", script: "scripts/gen_uma.ts", args: ["--escribir"], checks: ["check_honorarios_periciales"], timeoutS: 600 },
  { id: "jubilaciones", que: "Serie del haber mínimo (ANSES vía datos.gob.ar)", script: "scripts/gen_jubilaciones.ts", checks: ["check_jubilaciones"] },
  { id: "vigencias", que: "Mes vigente de cada dato elegido por fecha", script: "scripts/datos-vivos/vigencias.ts", checks: [] },
];

type Resultado = {
  id: string;
  que: string;
  estado: "sin-cambios" | "actualizado" | "solo-fecha" | "rechazado" | "fuente-caida" | "aviso" | "error";
  detalle: string;
  archivos: string[];
};

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" });
}

function tsx(script: string, args: string[] = [], timeoutS = 300) {
  const r = spawnSync("npx", ["-y", "tsx", script, ...args], {
    cwd: RAIZ,
    encoding: "utf8",
    shell: process.platform === "win32",
    timeout: timeoutS * 1000,
    maxBuffer: 32 * 1024 * 1024,
  });
  const salida = `${r.stdout ?? ""}${r.stderr ?? ""}`.trim();
  return { code: r.status ?? (r.error ? 124 : 1), salida };
}

function cambiados(): Set<string> {
  const s = new Set<string>();
  for (const l of git(["status", "--porcelain", "--untracked-files=all", "--", "src", "scripts", "private"]).split("\n")) {
    if (l.trim()) s.add(l.slice(3).trim());
  }
  return s;
}

function revertir(archivos: string[]): void {
  const rastreados = archivos.filter((f) => git(["ls-files", "--", f]).trim());
  const nuevos = archivos.filter((f) => !rastreados.includes(f));
  if (rastreados.length) git(["checkout", "--", ...rastreados]);
  if (nuevos.length) git(["clean", "-fq", "--", ...nuevos]);
}

const RE_FECHA = /Descargado el|Consultado:|consultadoEl|IPC_DESCARGADO_EL/;

/** "solo-fecha" si todo lo que cambió son líneas de fecha de consulta; devuelve también la fecha vieja. */
function soloFecha(archivos: string[]): { soloFecha: boolean; fechaVieja: string | null } {
  let fechaVieja: string | null = null;
  for (const f of archivos) {
    if (!git(["ls-files", "--", f]).trim()) return { soloFecha: false, fechaVieja };
    const diff = git(["diff", "-U0", "--", f]).split("\n").filter((l) => /^[+-]/.test(l) && !/^(\+\+\+|---)/.test(l));
    if (diff.length === 0) continue;
    if (!diff.every((l) => RE_FECHA.test(l))) return { soloFecha: false, fechaVieja };
    for (const l of diff.filter((x) => x.startsWith("-"))) {
      const m = l.match(/\d{4}-\d{2}-\d{2}/);
      if (m && (!fechaVieja || m[0] < fechaVieja)) fechaVieja = m[0];
    }
  }
  return { soloFecha: true, fechaVieja };
}

const dias = (a: string, b: string) => Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

function correrChecks(checks: string[]): string[] {
  const rojos: string[] = [];
  for (const c of checks) {
    const r = tsx(`scripts/${c}.ts`, [], 300);
    if (r.code !== 0) rojos.push(`${c}: ${r.salida.split("\n").filter((l) => /FAIL|Error|❌/.test(l)).slice(0, 4).join(" | ") || `exit ${r.code}`}`);
  }
  return rojos;
}

function main(): void {
  mkdirSync(SALIDA, { recursive: true });
  const hoy = hoyAR();
  const resultados: Resultado[] = [];
  const sucioAntes = cambiados();
  if (sucioAntes.size) {
    console.error(`❌ El árbol ya tiene cambios antes de empezar (${[...sucioAntes].join(", ")}): no mezclo.`);
    process.exit(1);
  }

  for (const p of PASOS) {
    const antes = cambiados();
    const r = tsx(p.script, p.args, p.timeoutS ?? 300);
    const archivos = [...cambiados()].filter((f) => !antes.has(f));
    const ultimas = r.salida.split("\n").filter((l) => /[🔄🔴⚠️✓⏳❌]|OK|ERROR|CONFLICTO/.test(l)).slice(-6).join(" | ");
    console.log(`\n── ${p.id}: ${p.que}\n${r.salida.split("\n").slice(-8).join("\n")}`);

    if (r.code !== 0 && r.code !== 2) {
      revertir(archivos);
      resultados.push({ id: p.id, que: p.que, estado: r.code === 3 ? "fuente-caida" : "error", detalle: ultimas || `exit ${r.code}`, archivos: [] });
      continue;
    }
    if (archivos.length === 0) {
      resultados.push({ id: p.id, que: p.que, estado: r.code === 2 ? "aviso" : "sin-cambios", detalle: ultimas, archivos: [] });
      continue;
    }
    const sf = soloFecha(archivos);
    if (sf.soloFecha && (!sf.fechaVieja || dias(sf.fechaVieja, hoy) < DIAS_REFRESCO_FECHA)) {
      revertir(archivos);
      resultados.push({ id: p.id, que: p.que, estado: r.code === 2 ? "aviso" : "sin-cambios", detalle: `${ultimas} (sólo cambió la fecha de consulta: no se publica)`, archivos: [] });
      continue;
    }
    const rojos = correrChecks(p.checks);
    if (rojos.length) {
      revertir(archivos);
      resultados.push({ id: p.id, que: p.que, estado: "rechazado", detalle: `El dato nuevo NO pasó sus checks y se descartó: ${rojos.join(" · ")}`, archivos });
      continue;
    }
    resultados.push({
      id: p.id,
      que: p.que,
      estado: sf.soloFecha ? "solo-fecha" : r.code === 2 ? "aviso" : "actualizado",
      detalle: sf.soloFecha ? `fecha de consulta refrescada (la guardada era del ${sf.fechaVieja})` : ultimas,
      archivos,
    });
  }

  let puerta: "sin-cambios" | "verde" | "roja" = "sin-cambios";
  let puertaDetalle = "";
  const tocados = [...cambiados()];
  if (tocados.length) {
    // Los .xlsx de private/ los compara check-all (check_planilla_*) contra src/data. Sin regenerarlos
    // con el dato nuevo, la puerta salía roja en CADA corrida con cambios: del 28/9 al 6/10/2026 no se
    // publicó nada (TNA y aportes de ARCA de septiembre listos y descartados). Se commitean con el dato.
    const g = tsx("scripts/gen_planilla_todas.ts", [], 600);
    if (g.code !== 0) console.log(`\n── planillas: gen_planilla_todas salió ${g.code}\n${g.salida.split("\n").slice(-6).join("\n")}`);
    const r = tsx("scripts/check-all.ts", [], 1500);
    if (r.code === 0) {
      puerta = "verde";
    } else {
      puerta = "roja";
      puertaDetalle = r.salida.split("\n").filter((l) => /❌|FAIL/.test(l)).slice(0, 10).join("\n");
      revertir([...cambiados()]);
    }
  }

  const semaforo = tsx("scripts/vigia/check-datos-vencen.ts", [], 900).salida;
  console.log(`\n── semáforo\n${semaforo}`);
  const lineasSemaforo = semaforo.split("\n").map((l) => l.trimEnd());
  // Mismo contrato que el detector: sólo hay algo que avisar si hay veredicto ⛔ (vencido Y con
  // reemplazo publicado). Un 🔴 "vence esta semana" cuya fuente todavía no publicó no es accionable:
  // avisarlo entrena a ignorar el aviso.
  const veredicto = lineasSemaforo.find((l) => l.trimStart().startsWith("⛔"));
  const vencidos = veredicto
    ? [veredicto.trim(), ...lineasSemaforo.filter((l) => /^\s*🔴/.test(l)).map((l) => l.replace(/\s{2,}/g, " · ").trim())]
    : [];

  const actualizados = resultados.filter((r) => r.estado === "actualizado" || r.estado === "solo-fecha" || (r.estado === "aviso" && r.archivos.length));
  const problemas = resultados.filter((r) => ["rechazado", "error", "aviso"].includes(r.estado));
  const hayCambios = puerta === "verde" && cambiados().size > 0;

  const resumen = { hoy, puerta, puertaDetalle, hayCambios, resultados, vencidos };
  writeFileSync(resolve(SALIDA, "resumen.json"), JSON.stringify(resumen, null, 2));

  const titulos = actualizados.map((r) => r.id).join(", ");
  writeFileSync(
    resolve(SALIDA, "commit.txt"),
    `datos-vivos: ${titulos || "sin cambios"} (${hoy})\n\n` +
      actualizados.map((r) => `- ${r.que}: ${r.detalle}`).join("\n") +
      "\n\nCommit automático del workflow datos-vivos: cada dato pasó sus checks y check-all completo.\n",
  );

  const alerta: string[] = [];
  if (puerta === "roja") alerta.push(`### 🔴 check-all salió rojo con los datos nuevos\nNo se publicó nada de esta corrida.\n\n\`\`\`\n${puertaDetalle}\n\`\`\``);
  for (const r of problemas) alerta.push(`### ${r.estado === "rechazado" || r.estado === "error" ? "🔴" : "🟡"} ${r.que} — ${r.estado}\n${r.detalle}`);
  if (vencidos.length) alerta.push(`### Semáforo: datos que hay que cargar a mano\n${vencidos.map((v) => `- ${v}`).join("\n")}\n\nDetalle: \`npx -y tsx scripts/vigia/check-datos-vencen.ts\``);
  writeFileSync(
    resolve(SALIDA, "alerta.md"),
    alerta.length
      ? `Corrida del ${hoy}. calcular.ar sigue sirviendo el dato anterior (con su fecha a la vista) hasta que esto se resuelva.\n\n${alerta.join("\n\n")}\n`
      : "",
  );

  const tabla = resultados.map((r) => `| ${r.id} | ${r.estado} | ${r.detalle.replace(/\|/g, "/").slice(0, 300)} |`).join("\n");
  const md = `## datos-vivos · ${hoy}\n\nPuerta check-all: **${puerta}** · cambios a publicar: **${hayCambios ? "sí" : "no"}**\n\n| paso | estado | detalle |\n|---|---|---|\n${tabla}\n\n${vencidos.length ? `**Semáforo:**\n${vencidos.map((v) => `- ${v}`).join("\n")}` : "Semáforo: nada vencido."}\n`;
  writeFileSync(resolve(SALIDA, "resumen.md"), md);
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, md, { flag: "a" });
  console.log(`\n${md}`);
}

main();
