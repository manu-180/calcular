export function formatARS(monto: number, decimales = 2): string {
  return monto.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

const MENOS = /^[^\d]*[-−–]\s*[\d.,]/;

function magnitudMonto(input: string): number {
  // Acepta "12.500.000", "12500000", "12.500.000,50" y "1,500,000" (varias comas son miles)
  const sinPuntos = input.replace(/\./g, "");
  const comas = sinPuntos.match(/,/g)?.length ?? 0;
  const limpio = (comas > 1 ? sinPuntos.replace(/,/g, "") : sinPuntos.replace(",", ".")).replace(/[^0-9.]/g, "");
  const n = Number(limpio);
  return Number.isFinite(n) ? n : 0;
}

// Un monto negativo se descarta (0) en vez de leerse como su valor absoluto: calcular con
// el número sin el signo es dar un resultado equivocado sin avisar.
export function parseMonto(input: string): number {
  return MENOS.test(input.trim()) ? 0 : magnitudMonto(input);
}

// Para tasas y porcentajes chicos: acá el punto es decimal ("19.41" ≡ "19,41"),
// a diferencia de parseMonto, donde el punto separa miles.
export function parseDecimal(input: string): number {
  const n = Number(input.trim().replace(",", ".").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export const MONTO_MAXIMO = 1e12;
export const CANTIDAD_MAXIMA = 100_000;

function errorNumerico(input: string, valor: number, tope: number): string | null {
  const t = input.trim();
  if (t === "") return null;
  if (MENOS.test(t) && valor !== 0) return "no puede ser negativo, escribilo sin el signo menos";
  if (valor > tope || /\d{16,}/.test(t.replace(/[.,\s]/g, ""))) return "revisá el número, es demasiado grande para ser real";
  return null;
}

export function errorMonto(input: string, tope = MONTO_MAXIMO): string | null {
  return errorNumerico(input, magnitudMonto(input), tope);
}

export function errorCantidad(input: string, tope = CANTIDAD_MAXIMA): string | null {
  return errorNumerico(input, parseDecimal(input), tope);
}

export function primerError(campos: Record<string, string | null>): string | null {
  for (const [campo, mensaje] of Object.entries(campos)) {
    if (mensaje) return `${campo}: ${mensaje}.`;
  }
  return null;
}

/** Siempre con `decimales` decimales («12,0%»): es el formato del informe de cuota alimentaria. */
export function formatPctFijo(n: number, decimales = 1): string {
  return `${n.toLocaleString("es-AR", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })}%`;
}

export function formatPct(n: number, decimales = 2): string {
  return `${n.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimales,
  })}%`;
}
