// Datos del convenio de Empleados de Comercio (CCT 130/75) — escalas abril a diciembre 2026.
// Fuentes: acuerdo paritario del 26/3/2026 (abril-junio) y **acuerdo paritario del 22/7/2026**
// (FAECYS + CAC + CAME + UDECA), publicado en la circular oficial "ACUERDO 07/2026" del
// 28/7/2026, que trae las escalas de JULIO/2026 a MAYO/2027 y **reemplaza la escala anterior
// desde 07/2026** (textual en el encabezado de cada tabla).
// REGLA DE ORO: estos datos se verifican SOLO contra circulares oficiales, nunca blogs.
// Evidencia y citas literales: docs/research/2026-06-12-escalas-comercio-uocra-sprint1.md y
// docs/research/2026-07-30-acuerdo-comercio-julio-2026.md (repo).

export const COMERCIO_FUENTES = {
  acuerdo: {
    nombre: "Acuerdo paritario 22/7/2026 — CCT 130/75 (+5,7% trimestral + bono $50.000)",
    url: "https://www.faecys.org.ar/acuerdo-comercio-23-07-2026-faecys-acordo-un-aumento-del-57-trimestral-y-suma-un-bono-de-50-mil/",
  },
  escalas: {
    nombre:
      "FAECYS — circular ACUERDO 07/2026 con las escalas de julio/2026 a mayo/2027 (28/7/2026)",
    url: "https://www.faecys.org.ar/circular-acuerdo-julio-2026/",
  },
  acuerdoAnterior: {
    nombre: "Acuerdo paritario 26/3/2026 — circular FAECYS (escalas abril-junio 2026)",
    url: "https://www.faecys.org.ar/faecys-acuerdo-paritario-cct-130-75-abril-mayo-junio-2026/",
  },
  cct: {
    nombre: "Texto del CCT 130/75 (INACAP — arts. 24, 40 y concordantes)",
    url: "https://institutocap.org.ar/inacap/descargarPDF/convenio",
  },
  consultadoEl: "30 de julio de 2026",
};

// Homologación verificada por convergencia de fuentes profesionales (el BO no la indexa
// todavía): citarla como "Disp. 550/2026" sin afirmar verificación directa en el BO.
export const COMERCIO_HOMOLOGACION = "Disposición 550/2026 (Secretaría de Trabajo, 27/4/2026)";

export type CategoriaComercioId =
  | "maestranza-a"
  | "maestranza-b"
  | "maestranza-c"
  | "administrativo-a"
  | "administrativo-b"
  | "administrativo-c"
  | "administrativo-d"
  | "administrativo-e"
  | "administrativo-f"
  | "cajeros-a"
  | "cajeros-b"
  | "cajeros-c"
  | "auxiliar-a"
  | "auxiliar-b"
  | "auxiliar-c"
  | "auxiliar-especializado-a"
  | "auxiliar-especializado-b"
  | "vendedor-a"
  | "vendedor-b"
  | "vendedor-c"
  | "vendedor-d";

export type CategoriaComercio = {
  id: CategoriaComercioId;
  nombre: string;
  grupo: string;
};

// Nomenclatura textual de la circular FAECYS (la rama general usa "Auxiliar" a secas).
export const CATEGORIAS_COMERCIO: CategoriaComercio[] = [
  { id: "maestranza-a", nombre: "Maestranza A", grupo: "Maestranza y servicios" },
  { id: "maestranza-b", nombre: "Maestranza B", grupo: "Maestranza y servicios" },
  { id: "maestranza-c", nombre: "Maestranza C", grupo: "Maestranza y servicios" },
  { id: "administrativo-a", nombre: "Administrativo A", grupo: "Administrativos" },
  { id: "administrativo-b", nombre: "Administrativo B", grupo: "Administrativos" },
  { id: "administrativo-c", nombre: "Administrativo C", grupo: "Administrativos" },
  { id: "administrativo-d", nombre: "Administrativo D", grupo: "Administrativos" },
  { id: "administrativo-e", nombre: "Administrativo E", grupo: "Administrativos" },
  { id: "administrativo-f", nombre: "Administrativo F", grupo: "Administrativos" },
  { id: "cajeros-a", nombre: "Cajeros A", grupo: "Cajeros" },
  { id: "cajeros-b", nombre: "Cajeros B", grupo: "Cajeros" },
  { id: "cajeros-c", nombre: "Cajeros C", grupo: "Cajeros" },
  { id: "auxiliar-a", nombre: "Auxiliar A", grupo: "Personal auxiliar" },
  { id: "auxiliar-b", nombre: "Auxiliar B", grupo: "Personal auxiliar" },
  { id: "auxiliar-c", nombre: "Auxiliar C", grupo: "Personal auxiliar" },
  {
    id: "auxiliar-especializado-a",
    nombre: "Auxiliar especializado A",
    grupo: "Auxiliares especializados",
  },
  {
    id: "auxiliar-especializado-b",
    nombre: "Auxiliar especializado B",
    grupo: "Auxiliares especializados",
  },
  { id: "vendedor-a", nombre: "Vendedor A", grupo: "Vendedores" },
  { id: "vendedor-b", nombre: "Vendedor B", grupo: "Vendedores" },
  { id: "vendedor-c", nombre: "Vendedor C", grupo: "Vendedores" },
  { id: "vendedor-d", nombre: "Vendedor D", grupo: "Vendedores" },
];

export type MesComercio = {
  id: string; // "junio-2026" (slug de URL)
  etiqueta: string; // "Junio 2026"
  mes: number;
  anio: number;
  // Básico convencional de jornada completa, SIN las sumas no remunerativas.
  basicos: Record<CategoriaComercioId, number>;
  // Total no remunerativo del mes ($40.000 + $60.000 prorrogados + $20.000 nuevos).
  noRemunerativo: number;
  // "Asignación extraordinaria por única vez" del acuerdo 07/2026: $25.000 en julio y
  // $25.000 en agosto de 2026 (el bono de $50.000 del acuerdo, pagado en dos cuotas).
  // La circular la excluye EXPRESAMENTE de la antigüedad y del presentismo.
  asignacionExtraordinaria?: number;
  // Qué pasó con la escala este mes (para las páginas programáticas).
  cambios: string;
  advertencia?: string;
};

// Composición del no remunerativo abril-junio (cláusula TERCERO del acuerdo 26/3/2026):
// $40.000 + $60.000 prorrogados de los acuerdos 06 y 12/2025 + $20.000 nuevos de
// "recomposición". El acuerdo de marzo preveía incorporarlos al básico en julio, pero el
// acuerdo del 22/7/2026 corrió esa incorporación: los $120.000 siguen no remunerativos
// hasta noviembre y recién se absorben de a $20.000 por mes entre diciembre y mayo de 2027.
export const NO_REM_COMPOSICION = {
  prorrogados: 100_000,
  recomposicion: 20_000,
  total: 120_000,
};

// La "asignación extraordinaria por única vez" del acuerdo 07/2026 NO integra la base de
// antigüedad ni de presentismo (la circular lo dice textual al pie de cada escala) y, por
// ser una suma no remunerativa extraordinaria, tampoco entra en el aguinaldo. Se paga
// proporcional a la jornada: la propia escala de jornada reducida la muestra en $18.750
// (el 75% de $25.000), lo que confirma la proporcionalidad.
export const COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL = 50_000;

export const MESES_COMERCIO: MesComercio[] = [
  {
    id: "abril-2026",
    etiqueta: "Abril 2026",
    mes: 4,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Primer tramo del acuerdo del 26/3/2026: +2% sobre los básicos de marzo (más las sumas no remunerativas a esa fecha). Arranca la suma fija nueva de $20.000, que se suma a los $100.000 prorrogados: $120.000 no remunerativos en total.",
    basicos: {
      "maestranza-a": 1_078_911,
      "maestranza-b": 1_082_029,
      "maestranza-c": 1_092_951,
      "administrativo-a": 1_090_613,
      "administrativo-b": 1_095_298,
      "administrativo-c": 1_099_977,
      "administrativo-d": 1_114_022,
      "administrativo-e": 1_125_724,
      "administrativo-f": 1_142_890,
      "cajeros-a": 1_094_513,
      "cajeros-b": 1_099_977,
      "cajeros-c": 1_106_999,
      "auxiliar-a": 1_094_513,
      "auxiliar-b": 1_102_315,
      "auxiliar-c": 1_128_065,
      "auxiliar-especializado-a": 1_103_879,
      "auxiliar-especializado-b": 1_117_922,
      "vendedor-a": 1_094_513,
      "vendedor-b": 1_117_925,
      "vendedor-c": 1_125_724,
      "vendedor-d": 1_142_890,
    },
  },
  {
    id: "mayo-2026",
    etiqueta: "Mayo 2026",
    mes: 5,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Segundo tramo: +1,5% calculado sobre los básicos de marzo más las sumas no remunerativas a esa fecha (no acumulativo). Siguen los $120.000 no remunerativos.",
    basicos: {
      "maestranza-a": 1_096_248,
      "maestranza-b": 1_099_412,
      "maestranza-c": 1_110_495,
      "administrativo-a": 1_108_122,
      "administrativo-b": 1_112_876,
      "administrativo-c": 1_117_623,
      "administrativo-d": 1_131_875,
      "administrativo-e": 1_143_749,
      "administrativo-f": 1_161_167,
      "cajeros-a": 1_112_079,
      "cajeros-b": 1_117_623,
      "cajeros-c": 1_124_749,
      "auxiliar-a": 1_112_079,
      "auxiliar-b": 1_119_996,
      "auxiliar-c": 1_146_125,
      "auxiliar-especializado-a": 1_121_583,
      "auxiliar-especializado-b": 1_135_832,
      "vendedor-a": 1_112_079,
      "vendedor-b": 1_135_835,
      "vendedor-c": 1_143_749,
      "vendedor-d": 1_161_167,
    },
  },
  {
    id: "junio-2026",
    etiqueta: "Junio 2026",
    mes: 6,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Tercer y último tramo porcentual del acuerdo: +1,5% sobre la misma base de marzo. Última cuota de los $120.000 no remunerativos: la de junio es la que se incorpora al básico en julio.",
    basicos: {
      "maestranza-a": 1_113_585,
      "maestranza-b": 1_116_794,
      "maestranza-c": 1_128_038,
      "administrativo-a": 1_125_631,
      "administrativo-b": 1_130_454,
      "administrativo-c": 1_135_270,
      "administrativo-d": 1_149_729,
      "administrativo-e": 1_161_775,
      "administrativo-f": 1_179_445,
      "cajeros-a": 1_129_646,
      "cajeros-b": 1_135_270,
      "cajeros-c": 1_142_499,
      "auxiliar-a": 1_129_646,
      "auxiliar-b": 1_137_677,
      "auxiliar-c": 1_164_184,
      "auxiliar-especializado-a": 1_139_287,
      "auxiliar-especializado-b": 1_153_743,
      "vendedor-a": 1_129_646,
      "vendedor-b": 1_153_746,
      "vendedor-c": 1_161_775,
      "vendedor-d": 1_179_445,
    },
  },
  {
    id: "julio-2026",
    etiqueta: "Julio 2026",
    mes: 7,
    anio: 2026,
    noRemunerativo: 120_000,
    asignacionExtraordinaria: 25_000,
    cambios:
      "Primer tramo del acuerdo del 22/7/2026: +1,9% sobre el total de junio (básico + los $120.000 no remunerativos), no acumulativo. Los $120.000 NO se incorporaron al básico en julio como preveía el acuerdo anterior: siguen como suma no remunerativa hasta diciembre. Se suma una asignación extraordinaria de $25.000 por única vez (primera cuota del bono de $50.000).",
    basicos: {
      "maestranza-a": 1_137_023,
      "maestranza-b": 1_140_294,
      "maestranza-c": 1_151_751,
      "administrativo-a": 1_149_298,
      "administrativo-b": 1_154_212,
      "administrativo-c": 1_159_120,
      "administrativo-d": 1_173_854,
      "administrativo-e": 1_186_128,
      "administrativo-f": 1_204_135,
      "cajeros-a": 1_153_389,
      "cajeros-b": 1_159_120,
      "cajeros-c": 1_166_487,
      "auxiliar-a": 1_153_389,
      "auxiliar-b": 1_161_573,
      "auxiliar-c": 1_188_584,
      "auxiliar-especializado-a": 1_163_214,
      "auxiliar-especializado-b": 1_177_944,
      "vendedor-a": 1_153_389,
      "vendedor-b": 1_177_947,
      "vendedor-c": 1_186_128,
      "vendedor-d": 1_204_135,
    },
  },
  {
    id: "agosto-2026",
    etiqueta: "Agosto 2026",
    mes: 8,
    anio: 2026,
    noRemunerativo: 120_000,
    asignacionExtraordinaria: 25_000,
    cambios:
      "Segundo tramo: +3,8% sobre el mismo total de junio (no acumulativo). Siguen los $120.000 no remunerativos y se paga la segunda y última cuota de $25.000 de la asignación extraordinaria: con esta se completa el bono de $50.000 del acuerdo.",
    basicos: {
      "maestranza-a": 1_160_461,
      "maestranza-b": 1_163_793,
      "maestranza-c": 1_175_464,
      "administrativo-a": 1_172_965,
      "administrativo-b": 1_177_971,
      "administrativo-c": 1_182_970,
      "administrativo-d": 1_197_978,
      "administrativo-e": 1_210_482,
      "administrativo-f": 1_228_824,
      "cajeros-a": 1_177_132,
      "cajeros-b": 1_182_970,
      "cajeros-c": 1_190_474,
      "auxiliar-a": 1_177_132,
      "auxiliar-b": 1_185_469,
      "auxiliar-c": 1_212_983,
      "auxiliar-especializado-a": 1_187_140,
      "auxiliar-especializado-b": 1_202_145,
      "vendedor-a": 1_177_132,
      "vendedor-b": 1_202_148,
      "vendedor-c": 1_210_482,
      "vendedor-d": 1_228_824,
    },
  },
  {
    id: "septiembre-2026",
    etiqueta: "Septiembre 2026",
    mes: 9,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Tercer y último tramo: +5,7% sobre el total de junio, el aumento completo del acuerdo. Se termina la asignación extraordinaria (era por única vez, julio y agosto). Los $120.000 no remunerativos siguen sin incorporarse: la escala de septiembre rige igual en octubre y noviembre.",
    basicos: {
      "maestranza-a": 1_183_900,
      "maestranza-b": 1_187_292,
      "maestranza-c": 1_199_176,
      "administrativo-a": 1_196_632,
      "administrativo-b": 1_201_729,
      "administrativo-c": 1_206_821,
      "administrativo-d": 1_222_103,
      "administrativo-e": 1_234_836,
      "administrativo-f": 1_253_514,
      "cajeros-a": 1_200_875,
      "cajeros-b": 1_206_821,
      "cajeros-c": 1_214_462,
      "auxiliar-a": 1_200_875,
      "auxiliar-b": 1_209_365,
      "auxiliar-c": 1_237_383,
      "auxiliar-especializado-a": 1_211_067,
      "auxiliar-especializado-b": 1_226_346,
      "vendedor-a": 1_200_875,
      "vendedor-b": 1_226_349,
      "vendedor-c": 1_234_836,
      "vendedor-d": 1_253_514,
    },
  },
  {
    id: "octubre-2026",
    etiqueta: "Octubre 2026",
    mes: 10,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Sin cambios: la circular fija una sola escala para septiembre, octubre y noviembre de 2026 (fila «SEPT.-NOV./2026»). El próximo movimiento es en diciembre, y es de composición, no de monto.",
    basicos: {
      "maestranza-a": 1_183_900,
      "maestranza-b": 1_187_292,
      "maestranza-c": 1_199_176,
      "administrativo-a": 1_196_632,
      "administrativo-b": 1_201_729,
      "administrativo-c": 1_206_821,
      "administrativo-d": 1_222_103,
      "administrativo-e": 1_234_836,
      "administrativo-f": 1_253_514,
      "cajeros-a": 1_200_875,
      "cajeros-b": 1_206_821,
      "cajeros-c": 1_214_462,
      "auxiliar-a": 1_200_875,
      "auxiliar-b": 1_209_365,
      "auxiliar-c": 1_237_383,
      "auxiliar-especializado-a": 1_211_067,
      "auxiliar-especializado-b": 1_226_346,
      "vendedor-a": 1_200_875,
      "vendedor-b": 1_226_349,
      "vendedor-c": 1_234_836,
      "vendedor-d": 1_253_514,
    },
  },
  {
    id: "noviembre-2026",
    etiqueta: "Noviembre 2026",
    mes: 11,
    anio: 2026,
    noRemunerativo: 120_000,
    cambios:
      "Último mes de la escala «SEPT.-NOV./2026»: mismos valores que septiembre y octubre. Es el mes que define el aguinaldo de diciembre si es la mejor remuneración del semestre.",
    basicos: {
      "maestranza-a": 1_183_900,
      "maestranza-b": 1_187_292,
      "maestranza-c": 1_199_176,
      "administrativo-a": 1_196_632,
      "administrativo-b": 1_201_729,
      "administrativo-c": 1_206_821,
      "administrativo-d": 1_222_103,
      "administrativo-e": 1_234_836,
      "administrativo-f": 1_253_514,
      "cajeros-a": 1_200_875,
      "cajeros-b": 1_206_821,
      "cajeros-c": 1_214_462,
      "auxiliar-a": 1_200_875,
      "auxiliar-b": 1_209_365,
      "auxiliar-c": 1_237_383,
      "auxiliar-especializado-a": 1_211_067,
      "auxiliar-especializado-b": 1_226_346,
      "vendedor-a": 1_200_875,
      "vendedor-b": 1_226_349,
      "vendedor-c": 1_234_836,
      "vendedor-d": 1_253_514,
    },
  },
  {
    id: "diciembre-2026",
    etiqueta: "Diciembre 2026",
    mes: 12,
    anio: 2026,
    noRemunerativo: 100_000,
    cambios:
      "Arranca la incorporación de los no remunerativos al básico: $20.000 pasan al básico y quedan $100.000 no remunerativos. El total del mes NO cambia — cambia la composición, y eso sube la parte que aporta el 17% completo (y la base de indemnización y vacaciones). La incorporación sigue de a $20.000 por mes hasta mayo de 2027, cuando el no remunerativo llega a cero.",
    basicos: {
      "maestranza-a": 1_203_900,
      "maestranza-b": 1_207_292,
      "maestranza-c": 1_219_176,
      "administrativo-a": 1_216_632,
      "administrativo-b": 1_221_729,
      "administrativo-c": 1_226_821,
      "administrativo-d": 1_242_103,
      "administrativo-e": 1_254_836,
      "administrativo-f": 1_273_514,
      "cajeros-a": 1_220_875,
      "cajeros-b": 1_226_821,
      "cajeros-c": 1_234_462,
      "auxiliar-a": 1_220_875,
      "auxiliar-b": 1_229_365,
      "auxiliar-c": 1_257_383,
      "auxiliar-especializado-a": 1_231_067,
      "auxiliar-especializado-b": 1_246_346,
      "vendedor-a": 1_220_875,
      "vendedor-b": 1_246_349,
      "vendedor-c": 1_254_836,
      "vendedor-d": 1_273_514,
    },
  },
];

// Cronograma de incorporación de los $120.000 no remunerativos al básico (acuerdo 07/2026).
// El TOTAL del mes no se mueve: lo que cambia es cuánto de ese total es remunerativo.
// Se documenta acá en vez de generar una página por mes porque ninguno de estos meses
// cambia el monto de bolsillo — solo su composición.
export const COMERCIO_INCORPORACION = [
  { etiqueta: "Septiembre a noviembre 2026", noRemunerativo: 120_000 },
  { etiqueta: "Diciembre 2026", noRemunerativo: 100_000 },
  { etiqueta: "Enero 2027", noRemunerativo: 80_000 },
  { etiqueta: "Febrero 2027", noRemunerativo: 60_000 },
  { etiqueta: "Marzo 2027", noRemunerativo: 40_000 },
  { etiqueta: "Abril 2027", noRemunerativo: 20_000 },
  { etiqueta: "Mayo 2027", noRemunerativo: 0 },
] as const;

// Tramos del acuerdo del 22/7/2026: porcentajes NO acumulativos sobre el total de junio
// de 2026 (básico + $120.000). Verificado: los 21 básicos de cada mes reproducen estos
// porcentajes exactos contra la escala de junio ya cargada.
export const COMERCIO_TRAMOS_ACUERDO_2026 = [
  { mesId: "julio-2026", etiqueta: "Julio 2026", porcentaje: 1.9 },
  { mesId: "agosto-2026", etiqueta: "Agosto 2026", porcentaje: 3.8 },
  { mesId: "septiembre-2026", etiqueta: "Septiembre 2026", porcentaje: 5.7 },
] as const;

// Antigüedad (art. 24 CCT 130/75): 1% por año trabajado. La circular FAECYS instruye
// aplicarlo "a las cifras remunerativas y no remunerativas" (textual, al pie de cada escala).
export const COMERCIO_ANTIGUEDAD_POR_ANIO = 0.01;

// Presentismo (art. 40 CCT 130/75): "la doceava parte de la remuneración del mes".
// Se pierde con más de una ausencia injustificada en el mes.
export const COMERCIO_PRESENTISMO_FRACCION = 1 / 12;

// Jornada completa del sector: 8 horas. La proporcionalidad para jornada parcial surge de la
// LCT (arts. 92 ter y 198) y de la cláusula CUARTO del acuerdo (los incrementos y sumas se
// pagan proporcionales a la jornada; la propia escala de menores de 6 hs muestra el 75%).
export const JORNADAS_COMERCIO = [
  { id: "8", etiqueta: "Jornada completa (8 horas)", factor: 1 },
  { id: "6", etiqueta: "Jornada de 6 horas (¾)", factor: 0.75 },
  { id: "4", etiqueta: "Media jornada (4 horas)", factor: 0.5 },
] as const;

export type JornadaComercioId = (typeof JORNADAS_COMERCIO)[number]["id"];

// Aportes del trabajador: 11% jubilación + 3% PAMI + 3% obra social sobre lo remunerativo.
// Las sumas no remunerativas solo aportan a la obra social (OSECAC), por el propio acuerdo.
export const COMERCIO_APORTES_REMUNERATIVO = 0.17;
export const COMERCIO_APORTES_NO_REM = 0.03;
