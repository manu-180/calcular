import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

function menesioPradzia(data: string): FechaISO {
  return `${data.slice(0, 7)}-01` as FechaISO;
}

export interface Pokytis {
  nuo: FechaISO;
  iki: FechaISO;
  daugiklis: number;
  pastabos: string[];
}

// El motor solo da el último punto: la historia de series.json se recorta a él, para que un caso con
// fecha fija no vea meses publicados después.
export function kainuPokytis(taskai: readonly PuntoSerieTupla[], paskutinis: PuntoSerie, nuoData: FechaISO, ikiData: FechaISO): Pokytis {
  const prieinami = taskai.filter(([f]) => f <= paskutinis.fecha);
  const indeksai = new Map<string, number>(prieinami);
  const pirmas = prieinami[0]?.[0];
  if (!pirmas) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const pastabos: string[] = [];
  const nuo = menesioPradzia(nuoData);
  let iki = menesioPradzia(ikiData);
  if (nuo < pirmas) throw new ErrorEntrada(`Duomenys prasideda nuo šio mėnesio: ${pirmas.slice(0, 7)}.`, "nuo");
  if (nuo > paskutinis.fecha) throw new ErrorEntrada(`Šio mėnesio duomenų dar nėra. Naujausi: ${paskutinis.fecha.slice(0, 7)}.`, "nuo");
  if (iki > paskutinis.fecha) {
    pastabos.push(`Naujausi paskelbti duomenys: ${paskutinis.fecha.slice(0, 7)}. Skaičiuojama iki šio mėnesio.`);
    iki = paskutinis.fecha;
  }
  if (nuo > iki) throw new ErrorEntrada("Pradžios mėnuo turi būti ankstesnis už pabaigos mėnesį.", "nuo");
  const a = indeksai.get(nuo);
  const b = indeksai.get(iki);
  if (a === undefined || b === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  return { nuo, iki, daugiklis: b / a, pastabos };
}
