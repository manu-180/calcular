import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.employer-payroll-cost",
  h1: "Calcul du coût d'un salarié pour l'employeur ({{anio}})",
  title: "Coût employeur d'un salarié au Québec en {{anio}}",
  description: "Voyez ce qu'un salaire coûte vraiment à l'employeur en {{anio}} : RRQ, assurance-emploi à {{ca.ei-rates[employer-qc]}} et RQAP au Québec. Chiffres de paie de l'ARC.",
  intro: [
    "Inscrivez un salaire annuel pour voir la part de l'employeur au RRQ ou au RPC, à l'assurance-emploi et, au Québec, au RQAP, ainsi que le coût total du poste.",
    "C'est un point de départ pour budgéter une embauche. Les avantages sociaux, les cotisations provinciales de l'employeur pour la santé et les primes d'indemnisation des accidents du travail varient selon l'employeur et ne sont pas inclus.",
  ],
  comoSeCalcula: [
    "Au Québec, l'employeur verse au RRQ le même montant que le salarié : {{ca.qpp[base]}} plus {{ca.qpp[first]}} sur les gains entre {{ca.cpp[exemption]}} et {{ca.cpp[ympe]}}, et {{ca.qpp[second]}} entre {{ca.cpp[ympe]}} et {{ca.cpp[yampe]}}. Hors Québec, le RPC est de {{ca.cpp-rates[base]}} plus {{ca.cpp-rates[first]}}.",
    "L'assurance-emploi de l'employeur est de {{ca.ei-rates[employer-qc]}} de la rémunération assurable au Québec, et de {{ca.ei-rates[employer]}} ailleurs, jusqu'à {{ca.ei-maximum}}.",
    "Au Québec, l'employeur paie aussi le RQAP à {{ca.qpip-rates[employer]}} sur les gains jusqu'à {{ca.qpip-maximum}}.",
  ],
  faq: [
    {
      pregunta: "L'employeur paie-t-il la deuxième cotisation supplémentaire?",
      respuesta: "Oui. L'employeur verse le même montant que le salarié sur les gains entre {{ca.cpp[ympe]}} et {{ca.cpp[yampe]}}.",
    },
    {
      pregunta: "Pourquoi l'assurance-emploi de l'employeur est-elle plus élevée?",
      respuesta: "Le taux de l'employeur est de {{ca.ei-rates[employer-qc]}} au Québec contre {{ca.ei-rates[employee-qc]}} pour le salarié : l'employeur paie 1,4 fois plus.",
    },
    {
      pregunta: "L'indemnité de vacances est-elle incluse?",
      respuesta: "Non. L'indemnité de vacances fait partie de la paie du salarié. Ajoutez-la au salaire si vous voulez l'inclure.",
    },
  ],
  glosario: [
    { termino: "Cotisations de l'employeur", definicion: "Les montants que l'employeur paie en plus du salaire, distincts des retenues sur la paie du salarié." },
    { termino: "RQAP", definicion: "Régime québécois d'assurance parentale, payé par les salariés et les employeurs du Québec." },
  ],
});
