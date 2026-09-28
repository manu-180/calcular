// Cargador automático de lo que ANSES y el PEN publican cada mes en el Boletín Oficial:
//   · la resolución de haberes (haber mínimo y máximo, bases imponibles, PBU, PUAM)
//   · la resolución de asignaciones familiares (% del art. 1 + tope individual del art. 4)
//   · el decreto del bono extraordinario previsional
//
// NADA SE ESCRIBE SIN ANCLA. Cada número leído del texto tiene que reproducir la norma que lo
// define, o el cargador lo rechaza y avisa:
//   · haberes: cada valor = el del mes anterior × (1 + IPC de dos meses antes), al centavo
//     (Dec. 274/2024), y la PUAM = 80% del haber mínimo (Ley 27.260 art. 13).
//   · asignaciones: el % del art. 1 = la misma movilidad, y ceil(tope anterior × coef) = el tope
//     que publica el art. 4, al peso (el art. 3 manda redondear al entero siguiente).
//   · bono: monto en una banda sana y arts. 3/4 con la regla de siempre (completa hasta el haber
//     mínimo). Si la regla cambia, la calculadora quedaría mal: no se carga solo.
// Lo que no pasa el ancla queda para una sesión humana: un dato YMYL mal cargado vale menos que cero.
//
// Idempotente: lo ya cargado se saltea. Corre desde el workflow datos-vivos y a mano:
//   npx -y tsx scripts/datos-vivos/cargar_anses.ts [--dias 14] [--seco]

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { MESES_PREVISIONALES } from "../../src/data/prestaciones";
import { ASIGNACIONES_ULTIMA_CARGADA, RESOLUCIONES_ASIGNACIONES_SIGUIENTES } from "../../src/data/asignaciones";
import { movilidadDe, sumarMeses } from "../../src/lib/jubilacion";
import { hoyAR } from "../../src/lib/hoy";
import {
  articulo,
  buscar,
  fechaBO,
  leerAviso,
  montosDelArticulo,
  normalizar,
  periodoEnTexto,
  vigenciaDe,
  type Aviso,
} from "./bo";

const RAIZ = resolve(import.meta.dirname, "..", "..");
const F_PRESTACIONES = resolve(RAIZ, "src/data/prestaciones.ts");
const F_ASIGNACIONES = resolve(RAIZ, "src/data/asignaciones.ts");
const F_GEN_JUB = resolve(RAIZ, "scripts/gen_jubilaciones.ts");

const SECO = process.argv.includes("--seco");
const DIAS = Number(process.argv[process.argv.indexOf("--dias") + 1]) || 14;

const cargados: string[] = [];
const rechazados: string[] = [];
const esperando: string[] = [];
/** Meses que esta misma corrida acaba de crear: el bono de ese mes se cuelga en la misma pasada. */
const creados = new Set<string>();

const fmt = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const casi = (a: number, b: number) => Math.abs(a - b) < 0.02;
const r2 = (n: number) => Math.round(n * 100) / 100;
const miles = (n: number) => {
  const [e, d] = n.toFixed(2).split(".");
  const conGuiones = e.replace(/\B(?=(\d{3})+(?!\d))/g, "_");
  return d === "00" ? conGuiones : `${conGuiones}.${d}`;
};

function insertarAlFinalDelArray(texto: string, declaracion: string, bloque: string): string {
  const i = texto.indexOf(declaracion);
  if (i < 0) throw new Error(`no encontré «${declaracion}»`);
  const fin = texto.indexOf("\n];", i);
  if (fin < 0) throw new Error(`no encontré el cierre del array de «${declaracion}»`);
  return texto.slice(0, fin) + "\n" + bloque.replace(/\n$/, "") + texto.slice(fin);
}

function numeroDeNorma(aviso: Aviso, tipo: "Resolución" | "Decreto"): string | null {
  return aviso.titulo.match(new RegExp(`${tipo} (\\d+/\\d{4})`, "i"))?.[1] ?? null;
}

// ── Haberes ─────────────────────────────────────────────────────────────────────────────────
function cargarHaberes(aviso: Aviso, texto: string): void {
  const num = numeroDeNorma(aviso, "Resolución");
  const periodo = periodoEnTexto(articulo(texto, 1));
  if (!num || !periodo) return void rechazados.push(`${aviso.titulo}: no pude leer número o período`);
  if (MESES_PREVISIONALES.some((m) => m.periodo === periodo)) return;

  const ultimo = MESES_PREVISIONALES[MESES_PREVISIONALES.length - 1];
  if (sumarMeses(ultimo.periodo, 1) !== periodo) {
    return void rechazados.push(`Res. ANSES ${num} (${periodo}): falta cargar el mes ${sumarMeses(ultimo.periodo, 1)} antes`);
  }
  const mov = movilidadDe(periodo);
  if (mov === null) return void esperando.push(`Res. ANSES ${num} (${periodo}): falta el IPC de ${sumarMeses(periodo, -2)} para verificarla`);

  const [haberMinimo] = montosDelArticulo(texto, 1);
  const [haberMaximo] = montosDelArticulo(texto, 2);
  const [baseImponibleMinima, baseImponibleMaxima] = montosDelArticulo(texto, 3);
  const [pbu] = montosDelArticulo(texto, 4);
  const [puam] = montosDelArticulo(texto, 5);
  const leido = { haberMinimo, haberMaximo, pbu, baseImponibleMinima, baseImponibleMaxima };

  const fallas: string[] = [];
  for (const [k, v] of Object.entries(leido) as [keyof typeof leido, number][]) {
    const esperado = r2(ultimo[k] * (1 + mov / 100));
    if (!Number.isFinite(v) || !casi(v, esperado)) fallas.push(`${k}: leí ${v}, la fórmula da ${esperado}`);
  }
  if (!Number.isFinite(puam) || !casi(puam, r2(haberMinimo * 0.8))) fallas.push(`puam: leí ${puam}, el 80% da ${r2(haberMinimo * 0.8)}`);
  if (fallas.length) return void rechazados.push(`Res. ANSES ${num} (${periodo}) NO pasa el ancla: ${fallas.join("; ")}`);

  const bloque = `  {
    periodo: "${periodo}",
    vigencia: "${vigenciaDe(periodo)}",
    movilidad: ${mov},
    haberMinimo: ${miles(haberMinimo)},
    haberMaximo: ${miles(haberMaximo)},
    pbu: ${miles(pbu)},
    puam: ${miles(puam)},
    baseImponibleMinima: ${miles(baseImponibleMinima)},
    baseImponibleMaxima: ${miles(baseImponibleMaxima)},
    resolucion: "Resolución ANSES ${num}",
    resolucionUrl: "${aviso.url}",
    resolucionBO: "Boletín Oficial del ${fechaBO(aviso.fecha)}",
    bono: null,
  },
`;
  const [a, m, d] = [aviso.fecha.slice(0, 4), Number(aviso.fecha.slice(5, 7)), Number(aviso.fecha.slice(8, 10))];
  const filaJub = `  {
    periodo: "${periodo}",
    haberMinimo: ${miles(haberMinimo)},
    norma: "Resolución ANSES ${num}, art. 1 (Boletín Oficial, ${d}/${m}/${a})",
    url: "${aviso.url}",
  },
`;
  if (!SECO) {
    writeFileSync(F_PRESTACIONES, insertarAlFinalDelArray(readFileSync(F_PRESTACIONES, "utf8"), "export const MESES_PREVISIONALES", bloque));
    writeFileSync(F_GEN_JUB, insertarAlFinalDelArray(readFileSync(F_GEN_JUB, "utf8"), "const RESOLUCIONES:", filaJub));
  }
  creados.add(periodo);
  cargados.push(`Haberes ${vigenciaDe(periodo)}: Res. ANSES ${num} — haber mínimo $${fmt(haberMinimo)} (movilidad ${mov}%, ancla OK)`);
}

// ── Asignaciones ────────────────────────────────────────────────────────────────────────────
function cargarAsignaciones(aviso: Aviso, texto: string): void {
  const num = numeroDeNorma(aviso, "Resolución");
  const periodo = periodoEnTexto(articulo(texto, 2));
  const pct = articulo(texto, 1).match(/\(\s*(\d+,\d+)\s*%\s*\)/)?.[1];
  const [tope] = montosDelArticulo(texto, 4);
  if (!num || !periodo || !pct || !Number.isFinite(tope)) {
    return void rechazados.push(`${aviso.titulo}: no pude leer número, período, % o tope`);
  }
  const ultima = ASIGNACIONES_ULTIMA_CARGADA;
  if (periodo <= ultima.periodo) return;
  if (sumarMeses(ultima.periodo, 1) !== periodo) {
    return void rechazados.push(`Res. ANSES ${num} (asignaciones ${periodo}): falta cargar ${sumarMeses(ultima.periodo, 1)} antes`);
  }
  const movilidad = Number(pct.replace(",", "."));
  const mov = movilidadDe(periodo);
  const derivado = Math.ceil(Math.round(ultima.topeIgfIndividual * (1 + movilidad / 100) * 1e6) / 1e6);
  const fallas: string[] = [];
  if (mov !== null && mov !== movilidad) fallas.push(`el % (${movilidad}) no es la movilidad del IPC (${mov})`);
  if (derivado !== tope) fallas.push(`ceil(${ultima.topeIgfIndividual} × ${1 + movilidad / 100}) = ${derivado}, el art. 4 dice ${tope}`);
  if (fallas.length) return void rechazados.push(`Res. ANSES ${num} (asignaciones ${periodo}) NO pasa el ancla: ${fallas.join("; ")}`);

  const bloque = `  {
    periodo: "${periodo}",
    vigencia: "${vigenciaDe(periodo)}",
    movilidad: ${movilidad},
    topeIgfIndividual: ${miles(tope)},
    resolucion: "Resolución ANSES ${num}",
    resolucionUrl: "${aviso.url}",
    resolucionBO: "Boletín Oficial del ${fechaBO(aviso.fecha)}",
  },
`;
  if (!SECO) {
    writeFileSync(
      F_ASIGNACIONES,
      insertarAlFinalDelArray(readFileSync(F_ASIGNACIONES, "utf8"), "export const RESOLUCIONES_ASIGNACIONES_SIGUIENTES", bloque),
    );
  }
  cargados.push(`Asignaciones ${vigenciaDe(periodo)}: Res. ANSES ${num} — +${movilidad}%, tope individual $${fmt(tope)} (ancla del art. 4 OK)`);
}

// ── Bono ────────────────────────────────────────────────────────────────────────────────────
function cargarBono(aviso: Aviso, texto: string): void {
  const num = numeroDeNorma(aviso, "Decreto");
  const a1 = articulo(texto, 1);
  const periodo = periodoEnTexto(a1.slice(a1.toLowerCase().indexOf("abonar")));
  const [monto] = montosDelArticulo(texto, 1);
  if (!num || !periodo || !Number.isFinite(monto)) return void rechazados.push(`${aviso.titulo}: no pude leer número, mes o monto`);

  const mes = MESES_PREVISIONALES.find((m) => m.periodo === periodo);
  if (mes?.bono) {
    if (mes.bono.norma !== `Decreto ${num}`) rechazados.push(`Bono ${periodo}: ya hay ${mes.bono.norma} cargado y el B.O. trae el Decreto ${num}`);
    return;
  }
  if (!mes && !creados.has(periodo)) return void esperando.push(`Bono ${vigenciaDe(periodo)} (Decreto ${num}): espera la resolución de haberes de ese mes`);

  const reglas = normalizar(articulo(texto, 3) + articulo(texto, 4));
  const fallas: string[] = [];
  if (!(monto >= 10_000 && monto <= 1_000_000)) fallas.push(`monto fuera de banda (${monto})`);
  if (!/HABER MINIMO/.test(reglas)) fallas.push("los arts. 3 y 4 no hablan del haber mínimo: cambió la regla de liquidación");
  if (fallas.length) return void rechazados.push(`Decreto ${num} (bono ${periodo}) NO se carga solo: ${fallas.join("; ")}`);

  if (!SECO) {
    const txt = readFileSync(F_PRESTACIONES, "utf8");
    const i = txt.indexOf(`periodo: "${periodo}"`, txt.indexOf("export const MESES_PREVISIONALES"));
    const j = txt.indexOf("bono: null,", i);
    const k = txt.indexOf("periodo: ", i + 10);
    if (i < 0 || j < 0 || (k > 0 && j > k)) return void rechazados.push(`Bono ${periodo}: no encontré su "bono: null" en prestaciones.ts`);
    const bloque = `bono: {
      monto: ${miles(monto)},
      norma: "Decreto ${num}",
      normaUrl: "${aviso.url}",
      normaBO: "Boletín Oficial del ${fechaBO(aviso.fecha)}",
    },`;
    writeFileSync(F_PRESTACIONES, txt.slice(0, j) + bloque + txt.slice(j + "bono: null,".length));
  }
  cargados.push(`Bono ${vigenciaDe(periodo)}: Decreto ${num} — $${fmt(monto)}`);
}

async function main(): Promise<void> {
  const avisos = await buscar(hoyAR(), DIAS, /^SEGURIDAD SOCIAL|^ADMINISTRACION NACIONAL DE LA SEGURIDAD SOCIAL/);
  if (avisos === null) {
    console.log("⚠️  El Boletín Oficial no respondió: no se cargó nada (se reintenta en la próxima corrida).");
    process.exit(3);
  }
  // Primero haberes, después asignaciones y bono: el bono se cuelga del mes que crea la resolución.
  const leidos: { aviso: Aviso; texto: string }[] = [];
  for (const aviso of avisos) {
    const texto = await leerAviso(aviso.id, aviso.fecha);
    if (texto) leidos.push({ aviso, texto });
  }
  const orden = (t: string) => (/BONO EXTRAORDINARIO/.test(normalizar(t)) ? 2 : 1);
  leidos.sort((x, y) => orden(x.aviso.titulo) - orden(y.aviso.titulo) || x.aviso.fecha.localeCompare(y.aviso.fecha));

  for (const { aviso, texto } of leidos) {
    const n = normalizar(texto);
    if (/BONO EXTRAORDINARIO PREVISIONAL/.test(normalizar(aviso.titulo)) && /^SEGURIDAD SOCIAL DECRETO/.test(normalizar(aviso.titulo))) cargarBono(aviso, texto);
    else if (/HABER MINIMO GARANTIZADO/.test(n) && /PRESTACION BASICA UNIVERSAL/.test(n)) cargarHaberes(aviso, texto);
    else if (/ASIGNACIONES FAMILIARES/.test(n) && /REDONDEO AL VALOR ENTERO SIGUIENTE/.test(n)) cargarAsignaciones(aviso, texto);
  }

  console.log(`— cargar_anses · ${hoyAR()} · ${avisos.length} aviso(s) de Seguridad Social en ${DIAS} días —`);
  for (const c of cargados) console.log(`🔄 ${c}`);
  for (const e of esperando) console.log(`⏳ ${e}`);
  for (const r of rechazados) console.log(`🔴 ${r}`);
  if (!cargados.length && !rechazados.length) console.log("✓ Nada nuevo: todo lo publicado ya está cargado.");
  if (SECO && cargados.length) console.log("(--seco: no se escribió nada)");
  // 2 = algo publicado no pasó el ancla: el workflow lo convierte en aviso para una sesión.
  if (rechazados.length) process.exit(2);
}

main().catch((e) => {
  console.error(`❌ cargar_anses: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
});
