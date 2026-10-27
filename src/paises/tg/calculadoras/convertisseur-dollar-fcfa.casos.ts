import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-dollar-fcfa";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 dollars au cours du 27 octobre 2026",
    origen: { tipo: "recalculado", detalle: "Moyenne BCEAO (581,75 + 588,75) ÷ 2 = 585,25. 100 × 585,25 = 58 525." },
    fecha: F,
    entrada: { sens: "usd-xof", montant: 100 },
    esperado: { francs: 58525, cours: 585.25 },
  },
  {
    nombre: "58 525 F en dollars",
    origen: { tipo: "recalculado", detalle: "58 525 ÷ 585,25 = 100." },
    fecha: F,
    entrada: { sens: "xof-usd", montant: 58525 },
    esperado: { dollars: 100 },
  },
]);
