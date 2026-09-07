// RESERVA DEL EMPLEO — arts. 214 a 217 de la Ley de Contrato de Trabajo 20.744 (t.o. Dec.
// 390/1976), leídos el 25/8/2026 en el texto actualizado de InfoLEG (id 25552).
//
// POR QUÉ ESTE ARCHIVO EXISTE (25/8/2026, s94): el art. 207 de la Ley 27.802 derogó el art. 216
// de la LCT el 6/3/2026, **sin fecha diferida**. Y la forma de esa derogación es la que casi nadie
// registra:
//
//   · **El derecho quedó en pie.** Los arts. 214 (convocatoria militar, movilización) y 215
//     (cargos electivos nacionales, provinciales o municipales) están intactos: el empleador
//     "conservará el empleo" y debe reincorporar "hasta treinta (30) días después de concluido"
//     el servicio o la función. Ninguno de los dos fue tocado por la reforma.
//   · **Lo que cayó es la CONSECUENCIA.** El art. 216 era el artículo que decía qué pasaba si el
//     empleador rompía esa reserva: el trabajador "podrá reclamar el pago de las indemnizaciones
//     que le correspondan por despido injustificado y por falta u omisión del preaviso" — y,
//     sobre todo, que "a los efectos de dichas indemnizaciones la antigüedad computable incluirá
//     el período de reserva del empleo". Esa oración es la que decidía la plata, y ya no está.
//   · **La asimetría entre capítulos del mismo Título X.** El art. 217 —cargos GREMIALES—
//     sobrevivió entero, con su prohibición expresa de despedir y su remisión a los arts. 214 y
//     215 "segunda parte". O sea: el delegado sindical conserva su artículo propio; el trabajador
//     con un cargo electivo público o una convocatoria se quedó sin el suyo.
//
// LO QUE SIGUE VIVO Y HAY QUE DECIR CON HONESTIDAD (no es lo mismo que "no cambió nada"): la
// segunda oración de los arts. 214 y 215 sigue diciendo que el tiempo de reserva "será considerado
// período de trabajo a los efectos del cómputo de su antigüedad, frente a los beneficios que por
// esta ley, estatutos profesionales o convenciones colectivas de trabajo le hubiesen correspondido
// en el caso de haber prestado servicios". Esa regla genérica no fue derogada. Lo que desapareció
// es la regla ESPECÍFICA para las indemnizaciones y la vía de reclamo enunciada. La diferencia
// entre las dos lecturas es exactamente lo que esta calculadora pone en pesos.
//
// LA TERCERA ORACIÓN, QUE CASI NADIE PUBLICA Y JUEGA A FAVOR: los mismos arts. 214 y 215 aclaran
// que el tiempo de reserva "no será considerado para determinar los promedios de remuneraciones".
// Es decir: los meses sin sueldo del período de reserva NO se promedian contra la base del art.
// 245. Esa oración también sobrevivió a la reforma.
//
// ANTECEDENTES NORMATIVOS (regla de s91): ninguno de los cuatro artículos —214, 215, 216 ni 217—
// figura en la sección "Antecedentes Normativos" del texto actualizado. Llegaron intactos desde el
// texto ordenado de 1976 hasta el 6/3/2026: cincuenta años de doctrina, sentencias y notas
// escritas sobre un artículo que hoy no existe.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) para los arts. 214, 215, 217 y la
// nota de derogación del 216; captura del Internet Archive del 15/12/2025 del MISMO texact para
// recuperar el texto del art. 216 antes de la derogación (el texact vigente ya sólo trae la nota);
// texto oficial de la Ley 27.802 (id 423680) para el art. 207; Ley 24.429 (id 802) para la
// convocatoria excepcional que mantiene con vida al art. 214. Nunca una nota de prensa.

/** Fecha desde la que rige la derogación (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que derogó el art. 216 de la LCT (junto con otros ocho). */
export const ARTICULO_DEROGATORIO = 207;

/** El artículo de la LCT que ya no existe. */
export const ARTICULO_DEROGADO = 216;

/** Días que el empleador tiene para reincorporar después de concluida la función (arts. 214/215/217). */
export const DIAS_PARA_REINCORPORAR = 30;

/** Los tres supuestos de reserva del empleo del Título X, y cuál de ellos perdió su sanción. */
export type SupuestoReserva = {
  id: "convocatoria" | "electivo" | "gremial";
  articulo: number;
  capitulo: string;
  titulo: string;
  quien: string;
  /** true si el art. 216 derogado lo cubría. */
  cubriaElArt216: boolean;
  nota: string;
};

export const SUPUESTOS_RESERVA: SupuestoReserva[] = [
  {
    id: "convocatoria",
    articulo: 214,
    capitulo: "Capítulo II",
    titulo: "Del servicio militar y convocatorias especiales",
    quien: "Convocatoria militar, llamado ordinario, movilización o convocatorias especiales",
    cubriaElArt216: true,
    nota: "El servicio militar obligatorio dejó de existir con la Ley 24.429 (servicio militar voluntario), pero su art. 19 conserva una convocatoria excepcional —cuando no se cubren los cupos de voluntarios y el Congreso la autoriza por ley— además de la movilización. El artículo no es letra muerta: es un supuesto poco frecuente.",
  },
  {
    id: "electivo",
    articulo: 215,
    capitulo: "Capítulo III",
    titulo: "Del desempeño de cargos electivos",
    quien: "Cargos electivos en el orden nacional, provincial o municipal",
    cubriaElArt216: true,
    nota: "Es el supuesto vivo y frecuente: el trabajador que asume como concejal, legislador o funcionario electo y deja de prestar servicios. Tiene derecho a la reserva y a reincorporarse hasta 30 días después de concluir el mandato.",
  },
  {
    id: "gremial",
    articulo: 217,
    capitulo: "Capítulo IV",
    titulo:
      "Del desempeño de cargos electivos o representativos en asociaciones profesionales de trabajadores con personería gremial",
    quien: "Cargos gremiales o representación sindical",
    cubriaElArt216: false,
    nota: "El único de los tres que conserva protección expresa en su propio artículo: «no pudiendo ser despedidos durante los plazos que fije la ley respectiva». El art. 216 nunca lo nombró —hablaba de «los artículos 214 o 215»—, así que su derogación no le quita nada, y además le queda la Ley 23.551.",
  },
];

export const RESERVA_TEXTOS = {
  art214:
    "Reserva del empleo. Cómputo como tiempo de servicio. El empleador conservará el empleo al trabajador cuando éste deba prestar servicio militar obligatorio, por llamado ordinario, movilización o convocatorias especiales desde la fecha de su convocación y hasta treinta (30) días después de concluido el servicio. El tiempo de permanencia en el servicio será considerado período de trabajo a los efectos del cómputo de su antigüedad, frente a los beneficios que por esta ley, estatutos profesionales o convenciones colectivas de trabajo le hubiesen correspondido en el caso de haber prestado servicios. El tiempo de permanencia en servicio no será considerado para determinar los promedios de remuneraciones a los fines de la aplicación de las mismas disposiciones.",
  art215:
    "Reserva del empleo. Cómputo como tiempo de servicio. Los trabajadores que por razón de ocupar cargos electivos en el orden nacional, provincial o municipal, dejaran de prestar servicios, tendrán derecho a la reserva de su empleo por parte del empleador, y a su reincorporación hasta treinta (30) días después de concluido el ejercicio de sus funciones. El período de tiempo durante el cual los trabajadores hubieran desempeñado las funciones precedentemente aludidas será considerado período de trabajo a los efectos del cómputo de su antigüedad, frente a los beneficios que por esta ley, estatutos profesionales y convenciones colectivas de trabajo le hubiesen correspondido en el caso de haber prestado servicios. El tiempo de permanencia en tales funciones no será considerado para determinar los promedios de remuneración a los fines de la aplicación de las mismas disposiciones.",
  /** El texto derogado, recuperado de la captura del texact anterior a la reforma. */
  art216Derogado:
    "Despido o no reincorporación del trabajador. Producido el despido o no reincorporación de un trabajador que se encontrare en la situación de los artículos 214 o 215, éste podrá reclamar el pago de las indemnizaciones que le correspondan por despido injustificado y por falta u omisión del preaviso conforme a esta ley, a los estatutos profesionales o convenciones colectivas de trabajo. A los efectos de dichas indemnizaciones la antigüedad computable incluirá el período de reserva del empleo.",
  /** Lo único que queda hoy en el lugar del art. 216. */
  art216Nota:
    "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art217:
    "Reserva del empleo. Cómputo como tiempo de servicio. Fuero sindical. Los trabajadores que se encontraren en las condiciones previstas en el presente capítulo y que por razón del desempeño de esos cargos, dejaren de prestar servicios, tendrán derecho a la reserva de su empleo por parte del empleador y a su reincorporación hasta treinta (30) días después de concluido el ejercicio de sus funciones, no pudiendo ser despedidos durante los plazos que fije la ley respectiva, a partir de la cesación de las mismas. El período de tiempo durante el cual los trabajadores hubieran desempeñado las funciones precedentemente aludidas será considerado período de trabajo en las mismas condiciones y con el alcance de los artículos 214 y 215, segunda parte, sin perjuicio de los mayores beneficios que sobre la materia establezca la ley de garantía de la actividad sindical.",
  /** La oración del art. 216 que decidía la plata. Se cita sola porque es el hallazgo. */
  oracionQueCayo:
    "A los efectos de dichas indemnizaciones la antigüedad computable incluirá el período de reserva del empleo.",
  /** La oración de los arts. 214/215 que sobrevivió y sostiene la lectura contraria. */
  oracionQueQueda:
    "será considerado período de trabajo a los efectos del cómputo de su antigüedad, frente a los beneficios que por esta ley, estatutos profesionales o convenciones colectivas de trabajo le hubiesen correspondido en el caso de haber prestado servicios",
  /** La tercera oración, la que juega a favor del trabajador y casi nadie publica. */
  oracionDeLosPromedios:
    "El tiempo de permanencia en servicio no será considerado para determinar los promedios de remuneraciones a los fines de la aplicación de las mismas disposiciones.",
} as const;

export type FuenteReserva = { nombre: string; url: string; detalle: string };

export const RESERVA_FUENTES: { consultadoEl: string; lista: FuenteReserva[] } = {
  consultadoEl: "2026-08-25",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 214, 215 y 217 con su texto completo e intacto, y el art. 216 reducido a la nota de derogación por el art. 207 de la Ley 27.802. Ninguno de los cuatro figura en los «Antecedentes Normativos»: llegaron sin una sola modificación desde el texto ordenado de 1976.",
    },
    {
      nombre: "El art. 216 antes de la derogación — captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025, antes de la reforma. De ahí sale el texto del art. 216 que se cita en esta página: el texact vigente ya no lo trae, sólo la nota.",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Art. 207: la derogación de nueve artículos de la LCT (28, 54, 61, 113, 174, 175, 176, 216 y 275), sin fecha diferida.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. La nota del art. 216 dice «a partir de su publicación en el Boletín Oficial»: rige derogado desde marzo de 2026, no desde 2027.",
    },
    {
      nombre: "Ley 24.429 — Servicio Militar Voluntario (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=802",
      detalle:
        "Su art. 19 conserva la convocatoria excepcional de ciudadanos cuando no se cubren los cupos de voluntarios, previa autorización del Congreso por ley. Es lo que impide tratar al art. 214 de la LCT como letra muerta.",
    },
  ],
};
