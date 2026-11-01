import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const AMISNER = ["հունվար", "փետրվար", "մարտ", "ապրիլ", "մայիս", "հունիս", "հուլիս", "օգոստոս", "սեպտեմբեր", "հոկտեմբեր", "նոյեմբեր", "դեկտեմբեր"];

export function amisTari(fecha: string): string {
  return `${fecha.slice(0, 4)} թ. ${AMISNER[Number(fecha.slice(5, 7)) - 1]}`;
}

function amsaSkizb(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Popokhutyun {
  sksum: FechaISO;
  verj: FechaISO;
  gortakits: number;
  yndhanur: number;
  nshumner: string[];
}

// El motor solo pasa el último punto: el historial se corta en ese punto para que un caso con fecha
// fija no vea meses publicados después.
export function gnachi(puntos: readonly PuntoSerieTupla[], verjin: PuntoSerie, sksum: FechaISO, verj: FechaISO): Popokhutyun {
  const hasaneli = puntos.filter(([f]) => f <= verjin.fecha);
  const indeks = new Map<string, number>(hasaneli);
  const arajin = hasaneli[0]?.[0];
  if (!arajin) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const nshumner: string[] = [];
  const a = amsaSkizb(sksum);
  let b = amsaSkizb(verj);
  if (a < arajin) throw new ErrorEntrada(`Տվյալները հասանելի են այս ամսից՝ ${amisTari(arajin)}։`, "sksum");
  if (a > verjin.fecha) throw new ErrorEntrada(`Այս ամսվա տվյալը դեռ չկա։ Վերջին հասանելի ամիսը՝ ${amisTari(verjin.fecha)}։`, "sksum");
  if (b > verjin.fecha) {
    nshumner.push(`Վերջին հասանելի ամիսը՝ ${amisTari(verjin.fecha)}։ Հաշվարկը կատարված է մինչև այդ ամիսը։`);
    b = verjin.fecha;
  }
  if (a > b) throw new ErrorEntrada("Սկզբի ամիսը չի կարող լինել ավարտի ամսից ուշ։", "sksum");
  const i1 = indeks.get(a);
  const i2 = indeks.get(b);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const gortakits = i2 / i1;
  return { sksum: a, verj: b, gortakits, yndhanur: (gortakits - 1) * 100, nshumner };
}
