import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";
import { maanedNavn } from "./datoer";

export function maanedAar(fecha: string): string {
  return `${maanedNavn(Number(fecha.slice(5, 7)))} ${fecha.slice(0, 4)}`;
}

function foersteIMaaned(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Prisudvikling {
  fra: FechaISO;
  til: FechaISO;
  faktor: number;
  samlet: number;
  noter: string[];
}

// Motoren giver kun seriens seneste punkt. Historikken fra series.json skæres ved det punkt, så et
// tilfælde med fast dato ikke ser måneder, der er offentliggjort senere.
export function prisudvikling(punkter: readonly PuntoSerieTupla[], seneste: PuntoSerie, fra: FechaISO, til: FechaISO, felter: { fra: string; til: string }): Prisudvikling {
  const kendte = punkter.filter(([f]) => f <= seneste.fecha);
  const indeks = new Map<string, number>(kendte);
  const foerste = kendte[0]?.[0];
  if (!foerste) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const noter: string[] = [];
  const m1 = foersteIMaaned(fra);
  let m2 = foersteIMaaned(til);
  if (m1 < foerste) throw new ErrorEntrada(`Tallene begynder i ${maanedAar(foerste)}.`, felter.fra);
  if (m1 > seneste.fecha) throw new ErrorEntrada(`Danmarks Statistik har endnu ikke tal for den måned. De seneste er for ${maanedAar(seneste.fecha)}.`, felter.fra);
  if (m2 > seneste.fecha) {
    noter.push(`De seneste tal fra Danmarks Statistik er for ${maanedAar(seneste.fecha)}. Vi regner til og med den måned.`);
    m2 = seneste.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Startmåneden skal ligge før slutmåneden.", felter.fra);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const faktor = i2 / i1;
  return { fra: m1, til: m2, faktor, samlet: (faktor - 1) * 100, noter };
}
