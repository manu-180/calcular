import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-dollar-fcfa";

export default definirCasos(calculadora, [
  {
    nombre: "100 dollars au cours du 27 octobre 2026",
    origen: { tipo: "recalculado", detalle: "Cours moyen BCEAO de 585,25 F pour un dollar : 100 × 585,25 = 58 525." },
    fecha: "2026-10-27",
    entrada: { sens: "usd-xof", montant: 100 },
    esperado: { resultat: 58525, cours: 585.25 },
  },
  {
    nombre: "100 000 francs CFA en dollars",
    origen: { tipo: "recalculado", detalle: "100 000 / 585,25 = 170,87." },
    fecha: "2026-10-27",
    entrada: { sens: "xof-usd", montant: 100000 },
    esperado: { resultat: 170.87 },
  },
]);
