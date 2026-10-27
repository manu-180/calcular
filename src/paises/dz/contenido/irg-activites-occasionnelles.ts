import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.irg-activites-occasionnelles",
  h1: "IRG sur les vacations et activités occasionnelles en Algérie",
  title: "IRG vacation Algérie : retenue de {{dz.irg-occasionnelles[enseignement]}} ou {{dz.irg-occasionnelles[autres]}}",
  description:
    "Calculez la retenue à la source sur une vacation d'enseignement ({{dz.irg-occasionnelles[enseignement]}}) ou une autre activité occasionnelle à caractère intellectuel ({{dz.irg-occasionnelles[autres]}}).",
  intro: [
    "Un enseignant vacataire, un chercheur associé ou un expert payé pour une mission ponctuelle subit une retenue d'IRG à la source sur sa rémunération. Cette retenue est libératoire : elle solde l'impôt sur ce revenu.",
    "Indiquez la rémunération brute et la nature de l'activité.",
  ],
  comoSeCalcula: [
    "Recherche, enseignement, surveillance ou assistanat à titre vacataire : {{dz.irg-occasionnelles[enseignement]}} de la rémunération.",
    "Toute autre activité occasionnelle à caractère intellectuel : {{dz.irg-occasionnelles[autres]}}.",
    "Montant versé = rémunération − retenue.",
  ],
  faq: [
    {
      pregunta: "La retenue de {{dz.irg-occasionnelles[enseignement]}} est-elle définitive ?",
      respuesta: "Oui. L'article 104 du code des impôts directs la qualifie de libératoire : ces revenus n'ont pas à être ajoutés au revenu global.",
    },
    {
      pregunta: "Qui effectue la retenue ?",
      respuesta: "L'organisme qui verse la rémunération, par exemple l'université ou l'établissement qui fait appel au vacataire.",
    },
    {
      pregunta: "Et pour une activité régulière ?",
      respuesta: "Une activité exercée de façon habituelle relève d'un autre régime : salaire soumis au barème de l'IRG, ou activité non commerciale déclarée.",
    },
  ],
  glosario: [
    { termino: "Vacataire", definicion: "Personne rémunérée à la vacation, à l'heure ou à la mission, sans être salariée permanente." },
    { termino: "Retenue libératoire", definicion: "Retenue à la source qui solde l'impôt dû sur le revenu concerné." },
  ],
});
