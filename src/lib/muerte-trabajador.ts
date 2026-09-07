// Motor del art. 248 LCT (muerte del trabajador), texto de la Ley 27.802.
//
// La plata sale de una cadena de tres artículos: 248 → 247 → 245. Acá NO se recalcula el 245:
// se llama al núcleo compartido de lib/indemnizacion.ts, para que la base y los años computables
// sean exactamente los mismos que publica /indemnizacion. La parte propia de esta página son dos
// cosas que ninguna calculadora publica: el 50% del 247 y el reparto del 248 entre beneficiarios.

import { DIVISOR_VACACIONES } from "@/data/vacaciones";
import { PROPORCION_ART_247 } from "@/data/muerte-trabajador";
import { MESES_PERIODO_PRUEBA } from "@/data/indemnizacion";
import { antiguedadEntre, nucleoArt245, type Antiguedad } from "@/lib/indemnizacion";
import { diasPorAntiguedad } from "@/lib/vacaciones";

const DIA_MS = 86_400_000;

function diasEntreInclusive(desdeISO: string, hastaISO: string): number {
  const desde = Date.parse(`${desdeISO}T00:00:00Z`);
  const hasta = Date.parse(`${hastaISO}T00:00:00Z`);
  return Math.round((hasta - desde) / DIA_MS) + 1;
}

/** Composición familiar tal como la enumera el art. 248 vigente. */
export type Familia = {
  /** Inciso a: cónyuge o conviviente. Es uno solo o ninguno. */
  conyugeOConviviente: boolean;
  /** Inciso b: hijos menores de edad. */
  hijosMenores: number;
  /** Inciso c: hijos mayores con Certificado Único de Discapacidad. */
  hijosMayoresConCUD: number;
  /** Subsidiario 1: hijos mayores sin CUD. */
  hijosMayores: number;
  /** Subsidiario 2: padres que estuvieran A CARGO al momento del fallecimiento. */
  padresACargo: number;
};

export type Beneficiarios = {
  /** Cuántos titulares cobran (cada uno cuenta como uno). */
  titulares: number;
  /** Qué grupo del artículo resultó llamado. */
  grupo: "primer-grupo" | "hijos-mayores" | "padres-a-cargo" | "sin-beneficiarios";
  /** Detalle legible de quiénes componen ese grupo. */
  detalle: { concepto: string; cantidad: number }[];
  /** Quiénes quedan fuera por no haber sido llamados (transparencia: es la duda #1). */
  desplazados: { concepto: string; cantidad: number }[];
};

/**
 * Quién cobra, según el orden del art. 248 vigente.
 *
 * Primer grupo (concurren entre sí): cónyuge o conviviente + hijos menores + hijos mayores con CUD.
 * Si NO hay ninguno de esos tres → los hijos mayores de edad.
 * Si tampoco hay → los padres que estuvieran a cargo al momento del fallecimiento.
 *
 * Los grupos son EXCLUYENTES: el texto llama a los subsidiarios sólo «ante la falta de los
 * beneficiarios» anteriores. Un hijo mayor sin CUD no concurre con el cónyuge.
 */
export function repartirBeneficiarios(f: Familia): Beneficiarios {
  const conyuge = f.conyugeOConviviente ? 1 : 0;
  const menores = Math.max(0, Math.trunc(f.hijosMenores));
  const conCUD = Math.max(0, Math.trunc(f.hijosMayoresConCUD));
  const mayores = Math.max(0, Math.trunc(f.hijosMayores));
  const padres = Math.max(0, Math.trunc(f.padresACargo));

  const primerGrupo = conyuge + menores + conCUD;
  if (primerGrupo > 0) {
    return {
      titulares: primerGrupo,
      grupo: "primer-grupo",
      detalle: [
        { concepto: "Cónyuge o conviviente", cantidad: conyuge },
        { concepto: "Hijos menores de edad", cantidad: menores },
        { concepto: "Hijos mayores con CUD", cantidad: conCUD },
      ].filter((d) => d.cantidad > 0),
      desplazados: [
        { concepto: "Hijos mayores de edad sin CUD", cantidad: mayores },
        { concepto: "Padres a cargo", cantidad: padres },
      ].filter((d) => d.cantidad > 0),
    };
  }
  if (mayores > 0) {
    return {
      titulares: mayores,
      grupo: "hijos-mayores",
      detalle: [{ concepto: "Hijos mayores de edad", cantidad: mayores }],
      desplazados: [{ concepto: "Padres a cargo", cantidad: padres }].filter((d) => d.cantidad > 0),
    };
  }
  if (padres > 0) {
    return {
      titulares: padres,
      grupo: "padres-a-cargo",
      detalle: [{ concepto: "Padres a cargo del causante", cantidad: padres }],
      desplazados: [],
    };
  }
  return { titulares: 0, grupo: "sin-beneficiarios", detalle: [], desplazados: [] };
}

export type ResultadoMuerte = {
  antiguedad: Antiguedad;
  enPeriodoPrueba: boolean;
  aniosComputables: number;
  base: number;
  baseAplicada: number;
  topeAplicado: boolean;
  /** Lo que habría sido un despido sin causa (art. 245). Referencia: NO es lo que se cobra. */
  indemnizacionArt245: number;
  /** Lo que manda pagar el 248 vía el 247: la mitad del 245. */
  indemnizacionArt248: number;
  beneficiarios: Beneficiarios;
  /** Cuánto le toca a cada titular (partes iguales). null si no hay beneficiarios cargados. */
  porBeneficiario: number | null;
  // Liquidación final: corresponde siempre, también por muerte.
  sacProporcional: { dias: number; totalDiasSemestre: number; monto: number };
  vacaciones: { dias: number; monto: number; sac: number };
  totalLiquidacionFinal: number;
  totalGeneral: number;
};

export function calcularMuerteTrabajador(params: {
  ingresoISO: string;
  fallecimientoISO: string;
  mejorRemuneracion: number;
  familia: Familia;
  topeCCT?: number;
}): ResultadoMuerte | null {
  const { ingresoISO, fallecimientoISO, mejorRemuneracion, familia, topeCCT } = params;
  if (
    !ingresoISO ||
    !fallecimientoISO ||
    fallecimientoISO <= ingresoISO ||
    mejorRemuneracion <= 0
  ) {
    return null;
  }

  const ant = antiguedadEntre(ingresoISO, fallecimientoISO);
  const [anioF, mesF] = fallecimientoISO.split("-").map(Number);

  // Art. 92 bis: el 245 se debe «luego de transcurrido el período de prueba». Como el 248 remite
  // al 247 y éste al 245, durante el período de prueba no hay indemnización por antigüedad —
  // pero la liquidación final (SAC y vacaciones) se paga igual.
  const enPeriodoPrueba = ant.totalMeses < MESES_PERIODO_PRUEBA;

  const nucleo = nucleoArt245({ ant, mejorRemuneracion, enPeriodoPrueba, topeCCT });
  const indemnizacionArt248 = nucleo.monto * PROPORCION_ART_247;

  const beneficiarios = repartirBeneficiarios(familia);
  const porBeneficiario =
    beneficiarios.titulares > 0 ? indemnizacionArt248 / beneficiarios.titulares : null;

  // Art. 123: SAC proporcional al semestre en curso efectivamente trabajado.
  const inicioSemestre = mesF <= 6 ? `${anioF}-01-01` : `${anioF}-07-01`;
  const finSemestre = mesF <= 6 ? `${anioF}-06-30` : `${anioF}-12-31`;
  const desdeSemestre = ingresoISO > inicioSemestre ? ingresoISO : inicioSemestre;
  const diasSemestre = diasEntreInclusive(desdeSemestre, fallecimientoISO);
  const totalDiasSemestre = diasEntreInclusive(inicioSemestre, finSemestre);
  const sacProporcional = {
    dias: diasSemestre,
    totalDiasSemestre,
    monto: (mejorRemuneracion / 2) * (diasSemestre / totalDiasSemestre),
  };

  // Art. 156: vacaciones proporcionales no gozadas, a sueldo ÷ 25 (art. 155).
  const inicioAnio = `${anioF}-01-01`;
  const desdeAnio = ingresoISO > inicioAnio ? ingresoISO : inicioAnio;
  const diasTrabajadosAnio = diasEntreInclusive(desdeAnio, fallecimientoISO);
  const diasVacaciones = diasPorAntiguedad(ingresoISO, anioF) * (diasTrabajadosAnio / 365);
  const montoVacaciones = diasVacaciones * (mejorRemuneracion / DIVISOR_VACACIONES);
  const vacaciones = { dias: diasVacaciones, monto: montoVacaciones, sac: montoVacaciones / 12 };

  const totalLiquidacionFinal = sacProporcional.monto + vacaciones.monto + vacaciones.sac;

  return {
    antiguedad: ant,
    enPeriodoPrueba,
    aniosComputables: nucleo.aniosComputables,
    base: mejorRemuneracion,
    baseAplicada: nucleo.baseAplicada,
    topeAplicado: nucleo.topeAplicado,
    indemnizacionArt245: nucleo.monto,
    indemnizacionArt248,
    beneficiarios,
    porBeneficiario,
    sacProporcional,
    vacaciones,
    totalLiquidacionFinal,
    totalGeneral: indemnizacionArt248 + totalLiquidacionFinal,
  };
}
