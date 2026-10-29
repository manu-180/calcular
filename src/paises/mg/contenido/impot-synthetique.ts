import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.impot-synthetique",
  h1: "Calcul de l'impôt synthétique à Madagascar",
  title: "Impôt synthétique Madagascar {{anio}} : calcul et réduction",
  description: "Calculez l'impôt synthétique des petites entreprises malgaches : {{mg.is-taux[normal]}} du chiffre d'affaires, réduction de {{mg.is-reduction}} sur les charges justifiées et abattement CGA.",
  intro: [
    "L'impôt synthétique remplace l'impôt sur les revenus et la TVA pour les entrepreneurs dont le chiffre d'affaires annuel reste sous {{mg.is-seuil}}.",
    "Indiquez le chiffre d'affaires de l'année écoulée et vos charges justifiées par des factures pour estimer l'impôt de l'année.",
  ],
  comoSeCalcula: [
    "La base est le chiffre d'affaires de l'année précédente, arrondi à la dizaine de milliers d'ariary inférieure. Les adhérents d'un centre de gestion agréé (CGA) en retirent {{mg.is-abattement-cga}}, sans dépasser {{mg.is-abattement-cga-plafond}}.",
    "Le taux est de {{mg.is-taux[normal]}}. Il tombe à {{mg.is-taux[cga]}} pour les nouveaux adhérents d'un CGA et les contribuables immatriculés en ligne par leurs clients, pour leurs premiers exercices.",
    "On retire {{mg.is-reduction}} des achats facturés, des salaires et charges déclarés à la CNaPS, de la couverture santé des salariés et des dons à des fondations reconnues. Après cette réduction, l'impôt ne descend pas sous {{mg.is-plancher}} du chiffre d'affaires.",
  ],
  ejemplo: [
    "Un commerçant qui a vendu pour 60 000 000 Ar paie 3 000 000 Ar. S'il présente 40 000 000 Ar d'achats sur factures, la réduction est de 800 000 Ar et l'impôt tombe à 2 200 000 Ar.",
  ],
  faq: [
    {
      pregunta: "Qui paie l'impôt synthétique ?",
      respuesta: "Les commerçants, artisans, agriculteurs, prestataires, professions libérales et transporteurs dont le chiffre d'affaires annuel est inférieur à {{mg.is-seuil}}, sauf s'ils optent pour l'impôt sur les revenus.",
    },
    {
      pregunta: "Pourquoi ma réduction est-elle limitée ?",
      respuesta: "Après la réduction, l'impôt doit rester au moins égal à {{mg.is-plancher}} du chiffre d'affaires. La part de réduction qui ferait passer sous ce seuil est perdue.",
    },
    {
      pregunta: "Existe-t-il un montant minimum ?",
      respuesta: "Oui. Des minima par activité sont fixés par textes réglementaires, sur proposition des directions régionales des impôts. Renseignez-vous auprès de votre centre fiscal.",
    },
  ],
  glosario: [
    { termino: "CGA", definicion: "Centre de gestion agréé : organisme qui aide les petites entreprises à tenir leur comptabilité." },
    { termino: "Impôt synthétique", definicion: "Impôt unique des petites entreprises, calculé sur le chiffre d'affaires." },
  ],
});
