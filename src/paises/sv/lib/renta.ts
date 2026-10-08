import type { FilaEscala } from "@/motor/tipos";

const CENTAVO = 0.01;

export interface Retencion {
  retencion: number;
  tramo: number;
}

// Las tablas del Decreto Ejecutivo 10 de 2025 cobran el porcentaje "sobre el exceso de" el límite del
// tramo anterior (550.00), no sobre el "desde" del tramo (550.01). aplicarEscala del motor usa el
// "desde" y daría un centavo de diferencia en cada cálculo.
export function retencionPorTabla(escala: readonly FilaEscala[], base: number): Retencion {
  if (base <= 0) return { retencion: 0, tramo: 1 };
  let indice = escala.length - 1;
  for (let i = 0; i < escala.length; i++) {
    const hasta = escala[i].hasta;
    if (hasta === null || base <= hasta) {
      indice = i;
      break;
    }
  }
  const fila = escala[indice];
  if (fila.tasa === 0) return { retencion: 0, tramo: indice + 1 };
  const exceso = escala[indice - 1]?.hasta ?? fila.desde - CENTAVO;
  return { retencion: (fila.cuotaFija ?? 0) + ((base - exceso) * fila.tasa) / 100, tramo: indice + 1 };
}
