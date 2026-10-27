import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 30 000 500 F",
    origen: { tipo: "recalculado", detalle: "Base 30 000 000 × 30 % = 9 000 000 ; minimum 1 % de 400 000 000 = 4 000 000." },
    fecha: "2026-10-27",
    entrada: {"benefice": 30000500, "ca": 400000000},
    esperado: {"impotBenefice": 9000000, "minimum": 4000000, "impot": 9000000, "retenu": "Impôt sur le bénéfice"},
  },
  {
    nombre: "Exercice en perte",
    origen: { tipo: "recalculado", detalle: "Minimum forfaitaire : 1 % de 250 000 000 (base arrondie) = 2 500 000." },
    fecha: "2026-10-27",
    entrada: {"benefice": -5000000, "ca": 250000999},
    esperado: {"impotBenefice": 0, "minimum": 2500000, "impot": 2500000, "retenu": "Minimum forfaitaire"},
  },
]);
