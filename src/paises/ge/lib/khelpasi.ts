import { porcentaje } from "@/motor/calculo";

export interface TasasKhelpasi {
  sashemosavlo: number;
  pensia: number;
}

export interface TasasSakhelmtsipo {
  pirveli: number;
  meore: number;
  zghvari1: number;
  zghvari2: number;
}

// El aporte del empleado sale del bruto y no integra la base del impuesto (საგადასახადო კოდექსი,
// art. 82.1 «ბ3»), por eso 1000 da 20 de aporte, 196 de impuesto y 784 en mano: es el ejemplo que
// publica el propio Fondo de Pensiones.
export function netoKhelpasi(bruto: number, monatsile: boolean, t: TasasKhelpasi, redondear: (x: number) => number) {
  const pensia = monatsile ? redondear(porcentaje(bruto, t.pensia)) : 0;
  const gadasakhadi = redondear(porcentaje(bruto - pensia, t.sashemosavlo));
  return { pensia, gadasakhadi, neto: redondear(bruto - pensia - gadasakhadi) };
}

// Tramos anuales de la ley de pensión acumulativa, art. 3.6 «ე»: 2 % hasta el primer tope, 1 % entre
// el primero y el segundo, nada por encima. Se reparte por doce para mostrarlo por mes.
export function sakhelmtsipoTslshi(tslshi: number, t: TasasSakhelmtsipo): number {
  const pirveli = Math.min(tslshi, t.zghvari1);
  const meore = Math.max(0, Math.min(tslshi, t.zghvari2) - t.zghvari1);
  return porcentaje(pirveli, t.pirveli) + porcentaje(meore, t.meore);
}
