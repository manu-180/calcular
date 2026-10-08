// Runner de datos de los países de calcularya.com (ADR 0001, D5 y enmienda del 7/10/2026). Lo corre
// .github/workflows/datos-paises.yml, un mercado por job; a mano:
//   npx tsx scripts/datos-paises/correr.ts --mercado pe [--issues issues.json] [--salida dir]
//   npx tsx scripts/datos-paises/correr.ts --todos
//   --respuestas archivo.json ({ "url": respuesta }) reemplaza la red: prueba de punta a punta sin red.
//
// Carril serie: agrega a src/paises/<m>/series.json solo los puntos que pasan revisarPuntos (banda,
// salto, fecha) y nunca reescribe uno publicado. Carril norma: no escribe datos, arma el issue del
// país con el link y lo que hay que verificar, sin repetir lo ya avisado (memoria: --issues).
// Con cambios corre check_paises, check_paises_casos, check_textos_paises, check_fronteras y
// check-all completo; rojo revierte. Deja en la salida issue.md (vacío = cerrar), comentario.md,
// commit.txt, archivos.txt (lo que hay que commitear), resumen.md y resumen.json; si hay algo para
// publicar, también issue-sin-publicar.md y comentario-sin-publicar.md (los usa el job issues cuando
// el parche no llegó a main).
//
// Sale 0 aunque una fuente esté caída: eso va al issue, no al exit code (igual que datos-vivos de AR).
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fusionarPuntos } from "../../src/motor/bandas";
import { validarArchivoSeries } from "../../src/motor/datos";
import type { FechaISO, Http, PaisDefinido } from "../../src/motor/tipos";
import { hoyEn, hoyMasAdelantado } from "../../src/motor/vigencia";
import { cargarPaises, RAIZ } from "../paises_comun";
import { correrDetectores, type Corrida } from "./lib/detectores";
import { crearHttpReal } from "./lib/http";
import { armarIssue, bloqueDeCodigo, leerIssues, type IssuePrevio, type Puerta } from "./lib/issue";
import { semaforoPais } from "./lib/semaforo";
import { agregarPuntos } from "./lib/series-json";
import { mercadosConDetectores } from "./matriz";

const ENV_CHECKS = { ...process.env, PAISES_TOLERANTE: "1" };

function arg(nombre: string): string | undefined {
  const i = process.argv.indexOf(nombre);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

function git(args: string[]): string {
  return execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" });
}

function tsx(script: string, args: string[] = [], timeoutS = 300) {
  const r = spawnSync("npx", ["-y", "tsx", script, ...args], {
    cwd: RAIZ,
    encoding: "utf8",
    shell: process.platform === "win32",
    timeout: timeoutS * 1000,
    maxBuffer: 64 * 1024 * 1024,
    env: ENV_CHECKS,
  });
  return { code: r.status ?? (r.error ? 124 : 1), salida: `${r.stdout ?? ""}${r.stderr ?? ""}`.trim() };
}

function sucios(): Set<string> {
  const s = new Set<string>();
  for (const l of git(["status", "--porcelain", "--untracked-files=all", "--", "src", "scripts", "private"]).split("\n")) if (l.trim()) s.add(l.slice(3).trim().replace(/^"|"$/g, ""));
  return s;
}

function revertir(archivos: readonly string[]): void {
  if (archivos.length === 0) return;
  const rastreados = archivos.filter((f) => git(["ls-files", "--", f]).trim());
  const nuevos = archivos.filter((f) => !rastreados.includes(f));
  if (rastreados.length) git(["checkout", "--", ...rastreados]);
  if (nuevos.length) git(["clean", "-fq", "--", ...nuevos]);
}

function lineasRojas(salida: string, max = 12): string {
  const l = salida.split("\n").filter((x) => /❌|FAIL|Error|error/.test(x));
  return (l.length ? l : salida.split("\n").slice(-max)).slice(0, max).join("\n");
}

const CHECKS_PAIS = (m: string): [string, string[]][] => [
  ["scripts/check_paises.ts", [m]],
  ["scripts/check_paises_casos.ts", [m]],
  ["scripts/check_textos_paises.ts", [m]],
  ["scripts/check_fronteras.ts", []],
];

interface Informe {
  mercado: string;
  hoy: FechaISO;
  corrida: Corrida;
  puerta: Puerta;
  escritos: { serie: string; puntos: number }[];
  archivos: string[];
}

function httpDeLaCorrida(): Http {
  const archivo = arg("--respuestas");
  if (!archivo) return crearHttpReal();
  const respuestas = JSON.parse(readFileSync(archivo, "utf8")) as Record<string, unknown>;
  const responder = async (url: string) => {
    if (!(url in respuestas)) throw new Error(`HTTP 404 (sin respuesta grabada para ${url})`);
    return respuestas[url];
  };
  return { json: responder, texto: async (url) => String(await responder(url)) };
}

function puertaDeChecks(m: string, cambiado: string, antes: Set<string>): Puerta {
  for (const [script, args] of CHECKS_PAIS(m)) {
    const r = tsx(script, args, 600);
    console.log(`   ${r.code === 0 ? "ok" : "ROJO"} ${path.basename(script)} ${args.join(" ")}`);
    if (r.code !== 0) return { estado: "roja", detalle: `${path.basename(script)} ${args.join(" ")}:\n${lineasRojas(r.salida)}` };
  }
  const g = tsx("scripts/gen_planilla_todas.ts", [], 900);
  if (g.code !== 0) console.log(`   gen_planilla_todas salió ${g.code}: ${lineasRojas(g.salida, 4)}`);
  const todo = tsx("scripts/check-all.ts", [], 2400);
  const regenerados = [...sucios()].filter((f) => !antes.has(f) && f !== cambiado);
  revertir(regenerados);
  console.log(`   ${todo.code === 0 ? "ok" : "ROJO"} check-all`);
  if (todo.code === 0) return { estado: "verde", detalle: "" };
  return { estado: "roja", detalle: `check-all:\n${lineasRojas(todo.salida, 20)}` };
}

async function correrMercado(m: string, pais: PaisDefinido, previos: IssuePrevio[]): Promise<Informe> {
  const hoy = hoyEn(pais.mercado);
  const archivoSeries = `src/paises/${m}/series.json`;
  const { vistos } = leerIssues(previos);
  console.log(`\n== ${m} (${pais.mercado.nombre}) · ${hoy} · ${pais.detectores.length} detector(es)`);
  const corrida = await correrDetectores(pais, httpDeLaCorrida(), { hoy, vistos });
  for (const r of corrida.resultados) console.log(`   ${r.id} [${r.carril}] ${r.estado}: ${r.detalle}`);

  const informe: Informe = { mercado: m, hoy, corrida, puerta: { estado: "sin-cambios", detalle: "" }, escritos: [], archivos: [] };
  const conPuntos = [...corrida.puntosNuevos].filter(([, p]) => p.length);
  if (conPuntos.length === 0) return informe;

  const antes = sucios();
  if (antes.has(archivoSeries)) {
    informe.puerta = { estado: "roja", detalle: `${archivoSeries} ya tenía cambios sin commitear antes de correr: no mezclo` };
    return informe;
  }
  const ruta = path.join(RAIZ, archivoSeries);
  try {
    const escritura = agregarPuntos(readFileSync(ruta, "utf8"), new Map(conPuntos));
    const v = validarArchivoSeries(JSON.parse(escritura.texto), pais.mercado, hoyMasAdelantado());
    if (v.errores.length) throw new Error(v.errores.slice(0, 3).join("; "));
    writeFileSync(ruta, escritura.texto);
    console.log(`   series.json: ${escritura.agregados} punto(s) por ${escritura.modo}`);
  } catch (err) {
    informe.puerta = { estado: "roja", detalle: `no pude escribir ${archivoSeries}: ${(err as Error).message}` };
    revertir([archivoSeries]);
    return informe;
  }

  informe.puerta = puertaDeChecks(m, archivoSeries, antes);
  if (informe.puerta.estado === "verde") {
    informe.escritos = conPuntos.map(([serie, p]) => ({ serie, puntos: p.length }));
    informe.archivos = [archivoSeries];
  } else {
    revertir([archivoSeries]);
    if (informe.puerta.detalle.startsWith("check-all")) {
      tsx("scripts/gen_planilla_todas.ts", [], 900);
      const r = tsx("scripts/check-all.ts", [], 2400);
      if (r.code !== 0) informe.puerta.detalle += `\n\n(check-all también sale rojo sin los datos nuevos: el problema ya estaba en el repo)`;
      revertir([...sucios()].filter((f) => !antes.has(f)));
    }
  }
  return informe;
}

function escribirSalidas(dir: string, pais: PaisDefinido, informe: Informe, previos: IssuePrevio[]) {
  mkdirSync(dir, { recursive: true });
  const { mercado: m, hoy, corrida, puerta, escritos } = informe;
  const publicado = puerta.estado === "verde";
  const paisDespues: PaisDefinido = publicado
    ? { ...pais, series: pais.series.map((s) => ({ ...s, puntos: fusionarPuntos(s, corrida.puntosNuevos.get(s.id) ?? []) })) }
    : pais;
  const semaforo = semaforoPais(paisDespues, hoy);
  const runId = process.env.GITHUB_RUN_ID;
  const corridaTxt = runId ? `corrida [${runId}](${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${runId})` : undefined;
  const entrada = { mercado: m, nombrePais: pais.mercado.nombre, hoy, corrida: corridaTxt, resultados: corrida.resultados, hallazgosNuevos: corrida.hallazgosNuevos, previos };
  const issue = armarIssue({ ...entrada, semaforo, puerta });

  writeFileSync(path.join(dir, "issue.md"), issue.cuerpo);
  writeFileSync(path.join(dir, "comentario.md"), issue.comentario);
  // issue.md da por hecho que el job publicar lleva el parche a main. Si no lo lleva, el job de
  // issues usa esta variante: nunca vacía, así un push fallido no cierra el issue con "Todo al día".
  if (publicado) {
    const sinPublicar = armarIssue({ ...entrada, semaforo: semaforoPais(pais, hoy), puerta: { estado: "sin-publicar", detalle: "" } });
    writeFileSync(path.join(dir, "issue-sin-publicar.md"), sinPublicar.cuerpo);
    writeFileSync(path.join(dir, "comentario-sin-publicar.md"), sinPublicar.comentario);
  }
  writeFileSync(path.join(dir, "titulo.txt"), issue.titulo);
  writeFileSync(path.join(dir, "etiqueta.txt"), issue.etiqueta);
  writeFileSync(path.join(dir, "archivos.txt"), informe.archivos.join("\n"));
  writeFileSync(
    path.join(dir, "commit.txt"),
    `datos-paises ${m}: ${escritos.map((e) => `${e.serie} +${e.puntos}`).join(", ") || "sin cambios"} (${hoy})\n\n` +
      corrida.resultados.filter((r) => r.estado === "actualizado").map((r) => `- ${r.objetivo}: ${r.detalle}`).join("\n") +
      "\n\nCommit automático del workflow datos-paises: cada punto pasó su banda, los checks del país y check-all.\n",
  );

  const tabla = corrida.resultados.map((r) => `| ${r.id} | ${r.carril} | ${r.estado} | ${r.detalle.replace(/\|/g, "/").replace(/\s+/g, " ").slice(0, 300)} |`).join("\n");
  const md = [
    `## datos-paises · ${pais.mercado.nombre} (${m}) · ${hoy}`,
    "",
    `Puerta: **${puerta.estado}** · a publicar: **${publicado ? escritos.map((e) => `${e.serie} +${e.puntos}`).join(", ") : "nada"}** · normas nuevas: **${corrida.hallazgosNuevos.length}** · semáforo: **${semaforo.items.filter((i) => i.nivel === "rojo").length} rojo(s), ${semaforo.items.filter((i) => i.nivel === "amarillo").length} amarillo(s)** · issue: **${issue.cuerpo ? "abierto o actualizado" : "nada que avisar"}**`,
    "",
    "| detector | carril | estado | detalle |",
    "|---|---|---|---|",
    tabla || "| (sin detectores) | | | |",
    ...(puerta.estado === "roja" ? ["", bloqueDeCodigo(puerta.detalle.slice(0, 3000))] : []),
    "",
  ].join("\n");
  writeFileSync(path.join(dir, "resumen.md"), md);
  writeFileSync(path.join(dir, "resumen.json"), JSON.stringify({ ...informe, corrida: { ...corrida, puntosNuevos: Object.fromEntries(corrida.puntosNuevos) }, semaforo, issue: { necesario: Boolean(issue.cuerpo), pendientes: issue.pendientes } }, null, 2));
  if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, md, { flag: "a" });
  console.log(`\n${md}`);
}

function leerPrevios(archivo: string | undefined): IssuePrevio[] {
  if (!archivo || !existsSync(archivo)) return [];
  try {
    const v = JSON.parse(readFileSync(archivo, "utf8").replace(/^﻿/, "")) as unknown;
    return Array.isArray(v) ? (v as IssuePrevio[]).filter((i) => i && typeof i.body === "string" && typeof i.state === "string") : [];
  } catch {
    console.error(`no pude leer ${archivo}: sigo sin memoria de avisos`);
    return [];
  }
}

async function main() {
  const pedido = arg("--mercado")?.trim().toLowerCase();
  const todos = process.argv.includes("--todos");
  if (!pedido && !todos) {
    console.error("Uso: correr.ts --mercado <m> | --todos [--issues archivo.json] [--salida dir]");
    process.exit(1);
  }
  if (pedido && !/^[a-z]{2,6}$/.test(pedido)) {
    console.error(`mercado inválido: ${pedido}`);
    process.exit(1);
  }
  const mercados = pedido ? [pedido] : (await mercadosConDetectores()).mercados;
  const cargados = await cargarPaises();
  const previos = leerPrevios(arg("--issues"));
  let fallas = 0;
  for (const m of mercados) {
    const c = cargados.find((x) => x.carpeta === m);
    if (!c?.pais) {
      console.error(`${m}: no carga (${c?.error ?? "no existe src/paises/" + m})`);
      fallas++;
      continue;
    }
    if (c.pais.detectores.length === 0) {
      console.error(`${m}: no tiene detectores`);
      fallas++;
      continue;
    }
    const informe = await correrMercado(m, c.pais, todos ? [] : previos);
    const salida = path.resolve(RAIZ, todos || !arg("--salida") ? path.join(".datos-vivos", "paises", m) : arg("--salida")!);
    escribirSalidas(salida, c.pais, informe, todos ? [] : previos);
  }
  process.exit(fallas ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
