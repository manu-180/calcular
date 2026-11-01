import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-inflacije";

export default definirCasos(calc, [
  { nombre: "Januar 2020 na september 2026", origen: { tipo: "recalculado", detalle: "SURS 0400608S: 104,13 / 80,15 × 1000 = 1299,19" }, fecha: "2026-10-31", entrada: { znesek: 1000, od: "2020-01-01", doMeseca: "2026-09-01" }, esperado: { danes: 1299.19 } },
]);
