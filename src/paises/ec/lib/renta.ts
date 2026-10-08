import { aplicarEscala, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface DatosRenta {
  escala: readonly FilaEscala[];
  canasta: number;
  canastasPorCargas: Readonly<Record<string, number>>;
  canastasCatastroficas: number;
  rebaja: number;
}

export interface Renta {
  causado: number;
  tope: number;
  rebaja: number;
  impuesto: number;
}

// La rebaja por gastos personales se aplica sobre el impuesto causado y no genera devolución si lo
// supera (LRTI, artículo innumerado sobre gastos personales).
export function rentaAnual(base: number, gastos: number, cargas: string, catastrofica: boolean, d: DatosRenta, redondear: (n: number) => number): Renta {
  const causado = redondear(aplicarEscala(d.escala, base));
  const canastas = catastrofica ? d.canastasCatastroficas : enMapa(d.canastasPorCargas, cargas);
  const tope = redondear(d.canasta * canastas);
  const rebajaPosible = redondear(porcentaje(Math.min(gastos, tope), d.rebaja));
  const rebaja = Math.min(rebajaPosible, causado);
  return { causado, tope, rebaja, impuesto: redondear(causado - rebaja) };
}
