import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESECI = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];

export function mesecGodina(fecha: string): string {
  return `${MESECI[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}.`;
}

function pocetakMeseca(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Promena {
  od: FechaISO;
  do: FechaISO;
  faktor: number;
  ukupno: number;
  napomene: string[];
}

// Motor predaje samo poslednju tačku serije, pa se istorija iz series.json seče na tu tačku: slučaj
// sa fiksnim datumom ne sme da vidi mesece objavljene kasnije.
export function promena(tacke: readonly PuntoSerieTupla[], poslednja: PuntoSerie, od: FechaISO, doDatuma: FechaISO, polja: { od: string; do: string }): Promena {
  const dostupne = tacke.filter(([f]) => f <= poslednja.fecha);
  const indeks = new Map<string, number>(dostupne);
  const prva = dostupne[0]?.[0];
  if (!prva) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const napomene: string[] = [];
  const m1 = pocetakMeseca(od);
  let m2 = pocetakMeseca(doDatuma);
  if (m1 < prva) throw new ErrorEntrada(`Podaci postoje od ovog meseca: ${mesecGodina(prva)}`, polja.od);
  if (m1 > poslednja.fecha) throw new ErrorEntrada(`Za taj mesec još nema podatka RZS. Poslednji je: ${mesecGodina(poslednja.fecha)}`, polja.od);
  if (m2 > poslednja.fecha) {
    napomene.push(`Poslednji podatak RZS je za ${mesecGodina(poslednja.fecha)} Računali smo do tog meseca.`);
    m2 = poslednja.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Početni mesec ne može biti posle krajnjeg.", polja.od);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = i2 / i1;
  return { od: m1, do: m2, faktor, ukupno: (faktor - 1) * 100, napomene };
}
