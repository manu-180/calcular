import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESETSI = ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"];

export function mesetsGodina(data: string): string {
  return `${MESETSI[Number(data.slice(5, 7)) - 1]} ${data.slice(0, 4)} г.`;
}

function nachaloNaMesets(data: string): FechaISO {
  return `${data.slice(0, 7)}-01` as FechaISO;
}

export interface Promyana {
  ot: FechaISO;
  do: FechaISO;
  mnozhitel: number;
  obshto: number;
  belezhki: string[];
}

// Двигателят подава само последната точка на серията; историята се реже до нея, за да не вижда
// случай с фиксирана дата месеците, публикувани по-късно.
export function promyanaNaTsenite(tochki: readonly PuntoSerieTupla[], posledna: PuntoSerie, ot: FechaISO, doData: FechaISO, poleta: { ot: string; do: string }): Promyana {
  const nalichni = tochki.filter(([d]) => d <= posledna.fecha);
  const indeks = new Map<string, number>(nalichni);
  const parva = nalichni[0]?.[0];
  if (!parva) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const belezhki: string[] = [];
  const m1 = nachaloNaMesets(ot);
  let m2 = nachaloNaMesets(doData);
  if (m1 < parva) throw new ErrorEntrada(`Данните започват от ${mesetsGodina(parva)}.`, poleta.ot);
  if (m1 > posledna.fecha) throw new ErrorEntrada(`За този месец още няма данни на НСИ. Последният е ${mesetsGodina(posledna.fecha)}.`, poleta.ot);
  if (m2 > posledna.fecha) {
    belezhki.push(`Последните данни на НСИ са за ${mesetsGodina(posledna.fecha)}. Смятаме до този месец.`);
    m2 = posledna.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Началният месец не може да е след крайния.", poleta.ot);
  const i1 = indeks.get(m1);
  const i2 = indeks.get(m2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const mnozhitel = i2 / i1;
  return { ot: m1, do: m2, mnozhitel, obshto: (mnozhitel - 1) * 100, belezhki };
}
