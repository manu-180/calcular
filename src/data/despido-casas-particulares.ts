// LIQUIDACIÓN FINAL DEL PERSONAL DE CASAS PARTICULARES — Ley 26.844, con el texto vigente.
// Arts. 7 (período de prueba, sustituido por el art. 107 de la Ley 27.802), 28 (SAC proporcional),
// 29/30 (vacaciones), 42 a 45 (preaviso) y 46 a 49 (extinción e indemnización).
//
// POR QUÉ ESTE ARCHIVO EXISTE (20/8/2026, s89). El mapeo de la Ley 27.802 que veníamos usando
// cubría UN solo título: el de la LCT. La ley tiene **26 títulos y 218 artículos**, y su Título X
// reescribió cuatro artículos de la Ley 26.844 — el régimen del personal de casas particulares,
// donde ya teníamos tres calculadoras en vivo. Dos de esos cambios dan vuelta la respuesta a las
// preguntas más buscadas del régimen, y los dos siguen publicados al revés en toda la web:
//
//   1. **EL PERÍODO DE PRUEBA PASÓ DE 30 (o 15) DÍAS A SEIS MESES.** El texto original del art. 7
//      decía: «se entenderá celebrado a prueba durante los primeros **treinta (30) días** de su
//      vigencia respecto del personal **sin retiro**; y durante los primeros **quince (15) días**
//      de trabajo en tanto no supere los **tres (3) meses** para el personal **con retiro**». El
//      art. 107 de la Ley 27.802 lo sustituyó por un plazo único: «durante los primeros **seis (6)
//      meses** de vigencia», sin distinguir modalidad. Para el personal sin retiro es **seis veces
//      más**; para el personal con retiro, según cómo se contara, hasta doce. Dentro de ese lapso
//      cualquiera de las partes extingue «sin expresión de causa y sin generarse derecho a
//      indemnización alguna». La palabra «alguna» tampoco estaba antes.
//
//   2. **LA LCT DEJÓ DE APLICARSE SUPLETORIAMENTE.** Este no está en el Título X sino en el art. 1º
//      de la misma ley, que sustituyó el art. 2° de la LCT. Hasta el 5/3/2026 el inciso b) decía
//      —con el texto que le había puesto el art. 72 de la propia Ley 26.844— que la LCT no se
//      aplica al personal de casas particulares «**sin perjuicio que las disposiciones de la
//      presente ley serán de aplicación en todo lo que resulte compatible** y no se oponga a la
//      naturaleza y modalidades propias del régimen específico». El texto vigente dice: «**con la
//      sola excepción de aquellas normas que el régimen de la Ley (…) N° 26.844 (…) expresamente
//      declare aplicables**». La regla se invirtió: de «se aplica salvo incompatibilidad» a «no se
//      aplica salvo remisión expresa». Y la prueba de que fue deliberado está en el inciso de al
//      lado: el c), de los trabajadores agrarios, **conserva** la fórmula vieja («de aplicación
//      supletoria en todo lo que resulte compatible»).
//
// LA CONSECUENCIA QUE NADIE PUBLICA, Y QUE ESTA PÁGINA MARCA COMO ABIERTA: la Ley 26.844 **no
// tiene** un artículo equivalente al 156 de la LCT (indemnización por vacaciones no gozadas al
// extinguirse el contrato). La expresión «no gozada» no aparece en toda la norma. Hasta el
// 5/3/2026 ese hueco se llenaba con la LCT por vía supletoria; desde el 6/3/2026 esa vía dice
// «salvo remisión expresa», y la 26.844 no remite. No se afirma acá cómo se resuelve —es materia
// que van a discutir los tribunales—: se muestran los dos textos, se calcula el proporcional como
// se venía liquidando, y se avisa que el fundamento cambió. Publicar una certeza que la ley no
// tiene sería exactamente lo que esta página vino a corregir.
//
// LO QUE NO CAMBIÓ, y conviene no romper: el preaviso del art. 42 (10 días por la empleada; 10
// días si la antigüedad es menor a un año y 30 si es mayor, por el empleador), la integración del
// mes del art. 44, y la indemnización por antigüedad del art. 48 — un mes de sueldo por año o
// fracción mayor de tres meses, con piso de un mes y **sin ningún tope**, a diferencia del art.
// 245 de la LCT. El Título X de la Ley 27.802 tocó sólo los arts. 7, 14, 20 y 70.
//
// FUENTES leídas el 20/8/2026, todas en InfoLEG:
//   · Ley 26.844 texto actualizado (id 210489) y texto original (id 210489, norma.htm).
//   · Ley 27.802 (id 423680) — su art. 1º (nuevo art. 2° LCT) y su Título X (arts. 107 a 110).
//   · LCT texto actualizado (id 25552) — art. 2° inc. b) y c).

/** B.O. de la Ley 27.802. La reforma no es retroactiva: rige por fecha de egreso. */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Art. 7 vigente (art. 107 de la Ley 27.802): período de prueba único de 6 meses. */
export const PRUEBA_MESES_VIGENTE = 6;

/** Art. 7 original: 30 días para el personal SIN retiro. */
export const PRUEBA_DIAS_ANTERIOR_SIN_RETIRO = 30;

/** Art. 7 original: 15 días de trabajo para el personal CON retiro… */
export const PRUEBA_DIAS_ANTERIOR_CON_RETIRO = 15;

/** …«en tanto no supere los tres (3) meses». */
export const PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO = 3;

/** Art. 42 inc. b): preaviso del empleador según antigüedad. */
export const PREAVISO = {
  diasHastaUnAnio: 10,
  diasDesdeUnAnio: 30,
  /** Art. 42 inc. a): el que debe dar la empleada/o. */
  diasDeLaEmpleada: 10,
} as const;

/** Art. 48: un mes de sueldo por año de servicio o fracción mayor de tres meses. */
export const FRACCION_MESES_ART48 = 3;

/** Art. 48: «En ningún caso la indemnización podrá ser menor a un (1) mes de sueldo». */
export const PISO_MESES_ART48 = 1;

/** Art. 30: un día de descanso por cada veinte de trabajo efectivo, si no se llega a los 6 meses. */
export const DIAS_TRABAJO_POR_DIA_DESCANSO = 20;

/** Divisor para pasar del sueldo mensual al día. Aritmética, no un número legal. */
export const DIVISOR_DIA = 30;

/** Art. 29: escala de la licencia ordinaria, por antigüedad al 31 de diciembre. */
export const VACACIONES_ESCALA: { hastaAnios: number | null; dias: number; desdeAnios: number }[] = [
  { desdeAnios: 0, hastaAnios: 5, dias: 14 },
  { desdeAnios: 5, hastaAnios: 10, dias: 21 },
  { desdeAnios: 10, hastaAnios: 20, dias: 28 },
  { desdeAnios: 20, hastaAnios: null, dias: 35 },
];

/**
 * Citas textuales, enteras a propósito: son el ancla contra la que `check_despido_casas.ts`
 * verifica que la página no derive hacia un resumen, y la prueba palabra por palabra de las dos
 * inversiones del 6/3/2026.
 */
export const DESPIDO_CASAS_TEXTOS = {
  art7Vigente:
    "Período de prueba. El contrato de trabajo por tiempo indeterminado se entenderá celebrado a prueba durante los primeros seis (6) meses de vigencia. Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa y sin generarse derecho a indemnización alguna con motivo de la extinción. El empleador no podrá contratar a un mismo empleado más de una (1) vez utilizando el período de prueba.",
  art7Anterior:
    "Período de prueba. El contrato regulado por esta ley se entenderá celebrado a prueba durante los primeros treinta (30) días de su vigencia respecto del personal sin retiro; y durante los primeros quince (15) días de trabajo en tanto no supere los tres (3) meses para el personal con retiro. Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa y sin generarse derecho a indemnización con motivo de la extinción. El empleador no podrá contratar a una misma empleada/o más de una (1) vez utilizando el período de prueba.",
  notaVigencia7:
    "(Artículo sustituido por art. 107 de la Ley N° 27.802 B.O. 06/03/2026. Vigencia: a partir de su publicación en el Boletín Oficial)",
  lctArt2IncBVigente:
    "Al personal de casas particulares, con la sola excepción de aquellas normas que el régimen de la Ley del Régimen Especial de Contrato de Trabajo para el Personal de Casas Particulares N° 26.844 y sus modificaciones expresamente declare aplicables;",
  lctArt2IncBAnterior:
    "Al personal de casas particulares, sin perjuicio que las disposiciones de la presente ley serán de aplicación en todo lo que resulte compatible y no se oponga a la naturaleza y modalidades propias del régimen específico o cuando así se lo disponga expresamente.",
  lctArt2IncCVigente:
    "A los trabajadores agrarios, sin perjuicio de que las disposiciones de la presente ley serán de aplicación supletoria en todo lo que resulte compatible y no se oponga a la naturaleza y modalidades propias del Régimen Nacional de Trabajo Agrario;",
  art42:
    "Deber de preavisar. Plazos. El contrato de trabajo regulado por esta ley no podrá ser disuelto por voluntad de una de las partes sin aviso previo, o en su defecto, el pago de una indemnización cuando el contrato se disuelva por voluntad del empleador, además de la que corresponda a la empleada/o por su antigüedad en el empleo. El preaviso deberá darse con la anticipación siguiente: a) Por la empleada/o de diez (10) días; b) Por el empleador, de diez (10) días cuando la antigüedad en el servicio fuere inferior a un (1) año y de treinta (30) días cuando fuere superior.",
  art44:
    "Plazo. Integración del mes de despido. Los plazos a que se refiere el artículo 42 correrán a partir del primer día del mes siguiente al de la notificación del preaviso. En caso de que el empleador dispusiese el despido sin preaviso y en fecha que no fuere la del último día del mes, la indemnización sustitutiva del preaviso se integrará además con una suma equivalente a los salarios que hubiere debido abonar hasta la finalización del mes en que se produjo el despido.",
  art45:
    "Licencia. Durante el plazo de preaviso el personal sin retiro gozará de diez (10) horas semanales remuneradas para buscar nueva ocupación, que se otorgarán del modo que mejor se compadezca con lo esencial de las tareas.",
  art48:
    "Indemnización por antigüedad o despido. En los casos de despido dispuesto por el empleador sin causa, habiendo o no mediado preaviso, éste deberá abonar a la empleada/o una indemnización equivalente a un (1) mes de sueldo por cada año de servicio o fracción mayor de tres (3) meses, tomando como base la mejor remuneración, mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor. En ningún caso la indemnización podrá ser menor a un (1) mes de sueldo calculado sobre la base de lo expresado en el párrafo anterior.",
  art28:
    "Extinción del contrato. Pago proporcional. Cuando se opere la extinción del contrato de trabajo por cualquier causa, la empleada/o o sus derecho-habientes, tendrán derecho a percibir la parte proporcional del sueldo anual complementario devengada en el respectivo semestre.",
  art26:
    "Concepto. El sueldo anual complementario consiste en el cincuenta por ciento (50%) de la mayor remuneración mensual devengada, por todo concepto, dentro de los semestres que culminan en los meses de junio y diciembre de cada año.",
  art30:
    "Requisitos para su goce. Comienzo de la licencia. Para tener derecho cada año al período de licencia establecido precedentemente, la trabajadora/or deberá haber prestado servicios durante seis (6) meses del año calendario o aniversario respectivo con la regularidad propia del tiempo diario y semanal de trabajo correspondiente a la modalidad de prestación contratada. En su defecto, gozará de un período de descanso anual, en proporción de un día de descanso por cada veinte (20) días de trabajo efectivo, que serán gozados en días corridos.",
  art49:
    "Despido indirecto. En los casos en que la empleada/o denunciare el contrato de trabajo con justa causa tendrá derecho a las indemnizaciones previstas en los artículos 43, 44 y 48 de esta ley.",
  art20Vigente:
    "Recibos. Formalidad. Constancias bancarias. Prueba de pago. El recibo deberá ser instrumentado de forma electrónica, emitido por el sistema que determine la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía. La documentación obrante en el banco o la constancia que éste entregare al empleador constituirá prueba suficiente del hecho de pago.",
  art70Vigente:
    "Actualización. Tasa aplicable. Los créditos demandados provenientes de las relaciones laborales reguladas por la presente ley serán actualizados y devengarán intereses en los mismos términos y condiciones previstas en el artículo 276 de la Ley de Contrato de Trabajo Nº 20.744 (t.o. 1976) y sus modificaciones, resultando igualmente de aplicación las normas contenidas en los artículos 277 y 278 de la citada ley y el artículo 55 de la ley de Modernización Laboral.",
} as const;

/** Los cuatro artículos de la Ley 26.844 que reescribió el Título X de la Ley 27.802. */
export const CAMBIOS_TITULO_X: { articulo: string; tema: string; queCambio: string }[] = [
  {
    articulo: "art. 7",
    tema: "Período de prueba",
    queCambio:
      "De 30 días (personal sin retiro) y 15 días con tope de 3 meses (con retiro) a un plazo único de 6 meses para las dos modalidades. Es el cambio que más plata mueve del Título X.",
  },
  {
    articulo: "art. 14",
    tema: "Derechos y deberes comunes",
    queCambio:
      "Se admite la distribución semanal desigual de la jornada hasta 9 horas diarias; la ropa y los elementos de trabajo, cumplido el período de prueba, pueden reemplazarse por una suma dineraria no remunerativa; y se escribe la pausa de 12 horas entre jornadas para el personal con retiro que trabaja para un mismo empleador.",
  },
  {
    articulo: "art. 20",
    tema: "Recibo de sueldo",
    queCambio:
      "El recibo pasa a ser obligatoriamente electrónico, emitido por el sistema que determine ARCA. La constancia del banco es prueba suficiente del pago.",
  },
  {
    articulo: "art. 70",
    tema: "Actualización de los créditos",
    queCambio:
      "Los créditos laborales del régimen se actualizan y devengan intereses en los mismos términos del art. 276 de la LCT — la misma regla que rige para el resto de los trabajadores.",
  },
];

export type FuenteDespidoCasas = { nombre: string; url: string; detalle: string };

export const DESPIDO_CASAS_FUENTES: {
  consultadoEl: string;
  lista: FuenteDespidoCasas[];
} = {
  consultadoEl: "2026-08-20",
  lista: [
    {
      nombre: "Ley 26.844 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/texact.htm",
      detalle:
        "Art. 7 con el texto del art. 107 de la Ley 27.802 y su nota de vigencia, y los arts. 26 y 28 (aguinaldo y su proporcional), 29 y 30 (vacaciones), 42 a 45 (preaviso, indemnización sustitutiva, integración del mes y las 10 horas semanales para buscar trabajo), 48 (indemnización por antigüedad) y 49 (despido indirecto).",
    },
    {
      nombre: "Ley 26.844 — texto original (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/210000-214999/210489/norma.htm",
      detalle:
        "El art. 7 como rigió desde 2013 hasta el 5 de marzo de 2026: 30 días para el personal sin retiro y 15 días —con tope de 3 meses— para el personal con retiro. Es la prueba palabra por palabra de cuánto se estiró el período de prueba. Su art. 72 es además el que había escrito el inciso b) del art. 2° de la LCT.",
    },
    {
      nombre: "Ley 27.802 — Ley de Modernización Laboral (B.O. 6/3/2026)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Su Título X (arts. 107 a 110) reescribió los arts. 7, 14, 20 y 70 de la Ley 26.844. Y su art. 1º, en otro título, sustituyó el art. 2° de la LCT: es el que cambió la regla de aplicación supletoria.",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 2°: el inciso b) vigente limita la aplicación de la LCT al personal de casas particulares a «aquellas normas que el régimen de la Ley (…) N° 26.844 (…) expresamente declare aplicables». El inciso c), de los trabajadores agrarios, conserva la fórmula anterior de aplicación supletoria: el contraste es la prueba de que el cambio del inciso b) fue deliberado.",
    },
  ],
};
