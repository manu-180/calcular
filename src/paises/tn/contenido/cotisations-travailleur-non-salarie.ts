import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.cotisations-travailleur-non-salarie",
  h1: "Cotisations CNSS des travailleurs non salariés en Tunisie",
  title: "Cotisation CNSS non salarié Tunisie 2026 : montant",
  description:
    "Calculez la cotisation trimestrielle CNSS d'un travailleur indépendant en Tunisie selon sa classe de revenu : taux de {{tn.cnss-tns-taux}} et barème du 2e trimestre 2026.",
  intro: [
    "Commerçants, artisans, professions libérales et autres travailleurs indépendants du secteur non agricole cotisent eux-mêmes à la CNSS, chaque trimestre, sur une assiette forfaitaire qu'ils choisissent parmi dix classes de revenu.",
    "Choisissez votre classe et, si vous y avez adhéré, le taux de l'assurance accidents du travail. Vous obtenez le montant à payer par trimestre et par an.",
  ],
  comoSeCalcula: [
    "L'assiette part du SMIG horaire du régime de 48 heures multiplié par 2 400 heures par an, puis par le coefficient de la classe : de 1 SMIG pour la classe 1 à 18 SMIG pour la classe 10.",
    "La cotisation de sécurité sociale est de {{tn.cnss-tns-taux}} de l'assiette, entièrement à la charge du travailleur non salarié. Classe 1 : {{tn.cnss-tns-assiette[classe-1]}} d'assiette par trimestre.",
    "L'assurance accidents du travail est facultative : de {{tn.accidents-travail[minimum]}} à {{tn.accidents-travail[maximum]}} de l'assiette selon l'activité.",
  ],
  faq: [
    {
      pregunta: "Combien paie un travailleur indépendant à la CNSS en 2026 ?",
      respuesta:
        "À partir du 2e trimestre 2026, la classe 1 paie 235,389 dinars par trimestre et la classe 10, la plus haute, 4 237,010 dinars. Le montant dépend de la classe de revenu choisie.",
    },
    {
      pregunta: "Quand faut-il payer la cotisation trimestrielle ?",
      respuesta:
        "Au plus tard le 15 du mois qui suit le trimestre écoulé, en espèces, par chèque, par virement ou en ligne. Un retard entraîne une pénalité de 1 % par mois ou fraction de mois.",
    },
    {
      pregunta: "L'assurance accidents du travail est-elle obligatoire pour un indépendant ?",
      respuesta:
        "Non, l'adhésion est facultative. Son taux va de {{tn.accidents-travail[minimum]}} à {{tn.accidents-travail[maximum]}} de l'assiette selon l'activité, d'après le décret n° 95-538 du 1er avril 1995.",
    },
  ],
  glosario: [
    { termino: "Travailleur non salarié", definicion: "Personne qui exerce une activité pour son propre compte, sans contrat de travail." },
    { termino: "Classe de revenu", definicion: "Tranche forfaitaire qui fixe l'assiette des cotisations, exprimée en multiples du SMIG." },
    { termino: "Assiette", definicion: "Montant sur lequel s'applique le taux de cotisation." },
  ],
});
