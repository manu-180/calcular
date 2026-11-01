import { porcentaje } from "@/motor/calculo";

export interface ParametryZarplaty {
  pdfo: number;
  vz: number;
  yesv: number;
  mzp: number;
  maksBaza: number;
}

export interface Utrymannia {
  pdfo: number;
  vz: number;
  naRuky: number;
  bazaYesv: number;
  yesv: number;
  vytraty: number;
}

// ПДФО рахують з бази після податкової соціальної пільги, військовий збір з усієї нарахованої
// зарплати. ЄСВ роботодавця: 22 % від зарплати, не менше ніж від мінімальної (за основним місцем
// роботи) і не більше ніж від максимальної бази.
export function utrymannia(brutto: number, psp: number, p: ParametryZarplaty, osnovne: boolean, redondear: (x: number) => number): Utrymannia {
  const pdfo = redondear(porcentaje(Math.max(0, brutto - psp), p.pdfo));
  const vz = redondear(porcentaje(brutto, p.vz));
  const naRuky = redondear(brutto - pdfo - vz);
  const maks = redondear(p.mzp * p.maksBaza);
  const bazaYesv = Math.min(osnovne ? Math.max(brutto, p.mzp) : brutto, maks);
  const yesv = redondear(porcentaje(bazaYesv, p.yesv));
  return { pdfo, vz, naRuky, bazaYesv, yesv, vytraty: redondear(brutto + yesv) };
}
