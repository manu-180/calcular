// Verificación de la página de reserva del empleo (LCT arts. 214 a 217, con el 216 derogado por el
// art. 207 de la Ley 27.802). Correr con: npx tsx scripts/check_reserva_empleo.ts
//
// LOS ANCLAS:
//   1. **El art. 216 está DEROGADO, no sustituido.** La página no puede publicarlo como vigente ni
//      inventarle un reemplazo: se cita como texto derogado, con su nota. Si alguien lo mueve a la
//      columna de vigentes, esto falla.
//   2. **Los arts. 214, 215 y 217 están INTACTOS.** El hallazgo entero depende de eso: si mañana
//      la reforma los tocara, la página estaría afirmando lo contrario de la norma. Las citas se
//      chequean contra las oraciones que sostienen el argumento.
//   3. **La asimetría es la página:** el art. 216 nombraba «los artículos 214 o 215» y NUNCA al
//      217. Ese dato es la razón de que el cargo gremial quede protegido y los otros dos no.
//   4. **El art. 245 no se reimplementa** (regla de s85): los dos escenarios salen de
//      `calcularIndemnizacion`, la misma que usa /indemnizacion. Se verifica que el escenario "con
//      reserva" sea idéntico al que publica esa calculadora para el mismo ingreso y el mismo egreso.
//   5. **La diferencia entre escenarios nunca puede ser negativa**: computar más antigüedad no
//      puede pagar menos.
//   6. **El escenario "sin reserva" descuenta EXACTAMENTE el período de reserva**, ni un día más:
//      la fecha de ingreso equivalente tiene que estar corrida esos mismos días.
//   7. **El plazo de reincorporación son 30 días** desde el fin de la función, en los tres
//      artículos.

import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  DIAS_PARA_REINCORPORAR,
  RESERVA_FUENTES,
  RESERVA_TEXTOS,
  SUPUESTOS_RESERVA,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/reserva-empleo";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularReservaEmpleo } from "../src/lib/reserva-empleo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

const BASE = 1_400_000;

// ── 1. La derogación: qué cayó, cuándo y por obra de qué artículo ──────────────────────────────
{
  check("el artículo derogado de la LCT es el 216", ARTICULO_DEROGADO === 216);
  check("lo derogó el art. 207 de la Ley 27.802", ARTICULO_DEROGATORIO === 207);
  check(
    "la nota de derogación cita el art. 207 de la Ley 27.802 y la fecha del B.O.",
    RESERVA_TEXTOS.art216Nota.includes(`art. ${ARTICULO_DEROGATORIO}`) &&
      RESERVA_TEXTOS.art216Nota.includes("27.802") &&
      RESERVA_TEXTOS.art216Nota.includes("6/3/2026"),
    RESERVA_TEXTOS.art216Nota,
  );
  check(
    "la nota dice que rige desde la publicación (sin fecha diferida a 2027)",
    RESERVA_TEXTOS.art216Nota.includes("a partir de su publicación en el Boletín Oficial") &&
      !RESERVA_TEXTOS.art216Nota.includes("2027"),
    RESERVA_TEXTOS.art216Nota,
  );
  check("la vigencia es el 6 de marzo de 2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check(
    "el texto largo de la vigencia coincide con el ISO",
    VIGENCIA_REFORMA === "6 de marzo de 2026",
    VIGENCIA_REFORMA,
  );
}

// ── 2. El texto derogado dice lo que decía (las dos oraciones) ─────────────────────────────────
{
  check(
    "el art. 216 derogado nombra los dos rubros: despido injustificado y preaviso",
    RESERVA_TEXTOS.art216Derogado.includes("por despido injustificado y por falta u omisión del preaviso"),
    RESERVA_TEXTOS.art216Derogado,
  );
  check(
    "…y trae la oración que decidía la plata",
    RESERVA_TEXTOS.art216Derogado.includes(RESERVA_TEXTOS.oracionQueCayo),
    RESERVA_TEXTOS.oracionQueCayo,
  );
  check(
    "la oración que cayó habla de la antigüedad computable, no de otra cosa",
    RESERVA_TEXTOS.oracionQueCayo.includes("la antigüedad computable incluirá el período de reserva del empleo"),
    RESERVA_TEXTOS.oracionQueCayo,
  );
  check(
    "el art. 216 nombraba a los arts. 214 o 215 — y NUNCA al 217 (la asimetría es la página)",
    RESERVA_TEXTOS.art216Derogado.includes("los artículos 214 o 215") &&
      !RESERVA_TEXTOS.art216Derogado.includes("217"),
    RESERVA_TEXTOS.art216Derogado,
  );
}

// ── 3. Los artículos que quedaron en pie ───────────────────────────────────────────────────────
{
  for (const [nombre, texto] of [
    ["214", RESERVA_TEXTOS.art214],
    ["215", RESERVA_TEXTOS.art215],
    ["217", RESERVA_TEXTOS.art217],
  ] as const) {
    check(
      `el art. ${nombre} se cita como vigente, sin nota de derogación`,
      !texto.includes("derogado") && !texto.includes("Artículo sustituido"),
      texto.slice(0, 80),
    );
    check(
      `el art. ${nombre} conserva el plazo de treinta (30) días para reincorporar`,
      texto.includes("treinta (30) días después de concluido"),
      texto,
    );
  }
  check(
    "el art. 214 conserva la reserva del empleo para convocatorias y movilización",
    RESERVA_TEXTOS.art214.includes("El empleador conservará el empleo al trabajador") &&
      RESERVA_TEXTOS.art214.includes("movilización o convocatorias especiales"),
    RESERVA_TEXTOS.art214,
  );
  check(
    "el art. 215 conserva la reserva para cargos electivos nacionales, provinciales o municipales",
    RESERVA_TEXTOS.art215.includes("cargos electivos en el orden nacional, provincial o municipal") &&
      RESERVA_TEXTOS.art215.includes("tendrán derecho a la reserva de su empleo"),
    RESERVA_TEXTOS.art215,
  );
  check(
    "el art. 217 conserva la prohibición expresa de despedir, que los otros dos no tienen",
    RESERVA_TEXTOS.art217.includes("no pudiendo ser despedidos durante los plazos que fije la ley respectiva") &&
      !RESERVA_TEXTOS.art214.includes("no pudiendo ser despedidos") &&
      !RESERVA_TEXTOS.art215.includes("no pudiendo ser despedidos"),
    RESERVA_TEXTOS.art217,
  );
  check(
    "el art. 217 remite a los arts. 214 y 215, segunda parte (por eso el cómputo sobrevive ahí)",
    RESERVA_TEXTOS.art217.includes("con el alcance de los artículos 214 y 215, segunda parte"),
    RESERVA_TEXTOS.art217,
  );
  check(
    "la oración genérica que sostiene la lectura contraria sigue en el art. 214",
    RESERVA_TEXTOS.art214.includes(RESERVA_TEXTOS.oracionQueQueda),
    RESERVA_TEXTOS.oracionQueQueda,
  );
  check(
    "la oración de los promedios de remuneraciones sigue en el art. 214",
    RESERVA_TEXTOS.art214.includes(RESERVA_TEXTOS.oracionDeLosPromedios),
    RESERVA_TEXTOS.oracionDeLosPromedios,
  );
  check(
    "…y el art. 215 dice lo mismo con su propia redacción",
    RESERVA_TEXTOS.art215.includes("no será considerado para determinar los promedios de remuneración"),
    RESERVA_TEXTOS.art215,
  );
}

// ── 4. Los tres supuestos: quién quedó cubierto por el art. 216 y quién no ─────────────────────
{
  check("hay tres supuestos de reserva del empleo", SUPUESTOS_RESERVA.length === 3);
  const arts = SUPUESTOS_RESERVA.map((s) => s.articulo).sort((a, b) => a - b);
  check("los supuestos son los arts. 214, 215 y 217", JSON.stringify(arts) === "[214,215,217]", arts);
  const cubiertos = SUPUESTOS_RESERVA.filter((s) => s.cubriaElArt216).map((s) => s.articulo);
  check(
    "el art. 216 cubría exactamente a los arts. 214 y 215",
    JSON.stringify(cubiertos.sort((a, b) => a - b)) === "[214,215]",
    cubiertos,
  );
  const gremial = SUPUESTOS_RESERVA.find((s) => s.id === "gremial")!;
  check("el supuesto gremial es el art. 217 y NO estaba cubierto", gremial.articulo === 217 && !gremial.cubriaElArt216);
  check("el plazo para reincorporar son 30 días", DIAS_PARA_REINCORPORAR === 30);
}

// ── 5. El cálculo: el escenario "con reserva" es el de /indemnizacion, sin divergencia ─────────
{
  const p = {
    mejorRemuneracion: BASE,
    ingreso: "2017-04-03",
    inicioReserva: "2021-12-10",
    finFuncion: "2025-12-10",
    egreso: "2026-08-31",
    supuestoId: "electivo" as const,
  };
  const r = calcularReservaEmpleo(p)!;
  check("el caso base calcula", r !== null);

  const directo = calcularIndemnizacion({
    ingresoISO: p.ingreso,
    despidoISO: p.egreso,
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  })!;
  check(
    "el escenario CON reserva es idéntico al que publica /indemnizacion (mismo núcleo del art. 245)",
    casi(r.conReserva.totalIndemnizatorio, directo.totalIndemnizatorio) &&
      r.conReserva.aniosComputables === directo.aniosComputables,
    { reserva: r.conReserva.totalIndemnizatorio, indemnizacion: directo.totalIndemnizatorio },
  );

  // El ingreso equivalente corre exactamente los días de la reserva, ni uno más.
  const diasEsperados = Math.round(
    (Date.UTC(2025, 11, 10) - Date.UTC(2021, 11, 10)) / 86_400_000,
  );
  check("el período de reserva se mide en días corridos", r.diasDeReserva === diasEsperados, {
    calculado: r.diasDeReserva,
    esperado: diasEsperados,
  });
  const equivalenteEsperado = new Date(Date.UTC(2017, 3, 3));
  equivalenteEsperado.setUTCDate(equivalenteEsperado.getUTCDate() + diasEsperados);
  check(
    "el ingreso equivalente está corrido exactamente esos días",
    r.ingresoEquivalente === equivalenteEsperado.toISOString().slice(0, 10),
    { calculado: r.ingresoEquivalente, esperado: equivalenteEsperado.toISOString().slice(0, 10) },
  );

  check(
    "computar el período de reserva nunca puede pagar menos",
    r.diferencia >= 0 &&
      r.conReserva.totalIndemnizatorio >= r.sinReserva.totalIndemnizatorio,
    { diferencia: r.diferencia },
  );
  check(
    "la diferencia es la resta de los dos totales, sin redondeos escondidos",
    casi(r.diferencia, r.conReserva.totalIndemnizatorio - r.sinReserva.totalIndemnizatorio),
    r.diferencia,
  );
  check(
    "el caso base pone en juego los cuatro años de mandato",
    r.conReserva.aniosComputables - r.sinReserva.aniosComputables === 4,
    {
      con: r.conReserva.aniosComputables,
      sin: r.sinReserva.aniosComputables,
    },
  );

  // El límite de reincorporación son 30 días desde el fin de la función.
  check(
    "el límite de reincorporación es fin de función + 30 días",
    r.limiteReincorporacion === "2026-01-09",
    r.limiteReincorporacion,
  );
  check("el egreso del caso base quedó fuera de esa ventana", r.egresoFueraDeVentana);
}

// ── 6. El umbral del preaviso (arts. 231/232) puede depender del período de reserva ────────────
{
  // Antigüedad total ~6 años, de los cuales 4 son de reserva: con reserva supera los 5 años
  // (preaviso de 2 meses), sin reserva no los alcanza (1 mes).
  const r = calcularReservaEmpleo({
    mejorRemuneracion: BASE,
    ingreso: "2020-01-10",
    inicioReserva: "2021-12-10",
    finFuncion: "2025-12-10",
    egreso: "2026-06-30",
    supuestoId: "electivo",
  })!;
  check(
    "con la reserva computada el preaviso es de 2 meses",
    r.conReserva.preaviso?.meses === 2,
    r.conReserva.preaviso,
  );
  check(
    "…y sin computarla queda en 1 mes",
    r.sinReserva.preaviso?.meses === 1,
    r.sinReserva.preaviso,
  );
  check("la calculadora avisa que ahí el umbral del preaviso lo define la reserva", r.cambiaElPreaviso);
  check(
    "y ese aviso se emite como bloqueante, no escondido",
    r.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("PREAVISO")),
    r.avisos.map((a) => a.tono),
  );
}

// ── 7. El caso gremial (art. 217): la derogación no lo alcanza ─────────────────────────────────
{
  const r = calcularReservaEmpleo({
    mejorRemuneracion: BASE,
    ingreso: "2017-04-03",
    inicioReserva: "2021-12-10",
    finFuncion: "2025-12-10",
    egreso: "2026-08-31",
    supuestoId: "gremial",
  })!;
  check("el supuesto gremial resuelve al art. 217", r.supuesto.articulo === 217);
  check(
    "y la página le dice que la reforma NO lo tocó",
    r.avisos.some((a) => a.tono === "ok" && a.texto.includes("art. 217")),
    r.avisos.map((a) => a.texto.slice(0, 40)),
  );
}

// ── 8. Guardas de entrada: el orden de las fechas no se puede violar ───────────────────────────
{
  const base = {
    mejorRemuneracion: BASE,
    ingreso: "2017-04-03",
    inicioReserva: "2021-12-10",
    finFuncion: "2025-12-10",
    egreso: "2026-08-31",
    supuestoId: "electivo" as const,
  };
  check("sin sueldo no calcula", calcularReservaEmpleo({ ...base, mejorRemuneracion: 0 }) === null);
  check(
    "la reserva no puede empezar antes del ingreso",
    calcularReservaEmpleo({ ...base, inicioReserva: "2016-01-01" }) === null,
  );
  check(
    "la función no puede terminar antes de empezar",
    calcularReservaEmpleo({ ...base, finFuncion: "2021-01-01" }) === null,
  );
  check(
    "el egreso no puede ser anterior al fin de la función",
    calcularReservaEmpleo({ ...base, egreso: "2025-01-01" }) === null,
  );
}

// ── 9. Fuentes: oficiales, fechadas y con la captura del texto derogado ────────────────────────
{
  check("hay fecha de consulta", /^\d{4}-\d{2}-\d{2}$/.test(RESERVA_FUENTES.consultadoEl));
  check("hay al menos cuatro fuentes", RESERVA_FUENTES.lista.length >= 4);
  check(
    "todas las fuentes son oficiales o la captura del texto oficial",
    RESERVA_FUENTES.lista.every(
      (f) =>
        f.url.startsWith("https://servicios.infoleg.gob.ar/") ||
        f.url.startsWith("https://www.boletinoficial.gob.ar/") ||
        f.url.startsWith("https://web.archive.org/web/"),
    ),
    RESERVA_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citada la captura de la que sale el texto del art. 216 derogado",
    RESERVA_FUENTES.lista.some(
      (f) => f.url.includes("web.archive.org") && f.url.includes("25552/texact.htm"),
    ),
    RESERVA_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    RESERVA_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de reserva del empleo OK (LCT arts. 214, 215 y 217 vigentes · art. 216 derogado por el art. 207 de la Ley 27.802)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
