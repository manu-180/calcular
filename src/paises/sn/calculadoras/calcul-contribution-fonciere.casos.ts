import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-contribution-fonciere";

export default definirCasos(calculadora, [
  {
    nombre: "Maison d'une valeur locative de 3,6 millions",
    origen: { tipo: "recalculado", detalle: "3 600 000 × 5 % = 180 000." },
    fecha: "2026-10-18",
    entrada: { type: "batie", valeur: 3600000 },
    esperado: { contribution: 180000 },
  },
]);
