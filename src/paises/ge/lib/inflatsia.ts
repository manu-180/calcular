import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const TVEEBI = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];

export function tveDaTseli(fecha: string): string {
  return `${TVEEBI[Number(fecha.slice(5, 7)) - 1]}, ${fecha.slice(0, 4)}`;
}

function tvisDasatskisi(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

// El motor solo pasa el último punto de la serie; la historia se corta en ese punto para que un caso
// con fecha fija no vea meses publicados después.
export function cvlileba(pontos: readonly PuntoSerieTupla[], bolo: PuntoSerie, dan: FechaISO, mde: FechaISO) {
  const misatsvdomi = pontos.filter(([f]) => f <= bolo.fecha);
  const indeksi = new Map<string, number>(misatsvdomi);
  const pirveli = misatsvdomi[0]?.[0];
  if (!pirveli) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const shenishvnebi: string[] = [];
  const t1 = tvisDasatskisi(dan);
  let t2 = tvisDasatskisi(mde);
  if (t1 < pirveli) throw new ErrorEntrada(`მონაცემები იწყება თვიდან: ${tveDaTseli(pirveli)}.`, "dan");
  if (t1 > bolo.fecha) throw new ErrorEntrada(`ამ თვის მონაცემი ჯერ არ გამოქვეყნებულა. ბოლო თვე: ${tveDaTseli(bolo.fecha)}.`, "dan");
  if (t2 > bolo.fecha) {
    shenishvnebi.push(`საქსტატის ბოლო გამოქვეყნებული თვე: ${tveDaTseli(bolo.fecha)}. გაანგარიშება აქამდე გავაკეთეთ.`);
    t2 = bolo.fecha;
  }
  if (t1 > t2) throw new ErrorEntrada("საწყისი თვე საბოლოო თვეზე გვიან ვერ იქნება.", "dan");
  const i1 = indeksi.get(t1);
  const i2 = indeksi.get(t2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const koeficienti = i2 / i1;
  return { dan: t1, mde: t2, koeficienti, sul: (koeficienti - 1) * 100, shenishvnebi };
}
