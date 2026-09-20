// Día del Empleado de Comercio — Ley 26.541 + el traslado que acuerdan las partes del CCT 130/75.
//
// LO QUE ESTE CHECK PROTEGE: la fecha efectiva de este día NO se deriva. Cuando el 26 de
// septiembre cae fin de semana, la corre un acuerdo de FAECYS con las cámaras, y no hay regla
// como la del art. 6 de la Ley 27.399 que permita calcularla. El riesgo real es que el año que
// viene alguien "actualice" la página moviendo la fecha al lunes siguiente por analogía: sería
// una fecha inventada, publicada como si fuera oficial, en la página que la gente abre para
// saber si le toca trabajar. Por eso acá se exige que cada traslado tenga su circular.
//
// Correr con: npx tsx scripts/check_dia_empleado_comercio.ts

import {
  LCT_FERIADOS,
  LEY_DIA_COMERCIO,
  TRASLADOS_POR_ANIO,
  diaEfectivo,
} from "../src/data/dia-empleado-comercio";

let fallas = 0;
function check(cond: boolean, nombre: string, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const diaSemana = (iso: string) => new Date(`${iso}T12:00:00Z`).getUTCDay();

// --- 1 · La fecha de la ley es la del art. 1 ---
check(
  LEY_DIA_COMERCIO.mes === 9 && LEY_DIA_COMERCIO.dia === 26,
  "la fecha legal es el 26 de septiembre (Ley 26.541 art. 1)",
);
check(
  /asimil[áa]ndose el mismo a los feriados nacionales a todos los efectos legales/i.test(
    LEY_DIA_COMERCIO.art2,
  ),
  "el art. 2 transcripto conserva la asimilación a feriado nacional, que es de donde sale todo el pago",
);

// --- 2 · Cada traslado cargado tiene circular, y sólo existe si la fecha legal cayó fin de semana ---
for (const [anioStr, t] of Object.entries(TRASLADOS_POR_ANIO)) {
  const anio = Number(anioStr);
  const legal = diaSemana(`${anio}-09-26`);
  check(
    legal === 0 || legal === 6,
    `${anio}: hay traslado porque el 26/9 cayó ${DIAS[legal]} (si cae en semana no hay nada que trasladar)`,
  );
  check(
    t.circular.url.startsWith("https://www.faecys.org.ar/") && t.circular.url.endsWith(".pdf"),
    `${anio}: el traslado cita la circular de FAECYS en PDF`,
    t.circular.url,
  );
  check(
    t.fecha.startsWith(`${anio}-09-`),
    `${anio}: la fecha trasladada sigue cayendo en septiembre del mismo año`,
    t.fecha,
  );
  check(
    t.circular.firmadaEl <= t.fecha,
    `${anio}: la circular se firmó antes del día que fija (firmada ${t.circular.firmadaEl}, día ${t.fecha})`,
  );
  check(
    t.aclaraciones.some((a) => /franco compensatorio/i.test(a)),
    `${anio}: queda escrito que no puede darse como franco compensatorio`,
  );
}

// --- 3 · Sin circular NO se inventa la fecha ---
// Es el corazón del archivo. Un año cuyo 26/9 cae fin de semana y no tiene acuerdo cargado
// tiene que devolver null, no el lunes siguiente.
const sinAcuerdo: number[] = [];
for (let anio = 2026; anio <= 2035; anio++) {
  const legal = diaSemana(`${anio}-09-26`);
  const efectivo = diaEfectivo(anio);
  if (TRASLADOS_POR_ANIO[anio]) continue;
  if (legal === 0 || legal === 6) {
    sinAcuerdo.push(anio);
    check(
      efectivo === null,
      `${anio}: el 26/9 cae ${DIAS[legal]} y no hay circular → la fecha queda en null, NO se supone el lunes`,
    );
  } else {
    check(
      efectivo?.fecha === `${anio}-09-26` && efectivo.trasladado === false,
      `${anio}: el 26/9 cae ${DIAS[legal]} → rige la fecha de la ley, sin acuerdo de por medio`,
    );
  }
}
check(sinAcuerdo.length > 0, "el rango de prueba incluye algún año sin circular (si no, el check no prueba nada)");

// --- 4 · El año publicado en la página resuelve ---
const HOY = diaEfectivo(2026);
check(HOY?.fecha === "2026-09-28", `2026 se conmemora el lunes 28/9 (obtenido: ${HOY?.fecha})`);
check(
  diaSemana("2026-09-28") === 1,
  "el 28/9/2026 es efectivamente lunes — la circular lo llama así y la fecha tiene que coincidir",
);

// --- 5 · Los artículos de la LCT que la página cita están transcriptos, no parafraseados ---
check(
  /m[áa]s una cantidad igual/i.test(LCT_FERIADOS.art166),
  "art. 166: conserva «más una cantidad igual» (el pago doble sale de esa frase)",
);
check(
  /cuarenta y ocho \(48\) horas o seis \(6\) jornadas/i.test(LCT_FERIADOS.art168),
  "art. 168: conserva la condición de 48 horas o 6 jornadas, que es el dato diferencial de la página",
);
check(
  /treinta \(30\) d[íi]as/i.test(LCT_FERIADOS.art169),
  "art. 169: conserva el promedio de 30 días para remuneración variable",
);
check(
  LCT_FERIADOS.url.includes("25000-29999/25552/texact.htm"),
  "los artículos se citan contra el TEXTO ACTUALIZADO de la LCT, no contra el norma.htm de 1974",
);

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks del Día del Empleado de Comercio OK");
}
