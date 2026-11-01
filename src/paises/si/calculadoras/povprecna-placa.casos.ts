import { definirCasos } from "@/motor/calculo";
import calc from "./povprecna-placa";

export default definirCasos(calc, [
  { nombre: "2.500", origen: { tipo: "recalculado", detalle: "2500 / 2695,56 × 100 = 92,75; razlika −195,56" }, fecha: "2026-10-31", entrada: { bruto: 2500 }, esperado: { delez: 92.75, razlika: -195.56 } },
]);
