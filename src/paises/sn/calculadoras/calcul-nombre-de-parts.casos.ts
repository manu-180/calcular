import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-nombre-de-parts";

export default definirCasos(calculadora, [
  {
    nombre: "Marié, 2 enfants, conjoint sans revenus",
    origen: { tipo: "recalculado", detalle: "1,5 + 2 × 0,5 + 0,5 = 3 parts ; article 174 : 25 %, minimum 400 000, maximum 1 650 000." },
    fecha: "2026-10-18",
    entrada: { situation: "marie", enfants: 2, conjointSansRevenu: true },
    esperado: { parts: 3, taux: 25, minimum: 400000, maximum: 1650000 },
  },
]);
