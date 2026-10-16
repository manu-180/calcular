import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.ei-premium-calculator",
  h1: "Calcul des cotisations d'assurance-emploi 2026",
  title: "Cotisations d'assurance-emploi 2026 : salarié et employeur",
  description: "Calculez vos cotisations d'assurance-emploi 2026 : {{ca.ei-rates[employee-qc]}} au Québec ({{ca.ei-rates[employee]}} ailleurs) jusqu'à {{ca.ei-maximum}} de rémunération assurable.",
  intro: [
    "Inscrivez votre rémunération assurable pour voir les cotisations d'assurance-emploi retenues sur votre paie en 2026 et ce que votre employeur paie en plus.",
    "Le Québec a un taux d'assurance-emploi plus bas parce qu'il a son propre régime d'assurance parentale (RQAP).",
  ],
  comoSeCalcula: [
    "L'assurance-emploi est perçue sur la rémunération assurable jusqu'à {{ca.ei-maximum}} par année.",
    "Le taux du salarié est de {{ca.ei-rates[employee-qc]}} au Québec et de {{ca.ei-rates[employee]}} ailleurs au Canada.",
    "L'employeur paie {{ca.ei-rates[employer-qc]}} au Québec et {{ca.ei-rates[employer]}} ailleurs, sur la même rémunération.",
  ],
  faq: [
    {
      pregunta: "Pourquoi le taux est-il plus bas au Québec?",
      respuesta: "Parce que les prestations de maternité, de paternité et parentales y sont versées par le RQAP et non par l'assurance-emploi. Le taux du salarié est de {{ca.ei-rates[employee-qc]}} au lieu de {{ca.ei-rates[employee]}}.",
    },
    {
      pregunta: "Pourquoi mon employeur paie-t-il plus que moi?",
      respuesta: "Le taux de l'employeur est 1,4 fois celui du salarié : {{ca.ei-rates[employer-qc]}} contre {{ca.ei-rates[employee-qc]}} au Québec.",
    },
    {
      pregunta: "Les cotisations d'assurance-emploi réduisent-elles mon impôt?",
      respuesta: "Oui. Vos cotisations d'assurance-emploi donnent droit à un crédit d'impôt non remboursable au fédéral et au provincial.",
    },
  ],
  glosario: [
    { termino: "Rémunération assurable", definicion: "La paie sur laquelle les cotisations d'assurance-emploi sont perçues, jusqu'à {{ca.ei-maximum}} par année en 2026." },
    { termino: "RQAP", definicion: "Régime québécois d'assurance parentale, qui verse les prestations parentales au Québec à la place de l'assurance-emploi." },
  ],
});
