import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FechaISO, FilaEscala } from "@/motor/tipos";

export function impuesto(escala: readonly FilaEscala[], base: number): number {
  return aplicarEscalaMarginal(escala, Math.max(0, base));
}

export function tasaMarginal(escala: readonly FilaEscala[], base: number): number {
  let tasa = escala[0].tasa;
  for (const f of escala) if (base > f.desde) tasa = f.tasa;
  return tasa;
}

// El año fiscal de Botswana va del 1 de julio al 30 de junio. Devuelve el año en que empieza.
export function inicioAnioFiscal(fecha: FechaISO): number {
  const anio = Number(fecha.slice(0, 4));
  return Number(fecha.slice(5, 7)) >= 7 ? anio : anio - 1;
}

// Bruto cuyo neto después del impuesto es `neto`. En cada tramo el neto crece en forma lineal,
// así que se busca el tramo y se despeja (es lo que hace la grossing up table de BURS).
export function brutoDesdeNeto(escala: readonly FilaEscala[], neto: number): number {
  if (neto <= 0) return 0;
  for (const f of escala) {
    const netoHasta = f.hasta === null ? Infinity : f.hasta - impuesto(escala, f.hasta);
    if (neto <= netoHasta) {
      const netoDesde = f.desde - impuesto(escala, f.desde);
      return f.desde + (neto - netoDesde) / (1 - f.tasa / 100);
    }
  }
  return neto;
}

const FORMATO = new Intl.NumberFormat("en-BW", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function pula(n: number): string {
  return `P${FORMATO.format(n)}`;
}
