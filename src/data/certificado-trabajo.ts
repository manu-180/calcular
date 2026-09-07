// Certificado de trabajo del art. 80 de la Ley de Contrato de Trabajo 20.744 — TEXTO VIGENTE tras
// la Ley 27.802 (B.O. 6/3/2026), su reglamentación por la RG ARCA 5848/2026 (B.O. 18/5/2026), y los
// dos regímenes anteriores que todavía deciden juicios en trámite.
//
// POR QUÉ ESTE ARCHIVO EXISTE (17/8/2026, s86): es la aplicación más cara de la regla de s78 —
// «un artículo sustituido es un hueco de SERP casi garantizado»—, porque acá lo que desapareció es
// un NÚMERO que toda la web sigue publicando: la multa de «tres veces la mejor remuneración» por
// no entregar el certificado de trabajo. Ese importe nunca estuvo en el art. 80 original: lo
// agregó como último párrafo el art. 45 de la Ley 25.345 (B.O. 17/11/2000). Pasaron dos cosas:
//   1. El art. 99 de la Ley 27.742 («Bases», B.O. 8/7/2024, vigente desde el día siguiente)
//      DEROGÓ los arts. 43 a 48 de la Ley 25.345 — entre ellos el 45, el que había incorporado
//      la sanción. Desde el 9/7/2024 su subsistencia se discute en tribunales.
//   2. El art. 25 de la Ley 27.802 SUSTITUYÓ el art. 80 entero (B.O. 6/3/2026). El texto nuevo no
//      tiene último párrafo ni indemnización tarifada: tiene un PLAZO (45 días hábiles) y tres
//      formas de cumplir. Buscar «tres veces la mejor remuneración» en el texto actualizado de la
//      LCT hoy devuelve CERO coincidencias — se verificó así, no de memoria.
//
// LO QUE HAY QUE MIRAR CON LUPA (y por eso está anclado en check_certificado_trabajo.ts):
//   · La página NO opina sobre si la multa «sigue viva» entre el 9/7/2024 y el 5/3/2026: publica
//     las dos normas con sus fechas y dice que está discutido. Un YMYL no elige bando doctrinario.
//   · El plazo de 45 días hábiles es del texto vigente y sólo corre para extinciones desde el
//     6/3/2026. Antes de esa fecha la LCT no fijaba plazo de entrega: el que existía era el del
//     art. 3 del Decreto 146/2001 —30 días corridos— pero como habilitación para intimar, no como
//     plazo de entrega.
//   · El art. 80 dice «días hábiles» y no define el calendario. El motor cuenta de lunes a viernes
//     excluyendo feriados nacionales y días no laborables (el mismo calendario derivado de la Ley
//     27.399 que ya usa /licencias-especiales) y MUESTRA los días que salteó, para que quien tenga
//     otro criterio —o un feriado provincial— pueda recontar.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552), texto original de la Ley 25.345
// (norma.htm, para el párrafo derogado), Decreto 146/2001 y RG ARCA 5848/2026 (norma.htm),
// los cuatro leídos enteros el 17/8/2026. Nunca una nota de prensa.

/** B.O. de la Ley 27.802: desde acá rige el art. 80 nuevo. */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Vigencia del art. 99 de la Ley 27.742 (B.O. 8/7/2024, «a partir del día siguiente»). */
export const VIGENCIA_BASES = "9 de julio de 2024";
export const VIGENCIA_BASES_ISO = "2024-07-09";

/** Plazo de entrega del texto vigente (art. 80 LCT, según art. 25 de la Ley 27.802). */
export const PLAZO_ENTREGA_DIAS_HABILES = 45;

/** Días corridos desde la extinción que habilitan a intimar (Decreto 146/2001, art. 3). */
export const DIAS_CORRIDOS_PARA_INTIMAR = 30;

/** Días hábiles que tenía el empleador para cumplir tras recibir el requerimiento (párrafo derogado). */
export const DIAS_HABILES_DEL_REQUERIMIENTO = 2;

/** Multiplicador de la indemnización del párrafo derogado: tres mejores remuneraciones. */
export const MULTIPLICADOR_MULTA = 3;

/** Formulario y sistema con los que hoy se emite el certificado (RG ARCA 5848/2026). */
export const FORMULARIO = "F. 984";
export const SISTEMA_EMPLEADOR = "Simplificación Registral";
export const SERVICIO_TRABAJADOR = "Trabajo en Blanco";

/**
 * Citas textuales de las fuentes oficiales. Se guardan enteras a propósito: son el ancla contra la
 * que el check verifica que la página no derive hacia un resumen que diga otra cosa que la norma.
 */
export const CERTIFICADO_TEXTOS = {
  /** LCT art. 80, texto vigente (sustituido por el art. 25 de la Ley 27.802). */
  art80Vigente:
    "Entrega de certificados. Dentro del plazo de cuarenta y cinco (45) días hábiles desde la extinción del contrato de trabajo, el empleador deberá entregar al trabajador los certificados en los que consten los datos relativos a la relación laboral, la función desempeñada, las capacitaciones realizadas y la constancia del ingreso de los aportes y contribuciones al Sistema de Seguridad Social. La obligación se considerará cumplida cuando el empleador ponga a disposición del trabajador dichos certificados: a) en formato físico en la sede de la empresa; o b) en formato digital a través de cualquier sistema que permita acreditar su entrega al trabajador de manera fehaciente. Cuando la información requerida por este artículo se encuentre disponible para el trabajador a través del sitio web del organismo de la seguridad social o del sistema que establezca la Agencia de Recaudación y Control Aduanero (ARCA), también se considerará cumplida la obligación del empleador respecto de los certificados alcanzados por la información que allí conste.",
  art80Nota:
    "(Artículo sustituido por art. 25 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art80NotaArca:
    "(Nota Infoleg: Ver art. 1° de la Resolución General N° 5848/2026 de la Agencia de Recaudación y Control Aduanero B.O. 18/05/2026. -Certificado de Trabajo-)",

  /** El último párrafo que agregó el art. 45 de la Ley 25.345 y que el texto vigente ya no tiene. */
  parrafoDerogado:
    "Si el empleador no hiciera entrega de la constancia o del certificado previstos respectivamente en los apartados segundo y tercero de este artículo dentro de los dos (2) días hábiles computados a partir del día siguiente al de la recepción del requerimiento que a tal efecto le formulare el trabajador de modo fehaciente, será sancionado con una indemnización a favor de este último que será equivalente a tres veces la mejor remuneración mensual, normal y habitual percibida por el trabajador durante el último año o durante el tiempo de prestación de servicios, si éste fuere menor.",
  parrafoDerogadoNota:
    "(Artículo 45 de la Ley N° 25.345, que había incorporado este párrafo, derogado por art. 99 de la Ley N° 27.742 B.O. 8/7/2024. Vigencia: a partir del día siguiente al de su publicación en el Boletín Oficial de la República Argentina.)",

  /** Decreto 146/2001, art. 3: la habilitación para intimar. */
  dec146art3:
    "El trabajador quedará habilitado para remitir el requerimiento fehaciente al que se hace alusión en el artículo que se reglamenta, cuando el empleador no hubiere hecho entrega de las constancias o del certificado previstos en los apartados segundo y tercero del artículo 80 de la Ley de Contrato de Trabajo Nº 20.744 (t.o. por Decreto Nº 390/76) y sus modificatorias, dentro de los TREINTA (30) días corridos de extinguido, por cualquier causa, el contrato de trabajo.",

  /** RG ARCA 5848/2026, art. 1: cómo se confecciona hoy el certificado. */
  rg5848art1:
    "El certificado de trabajo previsto en el artículo 80 de la Ley de Contrato de Trabajo N° 20.744, texto ordenado en 1976 y sus modificaciones, será confeccionado por el empleador a través del sistema «Simplificación Registral», disponible en el sitio «web» de esta Agencia de Recaudación y Control Aduanero (https://www.arca.gob.ar) -al que se accede con «Clave Fiscal» con nivel de seguridad 2 o superior-, mediante la generación del formulario F.984 «Certificado de Trabajo Artículo 80 - LCT».",
} as const;

/** Las tres formas de cumplir que enumera el art. 80 vigente. */
export const FORMAS_DE_CUMPLIR: { clave: string; titulo: string; detalle: string }[] = [
  {
    clave: "fisico",
    titulo: "En papel, en la sede de la empresa",
    detalle:
      "El certificado se imprime por duplicado desde «Simplificación Registral» y, para ser válido, lleva la firma del empleador (o su apoderado) y la del trabajador: el original queda para el trabajador y el duplicado para el empleador. La ley dice «poner a disposición»: alcanza con que esté disponible en la sede, no hace falta que se lo lleven a domicilio (art. 80 inc. a y RG 5848/2026 art. 1 inc. b).",
  },
  {
    clave: "digital",
    titulo: "En formato digital, si la entrega se puede acreditar",
    detalle:
      "Se emite electrónicamente y, según ARCA, la validación de identidad del empleador al entrar con Clave Fiscal alcanza: el certificado digital NO necesita firma digital. El trabajador lo ve en el servicio «Trabajo en Blanco» del sitio de ARCA (art. 80 inc. b y RG 5848/2026 art. 1 inc. a y art. 4).",
  },
  {
    clave: "arca",
    titulo: "Con la información ya publicada por el organismo",
    detalle:
      "Es la novedad más fuerte del texto nuevo: cuando los datos que el artículo exige ya están disponibles para el trabajador en el sitio del organismo de la seguridad social o en el sistema que fije ARCA, la obligación se considera cumplida respecto de los certificados alcanzados por esa información. Es decir: parte del deber se satisface sin que el empleador entregue nada.",
  },
];

/** Lo que el trabajador puede sacar por su cuenta en «Trabajo en Blanco» (RG 3676, texto según RG 5848/2026). */
export const EN_TRABAJO_EN_BLANCO: string[] = [
  "La «Constancia del Trabajador» con su situación registral: altas, bajas y modificaciones informadas por sus empleadores.",
  "El «Certificado Digital de Ingresos Laborales (CDIL)» con las remuneraciones declaradas de los últimos SEIS períodos mensuales, con código QR para verificar su validez.",
  "El «Certificado de Trabajo Artículo 80 - LCT» emitido digitalmente por el empleador.",
  "El «Buzón de Observaciones», para dejar asentadas las irregularidades que detecte.",
];

export type FuenteCertificado = { nombre: string; url: string; detalle: string };

export const CERTIFICADO_FUENTES: { consultadoEl: string; lista: FuenteCertificado[] } = {
  consultadoEl: "2026-08-17",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 80 con el texto sustituido por el art. 25 de la Ley 27.802: plazo de 45 días hábiles, las tres formas de cumplir y la remisión a ARCA. En este texto ya no aparece la frase «tres veces la mejor remuneración»: se buscó en la norma completa y no está en ningún artículo.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó el art. 80 (su art. 25). Vigencia: desde la publicación, sin efecto retroactivo — por eso la fecha de extinción del contrato decide qué régimen se aplica.",
    },
    {
      nombre: "Resolución General ARCA 5848/2026 — B.O. 18/5/2026 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/425000-429999/425871/norma.htm",
      detalle:
        "La reglamentación: el certificado se confecciona con el F. 984 desde «Simplificación Registral», en formato digital (sin firma digital) o físico por duplicado, y el trabajador lo obtiene en «Trabajo en Blanco». Abroga la RG 2.316 y deroga el Título III de la RG 5.250.",
    },
    {
      nombre: "Ley 25.345 — texto original, art. 45 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/65015/norma.htm",
      detalle:
        "El artículo que agregó al art. 80 el último párrafo con la indemnización de tres veces la mejor remuneración mensual, normal y habitual. Es la fuente del número que toda la web sigue publicando.",
    },
    {
      nombre: "Ley 25.345 — texto actualizado, art. 45 derogado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/65015/texact.htm",
      detalle:
        "Hoy el art. 45 no muestra texto: sólo la nota «Artículo derogado por art. 99 de la Ley N° 27.742 B.O. 8/7/2024. Vigencia: a partir del día siguiente al de su publicación».",
    },
    {
      nombre: "Decreto 146/2001 — reglamentación de los arts. 43, 44 y 45 de la Ley 25.345 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/65000-69999/66116/norma.htm",
      detalle:
        "Su art. 3 es el que exige esperar 30 días corridos desde la extinción antes de mandar el requerimiento fehaciente. Sin ese paso, la intimación era prematura y la sanción no procedía.",
    },
    {
      nombre: "Ley 27.399 — feriados nacionales (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/280000-284999/281835/norma.htm",
      detalle:
        "El calendario con el que se descuentan los días no hábiles del plazo de 45 días. El art. 80 dice «días hábiles» pero no define el calendario: por eso la página muestra los días que salteó.",
    },
  ],
};
