import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-cfce";

export default definirCasos(calculadora, [
  {
    nombre: "2 millions de salaires",
    origen: { tipo: "recalculado", detalle: "2 000 000 × 3 % = 60 000." },
    fecha: "2026-10-18",
    entrada: { masse: 2000000 },
    esperado: { cfce: 60000 },
  },
]);
