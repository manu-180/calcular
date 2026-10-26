import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MANADER = ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"];

export function manadAr(fecha: string): string {
  return `${MANADER[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function forstaIManaden(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Prisforandring {
  fran: FechaISO;
  till: FechaISO;
  indexFran: number;
  indexTill: number;
  faktor: number;
  forandring: number;
  observaciones: string[];
}

// Motorn ger bara seriens senaste punkt. Historiken läses från series.json och kortas av vid den punkten,
// så att ett fall med fast datum inte ser månader som publicerats senare.
export function prisforandring(punkter: readonly PuntoSerieTupla[], senaste: PuntoSerie, fran: FechaISO, till: FechaISO, falt: { fran: string; till: string }): Prisforandring {
  const tillgangliga = punkter.filter(([f]) => f <= senaste.fecha);
  const index = new Map<string, number>(tillgangliga);
  const forsta = tillgangliga[0]?.[0];
  if (!forsta) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const m1 = forstaIManaden(fran);
  let m2 = forstaIManaden(till);
  if (m1 < forsta) throw new ErrorEntrada(`Serien börjar ${manadAr(forsta)}.`, falt.fran);
  if (m1 > senaste.fecha) throw new ErrorEntrada(`SCB har inte publicerat KPI för den månaden än. Senaste månaden är ${manadAr(senaste.fecha)}.`, falt.fran);
  if (m2 > senaste.fecha) {
    observaciones.push(`Senaste KPI från SCB gäller ${manadAr(senaste.fecha)}. Vi räknar fram till den månaden.`);
    m2 = senaste.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Startmånaden måste vara före slutmånaden.", falt.fran);
  const indexFran = index.get(m1);
  const indexTill = index.get(m2);
  if (indexFran === undefined || indexTill === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = indexTill / indexFran;
  return { fran: m1, till: m2, indexFran, indexTill, faktor, forandring: (faktor - 1) * 100, observaciones };
}
