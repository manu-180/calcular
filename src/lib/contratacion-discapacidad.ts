// Motor del beneficio por contratar a una persona con discapacidad. Puro, sin fetch.
//
// LA CUENTA, EN UNA LÍNEA: base = bruto − detracción; contribución = base × alícuota del art. 19 de
// la Ley 27.541; el beneficio del art. 87 de la Ley 24.013 exime el 50% de ESA contribución.
//
// LA TRAMPA QUE ESTE ARCHIVO EVITA: sumar al ahorro la obra social, la ART o el seguro de vida. El
// art. 87 enumera cuatro subsistemas y son exactamente los cuatro del art. 19; todo lo demás se
// paga entero. Por eso `calcular()` devuelve el costo NO alcanzado por separado, para que la página
// pueda mostrar cuánto del costo laboral el beneficio efectivamente mueve — y cuánto no.

import {
  ALICUOTAS_ART19,
  type AlicuotaArt19,
  DETRACCION_MENSUAL,
  DETRACCION_SAC,
  EXENCION_ANIOS,
  EXENCION_PORCENTAJE,
  DEDUCCION_GANANCIAS,
  OBRA_SOCIAL_EMPLEADOR,
} from "@/data/contratacion-discapacidad";

const r2 = (n: number) => Math.round(n * 100) / 100;

export function alicuotaDe(id: AlicuotaArt19): number {
  return ALICUOTAS_ART19.find((a) => a.id === id)?.alicuota ?? ALICUOTAS_ART19[1].alicuota;
}

export type EntradaDiscapacidad = {
  /** Remuneración bruta mensual. */
  bruto: number;
  /** Cuál de las dos alícuotas del art. 19 le corresponde al empleador. */
  tipo: AlicuotaArt19;
};

export type ResultadoDiscapacidad = {
  bruto: number;
  alicuota: number;
  /** Base imponible del mes: el bruto menos la detracción del art. 22, nunca negativa. */
  baseMensual: number;
  /** Contribución del art. 19 sin el beneficio, por mes. */
  contribucionMensual: number;
  /** Lo que se paga con la exención del 50%. */
  contribucionConBeneficio: number;
  ahorroMensual: number;
  /** El año son 12 meses + el SAC, cuya base lleva media detracción (art. 22 in fine). */
  ahorroAnual: number;
  ahorroTotal: number;
  /** Contribución a la obra social: NO alcanzada por la exención. */
  obraSocialMensual: number;
  /** Deducción del art. 23 de la Ley 22.431 sobre las retribuciones de un año (12 + SAC). */
  deduccionGananciasAnual: number;
  /** Qué proporción del costo alcanzado se ahorra, para no exagerar el titular. */
  fraccionDelCostoAlcanzado: number;
};

/** La base del mes: el bruto menos la detracción fija del art. 22, con piso en cero. */
export function baseImponible(bruto: number, detraccion = DETRACCION_MENSUAL): number {
  return r2(Math.max(0, bruto - detraccion));
}

export function calcular({ bruto, tipo }: EntradaDiscapacidad): ResultadoDiscapacidad {
  const limpio = Number.isFinite(bruto) && bruto > 0 ? bruto : 0;
  const alicuota = alicuotaDe(tipo);

  const baseMensual = baseImponible(limpio);
  const contribucionMensual = r2(baseMensual * alicuota);
  const ahorroMensual = r2(contribucionMensual * EXENCION_PORCENTAJE);

  // El SAC es media remuneración con MEDIA detracción (art. 22 in fine): su base no es la mitad de
  // la base mensual, y calcularla así subestima el ahorro anual.
  const baseSac = r2(Math.max(0, limpio / 2 - DETRACCION_MENSUAL * DETRACCION_SAC));
  const ahorroSacAnual = r2(baseSac * alicuota * EXENCION_PORCENTAJE * 2);

  const ahorroAnual = r2(ahorroMensual * 12 + ahorroSacAnual);

  const remuneracionAnual = r2(limpio * 13);

  return {
    bruto: limpio,
    alicuota,
    baseMensual,
    contribucionMensual,
    contribucionConBeneficio: r2(contribucionMensual - ahorroMensual),
    ahorroMensual,
    ahorroAnual,
    ahorroTotal: r2(ahorroAnual * EXENCION_ANIOS),
    obraSocialMensual: r2(limpio * OBRA_SOCIAL_EMPLEADOR),
    deduccionGananciasAnual: r2(remuneracionAnual * DEDUCCION_GANANCIAS),
    fraccionDelCostoAlcanzado: EXENCION_PORCENTAJE,
  };
}
