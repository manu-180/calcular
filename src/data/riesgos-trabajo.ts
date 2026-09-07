// INDEMNIZACIÓN POR ACCIDENTE DE TRABAJO O ENFERMEDAD PROFESIONAL (Ley 24.557 + Ley 26.773).
//
// POR QUÉ ESTE ARCHIVO EXISTE (6/9/2026, s108). Es la aplicación más literal de la regla de s83
// —«un artículo derogado vale más que uno sustituido, porque la web copiada no queda incompleta:
// queda afirmando lo CONTRARIO»— y encima sobre un número de plata.
//
// El art. 14, ap. 2, inc. a) de la Ley 24.557 sigue diciendo, en el texto vigente de InfoLEG:
//   «Esta suma en ningún caso será SUPERIOR a la cantidad que resulte de multiplicar PESOS
//    CIENTO OCHENTA MIL ($ 180.000) por el porcentaje de incapacidad.»
// Y el art. 15, ap. 2, lo mismo: «no podrá ser superior a PESOS CIENTO OCHENTA MIL».
//
// Pero el **Decreto 1694/2009** dio vuelta las dos cosas el mismo día:
//   · art. 2º: «SUPRÍMENSE los topes previstos en el artículo 14, inciso 2, apartados a) y b), y
//     en el artículo 15, inciso 2, último párrafo».
//   · art. 3º: la indemnización del art. 14.2 «nunca será INFERIOR» a $180.000 × % de incapacidad.
//   · art. 4º: la del art. 15.2 «nunca será INFERIOR» a $180.000.
// O sea: el mismo número, invertido de techo a piso. Quien copia el artículo de la ley publica
// exactamente lo opuesto de lo que rige, y encima con un valor de 2009.
//
// EL DATO VIVO. Ese piso no quedó congelado: el art. 17 bis de la Ley 26.773 —incorporado por el
// art. 21 de la Ley 27.348— manda actualizarlo por RIPTE, y la Superintendencia de Riesgos del
// Trabajo dicta una resolución SEMESTRAL con los valores. La vigente es la **Res. SRT 39/2026**
// (B.O. 2/9/2026), que rige del 1/9/2026 al 28/2/2027. Los $180.000 de 2009 son hoy $114.354.110.
// La próxima sale alrededor del 1/3/2027 y se busca en el Boletín Oficial:
//   npx -y tsx tools/boletin-oficial.ts --buscar "RIESGOS DEL TRABAJO" --dias 15
//
// LO QUE NO SE CALCULA ACÁ, A PROPÓSITO. El **ingreso base** del art. 12 (sustituido por el
// Decreto 669/2019) es el promedio de los salarios del año anterior a la primera manifestación
// invalidante **actualizados mes a mes por RIPTE**, y después devenga un interés equivalente a la
// variación del RIPTE hasta la puesta a disposición. No tenemos la serie RIPTE mes a mes, así que
// el ingreso base **se pide como dato** y la página explica la regla en vez de inventar el número.
// Publicar la regla es lo que hace que la página no envejezca (doctrina de s74/s75).
//
// FUENTES leídas el 6/9/2026:
//   · Ley 24.557 (InfoLEG id 27971) — arts. 11 ap. 4, 12, 14, 15 y 18, texto actualizado.
//   · Ley 26.773 (InfoLEG id 203798) — arts. 2, 3 y 17 bis.
//   · Decreto 1694/2009 (InfoLEG id 159765) — arts. 1 a 4, Capítulo I.
//   · Res. SRT 39/2026, B.O. 2/9/2026 (aviso 346792, leído con tools/boletin-oficial.ts).

export const VIGENCIA_ART = {
  resolucion: "Resolución SRT 39/2026",
  boletin: "B.O. 2 de septiembre de 2026",
  desde: "1 de septiembre de 2026",
  hasta: "28 de febrero de 2027",
  /** La próxima resolución semestral: se busca en el B.O. alrededor de esta fecha. */
  proximaRevision: "2027-03-01",
  consultadoEl: "6 de septiembre de 2026",
} as const;

/**
 * Los PISOS vigentes. Son pisos, no techos: los techos los suprimió el art. 2º del Dec. 1694/2009.
 * Se actualizan por RIPTE cada seis meses (art. 17 bis de la Ley 26.773, incorporado por la 27.348).
 */
export const PISOS = {
  /** Art. 14 ap. 2 incs. a) y b) — se multiplica por el % de incapacidad (Res. 39/2026, art. 2). */
  incapacidadParcial: 114_354_110,
  /** Art. 15 ap. 2 — incapacidad permanente TOTAL, monto entero (Res. 39/2026, art. 3). */
  incapacidadTotal: 114_354_110,
  /** Art. 3 de la Ley 26.773 — el 20% adicional, sólo en muerte o incapacidad total (art. 4). */
  adicional20: 21_656_176,
} as const;

/**
 * Compensaciones adicionales de pago único del art. 11 ap. 4 de la Ley 24.557 (Res. 39/2026, art. 1).
 * Van SUMADAS a la indemnización, no en lugar de ella.
 */
export const COMPENSACIONES = {
  /** Inc. a) — art. 14 ap. 2 inc. b): incapacidad parcial mayor al 50% y menor al 66%. */
  parcialGrave: 50_824_055,
  /** Inc. b) — art. 15 ap. 2 y art. 17 ap. 1: incapacidad permanente total y gran invalidez. */
  total: 63_530_069,
  /** Inc. c) — art. 18 ap. 1: muerte del trabajador. */
  muerte: 76_236_060,
} as const;

/** Los valores originales de 2009, que es lo que todavía publica media web. */
export const VALORES_2009 = {
  piso: 180_000,
  compensaciones: { parcialGrave: 80_000, total: 100_000, muerte: 120_000 },
  adicional20: 70_000,
} as const;

/** Constantes de la fórmula del art. 14 ap. 2 inc. a) y del art. 15 ap. 2. */
export const FORMULA = {
  /** «CINCUENTA Y TRES (53) veces el valor mensual del ingreso base». */
  veces: 53,
  /** «un coeficiente que resultará de dividir el número SESENTA Y CINCO (65) por la edad». */
  edadReferencia: 65,
  /** El 20% del art. 3 de la Ley 26.773. */
  adicionalPorcentaje: 0.2,
} as const;

/** Los tres tramos de incapacidad, con el artículo que los gobierna. */
export const TRAMOS = [
  {
    id: "parcial",
    titulo: "Incapacidad parcial hasta el 50%",
    norma: "Ley 24.557, art. 14 ap. 2 inc. a)",
    detalle:
      "Indemnización de pago único: 53 × ingreso base mensual × % de incapacidad × (65 ÷ edad a la primera manifestación invalidante).",
  },
  {
    id: "parcial-grave",
    titulo: "Incapacidad parcial mayor al 50% y menor al 66%",
    norma: "Ley 24.557, art. 14 ap. 2 inc. b) + art. 11 ap. 4 inc. a)",
    detalle:
      "Misma fórmula, y además la compensación adicional de pago único del art. 11 ap. 4 inc. a). La renta periódica que preveía el texto original quedó desplazada por el art. 2 de la Ley 26.773: «el principio general indemnizatorio es de pago único».",
  },
  {
    id: "total",
    titulo: "Incapacidad permanente total (66% o más)",
    norma: "Ley 24.557, art. 15 ap. 2 + art. 11 ap. 4 inc. b)",
    detalle:
      "El capital es 53 × ingreso base × (65 ÷ edad), SIN multiplicar por el porcentaje, más la compensación adicional del art. 11 ap. 4 inc. b).",
  },
  {
    id: "muerte",
    titulo: "Muerte del trabajador",
    norma: "Ley 24.557, art. 18 + art. 15 ap. 2 + art. 11 ap. 4 inc. c)",
    detalle:
      "Los derechohabientes del art. 53 de la Ley 24.241 (con el límite de edad extendido a 21 años, o 25 si estudian y estaban a cargo) reciben la prestación del art. 15 ap. 2 más la compensación adicional del art. 11 ap. 4 inc. c).",
  },
] as const;

export type TramoId = (typeof TRAMOS)[number]["id"];

export const ART_TEXTOS = {
  topeInvertido:
    "Esta suma en ningún caso será superior a la cantidad que resulte de multiplicar PESOS CIENTO OCHENTA MIL ($ 180.000) por el porcentaje de incapacidad.",
  supresionTopes:
    "Suprímense los topes previstos en el artículo 14, inciso 2, apartados a) y b), y en el artículo 15, inciso 2, último párrafo, respectivamente, de la Ley Nº 24.557 y sus modificaciones.",
  pisoParcial:
    "Establécese que la indemnización que corresponda por aplicación del artículo 14, inciso 2, apartados a) y b), de la Ley Nº 24.557 y sus modificaciones, nunca será inferior al monto que resulte de multiplicar PESOS CIENTO OCHENTA MIL ($ 180.000.-) por el porcentaje de incapacidad.",
  ingresoBase:
    "A los fines del cálculo del valor del ingreso base se considerará el promedio mensual de todos los salarios devengados […] por el trabajador durante el año anterior a la primera manifestación invalidante, o en el tiempo de prestación de servicio si fuera menor. Los salarios mensuales tomados a fin de establecer el promedio se actualizarán mes a mes aplicándose la variación del índice Remuneraciones Imponibles Promedio de los Trabajadores Estables (RIPTE).",
  moraArt12:
    "En caso de que las Aseguradoras de Riesgos del Trabajo no pongan a disposición el pago de la indemnización dentro del plazo debido, se aplicará un interés equivalente al promedio de la tasa activa cartera general nominal anual vencida a TREINTA (30) días del BANCO DE LA NACIÓN ARGENTINA, hasta la efectiva cancelación, acumulándose los intereses al capital en forma semestral.",
  adicional20:
    "Cuando el daño se produzca en el lugar de trabajo o lo sufra el dependiente mientras se encuentre a disposición del empleador, el damnificado (trabajador víctima o sus derechohabientes) percibirá junto a las indemnizaciones dinerarias previstas en este régimen, una indemnización adicional de pago único en compensación por cualquier otro daño no reparado por las fórmulas allí previstas, equivalente al veinte por ciento (20%) de esa suma.",
} as const;

export const ART_FUENTES = {
  consultadoEl: VIGENCIA_ART.consultadoEl,
  principal: {
    nombre: "Ley 24.557 — texto actualizado en InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27971/texact.htm",
  },
  lista: [
    {
      nombre: "Ley 24.557 sobre Riesgos del Trabajo — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27971/texact.htm",
      detalle:
        "Art. 11 ap. 4 (compensaciones adicionales de pago único), art. 12 (ingreso base, sustituido por el Decreto 669/2019), art. 14 (incapacidad parcial), art. 15 (incapacidad total) y art. 18 (muerte y derechohabientes).",
    },
    {
      nombre: "Decreto 1694/2009 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/155000-159999/159765/texact.htm",
      detalle:
        "Art. 2º: suprime los topes de los arts. 14 ap. 2 y 15 ap. 2. Arts. 3º y 4º: convierten los $180.000 en PISO. Es la norma que invierte lo que sigue diciendo el texto de la ley.",
    },
    {
      nombre: "Ley 26.773 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/200000-204999/203798/texact.htm",
      detalle:
        "Art. 2 (el principio indemnizatorio es de pago único), art. 3 (el 20% adicional cuando el daño ocurre en el lugar de trabajo o a disposición del empleador) y art. 17 bis (la actualización semestral por RIPTE, incorporado por el art. 21 de la Ley 27.348).",
    },
    {
      nombre: "Resolución SRT 39/2026 — Boletín Oficial del 2/9/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346792",
      detalle:
        "Los pisos y compensaciones vigentes del 1/9/2026 al 28/2/2027: $114.354.110 para los arts. 14 ap. 2 y 15 ap. 2; $50.824.055 / $63.530.069 / $76.236.060 para el art. 11 ap. 4; y $21.656.176 para el adicional del art. 3 de la Ley 26.773.",
    },
  ],
} as const;
