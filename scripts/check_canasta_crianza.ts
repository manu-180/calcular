// Verificación de la serie de canasta de crianza del INDEC (src/data/canasta-crianza.ts).
// Correr con: npx tsx scripts/check_canasta_crianza.ts
//
// El archivo lo genera `scripts/gen_canasta_crianza.ts` desde la planilla oficial, así que acá
// no se re-tipean valores: se verifica que el GENERADOR no haya traído basura si el INDEC
// cambia el layout de la planilla (que es el modo real en que esto se rompe). Chequea:
// (1) la serie es mensual, ordenada y sin huecos; (2) en TODOS los meses y tramos vale
// bienes + cuidado = total; (3) dos anclas contra fuente oficial independiente; (4) los valores
// crecen año contra año (una serie nominal argentina que baja 12 meses seguidos es un parseo
// roto, no un dato); (5) los 4 tramos existen en todos los meses.
//
// ANCLA DOBLE (el punto importante): diciembre 2025 se verifica contra el PDF de PRENSA del
// INDEC (informe de enero 2026, cuadro 1), que es una publicación distinta de la planilla de
// serie. Dos fuentes oficiales independientes que coinciden ⇒ el dato es sólido.

import {
  CANASTA_CRIANZA,
  CANASTA_CRIANZA_FUENTE,
  CANASTA_CRIANZA_ULTIMO,
  TRAMOS_CRIANZA,
  type TramoCrianzaId,
} from "../src/data/canasta-crianza";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ===========================================================================
// 1 · Forma de la serie
// ===========================================================================
check(`serie con ${CANASTA_CRIANZA.length} meses (≥ 78, desde enero 2020)`, CANASTA_CRIANZA.length >= 78);
check("empieza en enero 2020", CANASTA_CRIANZA[0].periodo === "2020-01");

{
  let sinHuecos = true;
  let detalle = "";
  for (let i = 1; i < CANASTA_CRIANZA.length; i++) {
    const [a, m] = CANASTA_CRIANZA[i - 1].periodo.split("-").map(Number);
    const esperado = m === 12 ? `${a + 1}-01` : `${a}-${String(m + 1).padStart(2, "0")}`;
    if (CANASTA_CRIANZA[i].periodo !== esperado) {
      sinHuecos = false;
      detalle = `después de ${CANASTA_CRIANZA[i - 1].periodo} vino ${CANASTA_CRIANZA[i].periodo}`;
      break;
    }
  }
  check("serie mensual consecutiva y ordenada (sin huecos ni repetidos)", sinHuecos, detalle);
}

check(
  "el último período del dato coincide con el declarado en la fuente",
  CANASTA_CRIANZA_ULTIMO.periodo === CANASTA_CRIANZA_FUENTE.ultimoPeriodo,
);

// ===========================================================================
// 2 · Integridad interna: total = bienes + cuidado, y los 4 tramos siempre presentes
// ===========================================================================
{
  let suman = true;
  let completos = true;
  let detalle = "";
  for (const mes of CANASTA_CRIANZA) {
    for (const tr of TRAMOS_CRIANZA) {
      const v = mes.valores[tr.id];
      if (!v || ![v.bienes, v.cuidado, v.total].every((x) => Number.isFinite(x) && x > 0)) {
        completos = false;
        detalle ||= `${mes.periodo} / ${tr.id}`;
        continue;
      }
      // Tolerancia $1: la planilla publica con 2 decimales y el total viene redondeado aparte.
      if (Math.abs(v.bienes + v.cuidado - v.total) > 1) {
        suman = false;
        detalle ||= `${mes.periodo} / ${tr.id}: ${v.bienes} + ${v.cuidado} ≠ ${v.total}`;
      }
    }
  }
  check(`los 4 tramos existen y son positivos en los ${CANASTA_CRIANZA.length} meses`, completos, detalle);
  check("en todos los meses y tramos: bienes + cuidado = total (±$1)", suman, detalle);
}

// ===========================================================================
// 3 · Anclas contra fuente oficial
// ===========================================================================
// Cuadro 1 del informe técnico del INDEC de diciembre de 2025 (publicado el 15/1/2026):
// menor de 1 año $460.178 · 1 a 3 $547.913 · 4 a 5 $466.596 · 6 a 12 $586.627.
// Fuente: indec.gob.ar/uploads/informesdeprensa/canasta_crianza_01_26C66FC01CD6.pdf
{
  const dic25 = CANASTA_CRIANZA.find((m) => m.periodo === "2025-12");
  const esperados: Record<TramoCrianzaId, number> = {
    "menor-1": 460_178,
    "1-a-3": 547_913,
    "4-a-5": 466_596,
    "6-a-12": 586_627,
  };
  let coincide = dic25 !== undefined;
  let detalle = "";
  if (dic25) {
    for (const tr of TRAMOS_CRIANZA) {
      // El PDF publica el total sin decimales (redondeo al peso) ⇒ tolerancia $1.
      if (Math.abs(dic25.valores[tr.id].total - esperados[tr.id]) > 1) {
        coincide = false;
        detalle ||= `${tr.id}: ${dic25.valores[tr.id].total} vs PDF ${esperados[tr.id]}`;
      }
    }
  }
  check("ancla: diciembre 2025 coincide con el cuadro 1 del informe de prensa del INDEC", coincide, detalle);
}

// Ancla de frescura del parseo (planilla del INDEC leída el 30/7/2026, último mes junio 2026).
// No se ancla a "el último mes debe ser junio": eso se rompería solo cuando el INDEC publique
// julio. Se ancla al VALOR de junio 2026, que ya no cambia.
{
  const jun26 = CANASTA_CRIANZA.find((m) => m.periodo === "2026-06");
  check(
    "ancla: junio 2026 · 6 a 12 años = $678.307,86 (planilla de serie del INDEC)",
    jun26 !== undefined && Math.abs(jun26.valores["6-a-12"].total - 678_307.86) < 0.01,
    jun26?.valores["6-a-12"].total,
  );
  check(
    "ancla: junio 2026 · menor de 1 año = $529.538,98",
    jun26 !== undefined && Math.abs(jun26.valores["menor-1"].total - 529_538.98) < 0.01,
    jun26?.valores["menor-1"].total,
  );
}

// ===========================================================================
// 4 · Sanidad económica: serie nominal en pesos ⇒ crece año contra año
// ===========================================================================
{
  let creceSiempre = true;
  let detalle = "";
  for (let i = 12; i < CANASTA_CRIANZA.length; i++) {
    for (const tr of TRAMOS_CRIANZA) {
      const hoy = CANASTA_CRIANZA[i].valores[tr.id].total;
      const haceUnAnio = CANASTA_CRIANZA[i - 12].valores[tr.id].total;
      if (hoy <= haceUnAnio) {
        creceSiempre = false;
        detalle ||= `${CANASTA_CRIANZA[i].periodo} / ${tr.id}: ${hoy} ≤ ${haceUnAnio} (12 meses antes)`;
      }
    }
  }
  check("cada mes supera al mismo mes del año anterior en los 4 tramos", creceSiempre, detalle);
}

// El tramo de 6 a 12 años es el más caro de la canasta (más bienes y servicios: escuela,
// transporte, vestimenta), y el de 4 a 5 el más barato en cuidado por la jornada escolar.
// Si esto se da vuelta, lo más probable es que las columnas se hayan corrido al parsear.
{
  const u = CANASTA_CRIANZA_ULTIMO.valores;
  check(
    "orden esperado en el último mes: 6-a-12 es el tramo más caro",
    u["6-a-12"].total > u["1-a-3"].total &&
      u["6-a-12"].total > u["4-a-5"].total &&
      u["6-a-12"].total > u["menor-1"].total,
  );
  check(
    "orden esperado: el menor de 1 año tiene más costo de cuidado que de bienes",
    u["menor-1"].cuidado > u["menor-1"].bienes,
  );
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log(`Todos los checks de canasta de crianza OK (último: ${CANASTA_CRIANZA_ULTIMO.etiqueta})`);
}
