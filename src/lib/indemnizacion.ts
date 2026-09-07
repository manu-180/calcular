import {
  ANIOS_LIMITE_PREAVISO,
  DIVISOR_DIA,
  MESES_FRACCION_ANIO,
  MESES_PERIODO_PRUEBA,
  PISO_TOPE,
} from "@/data/indemnizacion";
import { DIVISOR_VACACIONES } from "@/data/vacaciones";
import { diasPorAntiguedad } from "@/lib/vacaciones";

const DIA_MS = 86_400_000;

function parseISO(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

function ultimoDiaDelMes(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function diasEntreInclusive(desdeISO: string, hastaISO: string): number {
  const desde = Date.parse(`${desdeISO}T00:00:00Z`);
  const hasta = Date.parse(`${hastaISO}T00:00:00Z`);
  return Math.round((hasta - desde) / DIA_MS) + 1;
}

export type Antiguedad = {
  anios: number;
  meses: number; // meses sueltos (0-11)
  dias: number; // días sueltos
  totalMeses: number; // meses calendario completos entre ingreso y despido
};

// Antigüedad calendario entre la fecha de ingreso y la de despido. El "aniversario"
// mensual se clampea al largo del mes (ingresar un 31 cumple el mes el 28/2).
export function antiguedadEntre(ingresoISO: string, despidoISO: string): Antiguedad {
  const i = parseISO(ingresoISO);
  const f = parseISO(despidoISO);
  let meses = (f.y - i.y) * 12 + (f.m - i.m);
  let dias: number;
  const ancla = Math.min(i.d, ultimoDiaDelMes(f.y, f.m));
  if (f.d >= ancla) {
    dias = f.d - ancla;
  } else {
    meses -= 1;
    const yPrev = f.m === 1 ? f.y - 1 : f.y;
    const mPrev = f.m === 1 ? 12 : f.m - 1;
    const diasMesPrev = ultimoDiaDelMes(yPrev, mPrev);
    dias = f.d + diasMesPrev - Math.min(i.d, diasMesPrev);
  }
  return { anios: Math.floor(meses / 12), meses: meses % 12, dias, totalMeses: meses };
}

export type NucleoArt245 = {
  aniosComputables: number;
  baseAplicada: number;
  topeAplicado: boolean;
  /** Piso legal aun con tope de convenio desconocido: 67% de la remuneración real × años. */
  minimaConTope: number;
  monto: number;
};

/**
 * NÚCLEO del art. 245 (texto Ley 27.802): un mes de sueldo por año o fracción MAYOR de 3 meses,
 * sobre la mejor remuneración mensual normal y habitual, con el tope del convenio y su piso del 67%.
 *
 * Vive separado porque lo usan DOS páginas: /indemnizacion (despido sin causa) y
 * /indemnizacion-por-fallecimiento (art. 248 → art. 247 → la mitad de este número). Si cada una
 * calculara su propia base, calcular.ar podría publicar dos importes distintos para el mismo
 * sueldo y la misma antigüedad — que es exactamente la forma de perder el moat.
 */
export function nucleoArt245(params: {
  ant: Antiguedad;
  mejorRemuneracion: number;
  enPeriodoPrueba: boolean;
  topeCCT?: number;
}): NucleoArt245 {
  const { ant, mejorRemuneracion, enPeriodoPrueba, topeCCT } = params;

  // Fracción mayor de 3 meses: 3 meses justos NO suman; 3 meses y un día, sí.
  const fraccionSuma =
    ant.meses > MESES_FRACCION_ANIO || (ant.meses === MESES_FRACCION_ANIO && ant.dias > 0);
  const aniosComputables = enPeriodoPrueba ? 0 : Math.max(ant.anios + (fraccionSuma ? 1 : 0), 1);

  let baseAplicada = mejorRemuneracion;
  let topeAplicado = false;
  if (topeCCT !== undefined && topeCCT > 0 && topeCCT < mejorRemuneracion) {
    baseAplicada = Math.max(topeCCT, mejorRemuneracion * PISO_TOPE);
    topeAplicado = true;
  }

  return {
    aniosComputables,
    baseAplicada,
    topeAplicado,
    minimaConTope: enPeriodoPrueba ? 0 : mejorRemuneracion * PISO_TOPE * aniosComputables,
    // Mínimo legal: nunca menos de un mes calculado según el sistema del artículo.
    monto: enPeriodoPrueba ? 0 : Math.max(baseAplicada * aniosComputables, baseAplicada),
  };
}

export type ResultadoIndemnizacion = {
  antiguedad: Antiguedad;
  enPeriodoPrueba: boolean;
  // Art. 245
  aniosComputables: number;
  base: number;
  baseAplicada: number;
  topeAplicado: boolean;
  // Piso con tope desconocido: aun con tope de convenio, el 245 nunca baja de esto.
  indemnizacionMinimaConTope: number;
  indemnizacionAntiguedad: number;
  // Arts. 231-233 (null si hubo preaviso o está en período de prueba / fin de mes)
  preaviso: { meses: number; monto: number; sac: number } | null;
  integracion: { dias: number; monto: number; sac: number } | null;
  // Liquidación final (corresponde siempre, cualquiera sea la causa de egreso)
  sacProporcional: { dias: number; totalDiasSemestre: number; monto: number };
  vacaciones: { dias: number; monto: number; sac: number };
  totalIndemnizatorio: number;
  totalLiquidacionFinal: number;
  totalGeneral: number;
};

export function calcularIndemnizacion(params: {
  ingresoISO: string;
  despidoISO: string;
  mejorRemuneracion: number; // mejor remuneración mensual, normal y habitual (bruta)
  preavisoOtorgado: boolean;
  topeCCT?: number; // tope indemnizatorio del convenio (3× promedio CCT), si se conoce
  /**
   * Apaga el período de prueba del art. 92 bis. Existe porque ese artículo lo reserva, en su
   * primera oración, al "contrato de trabajo por tiempo INDETERMINADO": en un contrato a plazo
   * fijo (arts. 90 a 95) no hay período de prueba, y un despido en el mes 2 sí indemniza.
   * Lo usa /despido-plazo-fijo. Con el default (false) nada cambia para las páginas existentes.
   */
  sinPeriodoPrueba?: boolean;
}): ResultadoIndemnizacion | null {
  const {
    ingresoISO,
    despidoISO,
    mejorRemuneracion,
    preavisoOtorgado,
    topeCCT,
    sinPeriodoPrueba,
  } = params;
  if (!ingresoISO || !despidoISO || despidoISO <= ingresoISO || mejorRemuneracion <= 0) {
    return null;
  }

  const ant = antiguedadEntre(ingresoISO, despidoISO);
  const f = parseISO(despidoISO);

  // Art. 92 bis: durante los primeros 6 meses no hay indemnización por la extinción
  // (la calculadora asume el período de prueba legal; los CCT pueden ampliarlo).
  const enPeriodoPrueba = sinPeriodoPrueba ? false : ant.totalMeses < MESES_PERIODO_PRUEBA;

  // Art. 245 (núcleo compartido con /indemnizacion-por-fallecimiento).
  const base = mejorRemuneracion;
  const nucleo = nucleoArt245({ ant, mejorRemuneracion, enPeriodoPrueba, topeCCT });
  const { aniosComputables, baseAplicada, topeAplicado } = nucleo;
  const indemnizacionAntiguedad = nucleo.monto;
  const indemnizacionMinimaConTope = nucleo.minimaConTope;

  // Arts. 231/232: preaviso de 1 mes hasta 5 años de antigüedad, 2 meses si es superior.
  // El preaviso omitido se calcula con su SAC (la remuneración que habría devengado).
  let preaviso: ResultadoIndemnizacion["preaviso"] = null;
  let integracion: ResultadoIndemnizacion["integracion"] = null;
  if (!enPeriodoPrueba && !preavisoOtorgado) {
    const superaCincoAnios =
      ant.totalMeses > ANIOS_LIMITE_PREAVISO * 12 ||
      (ant.totalMeses === ANIOS_LIMITE_PREAVISO * 12 && ant.dias > 0);
    const mesesPreaviso = superaCincoAnios ? 2 : 1;
    const montoPreaviso = mejorRemuneracion * mesesPreaviso;
    preaviso = { meses: mesesPreaviso, monto: montoPreaviso, sac: montoPreaviso / 12 };

    // Art. 233: si el despido sin preaviso no cae el último día del mes, se integran
    // los días faltantes hasta fin de mes.
    const diasFaltantes = ultimoDiaDelMes(f.y, f.m) - f.d;
    if (diasFaltantes > 0) {
      const montoIntegracion = (mejorRemuneracion / DIVISOR_DIA) * diasFaltantes;
      integracion = {
        dias: diasFaltantes,
        monto: montoIntegracion,
        sac: montoIntegracion / 12,
      };
    }
  }

  // Art. 123: SAC proporcional = la parte del semestre en curso efectivamente trabajada.
  const inicioSemestre = f.m <= 6 ? `${f.y}-01-01` : `${f.y}-07-01`;
  const finSemestre = f.m <= 6 ? `${f.y}-06-30` : `${f.y}-12-31`;
  const desdeSemestre = ingresoISO > inicioSemestre ? ingresoISO : inicioSemestre;
  const diasSemestre = diasEntreInclusive(desdeSemestre, despidoISO);
  const totalDiasSemestre = diasEntreInclusive(inicioSemestre, finSemestre);
  const sacProporcional = {
    dias: diasSemestre,
    totalDiasSemestre,
    monto: (mejorRemuneracion / 2) * (diasSemestre / totalDiasSemestre),
  };

  // Art. 156: vacaciones proporcionales a la fracción del año trabajada, pagadas a
  // sueldo ÷ 25 (art. 155). Práctica uniforme: días de la escala × días trabajados / 365.
  const inicioAnio = `${f.y}-01-01`;
  const desdeAnio = ingresoISO > inicioAnio ? ingresoISO : inicioAnio;
  const diasTrabajadosAnio = diasEntreInclusive(desdeAnio, despidoISO);
  const diasVacaciones = diasPorAntiguedad(ingresoISO, f.y) * (diasTrabajadosAnio / 365);
  const montoVacaciones = diasVacaciones * (mejorRemuneracion / DIVISOR_VACACIONES);
  const vacaciones = {
    dias: diasVacaciones,
    monto: montoVacaciones,
    sac: montoVacaciones / 12,
  };

  const totalIndemnizatorio =
    indemnizacionAntiguedad +
    (preaviso ? preaviso.monto + preaviso.sac : 0) +
    (integracion ? integracion.monto + integracion.sac : 0);
  const totalLiquidacionFinal = sacProporcional.monto + vacaciones.monto + vacaciones.sac;

  return {
    antiguedad: ant,
    enPeriodoPrueba,
    aniosComputables,
    base,
    baseAplicada,
    topeAplicado,
    indemnizacionMinimaConTope,
    indemnizacionAntiguedad,
    preaviso,
    integracion,
    sacProporcional,
    vacaciones,
    totalIndemnizatorio,
    totalLiquidacionFinal,
    totalGeneral: totalIndemnizatorio + totalLiquidacionFinal,
  };
}
