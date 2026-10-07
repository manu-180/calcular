// DESCUENTOS DEL SUELDO Y EMBARGO — cuánto te pueden retener del recibo, y hasta dónde.
// LCT arts. 131, 132, 133 (texto del art. 37 de la Ley 27.802), 120 y 147 · art. 9º de la
// Ley 14.250 (texto del art. 133 de la Ley 27.802) · Decreto 484/87 · Resolución MTEySS 436/2004.
//
// POR QUÉ ESTE ARCHIVO EXISTE (20/8/2026, s89). El tema «cuánto me pueden descontar del sueldo»
// parece cubierto: toda la web publica el 20% del art. 133 y ahí termina. El 20% es correcto —y
// está intacto desde 1974—, y por eso el tema se da por cerrado. Pero al lado del 20% hay TRES
// datos oficiales que casi nadie publica, y dos de ellos son de 2026:
//
//   1. **La cuota solidaria tiene tope desde el 6/3/2026, y antes no tenía ninguno.** El art. 9º
//      de la Ley 14.250 (t.o. 2004, Decreto 1135/2004) decía, sin número alguno: «Las cláusulas
//      de la convención por las que se establezcan contribuciones a favor de la asociación de
//      trabajadores participantes, serán válidas no sólo para los afiliados, sino también para
//      los no afiliados comprendidos en el ámbito de la convención». El art. 133 de la Ley 27.802
//      lo sustituyó y le puso techo: **2%** de las remuneraciones para las asociaciones de
//      trabajadores y **0,5%** para las cámaras empresarias. Y aclaró qué NO entra en ese 2%:
//      las cuotas de afiliación sindical y los beneficios especiales por estar afiliado.
//
//   2. **El nuevo art. 133 de la LCT le sacó al sindicato la intervención obligatoria.** El texto
//      que rigió desde 1974 terminaba: la autoridad de aplicación podrá fijar un límite porcentual
//      distinto «cuando la situación particular lo requiera **y, en todo caso, con intervención de
//      la asociación profesional de trabajadores representativa de la actividad**». El texto del
//      art. 37 de la Ley 27.802 conserva la facultad y **borra esa última oración**.
//
//   3. **El 20% se puede exceder por Ganancias, sin tope.** Resolución MTEySS 436/2004, art. 1º:
//      el límite del primer párrafo del art. 133 «podrá ser excedido al sólo efecto de hacer
//      posible la retención» del régimen de Ganancias de la 4ª categoría, «sin otro límite que el
//      que la legislación en vigencia (…) establezca como tasa máxima». Es la respuesta oficial a
//      «me descontaron más del 20%, ¿es legal?» y está enterrada en los Antecedentes Normativos
//      del texto actualizado de la LCT.
//
// Y el embargo, que es la otra mitad de la pregunta, tiene su propio número mal publicado: el
// Decreto 484/87 manda calcularlo **sobre el importe BRUTO** («sólo se tendrán en cuenta las
// remuneraciones en dinero por su importe bruto, con independencia de lo dispuesto en el artículo
// 133», art. 2º), no sobre el neto de bolsillo, y no tiene monto propio: se DERIVA del SMVM (la
// regla de s74/s75 otra vez), así que la página no envejece sola — se actualiza con la escala.
//
// FUENTES leídas el 20/8/2026, todas en InfoLEG, ninguna nota de prensa:
//   · LCT texto actualizado (id 25552) — arts. 120, 131, 132, 133, 147 y los Antecedentes.
//   · Ley 20.744 texto original (id 25552, norma.htm) — art. 147, que el t.o. por Decreto 390/76
//     renumeró como 133: es el texto que rigió hasta el 5/3/2026.
//   · Ley 27.802 texto original (id 423680) — sus arts. 36, 37 y 133.
//   · Ley 14.250 t.o. 2004 por Decreto 1135/2004 (id 98232) — el art. 9º anterior, sin tope.
//   · Decreto 484/87 (id 77255) — límites de embargabilidad.
//   · Resolución MTEySS 436/2004 (id 101307) — la excepción por Ganancias.

/** B.O. de la Ley 27.802: desde acá rigen el nuevo art. 133 LCT y el tope del 2%. */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Art. 133 LCT: tope general de deducciones, retenciones y compensaciones. Intacto desde 1974. */
export const TOPE_GENERAL = 0.2;

/**
 * Art. 9º de la Ley 14.250 según el art. 133 de la Ley 27.802: techo de los aportes convencionales
 * a favor de asociaciones de trabajadores, válidos para afiliados y no afiliados (la «cuota
 * solidaria»). ANTES DEL 6/3/2026 NO EXISTÍA NINGÚN TOPE.
 */
export const TOPE_CUOTA_SOLIDARIA = 0.02;

/** Mismo artículo: techo de los aportes convencionales a favor de cámaras empresarias. */
export const TOPE_CAMARAS_EMPRESARIAS = 0.005;

/** Decreto 484/87, art. 1º inc. 1: porcentaje sobre el excedente del SMVM hasta 2 SMVM. */
export const EMBARGO_TRAMO_1 = 0.1;

/** Decreto 484/87, art. 1º inc. 2: porcentaje cuando la remuneración supera 2 SMVM. */
export const EMBARGO_TRAMO_2 = 0.2;

/** Decreto 484/87, art. 1º: el piso inembargable es un (1) SMVM mensual. */
export const EMBARGO_PISO_SMVM = 1;

/** Decreto 484/87: el escalón entre el tramo 1 y el 2 está en el doble del SMVM. */
export const EMBARGO_ESCALON_SMVM = 2;

/**
 * Citas textuales, enteras a propósito: son el ancla contra la que `check_descuentos_sueldo.ts`
 * verifica que la página no derive hacia un resumen, y son la prueba palabra por palabra de qué
 * cambió el 6/3/2026.
 */
export const DESCUENTOS_TEXTOS = {
  art131:
    "Retenciones. Deducciones y compensaciones. No podrá deducirse, retenerse o compensarse suma alguna que rebaje el monto de las remuneraciones. Quedan comprendidos especialmente en esta prohibición los descuentos, retenciones o compensaciones por entrega de mercaderías, provisión de alimentos, vivienda o alojamiento, uso o empleo de herramientas, o cualquier otra prestación en dinero o en especie. No se podrá imponer multas al trabajador ni deducirse, retenerse o compensarse por vía de ellas el monto de las remuneraciones.",
  art133Vigente:
    "Porcentaje máximo de retención. Conformidad del trabajador. Autorización administrativa. Salvo lo dispuesto en el artículo 130 de esta ley, en el caso de adelanto de remuneraciones, la deducción, retención o compensación no podrá insumir en conjunto más del veinte por ciento (20%) del monto total de la remuneración en dinero que tenga que percibir el trabajador en el momento en que se practique. Las mismas podrán consistir, siempre dentro de dicha proporción, en sumas fijas y previamente determinadas. En ningún caso podrán efectuarse las deducciones, retenciones o compensaciones a las que se hace referencia en el artículo 132 de esta ley sin el consentimiento expreso del trabajador, salvo aquéllas que provengan del cumplimiento de las leyes, estatutos profesionales o de Convenios Colectivos de Trabajo, teniendo en cuenta el tope del dos por ciento (2%) establecido en el artículo 133 de la Ley de Modernización Laboral, siempre que sean con destino al o los sindicatos signatarios de éstos. Las deducciones, retenciones o compensaciones, en todos los restantes casos, requerirán además la previa autorización del organismo competente, exigencias ambas que deberán reunirse en cada caso particular, aunque la autorización puede ser conferida, con carácter general, a un empleador o grupo de empleadores, a efectos de su utilización respecto de la totalidad de su personal y mientras no le fuese revocada por la misma autoridad que la concediera. La Autoridad de Aplicación podrá establecer, por resolución fundada, un límite porcentual distinto para las deducciones, retenciones o compensaciones cuando la situación particular lo requiera.",
  notaVigencia133:
    "(Artículo sustituido por art. 37 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art133Anterior:
    "Salvo lo dispuesto en el artículo 144 de esta ley, en el caso de adelanto de remuneraciones, la deducción, retención o compensación no podrá insumir en conjunto más del veinte por ciento (20 %) del monto total de la remuneración en dinero que tengan que percibir el trabajador en el momento en que se practiquen. Las mismas podrán consistir además, siempre dentro de dicha proporción, en sumas fijas y previamente determinadas. En ningún caso podrán efectuarse las deducciones, retenciones o compensaciones a las que se hace referencia en el art. 146 de esta ley sin el consentimiento expreso del trabajador, salvo aquellas que provengan del cumplimiento de las leyes, estatutos profesionales o convenciones colectivas de trabajo. Las deducciones, retenciones o compensaciones, en todos los restantes casos, requerirán además la previa autorización del organismo competente, exigencias ambas que deberán reunirse en cada caso particular, aunque la autorización puede ser conferida, con carácter general, a un empleador o grupo de empleadores, a efectos de su utilización respecto de la totalidad de su personal y mientras no le fuese revocada por la misma autoridad que la concediera. La autoridad de aplicación podrá establecer, por resolución fundada, un límite porcentual distinto para las deducciones, retenciones o compensaciones cuando la situación particular lo requiera y, en todo caso, con intervención de la asociación profesional de trabajadores representativa de la actividad.",
  ley14250Art9Vigente:
    "Los aportes, contribuciones y cualquier otro concepto previstos en las Convenciones Colectivas de Trabajo, cualquiera sea su denominación u objeto, en beneficio directo o indirecto a cámaras, asociaciones, agrupaciones o personas jurídicas integradas parcialmente o totalmente por empleadores o cuyos órganos directivos estén integrados por representantes de los empleadores, no podrán superar el cero coma cinco por ciento (0,5%) de las remuneraciones de los trabajadores. Las contribuciones y los aportes previstos en las Convenciones Colectivas de Trabajo, a favor de asociaciones de trabajadores, que sean válidas para afiliados o no afiliados comprendidos en el ámbito de la convención, no podrán superar el dos por ciento (2%) de las remuneraciones de los trabajadores. Quedan excluidas las cuotas de afiliación sindical y las cláusulas que acuerden otros beneficios especiales en función de la afiliación a la asociación profesional de trabajadores que suscribió el convenio colectivo.",
  ley14250Art9Anterior:
    "La convención colectiva podrá contener cláusulas que acuerden beneficios especiales en función de la afiliación a la asociación profesional de trabajadores que la suscribió. Las cláusulas de la convención por las que se establezcan contribuciones a favor de la asociación de trabajadores participantes, serán válidas no sólo para los afiliados, sino también para los no afiliados comprendidos en el ámbito de la convención.",
  res436Articulo1:
    "El límite porcentual máximo establecido por el primer párrafo del artículo 133 de la Ley Nº 20.744 (T.O. 1976) podrá ser excedido al sólo efecto de hacer posible la retención dispuesta por el Régimen de Retención del Impuesto a las Ganancias sobre las rentas de los trabajadores en relación de dependencia aprobado por Resolución General A.F.l.P. Nº 1261 del 16 de abril de 2002 o la que en el futuro la reemplace, sin otro límite que el que la legislación en vigencia al momento de practicarse la retención establezca como tasa máxima aplicable para las personas de existencia visible y sucesiones indivisas.",
  res436Considerando:
    "Que la aplicación de las normas sobre el Impuesto a las Ganancias puede llevar a que las sumas a retener por el empleador en ese concepto, con más las otras retenciones legalmente permitidas, superen en la práctica el límite establecido por el Régimen de Contrato de Trabajo.",
  dec484Art1:
    "Las remuneraciones devengadas por los trabajadores en cada período mensual, así como cada cuota del sueldo anual complementario son inembargables hasta una suma equivalente al importe mensual del SALARIO MINIMO VITAL fijado de conformidad con lo dispuesto en los artículos 116 y siguientes del Régimen de Contrato de Trabajo. Las remuneraciones superiores a ese importe serán embargables en la siguiente proporción: 1. Remuneraciones no superiores al doble del SALARIO MINIMO VITAL mensual, hasta el diez por ciento (10%) del importe que excediere de este último. 2. Retribuciones superiores al doble del SALARIO MINIMO VITAL mensual, hasta el veinte por ciento (20%).",
  dec484Art2:
    "A los efectos de la determinación de los importes sujetos a embargos sólo se tendrán en cuenta las remuneraciones en dinero por su importe bruto, con independencia de lo dispuesto en el artículo 133 del Régimen de Contrato de Trabajo.",
  dec484Art3:
    "Las indemnizaciones debidas al trabajador o a sus derechohabientes con motivo del contrato de Trabajo o su extinción serán embargables en las siguientes proporciones: 1. Indemnizaciones no superiores al doble del SALARIO MINIMO VITAL mensual, hasta diez por ciento (10%) del importe de aquéllas. 2. Indemnizaciones superiores al doble del SALARIO MINIMO VITAL mensual, hasta el veinte por ciento (20%) del importe de aquéllas. A los efectos de determinar el porcentaje de embargabilidad aplicable de acuerdo con lo previsto en el presente artículo, deberán considerarse conjuntamente todos los conceptos derivados de la extinción del Contrato de Trabajo.",
  dec484Art4:
    "Los límites de embargabilidad establecidos en el presente Decreto no serán de aplicación en el caso de cuotas por alimentos o litis expensas, las que deberán ser fijadas de modo que permitan la subsistencia del alimentante.",
  art120:
    "Inembargabilidad. El salario mínimo vital es inembargable en la proporción que establezca la reglamentación, salvo por deudas alimentarias.",
  art147:
    "Cuota de embargabilidad. Las remuneraciones debidas a los trabajadores serán inembargables en la proporción resultante de la aplicación del artículo 120, salvo por deudas alimentarias. En lo que exceda de este monto, quedarán afectadas a embargo en la proporción que fije la reglamentación que dicte el Poder Ejecutivo Nacional, con la salvedad de las cuotas por alimentos o litis expensas, las que deberán ser fijadas dentro de los límites que permita la subsistencia del alimentante.",
  art132IncB: "Retención de aportes jubilatorios y obligaciones fiscales a cargo del trabajador.",
  art132IncC:
    "Pago de cuotas, aportes periódicos o contribuciones a que estuviesen obligados los trabajadores en virtud de normas legales o provenientes de las convenciones colectivas de trabajo o que resulte de su carácter de afiliados a asociaciones profesionales de trabajadores con personería gremial o de miembros de sociedades mutuales o cooperativas así como por servicios sociales y demás prestaciones que otorguen dichas entidades, solo si existe un consentimiento explícito del empleado autorizando el mismo.",
} as const;

/** Los nueve conceptos que el art. 132 saca de la prohibición del art. 131. */
export const CONCEPTOS_PERMITIDOS: { inciso: string; concepto: string; nota: string }[] = [
  {
    inciso: "a)",
    concepto: "Adelanto de remuneraciones",
    nota: "Con las formalidades del art. 130 (recibo por separado). Es el único que el propio art. 133 deja fuera del tope del 20%: el artículo arranca diciendo «salvo lo dispuesto en el artículo 130».",
  },
  {
    inciso: "b)",
    concepto: "Aportes jubilatorios y obligaciones fiscales a cargo del trabajador",
    nota: "El 11% de jubilación, el 3% de PAMI, el 3% de obra social y la retención de Ganancias. Son obligaciones de la ley: no necesitan tu consentimiento.",
  },
  {
    inciso: "c)",
    concepto: "Cuotas sindicales, mutuales y cooperativas",
    nota: "Desde el DNU 70/2023 el inciso exige «un consentimiento explícito del empleado autorizando el mismo». Y desde el 6/3/2026, si es un aporte convencional válido también para no afiliados, no puede pasar del 2%.",
  },
  {
    inciso: "d)",
    concepto: "Vivienda o mercaderías de entidades sindicales, mutuales o cooperativas",
    nota: "Reintegro de precios por compra o alquiler. Suma además los recaudos del art. 134.",
  },
  {
    inciso: "e)",
    concepto: "Seguros de vida colectivos, planes de retiro y subsidios",
    nota: "Del trabajador o su familia, aprobados por la autoridad de aplicación.",
  },
  {
    inciso: "f)",
    concepto: "Cajas de ahorro y cuotas de préstamos",
    nota: "Este inciso lo reescribió el art. 36 de la Ley 27.802: sumó a la Ciudad Autónoma de Buenos Aires entre las instituciones del Estado y agregó a las entidades bancarias como acreedoras del préstamo.",
  },
  {
    inciso: "g)",
    concepto: "Compra de acciones de la empresa",
    nota: "De capital o de goce, adquiridas por el trabajador a su empleador.",
  },
  {
    inciso: "h)",
    concepto: "Mercaderías compradas en el establecimiento",
    nota: "Sólo las que se fabrican o venden ahí, y con los cuatro recaudos del art. 134 (precio no superior al de plaza, bonificación razonable, venta real y sin exigencia del empleador).",
  },
  {
    inciso: "i)",
    concepto: "Compra de vivienda al empleador",
    nota: "Según planes aprobados por la autoridad competente.",
  },
];

export type FuenteDescuentos = { nombre: string; url: string; detalle: string };

export const DESCUENTOS_FUENTES: {
  consultadoEl: string;
  lista: FuenteDescuentos[];
} = {
  consultadoEl: "2026-08-20",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 131 (prohibición), 132 (las nueve excepciones, con el inc. f) reescrito por el art. 36 de la Ley 27.802 y el inc. c) por el DNU 70/2023), 133 con el texto del art. 37 de la Ley 27.802 y su nota de vigencia, y arts. 120 y 147 (inembargabilidad). En sus Antecedentes Normativos está la nota de la Resolución MTEySS 436/2004.",
    },
    {
      nombre: "Ley 20.744, texto original (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/norma.htm",
      detalle:
        "Su art. 147 (que el texto ordenado por Decreto 390/76 renumeró como art. 133) es la redacción que rigió hasta el 5 de marzo de 2026. Comparada palabra por palabra con la vigente: el 20% no se movió, y la última oración («con intervención de la asociación profesional de trabajadores representativa de la actividad») desapareció.",
    },
    {
      nombre: "Ley 27.802: Ley de Modernización Laboral (B.O. 6/3/2026)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Su art. 36 sustituyó el inc. f) del art. 132 de la LCT, su art. 37 sustituyó el art. 133, y su art. 133 sustituyó el art. 9º de la Ley 14.250. Ese es el que puso el tope del 2% a los aportes convencionales a favor de asociaciones de trabajadores y el de 0,5% a los de cámaras empresarias.",
    },
    {
      nombre: "Ley 14.250 (t.o. 2004 por Decreto 1135/2004): el art. 9º anterior",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/95000-99999/98232/norma.htm",
      detalle:
        "El texto que rigió hasta el 5 de marzo de 2026: declaraba válidas las contribuciones convencionales «no sólo para los afiliados, sino también para los no afiliados» y no fijaba ningún porcentaje. Es la prueba de que el tope del 2% no existía antes.",
    },
    {
      nombre: "Decreto 484/87: importes inembargables de las remuneraciones",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/75000-79999/77255/norma.htm",
      detalle:
        "Reglamenta los arts. 120, 147 y 149 de la LCT: piso inembargable de un SMVM, 10% del excedente hasta el doble del SMVM y 20% por encima, cálculo sobre el importe BRUTO (art. 2º), y sin límites cuando se trata de cuotas por alimentos o litis expensas (art. 4º).",
    },
    {
      nombre: "Resolución MTEySS 436/2004 (B.O. 25/11/2004)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/100000-104999/101307/norma.htm",
      detalle:
        "Permite exceder el tope del art. 133 «al sólo efecto» de la retención de Ganancias de la 4ª categoría, sin más límite que la tasa máxima aplicable. Derogó la Res. 930/1993, que había fijado ese permiso en un máximo del 30%.",
    },
  ],
};
