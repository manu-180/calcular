// Verifica el histórico UOCRA (jun-2024 a mar-2026) contra la aritmética de los propios acuerdos.
//
// Las tablas salen de PDFs escaneados con OCR: un dígito leído mal pasaría desapercibido en una
// planilla que alguien lleva a un juicio. Cada acuerdo dice "X% sobre los básicos del mes
// anterior", así que cada tabla se puede reproducir desde la anterior; la tabla oficial redondea
// a pesos, por eso la tolerancia de $2 (o 0,02% en el sueldo del sereno). Además, en todas las
// tablas la zona C Austral es el doble de la A y la B lleva un adicional de ~11,1%.
//
// Correr con: npx tsx scripts/check_uocra_historico.ts  (o vía scripts/check-all.ts)

import { MESES_UOCRA, ZONAS_UOCRA, type ZonaUocraId } from "../src/data/convenios/uocra";
import { AUMENTO_SOBRE_MES_ANTERIOR, INCORPORADO_ANTES_DEL_AUMENTO, MESES_UOCRA_HISTORICO } from "../src/data/convenios/uocra-historico";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const CATS = ["oficial-especializado", "oficial", "medio-oficial", "ayudante"] as const;
const ZONAS = ZONAS_UOCRA.map((z) => z.id) as ZonaUocraId[];
const todos = [...MESES_UOCRA_HISTORICO, ...MESES_UOCRA];

check("el histórico arranca en junio 2024", MESES_UOCRA_HISTORICO[0]?.id === "junio-2024");
check("el histórico empalma con el primer mes de MESES_UOCRA", MESES_UOCRA_HISTORICO.at(-1)?.id === "marzo-2026" && MESES_UOCRA[0]?.id === "abril-2026");

let esperadoMes = 6;
let esperadoAnio = 2024;
const huecos: string[] = [];
for (const m of todos) {
  if (m.mes !== esperadoMes || m.anio !== esperadoAnio) huecos.push(m.id);
  esperadoMes = m.mes === 12 ? 1 : m.mes + 1;
  esperadoAnio = m.mes === 12 ? m.anio + 1 : m.anio;
}
check("no hay meses salteados ni repetidos de junio 2024 al último cargado", huecos.length === 0, huecos);
check("los id no se repiten", new Set(todos.map((m) => m.id)).size === todos.length);

const derivacion: string[] = [];
for (let i = 1; i < MESES_UOCRA_HISTORICO.length; i++) {
  const prev = MESES_UOCRA_HISTORICO[i - 1];
  const act = MESES_UOCRA_HISTORICO[i];
  const f = AUMENTO_SOBRE_MES_ANTERIOR[act.id];
  if (f === undefined) {
    derivacion.push(`${act.id}: sin factor`);
    continue;
  }
  const inc = INCORPORADO_ANTES_DEL_AUMENTO[act.id];
  for (const cat of CATS)
    for (const zona of ZONAS) {
      const base = prev.jornales[cat][zona];
      const extra = inc ? inc.porHoraZonaA * (base / prev.jornales[cat].a) : 0;
      const esperado = (base + extra) * f;
      const real = act.jornales[cat][zona];
      if (Math.abs(real - esperado) > (inc ? 3 : 2)) derivacion.push(`${act.id} ${cat} ${zona}: ${real} vs ${esperado.toFixed(1)}`);
    }
  for (const zona of ZONAS) {
    const baseS = prev.serenoMensual[zona];
    const extraS = inc ? inc.serenoZonaA * (baseS / prev.serenoMensual.a) : 0;
    const esperado = (baseS + extraS) * f;
    const real = act.serenoMensual[zona];
    if (Math.abs(real - esperado) / esperado > 0.0002) derivacion.push(`${act.id} sereno ${zona}: ${real} vs ${esperado.toFixed(0)}`);
  }
}
check("cada tabla se reproduce desde la anterior con el % del acuerdo (±$2)", derivacion.length === 0, derivacion.slice(0, 10));

const zonas: string[] = [];
for (const m of MESES_UOCRA_HISTORICO)
  for (const cat of CATS) {
    const j = m.jornales[cat];
    if (Math.abs(j["c-austral"] - 2 * j.a) > 2) zonas.push(`${m.id} ${cat} C Austral ${j["c-austral"]} ≠ 2×${j.a}`);
    const rb = j.b / j.a;
    if (rb < 1.105 || rb > 1.118) zonas.push(`${m.id} ${cat} B/A = ${rb.toFixed(4)}`);
    if (j.c <= j.b) zonas.push(`${m.id} ${cat} C ${j.c} ≤ B ${j.b}`);
  }
check("estructura de zonas coherente en todas las tablas (C Austral = 2×A, B ≈ A+11%)", zonas.length === 0, zonas.slice(0, 10));

const orden: string[] = [];
for (const m of MESES_UOCRA_HISTORICO)
  for (const zona of ZONAS) {
    const j = m.jornales;
    if (!(j["oficial-especializado"][zona] > j.oficial[zona] && j.oficial[zona] > j["medio-oficial"][zona] && j["medio-oficial"][zona] > j.ayudante[zona]))
      orden.push(`${m.id} ${zona}`);
    const s = m.snr;
    if (!(s["oficial-especializado"][zona] >= s.oficial[zona] && s.oficial[zona] >= s["medio-oficial"][zona] && s["medio-oficial"][zona] >= s.ayudante[zona]))
      orden.push(`${m.id} SNR ${zona}`);
    if (s.sereno[zona] !== s.ayudante[zona]) orden.push(`${m.id} SNR sereno ≠ ayudante ${zona}`);
  }
check("las categorías respetan su orden (esp > oficial > medio > ayudante) en jornal y SNR", orden.length === 0, orden.slice(0, 10));

const marzo = MESES_UOCRA_HISTORICO.at(-1)!;
const abril = MESES_UOCRA[0];
const salto = abril.jornales.oficial.a / marzo.jornales.oficial.a;
check("abril 2026 (ya publicado) sube sobre marzo 2026 lo que da 1,9% + absorción de SNR (7%-9%)", salto > 1.07 && salto < 1.09, salto);

if (fallas > 0) {
  console.error(`\n${fallas} falla(s) en el histórico UOCRA`);
  process.exit(1);
}
console.log("\nHistórico UOCRA OK");
