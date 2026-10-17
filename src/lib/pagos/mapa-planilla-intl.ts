// Mapa de una planilla intl: qué calculadoras tienen hoja en el archivo y en qué celda va cada campo,
// con la conversión del valor de la calculadora al de la celda. Lo escribe el generador junto al
// .xlsx (private/intl/<m>/<archivo>.mapa.json) y lo leen las ofertas (qué calculadora vende la
// planilla) y la descarga (cargar los números de la persona). Puro: sin fs, para poder probarlo.

export type CeldaMapa =
  | { ref: string; tipo: "numero"; factor: number }
  | { ref: string; tipo: "valor"; valores: Readonly<Record<string, string | number | boolean | null>> }
  | { ref: string; tipo: "fecha-serial" };

export type ValorMuestra = string | number | boolean | null;

export interface BloqueMapa {
  calculadora: string;
  hoja: string;
  celdas: Readonly<Record<string, CeldaMapa>>;
  // Lo que trae la hoja al abrirla, ya en valores de la calculadora: con eso la landing calcula la
  // vista previa con los números reales de hoy, sin leer el .xlsx.
  muestra?: Readonly<Record<string, ValorMuestra>>;
}

export interface MapaPlanilla {
  version: 1;
  archivo: string;
  bloques: readonly BloqueMapa[];
}

const RE_REF = /^[A-Z]{1,3}[1-9][0-9]{0,5}$/;

export function serialExcel(fecha: string): number {
  const [a, m, d] = fecha.split("-").map(Number);
  return Math.round((Date.UTC(a, m - 1, d) - Date.UTC(1899, 11, 30)) / 86_400_000);
}

// La clave del mapa de valores: JSON del valor de la calculadora, así "true" (texto) y true
// (booleano) no se confunden.
export const claveValor = (v: unknown) => JSON.stringify(v);

export function valorDeCelda(c: CeldaMapa, v: unknown): string | number | boolean | null | undefined {
  if (v === null || v === undefined) return c.tipo === "valor" ? c.valores[claveValor(v)] : null;
  switch (c.tipo) {
    case "numero":
      return typeof v === "number" && Number.isFinite(v) ? v * c.factor : undefined;
    case "fecha-serial":
      return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v) ? serialExcel(v) : undefined;
    case "valor": {
      const k = claveValor(v);
      return Object.prototype.hasOwnProperty.call(c.valores, k) ? c.valores[k] : undefined;
    }
  }
}

// Lectura defensiva: el archivo lo escribe el build, pero un mapa roto no tiene que tirar la descarga.
export function leerMapa(raw: unknown): MapaPlanilla | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Partial<MapaPlanilla>;
  if (m.version !== 1 || typeof m.archivo !== "string" || !Array.isArray(m.bloques)) return null;
  for (const b of m.bloques) {
    if (!b || typeof b.calculadora !== "string" || typeof b.hoja !== "string" || !b.celdas || typeof b.celdas !== "object") return null;
    for (const c of Object.values(b.celdas as Record<string, { ref?: unknown }>)) if (!c || typeof c.ref !== "string" || !RE_REF.test(c.ref)) return null;
  }
  return m as MapaPlanilla;
}

export function archivoMapa(archivoXlsx: string): string {
  return archivoXlsx.replace(/\.xlsx$/, ".mapa.json");
}
