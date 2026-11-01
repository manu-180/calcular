import { definirCasos } from "@/motor/calculo";
import calc from "./tecaj-evra";

export default definirCasos(calc, [
  { nombre: "EUR v USD", origen: { tipo: "recalculado", detalle: "100 × 1,1172 = 111,72 (tečajnica 30. 10. 2026)" }, fecha: "2026-10-31", entrada: { znesek: 100, valuta: "usd", smer: "izEvrov" }, esperado: { rezultat: 111.72 } },
  { nombre: "USD v EUR", origen: { tipo: "recalculado", detalle: "100 / 1,1172 = 89,51" }, fecha: "2026-10-31", entrada: { znesek: 100, valuta: "usd", smer: "vEvre" }, esperado: { rezultat: 89.51 } },
]);
