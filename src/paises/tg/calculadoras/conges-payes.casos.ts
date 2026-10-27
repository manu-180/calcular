import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Une année complète, 3 000 000 F perçus",
    origen: { tipo: "recalculado", detalle: "12 × 2,5 = 30 jours ; allocation 3 000 000 ÷ 12 = 250 000, soit 8 333 F par jour." },
    fecha: F,
    entrada: { mois: 12, remuneration: 3000000 },
    esperado: { jours: 30, allocation: 250000, parJour: 8333 },
  },
  {
    nombre: "Sept mois de service",
    origen: { tipo: "recalculado", detalle: "7 × 2,5 = 17,5 jours ; 1 400 000 ÷ 12 = 116 667." },
    fecha: F,
    entrada: { mois: 7, remuneration: 1400000 },
    esperado: { jours: 17.5, allocation: 116667 },
  },
]);
