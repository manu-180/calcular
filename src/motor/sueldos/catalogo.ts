// Lista cerrada de «Sueldos reales». Un código nuevo se suma al final y con nombre en los diez idiomas
// (src/motor/i18n/sueldos.ts lo exige por tipo). Nunca se renombra ni se borra un código: los aportes
// guardados lo usan y la base no conoce la lista (solo valida la forma).
export const OCUPACIONES = [
  "desarrollo-software",
  "soporte-it",
  "datos",
  "diseno",
  "marketing",
  "ventas",
  "atencion-cliente",
  "administracion",
  "contabilidad",
  "finanzas",
  "recursos-humanos",
  "direccion",
  "docencia-inicial",
  "docencia-secundaria",
  "docencia-universitaria",
  "enfermeria",
  "medicina",
  "farmacia",
  "ingenieria",
  "arquitectura",
  "derecho",
  "comercio",
  "cocina",
  "salon",
  "construccion",
  "oficios",
  "mecanica",
  "transporte",
  "logistica",
  "produccion",
  "limpieza",
  "seguridad",
  "periodismo",
  "sector-publico",
  "investigacion",
] as const;

export type Ocupacion = (typeof OCUPACIONES)[number];

export const EXPERIENCIAS = ["0-2", "3-5", "6-10", "11+"] as const;
export type Experiencia = (typeof EXPERIENCIAS)[number];

// k-anonimato: una celda (país, ocupación y, si va, experiencia) se publica recién con K aportes que
// sobreviven al filtro de atípicos. La base aplica el mismo número (migración 20261024120000): si se
// cambia acá, se cambia allá en una migración nueva.
export const K = 10;

// Meses de aportes que entran en cada cifra. La base usa la misma ventana.
export const VENTANA_MESES = 12;

const CONJUNTO_OCUPACIONES: ReadonlySet<string> = new Set(OCUPACIONES);
const CONJUNTO_EXPERIENCIAS: ReadonlySet<string> = new Set(EXPERIENCIAS);

export const esOcupacion = (x: unknown): x is Ocupacion => typeof x === "string" && CONJUNTO_OCUPACIONES.has(x);
export const esExperiencia = (x: unknown): x is Experiencia => typeof x === "string" && CONJUNTO_EXPERIENCIAS.has(x);
