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
    nombre: "Ley 27.802: nuevo art. 245 LCT (B.O. 6/3/2026)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
  },
  ley27742: {
    nombre: "Ley 27.742 (Bases): derogación de multas laborales, arts. 99 y 100",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=401266",
  },
  ligArt26: {
    nombre: "Ley de Impuesto a las Ganancias (t.o. Decreto 824/2019), art. 26 inc. i)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
  },
  consultadoEl: "11 de junio de 2026",
  gananciasConsultadoEl: "21 de septiembre de 2026",
};

// Verbatim del texto actualizado en InfoLEG (21/9/2026, sin reformas sobre el inc. i).
// Lo exento es una lista CERRADA: la integración del mes, el SAC y las vacaciones no están en
// ella, y el preaviso figura del lado de lo NO exento. No suavizarlo a «puede tributar».
export const LIG_ART26_EXENTO =
  "Las indemnizaciones por antigüedad en los casos de despidos y las que se reciban en forma de capital o renta por causas de muerte o incapacidad producida por accidente o enfermedad";
export const LIG_ART26_NO_EXENTO =
  "No están exentas las jubilaciones, pensiones, retiros, subsidios, ni las remuneraciones que se continúen percibiendo durante las licencias o ausencias por enfermedad, las indemnizaciones por falta de preaviso en el despido";

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
