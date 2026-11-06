import { enHoraAR } from "@/lib/hora-argentina";
import {
  ALICUOTA_RIFL_INSSJP,
  ALICUOTA_RIFL_SIPA_FNE_AAFF,
  ALICUOTA_RIFL_TOTAL,
  ANIOS_VENTANA,
  DETRACCION_ART22,
  LEY_PUBLICADA_ISO,
  MESES_BENEFICIO,
} from "@/data/rifl";

/**
 * LA VENTANA DEL ART. 156, DERIVADA.
 *
 * «Créase el Régimen de Incentivo a la Formalización Laboral (RIFL), con una vigencia de un (1)
 * año contado desde el primer día del segundo mes inmediato siguiente al de la entrada en
 * vigencia de la presente ley».
 *
 * La ley entró en vigencia con su publicación en el B.O. (art. 217). Si se publicó en marzo, el
 * mes inmediato siguiente es abril y el segundo, mayo: la ventana abre el 1/5/2026 y cierra el
 * 30/4/2027 (un año después, día anterior inclusive). Se calcula acá y no se escribe a mano para
 * que la página no envejezca, y para que un cambio de la fecha de publicación arrastre las dos
 * puntas sin que nadie tenga que acordarse.
 */
export type VentanaRifl = {
  aperturaISO: string;
  cierreISO: string;
  /** "1 de mayo de 2026" */
  aperturaTexto: string;
  /** "30 de abril de 2027" */
  cierreTexto: string;
  /** true mientras se pueda dar de alta una nueva relación laboral dentro del régimen. */
  abierta: boolean;
  /** Días que faltan para el cierre (0 el mismo día del cierre; negativo si ya cerró). */
  diasParaElCierre: number;
  /** Mes y año hasta el que llega el beneficio de un alta hecha el último día de la ventana. */
  ultimoMesDelBeneficio: string;
};

const MESES_ES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
] as const;

/** Componentes de la fecha en hora argentina (del tzdata), sin depender del TZ del server. */
function fechaAR(d: Date): { anio: number; mes: number; dia: number } {
  const t = enHoraAR(d);
  return { anio: t.getUTCFullYear(), mes: t.getUTCMonth() + 1, dia: t.getUTCDate() };
}

const iso = (anio: number, mes: number, dia: number) =>
  `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

const enLetras = (anio: number, mes: number, dia: number) =>
  `${dia} de ${MESES_ES[mes - 1]} de ${anio}`;

export function ventanaRifl(hoy: Date = new Date()): VentanaRifl {
  const [anioPub, mesPub] = LEY_PUBLICADA_ISO.split("-").map(Number);

  // «el primer día del segundo mes inmediato siguiente al de la entrada en vigencia»
  const mesesDesdeCero = (anioPub * 12 + (mesPub - 1)) + 2;
  const anioApertura = Math.floor(mesesDesdeCero / 12);
  const mesApertura = (mesesDesdeCero % 12) + 1;

  // «con una vigencia de un (1) año»: el último día es el anterior al mismo día del año siguiente.
  const cierre = new Date(Date.UTC(anioApertura + ANIOS_VENTANA, mesApertura - 1, 1));
  cierre.setUTCDate(cierre.getUTCDate() - 1);

  const aperturaISO = iso(anioApertura, mesApertura, 1);
  const cierreISO = iso(cierre.getUTCFullYear(), cierre.getUTCMonth() + 1, cierre.getUTCDate());

  const h = fechaAR(hoy);
  const hoyUTC = Date.UTC(h.anio, h.mes - 1, h.dia);
  const cierreUTC = cierre.getTime();
  const aperturaUTC = Date.UTC(anioApertura, mesApertura - 1, 1);

  // Los 48 meses del art. 159 corren desde el mes de inicio de la relación, ese mes inclusive.
  const mesesFin = (cierre.getUTCFullYear() * 12 + cierre.getUTCMonth()) + MESES_BENEFICIO - 1;

  return {
    aperturaISO,
    cierreISO,
    aperturaTexto: enLetras(anioApertura, mesApertura, 1),
    cierreTexto: enLetras(
      cierre.getUTCFullYear(),
      cierre.getUTCMonth() + 1,
      cierre.getUTCDate(),
    ),
    abierta: hoyUTC >= aperturaUTC && hoyUTC <= cierreUTC,
    diasParaElCierre: Math.round((cierreUTC - hoyUTC) / 86_400_000),
    ultimoMesDelBeneficio: `${MESES_ES[mesesFin % 12]} de ${Math.floor(mesesFin / 12)}`,
  };
}

export type ResultadoRifl = {
  /** Remuneración bruta mensual del nuevo empleado. */
  bruto: number;
  /** Detracción del art. 22 de la Ley 27.541 aplicada (0 si el empleador no la usa). */
  detraccion: number;
  /** Base imponible = bruto − detracción, nunca negativa. */
  base: number;
  /** Alícuota del régimen general que le corresponde al empleador (0,204 o 0,18). */
  alicuotaGeneral: number;
  /** Lo que pagaría por los cuatro subsistemas sin el RIFL. */
  contribucionGeneral: number;
  /** Lo que paga con el RIFL: 2% + 3% sobre la misma base. */
  contribucionRifl: number;
  /** Desglose del RIFL, que la ley separa en dos incisos. */
  riflSipaFneAaff: number;
  riflInssjp: number;
  /** Ahorro mensual, anual y en los 48 meses del beneficio. */
  ahorroMensual: number;
  ahorroAnual: number;
  ahorroTotalBeneficio: number;
  /** Cuánto baja el costo de las contribuciones, en %. Es el mismo para cualquier sueldo. */
  reduccionPorcentual: number;
};

export function calcularRifl(params: {
  bruto: number;
  alicuotaGeneral: number;
  aplicarDetraccion: boolean;
  detraccion?: number;
}): ResultadoRifl {
  const bruto = Math.max(0, params.bruto);
  const detraccion = params.aplicarDetraccion ? (params.detraccion ?? DETRACCION_ART22) : 0;
  const base = Math.max(0, bruto - detraccion);

  const contribucionGeneral = base * params.alicuotaGeneral;
  const riflSipaFneAaff = base * ALICUOTA_RIFL_SIPA_FNE_AAFF;
  const riflInssjp = base * ALICUOTA_RIFL_INSSJP;
  const contribucionRifl = riflSipaFneAaff + riflInssjp;
  const ahorroMensual = contribucionGeneral - contribucionRifl;

  return {
    bruto,
    detraccion,
    base,
    alicuotaGeneral: params.alicuotaGeneral,
    contribucionGeneral,
    contribucionRifl,
    riflSipaFneAaff,
    riflInssjp,
    ahorroMensual,
    ahorroAnual: ahorroMensual * 12,
    // El SAC también devenga contribuciones, pero con la detracción reducida al 50% (art. 22):
    // se deja afuera a propósito para no publicar un número que dependa de una proporción que
    // la calculadora no puede conocer. Los 48 meses son 48 sueldos, no 52 pagos.
    ahorroTotalBeneficio: ahorroMensual * MESES_BENEFICIO,
    reduccionPorcentual:
      params.alicuotaGeneral > 0
        ? ((params.alicuotaGeneral - ALICUOTA_RIFL_TOTAL) / params.alicuotaGeneral) * 100
        : 0,
  };
}
