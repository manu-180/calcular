// Fuente única de la navegación: header, cajón mobile, footer, home, buscador y los títulos
// del panel salen de acá. Datos puros: lo importan componentes de servidor sin costo y el
// cliente SOLO por import dinámico (menú y buscador), para que no viaje en el JS de cada página.
// Una página nueva que no se agregue acá queda fuera del menú, del footer y del buscador.

export type TipoPagina = "calculadora" | "guia" | "planilla" | "archivo" | "info";

export type GrupoId =
  | "monotributo"
  | "sueldo"
  | "convenios"
  | "impuestos"
  | "fin"
  | "licencias"
  | "regimenes"
  | "sindical"
  | "anses"
  | "plata"
  | "planillas"
  | "guias"
  | "sitio";

export type Pagina = {
  href: string;
  titulo: string;
  descripcion?: string;
  grupo: string;
  vende?: string;
  grupoId: GrupoId;
  tipo: TipoPagina;
  corto?: string;
  claves?: string[];
  menu?: boolean;
};

export type Grupo = {
  id: GrupoId;
  titulo: string;
  corto?: string;
  nota: string;
  destacados?: string[];
};

export const GRUPOS: Grupo[] = [
  {
    id: "monotributo",
    titulo: "Monotributo",
    nota: "Categoría, cuota y recategorización con la tabla de ARCA",
    destacados: ["/planillas/monotributo"],
  },
  {
    id: "sueldo",
    titulo: "Tu sueldo",
    nota: "Lo que cobrás todos los meses, y de dónde sale cada número",
  },
  {
    id: "convenios",
    titulo: "Sueldos por convenio",
    corto: "Convenios",
    nota: "Escalas verificadas contra la circular oficial de cada gremio",
    destacados: ["/planillas", "/planillas/uocra"],
  },
  {
    id: "impuestos",
    titulo: "Impuestos y deducciones",
    nota: "Ganancias y lo que se puede descontar",
  },
  {
    id: "fin",
    titulo: "Cuando termina el trabajo",
    nota: "Indemnización, liquidación final y los plazos que corren",
  },
  {
    id: "licencias",
    titulo: "Licencias y ausencias",
    nota: "Hasta qué día exacto, con los feriados aplicados",
  },
  {
    id: "regimenes",
    titulo: "Casas particulares y regímenes especiales",
    corto: "Regímenes especiales",
    nota: "Empleada doméstica, apps, estatutos y los regímenes de la reforma",
    destacados: ["/planillas/casas-particulares"],
  },
  {
    id: "sindical",
    titulo: "Sindical y juicio laboral",
    nota: "Lo que cambió en marzo de 2026 y casi nadie publicó",
  },
  {
    id: "anses",
    titulo: "Jubilaciones y ANSES",
    nota: "Haberes, bonos y pensiones, con la resolución del mes",
  },
  {
    id: "plata",
    titulo: "Plata y precios",
    nota: "Inflación, alquiler y rendimientos con datos del INDEC y el BCRA",
    destacados: ["/planillas/alquileres", "/informes/cuota-alimentaria"],
  },
  {
    id: "planillas",
    titulo: "Planillas",
    nota: "La cuenta de la calculadora, en Excel o en un informe listo",
  },
  { id: "guias", titulo: "Guías", nota: "Tu plata explicada con datos oficiales" },
  { id: "sitio", titulo: "CalculAR", nota: "El sitio" },
];

/** Los temas de calculadoras, en el orden en que la gente busca: lo mensual primero. */
export const GRUPOS_DE_CALCULADORAS: GrupoId[] = [
  "monotributo",
  "sueldo",
  "convenios",
  "impuestos",
  "fin",
  "licencias",
  "regimenes",
  "sindical",
  "anses",
  "plata",
];

type Def = Omit<Pagina, "grupo" | "grupoId" | "tipo"> & { tipo?: TipoPagina };

const COMERCIO = "planilla-comercio";
const UOCRA = "planilla-uocra";
const CASAS = "planilla-casas-particulares";
const MONO = "planilla-monotributo";
const ALQUILERES = "planilla-alquileres";
const CUOTA = "informe-cuota-alimentaria";
const CAMIONEROS = "planilla-camioneros";
const MI_SUELDO = "planilla-mi-sueldo";
const VACACIONES = "planilla-vacaciones";
const PLAZO_FIJO = "planilla-plazo-fijo";
const DESPIDO = "informe-indemnizacion";
const GANANCIAS = "informe-ganancias";
const INFLACION = "informe-inflacion";
const CREDITO = "informe-credito-laboral";

const DEFS: Record<GrupoId, Def[]> = {
  monotributo: [
    {
      href: "/monotributo",
      titulo: "Calculadora de monotributo",
      corto: "Calculadora",
      descripcion: "Tu categoría y cuánto pagás por mes",
      vende: MONO,
      claves: ["monotributista", "categoria", "cuota mensual", "arca", "afip", "facturacion", "regimen simplificado"],
    },
    {
      href: "/monotributo/categorias",
      titulo: "Categorías del monotributo",
      corto: "Categorías 2026",
      descripcion: "La tabla oficial completa de ARCA",
      vende: MONO,
      claves: ["tabla", "escala", "topes", "valores", "limite de facturacion"],
    },
    {
      href: "/monotributo/recategorizacion",
      titulo: "Recategorización del monotributo",
      corto: "Recategorización",
      descripcion: "Cuándo es y si te toca cambiar de categoría",
      vende: MONO,
      claves: ["recategorizar", "cambiar de categoria", "subir de categoria", "me recategorizaron", "exclusion", "radar"],
    },
    {
      href: "/obra-social-monotributo",
      titulo: "Obra social del monotributo",
      corto: "Obra social",
      descripcion: "Desde cuándo te cubre y qué te pueden negar",
      vende: MONO,
      claves: ["prepaga", "cobertura", "carencia", "internacion", "alta"],
    },
  ],
  sueldo: [
    {
      href: "/sueldo-neto",
      titulo: "Sueldo neto",
      descripcion: "De bruto a en mano, y al revés",
      vende: MI_SUELDO,
      claves: ["sueldo en mano", "bruto a neto", "neto a bruto", "aportes", "recibo", "cuanto cobro", "salario", "descuentos de ley", "17%"],
    },
    {
      href: "/sueldo-en-el-mundo",
      titulo: "Tu sueldo en el mundo",
      corto: "Sueldo en el mundo",
      descripcion: "Hasta qué día trabajás para el Estado y cuánto cobrarías afuera",
      claves: ["dia de libertad tributaria", "trabajar para el estado", "impuestos", "otros paises", "emigrar", "sueldo en dolares", "comparar sueldo", "poder de compra"],
    },
    {
      href: "/aguinaldo",
      titulo: "Aguinaldo (SAC)",
      descripcion: "Cuánto cobrás en junio y diciembre",
      claves: ["sac", "medio aguinaldo", "sueldo anual complementario", "proporcional", "junio", "diciembre"],
    },
    {
      href: "/aguinaldo/neto",
      titulo: "Aguinaldo en mano",
      descripcion: "Cuánto queda del SAC después de los aportes",
      menu: false,
      claves: ["aguinaldo neto", "sac neto", "bruto", "tabla"],
    },
    {
      href: "/aguinaldo/fechas",
      titulo: "Cuándo se paga el aguinaldo",
      descripcion: "Fechas por provincia, ANSES y privados",
      menu: false,
      claves: ["fecha de pago", "cuando cobro", "vencimiento", "provincias", "jubilados"],
    },
    {
      href: "/vacaciones",
      titulo: "Vacaciones",
      descripcion: "Días por antigüedad y plus vacacional",
      vende: VACACIONES,
      claves: ["dias de vacaciones", "plus vacacional", "licencia anual", "antiguedad", "no gozadas"],
    },
    {
      href: "/horas-extras",
      titulo: "Horas extras",
      descripcion: "Al 50 %, al 100 % y el banco de horas",
      claves: ["horas suplementarias", "50", "100", "banco de horas", "francos", "feriado trabajado"],
    },
    {
      href: "/salario-minimo",
      titulo: "Salario mínimo",
      descripcion: "El SMVM de este mes y la escala hasta 2027",
      claves: ["smvm", "salario minimo vital y movil", "minimo", "por hora"],
    },
    {
      href: "/tiempo-parcial",
      titulo: "Media jornada",
      descripcion: "Cuánto te tienen que pagar a tiempo parcial",
      claves: ["part time", "tiempo parcial", "medio tiempo", "jornada reducida"],
    },
    {
      href: "/descuentos-del-sueldo",
      titulo: "Descuentos y embargo",
      descripcion: "Hasta cuánto te pueden descontar del sueldo",
      claves: ["embargo", "embargo de sueldo", "cuota sindical", "retencion", "art 133"],
    },
    {
      href: "/derivar-aportes-a-prepaga",
      titulo: "Aportes de obra social",
      descripcion: "Cuánto llega si derivás a una prepaga",
      claves: ["prepaga", "derivar aportes", "osde", "swiss medical", "fondo solidario"],
    },
    {
      href: "/hasta-cuando-tengo-obra-social",
      titulo: "Obra social al irte",
      descripcion: "Hasta cuándo te cubre después del trabajo",
      claves: ["obra social despues del despido", "tres meses", "cobertura", "renuncia"],
    },
    {
      href: "/propinas",
      titulo: "Propinas",
      descripcion: "Por qué ya no cuentan como sueldo",
      claves: ["propina", "gastronomia", "mozo", "remunerativa"],
    },
    {
      href: "/libro-de-sueldos",
      titulo: "Libro de sueldos",
      descripcion: "La registración y la presunción del art. 55",
      claves: ["libro art 52", "registracion", "empleador", "presuncion"],
    },
    {
      href: "/conservacion-de-recibos",
      titulo: "Guardar recibos",
      descripcion: "Cuántos años hay que guardar los recibos",
      claves: ["recibos de sueldo", "cuanto tiempo", "conservar", "prescripcion"],
    },
  ],
  convenios: [
    {
      href: "/convenios",
      titulo: "Todos los convenios",
      descripcion: "Escalas verificadas por gremio",
      claves: ["convenio colectivo", "cct", "paritarias", "escala salarial", "gremio", "sindicato"],
    },
    {
      href: "/convenios/comercio",
      titulo: "Empleados de Comercio",
      descripcion: "Tu sueldo por categoría con la escala de FAECYS",
      vende: COMERCIO,
      claves: ["comercio", "faecys", "130/75", "empleado de comercio", "vendedor", "cajero", "administrativo"],
    },
    {
      href: "/sueldo-neto/comercio",
      titulo: "Sueldo neto de Comercio",
      descripcion: "Cuánto queda en mano por categoría",
      vende: COMERCIO,
      menu: false,
      claves: ["comercio en mano", "neto comercio"],
    },
    {
      href: "/dia-del-empleado-de-comercio",
      titulo: "Día del Empleado de Comercio",
      descripcion: "En 2026 se pasó al lunes 28 de septiembre",
      vende: COMERCIO,
      claves: ["26 de septiembre", "feriado de comercio", "dia del empleado"],
    },
    {
      href: "/convenios/uocra",
      titulo: "UOCRA (construcción)",
      descripcion: "Jornales por categoría, zona y jornada",
      vende: UOCRA,
      claves: ["uocra", "construccion", "albanil", "oficial", "ayudante", "76/75", "obrero"],
    },
    {
      href: "/sueldo-neto/construccion",
      titulo: "Sueldo neto de la construcción",
      descripcion: "Cuánto queda en mano por categoría y zona",
      vende: UOCRA,
      menu: false,
      claves: ["uocra en mano", "construccion neto"],
    },
    {
      href: "/convenios/camioneros",
      titulo: "Camioneros",
      descripcion: "La escala firmada de FADEEAC, mes a mes",
      vende: CAMIONEROS,
      claves: ["camionero", "chofer", "fadeeac", "40/89", "transporte", "moyano"],
    },
    {
      href: "/sueldo-neto/camioneros",
      titulo: "Sueldo neto de camioneros",
      descripcion: "Cuánto queda en mano por categoría",
      menu: false,
      vende: CAMIONEROS,
      claves: ["camionero en mano"],
    },
  ],
  impuestos: [
    {
      href: "/ganancias",
      titulo: "Ganancias 4.ª categoría",
      descripcion: "Cuánto te retienen de Ganancias por mes",
      vende: GANANCIAS,
      claves: ["impuesto a las ganancias", "retencion", "cuarta categoria", "4ta", "sueldo", "siradig", "f572"],
    },
    {
      href: "/deduccion-empleada-domestica",
      titulo: "Deducción de empleada doméstica",
      descripcion: "Cuánto te vuelve de verdad en Ganancias",
      claves: ["deduccion", "empleada", "casas particulares", "siradig"],
    },
    {
      href: "/deduccion-alquiler",
      titulo: "Deducción de alquiler",
      descripcion: "Cuánto te vuelve por deducir el alquiler",
      claves: ["alquiler", "deduccion", "inquilino", "siradig"],
    },
    {
      href: "/deducciones-generales-ganancias",
      titulo: "Prepaga, médicos y seguros",
      descripcion: "Las deducciones generales y sus topes",
      claves: ["deducciones", "prepaga", "honorarios medicos", "seguro de vida", "donaciones", "hipotecario"],
    },
    {
      href: "/ganancias-jubilados",
      titulo: "Ganancias para jubilados",
      descripcion: "Desde qué haber se paga",
      claves: ["jubilados", "pensionados", "8 haberes", "jubilacion"],
    },
    {
      href: "/ganancias-autonomos",
      titulo: "Ganancias para autónomos",
      descripcion: "La deducción especial y los nuevos profesionales",
      claves: ["autonomos", "profesionales", "independientes", "deduccion especial"],
    },
    {
      href: "/ganancias-sociedades",
      titulo: "Ganancias de sociedades",
      descripcion: "La escala del 25, 30 y 35 %",
      claves: ["sociedades", "sa", "sas", "srl", "empresa", "dividendos"],
    },
    {
      href: "/prescripcion-deuda-arca",
      titulo: "Prescripción de deuda con ARCA",
      descripcion: "Cuándo prescribe: a los 5, 3 o 10 años",
      claves: ["prescripcion", "deuda afip", "deuda arca", "prescribe"],
    },
    {
      href: "/multas-arca",
      titulo: "Multas de ARCA",
      descripcion: "Cuánto son desde la Ley 27.799",
      claves: ["multa", "afip", "declaracion jurada", "ddjj", "deberes formales"],
    },
    {
      href: "/actualizacion-de-quebrantos",
      titulo: "Quebrantos por IPC",
      descripcion: "Cómo se actualizan las pérdidas de otros años",
      claves: ["quebrantos", "perdidas", "ipc"],
    },
    {
      href: "/venta-de-inmuebles",
      titulo: "Vender un inmueble",
      descripcion: "Desde 2026 no se paga el impuesto cedular",
      claves: ["venta de casa", "vender departamento", "impuesto cedular", "iti", "propiedad"],
    },
    {
      href: "/impuestos-internos",
      titulo: "Impuestos internos",
      descripcion: "Qué dejó de pagarse con la reforma",
      claves: ["internos", "celulares", "seguros", "eliminados"],
    },
    {
      href: "/rimi-inversiones",
      titulo: "RIMI",
      descripcion: "El incentivo para medianas inversiones",
      claves: ["inversiones", "amortizacion acelerada", "pyme"],
    },
  ],
  fin: [
    {
      href: "/indemnizacion",
      titulo: "Indemnización por despido",
      descripcion: "Antigüedad, preaviso, aguinaldo y vacaciones",
      vende: DESPIDO,
      claves: ["despido", "me echaron", "me despidieron", "despido sin causa", "liquidacion final", "art 245", "preaviso", "finiquito", "cuanto me corresponde"],
    },
    {
      href: "/periodo-de-prueba",
      titulo: "Período de prueba",
      descripcion: "Qué te pagan si te despiden en la prueba",
      claves: ["prueba", "despido en periodo de prueba", "seis meses"],
    },
    {
      href: "/renuncia",
      titulo: "Renuncia",
      descripcion: "Qué te tienen que pagar si te vas",
      claves: ["renunciar", "me voy", "telegrama", "liquidacion final", "renuncia voluntaria"],
    },
    {
      href: "/desempleo",
      titulo: "Prestación por desempleo",
      descripcion: "Cuánto cobrás de seguro y por cuántos meses",
      claves: ["seguro de desempleo", "fondo de desempleo", "anses", "despido"],
    },
    {
      href: "/certificado-de-trabajo",
      titulo: "Certificado de trabajo",
      descripcion: "El plazo de 45 días y la multa que ya no existe",
      claves: ["art 80", "certificacion de servicios", "multa"],
    },
    {
      href: "/actualizacion-creditos-laborales",
      titulo: "Actualizar lo que te deben",
      descripcion: "IPC más 3 % anual desde que se debe",
      vende: CREDITO,
      claves: ["intereses", "actualizacion", "deuda laboral", "juicio", "art 276", "credito laboral"],
    },
    {
      href: "/despido-plazo-fijo",
      titulo: "Despido antes del plazo",
      descripcion: "Un contrato a plazo cortado antes de tiempo",
      claves: ["contrato a plazo", "art 95", "eventual"],
    },
    {
      href: "/indemnizacion-por-fallecimiento",
      titulo: "Muerte del trabajador",
      descripcion: "Quién cobra y cuánto (art. 248)",
      claves: ["fallecimiento", "murio", "muerte", "viuda", "herederos", "art 248"],
    },
    {
      href: "/indemnizacion-art",
      titulo: "Accidente de trabajo (ART)",
      descripcion: "La indemnización con los pisos vigentes",
      claves: ["art", "accidente", "accidente laboral", "incapacidad", "riesgos del trabajo", "enfermedad profesional", "in itinere"],
    },
    {
      href: "/comision-medica",
      titulo: "Comisión médica",
      descripcion: "Los 60 días hábiles que te habilitan el juicio",
      claves: ["srt", "dictamen", "plazos", "art"],
    },
    {
      href: "/derechohabientes-art",
      titulo: "Quién cobra la muerte laboral",
      descripcion: "Las dos listas de beneficiarios",
      claves: ["derechohabientes", "beneficiarios", "conviviente", "hijos"],
    },
    {
      href: "/empleador-sin-art",
      titulo: "Empleador sin ART al día",
      descripcion: "Quién te paga si te accidentás",
      claves: ["sin art", "no tiene art", "deuda", "accidente", "en negro"],
    },
    {
      href: "/rechazo-art",
      titulo: "Rechazo de la ART",
      descripcion: "Si el rechazo llegó a tiempo",
      claves: ["rechazo", "rechazaron", "10 dias", "siniestro"],
    },
    {
      href: "/pluriempleo-art",
      titulo: "Pluriempleo y ART",
      descripcion: "Dos trabajos y un accidente",
      claves: ["dos trabajos", "dos empleos", "incapacidad"],
    },
    {
      href: "/reingreso",
      titulo: "Reingreso al mismo empleador",
      descripcion: "Qué antigüedad te cuentan",
      claves: ["volver a trabajar", "antiguedad", "art 18", "art 255"],
    },
    {
      href: "/despido-trabajador-rural",
      titulo: "Despido rural",
      descripcion: "Prueba de 8 meses y piso de 2 sueldos",
      claves: ["rural", "campo", "peon", "trabajo agrario", "renatre"],
    },
    {
      href: "/ius-variandi",
      titulo: "Ius variandi",
      descripcion: "Qué hacer si te cambian horario o tareas",
      claves: ["cambio de horario", "cambio de tareas", "art 66", "despido indirecto"],
    },
    {
      href: "/transferencia-del-establecimiento",
      titulo: "Cambio de dueño",
      descripcion: "Tu antigüedad y quién responde",
      claves: ["transferencia", "venta de la empresa", "nuevo dueno", "art 225"],
    },
  ],
  licencias: [
    {
      href: "/licencia-por-maternidad",
      titulo: "Licencia por maternidad",
      descripcion: "Fechas exactas y cuánto cobrás",
      claves: ["embarazo", "parto", "maternidad", "90 dias", "licencia maternal"],
    },
    {
      href: "/licencia-por-enfermedad",
      titulo: "Licencia por enfermedad",
      descripcion: "Cuántos meses y hasta qué día cobrás",
      claves: ["enfermedad inculpable", "art 208", "reposo", "certificado medico", "enfermo"],
    },
    {
      href: "/licencias-especiales",
      titulo: "Licencias especiales",
      descripcion: "Casamiento, nacimiento, fallecimiento y examen",
      claves: ["matrimonio", "casamiento", "nacimiento", "paternidad", "fallecimiento", "duelo", "examen", "art 158"],
    },
    {
      href: "/reserva-del-empleo",
      titulo: "Reserva del empleo",
      descripcion: "Qué pasa si no te reincorporan",
      claves: ["reserva del puesto", "reincorporacion", "alta medica"],
    },
    {
      href: "/trabajo-de-mujeres",
      titulo: "Trabajo de mujeres",
      descripcion: "Qué quedó vigente después de la reforma",
      claves: ["mujer", "descanso", "derogado", "art 174", "art 176"],
    },
  ],
  regimenes: [
    {
      href: "/empleada-domestica",
      titulo: "Empleada doméstica",
      descripcion: "Cuánto cobra por hora y por mes",
      vende: CASAS,
      claves: ["casas particulares", "empleada", "domestica", "servicio domestico", "ninera", "cuidadora", "limpieza", "escala", "por hora"],
    },
    {
      href: "/aportes-empleada-domestica",
      titulo: "Aportes de empleada doméstica",
      descripcion: "Lo que el empleador le paga a ARCA",
      vende: CASAS,
      claves: ["aportes", "casas particulares", "vep", "arca", "obra social"],
    },
    {
      href: "/despido-empleada-domestica",
      titulo: "Despido de empleada doméstica",
      descripcion: "La liquidación final de casas particulares",
      vende: CASAS,
      claves: ["despido", "casas particulares", "indemnizacion", "liquidacion"],
    },
    {
      href: "/art-empleada-domestica",
      titulo: "ART de casas particulares",
      descripcion: "Sobre qué sueldo se liquida",
      vende: CASAS,
      claves: ["art", "accidente", "empleada domestica"],
    },
    {
      href: "/repartidores-de-apps",
      titulo: "Repartidores de apps",
      descripcion: "Cuánto te queda por mes con el régimen nuevo",
      claves: ["rappi", "pedidosya", "uber", "didi", "repartidor", "conductor", "plataformas", "delivery"],
    },
    {
      href: "/rifl",
      titulo: "RIFL: contratar más barato",
      corto: "RIFL (contratar más barato)",
      descripcion: "Cuánto bajan las contribuciones patronales",
      claves: ["incentivo", "formalizacion", "contribuciones patronales", "contratar", "nuevo empleado"],
    },
    {
      href: "/contratar-persona-con-discapacidad",
      titulo: "Contratar con discapacidad",
      descripcion: "El 50 % de contribuciones por 3 años",
      claves: ["discapacidad", "cud", "beneficio", "contribuciones"],
    },
    {
      href: "/fondo-de-asistencia-laboral",
      titulo: "Fondo de Asistencia Laboral",
      descripcion: "Cuánto se aporta desde noviembre de 2026",
      claves: ["fal", "fondo de cese", "aporte del empleador"],
    },
    {
      href: "/indemnizacion-por-clientela",
      titulo: "Indemnización por clientela",
      descripcion: "El 25 % del viajante de comercio",
      claves: ["viajante", "viajante de comercio", "vendedor", "comisiones"],
    },
    {
      href: "/indemnizacion-periodista",
      titulo: "Indemnización del periodista",
      descripcion: "El estatuto y lo que cambia en 2027",
      claves: ["periodista", "estatuto del periodista", "prensa", "medios"],
    },
  ],
  sindical: [
    {
      href: "/despido-de-delegado-gremial",
      titulo: "Despido de delegado gremial",
      descripcion: "Cuánto se cobra con el art. 52 nuevo",
      claves: ["delegado", "tutela sindical", "gremio", "sindicato"],
    },
    {
      href: "/practicas-desleales-sindicales",
      titulo: "Prácticas desleales",
      descripcion: "Las 8 conductas nuevas y la multa",
      claves: ["sindicato", "multa", "art 53"],
    },
    {
      href: "/servicios-esenciales-huelga",
      titulo: "Servicios esenciales",
      descripcion: "La lista vigente y las guardias mínimas",
      claves: ["huelga", "paro", "guardias minimas", "75"],
    },
    {
      href: "/negociacion-de-buena-fe",
      titulo: "Negociar de buena fe",
      descripcion: "La multa del 20 % ahora es obligatoria",
      claves: ["negociacion colectiva", "paritaria", "multa"],
    },
    {
      href: "/convenio-vencido",
      titulo: "Convenio vencido",
      descripcion: "Qué te sigue aplicando",
      claves: ["ultraactividad", "convenio colectivo", "cct"],
    },
    {
      href: "/caducidad-de-instancia-laboral",
      titulo: "Caducidad de instancia",
      descripcion: "Los plazos de 6, 3 y 1 mes",
      claves: ["caducidad", "juicio laboral", "expediente"],
    },
    {
      href: "/temeridad-y-malicia",
      titulo: "Temeridad y malicia",
      descripcion: "La sanción del art. 275, derogada",
      claves: ["temeridad", "malicia", "art 275", "mala fe"],
    },
    {
      href: "/honorarios-periciales",
      titulo: "Honorarios de peritos",
      descripcion: "El piso bajó de 6 a 2 UMA",
      claves: ["perito", "uma", "honorarios", "pericia"],
    },
  ],
  anses: [
    {
      href: "/jubilacion",
      titulo: "Jubilación y bono",
      descripcion: "Con tu haber real, no con la mínima",
      claves: ["jubilacion", "jubilados", "haber minimo", "bono", "aumento", "anses", "movilidad", "pension"],
    },
    {
      href: "/asignaciones-familiares",
      titulo: "Asignaciones familiares",
      descripcion: "Cuánto cobrás por hijo según lo que suma tu casa",
      claves: ["auh", "asignacion universal", "salario familiar", "hijo", "ayuda escolar", "anses", "tope"],
    },
    {
      href: "/puam",
      titulo: "PUAM",
      corto: "PUAM (adulto mayor)",
      descripcion: "La pensión universal del adulto mayor",
      claves: ["pension universal", "adulto mayor", "65", "sin aportes"],
    },
    {
      href: "/edad-avanzada",
      titulo: "Prestación por edad avanzada",
      descripcion: "A los 70 con 10 años de aportes",
      claves: ["70", "jubilacion por edad"],
    },
    {
      href: "/pension-no-contributiva",
      titulo: "Pensiones no contributivas",
      descripcion: "Cuánto paga cada una y el tope para trabajar",
      claves: ["pnc", "discapacidad", "invalidez", "madre de 7 hijos", "vejez"],
    },
    {
      href: "/82-por-ciento-movil",
      titulo: "82 % móvil",
      corto: "82 % móvil (art. 125 bis)",
      descripcion: "Cuánto paga la garantía y a quién",
      claves: ["82", "garantia", "125 bis"],
    },
    {
      href: "/pension-veteranos-malvinas",
      titulo: "Veteranos de Malvinas",
      descripcion: "La pensión honorífica de este mes",
      claves: ["malvinas", "veteranos", "excombatientes", "pension honorifica"],
    },
    {
      href: "/descuento-pami",
      titulo: "Descuento de PAMI",
      descripcion: "Cuánto te sacan del haber",
      claves: ["pami", "obra social", "descuento", "insssjp"],
    },
    {
      href: "/aportes-jubilatorios-obligatorios",
      titulo: "¿Tenés que aportar?",
      descripcion: "Quién está obligado a aportar al sistema previsional",
      claves: ["aportes", "autonomo", "socio", "obligado a aportar", "sipa"],
    },
  ],
  plata: [
    {
      href: "/inflacion",
      titulo: "Inflación (IPC)",
      descripcion: "Actualizá montos con el IPC del INDEC",
      vende: INFLACION,
      claves: ["ipc", "indec", "actualizar monto", "poder adquisitivo", "cuanto vale hoy", "le gane a la inflacion"],
    },
    {
      href: "/inflacion/alquiler",
      titulo: "Ajuste de alquiler",
      descripcion: "El cronograma de aumentos por IPC",
      vende: ALQUILERES,
      claves: ["aumento de alquiler", "ipc", "icl", "contrato de alquiler", "inquilino"],
    },
    {
      href: "/plazo-fijo",
      titulo: "Plazo fijo",
      descripcion: "Cuánto rinde con la tasa del BCRA",
      vende: PLAZO_FIJO,
      claves: ["tasa", "tna", "tea", "interes", "bcra", "banco", "inversion", "uva"],
    },
    {
      href: "/canasta-basica",
      titulo: "Canasta básica",
      descripcion: "La línea de pobreza de tu hogar",
      claves: ["cbt", "cba", "pobreza", "indigencia", "indec"],
    },
    {
      href: "/cuota-alimentaria",
      titulo: "Cuota alimentaria",
      descripcion: "Una referencia con la canasta de crianza",
      vende: CUOTA,
      claves: ["alimentos", "manutencion", "hijos", "canasta de crianza", "divorcio"],
    },
    ...["2026", "2025", "2024", "2023", "2022", "2021", "2020"].map(
      (anio): Def => ({
        href: `/inflacion/${anio}`,
        titulo: `Inflación ${anio}`,
        descripcion: `El IPC de ${anio}, mes por mes`,
        tipo: "archivo",
        menu: false,
        claves: ["ipc", "indec", anio],
      }),
    ),
  ],
  planillas: [
    {
      href: "/planillas",
      titulo: "Planilla de sueldos Comercio",
      descripcion: "Excel para liquidar con la escala de FAECYS",
      vende: COMERCIO,
      tipo: "planilla",
      claves: ["excel", "google sheets", "liquidar sueldos", "comercio"],
    },
    {
      href: "/planillas/uocra",
      titulo: "Planilla de sueldos UOCRA",
      descripcion: "Excel de jornales por zona",
      vende: UOCRA,
      tipo: "planilla",
      claves: ["excel", "construccion", "liquidar"],
    },
    {
      href: "/planillas/casas-particulares",
      titulo: "Planilla de sueldo doméstica",
      descripcion: "Excel para pagarle a tu empleada",
      vende: CASAS,
      tipo: "planilla",
      claves: ["excel", "casas particulares", "empleada", "recibo"],
    },
    {
      href: "/planillas/monotributo",
      titulo: "Planilla de control de monotributo",
      corto: "Planilla de control",
      descripcion: "Cuánto más podés facturar sin cambiar de categoría",
      vende: MONO,
      tipo: "planilla",
      claves: ["excel", "facturacion", "recategorizacion"],
    },
    {
      href: "/planillas/alquileres",
      titulo: "Planilla de alquileres",
      descripcion: "Ajustes, recibos y carta de aumento para el dueño",
      vende: ALQUILERES,
      tipo: "planilla",
      claves: ["excel", "alquiler", "propietario", "inquilino", "recibo de alquiler", "aumento"],
    },
    {
      href: "/informes/cuota-alimentaria",
      titulo: "Informe de cuota alimentaria",
      descripcion: "La cuenta de la cuota, explicada y con fuentes",
      vende: CUOTA,
      tipo: "planilla",
      claves: ["informe", "alimentos", "mediacion", "abogado", "hijos", "canasta de crianza"],
    },
    {
      href: "/planillas/camioneros",
      titulo: "Planilla de sueldos Camioneros",
      descripcion: "Excel con km, viáticos y recibo",
      vende: CAMIONEROS,
      tipo: "planilla",
      claves: ["excel", "camioneros", "transporte", "viaticos", "liquidar"],
    },
    {
      href: "/planillas/plazo-fijo",
      titulo: "Planilla de plazos fijos",
      descripcion: "Vencimientos y si le ganaron a la inflación",
      vende: PLAZO_FIJO,
      tipo: "planilla",
      claves: ["excel", "plazo fijo", "tasa real", "inflacion", "uva", "vencimientos"],
    },
    {
      href: "/planillas/vacaciones",
      titulo: "Planilla de vacaciones",
      descripcion: "Días, aviso, pago y nota para firmar de todo tu equipo",
      vende: VACACIONES,
      tipo: "planilla",
      claves: ["excel", "vacaciones", "notificacion de vacaciones", "plus vacacional", "empleador"],
    },
    {
      href: "/planillas/mi-sueldo",
      titulo: "Planilla Mi Sueldo",
      descripcion: "Controlá tu recibo y tu sueldo contra la inflación",
      vende: MI_SUELDO,
      tipo: "planilla",
      claves: ["excel", "recibo", "aumento", "poder de compra", "empleado"],
    },
    {
      href: "/informes/indemnizacion",
      titulo: "Informe de liquidación por despido",
      descripcion: "Rubro por rubro, para comparar antes de firmar",
      vende: DESPIDO,
      tipo: "planilla",
      claves: ["informe", "despido", "liquidacion final", "seclo", "abogado"],
    },
    {
      href: "/informes/ganancias",
      titulo: "Informe de Ganancias 2026",
      descripcion: "Cuánto pagás en el año y qué deducciones te devuelven plata",
      vende: GANANCIAS,
      tipo: "planilla",
      claves: ["informe", "ganancias", "deducciones", "siradig", "f572", "cuarta categoria", "pagar menos"],
    },
    {
      href: "/informes/credito-laboral",
      titulo: "Informe de crédito laboral",
      descripcion: "La deuda laboral actualizada, rubro por rubro",
      vende: CREDITO,
      tipo: "planilla",
      claves: ["informe", "juicio", "actualizacion", "art 276", "abogado"],
    },
    {
      href: "/informes/inflacion",
      titulo: "Informe de actualización por IPC",
      descripcion: "El monto actualizado y la carta para pedir el aumento",
      vende: INFLACION,
      tipo: "planilla",
      claves: ["informe", "ipc", "aumento de sueldo", "honorarios", "carta"],
    },
  ],
  guias: [
    { href: "/blog", titulo: "Todas las guías", descripcion: "Tu plata explicada con datos oficiales", claves: ["blog", "notas", "articulos"] },
    { href: "/blog/estatutos-laborales-derogados-2027", titulo: "Los estatutos que se derogan en 2027", claves: ["periodista", "viajante", "ley 27802"] },
    { href: "/blog/tope-de-ingresos-asignaciones-familiares", titulo: "El tope de las asignaciones familiares", claves: ["auh", "tope", "ingresos"] },
    { href: "/blog/cuanto-cuesta-criar-un-hijo-argentina", titulo: "Cuánto cuesta criar un hijo", claves: ["crianza", "hijos", "indec"] },
    { href: "/blog/aumento-comercio-agosto-2026", titulo: "El aumento de Comercio de agosto", vende: COMERCIO, claves: ["paritaria", "bono", "comercio"] },
    { href: "/blog/cuanto-se-cobra-de-vacaciones-plus-vacacional-2026", titulo: "Cuánto se cobra de vacaciones", claves: ["plus vacacional"] },
    { href: "/blog/como-se-calcula-la-indemnizacion-por-despido-2026", titulo: "Cómo se calcula la indemnización", claves: ["despido", "paso a paso"] },
    { href: "/blog/aguinaldo-monotributista", titulo: "¿El monotributista cobra aguinaldo?", claves: ["sac", "monotributo"] },
    { href: "/blog/aguinaldo-proporcional-como-se-calcula", titulo: "Aguinaldo proporcional, paso a paso", claves: ["sac", "proporcional"] },
    { href: "/blog/que-incluye-la-cuota-del-monotributo", titulo: "Qué incluye la cuota del monotributo", claves: ["obra social", "jubilacion", "impuesto integrado"] },
    { href: "/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo", titulo: "Si te pasás del tope del monotributo", claves: ["exclusion", "limite", "facturacion"] },
    { href: "/blog/como-calcular-aguinaldo-empleado-de-comercio", titulo: "El aguinaldo de un empleado de comercio", vende: COMERCIO, claves: ["sac", "comercio"] },
    { href: "/blog/nuevo-recibo-de-sueldo-2026", titulo: "El recibo de sueldo nuevo", vende: COMERCIO, claves: ["recibo", "decreto 407"] },
    { href: "/blog/modelo-recibo-de-sueldo-empleado-de-comercio", titulo: "Modelo de recibo de Comercio", vende: COMERCIO, claves: ["recibo", "comercio"] },
    { href: "/blog/como-liquidar-sueldo-empleado-de-comercio", titulo: "Cómo liquidar un sueldo de Comercio", vende: COMERCIO, claves: ["liquidacion", "comercio"] },
    { href: "/blog/que-hacer-con-el-aguinaldo-2026", titulo: "Qué hacer con el aguinaldo", claves: ["ahorro", "plazo fijo", "dolares", "deudas"] },
    { href: "/blog/aguinaldo-paga-ganancias", titulo: "¿El aguinaldo paga Ganancias?", claves: ["sac", "ganancias"] },
  ].map((g): Def => ({ ...g, tipo: "guia" })),
  sitio: [
    { href: "/", titulo: "Inicio", menu: false, claves: ["home"] },
    { href: "/novedades", titulo: "Novedades", descripcion: "Cada dato oficial nuevo, el día que cambió", claves: ["actualizaciones", "cambios", "ultimos datos", "que cambio"] },
    { href: "/sobre", titulo: "Sobre CalculAR", descripcion: "Quién está detrás y cómo trabajamos", claves: ["quienes somos", "metodologia", "manuel navarro"] },
    { href: "/contacto", titulo: "Contacto", descripcion: "Un error, una idea o una consulta", claves: ["mail", "escribir", "error", "sugerencia"] },
    { href: "/privacidad", titulo: "Privacidad", descripcion: "Qué datos guardamos y cómo borrarlos", claves: ["datos personales", "cookies"] },
    { href: "/terminos", titulo: "Términos de uso", claves: ["condiciones", "legal"] },
    { href: "/cuenta", titulo: "Mi cuenta", descripcion: "Tus compras y tus cálculos guardados", claves: ["perfil", "compras", "calculos guardados"] },
    { href: "/login", titulo: "Ingresar", menu: false, claves: ["iniciar sesion", "entrar", "login"] },
    { href: "/registro", titulo: "Crear cuenta", menu: false, claves: ["registrarme", "registro", "cuenta nueva"] },
    { href: "/recuperar", titulo: "Recuperar la contraseña", menu: false, claves: ["olvide la contrasena", "clave"] },
  ].map((s): Def => ({ ...s, tipo: "info" })),
};

const TITULO_DE_GRUPO = new Map(GRUPOS.map((g) => [g.id, g.titulo]));

export const PAGINAS: Pagina[] = (Object.keys(DEFS) as GrupoId[]).flatMap((grupoId) =>
  DEFS[grupoId].map(({ tipo, ...def }) => ({
    ...def,
    grupoId,
    grupo: TITULO_DE_GRUPO.get(grupoId) ?? grupoId,
    tipo: tipo ?? "calculadora",
  })),
);

const POR_HREF = new Map(PAGINAS.map((p) => [p.href, p]));

export function paginaDeRuta(href: string): Pagina | undefined {
  return POR_HREF.get(normalizarRuta(href));
}

/** Lo más usado: arranque del buscador y accesos de la home. Curado a mano hasta tener datos propios. */
export const MAS_USADAS: string[] = [
  "/sueldo-neto",
  "/aguinaldo",
  "/indemnizacion",
  "/monotributo",
  "/vacaciones",
  "/empleada-domestica",
  "/ganancias",
  "/inflacion",
];

export function grupo(id: GrupoId): Grupo {
  return GRUPOS.find((g) => g.id === id)!;
}

export function paginasDelGrupo(id: GrupoId, { soloMenu = true } = {}): Pagina[] {
  return PAGINAS.filter((p) => p.grupoId === id && (!soloMenu || p.menu !== false));
}

// Un tab de grupo se dibuja en COLUMNAS y cada columna apila grupos. Es lo que hace que
// "Sueldo y trabajo" (~80 páginas) entre en pantalla: una sola lista medía más que el viewport.

export type Tab =
  | { type: "group"; key: string; label: string; cols: GrupoId[][]; extra?: string[] }
  | { type: "link"; key: string; label: string; href: string; match: string[] };

export const TABS: Tab[] = [
  { type: "group", key: "monotributo", label: "Monotributo", cols: [["monotributo"]] },
  {
    type: "group",
    key: "sueldo",
    label: "Sueldo y trabajo",
    cols: [["sueldo", "licencias"], ["fin"], ["regimenes"], ["impuestos", "sindical"]],
  },
  { type: "group", key: "convenios", label: "Convenios", cols: [["convenios"]], extra: ["/planillas"] },
  { type: "group", key: "finanzas", label: "Finanzas y ANSES", cols: [["plata"], ["anses"]] },
  { type: "link", key: "guias", label: "Guías", href: "/blog", match: ["/blog"] },
];

/** Lo único del header que viaja en el HTML inicial: etiquetas y rutas que marcan el tab activo. */
export type TabEncabezado = {
  key: string;
  label: string;
  type: "group" | "link";
  href?: string;
  match: string[];
};

export function tabsDelEncabezado(): TabEncabezado[] {
  return TABS.map((t) => {
    if (t.type === "link") return { key: t.key, label: t.label, type: "link", href: t.href, match: t.match };
    const ids = t.cols.flat();
    const match = new Set<string>(t.extra ?? []);
    for (const id of ids) {
      for (const p of paginasDelGrupo(id, { soloMenu: false })) match.add(p.href);
      for (const d of grupo(id).destacados ?? []) match.add(d);
    }
    return { key: t.key, label: t.label, type: "group", match: [...match] };
  });
}

export type SeccionMenu = { id: GrupoId; titulo: string; paginas: Pagina[]; destacados: Pagina[] };

function seccion(id: GrupoId): SeccionMenu {
  const g = grupo(id);
  return {
    id,
    titulo: g.corto ?? g.titulo,
    paginas: paginasDelGrupo(id),
    destacados: (g.destacados ?? []).map((h) => POR_HREF.get(h)).filter((p): p is Pagina => !!p),
  };
}

export function columnasDelTab(key: string): SeccionMenu[][] {
  const t = TABS.find((x) => x.key === key);
  if (!t || t.type !== "group") return [];
  return t.cols.map((col) => col.map(seccion));
}

/** Cajón mobile y footer: un acordeón por tema, con las mismas páginas que el menú de escritorio. */
export function seccionesDelMenu(): SeccionMenu[] {
  return GRUPOS_DE_CALCULADORAS.map(seccion);
}


const TITULOS_SIN_PAGINA: Record<string, string> = {
  "/dashboard": "Panel",
  "/planillas/gracias": "Gracias por tu compra",
  "/planillas/comprar": "Comprar una planilla",
  "/auth/confirmar": "Confirmar el mail",
  "/cuenta/clave": "Cambiar la contraseña",
};

export function normalizarRuta(path: string): string {
  const sinQuery = path.split(/[?#]/)[0] || "/";
  const limpia = sinQuery.replace(/\/+$/, "");
  return limpia === "" ? "/" : limpia;
}

function humanizar(segmento: string): string {
  const texto = decodeURIComponent(segmento).replace(/-/g, " ").trim();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

export function tituloDeRuta(path: string): string {
  const ruta = normalizarRuta(path);
  const exacta = POR_HREF.get(ruta);
  if (exacta) return exacta.titulo;
  if (TITULOS_SIN_PAGINA[ruta]) return TITULOS_SIN_PAGINA[ruta];

  let padre: Pagina | undefined;
  for (const p of PAGINAS) {
    if (p.href !== "/" && ruta.startsWith(`${p.href}/`) && (!padre || p.href.length > padre.href.length)) padre = p;
  }
  const resto = ruta.split("/").filter(Boolean).pop() ?? "";
  if (padre) return `${padre.titulo} · ${humanizar(resto)}`;
  return resto ? humanizar(resto) : "Inicio";
}
