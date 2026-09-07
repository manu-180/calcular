// Verificación de la indemnización por accidente de trabajo (Ley 24.557 + Ley 26.773 + Res. SRT).
// Correr con: npx tsx scripts/check_riesgos_trabajo.ts
//
// LO QUE ESTE CHECK EXISTE PARA IMPEDIR:
//
//   1. **Que el piso vuelva a ser un techo.** Es EL error del tema: el texto vigente de la Ley
//      24.557 dice «en ningún caso será superior a $180.000» y el art. 2º del Decreto 1694/2009
//      suprimió ese tope, con el art. 3º convirtiendo el número en piso. Si algún día alguien
//      escribe `Math.min` donde va `Math.max`, la calculadora publica lo contrario de la norma
//      sobre un número de plata. Se prueba con un caso donde fórmula < piso.
//   2. **Que el porcentaje multiplique donde no debe.** El art. 14 ap. 2 multiplica por el % de
//      incapacidad; el art. 15 ap. 2 (incapacidad TOTAL) y el art. 18 (muerte), NO. Es el error de
//      cálculo más común del régimen y cambia el monto por un factor de tres.
//   3. **Que el 20% del art. 3 se pague en un accidente in itinere.** La norma lo reserva al daño
//      ocurrido «en el lugar de trabajo o […] a disposición del empleador».
//   4. **Que los valores queden viejos sin que nadie lo note.** Los pisos los actualiza la SRT por
//      RIPTE cada seis meses. El check exige que los cargados NO sean los de 2009 y que la
//      vigencia declarada sea la de la resolución que está en el archivo de datos.
//   5. **Que el coeficiente de edad se invierta.** Es 65 ÷ edad: beneficia al MÁS JOVEN. Un
//      edad ÷ 65 daría lo contrario y seguiría pareciendo razonable.

import {
  ART_FUENTES,
  ART_TEXTOS,
  COMPENSACIONES,
  FORMULA,
  PISOS,
  TRAMOS,
  VALORES_2009,
  VIGENCIA_ART,
} from "../src/data/riesgos-trabajo";
import { calcularART, tramoDe } from "../src/lib/riesgos-trabajo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FALLA ${nombre}`, detalle ?? "");
  }
}

// --- 1. El piso es piso, no techo ---------------------------------------------------------------
// Sueldo bajo + incapacidad baja: la fórmula queda MUY por debajo del piso legal.
const bajo = calcularART({ ingresoBase: 100_000, edad: 40, incapacidad: 10, enElTrabajo: false })!;
check("con fórmula por debajo del piso, manda el piso", bajo.mandaElPiso);
check(
  "y la indemnización es el piso, no la fórmula",
  bajo.indemnizacion === bajo.piso && bajo.indemnizacion > bajo.formula,
  { formula: bajo.formula, piso: bajo.piso, indemnizacion: bajo.indemnizacion },
);
check(
  "el piso de la parcial se prorratea por el % de incapacidad",
  Math.abs(bajo.piso - PISOS.incapacidadParcial * 0.1) < 0.01,
  bajo.piso,
);
// Sueldo alto: la fórmula supera el piso y NO se la recorta (el tope está suprimido).
const alto = calcularART({ ingresoBase: 8_000_000, edad: 30, incapacidad: 40, enElTrabajo: false })!;
check("con fórmula por encima del piso, NO se recorta (el tope está suprimido)", !alto.mandaElPiso);
check(
  "y la indemnización es la fórmula",
  alto.indemnizacion === alto.formula && alto.formula > alto.piso,
  { formula: alto.formula, piso: alto.piso },
);

// --- 2. El porcentaje multiplica en la parcial y NO en la total ni en la muerte -----------------
const ib = 2_000_000;
const parcial66 = calcularART({ ingresoBase: ib, edad: 40, incapacidad: 66, enElTrabajo: false })!;
check("66% ya es incapacidad TOTAL", parcial66.tramo === "total");
check(
  "en la total la fórmula NO multiplica por el porcentaje",
  Math.abs(parcial66.formula - FORMULA.veces * ib * (65 / 40)) < 0.01,
  parcial66.formula,
);
const parcial50 = calcularART({ ingresoBase: ib, edad: 40, incapacidad: 50, enElTrabajo: false })!;
check(
  "en la parcial la fórmula SÍ multiplica por el porcentaje",
  Math.abs(parcial50.formula - FORMULA.veces * ib * (65 / 40) * 0.5) < 0.01,
  parcial50.formula,
);
const muerto = calcularART({ ingresoBase: ib, edad: 40, incapacidad: 0, enElTrabajo: false }, true)!;
check("la muerte usa la fórmula del art. 15 ap. 2, sin porcentaje", muerto.formula === parcial66.formula);
check("y el porcentaje de incapacidad es irrelevante en la muerte", muerto.tramo === "muerte");

// Los tres tramos por porcentaje.
check("50% es parcial", tramoDe(50) === "parcial");
check("50,5% es parcial grave", tramoDe(50.5) === "parcial-grave");
check("65,9% sigue siendo parcial grave", tramoDe(65.9) === "parcial-grave");
check("66% es total", tramoDe(66) === "total");

// --- 3. Las compensaciones del art. 11 ap. 4 ----------------------------------------------------
check(
  "la parcial hasta el 50% NO lleva compensación adicional",
  calcularART({ ingresoBase: ib, edad: 40, incapacidad: 30, enElTrabajo: false })!.compensacion === 0,
);
check(
  "la parcial grave lleva la del inc. a)",
  calcularART({ ingresoBase: ib, edad: 40, incapacidad: 55, enElTrabajo: false })!.compensacion ===
    COMPENSACIONES.parcialGrave,
);
check("la total lleva la del inc. b)", parcial66.compensacion === COMPENSACIONES.total);
check("la muerte lleva la del inc. c)", muerto.compensacion === COMPENSACIONES.muerte);
check(
  "las tres compensaciones son crecientes (a < b < c)",
  COMPENSACIONES.parcialGrave < COMPENSACIONES.total &&
    COMPENSACIONES.total < COMPENSACIONES.muerte,
);

// --- 4. El 20% del art. 3 de la Ley 26.773 -----------------------------------------------------
const itinere = calcularART({ ingresoBase: ib, edad: 40, incapacidad: 30, enElTrabajo: false })!;
const enTrabajo = calcularART({ ingresoBase: ib, edad: 40, incapacidad: 30, enElTrabajo: true })!;
check("in itinere NO paga el 20% del art. 3", itinere.adicional20 === 0);
check("en el lugar de trabajo SÍ lo paga", enTrabajo.adicional20 > 0);
check(
  "el 20% se calcula sobre indemnización + compensación",
  Math.abs(enTrabajo.adicional20 - (enTrabajo.indemnizacion + enTrabajo.compensacion) * 0.2) < 0.01,
);
const muerteEnTrabajo = calcularART(
  { ingresoBase: 50_000, edad: 60, incapacidad: 0, enElTrabajo: true },
  true,
)!;
check(
  "en muerte, el 20% nunca baja del piso propio del art. 4 de la Res. SRT",
  muerteEnTrabajo.adicional20 >= PISOS.adicional20,
  muerteEnTrabajo.adicional20,
);
check(
  "y ese piso NO se aplica en una incapacidad parcial",
  calcularART({ ingresoBase: 50_000, edad: 60, incapacidad: 10, enElTrabajo: true })!.adicional20 <
    PISOS.adicional20,
);

// --- 5. El coeficiente de edad favorece al más joven --------------------------------------------
const joven = calcularART({ ingresoBase: ib, edad: 25, incapacidad: 30, enElTrabajo: false })!;
const mayor = calcularART({ ingresoBase: ib, edad: 60, incapacidad: 30, enElTrabajo: false })!;
check("a igual sueldo e incapacidad, el más joven cobra más (65 ÷ edad)", joven.formula > mayor.formula);
check("a los 65 años el coeficiente es exactamente 1", calcularART({ ingresoBase: ib, edad: 65, incapacidad: 30, enElTrabajo: false })!.coeficienteEdad === 1);

// --- 6. Los valores están vivos ----------------------------------------------------------------
check(
  "el piso de la parcial NO es el de 2009",
  PISOS.incapacidadParcial > VALORES_2009.piso * 100,
  { hoy: PISOS.incapacidadParcial, en2009: VALORES_2009.piso },
);
// Ensanchados a number a propósito: los dos lados son literales y TypeScript resolvería el `!==`
// en compilación. El guard existe para el día en que alguien "restaure" los valores de 2009.
const compHoy: number[] = [COMPENSACIONES.parcialGrave, COMPENSACIONES.total, COMPENSACIONES.muerte];
const comp2009: number[] = [
  VALORES_2009.compensaciones.parcialGrave,
  VALORES_2009.compensaciones.total,
  VALORES_2009.compensaciones.muerte,
];
check(
  "las tres compensaciones tampoco son las de 2009",
  compHoy.every((v, i) => v !== comp2009[i]),
  { hoy: compHoy, en2009: comp2009 },
);
check(
  "la fuente de los valores es la resolución declarada en VIGENCIA_ART",
  ART_FUENTES.lista.some((f) => f.detalle.includes(String(PISOS.incapacidadParcial.toLocaleString("es-AR")))) ||
    ART_FUENTES.lista.some((f) => f.nombre.includes(VIGENCIA_ART.resolucion.replace("Resolución SRT ", "SRT "))),
  ART_FUENTES.lista.map((f) => f.nombre),
);
check(
  "la vigencia declara el semestre y la próxima revisión",
  VIGENCIA_ART.desde.length > 0 &&
    VIGENCIA_ART.hasta.length > 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(VIGENCIA_ART.proximaRevision),
);

// --- 7. Las citas textuales que sostienen la tesis de la página --------------------------------
check(
  "la cita del art. 14 conserva el «no será SUPERIOR» que quedó invertido",
  ART_TEXTOS.topeInvertido.includes("en ningún caso será superior"),
);
check(
  "la cita del art. 2º del decreto dice que SUPRIME los topes",
  /Supr[íi]mense los topes/i.test(ART_TEXTOS.supresionTopes),
);
check(
  "la cita del art. 3º del decreto dice «nunca será inferior»",
  ART_TEXTOS.pisoParcial.includes("nunca será inferior"),
);
check(
  "la cita del art. 3 de la Ley 26.773 trae la condición de lugar (no in itinere)",
  ART_TEXTOS.adicional20.includes("en el lugar de trabajo") &&
    ART_TEXTOS.adicional20.includes("a disposición del empleador"),
);
check(
  "la cita del ingreso base dice que se actualiza por RIPTE mes a mes",
  ART_TEXTOS.ingresoBase.includes("actualizarán mes a mes") && ART_TEXTOS.ingresoBase.includes("RIPTE"),
);
check("hay cuatro tramos documentados", TRAMOS.length === 4);
check(
  "las fuentes incluyen la ley, el decreto que invierte el tope y la resolución vigente",
  ART_FUENTES.lista.length === 4 &&
    ART_FUENTES.lista.some((f) => f.url.includes("27971")) &&
    ART_FUENTES.lista.some((f) => f.url.includes("159765")) &&
    ART_FUENTES.lista.some((f) => f.url.includes("203798")) &&
    ART_FUENTES.lista.some((f) => f.url.includes("boletinoficial.gob.ar")),
);

// --- 8. Entradas inválidas ---------------------------------------------------------------------
check("ingreso base cero no devuelve resultado", calcularART({ ingresoBase: 0, edad: 40, incapacidad: 10, enElTrabajo: true }) === null);
check("edad fuera de rango no devuelve resultado", calcularART({ ingresoBase: ib, edad: 5, incapacidad: 10, enElTrabajo: true }) === null);
check("incapacidad 0 sin muerte no devuelve resultado", calcularART({ ingresoBase: ib, edad: 40, incapacidad: 0, enElTrabajo: true }) === null);
check("incapacidad mayor a 100 no devuelve resultado", calcularART({ ingresoBase: ib, edad: 40, incapacidad: 101, enElTrabajo: true }) === null);
check(
  "pero la muerte SÍ calcula con incapacidad cero",
  calcularART({ ingresoBase: ib, edad: 40, incapacidad: 0, enElTrabajo: true }, true) !== null,
);

// --- 9. El total es la suma de sus partes -------------------------------------------------------
for (const caso of [bajo, alto, parcial66, muerto, enTrabajo, muerteEnTrabajo]) {
  check(
    `el total cierra (${caso.tramo})`,
    Math.abs(caso.total - (caso.indemnizacion + caso.compensacion + caso.adicional20)) < 0.01,
    caso,
  );
}

if (fallas > 0) {
  console.error(`\n❌ ${fallas} check(s) fallaron`);
  process.exit(1);
}
console.log(
  `\n✅ Todos los checks de la indemnización por accidente de trabajo OK (Ley 24.557 · Dec. 1694/2009 · Ley 26.773 · ${VIGENCIA_ART.resolucion})`,
);
