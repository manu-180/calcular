import { aplicarEscalaMarginal, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export interface ParametriAlgai {
  darbaNemejs: Readonly<Record<string, number>>;
  iinAlga: number;
  iinGada: readonly FilaEscala[];
  minimums: number;
  apgadajamais: number;
  papildu: Readonly<Record<string, number>>;
}

export interface IevadeAlgai {
  kategorija: string;
  gramatina: boolean;
  apgadajamie: number;
  atvieglojums: string;
}

export interface Alga {
  vsaoi: number;
  minimums: number;
  atvieglojumi: number;
  iin: number;
  iinGadaPiemaksa: number;
  neto: number;
}

// Sin grāmatiņa no se aplica ninguna desgravación (VID): el impuesto corre desde el primer euro.
export function atbrivojumi(p: ParametriAlgai, e: IevadeAlgai): { minimums: number; atvieglojumi: number } {
  if (!e.gramatina) return { minimums: 0, atvieglojumi: 0 };
  const papildu = e.atvieglojums === "nav" ? 0 : enMapa(p.papildu, e.atvieglojums);
  return { minimums: p.minimums, atvieglojumi: e.apgadajamie * p.apgadajamais + papildu };
}

// La nómina retiene una sola tasa (VID: algas nodokļa likme). Lo que excede la escala anual se paga en la
// declaración, y aquí se reparte por mes para que el neto no suba de golpe al cruzar el umbral.
export function noBruto(p: ParametriAlgai, e: IevadeAlgai, bruto: number): Alga {
  const vsaoi = porcentaje(bruto, enMapa(p.darbaNemejs, e.kategorija));
  const { minimums, atvieglojumi } = atbrivojumi(p, e);
  const apliekams = Math.max(0, bruto - vsaoi - minimums - atvieglojumi);
  const iin = porcentaje(apliekams, p.iinAlga);
  const gadaNodoklis = aplicarEscalaMarginal(p.iinGada, apliekams * 12);
  const iinGadaPiemaksa = Math.max(0, gadaNodoklis / 12 - iin);
  return { vsaoi, minimums, atvieglojumi, iin, iinGadaPiemaksa, neto: bruto - vsaoi - iin - iinGadaPiemaksa };
}

// El neto crece siempre con el bruto: una bisección alcanza y no hace falta invertir cada tramo a mano.
export function noNeto(p: ParametriAlgai, e: IevadeAlgai, neto: number): number {
  let zems = neto;
  let augsts = neto * 3 + 1000;
  while (noBruto(p, e, augsts).neto < neto) augsts *= 2;
  for (let i = 0; i < 80; i += 1) {
    const vidus = (zems + augsts) / 2;
    if (noBruto(p, e, vidus).neto < neto) zems = vidus;
    else augsts = vidus;
  }
  return augsts;
}
