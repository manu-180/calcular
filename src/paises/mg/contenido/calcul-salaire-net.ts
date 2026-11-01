import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.calcul-salaire-net",
  h1: "Calcul du salaire net à Madagascar",
  title: "Salaire brut en net à Madagascar : CNaPS, OSTIE, IRSA",
  description: "Passez du salaire brut au net à Madagascar : cotisation CNaPS, cotisation à l'organisme sanitaire et IRSA du mois.",
  intro: [
    "Le salaire net est ce qui reste du brut après la cotisation CNaPS, la cotisation à l'organisme sanitaire et l'IRSA.",
    "Indiquez votre brut mensuel et vos personnes à charge.",
  ],
  comoSeCalcula: [
    "La cotisation CNaPS se calcule sur le brut, dans la limite de {{mg.plafond-cnaps-sme}} fois le salaire minimum d'embauche.",
    "L'IRSA se calcule sur le brut moins ces cotisations, avec le barème de la loi de finances.",
  ],
  ejemplo: ["Un salaire brut de 1 000 000 Ar donne un net d'environ 876 500 Ar sans personne à charge."],
  faq: [],
  glosario: [{ termino: "CNaPS", definicion: "Caisse nationale de prévoyance sociale, qui gère la retraite des salariés du privé." }],
});
