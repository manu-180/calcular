import { porcentaje } from "@/motor/calculo";

export function podatkyZProdazhu(suma: number, stavka: number, vz: number, redondear: (x: number) => number) {
  const pdfo = redondear(porcentaje(suma, stavka));
  const zbir = stavka > 0 ? redondear(porcentaje(suma, vz)) : 0;
  return { pdfo, vz: zbir, razom: redondear(pdfo + zbir), zalyshyt: redondear(suma - pdfo - zbir) };
}
