import { definirCasos } from "@/motor/calculo";
import calc from "./kalkulator-dohodnine";

export default definirCasos(calc, [
  { nombre: "30.000", origen: { tipo: "recalculado", detalle: "Prispevki 6930 + 472,32; osnova 17045,75; 1555,43 + 26 % × 7324,32 = 3459,75" }, fecha: "2026-10-31", entrada: { dohodek: 30000, prispevki: null, otroci: 0, do29: false, akontacija: null }, esperado: { dohodnina: 3459.75, osnova: 17045.75 } },
  { nombre: "16.000 z dodatno olajšavo", origen: { tipo: "recalculado", detalle: "20832,39 − 1,17259 × 16000 = 2070,95; olajšava 7622,88; osnova 4208,80; 16 % = 673,41" }, fecha: "2026-10-31", entrada: { dohodek: 16000, prispevki: null, otroci: 0, do29: false, akontacija: 700 }, esperado: { dohodnina: 673.41, razlika: -26.59 } },
]);
