// Camioneros — CCT 40/89 (Transporte Automotor de Cargas, Logística y Servicios)
// Paritaria 2026: Disposición DNRyRT 455/2026
// Aumentos: marzo +2,0% | abril +1,8% | mayo +1,7% | junio +1,6% | julio +1,5% | agosto +1,5%
// Escala nacional única (sin zonas diferenciadas).
// Valores de mayo 2026 verificados por convergencia de ≥4 fuentes especializadas independientes:
// Perfil, El Destape, Estudio Piccinini, Econoblog.

export const CAMIONEROS_FUENTES = {
  circular: {
    nombre: "Disposición DNRyRT 455/2026 — homologación paritaria Camioneros 2026",
    url: "https://www.argentina.gob.ar/normativa/nacional/disposicion-455-2026",
    consultadoEl: "2026-06-13",
  },
  verificacion: {
    nombre:
      "Perfil — Cuánto cobrarán los camioneros en junio 2026 (04/06/2026)",
    url: "https://www.perfil.com/noticias/economia/cuanto-van-a-cobrar-los-camioneros-en-junio-de-2026.phtml",
    consultadoEl: "2026-06-13",
  },
};

export const CAMIONEROS_HOMOLOGACION = "Disposición DNRyRT 455/2026";

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

// Básicos de mayo 2026 — base confirmada para el cálculo de todos los meses.
export const CAMIONEROS_BASE_MAYO: Record<CategoriaCamionerosId, number> = {
  "chofer-primera": 1_001_071.98,
  "chofer-segunda": 983_232.49,
  "chofer-tercera": 965_374.95,
  encargado: 940_866.38,
  peon: 914_291.07,
  "ayudante-mayor": 896_768.85,
  "taller-oficial-primera": 1_114_923.7,
  "taller-oficial": 996_199.21,
  "taller-medio-oficial": 949_464.23,
};

export type MesCamioneros = {
  id: string;
  etiqueta: string;
  mes: number;
  anio: number;
  // Factor relativo a los básicos de mayo 2026 (= 1.0).
  // Meses anteriores: < 1 (retroactivo). Meses siguientes: > 1 (acumulado).
  factorDesdeMayo: number;
  cambios: string;
};

export const MESES_CAMIONEROS: MesCamioneros[] = [
  {
    id: "marzo-2026",
    etiqueta: "Marzo 2026",
    mes: 3,
    anio: 2026,
    // mayo / (1.017 × 1.018)
    factorDesdeMayo: 1 / (1.017 * 1.018),
    cambios:
      "Primer tramo: +2,0% sobre el básico de febrero. Suma no remunerativa de $53.000 (solo marzo; $49.471 se incorporaron al básico desde abril).",
  },
  {
    id: "abril-2026",
    etiqueta: "Abril 2026",
    mes: 4,
    anio: 2026,
    // mayo / 1.017
    factorDesdeMayo: 1 / 1.017,
    cambios:
      "Segundo tramo: +1,8% sobre el básico de marzo. Se incorporan al básico $49.471 que se pagaban como SNR.",
  },
  {
    id: "mayo-2026",
    etiqueta: "Mayo 2026",
    mes: 5,
    anio: 2026,
    factorDesdeMayo: 1,
    cambios: "Tercer tramo: +1,7% sobre el básico de abril.",
  },
  {
    id: "junio-2026",
    etiqueta: "Junio 2026",
    mes: 6,
    anio: 2026,
    factorDesdeMayo: 1.016,
    cambios: "Cuarto tramo: +1,6% sobre el básico de mayo.",
  },
  {
    id: "julio-2026",
    etiqueta: "Julio 2026",
    mes: 7,
    anio: 2026,
    factorDesdeMayo: 1.016 * 1.015,
    cambios: "Quinto tramo: +1,5% sobre el básico de junio.",
  },
  {
    id: "agosto-2026",
    etiqueta: "Agosto 2026",
    mes: 8,
    anio: 2026,
    factorDesdeMayo: 1.016 * 1.015 * 1.015,
    cambios: "Sexto tramo: +1,5% sobre el básico de julio.",
  },
];
