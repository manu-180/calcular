// Motor de la deducción del alquiler de la casa habitación en Ganancias. Funciones puras.
//
// LO QUE ESTA CALCULADORA RESUELVE Y NINGUNA OTRA:
//   1. **Cuánto te vuelve de verdad.** Una deducción no devuelve lo deducido: devuelve lo deducido
//      × tu alícuota marginal. Acá se corre el impuesto DOS veces —con y sin la deducción— con el
//      mismo motor de /ganancias, en vez de estimar un porcentaje.
//   2. **Cuántos meses de alquiler cubre ese ahorro.** Es la unidad en la que el inquilino piensa,
//      y ninguna nota la da.
//   3. **El tope casi nunca muerde.** El 40% se topea en la ganancia no imponible ANUAL: hace
//      falta un alquiler enorme para llegar. `alquilerMensualQueAgotaElTope()` lo deriva en vez de
//      afirmarlo, así que el número se mueve solo cuando rota la tabla de Ganancias.
//   4. **El 10% del inc. k) dejó de correr sobre la casa habitación en el ejercicio 2026.** El
//      art. 192 de la Ley 27.802 sustituyó el art. 26 inc. n): esas ganancias quedaron exentas y
//      "no les resultará de aplicación lo previsto en el inciso k) del artículo 85". El motor lo
//      deja apagado por defecto y permite encenderlo sólo para ver el régimen anterior.

import { estimarGananciasAnual, type EstimacionGanancias } from "./ganancias";
import {
  PORCENTAJE_INC_H,
  PORCENTAJE_INC_K,
  TOPE_DEDUCCION_ALQUILER,
} from "@/data/deduccion-alquiler";

export type EntradaAlquiler = {
  /** Alquiler mensual efectivamente pagado por la casa habitación. */
  alquilerMensual: number;
  /** Meses del año fiscal en que se pagó alquiler (1 a 12). */
  mesesPagados: number;
  /** Sueldo bruto mensual del inquilino: define su alícuota, o sea cuánto le vuelve. */
  brutoMensual: number;
  conyuge: boolean;
  hijos: number;
  /** El inc. h) exige NO ser titular de ningún inmueble, cualquiera sea la proporción. */
  titularDeInmueble: boolean;
  /**
   * Computar además el 10% del inc. k). Por defecto false: desde el ejercicio 2026 la exención del
   * art. 26 inc. n) lo desactiva sobre el alquiler de casa habitación. Se enciende sólo para
   * mostrar el régimen vigente hasta 2025.
   */
  computarDiezPorCiento: boolean;
};

export type AvisoAlquiler = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoAlquiler = {
  /** Lo pagado de alquiler en el año fiscal. */
  alquilerAnual: number;
  /** El 40% del art. 85 inc. h), antes del tope. */
  cuarentaPorCiento: number;
  tope: number;
  /** Lo que efectivamente se computa por el inc. h) = min(40%, tope); 0 si es titular de inmueble. */
  deduccionIncH: number;
  /** Lo que pasa del tope y se pierde. */
  excedente: number;
  /** El 10% del inc. k), sólo si se pidió computarlo (régimen hasta 2025). */
  deduccionIncK: number;
  deduccionTotal: number;
  /** Impuesto anual del inquilino sin computar la deducción. */
  impuestoSin: EstimacionGanancias;
  /** El mismo, computándola. */
  impuestoCon: EstimacionGanancias;
  /** Plata que deja de pagar de Ganancias en el año. */
  ahorroAnual: number;
  ahorroMensual: number;
  /** Ahorro / deducción computada: la alícuota que efectivamente devuelve el beneficio. */
  alicuotaEfectiva: number;
  /** Ahorro / alquiler anual: qué porción del alquiler termina cubriendo el Estado. */
  porcionDelAlquiler: number;
  /** El ahorro anual medido en meses de alquiler. */
  mesesDeAlquilerQueVuelven: number;
  avisos: AvisoAlquiler[];
};

/**
 * Alquiler MENSUAL a partir del cual el 40% agota el tope anual del inc. h).
 * Se deriva del tope vigente: tope / 40% / 12. No se escribe a mano.
 */
export function alquilerMensualQueAgotaElTope(tope = TOPE_DEDUCCION_ALQUILER): number {
  return tope / PORCENTAJE_INC_H / 12;
}

export function calcularDeduccionAlquiler(e: EntradaAlquiler): ResultadoAlquiler {
  const meses = Math.min(12, Math.max(0, Math.round(e.mesesPagados)));
  const alquiler = Math.max(0, e.alquilerMensual);
  const alquilerAnual = alquiler * meses;

  const cuarentaPorCiento = alquilerAnual * PORCENTAJE_INC_H;
  const tope = TOPE_DEDUCCION_ALQUILER;
  const deduccionIncH = e.titularDeInmueble ? 0 : Math.min(cuarentaPorCiento, tope);
  const excedente = e.titularDeInmueble ? 0 : Math.max(0, cuarentaPorCiento - tope);

  // El inc. k) no tiene tope propio ("sin límite anual", dice ARCA) y no exige no ser propietario:
  // es una deducción sobre el monto del alquiler, no sobre la condición del inquilino.
  const deduccionIncK = e.computarDiezPorCiento ? alquilerAnual * PORCENTAJE_INC_K : 0;

  const deduccionTotal = deduccionIncH + deduccionIncK;

  const base = {
    brutoMensual: Math.max(0, e.brutoMensual),
    conyuge: e.conyuge,
    hijos: Math.max(0, Math.floor(e.hijos)),
  };
  const impuestoSin = estimarGananciasAnual(base);
  const impuestoCon = estimarGananciasAnual({ ...base, otrasDeduccionesAnual: deduccionTotal });

  const ahorroAnual = Math.max(0, impuestoSin.impuestoAnual - impuestoCon.impuestoAnual);
  const alicuotaEfectiva = deduccionTotal > 0 ? ahorroAnual / deduccionTotal : 0;
  const porcionDelAlquiler = alquilerAnual > 0 ? ahorroAnual / alquilerAnual : 0;
  const mesesDeAlquilerQueVuelven = alquiler > 0 ? ahorroAnual / alquiler : 0;

  const avisos: AvisoAlquiler[] = [];

  if (e.titularDeInmueble) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Si sos titular de algún inmueble —aunque sea una fracción heredada, en otra provincia o sin usar— el 40% del inciso h) no corre: la ley lo condiciona a no resultar titular de ningún inmueble, «cualquiera sea la proporción». No hay prorrateo ni excepción por no vivir ahí.",
    });
  }

  if (!impuestoSin.pagaGanancias) {
    avisos.push({
      tono: "bloqueante",
      texto:
        "Con ese sueldo no llegás a pagar Ganancias, así que la deducción no te devuelve nada: descuenta base de un impuesto que no estás pagando. No es un reintegro, no genera saldo a favor y no se traslada al año siguiente.",
    });
  } else if (deduccionTotal > 0 && impuestoCon.impuestoAnual === 0) {
    avisos.push({
      tono: "ok",
      texto:
        "Con esta deducción dejás de pagar Ganancias por completo en el año. Ojo: el ahorro que ves es todo el impuesto que te quedaba, no el monto deducido.",
    });
  }

  if (excedente > 0) {
    avisos.push({
      tono: "atencion",
      texto:
        "El 40% de lo que pagaste supera el tope anual: el excedente no se deduce, no se traslada al año siguiente y no lo puede computar otra persona por el mismo contrato.",
    });
  }

  if (e.computarDiezPorCiento) {
    avisos.push({
      tono: "atencion",
      texto:
        "Estás viendo el régimen anterior. El 10% del inciso k) del art. 85 dejó de aplicarse sobre el alquiler de la casa habitación en los ejercicios que se inician desde el 1/1/2026: el art. 192 de la Ley 27.802 sustituyó el inciso n) del art. 26, dejó esas ganancias exentas y dijo, con todas las letras, que a ellas no les resulta de aplicación el inciso k). Sirve para la declaración de 2025; no para lo que te retienen este año.",
    });
  }

  if (alquilerAnual > 0 && !e.titularDeInmueble) {
    avisos.push({
      tono: "ok",
      texto:
        "Para computarla necesitás que el locador emita factura o documento equivalente por el alquiler y conservar los comprobantes de pago; se informa por el F. 572 web (SIRADIG). Desde la RG 5547/2024 ya no hay que adjuntar copia del contrato.",
    });
  }

  return {
    alquilerAnual,
    cuarentaPorCiento,
    tope,
    deduccionIncH,
    excedente,
    deduccionIncK,
    deduccionTotal,
    impuestoSin,
    impuestoCon,
    ahorroAnual,
    ahorroMensual: ahorroAnual / 12,
    alicuotaEfectiva,
    porcionDelAlquiler,
    mesesDeAlquilerQueVuelven,
    avisos,
  };
}
