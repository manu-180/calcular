import { definirCasos } from "@/motor/calculo";
import calc from "./ddv-kalkulator";

export default definirCasos(calc, [
  { nombre: "22 % prištej", origen: { tipo: "recalculado", detalle: "100 × 22 % = 22" }, fecha: "2026-10-31", entrada: { znesek: 100, stopnja: "splosna", smer: "pristej" }, esperado: { z: 122, ddv: 22 } },
  { nombre: "9,5 % izloči", origen: { tipo: "recalculado", detalle: "100 / 1,095 = 91,32" }, fecha: "2026-10-31", entrada: { znesek: 100, stopnja: "nizja", smer: "izloci" }, esperado: { brez: 91.32, ddv: 8.68 } },
  { nombre: "5 % prištej", origen: { tipo: "recalculado", detalle: "100 × 5 % = 5" }, fecha: "2026-10-31", entrada: { znesek: 100, stopnja: "posebna", smer: "pristej" }, esperado: { z: 105 } },
]);
