import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.ei-benefits-calculator",
  h1: "Calcul des prestations d'assurance-emploi {{anio}}",
  title: "Assurance-emploi {{anio}} : combien vais-je recevoir?",
  description: "Estimez vos prestations régulières d'assurance-emploi en {{anio}} : {{ca.ei-benefit-rate}} de votre rémunération hebdomadaire assurable moyenne, jusqu'à {{ca.ei-max-weekly-benefit}} par semaine.",
  intro: [
    "Inscrivez votre rémunération hebdomadaire assurable moyenne pour estimer vos prestations régulières d'assurance-emploi avant impôt.",
    "Pour la plupart des gens, l'assurance-emploi verse {{ca.ei-benefit-rate}} de la rémunération hebdomadaire moyenne, avec un maximum de {{ca.ei-max-weekly-benefit}} par semaine en 2026.",
  ],
  comoSeCalcula: [
    "Votre prestation hebdomadaire est de {{ca.ei-benefit-rate}} de votre rémunération hebdomadaire assurable moyenne.",
    "Elle ne peut pas dépasser {{ca.ei-max-weekly-benefit}} par semaine en 2026.",
    "Le total est le montant hebdomadaire multiplié par le nombre de semaines inscrit.",
  ],
  ejemplo: ["Si vous gagniez 1 000 $ par semaine, votre prestation est de 550 $ par semaine. Sur 20 semaines, cela fait 11 000 $ avant impôt."],
  faq: [
    {
      pregunta: "Les prestations d'assurance-emploi sont-elles imposables?",
      respuesta: "Oui. Ce sont des revenus imposables : de l'impôt peut être retenu sur chaque versement. Cette calculatrice montre le montant avant impôt.",
    },
    {
      pregunta: "Combien de semaines de prestations puis-je recevoir?",
      respuesta: "Cela dépend du nombre d'heures travaillées et du taux de chômage de votre région. Service Canada vous l'indique quand votre demande est traitée.",
    },
    {
      pregunta: "Et les prestations de maternité ou parentales au Québec?",
      respuesta: "Au Québec, elles sont versées par le Régime québécois d'assurance parentale (RQAP), pas par l'assurance-emploi. Cette calculatrice porte sur les prestations régulières.",
    },
  ],
  glosario: [
    { termino: "Rémunération hebdomadaire assurable moyenne", definicion: "Votre paie brute assurable de vos meilleures semaines, divisée par le nombre de ces semaines." },
    { termino: "Prestations régulières", definicion: "L'assurance-emploi versée quand vous perdez votre emploi sans en être responsable et que vous êtes disponible pour travailler." },
  ],
});
