export function formatARS(monto: number, decimales = 2): string {
  return monto.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}

export function parseMonto(input: string): number {
  // Acepta "12.500.000", "12500000", "12.500.000,50"
  const limpio = input.replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, "");
  const n = Number(limpio);
  return Number.isFinite(n) ? n : 0;
}

// Para tasas y porcentajes chicos: acá el punto es decimal ("19.41" ≡ "19,41"),
// a diferencia de parseMonto, donde el punto separa miles.
export function parseDecimal(input: string): number {
  const n = Number(input.trim().replace(",", ".").replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function formatPct(n: number, decimales = 2): string {
  return `${n.toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimales,
  })}%`;
}
