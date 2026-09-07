// Salario Mínimo, Vital y Móvil (SMVM) — reglas, textos y lo que el SMVM determina.
//
// POR QUÉ ESTE ARCHIVO EXISTE: "cuánto es el salario mínimo" es la pregunta más buscada del tema y
// la peor contestada. Todas las notas publican el número del mes y ninguna publica lo que hace que
// ese número signifique algo: que es el piso de la JORNADA LEGAL COMPLETA (quien trabaja menos
// horas cobra la proporción), que se expresa en montos mensuales, diarios u horarios (art. 118
// LCT), y que de él cuelgan otros seis números del derecho laboral argentino.
//
// LA ESCALA NO VIVE ACÁ: vive en `SMVM_SERIE` de `desempleo.ts`, que es la fuente única desde que
// la prestación por desempleo se derivó de ella. Duplicarla sería garantizar que un día difieran.
//
// HALLAZGO DEL 2/9/2026 (s102): la Res. 4/2026 del Consejo (B.O. 2/9/2026) NO es un acuerdo. El
// 28/8/2026 la reunión terminó sin acuerdo (art. 137 de la Ley 24.013) y la escala salió por LAUDO
// de la presidencia alterna. Un laudo no fija un mes: dejó escrito el SMVM mes a mes hasta ABRIL
// DE 2027. O sea que el salario mínimo de los próximos ocho meses ya está publicado en el Boletín
// Oficial y no depende de ninguna negociación futura — que es exactamente lo contrario de lo que
// sugiere el titular "el Gobierno fijó el salario mínimo de septiembre".

// La jornada legal no se redeclara: es la misma constante que usa /tiempo-parcial (LCT art. 196,
// que remite a la Ley 11.544). Dos definiciones del mismo número son dos números que un día difieren.
export { JORNADA_LEGAL_SEMANAL, JORNADA_LEGAL_DIARIA } from "@/data/tiempo-parcial";

/**
 * Horas mensuales que la propia resolución le asigna a la jornada legal completa: no es un
 * supuesto nuestro, es una división que cierra al peso en todos los meses de la escala
 * (mensual ÷ porHora = 200). `check_salario_minimo.ts` lo verifica mes por mes.
 */
export const HORAS_MENSUALES_JORNADA_COMPLETA = 200;

/** Edad desde la que el art. 117 de la LCT reconoce el derecho al SMVM. */
export const EDAD_ART_117 = 18;

/** Textos verbatim. El ancla contra la que el check verifica que no se los resuma ni se los pise. */
export const SMVM_TEXTOS = {
  art116:
    "Salario mínimo vital, es la menor remuneración que debe percibir en efectivo el trabajador sin cargas de familia, en su jornada legal de trabajo, de modo que le asegure alimentación adecuada, vivienda digna, educación, vestuario, asistencia sanitaria, transporte y esparcimiento, vacaciones y previsión.",
  art117:
    "Todo trabajador mayor de dieciocho (18) años, tendrá derecho a percibir una remuneración no inferior al salario mínimo vital que se establezca, conforme a la ley y por los organismos respectivos.",
  art118:
    "El salario mínimo vital se expresará en montos mensuales, diarios u horarios. Los subsidios o asignaciones por carga de familia, son independientes del derecho a la percepción del salario mínimo vital que prevé este capítulo, y cuyo goce se garantizará en todos los casos al trabajador que se encuentre en las condiciones previstas en la ley que los ordene y reglamente.",
  art119:
    "Por ninguna causa podrán abonarse salarios inferiores a los que se fijen de conformidad al presente capítulo, salvo los que resulten de reducciones para aprendices o para trabajadores que cumplan jornadas de trabajo reducida, no impuesta por la calificación, de acuerdo con lo dispuesto en el artículo 200.",
  art120:
    "El salario mínimo vital es inembargable en la proporción que establezca la reglamentación, salvo por deudas alimentarias.",
  /** Art. 1º de la Res. 4/2026: el encabezado, con el alcance y la exclusión de las asignaciones. */
  resolucionArt1:
    "Fíjese para todos los trabajadores comprendidos en el Régimen de Contrato de Trabajo aprobado por la Ley Nº 20.744 (t.o. 1976) y sus modificatorias, en el Régimen de Trabajo Agrario, de la Administración Pública Nacional y de todas las entidades y organismos del Estado Nacional que actúe como empleador, un Salario Mínimo, Vital y Móvil excluidas las asignaciones familiares, y de conformidad con lo normado en el artículo 140 de la Ley Nº 24.013 y modificatorias",
  /** La frase del inciso a) que manda la proporción para jornada reducida y tiempo parcial. */
  resolucionProporcion:
    "para todos los trabajadores mensualizados que cumplen la jornada legal completa de trabajo, conforme el artículo 116 del Régimen de Contrato de Trabajo aprobado por la Ley N° 20.744 (t.o. 1976) y sus modificatorias, con excepción de las situaciones previstas en los artículos 92 ter y 198, del mismo cuerpo legal, que lo percibirán en su debida proporción",
  /** El considerando que convierte a la 4/2026 en un laudo y no en un acuerdo. */
  considerandoLaudo:
    "Que luego de un extenso intercambio de opiniones, no se logró alcanzar un acuerdo, en los términos de lo establecido en el artículo 137 de la Ley N° 24.013 y sus modificatorias.",
} as const;

/**
 * Lo que el SMVM DETERMINA. Es el valor agregado de la página: el número suelto no sirve de nada,
 * lo que importa es que arrastra otros siete. Cada fila apunta a la calculadora que lo resuelve.
 * `factor` es la fracción del SMVM cuando el derivado es un múltiplo exacto; null si es una regla.
 */
export type DerivadoSmvm = {
  concepto: string;
  regla: string;
  factor: number | null;
  norma: string;
  href: string | null;
};

export const DERIVADOS_SMVM: DerivadoSmvm[] = [
  {
    concepto: "Piso de la prestación por desempleo",
    regla: "50% del SMVM vigente",
    factor: 0.5,
    norma: "art. 2 Res. CNEPySMVM 4/2026",
    href: "/desempleo",
  },
  {
    concepto: "Techo de la prestación por desempleo",
    regla: "100% del SMVM vigente",
    factor: 1,
    norma: "art. 2 Res. CNEPySMVM 4/2026",
    href: "/desempleo",
  },
  {
    concepto: "Parte del sueldo que no se puede embargar",
    regla: "un SMVM entero es inembargable; sobre el excedente se embarga el 10% o el 20%",
    factor: 1,
    norma: "art. 120 LCT · art. 1º Dec. 484/87",
    href: "/descuentos-del-sueldo",
  },
  {
    concepto: "Escalón del embargo, donde el 10% pasa a 20%",
    regla: "el doble del SMVM",
    factor: 2,
    norma: "art. 1º inc. 2 Dec. 484/87",
    href: "/descuentos-del-sueldo",
  },
  {
    concepto: "Tope de ingresos compatible con la pensión no contributiva",
    regla: "dos SMVM de ingresos por trabajo",
    factor: 2,
    norma: "art. 7 Ley 27.793",
    href: "/pension-no-contributiva",
  },
  {
    concepto: "Multas por prácticas desleales e infracciones laborales",
    regla: "se gradúan como porcentaje del SMVM vigente al momento de la constatación",
    factor: null,
    norma: "Anexo II Ley 25.212, art. 5º (texto Ley 26.941)",
    href: "/practicas-desleales-sindicales",
  },
  {
    concepto: "Garantía del haber jubilatorio del 82%",
    regla: "82% del SMVM, para quien acredite 30 años de aportes",
    factor: 0.82,
    norma: "art. 125 bis Ley 24.241",
    href: "/82-por-ciento-movil",
  },
];

export type FuenteSmvm = { nombre: string; url: string; detalle: string };

export const SMVM_FUENTES: { consultadoEl: string; lista: FuenteSmvm[] } = {
  consultadoEl: "2026-09-02",
  lista: [
    {
      nombre: "Resolución 4/2026 — Consejo Nacional del Empleo, la Productividad y el SMVM",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346775/20260902",
      detalle:
        "B.O. 2/9/2026 — laudo dictado al no haber acuerdo el 28/8/2026: fija el SMVM mes a mes de septiembre de 2026 a abril de 2027 (art. 1) y mantiene la fórmula de la prestación por desempleo (art. 2).",
    },
    {
      nombre: "Ley de Contrato de Trabajo, arts. 116 a 120 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Concepto del salario mínimo vital, alcance desde los 18 años, modalidades de determinación, prohibición de pagar menos e inembargabilidad.",
    },
    {
      nombre: "Ley 24.013, arts. 135 a 140 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/412/texact.htm",
      detalle:
        "Crea el Consejo del Salario, le da la atribución de fijar el SMVM y regula el laudo del art. 137 cuando no hay acuerdo.",
    },
    {
      nombre: "Resolución 9/2025 — Consejo Nacional del Empleo, la Productividad y el SMVM",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/335463/20251203",
      detalle: "B.O. 3/12/2025 — la escala anterior, de noviembre de 2025 a agosto de 2026.",
    },
  ],
};
