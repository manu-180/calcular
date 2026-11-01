import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-dollar-fcfa";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "100 dollars au cours BCEAO du 27 octobre 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bceao.int/",
      detalle: "Cours du 27 octobre 2026 : achat 581,750, vente 588,750, moyenne 585,25. 100 × 585,25 = 58 525.",
    },
    fecha: F,
    entrada: { sens: "usd-xof", montant: 100 },
    esperado: { cours: 585.25, francs: 58525, dateCours: "2026-10-27" },
  },
  {
    nombre: "50 000 F CFA en dollars",
    origen: { tipo: "recalculado", detalle: "50 000 / 585,25 = 85,43 dollars." },
    fecha: F,
    entrada: { sens: "xof-usd", montant: 50000 },
    esperado: { dollars: 85.43 },
  },
]);
