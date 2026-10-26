import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const LUNI = ["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"];

export function lunaAn(fecha: string): string {
  return `${LUNI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function inceputLuna(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Variatie {
  de: FechaISO;
  pana: FechaISO;
  factor: number;
  totala: number;
  note: string[];
}

// Motorul dă doar ultimul punct al seriei; istoria din series.json se taie la el, ca un caz cu dată fixă
// să nu vadă lunile publicate mai târziu.
export function variatiePreturi(puncte: readonly PuntoSerieTupla[], ultim: PuntoSerie, de: FechaISO, pana: FechaISO, campuri: { de: string; pana: string }): Variatie {
  const disponibile = puncte.filter(([f]) => f <= ultim.fecha);
  const index = new Map<string, number>(disponibile);
  const primul = disponibile[0]?.[0];
  if (!primul) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const note: string[] = [];
  const m1 = inceputLuna(de);
  let m2 = inceputLuna(pana);
  if (m1 < primul) throw new ErrorEntrada(`Datele încep din ${lunaAn(primul)}.`, campuri.de);
  if (m1 > ultim.fecha) throw new ErrorEntrada(`Indicele pentru această lună nu a fost publicat încă. Ultimul este pentru ${lunaAn(ultim.fecha)}.`, campuri.de);
  if (m2 > ultim.fecha) {
    note.push(`Ultimul indice publicat este pentru ${lunaAn(ultim.fecha)}. Calculul se oprește la această lună.`);
    m2 = ultim.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Luna de pornire trebuie să fie înaintea lunii de sosire.", campuri.de);
  const i1 = index.get(m1);
  const i2 = index.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const factor = i2 / i1;
  return { de: m1, pana: m2, factor, totala: (factor - 1) * 100, note };
}
