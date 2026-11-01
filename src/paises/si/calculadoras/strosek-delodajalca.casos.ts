import { definirCasos } from "@/motor/calculo";
import calc from "./strosek-delodajalca";

export default definirCasos(calc, [
  { nombre: "2.500 in minimalni regres", origen: { tipo: "recalculado", detalle: "17,1 % × 2500 = 427,50; 2927,50 × 12 + 1481,88 = 36611,88" }, fecha: "2026-10-31", entrada: { bruto: 2500, delez: 100, regres: null }, esperado: { mesecno: 2927.5, letno: 36611.88 } },
  { nombre: "Minimalna plača", origen: { tipo: "recalculado", detalle: "17,1 % × 1521,62 = 260,20; 22,86 % × 39,74 = 9,08; 1481,88 + 269,28 = 1751,16" }, fecha: "2026-10-31", entrada: { bruto: 1481.88, delez: 100, regres: 1481.88 }, esperado: { mesecno: 1751.16, zaDelavca: 9.08, lastni: 260.2 } },
]);
