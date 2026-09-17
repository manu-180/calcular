import { ALICUOTA_DIVIDENDOS, escalaDe, type EscalaAnual, type TramoSociedades } from "@/data/ganancias-sociedades";

export type EntradaGananciasSociedades = {
  gananciaNetaImponible: number;
  anioInicioEjercicio: number;
  /** Parte de la ganancia después de impuesto que se reparte a socios personas humanas (0 a 1). */
  porcentajeDistribuido: number;
};

export type ResultadoGananciasSociedades = {
  escala: EscalaAnual;
  tramo: TramoSociedades;
  impuesto: number;
  alicuotaEfectiva: number;
  alicuotaMarginal: number;
  gananciaDespuesDeImpuesto: number;
  dividendos: number;
  retencionDividendos: number;
  cargaTotal: number;
  cargaTotalEfectiva: number;
};

const centavos = (n: number) => Math.round(n * 100) / 100;

export function impuestoPorEscala(ganancia: number, escala: EscalaAnual): { impuesto: number; tramo: TramoSociedades } {
  const g = Math.max(0, ganancia);
  const tramo = escala.tramos.find((t) => t.hasta === null || g <= t.hasta) ?? escala.tramos[escala.tramos.length - 1];
  return { impuesto: centavos(tramo.fijo + (g - tramo.desde) * tramo.alicuota), tramo };
}

export function calcularGananciasSociedades(e: EntradaGananciasSociedades): ResultadoGananciasSociedades | null {
  const escala = escalaDe(e.anioInicioEjercicio);
  if (!escala) return null;
  const ganancia = Math.max(0, e.gananciaNetaImponible);
  const { impuesto, tramo } = impuestoPorEscala(ganancia, escala);
  const gananciaDespuesDeImpuesto = centavos(ganancia - impuesto);
  const parte = Math.min(1, Math.max(0, e.porcentajeDistribuido));
  const dividendos = centavos(gananciaDespuesDeImpuesto * parte);
  const retencionDividendos = centavos(dividendos * ALICUOTA_DIVIDENDOS);
  const cargaTotal = centavos(impuesto + retencionDividendos);
  return {
    escala,
    tramo,
    impuesto,
    alicuotaEfectiva: ganancia > 0 ? impuesto / ganancia : 0,
    alicuotaMarginal: tramo.alicuota,
    gananciaDespuesDeImpuesto,
    dividendos,
    retencionDividendos,
    cargaTotal,
    cargaTotalEfectiva: ganancia > 0 ? cargaTotal / ganancia : 0,
  };
}
