import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESICE = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];

export function mesicRok(fecha: string): string {
  return `${MESICE[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function zacatekMesice(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface ZmenaCen {
  od: FechaISO;
  do: FechaISO;
  nasobek: number;
  celkem: number;
  poznamky: string[];
}

// Motor dává jen poslední bod řady; historii z series.json ořízneme na něj, aby případ s pevným datem
// neviděl měsíce zveřejněné později.
export function zmenaCen(body: readonly PuntoSerieTupla[], posledni: PuntoSerie, od: FechaISO, do_: FechaISO, pole: { od: string; do: string }): ZmenaCen {
  const dostupne = body.filter(([f]) => f <= posledni.fecha);
  const index = new Map<string, number>(dostupne);
  const prvni = dostupne[0]?.[0];
  if (!prvni) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const poznamky: string[] = [];
  const m1 = zacatekMesice(od);
  let m2 = zacatekMesice(do_);
  if (m1 < prvni) throw new ErrorEntrada(`Údaje začínají měsícem ${mesicRok(prvni)}.`, pole.od);
  if (m1 > posledni.fecha) throw new ErrorEntrada(`Za tento měsíc ČSÚ údaje ještě nezveřejnil. Poslední jsou za ${mesicRok(posledni.fecha)}.`, pole.od);
  if (m2 > posledni.fecha) {
    poznamky.push(`Poslední údaje ČSÚ jsou za ${mesicRok(posledni.fecha)}. Počítáme do tohoto měsíce.`);
    m2 = posledni.fecha;
  }
  if (m1 > m2) throw new ErrorEntrada("Počáteční měsíc musí být dřívější než konečný.", pole.od);
  const iOd = index.get(m1);
  const iDo = index.get(m2);
  if (iOd === undefined || iDo === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const nasobek = iDo / iOd;
  return { od: m1, do: m2, nasobek, celkem: (nasobek - 1) * 100, poznamky };
}
