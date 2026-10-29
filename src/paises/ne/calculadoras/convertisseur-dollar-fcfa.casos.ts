import { definirCasos } from "@/motor/calculo";
import convertisseurDollarFcfa from "./convertisseur-dollar-fcfa";

const F = "2026-10-29";

export default definirCasos(convertisseurDollarFcfa, [
  {
    nombre: "100 dollars au cours du 28 octobre 2026",
    origen: { tipo: "recalculado", detalle: "Moyenne BCEAO (586,25 + 593,25) ÷ 2 = 589,75. 100 × 589,75 = 58 975." },
    fecha: F,
    entrada: { sens: "usd-xof", montant: 100 },
    esperado: { francs: 58975, cours: 589.75 },
  },
  {
    nombre: "58 975 F en dollars",
    origen: { tipo: "recalculado", detalle: "58 975 ÷ 589,75 = 100." },
    fecha: F,
    entrada: { sens: "xof-usd", montant: 58975 },
    esperado: { dollars: 100 },
  },
]);
