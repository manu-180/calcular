import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.impot-auto-entrepreneur",
  h1: "Calcul de l'impôt de l'auto-entrepreneur au Maroc",
  title: "Impôt auto-entrepreneur Maroc : {{ma.auto-entrepreneur-taux[commerce]}} ou {{ma.auto-entrepreneur-taux[services]}} du CA",
  description:
    "Calculez l'impôt sur le revenu de l'auto-entrepreneur : {{ma.auto-entrepreneur-taux[commerce]}} du chiffre d'affaires pour le commerce et l'artisanat, {{ma.auto-entrepreneur-taux[services]}} pour les services.",
  intro: [
    "L'auto-entrepreneur paie l'impôt sur le revenu directement sur son chiffre d'affaires encaissé, sans calculer de bénéfice.",
    "Indiquez votre chiffre d'affaires de l'année et votre type d'activité. Vous voyez l'impôt dû et le plafond du régime.",
  ],
  comoSeCalcula: [
    "Activités commerciales, industrielles et artisanales : {{ma.auto-entrepreneur-taux[commerce]}} du chiffre d'affaires encaissé, jusqu'à {{ma.auto-entrepreneur-plafonds[commerce]}} par an.",
    "Prestations de services : {{ma.auto-entrepreneur-taux[services]}} du chiffre d'affaires encaissé, jusqu'à {{ma.auto-entrepreneur-plafonds[services]}} par an.",
  ],
  ejemplo: ["Un prestataire de services qui encaisse 120 000 DH dans l'année paie 1 200 DH d'impôt sur le revenu."],
  faq: [
    {
      pregunta: "Que se passe-t-il si je dépasse le plafond ?",
      respuesta: "L'option pour le régime de l'auto-entrepreneur reste valable tant que le chiffre d'affaires encaissé ne dépasse pas les plafonds pendant deux années consécutives.",
    },
    {
      pregunta: "Faut-il aussi être affilié à la sécurité sociale ?",
      respuesta: "Oui. Le code général des impôts subordonne l'option pour ce régime à l'adhésion au régime de sécurité sociale prévu par la législation en vigueur.",
    },
    {
      pregunta: "Comment l'option est-elle exercée ?",
      respuesta: "L'option se fait dans les conditions de forme et de délai prévues par le code général des impôts. L'auto-entrepreneur doit aussi souscrire une déclaration d'existence auprès de l'organisme désigné à cet effet.",
    },
  ],
  glosario: [
    { termino: "Chiffre d'affaires encaissé", definicion: "Les sommes effectivement reçues des clients pendant l'année." },
    { termino: "Auto-entrepreneur", definicion: "Une personne physique qui exerce une activité individuelle sous ce régime simplifié." },
  ],
});
