// Datos de las vacaciones anuales (licencia ordinaria).
// Fuente legal: arts. 150 a 157, 162 y 164 de la Ley de Contrato de Trabajo 20.744
// (art. 154 con el texto de la Ley 27.802, B.O. 6/3/2026).
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const VACACIONES_FUENTES = {
  lct: {
    nombre: "Ley de Contrato de Trabajo 20.744, arts. 150-164 (texto actualizado)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  },
  ley27802: {
    nombre: "Ley 27.802: nuevo art. 154 LCT (B.O. 6/3/2026)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
  },
  consultadoEl: "11 de junio de 2026",
};

// Año al que corresponden las vacaciones: la antigüedad se mide al 31/12 (art. 150, último párrafo).
export const ANIO_VACACIONES = 2026;

// Escala del art. 150 LCT: días corridos de vacaciones según antigüedad al 31 de diciembre.
export const ESCALA_VACACIONES = [
  { maxAnios: 5, dias: 14, etiqueta: "Hasta 5 años" },
  { maxAnios: 10, dias: 21, etiqueta: "Más de 5 y hasta 10 años" },
  { maxAnios: 20, dias: 28, etiqueta: "Más de 10 y hasta 20 años" },
  { maxAnios: null, dias: 35, etiqueta: "Más de 20 años" },
] as const;

// Art. 155 inc. a): cada día de vacaciones se paga el sueldo mensual dividido 25.
export const DIVISOR_VACACIONES = 25;

// Valor de un día de sueldo común (mes de 30 días): sirve para mostrar el plus vacacional.
export const DIVISOR_DIA_NORMAL = 30;

// Art. 153: si no se llega a medio año trabajado, corresponde 1 día de descanso
// por cada 20 días de trabajo efectivo.
export const DIAS_TRABAJO_POR_DIA_DESCANSO = 20;
