import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MANUDIR = ["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember"];

export function manudurAr(fecha: string): string {
  return `${MANUDIR[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function fyrstiDagur(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Breyting {
  fra: FechaISO;
  til: FechaISO;
  visitalaFra: number;
  visitalaTil: number;
  margfaldari: number;
  prosent: number;
  athugasemdir: string[];
}

// Motorinn lætur aðeins síðasta punkt raðarinnar í té. Sagan úr series.json er því skorin við þann
// punkt, svo að dæmi með fastri dagsetningu sjái ekki mánuði sem voru birtir síðar.
export function breytingVisitolu(punktar: readonly PuntoSerieTupla[], sidasti: PuntoSerie, fra: FechaISO, til: FechaISO, reitir: { fra: string; til: string }): Breyting {
  const tiltaekir = punktar.filter(([f]) => f <= sidasti.fecha);
  const visitala = new Map<string, number>(tiltaekir);
  const fyrsti = tiltaekir[0]?.[0];
  if (!fyrsti) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const athugasemdir: string[] = [];
  const m1 = fyrstiDagur(fra);
  let m2 = fyrstiDagur(til);
  if (m1 < fyrsti) throw new ErrorEntrada(`Gögnin ná aftur til ${manudurAr(fyrsti)}.`, reitir.fra);
  if (m1 > sidasti.fecha) throw new ErrorEntrada(`Vísitalan er ekki komin fyrir þennan mánuð. Síðasti mánuður: ${manudurAr(sidasti.fecha)}.`, reitir.fra);
  if (m2 > sidasti.fecha) {
    athugasemdir.push(`Síðasta birta gildi er fyrir ${manudurAr(sidasti.fecha)}. Reiknað er til þess mánaðar.`);
    m2 = sidasti.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Upphafsmánuður getur ekki verið á eftir lokamánuði.", reitir.fra);
  const v1 = visitala.get(m1);
  const v2 = visitala.get(m2);
  if (v1 === undefined || v2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const margfaldari = v2 / v1;
  return { fra: m1, til: m2, visitalaFra: v1, visitalaTil: v2, margfaldari, prosent: (margfaldari - 1) * 100, athugasemdir };
}
