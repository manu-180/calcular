import {
  COMPENSACIONES,
  FORMULA,
  PISOS,
  type TramoId,
} from "@/data/riesgos-trabajo";

export type EntradaART = {
  /** Valor mensual del ingreso base del art. 12, ya actualizado por RIPTE. */
  ingresoBase: number;
  /** Edad a la fecha de la PRIMERA MANIFESTACIÓN INVALIDANTE, no la de hoy. */
  edad: number;
  /** Porcentaje de incapacidad laboral permanente (0 a 100). Irrelevante en muerte. */
  incapacidad: number;
  /** Art. 3 de la Ley 26.773: sólo si el daño ocurrió en el lugar de trabajo o a disposición
   *  del empleador. El accidente in itinere queda afuera del 20%. */
  enElTrabajo: boolean;
};

export type ResultadoART = {
  tramo: TramoId;
  /** Lo que da la fórmula del art. 14 ap. 2 / 15 ap. 2, antes de comparar con el piso. */
  formula: number;
  /** El piso que le corresponde a este caso (Res. SRT vigente). */
  piso: number;
  /** El que rige: el mayor de los dos. */
  indemnizacion: number;
  /** true cuando el piso es lo que manda — el caso que la web publica al revés. */
  mandaElPiso: boolean;
  /** Compensación adicional de pago único del art. 11 ap. 4, si corresponde al tramo. */
  compensacion: number;
  /** El 20% del art. 3 de la Ley 26.773, con su propio piso en muerte e incapacidad total. */
  adicional20: number;
  total: number;
  /** El coeficiente 65/edad, para mostrarlo en el desglose. */
  coeficienteEdad: number;
};

/** El tramo que corresponde a un porcentaje de incapacidad (la muerte se elige aparte). */
export function tramoDe(incapacidad: number): Exclude<TramoId, "muerte"> {
  if (incapacidad >= 66) return "total";
  if (incapacidad > 50) return "parcial-grave";
  return "parcial";
}

const redondear = (n: number) => Math.round(n * 100) / 100;

/**
 * `muerte` se pasa aparte porque no se deriva del porcentaje: un accidente fatal no tiene
 * porcentaje de incapacidad, y el art. 18 remite al art. 15 ap. 2 sin multiplicarlo por nada.
 */
export function calcularART(e: EntradaART, muerte = false): ResultadoART | null {
  if (!Number.isFinite(e.ingresoBase) || e.ingresoBase <= 0) return null;
  if (!Number.isFinite(e.edad) || e.edad < 14 || e.edad > 100) return null;
  if (!muerte && (!Number.isFinite(e.incapacidad) || e.incapacidad <= 0 || e.incapacidad > 100)) {
    return null;
  }

  const tramo: TramoId = muerte ? "muerte" : tramoDe(e.incapacidad);
  const coeficienteEdad = FORMULA.edadReferencia / e.edad;

  // El % de incapacidad multiplica en la parcial (art. 14 ap. 2) y NO en la total ni en la muerte
  // (art. 15 ap. 2: «53 veces el valor mensual del ingreso base multiplicado por un coeficiente»,
  // sin porcentaje). Confundirlo es el error de cálculo más común en este régimen.
  const multiplicaPorcentaje = tramo === "parcial" || tramo === "parcial-grave";
  const porcentaje = e.incapacidad / 100;

  const formula = redondear(
    FORMULA.veces *
      e.ingresoBase *
      coeficienteEdad *
      (multiplicaPorcentaje ? porcentaje : 1),
  );

  const piso = redondear(
    multiplicaPorcentaje
      ? PISOS.incapacidadParcial * porcentaje
      : PISOS.incapacidadTotal,
  );

  const indemnizacion = Math.max(formula, piso);

  const compensacion =
    tramo === "muerte"
      ? COMPENSACIONES.muerte
      : tramo === "total"
        ? COMPENSACIONES.total
        : tramo === "parcial-grave"
          ? COMPENSACIONES.parcialGrave
          : 0;

  // El 20% se calcula sobre las indemnizaciones dinerarias del régimen («el veinte por ciento (20%)
  // de esa suma»), o sea la prestación por incapacidad MÁS la compensación adicional del art. 11.
  const base20 = indemnizacion + compensacion;
  const bruto20 = e.enElTrabajo ? redondear(base20 * FORMULA.adicionalPorcentaje) : 0;
  const tienePiso20 = e.enElTrabajo && (tramo === "muerte" || tramo === "total");
  const adicional20 = tienePiso20 ? Math.max(bruto20, PISOS.adicional20) : bruto20;

  return {
    tramo,
    formula,
    piso,
    indemnizacion,
    mandaElPiso: piso > formula,
    compensacion,
    adicional20,
    total: redondear(indemnizacion + compensacion + adicional20),
    coeficienteEdad,
  };
}
