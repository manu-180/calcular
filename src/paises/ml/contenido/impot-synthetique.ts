import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.impot-synthetique",
  h1: "Calcul de l'impôt synthétique au Mali",
  title: "Impôt synthétique Mali : calcul pour les petites entreprises",
  description: "Calculez l'impôt synthétique au Mali : {{ml.impot-synthetique-taux}} du chiffre d'affaires hors taxe pour les entreprises sous {{ml.impot-synthetique-seuil}} par an.",
  intro: [
    "L'impôt synthétique est le régime des petites entreprises au Mali. Un seul impôt, calculé sur le chiffre d'affaires, remplace les autres impôts, droits et taxes visés par le Code.",
    "Indiquez votre chiffre d'affaires annuel hors taxe. Vous obtenez l'impôt de l'année ou le régime qui s'applique.",
  ],
  comoSeCalcula: [
    "Le régime concerne les entreprises dont le chiffre d'affaires annuel hors taxe est inférieur à {{ml.impot-synthetique-seuil}}.",
    "L'impôt est égal à {{ml.impot-synthetique-taux}} du chiffre d'affaires déclaré.",
    "L'entreprise est exonérée pour sa première année civile d'activité.",
  ],
  ejemplo: ["Un commerce qui réalise 20 000 000 F de chiffre d'affaires paie 600 000 F d'impôt synthétique pour l'année."],
  faq: [
    {
      pregunta: "Que se passe-t-il si je dépasse le plafond en cours d'année ?",
      respuesta: "Vous passez au régime du bénéfice réel. Vous ne pouvez revenir à l'impôt synthétique que si votre chiffre d'affaires reste sous le plafond pendant les deux années suivantes.",
    },
    {
      pregunta: "Qui ne peut pas choisir l'impôt synthétique ?",
      respuesta: "Les conseils fiscaux, les comptables et experts-comptables agréés et les entreprises agréées au Code des investissements relèvent toujours du bénéfice réel.",
    },
    {
      pregunta: "Puis-je choisir le régime réel ?",
      respuesta: "Oui. Une entreprise qui relève de l'impôt synthétique peut opter pour le régime du bénéfice réel.",
    },
  ],
  glosario: [
    { termino: "Chiffre d'affaires hors taxe", definicion: "Le total des ventes et prestations de l'année, sans la TVA." },
    { termino: "Bénéfice réel", definicion: "Le régime où l'impôt se calcule sur le bénéfice tiré de la comptabilité." },
  ],
});
