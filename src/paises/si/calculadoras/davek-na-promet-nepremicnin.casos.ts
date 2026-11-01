import { definirCasos } from "@/motor/calculo";
import calc from "./davek-na-promet-nepremicnin";

export default definirCasos(calc, [
  { nombre: "200.000", origen: { tipo: "recalculado", detalle: "2 % × 200000 = 4000" }, fecha: "2026-10-31", entrada: { cena: 200000 }, esperado: { davek: 4000, ostane: 196000 } },
]);
