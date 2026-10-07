// Licencias por maternidad, paternidad y estado de excedencia — reglas de la LCT y de la Ley 24.714.
//
// POR QUÉ ESTE ARCHIVO EXISTE: acá no hay ningún monto propio que envejezca. Lo que se publica son
// PLAZOS legales (45+45 días, mínimo 10 antes, 90 en total, 2 días por nacimiento) y una regla de
// pago que casi nadie enuncia bien: durante la licencia por maternidad no cobrás sueldo, cobrás
// una ASIGNACIÓN de ANSES igual a la remuneración que hubieras debido percibir (art. 177 LCT y
// art. 11 Ley 24.714). Como es asignación familiar y no remuneración, no sufre aportes: se cobra
// el BRUTO. Es la simetría exacta de la prestación por desempleo, que se calcula sobre el neto.
//
// TEXTO VIGENTE VERIFICADO EL 9/8/2026 contra el texto actualizado de la LCT en InfoLEG, después
// de la reforma de la Ley 27.802 (B.O. 6/3/2026), que tocó 65 artículos de la ley: los artículos
// 158, 177, 178, 179, 182 y 183 se leyeron uno por uno en el texto consolidado, no de memoria.
//
// LO QUE SE PUBLICA MAL, UNA Y OTRA VEZ:
//   · «el mínimo antes del parto son 15 días» → son DIEZ (art. 177, segunda oración).
//   · «la licencia son 90 días fijos» → son 45+45, pero con la opción de correr días de adelante
//     hacia atrás; y en nacimiento pretérmino se acumula lo no gozado hasta completar los 90.
//   · «te paga la empresa» → la paga ANSES, y por eso hace falta antigüedad de 3 meses.
//   · «cobrás lo mismo que en el recibo» → cobrás el bruto, que es más que el neto.

import { ASIGNACIONES_VIGENTES } from "./asignaciones";

/** Plazos de la licencia por maternidad (art. 177 LCT). */
export const MATERNIDAD = {
  /** Días anteriores al parto en el régimen general. */
  diasAntes: 45,
  /** Días posteriores al parto en el régimen general. */
  diasDespues: 45,
  /** Piso al que se puede reducir el tramo anterior al parto. */
  diasAntesMinimo: 10,
  /** Total garantizado: lo que no se toma antes se acumula después. */
  diasTotal: 90,
  articulo: "Ley de Contrato de Trabajo, art. 177",
} as const;

/** Licencia por nacimiento de hijo para la otra persona progenitora (art. 158 inc. a LCT). */
export const PATERNIDAD = {
  dias: 2,
  corridos: true,
  /** Art. 160 LCT: si cae en domingo, feriado o día no laborable, debe computarse un día hábil. */
  garantizaDiaHabil: true,
  articulo: "Ley de Contrato de Trabajo, art. 158 inc. a) y art. 160",
} as const;

/** Estado de excedencia: sin goce de sueldo, a opción de la trabajadora (art. 183 inc. c LCT). */
export const EXCEDENCIA = {
  mesesMinimo: 3,
  mesesMaximo: 6,
  articulo: "Ley de Contrato de Trabajo, art. 183 inc. c)",
} as const;

/** Protección contra el despido por maternidad (arts. 178 y 182 LCT). */
export const ESTABILIDAD = {
  /** Meses antes y después del parto en los que se presume que el despido es por maternidad. */
  mesesPresuncion: 7.5,
  /** Indemnización especial del art. 182: un año de remuneraciones, que se suma a la del art. 245. */
  remuneracionesIndemnizacionEspecial: 13,
  articulo: "Ley de Contrato de Trabajo, arts. 178 y 182",
} as const;

/** Antigüedad mínima y continuada que exige ANSES para pagar la asignación (art. 11 Ley 24.714). */
export const ANTIGUEDAD_MINIMA_MESES = 3;

/** Descansos diarios por lactancia (art. 179 LCT). */
export const LACTANCIA = {
  descansosPorDia: 2,
  minutosCadaUno: 30,
  mesesDesdeElNacimiento: 12,
  articulo: "Ley de Contrato de Trabajo, art. 179",
} as const;

export type FuenteLicencia = { nombre: string; url: string; detalle: string };

export const LICENCIAS_FUENTES: { consultadoEl: string; lista: FuenteLicencia[] } = {
  consultadoEl: "2026-08-09",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 177 (prohibición de trabajar y opción de reducir la licencia anterior al parto), art. 158 inc. a) y 160 (licencia por nacimiento), art. 178 y 182 (estabilidad e indemnización especial), art. 179 (lactancia) y art. 183 (excedencia). Texto consolidado tras la Ley 27.802.",
    },
    {
      nombre: "Ley 24.714: Régimen de Asignaciones Familiares",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/39880/texact.htm",
      detalle:
        "Art. 6 (nómina de asignaciones), art. 11 (la asignación por maternidad es igual a la remuneración que se hubiera debido percibir y exige 3 meses de antigüedad) y art. 12 (asignación por nacimiento).",
    },
    {
      nombre: `${ASIGNACIONES_VIGENTES.resolucion}: montos de asignaciones familiares`,
      url: ASIGNACIONES_VIGENTES.resolucionUrl,
      detalle:
        `${ASIGNACIONES_VIGENTES.resolucionBO}: importes vigentes de las asignaciones de pago único (nacimiento, adopción, matrimonio) y de la asignación prenatal.`,
    },
  ],
};
