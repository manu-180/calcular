// Verificación de la página de indemnización por clientela (Ley 14.546, art. 14) y de su fecha
// de muerte (art. 198 de la Ley 27.802). Correr con: npx tsx scripts/check_viajantes.ts
//
// LOS ANCLAS:
//   1. **El corte del 1/1/2027 decide el caso.** Una disolución del 31/12/2026 paga clientela y
//      una del 1/1/2027 no paga nada: si ese umbral se corre un día, la página le dice a alguien
//      que no le corresponde una indemnización que sí le corresponde (o al revés).
//   2. **El piso del año del art. 14** («una vez transcurrido un año de vigencia»): a los 11 meses
//      no hay clientela, a los 12 sí.
//   3. **La clientela se paga cualquiera sea el motivo**, incluida la renuncia. Es lo que casi no
//      se publica, y el check lo fija: con motivo «renuncia» el importe indemnizatorio es 0 y la
//      clientela es mayor que 0.
//   4. **El despido del art. 14 es hipotético**: se calcula sin preaviso otorgado aunque el
//      preaviso real se haya trabajado. Tildar «me preavisaron» no puede cambiar la clientela.
//   5. **El art. 245 no se reimplementa**: la clientela estricta tiene que ser exactamente el 25%
//      de la indemnización por antigüedad que devuelve `calcularIndemnizacion` (regla de s85: dos
//      páginas no pueden publicar dos importes distintos para el mismo caso).
//   6. **Las citas dicen lo que dice la norma**, empezando por las dos que la web publica mal: el
//      art. 14 habla de «el veinticinco por ciento de lo que le hubiere correspondido en caso de
//      despido intempestivo e injustificado» (no de remuneraciones de cinco años) y el art. 198
//      ya está sancionado y publicado (no es un proyecto).

import {
  ANIOS_PRESCRIPCION_ESTATUTO,
  DEROGACION_ISO,
  DEROGACION_TEXTO,
  DIAS_ACEPTACION_NOTA,
  MESES_MINIMOS_CLIENTELA,
  MOTIVOS,
  OTRAS_DEROGACIONES,
  PORCENTAJE_CLIENTELA,
  QUE_SE_PIERDE,
  REQUISITOS_DEPENDENCIA,
  TEXTOS,
  ULTIMO_DIA_VIGENTE_ISO,
  VIAJANTES_FUENTES,
} from "../src/data/viajantes";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularViajante } from "../src/lib/viajantes";

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

const BASE = 1_000_000;
const caso = (over: Partial<Parameters<typeof calcularViajante>[0]> = {}) =>
  calcularViajante({
    ingresoISO: "2016-06-30",
    egresoISO: "2026-06-30",
    mejorRemuneracion: BASE,
    motivo: "despido-sin-causa",
    preavisoOtorgado: false,
    ...over,
  });

// ── 1. La cuenta del art. 14 sobre un caso conocido ───────────────────────────────────────────
{
  const r = caso()!;
  check("diez años justos son diez años computables", r.hipotetico.aniosComputables === 10);
  check(
    "la indemnización por antigüedad son 10 sueldos",
    casi(r.hipotetico.indemnizacionAntiguedad, 10 * BASE),
    r.hipotetico.indemnizacionAntiguedad,
  );
  check(
    "con más de 5 años el preaviso hipotético son 2 meses",
    r.hipotetico.preaviso?.meses === 2,
    r.hipotetico.preaviso,
  );
  check(
    "el 30 de junio no genera integración del mes (es el último día)",
    r.hipotetico.integracion === null,
  );
  check(
    "lectura estricta: 25% de la indemnización por antigüedad",
    casi(r.clientela.estricta, 2_500_000),
    r.clientela.estricta,
  );
  check(
    "lectura amplia: 25% de la antigüedad más el preaviso omitido y su SAC",
    casi(r.clientela.amplia, 0.25 * (10 * BASE + 2 * BASE + (2 * BASE) / 12)),
    r.clientela.amplia,
  );
  check("la lectura amplia nunca es menor que la estricta", r.clientela.amplia >= r.clientela.estricta);
  check("el porcentaje del art. 14 es el 25%", PORCENTAJE_CLIENTELA === 0.25);
}

// ── 2. El corte del 1° de enero de 2027 (art. 198 de la Ley 27.802) ───────────────────────────
{
  const ultimoDia = caso({ egresoISO: ULTIMO_DIA_VIGENTE_ISO })!;
  const primerDiaSin = caso({ egresoISO: DEROGACION_ISO })!;
  const diaSiguiente = caso({ egresoISO: "2027-01-02" })!;

  check("el 31/12/2026 todavía paga clientela", ultimoDia.clientela.corresponde);
  check("…y el importe es mayor que cero", ultimoDia.clientela.estricta > 0);
  check("el 1/1/2027 ya no paga clientela", primerDiaSin.clientela.corresponde === false);
  check("…y el motivo es la derogación", primerDiaSin.clientela.motivoRechazo === "derogada");
  check("…y el importe es exactamente cero", primerDiaSin.clientela.estricta === 0);
  check("el 2/1/2027 tampoco", diaSiguiente.clientela.corresponde === false);
  check(
    "la derogación se lleva la clientela, no el resto de la liquidación",
    primerDiaSin.cobraIndemnizatorio > 0 && primerDiaSin.liquidacionFinal > 0,
    { indemnizatorio: primerDiaSin.cobraIndemnizatorio, final: primerDiaSin.liquidacionFinal },
  );
  check(
    "el total del 1/1/2027 es exactamente la liquidación sin clientela",
    casi(
      primerDiaSin.totalEstricto,
      primerDiaSin.cobraIndemnizatorio + primerDiaSin.liquidacionFinal,
    ) && casi(primerDiaSin.totalEstricto, primerDiaSin.totalAmplio),
  );
  check("la fecha de derogación es el 1/1/2027", DEROGACION_ISO === "2027-01-01");
  check("el último día vigente es el 31/12/2026", ULTIMO_DIA_VIGENTE_ISO === "2026-12-31");
  check(
    "el texto del art. 198 trae la fecha",
    TEXTOS.art198Ley27802.includes("1º de enero de 2027") &&
      TEXTOS.art198Ley27802.includes("14.546"),
    TEXTOS.art198Ley27802,
  );
}

// ── 3. El piso del año del art. 14 ────────────────────────────────────────────────────────────
{
  const onceMeses = caso({ ingresoISO: "2026-01-15", egresoISO: "2026-12-15" })!;
  const doceMeses = caso({ ingresoISO: "2025-12-31", egresoISO: "2026-12-31" })!;

  check("a los 11 meses no hay clientela", onceMeses.clientela.corresponde === false);
  check("…y el motivo es la antigüedad", onceMeses.clientela.motivoRechazo === "antiguedad");
  check("a los 12 meses justos sí hay clientela", doceMeses.clientela.corresponde);
  check("el piso del art. 14 son 12 meses", MESES_MINIMOS_CLIENTELA === 12);
  check(
    "la cita del art. 14 trae el piso del año",
    TEXTOS.art14.includes("una vez transcurrido un año de vigencia del mismo"),
  );
}

// ── 4. Cualquiera sea el motivo: la clientela se paga igual ───────────────────────────────────
{
  const despido = caso({ motivo: "despido-sin-causa" })!;
  const renuncia = caso({ motivo: "renuncia" })!;
  const acuerdo = caso({ motivo: "mutuo-acuerdo" })!;
  const conCausa = caso({ motivo: "despido-con-causa" })!;
  const jubilacion = caso({ motivo: "jubilacion" })!;

  check("el despido sin causa paga indemnización", despido.cobraIndemnizatorio > 0);
  check("la renuncia NO paga indemnización por despido", renuncia.cobraIndemnizatorio === 0);
  check("…pero SÍ paga la clientela", renuncia.clientela.estricta > 0);
  check(
    "la clientela es la misma cualquiera sea el motivo",
    [renuncia, acuerdo, conCausa, jubilacion].every((r) =>
      casi(r.clientela.estricta, despido.clientela.estricta),
    ),
  );
  check(
    "el mutuo acuerdo y el despido con causa tampoco pagan indemnización por despido",
    acuerdo.cobraIndemnizatorio === 0 && conCausa.cobraIndemnizatorio === 0,
  );
  check(
    "la liquidación final (SAC y vacaciones) corresponde en todos los motivos",
    [despido, renuncia, acuerdo, conCausa, jubilacion].every((r) => r.liquidacionFinal > 0),
  );
  check(
    "la cita del art. 14 dice que no depende del motivo",
    TEXTOS.art14.includes("cualquiera sea el motivo determinante de la disolución del contrato"),
  );
  check(
    "un solo motivo genera indemnización por despido",
    MOTIVOS.filter((m) => m.conIndemnizacionDespido).length === 1,
    MOTIVOS.filter((m) => m.conIndemnizacionDespido).map((m) => m.id),
  );
}

// ── 5. El despido del art. 14 es hipotético (el preaviso real no lo toca) ─────────────────────
{
  const sinPreaviso = caso({ preavisoOtorgado: false })!;
  const conPreaviso = caso({ preavisoOtorgado: true })!;

  check(
    "haber trabajado el preaviso no cambia la clientela",
    casi(conPreaviso.clientela.estricta, sinPreaviso.clientela.estricta) &&
      casi(conPreaviso.clientela.amplia, sinPreaviso.clientela.amplia),
  );
  check(
    "…pero sí cambia lo indemnizatorio que se cobra de verdad",
    conPreaviso.cobraIndemnizatorio < sinPreaviso.cobraIndemnizatorio,
  );
  check(
    "la cita del art. 14 califica el despido como intempestivo e injustificado",
    TEXTOS.art14.includes("despido intempestivo e injustificado"),
  );
}

// ── 6. El art. 245 no se reimplementa: sale del mismo núcleo que /indemnizacion ───────────────
{
  for (const [ingresoISO, egresoISO] of [
    ["2016-06-30", "2026-06-30"],
    ["2019-03-11", "2026-11-20"],
    ["2024-02-29", "2026-05-01"],
  ]) {
    const r = caso({ ingresoISO, egresoISO })!;
    const ind = calcularIndemnizacion({
      ingresoISO,
      despidoISO: egresoISO,
      mejorRemuneracion: BASE,
      preavisoOtorgado: false,
    })!;
    check(
      `${ingresoISO} → ${egresoISO}: la clientela estricta es el 25% del art. 245 de /indemnizacion`,
      casi(r.clientela.estricta, ind.indemnizacionAntiguedad * PORCENTAJE_CLIENTELA),
      { pagina: r.clientela.estricta, indemnizacion: ind.indemnizacionAntiguedad },
    );
    check(
      `${ingresoISO} → ${egresoISO}: el total estricto es la suma de sus partes`,
      casi(r.totalEstricto, r.cobraIndemnizatorio + r.liquidacionFinal + r.clientela.estricta),
    );
  }
}

// ── 7. Entradas inválidas ─────────────────────────────────────────────────────────────────────
{
  check("fechas invertidas devuelven null", caso({ egresoISO: "2015-01-01" }) === null);
  check("sueldo cero devuelve null", caso({ mejorRemuneracion: 0 }) === null);
  check("sin fecha de ingreso devuelve null", caso({ ingresoISO: "" }) === null);
}

// ── 8. Los textos y las fuentes ───────────────────────────────────────────────────────────────
{
  check(
    "el art. 14 se cita completo, con el porcentaje en letras",
    TEXTOS.art14.includes("veinticinco por ciento") && TEXTOS.art14.length > 400,
  );
  check(
    "el art. 6 trae la regla de la comisión indirecta",
    TEXTOS.art6.includes("La tasa o por ciento de la comisión indirecta será igual a la directa"),
  );
  check(
    "el art. 9 trae la conformidad expresa para el cambio de zona",
    TEXTOS.art9.includes("conformidad expresa del viajante") &&
      TEXTOS.art9.includes("mismo volumen de remuneraciones"),
  );
  check(
    "el art. 11 trae la carga de la prueba invertida",
    TEXTOS.art11.includes("la prueba contraria a la reclamación corresponderá a la parte patronal"),
  );
  check(
    "el art. 13 trae el día y medio por semana de gira",
    TEXTOS.art13.includes("un día y medio por cada semana de viaje realizado"),
  );
  check(
    "el art. 4 trae el orden público y el plazo del estatuto",
    TEXTOS.art4.includes("de orden público") &&
      TEXTOS.art4.includes("prescribirán a los cinco años") &&
      ANIOS_PRESCRIPCION_ESTATUTO === 5,
  );
  check(
    "el art. 2 trae los seis requisitos de dependencia",
    ["a)", "b)", "c)", "d)", "e)", "f)"].every((i) => TEXTOS.art2.includes(i)) &&
      REQUISITOS_DEPENDENCIA.length === 6,
  );
  check(
    "los plazos del art. 5 inc. b) son 15 y 30 días",
    DIAS_ACEPTACION_NOTA.mismaZona === 15 && DIAS_ACEPTACION_NOTA.otrasZonas === 30,
  );
  check(
    "el art. 217 explica que la ley rige desde su publicación",
    TEXTOS.art217Ley27802.includes("entrarán en vigencia a partir de su publicación"),
  );
  check(
    "la lista de lo que se pierde tiene todas sus filas completas",
    QUE_SE_PIERDE.length >= 8 &&
      QUE_SE_PIERDE.every(
        (f) => /^Arts?\./.test(f.articulo) && f.titulo && f.hoy.length > 40 && f.desde2027.length > 20,
      ),
  );
  check(
    "las otras derogaciones del Título XXVI citan artículo, ley y la ficha oficial de la norma",
    OTRAS_DEROGACIONES.length >= 5 &&
      OTRAS_DEROGACIONES.every(
        (d) =>
          /^Art\. \d+$/.test(d.articulo) &&
          /^Ley /.test(d.ley) &&
          d.que.length > 10 &&
          /^https:\/\/servicios\.infoleg\.gob\.ar\/infolegInternet\/verNorma\.do\?id=\d+$/.test(d.url),
      ),
    OTRAS_DEROGACIONES,
  );
  // El nombre de cada ley se abrió en InfoLEG uno por uno (23/8/2026). Tres de ellos habían sido
  // deducidos de memoria y estaban mal: quedan fijados acá para que nadie los “corrija” de vuelta.
  check(
    "los nombres verificados de las leyes derogadas no se pierden",
    OTRAS_DEROGACIONES.find((d) => d.ley === "Ley 23.947")?.que === "Estatuto del Peluquero" &&
      OTRAS_DEROGACIONES.find((d) => d.ley === "Ley 23.472")?.que ===
        "Fondo de Garantía de Créditos Laborales" &&
      OTRAS_DEROGACIONES.find((d) => d.ley === "Ley 12.867")?.que ===
        "Estatuto de Choferes (choferes particulares)",
    OTRAS_DEROGACIONES.map((d) => `${d.ley}: ${d.que}`),
  );
  check("la fecha de derogación en texto coincide con la ISO", DEROGACION_TEXTO.includes("2027"));
  check(
    "todas las fuentes son oficiales",
    VIAJANTES_FUENTES.lista.every((f) =>
      /^https:\/\/(www\.)?(servicios\.infoleg|infoleg|boletinoficial|argentina)\.gob\.ar\//.test(
        f.url,
      ),
    ),
    VIAJANTES_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto ACTUALIZADO de la Ley 14.546",
    VIAJANTES_FUENTES.lista.some((f) => f.url.includes("96295") && f.url.endsWith("texact.htm")),
  );
  check(
    "está citada la Ley 27.802 como fuente de la derogación",
    VIAJANTES_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(VIAJANTES_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log("\nTodos los checks de viajantes de comercio OK (Ley 14.546 art. 14 · Ley 27.802 art. 198).");
