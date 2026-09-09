// Cuándo el silencio de la ART acepta la contingencia y qué vía abre cada causal de rechazo.
//
// POR QUÉ ESTE ARCHIVO EXISTE (9/9/2026). El Decreto 717/96 reglamenta la denuncia prevista en el
// art. 43 de la Ley 24.557. Casi todo su articulado operativo fue sustituido por el Decreto
// 1475/2015. La información pública suele repetir «diez días» y «comisión médica» sin leer las
// reglas que deciden cómo se cuentan esos días, cuándo existe realmente la prórroga y qué rechazo
// queda fuera de esa vía.
//
// LOS TRES HALLAZGOS QUE JUSTIFICAN LA PÁGINA:
//
//   1. EL PLAZO DE 10 DÍAS SE CUENTA EN DÍAS HÁBILES ADMINISTRATIVOS, NO CORRIDOS. El art. 36 bis
//      alcanza a todo el procedimiento. Toda nota que publica «10 días» a secas induce al lector a
//      dar por aceptada por silencio una contingencia que todavía está en plazo, o al revés. Diez
//      hábiles con un fin de semana largo en el medio pueden ser 16 días de calendario.
//
//   2. LA PRÓRROGA NO ES UN PLAZO DE 20 DÍAS: ES 10 + 10 CON UNA CONDICIÓN QUE CASI NADIE CITA. La
//      prórroga sólo vale si la Aseguradora notificó su uso dentro de los primeros 10 hábiles. Una
//      prórroga avisada el día 12 no existe: el silencio del día 11 ya consumó la aceptación.
//
//   3. EL INCISO QUE SE INVOCA DECIDE ADÓNDE VA EL RECLAMO, Y UNO DE LOS TRES NO VA A LA COMISIÓN
//      MÉDICA. Rechazo por b) o c) → comisión médica (art. 10 inc. 5). Rechazo por a),
//      desconocimiento de la relación laboral → la comisión médica no lo trata (art. 11): hay que
//      dirimirlo antes ante la autoridad competente. Y si el empleador sí reconoce la relación, la
//      Aseguradora no puede fundar el rechazo en el inciso a).
//
// FUENTES: textos ACTUALIZADOS del Decreto 717/96 (InfoLEG id 37813) y de la Ley 24.557 (id 27971),
// consultados el 9/9/2026. El Decreto 1475/2015 aparece identificado en las sustituciones del texto
// actualizado; el buscador local no devolvió una URL propia y por eso no se inventa una.

export const VIGENCIA_RECHAZO = {
  norma: "Decreto 717/96, arts. 1º a 6º bis, 10, 11, 12, 36, 36 bis y 36 ter",
  reformadoPor: "Decreto 1475/2015",
  boletin: "B.O. 31 de julio de 2015",
  vigenciaDesde: "1 de noviembre de 2015 (primer día del tercer mes posterior a la publicación)",
  consultadoEl: "9 de septiembre de 2026",
} as const;

export const PLAZO_RECHAZO_HABILES = 10;
export const PRORROGA_HABILES = 10;
export const PLAZO_PRESTADOR_HORAS = 24;
export const PRESCRIPCION_ANIOS = 2;
export const EMPLEADOR_CHICO_EMPLEADOS = 5;

export const CAUSALES_RECHAZO = [
  {
    id: "a",
    titulo: "El empleador desconoce la relación laboral",
    texto:
      "Desconocimiento por parte del empleador de la relación laboral invocada. Esa cuestión debe dirimirse previamente ante la autoridad competente.",
    vaA: "autoridad-competente",
    exigeFundamento: false,
  },
  {
    id: "b",
    titulo: "Dolo del trabajador o fuerza mayor extraña al trabajo",
    texto:
      "Alguna de las causas del art. 6º, apartado 3, incisos a) y b), de la Ley 24.557: dolo del trabajador o fuerza mayor extraña al trabajo.",
    vaA: "comision-medica",
    exigeFundamento: true,
  },
  {
    id: "c",
    titulo: "La contingencia no sería laboral o profesional",
    texto:
      "La Aseguradora considera que el accidente no es de naturaleza laboral o que la enfermedad no reviste carácter profesional.",
    vaA: "comision-medica",
    exigeFundamento: true,
  },
] as const;

export const QUIEN_PUEDE_DENUNCIAR = [
  "El empleador",
  "El propio trabajador",
  "Sus derechohabientes",
  "Cualquier persona que haya tenido conocimiento del accidente o la enfermedad",
] as const;

export const RECHAZO_TEXTOS = {
  art1:
    "También podrá efectuar la denuncia el propio trabajador, sus derechohabientes o cualquier persona que haya tenido conocimiento del accidente de trabajo o enfermedad profesional.",
  art2:
    "Para los demás sujetos bastará que la denuncia sea formulada por escrito y contenga una relación de los hechos, la identificación de las partes y la firma del denunciante.",
  art6Recepcion:
    "La Aseguradora y el prestador de servicios habilitado no podrán negarse a recibir la denuncia.",
  art6Silencio:
    "El silencio de la Aseguradora se entenderá como aceptación de la pretensión, si transcurridos DIEZ (10) días de recibida la denuncia no hubiere cursado la notificación fehaciente de su rechazo al trabajador y al empleador.",
  art6Prorroga:
    "El plazo podrá prorrogarse por DIEZ (10) días cuando existan circunstancias objetivas que imposibiliten el conocimiento acabado de la pretensión, debiendo cursar la notificación fehaciente del uso de la prórroga del plazo al trabajador y al empleador dentro del término de los DIEZ (10) días de recibida la denuncia.",
  art6RelacionReconocida:
    "La Aseguradora no podrá rechazar la pretensión con fundamento en la inexistencia de la relación laboral reconocida por el empleador.",
  art6PrestacionesPrevias:
    "El otorgamiento de las prestaciones previo al cumplimiento de los términos de aceptación o rechazo de la pretensión nunca se entenderá como aceptación de la contingencia en los casos en que proceda su rechazo.",
  art10inc5:
    "Cuando la denuncia del accidente de trabajo o de la enfermedad profesional fuere rechazada por la Aseguradora, en los supuestos contemplados en los incisos b) y c) del artículo 6º.",
  art11:
    "Las Comisiones Médicas no darán curso a las cuestiones relativas a la existencia de la relación laboral, las que deberán ser resueltas previamente por la autoridad competente.",
  art12:
    "El trabajador o sus derechohabientes deberán contar necesariamente con patrocinio letrado desde su primera presentación y durante todo el proceso.",
  art36bis:
    "A los fines del presente procedimiento todos los plazos expresados se consideran en días hábiles administrativos.",
  art44:
    "Las acciones derivadas de esta ley prescriben a los dos años a contar de la fecha en que la prestación debió ser abonada o prestada y, en todo caso, a los dos años desde el cese de la relación laboral.",
} as const;

export const RECHAZO_FUENTES = {
  consultadoEl: "9 de septiembre de 2026",
  lista: [
    {
      nombre: "Decreto 717/96 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/37813/texact.htm",
      detalle:
        "Arts. 1º a 6º bis, 10, 11, 12, 36, 36 bis y 36 ter: denuncia, recepción, prestaciones inmediatas, silencio, prórroga, causales, vías, patrocinio y cómputo administrativo.",
    },
    {
      nombre: "Ley 24.557 — texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27971/texact.htm",
      detalle:
        "Arts. 43 y 44: nacimiento del derecho a las prestaciones desde la denuncia y prescripción de las acciones derivadas de la ley.",
    },
    {
      nombre: "Decreto 1475/2015",
      detalle:
        "Reforma que sustituyó los arts. 6º, 10 inc. 5, 12 y 36, e incorporó los arts. 6º bis, 36 bis y 36 ter al Decreto 717/96; aparece citada dentro de su texto actualizado.",
    },
  ],
} as const;
