// Caducidad de instancia en el juicio laboral: el art. 46 de la Ley 18.345 después de la reforma.
//
// Art. 46 de la Ley 18.345 (t.o. Decreto 106/98), sustituido por el art. 82 de la Ley 27.802
// (B.O. 6/3/2026). Leído el 28/8/2026 en el texto oficial de InfoLEG (id 45628) y contrastado
// contra la captura del 1/2/2026 del mismo texto (Internet Archive).
//
// POR QUÉ ESTE ARCHIVO EXISTE (28/8/2026, s97). El Título III de la Ley 27.802 (arts. 78 a 94)
// figuraba «sin auditar». Adentro estaba el cambio procesal más grande de la reforma, y es de los
// que no dejan un vacío sino que **invierten la regla y la escriben al revés** (regla de s83):
//
//   ANTES  → «ARTÍCULO 46. — Impulso de oficio. El procedimiento será impulsado de oficio por los
//            jueces, con excepción de la prueba informativa. Este impulso de oficio cesará en
//            oportunidad de practicarse la liquidación (…)».
//   AHORA  → «ARTÍCULO 46. — Impulso del proceso. El procedimiento será impulsado por las partes.
//            Se producirá la caducidad de instancia cuando no se instare su curso dentro de los
//            siguientes plazos, SIN NECESIDAD DE INTIMACIÓN PREVIA (…)».
//
// Hasta el 5/3/2026 el fuero laboral nacional se impulsaba **de oficio**: un expediente parado no
// se caía. Desde el 6/3/2026 se impulsa por las partes y **caduca solo**, sin intimación previa.
// Hasta el epígrafe del artículo cambió. Y el art. 93 de la reforma lo aplica «a todos los
// procesos EN TRÁMITE a partir del día siguiente al de la publicación», o sea que alcanza a
// expedientes iniciados bajo la regla contraria.
//
// LO QUE LA LEY NO DICE Y ESTA PÁGINA NO INVENTA: desde cuándo se cuenta el plazo en un
// expediente cuyo último acto de impulso es ANTERIOR al 6/3/2026. El art. 93 fija la aplicación a
// los procesos en trámite, pero no el punto de partida del cómputo en esos casos. Las dos lecturas
// razonables —contar desde el último acto, o contar desde la entrada en vigencia— dan fechas muy
// distintas, así que la calculadora muestra las dos y dice que la ley no elige.
//
// FUENTES: sólo texto oficial. Nunca una nota de prensa.

/** Fecha de publicación de la Ley 27.802 en el Boletín Oficial. */
export const PUBLICACION_ISO = "2026-03-06";
export const PUBLICACION = "6 de marzo de 2026";

/** Art. 93: las modificaciones se aplican «a partir del día siguiente al de la publicación». */
export const APLICACION_ISO = "2026-03-07";
export const APLICACION = "7 de marzo de 2026";

export type TipoInstancia = {
  id: string;
  etiqueta: string;
  /** Plazo de caducidad en meses, según los tres incisos del art. 46. */
  meses: number;
  inciso: string;
  detalle: string;
};

export const INSTANCIAS: TipoInstancia[] = [
  {
    id: "primera",
    etiqueta: "Primera o única instancia",
    meses: 6,
    inciso: "1",
    detalle:
      "El juicio ordinario laboral típico. La instancia se abre con la promoción de la demanda —aunque todavía no se haya notificado la resolución que dispone su traslado— y termina con el dictado de la sentencia.",
  },
  {
    id: "segunda",
    etiqueta: "Segunda instancia (Cámara)",
    meses: 3,
    inciso: "2",
    detalle: "El mismo inciso que agrupa al sumarísimo, al ejecutivo, a las ejecuciones especiales y a los incidentes.",
  },
  {
    id: "sumarisimo",
    etiqueta: "Juicio sumarísimo (cualquier instancia)",
    meses: 3,
    inciso: "2",
    detalle:
      "Incluye el proceso sumarísimo del art. 498 del CPCCN al que remiten, por ejemplo, la tutela sindical y la acción por negarse a negociar de buena fe.",
  },
  {
    id: "ejecutivo",
    etiqueta: "Juicio ejecutivo y ejecuciones especiales",
    meses: 3,
    inciso: "2",
    detalle: "En cualquiera de las instancias, según el texto del inciso.",
  },
  {
    id: "incidente",
    etiqueta: "Incidentes",
    meses: 3,
    inciso: "2",
    detalle: "Cualquier incidente, salvo el de caducidad de instancia, que tiene su propio plazo.",
  },
  {
    id: "incidente-caducidad",
    etiqueta: "Incidente de caducidad de instancia",
    meses: 1,
    inciso: "3",
    detalle:
      "El plazo más corto de los tres: un mes. Es el incidente que se abre para pedir que se declare la caducidad.",
  },
];

/** Citas textuales, de los dos textos. */
export const TEXTOS = {
  antes:
    "ARTÍCULO 46. — Impulso de oficio. El procedimiento será impulsado de oficio por los jueces, con excepción de la prueba informativa. Este impulso de oficio cesará en oportunidad de practicarse la liquidación, una vez recibidos los autos de la Cámara o consentida o ejecutoriada la sentencia.",
  ahora:
    "ARTÍCULO 46. — Impulso del proceso. El procedimiento será impulsado por las partes. Se producirá la caducidad de instancia cuando no se instare su curso dentro de los siguientes plazos, sin necesidad de intimación previa: 1) De seis (6) meses, en primera o única instancia. 2) De tres (3) meses, en segunda instancia y en cualquiera de las instancias en el juicio sumarísimo, en el juicio ejecutivo, en las ejecuciones especiales y en los incidentes. 3) De un (1) mes, en el incidente de caducidad de instancia. La instancia se abre con la promoción de la demanda aunque no hubiere sido notificada la resolución que dispone su traslado y termina con el dictado de la sentencia.",
  aplicacion:
    "Las modificaciones introducidas por el presente Título serán de aplicación a todos los procesos en trámite a partir del día siguiente al de la publicación de la presente ley en el Boletín Oficial, con excepción de lo dispuesto en los artículos 79 y 80 de la presente ley.",
  aplicacionCompetencia:
    "Las modificaciones introducidas por los artículos 79 y 80 de la presente ley serán de aplicación a partir del día siguiente al de la publicación de la presente ley en el Boletín Oficial y en aquellos procesos en trámite en los que la competencia estuviere pendiente de resolución.",
  precedentes:
    "Los jueces que resuelvan causas de índole laboral deberán, de forma obligatoria, adecuar sus decisiones a los precedentes establecidos por la Corte Suprema de Justicia de la Nación en la materia. El apartamiento infundado de los magistrados respecto de dichos criterios configurará una causal de mal desempeño en sus funciones.",
  apelacionesDiferidas:
    "Artículo 110: Apelaciones anteriores a la sentencia. Salvo el caso del artículo 146, los supuestos vinculados a la competencia del tribunal, la falta de legitimación pasiva y activa, y los de medidas cautelares, todas las apelaciones interpuestas aún en juicios prima facie inapelables, se tendrán presentes con efecto diferido hasta el momento en que se haya puesto fin al proceso de conocimiento, en primera instancia, con la sentencia definitiva.",
  plenarios:
    "Artículo 124: Dictado de fallos plenarios. Prohibiciones. En materia de fallos plenarios, regirán las disposiciones del Código Procesal Civil y Comercial de la Nación. Los criterios de aplicación obligatoria o sugerida para la resolución de aspectos concernientes a las causas judiciales, no podrán ser establecidos por otro instrumento que no sea sentencia plenaria.",
  competenciaEstadoNacional:
    "En los casos que versen sobre la materia establecida en el párrafo anterior y a su vez sea parte o tercero interesado el Estado nacional —Poder Ejecutivo nacional, Poder Legislativo, Poder Judicial, Ministerio Público—, incluyendo los entes previstos en el artículo 8°, inciso a), de la ley 24.156 y sus modificaciones, serán competentes el fuero Contencioso Administrativo Federal de la Ciudad Autónoma de Buenos Aires y, en las demás jurisdicciones, la Justicia Federal con competencia en lo contencioso administrativo. En ningún caso la Justicia Nacional del Trabajo podrá expedirse en las causas aquí comprendidas.",
  rebeldia:
    "Si el demandado debidamente citado no contestare la demanda en el plazo previsto en el artículo 68 será declarado rebelde, presumiéndose como ciertos los hechos expuestos en ella, salvo prueba en contrario.",
} as const;

/** El Título III completo, artículo por artículo. El veredicto también se publica. */
export type CambioProcesal = {
  art: string;
  toca: string;
  titulo: string;
  detalle: string;
};

export const CAMBIOS_TITULO_III: CambioProcesal[] = [
  {
    art: "78",
    toca: "art. 18",
    titulo: "Peritos médicos y psicólogos",
    detalle:
      "Exige que los peritos médicos y psicólogos sean profesionales legistas o especialistas en la rama que corresponda al objeto de la pericia.",
  },
  {
    art: "79",
    toca: "art. 20",
    titulo: "Competencia por materia: el Estado nacional sale del fuero laboral",
    detalle:
      "Cuando el Estado nacional —Ejecutivo, Legislativo, Judicial o Ministerio Público, incluidos los entes del art. 8° inc. a) de la Ley 24.156— es parte o tercero interesado, la causa va al Contencioso Administrativo Federal (o a la Justicia Federal contencioso administrativa en el resto del país). El artículo lo cierra con una frase que no deja margen: «En ningún caso la Justicia Nacional del Trabajo podrá expedirse en las causas aquí comprendidas», y da por modificada toda norma que le asigne esa competencia.",
  },
  {
    art: "80",
    toca: "art. 24",
    titulo: "Competencia territorial",
    detalle:
      "A elección del demandante: el juez del lugar de trabajo, el de celebración del contrato o el del domicilio del empleador. En las causas por cobro de aportes, contribuciones o cuotas iniciadas por asociaciones profesionales, el juez del domicilio del demandado. En las de riesgos del trabajo (Leyes 24.557 y 27.348) se está a la competencia territorial de esas leyes.",
  },
  {
    art: "81",
    toca: "art. 26",
    titulo: "Recusación y excusación",
    detalle:
      "Remite en bloque al Código Procesal Civil y Comercial de la Nación para recusaciones con y sin expresión de causa y excusaciones de jueces, secretarios, árbitros y peritos.",
  },
  {
    art: "82",
    toca: "art. 46",
    titulo: "Del impulso de oficio a la caducidad de instancia",
    detalle:
      "El cambio más grande del Título, y el que esta página calcula. El procedimiento pasó de impulsarse de oficio por los jueces a impulsarse por las partes, con caducidad de instancia de 6, 3 o 1 mes y sin necesidad de intimación previa.",
  },
  {
    art: "83",
    toca: "art. 65, inc. 8)",
    titulo: "La demanda debe mencionar los medios de prueba",
    detalle:
      "Inciso nuevo: hay que mencionar los medios de prueba que se intenten hacer valer y presentar los documentos que se tengan; si no se los tiene, individualizarlos indicando su contenido y en poder de quién o en qué archivo u oficina están.",
  },
  {
    art: "84",
    toca: "art. 71",
    titulo: "Contestación de la demanda y rebeldía",
    detalle:
      "Ajusta la contestación al art. 65 de la ley y al art. 356 del CPCCN, da traslado de la documentación al actor —que tiene tres días para reconocerla o desconocerla— y establece que el demandado citado que no contesta es declarado rebelde, «presumiéndose como ciertos los hechos expuestos» en la demanda, salvo prueba en contrario. También manda tener por enderezada la acción cuando hay discordancia entre los datos del demandado y los de quien contesta, salvo oposición expresa del actor.",
  },
  {
    art: "85",
    toca: "art. 76",
    titulo: "Excepciones previas y prescripción",
    detalle:
      "Remite al CPCCN y exige ofrecer toda la prueba de la excepción junto con su oposición. Y fija una condición para la prescripción: para que se resuelva de previo y especial pronunciamiento, no debe requerir producción de prueba.",
  },
  {
    art: "86",
    toca: "art. 108, inc. d)",
    titulo: "Se puede apelar el rechazo de la incompetencia y de la falta de legitimación",
    detalle:
      "Inciso nuevo en la lista de sentencias apelables: las que rechazan excepciones de incompetencia y de falta de legitimación pasiva y activa.",
  },
  {
    art: "87",
    toca: "art. 110",
    titulo: "Casi todas las apelaciones previas a la sentencia quedan diferidas",
    detalle:
      "Regla general: las apelaciones anteriores a la sentencia se tienen presentes con efecto diferido hasta que la sentencia definitiva ponga fin al proceso de conocimiento en primera instancia — «aún en juicios prima facie inapelables». Las excepciones son cuatro: el caso del art. 146, la competencia del tribunal, la falta de legitimación pasiva y activa, y las medidas cautelares. Se lee junto con el art. 86: lo que quedó apelable de inmediato es exactamente lo que ese inciso agregó.",
  },
  {
    art: "88",
    toca: "art. 124",
    titulo: "Fallos plenarios: sólo por sentencia plenaria",
    detalle:
      "Remite al CPCCN y agrega una prohibición: los criterios de aplicación obligatoria o sugerida para resolver aspectos de las causas «no podrán ser establecidos por otro instrumento que no sea sentencia plenaria».",
  },
  {
    art: "89",
    toca: "artículo propio",
    titulo: "Los precedentes de la Corte pasan a ser obligatorios",
    detalle:
      "Los jueces laborales deben adecuar «de forma obligatoria» sus decisiones a los precedentes de la Corte Suprema en la materia, y el apartamiento infundado «configurará una causal de mal desempeño en sus funciones». No modifica ninguna norma previa: es un artículo autónomo de la reforma.",
  },
  {
    art: "90 a 92",
    toca: "artículos propios",
    titulo: "El traspaso del fuero laboral nacional a la Ciudad de Buenos Aires",
    detalle:
      "El art. 90 aprueba el Acuerdo de Transferencia de la Función Judicial en Materia Laboral del ámbito nacional a la Justicia del Trabajo de la Ciudad Autónoma de Buenos Aires; el 91 encomienda al Ejecutivo transferir los recursos garantizando el funcionamiento transitorio de la Justicia Nacional del Trabajo; y el 92 mantiene la vigencia de la Ley 18.345 hasta que ese proceso de transferencia concluya.",
  },
  {
    art: "93 y 94",
    toca: "artículos propios",
    titulo: "Todo esto se aplica a los procesos ya en trámite",
    detalle:
      "El art. 93 aplica el Título entero «a todos los procesos en trámite a partir del día siguiente al de la publicación», con la sola excepción de los arts. 79 y 80. Esos dos —competencia por materia y territorial— van por el art. 94: rigen desde la misma fecha, pero sólo en los procesos en trámite «en los que la competencia estuviere pendiente de resolución».",
  },
];

export type Fuente = { nombre: string; url: string; detalle: string };

export const FUENTES: { consultadoEl: string; lista: Fuente[] } = {
  consultadoEl: "2026-08-28",
  lista: [
    {
      nombre: "Ley 18.345 (t.o. Decreto 106/98) — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/45000-49999/45628/texact.htm",
      detalle:
        "El texto vigente del art. 46, con los tres plazos de caducidad y la nota que lo atribuye al art. 82 de la Ley 27.802 —incluida la remisión expresa «Aplicación: Ver art. 93 de la norma de referencia»—. También los arts. 20, 24, 26, 65, 71, 76, 108, 110 y 124 en su redacción vigente.",
    },
    {
      nombre: "Ley 18.345 — el mismo texto oficial, capturado el 1/2/2026 (Internet Archive)",
      url: "https://web.archive.org/web/20260201/https://servicios.infoleg.gob.ar/infolegInternet/anexos/45000-49999/45628/texact.htm",
      detalle:
        "La versión que rigió hasta el 5/3/2026. Es la que prueba que el artículo se llamaba «Impulso de oficio» y decía que el procedimiento «será impulsado de oficio por los jueces»: sin ese contraste, el cambio se lee como una reglamentación de plazos y no como la inversión de la regla que es.",
    },
    {
      nombre: "Ley 27.802 — texto oficial, Título III (arts. 78 a 94)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Los diecisiete artículos del Título, incluidos el art. 89 (precedentes obligatorios de la Corte), los arts. 90 a 92 (traspaso del fuero a la CABA) y los arts. 93 y 94, que fijan la aplicación a los procesos en trámite.",
    },
  ],
};
