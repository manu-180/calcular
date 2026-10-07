// Qué ART responde en pluriempleo, qué ingresos integran la base y cómo se calcula una incapacidad
// incremental cuando existen contingencias sucesivas.
//
// POR QUÉ ESTE ARCHIVO EXISTE (9/9/2026). El art. 45 de la Ley 24.557 sólo encomienda al Poder
// Ejecutivo dictar normas complementarias para cuatro situaciones especiales. No resuelve quién
// paga, qué remuneraciones entran ni cómo se combinan incapacidades. Esas reglas están en los arts.
// 13 y 14 del Decreto 491/97, y cambian respuestas que suelen deducirse erróneamente por intuición.
//
// LOS TRES HALLAZGOS QUE JUSTIFICAN LA PÁGINA:
//
//   1. CON DOS TRABAJOS, LA ART QUE PAGA NO ES NECESARIAMENTE LA DEL LUGAR DEL ACCIDENTE. El art.
//      13 inc. a) manda a la Aseguradora del empleador cuya actividad implique la presencia del
//      agente de riesgo. En una enfermedad profesional puede ser la del otro empleo. Si el hecho es
//      atribuible a más de uno, el inc. b) desempata por la mayor remuneración sujeta a cotización
//      del mes anterior a la primera manifestación invalidante: es una regla de plata, no de lugar.
//
//   2. LA INDEMNIZACIÓN NO SE CALCULA SOBRE UN SOLO SUELDO. El inc. c) determina la cuantía en
//      relación con los ingresos base de las actividades alcanzadas, en plural. Liquidar sólo el
//      recibo del empleo cuya ART paga subindemniza. La obligada puede repetir de las restantes en
//      proporción a su responsabilidad (inc. d): ese reparto es entre aseguradoras.
//
//   3. EN UN SEGUNDO ACCIDENTE SE PAGA EL INCREMENTO, Y NO ES UNA RESTA ENTRE PORCENTAJES SUMADOS.
//      La incapacidad integral se obtiene aplicando capacidad restante: cada porcentaje nuevo cae
//      sobre lo que quedaba sano. La última ART paga la diferencia contra la incapacidad previa,
//      salvo dos excepciones tasadas: modalidad de pago distinta o incapacidad previa provisoria.
//
// FUENTES: textos ACTUALIZADOS del Decreto 491/97 (InfoLEG id 43703) y de la Ley 24.557 (id 27971),
// consultados el 9/9/2026.

export const VIGENCIA_PLURIEMPLEO = {
  norma: "Decreto 491/97, arts. 13 y 14",
  reglamentaA: "Ley 24.557, art. 45 incs. a) y c)",
  boletin: "B.O. 5 de junio de 1997",
  consultadoEl: "9 de septiembre de 2026",
} as const;

export const SITUACIONES_ART_45 = [
  {
    id: "a",
    texto: "Pluriempleo",
    reglamentadoPorEstosArticulos: true,
    reglamentacion: "Reglamentado por el art. 13 del Decreto 491/97.",
  },
  {
    id: "b",
    texto: "Relaciones laborales de duración determinada y a tiempo parcial",
    reglamentadoPorEstosArticulos: false,
    reglamentacion: "No está reglamentado por los arts. 13 y 14 del Decreto 491/97.",
  },
  {
    id: "c",
    texto: "Sucesión de siniestros",
    reglamentadoPorEstosArticulos: true,
    reglamentacion: "Reglamentado por el art. 14 del Decreto 491/97.",
  },
  {
    id: "d",
    texto: "Trabajador jubilado o con jubilación postergada",
    reglamentadoPorEstosArticulos: false,
    reglamentacion: "No está reglamentado por los arts. 13 y 14 del Decreto 491/97.",
  },
] as const;

export const REGLAS_PLURIEMPLEO = [
  {
    id: "a",
    titulo: "La actividad con presencia del agente de riesgo",
    texto:
      "Las prestaciones serán abonadas, otorgadas o contratadas por la Aseguradora del empleador cuya actividad implique la presencia del agente de riesgo para el cual hubiera estado trabajando al momento de producirse la contingencia.",
  },
  {
    id: "b",
    titulo: "Atribución a más de un empleo",
    texto:
      "Cuando por las circunstancias del accidente de trabajo o de la enfermedad profesional el hecho fuera atribuible a más de un empleo, las prestaciones serán abonadas, otorgadas o contratadas a favor del damnificado o sus derechohabientes, según el caso, por la Aseguradora del empleador respecto al cual el damnificado haya devengado mayor remuneración sujeta a cotización en el mes anterior a la primera manifestación invalidante.",
  },
  {
    id: "c",
    titulo: "Los ingresos base que determinan la cuantía",
    texto:
      "La cuantía de las prestaciones dinerarias se determinará en relación a los ingresos base del trabajador en las actividades que impliquen la presencia del agente de riesgo, o respecto de los empleos para los cuales se hubiera encontrado trabajando en el momento de producirse el accidente.",
  },
  {
    id: "d",
    titulo: "Repetición entre aseguradoras",
    texto:
      "La obligada al pago podrá repetir de las restantes Aseguradoras los costos de las prestaciones abonadas u otorgadas en la proporción en que cada una de ellas sea responsable.",
  },
] as const;

export const REGLAS_SUCESION = [
  {
    id: "a",
    titulo: "Regla general y excepciones",
    texto:
      "En caso de sucesión de siniestros la Aseguradora responsable de la cobertura de la última contingencia deberá abonar las prestaciones dinerarias correspondientes a la incapacidad incremental, salvo que se diera alguno de los supuestos que a continuación se detallan:\n1. El trabajador se hubiera encontrado en situación de incapacidad de carácter definitivo y que además, por la incapacidad integral correspondiera una prestación dineraria cuya modalidad de pago difiera de la prestación dineraria correspondiente a la incapacidad previa a la producción de la última contingencia, en cuyo caso la Aseguradora abonará, otorgará o contratará a su exclusivo cargo la prestación dineraria conforme la incapacidad integral del damnificado, o\n2. Que el trabajador se hubiera encontrado en situación de incapacidad provisoria, en cuyo caso se evaluará la incapacidad integral y las Aseguradoras concurrirán proporcionalmente de acuerdo a su responsabilidad.",
  },
  {
    id: "b",
    titulo: "Incapacidad incremental e integral",
    texto:
      "Se entenderá por incapacidad incremental a la diferencia que surja entre el porcentaje de incapacidad integral y el de la incapacidad previa a la producción de la última contingencia. El porcentaje de incapacidad integral surgirá de sumar las incapacidades resultantes de cada contingencia aplicando el criterio de capacidad restante, excepto que en la Tabla de Evaluación de Incapacidades Laborales el porcentaje previsto para la pérdida derivada de todas las contingencias fuera mayor, en cuyo caso se lo tomará como el porcentaje de incapacidad integral.",
  },
  {
    id: "c",
    titulo: "Prestaciones en especie",
    texto:
      "Respecto de las prestaciones en especie, el otorgamiento estará a cargo del responsable en la última contingencia, salvo opción del trabajador en contrario respecto de la atención de las incapacidades derivadas de contingencias anteriores.",
  },
  {
    id: "d",
    titulo: "Siniestralidad efectiva",
    texto:
      "Sin perjuicio de lo expuesto, a los fines del cómputo de la siniestralidad efectiva del empleador de la última contingencia, se le imputará exclusivamente la incapacidad incremental.",
  },
] as const;

export const PLURIEMPLEO_FUENTES = {
  consultadoEl: "9 de septiembre de 2026",
  lista: [
    {
      nombre: "Decreto 491/97, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/43703/texact.htm",
      detalle:
        "Arts. 13 y 14: pluriempleo, aseguradora obligada, ingresos base, repetición, sucesión de siniestros, capacidad restante y prestaciones en especie.",
    },
    {
      nombre: "Ley 24.557, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27971/texact.htm",
      detalle:
        "Art. 45: delegación al Poder Ejecutivo para reglamentar las cuatro situaciones especiales enumeradas por la ley.",
    },
  ],
} as const;
