import { definirTextos } from "@/motor/edicion";
import eiBenefits from "../../ca/calculadoras/ei-benefits-calculator";

export default definirTextos(eiBenefits, {
  calculadora: "ca-fr.ei-benefits-calculator",
  slug: "calcul-prestations-assurance-emploi",
  campos: {
    semanal: {
      etiqueta: "Rémunération hebdomadaire assurable moyenne",
      ayuda: "Votre paie brute assurable de vos meilleures semaines, divisée par le nombre de ces semaines.",
    },
    semanas: { etiqueta: "Semaines de prestations prévues" },
  },
  filas: {
    semanal: { etiqueta: "Prestation hebdomadaire d'assurance-emploi avant impôt" },
    quincenal: { etiqueta: "Deux semaines de prestations" },
    total: { etiqueta: "Total pour les semaines inscrites" },
    tasa: { etiqueta: "Taux de prestations" },
    maximoSemanal: { etiqueta: "Maximum hebdomadaire en 2026" },
  },
  mensajes: {
    "Enter your average weekly earnings.": "Inscrivez votre rémunération hebdomadaire moyenne.",
    "Your earnings are above the insurable maximum, so you get the weekly maximum.": "Votre rémunération dépasse le maximum assurable : vous recevez donc le maximum hebdomadaire.",
  },
});
