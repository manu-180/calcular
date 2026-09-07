// Datos del régimen indemnizatorio por despido sin causa.
// Fuente legal: arts. 92 bis, 123, 128, 156, 231-233, 245, 245 bis, 246 y 255 bis de la
// Ley de Contrato de Trabajo 20.744 (arts. 231 inc. b y 245 con el texto de la Ley 27.802,
// B.O. 6/3/2026). Multas derogadas por Ley 27.742, arts. 99 y 100 (B.O. 8/7/2024).
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const INDEMNIZACION_FUENTES = {
  lct: {
    nombre:
      "Ley de Contrato de Trabajo 20.744, arts. 231-233 y 245 (texto actualizado)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  },
  ley27802: {
    nombre: "Ley 27.802 — nuevo art. 245 LCT (B.O. 6/3/2026)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
  },
  ley27742: {
    nombre: "Ley 27.742 (Bases) — derogación de multas laborales, arts. 99 y 100",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=401266",
  },
  consultadoEl: "11 de junio de 2026",
};

// Art. 92 bis: los primeros 6 meses son período de prueba (los convenios pueden ampliarlo
// a 8 meses en empresas de 6 a 100 trabajadores y a 12 en empresas de hasta 5).
export const MESES_PERIODO_PRUEBA = 6;

// Art. 245: un mes de sueldo por año de servicio o fracción MAYOR de 3 meses.
export const MESES_FRACCION_ANIO = 3;

// Art. 245: si la base supera el tope del convenio (3 veces el promedio del CCT),
// la base aplicada nunca puede bajar del 67% de la remuneración real.
export const PISO_TOPE = 0.67;

// Art. 231 inc. b (texto Ley 27.802): preaviso del empleador de 1 mes hasta 5 años de
// antigüedad y de 2 meses cuando es superior. En período de prueba no hay preaviso.
export const ANIOS_LIMITE_PREAVISO = 5;

// Valor de un día de sueldo común para la integración del mes de despido (art. 233).
export const DIVISOR_DIA = 30;
