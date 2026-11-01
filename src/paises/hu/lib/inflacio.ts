import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const HONAPOK = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];

export function honapEv(fecha: string): string {
  return `${fecha.slice(0, 4)}. ${HONAPOK[Number(fecha.slice(5, 7)) - 1]}`;
}

function honapEleje(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

export interface Valtozas {
  tol: FechaISO;
  ig: FechaISO;
  szorzo: number;
  osszes: number;
  megjegyzesek: string[];
}

// A motor csak a sorozat utolsó pontját adja át; a series.json története erre a pontra van vágva,
// hogy egy rögzített dátumú eset ne lássa a később közzétett hónapokat.
export function arvaltozas(pontok: readonly PuntoSerieTupla[], utolso: PuntoSerie, tol: FechaISO, ig: FechaISO, mezok: { tol: string; ig: string }): Valtozas {
  const elerheto = pontok.filter(([f]) => f <= utolso.fecha);
  const index = new Map<string, number>(elerheto);
  const elso = elerheto[0]?.[0];
  if (!elso) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const megjegyzesek: string[] = [];
  const h1 = honapEleje(tol);
  let h2 = honapEleje(ig);
  if (h1 < elso) throw new ErrorEntrada(`Az adatok ettől a hónaptól érhetők el: ${honapEv(elso)}.`, mezok.tol);
  if (h1 > utolso.fecha) throw new ErrorEntrada(`Erre a hónapra még nincs KSH-adat. Az utolsó elérhető hónap: ${honapEv(utolso.fecha)}.`, mezok.tol);
  if (h2 > utolso.fecha) {
    megjegyzesek.push(`Az utolsó KSH-adat hónapja: ${honapEv(utolso.fecha)}. Eddig számoltunk.`);
    h2 = utolso.fecha;
  }
  if (h1 > h2) throw new ErrorEntrada("A kezdő hónap nem lehet későbbi a záró hónapnál.", mezok.tol);
  const i1 = index.get(h1);
  const i2 = index.get(h2);
  if (i1 === undefined || i2 === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const szorzo = i2 / i1;
  return { tol: h1, ig: h2, szorzo, osszes: (szorzo - 1) * 100, megjegyzesek };
}
