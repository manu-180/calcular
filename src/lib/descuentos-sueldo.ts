import { SMVM_SERIE, SMVM_ULTIMO } from "@/data/desempleo";
import { smvmVigente } from "@/lib/desempleo";
import { APORTES, TOTAL_APORTES } from "@/data/sueldo";
import {
  EMBARGO_ESCALON_SMVM,
  EMBARGO_PISO_SMVM,
  EMBARGO_TRAMO_1,
  EMBARGO_TRAMO_2,
  TOPE_CAMARAS_EMPRESARIAS,
  TOPE_CUOTA_SOLIDARIA,
  TOPE_GENERAL,
} from "@/data/descuentos-sueldo";

// Cuánto te pueden descontar del sueldo (art. 133 LCT) y cuánto te pueden embargar
// (Decreto 484/87), con el texto vigente desde el 6/3/2026.
//
// DOS CUENTAS DISTINTAS QUE LA WEB MEZCLA:
//
//   · **Retenciones** (arts. 131 a 134 LCT): lo que el EMPLEADOR descuenta del recibo. Tope del
//     20% del total de la remuneración en dinero. Se calcula sobre la remuneración del mes.
//   · **Embargo** (arts. 120 y 147 LCT + Dec. 484/87): lo que se retiene por orden JUDICIAL.
//     No tiene monto propio: cuelga del SMVM. Y su art. 2º manda tomar el importe **bruto**.
//
// LA AMBIGÜEDAD REAL DEL DECRETO 484/87, QUE NO SE TAPA. El inciso 1 del art. 1º dice «hasta el
// diez por ciento (10%) del importe que excediere de este último» (el SMVM). El inciso 2 dice
// solamente «hasta el veinte por ciento (20%)»: **no repite la base**. Se puede leer de dos
// maneras —20% del excedente del SMVM, o 20% del total— y el decreto no lo aclara. La lectura
// habitual es la primera, porque el piso inembargable del primer párrafo rige para todo el
// artículo; pero publicar un solo número acá sería inventar precisión que la norma no tiene. Se
// devuelven las dos, con la primera como principal.
//
// LO QUE NO SE CALCULA A PROPÓSITO: la cuota alimentaria. El art. 4º del decreto excluye
// expresamente a los alimentos y las litis expensas de estos límites, y manda fijarlos «de modo
// que permitan la subsistencia del alimentante»: es una decisión del juez, no un porcentaje.

export type Aviso = { tono: "ok" | "atencion" | "bloqueante"; texto: string };

export type ResultadoDescuentos = {
  /** Remuneración mensual en dinero, bruta, tal como se cargó. */
  bruto: number;
  /** SMVM mensual aplicado y el período del que sale. */
  smvm: number;
  smvmPeriodo: string;
  /** Art. 133 LCT: tope general de retenciones, en pesos. */
  topeGeneral: number;
  /** Art. 9º Ley 14.250 (texto del art. 133 de la 27.802): tope de la cuota solidaria, en pesos. */
  topeCuotaSolidaria: number;
  /** Mismo artículo: tope de los aportes a cámaras empresarias, en pesos. */
  topeCamaras: number;
  /** Aportes de ley del trabajador (11% + 3% + 3%), en pesos y en puntos porcentuales. */
  aportesDeLey: { jubilacion: number; pami: number; obraSocial: number; total: number };
  /** Lo que queda del 20% después de los aportes de ley. Negativo = el 17% ya lo consume casi todo. */
  margenSobreTope: number;
  /** Neto aproximado después de los aportes de ley (sin Ganancias). */
  netoAproximado: number;
  embargo: {
    /** Tramo del Dec. 484/87 que aplica: 0 = inembargable, 1 = 10%, 2 = 20%. */
    tramo: 0 | 1 | 2;
    /** Porción inembargable en pesos (un SMVM, o todo si el sueldo no lo supera). */
    inembargable: number;
    /** Excedente del SMVM sobre el que se calcula el porcentaje. */
    excedente: number;
    /** Lectura principal: el porcentaje del tramo aplicado sobre el excedente del SMVM. */
    maximoSobreExcedente: number;
    /** Lectura alternativa del inc. 2 (no repite la base): el 20% del total. Sólo en tramo 2. */
    maximoSobreTotal: number | null;
    /** Porcentaje del tramo, como fracción. */
    porcentaje: number;
  };
  /** Art. 3º del Dec. 484/87: embargo sobre la liquidación final (10% o 20% del importe). */
  embargoIndemnizacion: { porcentaje: number; maximo: number };
  avisos: Aviso[];
};

/** Redondeo a dos decimales, para que la suma de renglones cierre con el total mostrado. */
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * SMVM vigente para un período AAAA-MM. Si el mes pedido es posterior al último con norma, se
 * usa el último dictado: la escala NO se proyecta hacia adelante (regla del guardián de datos).
 *
 * ⚠️ SIN PERÍODO DEVUELVE EL MES VIGENTE, NO EL ÚLTIMO DE LA ESCALA (corregido el 2/9/2026): la
 * Res. 4/2026 fijó el SMVM hasta abril de 2027, así que desde hoy "el último mes con norma" es un
 * mes del futuro. Cualquier cosa que quiera decir "hoy" tiene que preguntar por la fecha.
 */
export function smvmDe(periodo?: string): { mensual: number; periodo: string; proyectado: boolean } {
  if (!periodo) {
    const hoy = smvmVigente().mes;
    return { mensual: hoy.mensual, periodo: hoy.periodo, proyectado: false };
  }
  const exacto = SMVM_SERIE.find((m) => m.periodo === periodo);
  if (exacto) return { mensual: exacto.mensual, periodo: exacto.periodo, proyectado: false };
  const anteriores = SMVM_SERIE.filter((m) => m.periodo < periodo);
  if (anteriores.length === 0) {
    const primero = SMVM_SERIE[0];
    return { mensual: primero.mensual, periodo: primero.periodo, proyectado: true };
  }
  const ultimo = anteriores[anteriores.length - 1];
  return { mensual: ultimo.mensual, periodo: ultimo.periodo, proyectado: ultimo.periodo !== periodo };
}

export function calcularDescuentos(params: {
  /** Remuneración mensual en dinero, BRUTA (art. 2º del Dec. 484/87). */
  bruto: number;
  /** Período AAAA-MM del que se toma el SMVM. Por defecto, el último con norma. */
  periodo?: string;
}): ResultadoDescuentos {
  const bruto = Math.max(0, params.bruto || 0);
  const { mensual: smvm, periodo: smvmPeriodo, proyectado } = smvmDe(params.periodo);

  const aportesDeLey = {
    jubilacion: r2(bruto * APORTES.jubilacion),
    pami: r2(bruto * APORTES.pami),
    obraSocial: r2(bruto * APORTES.obraSocial),
    total: r2(bruto * TOTAL_APORTES),
  };

  const topeGeneral = r2(bruto * TOPE_GENERAL);
  const margenSobreTope = r2(topeGeneral - aportesDeLey.total);

  // Embargo: Dec. 484/87 art. 1º. El piso inembargable es un SMVM; el escalón, el doble.
  const piso = smvm * EMBARGO_PISO_SMVM;
  const escalon = smvm * EMBARGO_ESCALON_SMVM;
  const excedente = Math.max(0, bruto - piso);

  let tramo: 0 | 1 | 2 = 0;
  if (bruto > escalon) tramo = 2;
  else if (bruto > piso) tramo = 1;

  const porcentaje = tramo === 2 ? EMBARGO_TRAMO_2 : tramo === 1 ? EMBARGO_TRAMO_1 : 0;

  const embargo = {
    tramo,
    inembargable: r2(Math.min(bruto, piso)),
    excedente: r2(excedente),
    maximoSobreExcedente: r2(excedente * porcentaje),
    maximoSobreTotal: tramo === 2 ? r2(bruto * EMBARGO_TRAMO_2) : null,
    porcentaje,
  };

  // Art. 3º: sobre las indemnizaciones el porcentaje se aplica al IMPORTE, no al excedente, y
  // el escalón es el mismo doble del SMVM.
  const porcentajeIndemnizacion = bruto > escalon ? EMBARGO_TRAMO_2 : EMBARGO_TRAMO_1;

  const avisos: Aviso[] = [];

  if (proyectado) {
    avisos.push({
      tono: "atencion",
      texto: `Para el período que elegiste todavía no hay resolución del SMVM: se aplica el último dictado, el de ${smvmPeriodo}. Los importes de embargo se recalculan solos cuando salga la nueva escala.`,
    });
  }

  if (tramo === 0) {
    avisos.push({
      tono: "ok",
      texto: `Tu remuneración bruta no supera el salario mínimo vital de ${smvmPeriodo}: por el art. 1º del Decreto 484/87 es enteramente inembargable, salvo por deudas alimentarias.`,
    });
  }

  if (margenSobreTope < 0) {
    avisos.push({
      tono: "atencion",
      texto: "Los aportes de ley (17%) ya se llevan casi todo el 20% del art. 133: leído al pie de la letra, el artículo no los excluye del tope. Ver abajo el detalle de las dos lecturas.",
    });
  }

  avisos.push({
    tono: "atencion",
    texto: "La retención de Ganancias puede hacer que te descuenten MÁS del 20%: el art. 1º de la Resolución MTEySS 436/2004 lo permite expresamente, y sin tope.",
  });

  avisos.push({
    tono: "bloqueante",
    texto: "Los límites de embargo no rigen para la cuota alimentaria ni las litis expensas (art. 4º del Decreto 484/87): esas las fija el juez, con el único piso de permitir la subsistencia del alimentante.",
  });

  return {
    bruto,
    smvm,
    smvmPeriodo,
    topeGeneral,
    topeCuotaSolidaria: r2(bruto * TOPE_CUOTA_SOLIDARIA),
    topeCamaras: r2(bruto * TOPE_CAMARAS_EMPRESARIAS),
    aportesDeLey,
    margenSobreTope,
    netoAproximado: r2(bruto - aportesDeLey.total),
    embargo,
    embargoIndemnizacion: {
      porcentaje: porcentajeIndemnizacion,
      maximo: r2(bruto * porcentajeIndemnizacion),
    },
    avisos,
  };
}
