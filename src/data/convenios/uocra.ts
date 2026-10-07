// Datos del convenio de la construcción — UOCRA (CCT 76/75) — escalas abril a NOVIEMBRE 2026.
// Fuentes: acuerdos paritarios firmados del 31/3/2026 (marzo-mayo, homologado por
// DI-2026-468-APN-DNRYRT#MCH) y del 19/5/2026 (junio-agosto, homologado por
// DI-2026-712-APN-DNRYRT#MCH), publicados por las DOS partes firmantes (CAMARCO y UOCRA,
// PDFs idénticos). Texto del CCT 76/75 publicado por UOCRA; Ley 22.250 vía IERIC.
// REGLA DE ORO: estos datos se verifican SOLO contra los acuerdos oficiales, nunca blogs.
// Evidencia y citas literales: docs/research/2026-06-12-escalas-comercio-uocra-sprint1.md (repo).
//
// AGOSTO 2026 (cargado el 30/7/2026): la tabla salió del Anexo I del PDF oficial de UOCRA
// del segundo tramo (homologado por Resolución del 2/6/2026) — el anexo es un SCAN, así que
// se leyó como imagen con `tools/pdf-extraer.ts` (páginas → PNG) y se verificó dígito por
// dígito con zoom. Prueba de que la lectura es fiel: las tablas de junio y julio del MISMO
// scan coinciden exactas con los valores ya cargados acá desde el PDF de CAMARCO. Coherencia
// interna: agosto/julio da el mismo factor (~1,0912) en las 5 categorías y las 4 zonas.
// Fuente: uocra.org/pdf/99db1b_segundo_tramo_paritaria_76-75_y_577-10_junio-julio-agosto.pdf
//
// SEPTIEMBRE A NOVIEMBRE 2026 (cargado el 28/9/2026): Anexo I del acuerdo del 21/9/2026 (tercer
// tramo), PDF firmado publicado por CAMARCO (circular CI-067). El PDF es un scan con capa OCR, así
// que ningún dígito se tomó sin control: los 60 valores reproducen la derivación del propio acuerdo
// (agosto × 1,019 → × 1,018 → × 1,017, acumulativos) con diferencia ≤ $2 por redondeo de la tabla.
// La SNR sigue en cero: este tramo no la trae.

export const UOCRA_FUENTES = {
  acuerdoTramo1: {
    nombre: "Acuerdo UOCRA-CAMARCO 31/3/2026 (abril-mayo): PDF firmado, CAMARCO",
    url: "https://www.camarco.org.ar/laboral/acuerdo-salarial-uocra-cct-n-76-75-y-577-10-abril-mayo-2026/",
  },
  acuerdoTramo2: {
    nombre: "Acuerdo UOCRA-CAMARCO 19/5/2026 (junio-agosto): PDF firmado, CAMARCO",
    url: "https://www.camarco.org.ar/laboral/acuerdo-salarial-uocra-cct-n-76-75-mayo-2026/",
  },
  acuerdoTramo3: {
    nombre:
      "Acuerdo UOCRA-CAMARCO-FAEC 21/9/2026 (septiembre-noviembre): PDF firmado con el Anexo I de tablas, CAMARCO",
    url: "https://www.camarco.org.ar/wp-content/uploads/2026/09/CI-067-ADJ-Ac-Sal-UOCRA-sep-nov26.pdf",
  },
  anexoTramo2: {
    nombre:
      "UOCRA: segundo tramo paritaria CCT 76/75 y 577/10 (junio-julio-agosto), homologado el 2/6/2026: texto + Anexo I con las tablas por categoría y zona",
    url: "https://www.uocra.org/pdf/99db1b_segundo_tramo_paritaria_76-75_y_577-10_junio-julio-agosto.pdf",
  },
  uocra: {
    nombre: "UOCRA: escalas salariales y homologaciones",
    url: "https://www.uocra.org/",
  },
  cct: {
    nombre: "Texto del CCT 76/75 (UOCRA, arts. 10-12, 16 y 52)",
    url: "https://www.uocra.org/pdf/9c21ef_76.75.pdf",
  },
  ley22250: {
    nombre: "Ley 22.250: régimen de la construcción (IERIC)",
    url: "https://www.ieric.org.ar/wp-content/uploads/2020/01/Ley22.250.pdf",
  },
  consultadoEl: "28 de septiembre de 2026",
};

export const UOCRA_HOMOLOGACIONES = {
  tramo1: "Disp. 468/2026 (DI-2026-468-APN-DNRYRT#MCH, 7/4/2026): abril y mayo",
  tramo2: "Disp. 712/2026 (DI-2026-712-APN-DNRYRT#MCH): junio a agosto",
  tramo3: "Acuerdo firmado el 21/9/2026, con homologación solicitada: septiembre a noviembre",
};

export type ZonaUocraId = "a" | "b" | "c" | "c-austral";

// Los VALORES por zona salen tal cual de las tablas firmadas (100% oficiales). La composición
// provincial vigente se sostiene en el CCT original + fuentes especializadas consistentes
// (los acuerdos posteriores movieron La Pampa a la B y separaron la C Austral).
export const ZONAS_UOCRA: { id: ZonaUocraId; nombre: string; provincias: string }[] = [
  {
    id: "a",
    nombre: "Zona A",
    provincias:
      "CABA, Buenos Aires, Catamarca, Chaco, Córdoba, Corrientes, Entre Ríos, Formosa, Jujuy, La Rioja, Mendoza, Misiones, Salta, San Juan, San Luis, Santa Fe, Santiago del Estero y Tucumán",
  },
  { id: "b", nombre: "Zona B", provincias: "La Pampa, Neuquén, Río Negro y Chubut" },
  { id: "c", nombre: "Zona C", provincias: "Santa Cruz" },
  {
    id: "c-austral",
    nombre: "Zona C Austral",
    provincias: "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
  },
];

export type CategoriaUocraId =
  | "oficial-especializado"
  | "oficial"
  | "medio-oficial"
  | "ayudante"
  | "sereno";

export const CATEGORIAS_UOCRA: {
  id: CategoriaUocraId;
  nombre: string;
  // El sereno cobra sueldo MENSUAL (jornada de vigilancia de 12 hs, art. 12 CCT);
  // el resto cobra por hora (jornal horario).
  mensual: boolean;
}[] = [
  { id: "oficial-especializado", nombre: "Oficial especializado", mensual: false },
  { id: "oficial", nombre: "Oficial", mensual: false },
  { id: "medio-oficial", nombre: "Medio oficial", mensual: false },
  { id: "ayudante", nombre: "Ayudante", mensual: false },
  { id: "sereno", nombre: "Sereno", mensual: true },
];

type PorZona = Record<ZonaUocraId, number>;

export type MesUocra = {
  id: string; // "junio-2026"
  etiqueta: string;
  mes: number;
  anio: number;
  // Jornal horario por categoría y zona (valor "Total" de la tabla oficial: el adicional
  // de zona ya está adentro). En ARS.
  jornales: Record<Exclude<CategoriaUocraId, "sereno">, PorZona>;
  // Sueldo mensual del sereno por zona.
  serenoMensual: PorZona;
  // Suma No Remunerativa mensual por categoría y zona (se paga 50% por quincena;
  // solo tributa aportes de obra social). La del sereno es igual a la del ayudante.
  snr: Record<CategoriaUocraId, PorZona>;
  cambios: string;
};

export const MESES_UOCRA: MesUocra[] = [
  {
    id: "abril-2026",
    etiqueta: "Abril 2026",
    mes: 4,
    anio: 2026,
    cambios:
      "+1,9% sobre los básicos de marzo, más la absorción al básico de una parte de la suma no remunerativa de marzo (acuerdo del 31/3/2026). Sigue una SNR mensual por categoría y zona.",
    jornales: {
      "oficial-especializado": { a: 6_011, b: 6_672, c: 9_228, "c-austral": 12_022 },
      oficial: { a: 5_142, b: 5_711, c: 8_652, "c-austral": 10_284 },
      "medio-oficial": { a: 4_752, b: 5_267, c: 8_349, "c-austral": 9_504 },
      ayudante: { a: 4_374, b: 4_877, c: 8_107, "c-austral": 8_747 },
    },
    serenoMensual: { a: 794_575, b: 885_191, c: 1_328_356, "c-austral": 1_589_149 },
    snr: {
      "oficial-especializado": { a: 99_800, b: 110_800, c: 153_200, "c-austral": 199_600 },
      oficial: { a: 91_000, b: 101_100, c: 140_000, "c-austral": 182_000 },
      "medio-oficial": { a: 83_500, b: 92_700, c: 128_200, "c-austral": 167_000 },
      ayudante: { a: 78_400, b: 87_100, c: 120_400, "c-austral": 156_800 },
      sereno: { a: 78_400, b: 87_100, c: 120_400, "c-austral": 156_800 },
    },
  },
  {
    id: "mayo-2026",
    etiqueta: "Mayo 2026",
    mes: 5,
    anio: 2026,
    cambios:
      "+1,8% acumulativo sobre los básicos de abril (último tramo del acuerdo del 31/3/2026). La SNR mensual sube respecto de abril.",
    jornales: {
      "oficial-especializado": { a: 6_119, b: 6_792, c: 9_394, "c-austral": 12_238 },
      oficial: { a: 5_235, b: 5_813, c: 8_808, "c-austral": 10_469 },
      "medio-oficial": { a: 4_837, b: 5_362, c: 8_499, "c-austral": 9_675 },
      ayudante: { a: 4_452, b: 4_965, c: 8_252, "c-austral": 8_905 },
    },
    serenoMensual: { a: 808_877, b: 901_124, c: 1_352_267, "c-austral": 1_617_754 },
    snr: {
      "oficial-especializado": { a: 125_400, b: 139_200, c: 192_500, "c-austral": 250_700 },
      oficial: { a: 114_400, b: 127_000, c: 175_600, "c-austral": 228_700 },
      "medio-oficial": { a: 104_900, b: 116_400, c: 161_000, "c-austral": 209_800 },
      ayudante: { a: 98_500, b: 109_400, c: 151_200, "c-austral": 197_000 },
      sereno: { a: 98_500, b: 109_400, c: 151_200, "c-austral": 197_000 },
    },
  },
  {
    id: "junio-2026",
    etiqueta: "Junio 2026",
    mes: 6,
    anio: 2026,
    cambios:
      "Arranca el acuerdo del 19/5/2026: +2,1% sobre los básicos de mayo, más la absorción al básico de una parte de la SNR de mayo (por eso la SNR de junio es menor que la de mayo).",
    jornales: {
      "oficial-especializado": { a: 6_666, b: 7_400, c: 10_234, "c-austral": 13_333 },
      oficial: { a: 5_703, b: 6_333, c: 9_595, "c-austral": 11_405 },
      "medio-oficial": { a: 5_270, b: 5_842, c: 9_259, "c-austral": 10_540 },
      ayudante: { a: 4_851, b: 5_409, c: 8_990, "c-austral": 9_701 },
    },
    serenoMensual: { a: 881_193, b: 981_688, c: 1_473_164, "c-austral": 1_762_386 },
    snr: {
      "oficial-especializado": { a: 63_300, b: 70_300, c: 97_200, "c-austral": 126_600 },
      oficial: { a: 58_300, b: 64_700, c: 89_500, "c-austral": 116_600 },
      "medio-oficial": { a: 53_400, b: 59_300, c: 82_000, "c-austral": 106_800 },
      ayudante: { a: 50_300, b: 55_900, c: 77_200, "c-austral": 100_600 },
      sereno: { a: 50_300, b: 55_900, c: 77_200, "c-austral": 100_600 },
    },
  },
  {
    id: "julio-2026",
    etiqueta: "Julio 2026",
    mes: 7,
    anio: 2026,
    cambios:
      "+2% acumulativo sobre los básicos de junio (acuerdo del 19/5/2026, ya homologado). La SNR mensual sube respecto de junio; en agosto se absorbe al básico.",
    jornales: {
      "oficial-especializado": { a: 6_800, b: 7_548, c: 10_439, "c-austral": 13_599 },
      oficial: { a: 5_817, b: 6_460, c: 9_787, "c-austral": 11_633 },
      "medio-oficial": { a: 5_375, b: 5_958, c: 9_444, "c-austral": 10_750 },
      ayudante: { a: 4_948, b: 5_517, c: 9_170, "c-austral": 9_895 },
    },
    serenoMensual: { a: 898_817, b: 1_001_322, c: 1_502_627, "c-austral": 1_797_634 },
    snr: {
      "oficial-especializado": { a: 72_900, b: 80_900, c: 111_900, "c-austral": 145_700 },
      oficial: { a: 67_100, b: 74_500, c: 103_100, "c-austral": 134_200 },
      "medio-oficial": { a: 61_500, b: 68_200, c: 94_400, "c-austral": 123_000 },
      ayudante: { a: 57_900, b: 64_300, c: 88_900, "c-austral": 115_800 },
      sereno: { a: 57_900, b: 64_300, c: 88_900, "c-austral": 115_800 },
    },
  },
  {
    id: "agosto-2026",
    etiqueta: "Agosto 2026",
    mes: 8,
    anio: 2026,
    cambios:
      "Último tramo del acuerdo del 19/5/2026: +1,9% sobre los básicos de julio MÁS la absorción al básico de toda la suma no remunerativa de julio. Por eso agosto NO tiene SNR: el jornal sube ~9,1% de una vez y todo pasa a ser remunerativo (impacta aportes, aguinaldo, vacaciones e indemnización).",
    jornales: {
      "oficial-especializado": { a: 7_420, b: 8_237, c: 11_392, "c-austral": 14_841 },
      oficial: { a: 6_348, b: 7_049, c: 10_680, "c-austral": 12_695 },
      "medio-oficial": { a: 5_866, b: 6_502, c: 10_306, "c-austral": 11_732 },
      ayudante: { a: 5_399, b: 6_020, c: 10_007, "c-austral": 10_798 },
    },
    serenoMensual: { a: 980_858, b: 1_092_719, c: 1_639_782, "c-austral": 1_961_716 },
    // Agosto 2026 no tiene SNR: la de julio se absorbió al básico (ver `cambios`). Los ceros
    // son el dato correcto, no un faltante — `check_convenios.ts` valida esa coherencia.
    snr: {
      "oficial-especializado": { a: 0, b: 0, c: 0, "c-austral": 0 },
      oficial: { a: 0, b: 0, c: 0, "c-austral": 0 },
      "medio-oficial": { a: 0, b: 0, c: 0, "c-austral": 0 },
      ayudante: { a: 0, b: 0, c: 0, "c-austral": 0 },
      sereno: { a: 0, b: 0, c: 0, "c-austral": 0 },
    },
  },  {
    id: "septiembre-2026",
    etiqueta: "Septiembre 2026",
    mes: 9,
    anio: 2026,
    cambios:
      "Arranca el tercer tramo de la paritaria abril 2026-marzo 2027 (acuerdo del 21/9/2026): +1,9% sobre los básicos vigentes al 31 de agosto. Sin suma no remunerativa. Sigue el aporte solidario del 2% para no afiliados.",
    jornales: {
      "oficial-especializado": { a: 7_561, b: 8_393, c: 11_608, "c-austral": 15_123 },
      oficial: { a: 6_468, b: 7_183, c: 10_883, "c-austral": 12_936 },
      "medio-oficial": { a: 5_977, b: 6_626, c: 10_502, "c-austral": 11_955 },
      ayudante: { a: 5_502, b: 6_135, c: 10_197, "c-austral": 11_003 },
    },
    serenoMensual: { a: 999_495, b: 1_113_481, c: 1_670_938, "c-austral": 1_998_989 },
    snr: {
      "oficial-especializado": { a: 0, b: 0, c: 0, "c-austral": 0 },
      oficial: { a: 0, b: 0, c: 0, "c-austral": 0 },
      "medio-oficial": { a: 0, b: 0, c: 0, "c-austral": 0 },
      ayudante: { a: 0, b: 0, c: 0, "c-austral": 0 },
      sereno: { a: 0, b: 0, c: 0, "c-austral": 0 },
    },
  },
  {
    id: "octubre-2026",
    etiqueta: "Octubre 2026",
    mes: 10,
    anio: 2026,
    cambios:
      "+1,8% acumulativo sobre los básicos de septiembre (acuerdo del 21/9/2026). Sin suma no remunerativa.",
    jornales: {
      "oficial-especializado": { a: 7_697, b: 8_544, c: 11_817, "c-austral": 15_395 },
      oficial: { a: 6_585, b: 7_313, c: 11_079, "c-austral": 13_169 },
      "medio-oficial": { a: 6_085, b: 6_745, c: 10_691, "c-austral": 12_170 },
      ayudante: { a: 5_601, b: 6_245, c: 10_381, "c-austral": 11_201 },
    },
    serenoMensual: { a: 1_017_485, b: 1_133_523, c: 1_701_015, "c-austral": 2_034_971 },
    snr: {
      "oficial-especializado": { a: 0, b: 0, c: 0, "c-austral": 0 },
      oficial: { a: 0, b: 0, c: 0, "c-austral": 0 },
      "medio-oficial": { a: 0, b: 0, c: 0, "c-austral": 0 },
      ayudante: { a: 0, b: 0, c: 0, "c-austral": 0 },
      sereno: { a: 0, b: 0, c: 0, "c-austral": 0 },
    },
  },
  {
    id: "noviembre-2026",
    etiqueta: "Noviembre 2026",
    mes: 11,
    anio: 2026,
    cambios:
      "+1,7% acumulativo sobre los básicos de octubre, último mes del acuerdo del 21/9/2026. Sin suma no remunerativa. La Comisión Especial se reúne el 20/10/2026 para definir diciembre en adelante.",
    jornales: {
      "oficial-especializado": { a: 7_828, b: 8_689, c: 12_018, "c-austral": 15_657 },
      oficial: { a: 6_697, b: 7_437, c: 11_267, "c-austral": 13_393 },
      "medio-oficial": { a: 6_188, b: 6_860, c: 10_873, "c-austral": 12_377 },
      ayudante: { a: 5_696, b: 6_351, c: 10_557, "c-austral": 11_392 },
    },
    serenoMensual: { a: 1_034_783, b: 1_152_793, c: 1_729_932, "c-austral": 2_069_565 },
    snr: {
      "oficial-especializado": { a: 0, b: 0, c: 0, "c-austral": 0 },
      oficial: { a: 0, b: 0, c: 0, "c-austral": 0 },
      "medio-oficial": { a: 0, b: 0, c: 0, "c-austral": 0 },
      ayudante: { a: 0, b: 0, c: 0, "c-austral": 0 },
      sereno: { a: 0, b: 0, c: 0, "c-austral": 0 },
    },
  },
];

// Jornada legal del CCT 76/75: máximo 9 hs/día y 44 hs semanales (arts. 10 y 11).
// Mes "tipo" de jornada completa: 44 hs × 52 semanas / 12 meses ≈ 190,67 hs.
export const UOCRA_HORAS_SEMANALES = 44;
export const UOCRA_HORAS_MES_PROMEDIO = (44 * 52) / 12;

// Asistencia perfecta (art. 52 CCT 76/75): 20% del salario básico, por quincena con
// asistencia perfecta (vacaciones, licencias, feriados y suspensiones por clima no la quitan).
export const UOCRA_ASISTENCIA_PERFECTA = 0.2;

// Aportes del trabajador: 11% jubilación + 3% PAMI + 3% obra social sobre lo remunerativo.
// La SNR solo aporta a la obra social. Además: aporte solidario extraordinario del 2%
// (acuerdos 2026) para no afiliados — a los afiliados se lo absorbe la cuota sindical (2,5%).
export const UOCRA_APORTES_REMUNERATIVO = 0.17;
export const UOCRA_APORTES_SNR = 0.03;
export const UOCRA_APORTE_SOLIDARIO = 0.02;

// La Comisión Especial se reúne el 20/10/2026 para definir diciembre+. Una fecha futura
// escrita a mano envejece sola y nadie la mira; por eso check_planilla_uocra.ts la vigila.
export const UOCRA_PROXIMA_PARITARIA = {
  /** Fecha de la reunión de la Comisión Especial que define el tramo siguiente. */
  fechaISO: "2026-10-20",
  /** Qué tramo define esa reunión. */
  define: "diciembre de 2026 en adelante",
  /** Primer mes del tramo, con el mismo formato que los id de MESES_UOCRA. */
  primerMesQueDefine: "diciembre-2026",
  /** ¿Ya se publicó el acuerdo con las tablas? Mientras sea false, la escala cargada es la última vigente. */
  publicada: false,
  /** Última vez que se COMPROBÓ contra la fuente que el acuerdo sigue sin publicarse. */
  comprobadoEl: "2026-09-28",
} as const;
