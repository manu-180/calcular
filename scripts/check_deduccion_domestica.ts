// Verificación de la deducción de casas particulares en Ganancias (Ley 26.063 art. 16).
// Correr con: npx tsx scripts/check_deduccion_domestica.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **El tope no se escribe: se deriva.** Tiene que ser idéntico, al centavo, a la ganancia no
//      imponible del art. 30 inc. a) que ya vive en data/ganancias.ts. Si alguien alguna vez copia
//      un número "del año pasado" acá, este check lo caza.
//   2. **Deducir no es cobrar.** El ahorro nunca puede ser mayor que la deducción × la alícuota
//      máxima de la escala (35%), y con un contribuyente que no paga el impuesto tiene que ser
//      exactamente cero. Es la afirmación central de la página: si el motor se rompe y devuelve el
//      monto deducido como "ahorro", la página miente sobre plata.
//   3. **La ART queda afuera del cómputo.** El art. 16 inc. b) remite al art. 3º del régimen
//      especial (SIPA + salud) y la ART nace de otra norma. El computable tiene que ser exactamente
//      remuneración + (obra social + SIPA) × meses, sin un peso de ART.
//   4. **El tope no se prorratea** por meses trabajados: lo que baja es lo pagado, no el límite.

import { DEDUCCIONES } from "../src/data/ganancias";
import { TOPE_DEDUCCION_ANUAL } from "../src/data/deduccion-domestica";
import { TABLA_APORTES } from "../src/data/aportes-casas-particulares";
import { calcularDeduccionDomestica } from "../src/lib/deduccion-domestica";
import { estimarGananciasAnual } from "../src/lib/ganancias";

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
  sueldoMensual: 450_000,
  mesesTrabajados: 12,
  incluirAguinaldo: true,
  horasSemanales: 16,
  condicion: "activo-mayor-18" as const,
  brutoMensualEmpleador: 3_500_000,
  conyuge: false,
  hijos: 0,
};

// ===========================================================================
// 1 · El tope es la ganancia no imponible, derivada y no copiada
// ===========================================================================
check(
  "el tope anual es exactamente la ganancia no imponible del art. 30 inc. a)",
  TOPE_DEDUCCION_ANUAL === DEDUCCIONES.mni,
  { tope: TOPE_DEDUCCION_ANUAL, mni: DEDUCCIONES.mni },
);

const r = calcularDeduccionDomestica(BASE);
check("el resultado expone ese mismo tope", r.tope === DEDUCCIONES.mni, r.tope);
check(
  "la deducción aplicada nunca supera el tope",
  r.deduccionAplicada <= r.tope + 0.001,
  { aplicada: r.deduccionAplicada, tope: r.tope },
);

// ===========================================================================
// 2 · Composición del importe computable: remuneración + contribuciones, sin ART
// ===========================================================================
const fila = TABLA_APORTES["activo-mayor-18"].find((f) => f.rango === "16-o-mas")!;
const remuEsperada = 450_000 * 12 + 450_000; // 12 sueldos + SAC del año completo
const contribEsperadas = (fila.obraSocial! + fila.sipa!) * 12;

check("la remuneración anual incluye los 12 sueldos y el aguinaldo", casi(r.remuneracionAnual, remuEsperada), {
  esperado: remuEsperada,
  obtenido: r.remuneracionAnual,
});
check("las contribuciones son obra social + SIPA de la fila que corresponde", casi(r.contribucionesAnual, contribEsperadas), {
  esperado: contribEsperadas,
  obtenido: r.contribucionesAnual,
});
check("el computable es remuneración + contribuciones, sin un peso de ART", casi(r.computable, remuEsperada + contribEsperadas), {
  computable: r.computable,
  art: r.artAnual,
});
check("la ART del año se informa aparte y es la de la tabla oficial", casi(r.artAnual, fila.art * 12), {
  esperado: fila.art * 12,
  obtenido: r.artAnual,
});
check("con este sueldo el pago del año ya supera el tope (el excedente se pierde)", r.excedente > 0, r.excedente);

// ===========================================================================
// 3 · Deducir no es cobrar
// ===========================================================================
check(
  "el ahorro nunca supera la deducción × la alícuota máxima de la escala (35%)",
  r.ahorroAnual <= r.deduccionAplicada * 0.35 + 0.01,
  { ahorro: r.ahorroAnual, techo: r.deduccionAplicada * 0.35 },
);
check("el ahorro es estrictamente menor que lo deducido", r.ahorroAnual < r.deduccionAplicada, {
  ahorro: r.ahorroAnual,
  deducido: r.deduccionAplicada,
});
check("la alícuota efectiva coincide con ahorro / deducción", casi(r.alicuotaEfectiva, r.ahorroAnual / r.deduccionAplicada, 1e-9));
check("el ahorro mensual es el anual dividido 12", casi(r.ahorroMensual, r.ahorroAnual / 12));

// El ahorro tiene que ser exactamente la diferencia entre las dos liquidaciones del motor de Ganancias.
const sinDed = estimarGananciasAnual({ brutoMensual: 3_500_000, conyuge: false, hijos: 0 });
const conDed = estimarGananciasAnual({
  brutoMensual: 3_500_000,
  conyuge: false,
  hijos: 0,
  otrasDeduccionesAnual: r.deduccionAplicada,
});
check(
  "el ahorro es la diferencia real entre liquidar con y sin la deducción",
  casi(r.ahorroAnual, sinDed.impuestoAnual - conDed.impuestoAnual),
  { ahorro: r.ahorroAnual, diferencia: sinDed.impuestoAnual - conDed.impuestoAnual },
);

// ===========================================================================
// 4 · Quien no paga Ganancias no recupera nada
// ===========================================================================
const noPaga = calcularDeduccionDomestica({ ...BASE, brutoMensualEmpleador: 1_500_000 });
check("un empleador que no llega a pagar el impuesto tiene ahorro cero", noPaga.ahorroAnual === 0, {
  impuestoSin: noPaga.impuestoSin.impuestoAnual,
  ahorro: noPaga.ahorroAnual,
});
check(
  "y la página lo dice con un aviso bloqueante, no en letra chica",
  noPaga.avisos.some((a) => a.tono === "bloqueante"),
  noPaga.avisos,
);

// ===========================================================================
// 5 · El tope no se prorratea; lo que baja es lo pagado
// ===========================================================================
const medioAnio = calcularDeduccionDomestica({ ...BASE, mesesTrabajados: 6 });
check("con medio año trabajado el tope sigue siendo el anual", medioAnio.tope === r.tope);
check("pero lo computable baja", medioAnio.computable < r.computable, {
  seis: medioAnio.computable,
  doce: r.computable,
});
check(
  "y la deducción de medio año es la mitad de lo pagado en el año completo (misma proporción)",
  casi(medioAnio.computable, r.computable / 2, 1),
  { seis: medioAnio.computable, mitad: r.computable / 2 },
);

// ===========================================================================
// 6 · Monotonía: más sueldo pagado nunca deduce menos
// ===========================================================================
let previa = -1;
let monotona = true;
for (const sueldo of [50_000, 120_000, 250_000, 400_000, 900_000]) {
  const x = calcularDeduccionDomestica({ ...BASE, sueldoMensual: sueldo });
  if (x.deduccionAplicada < previa - 0.01) monotona = false;
  previa = x.deduccionAplicada;
}
check("la deducción crece (o se planta en el tope) al crecer el sueldo pagado", monotona);

// Caso borde: sin relación laboral no hay nada que deducir ni que avisar como ahorro.
const cero = calcularDeduccionDomestica({ ...BASE, sueldoMensual: 0, mesesTrabajados: 0 });
check("sin meses ni sueldo, la deducción y el ahorro son cero", cero.deduccionAplicada === 0 && cero.ahorroAnual === 0, {
  deduccion: cero.deduccionAplicada,
  ahorro: cero.ahorroAnual,
});

console.log(fallas === 0 ? "\n✅ deducción de casas particulares: todo OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
