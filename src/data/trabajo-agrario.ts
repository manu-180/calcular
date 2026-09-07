// TRABAJO AGRARIO — Régimen de Trabajo Agrario, Ley 26.727 (B.O. 28/12/2011), leído el 27/8/2026
// en el texto actualizado de InfoLEG (id 192152) y en el texto oficial de la Ley 27.802 (id 423680).
//
// POR QUÉ ESTE ARCHIVO EXISTE (27/8/2026, s96): el Título XI de la Ley 27.802 (arts. 111 a 118)
// reescribió el régimen del trabajador rural, y su art. 206 derogó tres artículos más. Es la regla
// de s83 en estado puro —el artículo DEROGADO vale más que el sustituido— porque acá la reforma no
// dejó un vacío: **borró una figura entera y escribió lo contrario en el artículo de al lado**.
//
//   · **El período de prueba pasó de CERO a OCHO MESES, en dos saltos.** El art. 16 original
//     (2011) decía, textual, que el contrato agrario permanente «no podrá ser celebrado a prueba
//     por período alguno». En 2024 el art. 98 de la Ley 27.742 lo cambió por una remisión al art.
//     92 bis de la LCT (seis meses, ampliables por convenio). Y el 6/3/2026 el art. 113 de la Ley
//     27.802 lo volvió a sustituir: «Para los trabajadores de esta modalidad, el período de prueba
//     será de ocho (8) meses». Ocho, fijos, por ley y sin necesidad de convenio colectivo — dos
//     meses MÁS que el piso urbano del art. 92 bis. En quince años el trabajador rural pasó de no
//     tener período de prueba a tener el más largo del sistema.
//
//   · **El «trabajador permanente discontinuo» dejó de existir, con doble llave.** El art. 18
//     decía que el temporario contratado por el mismo empleador «en más de una ocasión de manera
//     consecutiva» era, «a todos sus efectos», un permanente discontinuo, y que adquiría la
//     antigüedad «a partir de su primera contratación». El art. 206 de la Ley 27.802 lo DEROGÓ; y
//     el art. 112, el mismo día, le agregó al art. 17 una oración que antes no estaba: los
//     sucesivos contratos temporarios, «cualquiera sea el número de contrataciones, no
//     modificará[n] la naturaleza temporaria del vínculo». Derogar la figura y además escribir su
//     negación: por eso la web que copia el texto viejo no queda incompleta, queda afirmando lo
//     contrario de la norma vigente.
//
//   · **Y con la figura se fue su indemnización.** El art. 21 —también derogado por el art. 206—
//     le daba al permanente discontinuo despedido con la temporada pendiente las indemnizaciones
//     del Título XII de la LCT «además de (…) daños y perjuicios provenientes del derecho común»,
//     y fijaba que «la antigüedad se computará en función de los períodos efectivamente
//     trabajados». Ese cómputo es el que desapareció: hoy las temporadas no se suman.
//
// LO QUE NO CAMBIÓ Y CASI NADIE PUBLICA (los dos números propios del régimen, ambos INTACTOS):
//   · **Art. 22 — piso de DOS meses.** «El trabajador permanente en ningún caso podrá percibir
//     como indemnización por antigüedad o despido un importe inferior a dos (2) meses de sueldo».
//     Es el doble del piso del art. 245 de la LCT (un mes) y se calcula sobre la mejor remuneración
//     mensual, normal y habitual **sin** el tope de convenio: el artículo no lo menciona.
//   · **Art. 20 — el 10% del temporario.** Al terminar la relación, el temporario cobra «además
//     del proporcional del sueldo anual complementario, una indemnización sustitutiva de sus
//     vacaciones equivalente al diez por ciento (10%) del total de las remuneraciones devengadas».
//
// LA LEY NO TIENE PREAVISO PROPIO: la palabra «preaviso» no aparece en el texto vigente de la Ley
// 26.727 (verificado con `tools/infoleg.ts 192152 --buscar preaviso`). El preaviso, la integración
// del mes y el art. 245 salen de la LCT, por el reenvío expreso del art. 16 al Título XII y por el
// art. 2° inc. b). Las vacaciones del permanente también: el art. 50 declara aplicables «las
// licencias previstas por la ley 20.744 (…) sin perjuicio de (…) lo prescripto para los
// trabajadores temporarios con relación a las vacaciones».
//
// FUENTES: texto actualizado de la Ley 26.727 en InfoLEG (id 192152); capturas del Internet
// Archive del MISMO texact al 1/1/2026 (texto anterior a la Ley 27.802) y al 1/1/2024 (texto
// original de 2011, anterior a la Ley 27.742) para recuperar los artículos derogados y las
// redacciones previas; texto oficial de la Ley 27.802 (id 423680) para los arts. 111 a 118 y 206.
// Nunca una nota de prensa.

/** Fecha desde la que rige el Título XI (B.O. de la Ley 27.802, sin fecha diferida). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Período de prueba del contrato agrario permanente de prestación continua (art. 16, texto del art. 113 de la Ley 27.802). */
export const MESES_PERIODO_PRUEBA_AGRARIO = 8;

/** Período de prueba del art. 92 bis de la LCT, para contrastar (texto de la Ley 27.742). */
export const MESES_PERIODO_PRUEBA_LCT = 6;

/** Piso de la indemnización por antigüedad del trabajador rural permanente (art. 22, INTACTO). */
export const MESES_PISO_ART22 = 2;

/** Indemnización sustitutiva de vacaciones del temporario (art. 20, INTACTO). */
export const PORCENTAJE_SUSTITUTIVA_VACACIONES = 0.1;

/** Artículos de la Ley 27.802 que reescribieron el régimen. */
export const ARTICULOS_REFORMA = {
  art12: 111,
  art17: 112,
  art16: 113,
  art32: 114,
  art34: 115,
  art34bis: 116,
  art89: 117,
  art106: 118,
  /** El que derogó los arts. 13, 18 y 21 de la Ley 26.727. */
  derogatorio: 206,
} as const;

/** Los artículos de la Ley 26.727 que el art. 206 de la Ley 27.802 derogó. */
export const ARTICULOS_DEROGADOS = [13, 18, 21] as const;

export const AGRARIO_TEXTOS = {
  /** Art. 16 vigente: el que puso los ocho meses. */
  art16Vigente:
    "Contrato de trabajo agrario permanente de prestación continua. El contrato de trabajo agrario se entenderá celebrado con carácter permanente y como de prestación continua, salvo los casos previstos expresamente por esta ley. Su extinción se regirá por lo dispuesto en el Título XII de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificaciones. Para los trabajadores de esta modalidad, el período de prueba será de ocho (8) meses.",
  /** Art. 16 según la Ley 27.742 (2024): remitía al art. 92 bis de la LCT. */
  art16Intermedio:
    "Contrato de trabajo agrario permanente de prestación continua. El contrato de trabajo agrario se entenderá celebrado con carácter permanente y como de prestación continua, salvo los casos previstos expresamente por esta ley. Su extinción se regirá por lo dispuesto en el título XII de la ley 20.744 (t.o. 1976) y sus modificatorias. Para los trabajadores de tiempo indeterminado del sector agrario será de aplicación lo dispuesto respecto del período de prueba en el artículo 92 bis de la ley 20.744.",
  /** Art. 16 original (2011): el régimen rural no tenía período de prueba. */
  art16Original:
    "Contrato de trabajo agrario permanente de prestación continua. El contrato de trabajo agrario se entenderá celebrado con carácter permanente y como de prestación continua, salvo los casos previstos expresamente por esta ley. No podrá ser celebrado a prueba por período alguno y su extinción se regirá por lo dispuesto en el Título XII de la ley 20.744 (t.o 1976) y sus modificatorias.",
  /** La oración del art. 16 original que la reforma de 2024 borró. */
  oracionQueSeFueEn2024: "No podrá ser celebrado a prueba por período alguno",
  /** La oración que entró en 2026. */
  oracionQueEntroEn2026:
    "Para los trabajadores de esta modalidad, el período de prueba será de ocho (8) meses",
  /** Art. 17 vigente, con la oración nueva del art. 112 al final. */
  art17Vigente:
    "Contrato de trabajo temporario. Habrá contrato de trabajo temporario cuando la relación laboral se origine en necesidades de la explotación de carácter cíclico o estacional, o por procesos temporales propios de la actividad agrícola, pecuaria, forestal o de las restantes actividades comprendidas dentro del ámbito de aplicación de la presente ley, así como también, las que se realizaren en ferias y remates de hacienda. Se encuentran también comprendidos en esta categoría los trabajadores contratados para la realización de tareas ocasionales, accidentales o supletorias. La celebración de sucesivos contratos de trabajo temporario con el mismo empleador para atender a las necesidades cíclicas o estacionales descriptas en el presente artículo, cualquiera sea el número de contrataciones, no modificará la naturaleza temporaria del vínculo.",
  /** La oración que el art. 112 le AGREGÓ al art. 17: antes el artículo terminaba en «supletorias». */
  oracionAgregadaAlArt17:
    "La celebración de sucesivos contratos de trabajo temporario con el mismo empleador para atender a las necesidades cíclicas o estacionales descriptas en el presente artículo, cualquiera sea el número de contrataciones, no modificará la naturaleza temporaria del vínculo.",
  /** Art. 18, DEROGADO: la figura del permanente discontinuo, palabra por palabra. */
  art18Derogado:
    "Trabajador permanente discontinuo. Cuando un trabajador temporario es contratado por un mismo empleador en más de una ocasión de manera consecutiva, para la realización de tareas de carácter cíclico o estacional o demás supuestos previstos en el primer párrafo del artículo 17, será considerado a todos sus efectos como un trabajador permanente discontinuo. Este tendrá iguales derechos que los trabajadores permanentes ajustados a las características discontinuas de sus prestaciones, salvo aquellos expresamente excluidos en la presente ley. El trabajador adquirirá los derechos que otorgue la antigüedad en esta ley a los trabajadores permanentes de prestación continua, a partir de su primera contratación, si ello respondiera a necesidades también permanentes de la empresa o explotación.",
  /** Art. 21, DEROGADO: la indemnización del permanente discontinuo y el cómputo de antigüedad. */
  art21Derogado:
    "Trabajador permanente discontinuo. Indemnización. Daños y perjuicios. El despido sin justa causa del trabajador permanente discontinuo, pendientes los plazos previstos o previsibles del ciclo o temporada en los que estuviere prestando servicios, dará derecho al trabajador, además de las indemnizaciones previstas en el Título XII de la ley 20.744 (t.o. 1976) y sus modificatorias o las que en el futuro las reemplacen, a la de daños y perjuicios provenientes del derecho común, la que se fijará en función directa con los que justifique haber sufrido quien los alegue o los que, a falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura anticipada del contrato. La antigüedad se computará en función de los períodos efectivamente trabajados.",
  /** La oración del art. 21 que decidía la plata: cómo se contaban las temporadas. */
  oracionDelComputo:
    "La antigüedad se computará en función de los períodos efectivamente trabajados.",
  /** Art. 20, INTACTO: el 10% del temporario. */
  art20:
    "Trabajador temporario. Indemnización sustitutiva de vacaciones. El trabajador temporario deberá percibir al concluir la relación laboral, además del proporcional del sueldo anual complementario, una indemnización sustitutiva de sus vacaciones equivalente al diez por ciento (10%) del total de las remuneraciones devengadas.",
  /** Art. 22, INTACTO: el piso de dos meses. */
  art22:
    "Trabajador permanente. Indemnización mínima por antigüedad o despido. El trabajador permanente en ningún caso podrá percibir como indemnización por antigüedad o despido un importe inferior a dos (2) meses de sueldo, tomando como base la mejor remuneración mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor.",
  /** Art. 12 vigente (texto del art. 111): la solidaridad del arrendador. */
  art12Vigente:
    "Contratación, subcontratación y cesión. Solidaridad. Los trabajadores serán considerados empleados directos de aquellos que registren la relación laboral, sin perjuicio de haber sido contratados con vistas a utilizar su prestación o de proporcionarlos a terceras empresas. La empresa usuaria será responsable solidaria por las obligaciones laborales y de la seguridad social respecto de los trabajadores proporcionados, exclusivamente respecto de aquellas devengadas durante el tiempo de efectiva prestación para esta última. Aquellos propietarios que den en arrendamiento maquinarias, equipamiento o las tierras de su titularidad, en ningún caso serán considerados responsables solidarios por las obligaciones emergentes de la relación laboral entre los trabajadores y aquellos que los hubieran registrado, resultando ajenos a dicho vínculo.",
  /** Art. 34 bis, INCORPORADO por el art. 116: asignaciones familiares del temporario. */
  art34bis:
    "Compatibilidad entre trabajo rural registrado y prestaciones sociales. Los trabajadores que sean contratados bajo las modalidades de trabajo temporario, previstas en la ley 26.727 y sus modificatorias, así como aquellos comprendidos en el artículo 96 de la ley 20.744 y sus modificatorias, tendrán derecho a percibir las asignaciones familiares contributivas establecidas en la ley 24.714. Al cesar la relación laboral y dejar de estar alcanzados por el régimen contributivo, los trabajadores accederán automáticamente al régimen de asignaciones familiares no contributivas correspondiente, garantizándose la continuidad en la percepción del beneficio.",
  /** Art. 32 vigente (texto del art. 114): el piso salarial del régimen. */
  art32:
    "Fijación de remuneraciones. Las remuneraciones serán acordadas entre la representación trabajadora y la empleadora conforme la ley 14.250 (t.o. 2004) y su modificación y la ley 23.546 (t.o. 2004), con posterior homologación de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano. No podrán ser inferiores al salario mínimo vital y móvil vigente, y su monto se determinará por mes, por día y por hora. La negociación deberá realizarse en el marco y con la coordinación de la Comisión Nacional de Trabajo Agrario.",
  /** Art. 106, INCORPORADO por el art. 118: intereses de los créditos laborales rurales. */
  art106:
    "Intereses. Los créditos provenientes de las relaciones de trabajo agrarias serán actualizados y devengarán intereses en los términos y bajo las condiciones previstas en el artículo 276 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias, resultando igualmente de aplicación las normas contenidas en los artículos 277 y 278 de la citada ley y el artículo 55 de la Ley de Modernización Laboral.",
  /** Art. 50: las licencias y vacaciones del rural salen de la LCT. */
  art50:
    "Resultan de aplicación a los trabajadores comprendidos en la presente ley las licencias previstas por la ley 20.744 (t.o. 1976) y sus modificatorias, sin perjuicio de las establecidas en el presente título y lo prescripto para los trabajadores temporarios con relación a las vacaciones.",
  /** Primera oración del art. 92 bis de la LCT, para contrastar los seis meses urbanos. */
  art92bisPrimeraOracion:
    "El contrato de trabajo por tiempo indeterminado se entenderá celebrado a prueba durante los primeros seis (6) meses de vigencia.",
} as const;

export type FuenteAgraria = { nombre: string; url: string; detalle: string };

export const AGRARIO_FUENTES: { consultadoEl: string; lista: FuenteAgraria[] } = {
  consultadoEl: "2026-08-27",
  lista: [
    {
      nombre: "Ley 26.727 — Régimen de Trabajo Agrario, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/190000-194999/192152/texact.htm",
      detalle:
        "Arts. 16 y 17 con su texto vigente y las notas de sustitución por los arts. 113 y 112 de la Ley 27.802; arts. 13, 18 y 21 reducidos a la nota «Artículo derogado por art. 206 de la Ley N° 27.802»; y los arts. 20, 22, 32, 34 bis, 50 y 106 tal como rigen hoy. La palabra «preaviso» no aparece en todo el texto: el preaviso del rural sale de la LCT.",
    },
    {
      nombre: "La Ley 26.727 antes de la reforma — captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/2026/https://servicios.infoleg.gob.ar/infolegInternet/anexos/190000-194999/192152/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada antes del 6 de marzo de 2026. De ahí salen, palabra por palabra, los arts. 18 y 21 derogados —la figura del trabajador permanente discontinuo y su indemnización— y el art. 17 sin la oración final que le agregó la reforma. El texto actualizado ya no los trae.",
    },
    {
      nombre: "La Ley 26.727 en su texto original de 2011 — captura previa a la Ley 27.742",
      url: "https://web.archive.org/web/2024/https://servicios.infoleg.gob.ar/infolegInternet/anexos/190000-194999/192152/texact.htm",
      detalle:
        "Captura anterior al 8 de julio de 2024. Ahí el art. 16 todavía decía que el contrato agrario permanente «no podrá ser celebrado a prueba por período alguno»: es la prueba de que el régimen rural no tuvo período de prueba durante sus primeros doce años.",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Su Título XI (arts. 111 a 118) reescribe el régimen agrario y su art. 206 deroga los arts. 13, 18 y 21 de la Ley 26.727. Las notas fijan la vigencia «a partir de su publicación en el Boletín Oficial»: rige desde el 6 de marzo de 2026, no desde 2027.",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 92 bis (los seis meses urbanos), 123, 156, 231, 232, 233 y 245: el Título XII al que remite el art. 16 de la Ley 26.727 para la extinción del contrato agrario permanente.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. Un despido rural anterior a esa fecha se rige por el texto viejo: con período de prueba de seis meses y con la figura del permanente discontinuo todavía en pie.",
    },
  ],
};
