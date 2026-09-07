// TRABAJO DE MUJERES — Título VII, Capítulo I de la Ley de Contrato de Trabajo 20.744, tras la
// DEROGACIÓN de los arts. 174, 175 y 176 por el art. 207 de la Ley 27.802 (B.O. 6/3/2026).
//
// POR QUÉ ESTE ARCHIVO EXISTE (24/8/2026, s93). Es la aplicación más limpia de dos reglas del
// taller a la vez:
//
//   1. **Regla de s83 — un artículo derogado vale más que uno sustituido.** Acá no cayó un
//      artículo suelto: cayó **el Capítulo I entero** del Título VII. El texto actualizado de
//      InfoLEG pasa del art. 176 derogado directo a «CAPÍTULO II De la protección de la
//      maternidad», que quedó **intacto**. Un capítulo vaciado y el siguiente en pie.
//   2. **Regla de s91 — los «Antecedentes Normativos» son un detector de huecos.** Los arts. 174,
//      175 y 176 **no figuran** en los Antecedentes Normativos de la LCT: llegaron sin una sola
//      modificación desde el texto ordenado por el Decreto 390/1976 hasta el 6/3/2026. Son
//      cincuenta años de notas, manuales y fallos escritos sobre un texto que hoy no existe.
//
// QUÉ DECÍAN (texto ordenado, verificado en el propio texact.htm de InfoLEG capturado antes de la
// reforma — ver TEXTOS_DEROGADOS y FUENTE_TEXTO_ANTERIOR):
//   · art. 174 — descanso de DOS HORAS al mediodía para la mujer que trabaja mañana y tarde.
//   · art. 175 — prohibición de encargarle trabajo a domicilio a la mujer ocupada en el local.
//   · art. 176 — prohibición de ocuparla en tareas penosas, peligrosas o insalubres.
//
// EL HALLAZGO QUE NO PUBLICA NADIE, Y QUE ES EL CENTRO DE LA PÁGINA: el art. 176 no terminaba en
// la prohibición. Su última oración decía «Regirá con respecto al empleo de mujeres lo dispuesto
// en el artículo 195». El art. 195 —que sigue vigente— establece que si el accidente o la
// enfermedad tienen por causa una tarea prohibida, se considera **por ese solo hecho** resultante
// de la acción u omisión del empleador, **sin admitirse prueba en contrario**. Es una presunción
// que no se puede rebatir. Al caer el art. 176 cayó también el puente: hoy el art. 195 alcanza
// sólo a quienes están comprendidos en su propio título (el VIII, trabajo de menores). Lo que se
// derogó, entonces, no fue únicamente una prohibición: fue una regla de responsabilidad.
//
// LA OTRA MITAD, QUE TAMPOCO SE PUBLICA: la misma ley que borró el art. 175 (prohibición de
// trabajo a domicilio) reescribió, en sus arts. 105 y 106, el régimen de trabajo a domicilio de
// la Ley 12.713 — registración por los sistemas de ARCA y sanciones por el Anexo II de la Ley
// 25.212. O sea: el trabajo a domicilio dejó de estar prohibido para ellas el mismo día en que se
// lo empujó al circuito formal.
//
// LO QUE NO SE INVENTA ACÁ: la derogación NO deja sin protección la jornada ni la insalubridad.
// Los topes siguen existiendo —8 h diarias y 48 semanales (art. 196 LCT, que remite a la Ley
// 11.544) y 6 h diarias / 36 semanales en tareas declaradas insalubres (art. 200)—, pero rigen
// para todo el personal por igual, no como protección especial. Y lo que estaba en el convenio
// colectivo o en el contrato individual no se borra con la ley: el art. 8 de la LCT dice que las
// convenciones con normas más favorables «serán válidas y de aplicación».
//
// FUENTE: texto actualizado de la LCT en InfoLEG (id 25552) y texto oficial de la Ley 27.802
// (id 423680), leídos el 24/8/2026. Nunca una nota de prensa.

/** Fecha desde la que rige la derogación (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que derogó los tres artículos. */
export const ARTICULO_DEROGATORIO = 207;

/** Los artículos de la LCT que quedaron derogados en este capítulo. */
export const ARTICULOS_DEROGADOS = [174, 175, 176] as const;

/** Nota de derogación, idéntica en los tres, tal como la publica InfoLEG. */
export const NOTA_DEROGACION =
  "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)";

/** Jornada máxima general: art. 196 de la LCT, que remite a la Ley 11.544. */
export const JORNADA_MAXIMA_DIARIA = 8;
export const JORNADA_MAXIMA_SEMANAL = 48;

/** Jornada máxima en tareas o condiciones DECLARADAS insalubres: art. 200 de la LCT. */
export const JORNADA_INSALUBRE_DIARIA = 6;
export const JORNADA_INSALUBRE_SEMANAL = 36;

/** Pausa mínima entre el cese de una jornada y el comienzo de la otra (arts. 197 y 198). */
export const PAUSA_ENTRE_JORNADAS = 12;

/** Recargo de la hora suplementaria en días comunes (art. 201). */
export const RECARGO_COMUN = 0.5;

/** Semanas promedio por mes (52/12). Aritmética, no un número legal. */
export const SEMANAS_POR_MES = 52 / 12;

/**
 * El texto que estuvo vigente hasta el 6/3/2026, palabra por palabra. Se guarda entero a propósito:
 * el texact.htm de hoy ya no lo muestra —sólo la nota de derogación— y es el ancla contra la que
 * check_trabajo_mujeres.ts verifica que la página no derive hacia un resumen que diga otra cosa.
 */
export const TEXTOS_DEROGADOS: {
  articulo: number;
  epigrafe: string;
  texto: string;
  loQueRigeHoy: string;
}[] = [
  {
    articulo: 174,
    epigrafe: "Descanso al mediodía",
    texto:
      "Las mujeres que trabajen en horas de la mañana y de la tarde dispondrán de un descanso de dos (2) horas al mediodía, salvo que por la extensión de la jornada a que estuviese sometida la trabajadora, las características de las tareas que realice, los perjuicios que la interrupción del trabajo pudiese ocasionar a las propias beneficiarias o al interés general, se autorizare la adopción de horarios continuos, con supresión o reducción de dicho período de descanso.",
    loQueRigeHoy:
      "No hay pausa legal obligatoria al mediodía para nadie. La distribución de las horas es facultad del empleador (art. 197) y lo único que la ley le fija como piso son los topes de jornada —8 horas diarias y 48 semanales (art. 196 y Ley 11.544)— y la pausa de doce horas entre el cese de una jornada y el comienzo de la otra (arts. 197 y 198). Si el descanso está en el convenio colectivo o en el contrato individual, sigue: el art. 8 de la LCT dice que las convenciones más favorables son válidas y de aplicación.",
  },
  {
    articulo: 175,
    epigrafe: "Trabajo a domicilio. Prohibición",
    texto:
      "Queda prohibido encargar la ejecución de trabajos a domicilio a mujeres ocupadas en algún local u otra dependencia en la empresa.",
    loQueRigeHoy:
      "La prohibición no existe más. El trabajo a domicilio se rige por la Ley 12.713, que la misma Ley 27.802 modificó en sus arts. 105 y 106: la registración se hace por los sistemas de la Agencia de Recaudación y Control Aduanero (ARCA) —y esa inscripción alcanza para cumplir el art. 7 de la Ley 24.013— y las infracciones se sancionan por el Régimen General del Anexo II de la Ley 25.212.",
  },
  {
    articulo: 176,
    epigrafe: "Tareas penosas, peligrosas o insalubres. Prohibición",
    texto:
      "Queda prohibido ocupar a mujeres en trabajos que revistan carácter penoso, peligroso o insalubre. La reglamentación determinará las industrias comprendidas en esta prohibición. Regirá con respecto al empleo de mujeres lo dispuesto en el artículo 195.",
    loQueRigeHoy:
      "No hay tareas prohibidas por razón de sexo. Lo que queda es el régimen general del art. 200: la insalubridad no existe sin declaración previa de la autoridad de aplicación, y una vez declarada la jornada no puede pasar de seis horas diarias ni de treinta y seis semanales, sin que esa reducción baje la remuneración. Y se pierde la remisión al art. 195: la presunción de responsabilidad del empleador —«por ese solo hecho», sin admitirse prueba en contrario— ya no alcanza a la mujer que se accidenta haciendo una de esas tareas.",
  },
];

/** Lo que quedó EN PIE en el mismo título, y que la página muestra al lado para que se vea el contraste. */
export const TEXTOS_VIGENTES = {
  art172:
    "Capacidad. Prohibición de trato discriminatorio. La mujer podrá celebrar toda clase de contrato de trabajo, no pudiendo consagrarse por las convenciones colectivas de trabajo, o reglamentaciones autorizadas, ningún tipo de discriminación en su empleo fundada en el sexo o estado civil de la misma, aunque este último se altere en el curso de la relación laboral. En las convenciones colectivas o tarifas de salarios que se elaboren se garantizará la plena observancia del principio de igualdad de retribución por trabajo de igual valor.",
  art173Nota:
    "Trabajo nocturno. Espectáculos públicos. (Artículo derogado por art. 26 de la Ley N° 24.013 B.O. 17/12/1991)",
  art195:
    "Accidente o enfermedad. En caso de accidente de trabajo o de enfermedad de una persona trabajadora, comprendida en el presente título, si se comprueba ser su causa alguna de las tareas prohibidas a su respecto, o efectuada en condiciones que signifiquen infracción a sus requisitos, se considerará por ese solo hecho al accidente o a la enfermedad como resultante de la acción u omisión del empleador, en los términos del artículo 1072 y concordantes del Código Civil, sin admitirse prueba en contrario.",
  art196:
    "Determinación. La extensión de la jornada de trabajo es uniforme para toda la Nación y regirá por la ley 11.544, con exclusión de toda disposición provincial en contrario, salvo en los aspectos que en el presente título se modifiquen o aclaren.",
  art197Pausa:
    "Entre el cese de una jornada y el comienzo de la otra deberá mediar una pausa no inferior a doce (12) horas.",
  art200Insalubre:
    "La jornada de trabajo en tareas o condiciones declaradas insalubres no podrá exceder de seis (6) horas diarias o treinta y seis (36) semanales. La insalubridad no existirá sin declaración previa de la autoridad de aplicación, con fundamento en dictámenes médicos de rigor científico y sólo podrá ser dejado sin efecto por la misma autoridad si desaparecieran las circunstancias determinantes de la insalubridad. La reducción de jornada no importará disminución de las remuneraciones.",
  art8:
    "Condiciones más favorables provenientes de convenciones colectivas de trabajo. Las convenciones colectivas de trabajo o laudos con fuerza de tales, que contengan normas más favorables a los trabajadores, serán válidas y de aplicación.",
} as const;

/**
 * Los dos artículos de la Ley 27.802 que reescribieron el régimen de trabajo a domicilio de la
 * Ley 12.713 el mismo día en que se derogó la prohibición del art. 175 de la LCT. Título IX de la
 * reforma, auditado el 24/8/2026 sobre el texto oficial (id 423680).
 */
export const TRABAJO_A_DOMICILIO_12713: { articulo: number; sustituye: string; que: string }[] = [
  {
    articulo: 105,
    sustituye: "art. 6° de la Ley 12.713",
    que: "La registración de quien da trabajo a domicilio pasa a hacerse por los sistemas que disponga ARCA, sin poder exigirse ningún trámite adicional ante otra autoridad, y esa inscripción alcanza para cumplir el art. 7 de la Ley 24.013.",
  },
  {
    articulo: 106,
    sustituye: "art. 31 de la Ley 12.713",
    que: "Las infracciones —no inscribirse, destruir los rótulos y marcas de la mercadería, negar sin causa la exhibición de la inscripción— se sancionan por el Régimen General de Sanciones por Infracciones Laborales del Anexo II de la Ley 25.212.",
  },
];

export type FuenteTrabajoMujeres = { nombre: string; url: string; detalle: string };

/**
 * De dónde sale el texto DEROGADO. Se declara aparte de las fuentes vivas y con nombre propio
 * porque es la única cita que no puede salir del texto actualizado: el texact.htm de hoy ya no
 * muestra esos artículos. Es la MISMA página oficial de InfoLEG, capturada por el Internet Archive
 * antes de que la reforma entrara en vigencia.
 */
export const FUENTE_TEXTO_ANTERIOR = {
  capturaDel: "2025-12-15",
  urlArchivada:
    "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  urlOriginal:
    "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  detalle:
    "Captura del texto actualizado oficial de la LCT tomada el 15/12/2025, o sea antes del 6/3/2026. Los epígrafes y el texto de los arts. 174, 175 y 176 se cruzaron además contra el texto original de la Ley 20.744 (norma.htm del mismo id), donde los mismos artículos llevan la numeración anterior al ordenamiento del Decreto 390/1976: arts. 190 (descanso al mediodía), 191 (trabajo a domicilio) y 192 (tareas penosas). Coinciden palabra por palabra.",
} as const;

export const TRABAJO_MUJERES_FUENTES: {
  consultadoEl: string;
  lista: FuenteTrabajoMujeres[];
} = {
  consultadoEl: "2026-08-24",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 174, 175 y 176 con la nota de derogación por el art. 207 de la Ley 27.802; art. 172 intacto; art. 173 derogado por la Ley 24.013 en 1991; art. 195 (presunción de responsabilidad del empleador), art. 196 (jornada uniforme, Ley 11.544), art. 197 (pausa de 12 horas), art. 200 (6 horas / 36 semanales en insalubres) y art. 8 (convenios más favorables). Ninguno de los tres derogados figura en los «Antecedentes Normativos»: llegaron intactos desde 1976.",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Art. 207 (la derogación de los nueve artículos de la LCT, sin fecha diferida) y Título IX, arts. 105 y 106, que sustituyen los arts. 6° y 31 de la Ley 12.713 de trabajo a domicilio.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. La nota de los tres artículos dice «a partir de su publicación en el Boletín Oficial»: no esperan al 1/1/2027 como las leyes enteras que deroga el Título XXVI.",
    },
  ],
};
