// Prescripción de las deudas con ARCA — Ley 11.683 (impuestos) y Ley 23.660 (obra social),
// con la reforma de la Ley 27.799 (B.O. 2/1/2026).
//
// POR QUÉ ESTE ARCHIVO EXISTE (verificado el 4/9/2026, s104): «cuándo prescribe una deuda con
// AFIP/ARCA» es una de las consultas fiscales más buscadas del país, y la respuesta que publica
// toda la web —cinco años para el inscripto, diez para el no inscripto, más la suspensión de 120
// días— quedó incompleta en enero de 2026 y nadie lo contó. La veta salió de
// `tools/ley-reformada-por.ts` (obra O-14): la Ley 27.799 es conocida como «la que subió los
// montos del Régimen Penal Tributario», y por eso su capítulo de PRESCRIPCIÓN pasó desapercibido.
//
// LOS TRES CAMBIOS QUE NADIE PUBLICÓ, todos leídos en el texto vigente:
//
//   1. **El plazo de cinco años BAJA A TRES para el contribuyente cumplidor** (art. 56 inc. a de la
//      Ley 11.683, texto según art. 30 de la Ley 27.799): si presentó la declaración jurada EN
//      TÉRMINO y, en su caso, regularizó el saldo, y ARCA no la impugna por «discrepancia
//      significativa». Es el cambio más grande al régimen de prescripción en veinte años.
//   2. **«Discrepancia significativa» dejó de ser un concepto abierto: la ley lo DEFINE** en un
//      artículo sin número incorporado a continuación del 56 (art. 31 de la Ley 27.799), con tres
//      condiciones concretas y objetivas. Sin ese artículo, el beneficio del punto 1 sería una
//      promesa que el fisco podría desactivar a discreción.
//   3. **Se DEROGÓ la suspensión de 120 días** (artículo sin número a continuación del art. 65,
//      derogado por el art. 32 de la Ley 27.799). Era el salvavidas del fisco: notificar la vista
//      dentro de los 180 días previos a la prescripción le compraba 120 días extra sobre los
//      períodos que estaban por caerse. Ya no existe — y es el caso de manual de la regla de s83:
//      una nota escrita sobre el texto viejo no queda incompleta, queda diciendo lo contrario.
//
// LA MISMA REFORMA TOCÓ LA OBRA SOCIAL: el art. 24 de la Ley 23.660 pasó de diez años a tres con
// la misma lógica (art. 35 de la Ley 27.799), pero con su propio umbral penal —el del art. 5° del
// RPT, que es POR MES— y sin la regla de inicio del cómputo que la Ley 11.683 sí tiene en su
// art. 57. Por eso acá el cómputo de fechas se ofrece SÓLO para la rama impositiva: inventarle una
// fecha de inicio a la rama de seguridad social sería publicar una certeza que la ley no da.

/** Art. 56 de la Ley 11.683 (texto art. 30 Ley 27.799) — los plazos de la rama impositiva. */
export const PLAZOS_IMPUESTOS = {
  /** inc. a) primer párrafo — inscriptos, y no inscriptos sin obligación o que regularizan. */
  inscripto: 5,
  /** inc. a) segundo párrafo — el premio al cumplidor, novedad de la Ley 27.799. */
  inscriptoCumplidor: 3,
  /** inc. b) — no inscriptos. */
  noInscripto: 10,
  /** inc. c) — créditos fiscales indebidamente acreditados, devueltos o transferidos. */
  creditosIndebidos: 5,
  /** Párrafos finales — repetición, recupero/devolución y agentes de retención y percepción. */
  repeticion: 5,
  agentesRetencion: 5,
} as const;

/** Art. 24 de la Ley 23.660 (texto art. 35 Ley 27.799) — la rama de obra social. */
export const PLAZOS_OBRA_SOCIAL = {
  general: 10,
  cumplidor: 3,
} as const;

/**
 * Umbrales del Régimen Penal Tributario (Título IX de la Ley 27.430) que la propia Ley 27.799
 * actualizó, y a los que remite la definición de discrepancia significativa.
 */
export const UMBRALES_RPT = {
  /** Art. 1° RPT — evasión simple de tributos: por cada tributo y por cada ejercicio anual. */
  tributos: 100_000_000,
  /** Art. 5° RPT — evasión simple de recursos de la seguridad social: POR CADA MES. */
  seguridadSocial: 7_000_000,
} as const;

/** Umbral porcentual de la condición i) de discrepancia significativa. */
export const UMBRAL_DISCREPANCIA = 0.15;

/** Textos verbatim. `check_prescripcion_arca.ts` verifica que nadie los "mejore". */
export const PRESCRIPCION_TEXTOS = {
  /** Ley 11.683, art. 56 inc. a) — el plazo de cinco años y su reducción a tres. */
  art56a:
    "Por el transcurso de cinco (5) años en el caso de contribuyentes inscriptos, como también en el caso de contribuyentes no inscriptos que no tengan obligación legal de inscribirse ante la Agencia de Recaudación y Control Aduanero o que, teniendo esa obligación y no habiéndola cumplido, regularicen espontáneamente su situación. Este plazo se reducirá a tres (3) años cuando el contribuyente inscripto hubiera cumplido en término con la presentación de la declaración jurada correspondiente y, en su caso, hubiera regularizado el saldo resultante, siempre que el organismo recaudador no impugne la declaración jurada presentada por detectar una discrepancia significativa entre la información declarada y la información disponible en sus sistemas o proporcionada por terceros",
  /** Ley 11.683, art. 57 — desde cuándo corre el plazo. */
  art57:
    "Comenzará a correr el término de prescripción del poder fiscal para determinar el impuesto y facultades accesorias del mismo, así como la acción para exigir el pago, desde el 1º de enero siguiente al año en que se produzca el vencimiento de los plazos generales para la presentación de declaraciones juradas e ingreso del gravamen.",
  /** Artículo s/n incorporado a continuación del 56 (art. 31 Ley 27.799), condición i). */
  discrepanciaI:
    "Si de la impugnación realizada por la Agencia de Recaudación y Control Aduanero resultare un incremento de los saldos de impuestos a favor del organismo o, en su caso, una reducción de los quebrantos impositivos o de los saldos a favor de los contribuyentes o responsables, por un porcentaje no inferior al quince por ciento (15%) respecto de lo que hubiera declarado el contribuyente.",
  /** Condición ii). */
  discrepanciaII:
    "Si la diferencia entre el impuesto declarado y el impuesto que resulte como consecuencia de la impugnación realizada por la Agencia de Recaudación y Control Aduanero supere la suma fijada en el artículo 1° del Régimen Penal Tributario, establecido por el título IX de la ley 27.430.",
  /** Condición iii). */
  discrepanciaIII:
    "Si de la impugnación realizada por el organismo recaudador con motivo de la utilización de facturas y otros documentos apócrifos, resulta un incremento del saldo de impuesto a favor del Fisco o, en su caso, una reducción de los quebrantos impositivos o de los saldos a favor de los contribuyentes o responsables.",
  /** El artículo DEROGADO: la suspensión de 120 días que todavía se publica como vigente. */
  suspension120Derogada:
    "Se suspenderá por ciento veinte (120) días el curso de la prescripción de las acciones y poderes del Fisco para determinar y exigir el pago de los impuestos regidos por la presente ley y para aplicar y hacer efectivas las multas, desde la fecha de notificación de la vista del procedimiento de determinación de oficio o de la instrucción del sumario correspondiente, cuando se tratare del o los períodos fiscales próximos a prescribir y dichos actos se notificaran dentro de los ciento ochenta (180) días corridos anteriores a la fecha en que se produzca la correspondiente prescripción.",
  /** La nota de derogación, tal como la trae InfoLEG. */
  notaDerogacion:
    "Artículo s/n derogado por art. 32 de la Ley Nº 27.799 B.O. 2/1/2026. Vigencia: a partir del día de su publicación en el Boletín Oficial.",
  /** Ley 23.660, art. 24 — la rama de obra social. */
  art24ObraSocial:
    "Las acciones para el cobro de los créditos indicados en el párrafo anterior prescribirán a los diez (10) años. El plazo establecido en el párrafo anterior se reducirá a tres (3) años cuando el contribuyente hubiera presentado en término la declaración jurada -o exteriorizado su obligación mediante liquidaciones u otros instrumentos que cumplan aquella finalidad, de corresponder-, y, en su caso, hubiera regularizado el saldo resultante, en tanto la entidad recaudadora no los impugne por detectar una discrepancia significativa entre la información declarada y aquella disponible en sus sistemas o proporcionada por terceros.",
  /** RPT art. 1° — el umbral al que remite la condición ii) de la rama impositiva. */
  rptArt1:
    "siempre que el monto evadido excediere la suma de pesos cien millones ($100.000.000) por cada tributo y por cada ejercicio anual",
  /** RPT art. 5° — el umbral de la rama de seguridad social, que es POR MES. */
  rptArt5:
    "siempre que el monto evadido excediere la suma de pesos siete millones ($7.000.000) por cada mes",
} as const;

/** Las causales de suspensión que SIGUEN vigentes (art. 65 y 66 de la Ley 11.683). */
export const SUSPENSIONES_VIGENTES = [
  {
    que: "Un año desde la intimación administrativa de pago",
    norma: "Art. 65 inc. a)",
    detalle:
      "Y si hay recurso ante el Tribunal Fiscal de la Nación, hasta 90 días después de notificada su sentencia. La intimación al deudor principal también suspende la prescripción respecto de los responsables solidarios.",
  },
  {
    que: "Un año desde la resolución condenatoria que aplica multa",
    norma: "Art. 65 inc. b)",
    detalle:
      "Respecto de la acción penal. Si la multa se recurre ante el Tribunal Fiscal, hasta 90 días después de notificada la sentencia.",
  },
  {
    que: "Mientras dure el procedimiento administrativo o judicial",
    norma: "Art. 65 inc. c)",
    detalle:
      "Alcanza a los períodos no prescriptos a la fecha de la vista, en los casos del Capítulo XIII.",
  },
  {
    que: "Desde el acto que somete las actuaciones a Conciliación Administrativa",
    norma: "Art. 65 inc. d)",
    detalle:
      "También desde el dictado de medidas cautelares que impidan determinar o intimar, y hasta 180 días después de dejarlas sin efecto.",
  },
  {
    que: "Dos años para inversionistas en empresas con beneficios promocionales",
    norma: "Art. 66",
    detalle: "Desde la intimación de pago a la empresa titular del beneficio.",
  },
] as const;

export type FuentePrescripcion = { nombre: string; url: string; detalle: string };

export const PRESCRIPCION_FUENTES: { consultadoEl: string; lista: FuentePrescripcion[] } = {
  consultadoEl: "2026-09-04",
  lista: [
    {
      nombre: "Ley 11.683 — texto actualizado, arts. 56, 57, 65 y 66 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/18771/texact.htm",
      detalle:
        "El art. 56 lleva la nota «Artículo sustituido por art. 30 de la Ley Nº 27.799 B.O. 2/1/2026»; el artículo sin número que le sigue define la discrepancia significativa (art. 31); y el artículo sin número a continuación del 65 —la suspensión de 120 días— figura DEROGADO por el art. 32 de la misma ley.",
    },
    {
      nombre: "Ley 27.799 — Régimen Penal Tributario y prescripción (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/422008/norma.htm",
      detalle:
        "B.O. 2/1/2026. Es conocida por subir los montos del Régimen Penal Tributario (su art. 1° llevó el umbral de evasión simple de $1.500.000 a $100.000.000), y por eso pasó desapercibido su capítulo de prescripción: los arts. 30, 31 y 32 reescriben el régimen de la Ley 11.683 y el art. 35 hace lo propio con la Ley 23.660.",
    },
    {
      nombre: "Ley 27.430, Título IX — Régimen Penal Tributario, arts. 1° y 5° (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/305000-309999/305262/texact.htm",
      detalle:
        "Los dos umbrales a los que remite la definición de discrepancia significativa: el art. 1° (evasión simple de tributos, $100.000.000 por tributo y por ejercicio anual) y el art. 5° (evasión simple de recursos de la seguridad social, $7.000.000 por cada mes). Ambos con la expresión sustituida por la Ley 27.799.",
    },
    {
      nombre: "Ley 23.660, art. 24 — prescripción de la deuda de obra social (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/62/texact.htm",
      detalle:
        "Los dos párrafos que el art. 35 de la Ley 27.799 incorporó: la reducción de diez años a tres para el contribuyente cumplidor y las tres condiciones de discrepancia significativa, con el umbral del art. 5° del Régimen Penal Tributario.",
    },
  ],
};
