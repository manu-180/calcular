// Camioneros — CCT 40/89 (Transporte Automotor de Cargas, Logística y Servicios)
// Paritaria 2026: acuerdo del 13/3/2026 (Disp. DNRyRT 455/2026) y acuerdo del 18/9/2026, que fija
// septiembre 2026 a febrero 2027 (Disp. DNRyRT 1277/2026).
//
// LOS BÁSICOS SON LA TABLA OFICIAL FIRMADA, NO UNA DERIVACIÓN. FADEEAC —la cámara
// empresaria, el equivalente de CAMARCO para UOCRA— publica la planilla salarial mes a mes
// firmada por las partes, y de ahí salen los nueve números de cada mes de ESCALAS_POR_MES.
//
// POR QUÉ IMPORTA (mina pisada el 20/9/2026): hasta hoy esta escala se derivaba encadenando
// los porcentajes que publicaban los medios (marzo +2,0 · abril +1,8 · mayo +1,7 · junio +1,6
// · julio +1,5 · agosto +1,5). Los primeros cuatro meses daban EXACTO contra la planilla
// oficial, así que todo parecía sano — pero la cláusula TERCERA del acuerdo pactó una revisión
// en junio "que se incorporará en la escala de julio", y esa revisión fue **+4,22%**, no
// +1,5%. Resultado: publicábamos julio y agosto 2,68% por debajo del básico real (≈$28.000
// mensuales en el Chofer de Primera). El check viejo no lo vio porque afirmaba el supuesto
// (+1,5%) en vez de la fuente. Regla: una escala de convenio se carga de la planilla firmada.
//
// Escala general (nacional). Los residentes al sur del Río Colorado cobran coeficiente 1,20 y
// al sur del Río Santa Cruz 1,40, pero sobre los ítems 4.2.3 y 4.2.4 (viáticos y recargos por
// zona), NO sobre el básico: por eso el básico de esta tabla es único para todo el país.

export const CAMIONEROS_FUENTES = {
  circular: {
    nombre:
      "FADEEAC: planillas salariales firmadas del CCT 40/89 (marzo 2026 a febrero 2027)",
    url: "https://www.fadeeac.org.ar/departamento-legislacion-legales-y-seguros/",
    consultadoEl: "2026-10-10",
  },
  acuerdo: {
    nombre: "Acuerdo paritario del 13/3/2026: CCT 40/89 (marzo a agosto 2026), PDF firmado",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Acuerdo-Paritario-13-3-26.pdf",
    consultadoEl: "2026-09-20",
  },
  homologacion: {
    nombre: "Disposición DNRyRT 455/2026: homologación del acuerdo del 13/3/2026",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Disp.-455-26-HOMOLOGACION-acuerdo-13-3-26.pdf",
    consultadoEl: "2026-09-20",
  },
  revision: {
    nombre:
      "Revisión de la cláusula TERCERA: recompone julio y agosto 2026 (+4,22% sobre junio)",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/08/REVISION-Acuerdo-Julio-Agosto-2026.pdf",
    consultadoEl: "2026-09-20",
  },
  acuerdo2: {
    nombre: "Acuerdo paritario del 18/9/2026: CCT 40/89 (septiembre 2026 a febrero 2027), PDF firmado",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/1-Acuerdo-paritario-Sep-2026-Feb2027.pdf",
    consultadoEl: "2026-10-10",
  },
  homologacion2: {
    nombre: "Disposición DNRyRT 1277/2026: homologación del acuerdo del 18/9/2026",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/Disp.-1277-26-Homolog.-paritaria-sep26-Feb27.pdf",
    consultadoEl: "2026-10-10",
  },
  asignacion: {
    nombre:
      "Acuerdo del 18/9/2026: asignación extraordinaria no remunerativa de $1.200.000 (4 cuotas de $300.000 desde enero 2027)",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/2-Acuerdo-Asignacion-Ext.No-Remunerativa.pdf",
    consultadoEl: "2026-10-10",
  },
  verificacion: {
    nombre: "FADEEAC: planillas salariales firmadas de septiembre 2026 a febrero 2027 (PDF)",
    url: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    consultadoEl: "2026-10-10",
  },
};

/** La homologación del último acuerdo cargado. Cada mes trae la suya en `MESES_CAMIONEROS`. */
export const CAMIONEROS_HOMOLOGACION = "Disposición DNRyRT 1277/2026";

export const CAMIONEROS_APORTES_REMUNERATIVO = 0.17;
export const CAMIONEROS_ANTIGUEDAD_POR_ANIO = 0.01;

export type CategoriaCamionerosId =
  | "chofer-primera"
  | "chofer-segunda"
  | "chofer-tercera"
  | "encargado"
  | "peon"
  | "ayudante-mayor"
  | "taller-oficial-primera"
  | "taller-oficial"
  | "taller-medio-oficial";

export type CategoriaCamioneros = {
  id: CategoriaCamionerosId;
  nombre: string;
  grupo: string;
};

export const CATEGORIAS_CAMIONEROS: CategoriaCamioneros[] = [
  { id: "chofer-primera", nombre: "Chofer de Primera", grupo: "Choferes" },
  { id: "chofer-segunda", nombre: "Chofer de Segunda", grupo: "Choferes" },
  { id: "chofer-tercera", nombre: "Chofer de Tercera", grupo: "Choferes" },
  { id: "encargado", nombre: "Encargado", grupo: "Peones y encargados" },
  { id: "peon", nombre: "Peón", grupo: "Peones y encargados" },
  {
    id: "ayudante-mayor",
    nombre: "Ayudante mayor de 18 años",
    grupo: "Peones y encargados",
  },
  {
    id: "taller-oficial-primera",
    nombre: "Oficial de Primera (taller)",
    grupo: "Taller",
  },
  { id: "taller-oficial", nombre: "Oficial (taller)", grupo: "Taller" },
  {
    id: "taller-medio-oficial",
    nombre: "Medio Oficial (taller)",
    grupo: "Taller",
  },
];

/** Básicos mensuales oficiales por mes, tal cual la planilla firmada de FADEEAC.
 *  NO se derivan de un porcentaje: cada número se leyó del PDF del mes correspondiente
 *  (ver `planillaOficial` de cada mes en MESES_CAMIONEROS). */
export const ESCALAS_POR_MES: Record<string, Record<CategoriaCamionerosId, number>> = {
  "marzo-2026": {
    "chofer-primera": 917_462.42,
    "chofer-segunda": 901_112.88,
    "chofer-tercera": 884_746.81,
    "encargado": 862_285.20,
    "peon": 837_929.46,
    "ayudante-mayor": 821_870.69,
    "taller-oficial-primera": 1_021_805.24,
    "taller-oficial": 921_140.39,
    "taller-medio-oficial": 870_164.95,
  },
  "abril-2026": {
    "chofer-primera": 984_338.23,
    "chofer-segunda": 966_796.94,
    "chofer-tercera": 949_237.91,
    "encargado": 925_139.02,
    "peon": 899_007.94,
    "ayudante-mayor": 881_778.61,
    "taller-oficial-primera": 1_096_286.82,
    "taller-oficial": 988_284.30,
    "taller-medio-oficial": 933_593.15,
  },
  "mayo-2026": {
    "chofer-primera": 1_001_071.98,
    "chofer-segunda": 983_232.49,
    "chofer-tercera": 965_374.95,
    "encargado": 940_866.38,
    "peon": 914_291.07,
    "ayudante-mayor": 896_768.85,
    "taller-oficial-primera": 1_114_923.70,
    "taller-oficial": 1_005_085.13,
    "taller-medio-oficial": 949_464.23,
  },
  "junio-2026": {
    "chofer-primera": 1_017_089.13,
    "chofer-segunda": 998_964.21,
    "chofer-tercera": 980_820.95,
    "encargado": 955_920.24,
    "peon": 928_919.73,
    "ayudante-mayor": 911_117.15,
    "taller-oficial-primera": 1_132_762.48,
    "taller-oficial": 1_021_166.49,
    "taller-medio-oficial": 964_655.66,
  },
  "julio-2026": {
    "chofer-primera": 1_060_010.29,
    "chofer-segunda": 1_041_120.50,
    "chofer-tercera": 1_022_211.59,
    "encargado": 996_260.07,
    "peon": 968_120.14,
    "ayudante-mayor": 949_566.29,
    "taller-oficial-primera": 1_180_565.06,
    "taller-oficial": 1_064_259.72,
    "taller-medio-oficial": 1_005_364.13,
  },
  "agosto-2026": {
    "chofer-primera": 1_075_910.44,
    "chofer-segunda": 1_056_737.31,
    "chofer-tercera": 1_037_544.76,
    "encargado": 1_011_203.97,
    "peon": 982_641.94,
    "ayudante-mayor": 963_809.78,
    "taller-oficial-primera": 1_198_273.54,
    "taller-oficial": 1_080_223.62,
    "taller-medio-oficial": 1_020_444.59,
  },
  "septiembre-2026": {
    "chofer-primera": 1_095_276.83,
    "chofer-segunda": 1_075_758.58,
    "chofer-tercera": 1_056_220.57,
    "encargado": 1_029_405.64,
    "peon": 1_000_329.49,
    "ayudante-mayor": 981_158.36,
    "taller-oficial-primera": 1_219_842.46,
    "taller-oficial": 1_099_667.65,
    "taller-medio-oficial": 1_038_812.59,
  },
  "octubre-2026": {
    "chofer-primera": 1_126_149.40,
    "chofer-segunda": 1_106_080.99,
    "chofer-tercera": 1_085_992.26,
    "encargado": 1_058_421.50,
    "peon": 1_028_525.78,
    "ayudante-mayor": 1_008_814.27,
    "taller-oficial-primera": 1_254_226.16,
    "taller-oficial": 1_130_663.98,
    "taller-medio-oficial": 1_068_093.60,
  },
  "noviembre-2026": {
    "chofer-primera": 1_145_293.94,
    "chofer-segunda": 1_124_884.37,
    "chofer-tercera": 1_104_454.13,
    "encargado": 1_076_414.67,
    "peon": 1_046_010.72,
    "ayudante-mayor": 1_025_964.11,
    "taller-oficial-primera": 1_275_548.00,
    "taller-oficial": 1_149_885.27,
    "taller-medio-oficial": 1_086_251.19,
  },
  "diciembre-2026": {
    "chofer-primera": 1_163_618.64,
    "chofer-segunda": 1_142_882.52,
    "chofer-tercera": 1_122_125.40,
    "encargado": 1_093_637.30,
    "peon": 1_062_746.89,
    "ayudante-mayor": 1_042_379.54,
    "taller-oficial-primera": 1_295_956.77,
    "taller-oficial": 1_168_283.43,
    "taller-medio-oficial": 1_103_631.21,
  },
  "enero-2027": {
    "chofer-primera": 1_182_236.54,
    "chofer-segunda": 1_161_168.64,
    "chofer-tercera": 1_140_079.41,
    "encargado": 1_111_135.50,
    "peon": 1_079_750.84,
    "ayudante-mayor": 1_059_057.61,
    "taller-oficial-primera": 1_316_692.08,
    "taller-oficial": 1_186_975.96,
    "taller-medio-oficial": 1_121_289.31,
  },
  "febrero-2027": {
    "chofer-primera": 1_199_970.09,
    "chofer-segunda": 1_178_586.17,
    "chofer-tercera": 1_157_180.60,
    "encargado": 1_127_802.53,
    "peon": 1_095_947.10,
    "ayudante-mayor": 1_074_943.47,
    "taller-oficial-primera": 1_336_442.46,
    "taller-oficial": 1_204_780.60,
    "taller-medio-oficial": 1_138_108.65,
  },
};

/** El básico oficial de una categoría en un mes. Es una lectura de tabla, no un cálculo. */
export function basicoCamioneros(
  mesId: string,
  catId: CategoriaCamionerosId | string,
): number | null {
  return ESCALAS_POR_MES[mesId]?.[catId as CategoriaCamionerosId] ?? null;
}

/** Compat: la escala de mayo sigue expuesta porque varios checks ordenan categorías con ella. */
export const CAMIONEROS_BASE_MAYO: Record<CategoriaCamionerosId, number> =
  ESCALAS_POR_MES["mayo-2026"];

export type MesCamioneros = {
  id: string;
  etiqueta: string;
  mes: number;
  anio: number;
  /** PDF firmado del que salió la tabla de ESE mes. */
  planillaOficial: string;
  /** La disposición que homologó el acuerdo de ESE mes. */
  homologacion: string;
  cambios: string;
};

export const MESES_CAMIONEROS: MesCamioneros[] = [
  {
    id: "marzo-2026",
    etiqueta: "Marzo 2026",
    mes: 3,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Planilla-MARZO-26.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "Primer tramo del acuerdo del 13/3/2026. Además, suma no remunerativa de $53.000 por única vez con los haberes de marzo (cláusula PRIMERA).",
  },
  {
    id: "abril-2026",
    etiqueta: "Abril 2026",
    mes: 4,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Planilla-ABRIL-26.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "Se incorporan al básico $49.471 de la suma no remunerativa de marzo (al Chofer de Primera, y en proporción al resto). Además, corre el tramo de abril.",
  },
  {
    id: "mayo-2026",
    etiqueta: "Mayo 2026",
    mes: 5,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Planilla-MAYO-26.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "Tramo de mayo: +1,7% sobre el básico de abril.",
  },
  {
    id: "junio-2026",
    etiqueta: "Junio 2026",
    mes: 6,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/03/Planilla-JUNIO-26.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "Tramo de junio: +1,6% sobre el básico de mayo.",
  },
  {
    id: "julio-2026",
    etiqueta: "Julio 2026",
    mes: 7,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/08/Planilla-de-escalas-salariales-julio-2026-OK.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "+4,22% sobre junio: acá entra la REVISIÓN de la cláusula TERCERA (no es el +1,5% del tramo original). La escala de julio se republicó firmada en agosto.",
  },
  {
    id: "agosto-2026",
    etiqueta: "Agosto 2026",
    mes: 8,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/08/Planillas-de-escalas-salariales-agosto-2026-OK.pdf",
    homologacion: "Disposición DNRyRT 455/2026",
    cambios:
      "Último tramo del acuerdo: +1,5% sobre el básico de julio (ya revisado). Desde septiembre rige el acuerdo del 18/9/2026.",
  },
  {
    id: "septiembre-2026",
    etiqueta: "Septiembre 2026",
    mes: 9,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Primer tramo del acuerdo del 18/9/2026: +1,8% sobre el básico de agosto. Además, suma no remunerativa de $18.000 por única vez con los haberes de septiembre (cláusula PRIMERA).",
  },
  {
    id: "octubre-2026",
    etiqueta: "Octubre 2026",
    mes: 10,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Tramo de octubre: +1,7% sobre septiembre, y se incorporan al básico $12.252,86 de la suma no remunerativa de septiembre (al Chofer de Primera, y en proporción al resto). En total, +2,82%.",
  },
  {
    id: "noviembre-2026",
    etiqueta: "Noviembre 2026",
    mes: 11,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Tramo de noviembre: +1,7% sobre el básico de octubre.",
  },
  {
    id: "diciembre-2026",
    etiqueta: "Diciembre 2026",
    mes: 12,
    anio: 2026,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Tramo de diciembre: +1,6% sobre el básico de noviembre. El acuerdo prevé una revisión en la primera quincena de diciembre contra la inflación de septiembre a noviembre.",
  },
  {
    id: "enero-2027",
    etiqueta: "Enero 2027",
    mes: 1,
    anio: 2027,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Tramo de enero: +1,6% sobre el básico de diciembre. Además, empieza la asignación extraordinaria no remunerativa: 4 cuotas de $300.000 (enero a abril de 2027).",
  },
  {
    id: "febrero-2027",
    etiqueta: "Febrero 2027",
    mes: 2,
    anio: 2027,
    planillaOficial: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
    homologacion: "Disposición DNRyRT 1277/2026",
    cambios:
      "Último tramo del acuerdo del 18/9/2026: +1,5% sobre el básico de enero. Hay una revisión pactada para la primera quincena de marzo de 2027.",
  },
];
