import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { manedOgAr } from "./kalender";

function forsteIManeden(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Prisendring {
  fra: FechaISO;
  til: FechaISO;
  faktor: number;
  endring: number;
  merknader: string[];
}

// Motoren gir bare siste punkt i serien; historikken fra series.json kuttes ved det punktet, så et
// testtilfelle med fast dato ikke ser måneder som ble publisert senere.
export function prisendring(punkter: readonly PuntoSerieTupla[], siste: PuntoSerie, fra: FechaISO, til: FechaISO, felt: { fra: string; til: string }): Prisendring {
  const tilgjengelig = punkter.filter(([f]) => f <= siste.fecha);
  const indeks = new Map<string, number>(tilgjengelig);
  const forste = tilgjengelig[0]?.[0];
  if (!forste) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const merknader: string[] = [];
  const m1 = forsteIManeden(fra);
  let m2 = forsteIManeden(til);
  if (m1 < forste) throw new ErrorEntrada(`Tallene starter i ${manedOgAr(forste)}.`, felt.fra);
  if (m1 > siste.fecha) throw new ErrorEntrada(`SSB har ikke publisert KPI for den måneden ennå. Siste tall er for ${manedOgAr(siste.fecha)}.`, felt.fra);
  if (m2 > siste.fecha) {
    merknader.push(`Siste tall fra SSB er for ${manedOgAr(siste.fecha)}. Vi regner fram til den måneden.`);
    m2 = siste.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Startmåneden må være før sluttmåneden.", felt.fra);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = i2 / i1;
  return { fra: m1, til: m2, faktor, endring: (faktor - 1) * 100, merknader };
}
