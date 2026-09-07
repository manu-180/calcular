// Verificación de la deducción de alquiler en Ganancias (LIG arts. 85 inc. h/k y 26 inc. n).
// Correr con: npx tsx scripts/check_deduccion_alquiler.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El tope no se escribe: se deriva.** Tiene que ser idéntico, al centavo, a la ganancia no
//      imponible del art. 30 inc. a) que vive en data/ganancias.ts. Si alguien copia acá un número
//      "del año pasado", este check lo caza.
//   2. **El alquiler que agota el tope también se deriva.** Es el número que titula la página: si
//      alguna vez deja de ser tope / 40% / 12, el título miente sobre plata.
//   3. **Deducir no es cobrar.** El ahorro nunca puede superar la deducción × la alícuota máxima
//      (35%), y con alguien que no paga el impuesto tiene que ser exactamente cero.
//   4. **Ser titular de un inmueble bloquea el inc. h) por completo**, sin prorrateo: es la
//      condición "cualquiera sea la proporción" del texto vigente.
//   5. **El 10% del inc. k) está APAGADO por defecto.** Es el hallazgo de la página (art. 192 de la
//      Ley 27.802 sustituyó el art. 26 inc. n): si un refactor lo vuelve a prender solo, la página
//      pasa a publicar el régimen viejo, que es exactamente lo que hace el resto de la web.
//   6. **Las citas textuales siguen siendo las de la ley.** Se verifican por frases ancla.

import { DEDUCCIONES, ESCALA_GANANCIAS } from "../src/data/ganancias";
import {
  ALQUILER_FUENTES,
  ALQUILER_TEXTOS,
  PORCENTAJE_INC_H,
  PORCENTAJE_INC_K,
  PRIMER_EJERCICIO_EXENCION,
  TOPE_DEDUCCION_ALQUILER,
} from "../src/data/deduccion-alquiler";
import {
  alquilerMensualQueAgotaElTope,
  calcularDeduccionAlquiler,
} from "../src/lib/deduccion-alquiler";

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

const BASE = {
  alquilerMensual: 450_000,
  mesesPagados: 12,
  brutoMensual: 3_000_000,
  conyuge: false,
  hijos: 0,
  titularDeInmueble: false,
  computarDiezPorCiento: false,
};

// ===========================================================================
// 1 · El tope es la ganancia no imponible, derivada y no copiada
// ===========================================================================
check(
  "el tope anual es exactamente la ganancia no imponible del art. 30 inc. a)",
  TOPE_DEDUCCION_ALQUILER === DEDUCCIONES.mni,
  { tope: TOPE_DEDUCCION_ALQUILER, mni: DEDUCCIONES.mni },
);
check("el porcentaje del inc. h) es el 40% del texto legal", PORCENTAJE_INC_H === 0.4);
check("el porcentaje del inc. k) es el 10% del texto legal", PORCENTAJE_INC_K === 0.1);

const r = calcularDeduccionAlquiler(BASE);
check("el resultado expone ese mismo tope", r.tope === DEDUCCIONES.mni, r.tope);
check(
  "la deducción del inc. h) nunca supera el tope",
  r.deduccionIncH <= r.tope + 0.001,
  { aplicada: r.deduccionIncH, tope: r.tope },
);
check(
  "el 40% se calcula sobre lo efectivamente pagado en el año",
  casi(r.cuarentaPorCiento, BASE.alquilerMensual * 12 * 0.4),
  { calculado: r.cuarentaPorCiento },
);

// ===========================================================================
// 2 · El alquiler que agota el tope se deriva del tope, no se escribe
// ===========================================================================
const agota = alquilerMensualQueAgotaElTope();
check(
  "el alquiler mensual que agota el tope es tope / 40% / 12",
  casi(agota, TOPE_DEDUCCION_ALQUILER / 0.4 / 12),
  agota,
);
const justoEnElTope = calcularDeduccionAlquiler({ ...BASE, alquilerMensual: agota });
check(
  "con ese alquiler el 40% da exactamente el tope (sin excedente)",
  casi(justoEnElTope.cuarentaPorCiento, TOPE_DEDUCCION_ALQUILER, 1) &&
    justoEnElTope.excedente <= 1,
  { cuarenta: justoEnElTope.cuarentaPorCiento, excedente: justoEnElTope.excedente },
);
const unPesoMas = calcularDeduccionAlquiler({ ...BASE, alquilerMensual: agota * 1.1 });
check(
  "un 10% por encima de ese alquiler ya genera excedente perdido",
  unPesoMas.excedente > 0 && casi(unPesoMas.deduccionIncH, TOPE_DEDUCCION_ALQUILER, 1),
  { excedente: unPesoMas.excedente, aplicada: unPesoMas.deduccionIncH },
);

// ===========================================================================
// 3 · Deducir no es cobrar
// ===========================================================================
const alicuotaMaxima = ESCALA_GANANCIAS[ESCALA_GANANCIAS.length - 1].alicuota;
check(
  "el ahorro nunca supera la deducción × la alícuota máxima de la escala",
  r.ahorroAnual <= r.deduccionTotal * alicuotaMaxima + 0.01,
  { ahorro: r.ahorroAnual, techo: r.deduccionTotal * alicuotaMaxima },
);
check(
  "el ahorro es estrictamente menor que lo deducido (una deducción no es un reintegro)",
  r.ahorroAnual < r.deduccionTotal,
  { ahorro: r.ahorroAnual, deducido: r.deduccionTotal },
);
const noPaga = calcularDeduccionAlquiler({ ...BASE, brutoMensual: 1_500_000 });
check(
  "quien no paga Ganancias no recupera un peso",
  !noPaga.impuestoSin.pagaGanancias && noPaga.ahorroAnual === 0,
  { paga: noPaga.impuestoSin.pagaGanancias, ahorro: noPaga.ahorroAnual },
);
check(
  "y se lo avisa con un cartel bloqueante, no en letra chica",
  noPaga.avisos.some((a) => a.tono === "bloqueante"),
  noPaga.avisos.map((a) => a.tono),
);
check(
  "los meses de alquiler que vuelven son el ahorro dividido el alquiler mensual",
  casi(r.mesesDeAlquilerQueVuelven, r.ahorroAnual / BASE.alquilerMensual),
  r.mesesDeAlquilerQueVuelven,
);

// ===========================================================================
// 4 · Ser titular de un inmueble bloquea el inc. h), sin prorrateo
// ===========================================================================
const titular = calcularDeduccionAlquiler({ ...BASE, titularDeInmueble: true });
check(
  "ser titular de un inmueble anula la deducción del inc. h) por completo",
  titular.deduccionIncH === 0 && titular.ahorroAnual === 0,
  { deduccion: titular.deduccionIncH, ahorro: titular.ahorroAnual },
);
check(
  "y lo dice con un aviso bloqueante",
  titular.avisos.some((a) => a.tono === "bloqueante"),
);

// ===========================================================================
// 5 · El 10% del inc. k) está apagado por defecto (ejercicio 2026 en adelante)
// ===========================================================================
check("el primer ejercicio con la exención es 2026", PRIMER_EJERCICIO_EXENCION === 2026);
check(
  "por defecto NO se computa el 10% del inc. k)",
  r.deduccionIncK === 0 && !BASE.computarDiezPorCiento,
  r.deduccionIncK,
);
const con10 = calcularDeduccionAlquiler({ ...BASE, computarDiezPorCiento: true });
check(
  "al pedirlo, el 10% se calcula sobre el alquiler anual y sin tope propio",
  casi(con10.deduccionIncK, BASE.alquilerMensual * 12 * 0.1),
  con10.deduccionIncK,
);
check(
  "el régimen anterior deduce más que el vigente (por eso el cambio importa)",
  con10.deduccionTotal > r.deduccionTotal && con10.ahorroAnual >= r.ahorroAnual,
  { antes: con10.deduccionTotal, ahora: r.deduccionTotal },
);
check(
  "y se aclara con un aviso que ese régimen es el de hasta 2025",
  con10.avisos.some((a) => a.texto.includes("27.802")),
);

// ===========================================================================
// 6 · Las citas son las de la ley vigente y las fuentes están completas
// ===========================================================================
check(
  "la cita del inc. h) trae la condición «cualquiera sea la proporción»",
  ALQUILER_TEXTOS.incH.includes("cualquiera sea la proporción") &&
    ALQUILER_TEXTOS.incH.includes("CUARENTA POR CIENTO"),
);
check(
  "la cita del inc. k) trae el 10% y las dos partes",
  ALQUILER_TEXTOS.incK.includes("diez por ciento") &&
    ALQUILER_TEXTOS.incK.includes("locatario y locador"),
);
check(
  "la cita de la exención dice que al alquiler de casa habitación NO se le aplica el inc. k)",
  ALQUILER_TEXTOS.exencion.includes("no les resultará de aplicación") &&
    ALQUILER_TEXTOS.exencion.includes("inciso k)") &&
    ALQUILER_TEXTOS.exencion.includes("1° de enero de 2026"),
);
check(
  "están citadas la LIG (InfoLEG), la Ley 27.802 y ARCA",
  ALQUILER_FUENTES.lista.some((f) => f.url.includes("infoleg")) &&
    ALQUILER_FUENTES.lista.some((f) => f.nombre.includes("27.802")) &&
    ALQUILER_FUENTES.lista.some((f) => f.url.includes("afip.gob.ar")),
);

// ===========================================================================
// 7 · Monotonía y bordes
// ===========================================================================
let previa = -1;
let monotona = true;
for (const alq of [50_000, 200_000, 450_000, 900_000, 2_000_000]) {
  const x = calcularDeduccionAlquiler({ ...BASE, alquilerMensual: alq });
  if (x.deduccionIncH < previa - 0.01) monotona = false;
  previa = x.deduccionIncH;
}
check("la deducción crece (o se planta en el tope) al crecer el alquiler", monotona);

const medioAnio = calcularDeduccionAlquiler({ ...BASE, mesesPagados: 6 });
check(
  "el tope NO se prorratea por meses: lo que baja es lo pagado",
  medioAnio.tope === r.tope && casi(medioAnio.alquilerAnual, r.alquilerAnual / 2, 1),
  { tope: medioAnio.tope, anual: medioAnio.alquilerAnual },
);

const cero = calcularDeduccionAlquiler({ ...BASE, alquilerMensual: 0, mesesPagados: 0 });
check(
  "sin alquiler no hay deducción ni ahorro (y no divide por cero)",
  cero.deduccionTotal === 0 &&
    cero.ahorroAnual === 0 &&
    Number.isFinite(cero.mesesDeAlquilerQueVuelven),
  { deduccion: cero.deduccionTotal, meses: cero.mesesDeAlquilerQueVuelven },
);

console.log(fallas === 0 ? "\n✅ deducción de alquiler: todo OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
