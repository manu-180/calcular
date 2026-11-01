import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.calcul-salaire-net",
  h1: "Calcul du salaire net au Mali",
  title: "Salaire brut en net au Mali : INPS, AMO et ITS",
  description: "Passez de votre salaire brut à votre salaire net au Mali : cotisation retraite INPS, cotisation AMO de {{ml.amo-taux[salarie]}} et ITS retenus chaque mois.",
  intro: [
    "Votre salaire net est le brut moins trois retenues : la cotisation retraite à l'INPS, la cotisation à l'Assurance maladie obligatoire (AMO) et l'impôt sur les traitements et salaires (ITS).",
    "Indiquez votre salaire brut mensuel et votre situation de famille. Les indemnités non imposables s'ajoutent au net sans retenue.",
  ],
  comoSeCalcula: [
    "La cotisation retraite INPS est de {{ml.inps-retraite-salarie}} du brut et la cotisation AMO de {{ml.amo-taux[salarie]}}. Elles se calculent au moins sur le SMIG ({{ml.smig}}).",
    "L'ITS se calcule sur le brut moins la cotisation retraite (dans la limite de {{ml.its-deduction-retraite}}), avec le barème annuel de l'article 10 du CGI, la réduction pour charges de famille et la réduction de {{ml.its-reduction-points}} points.",
    "Le net est le brut moins ces trois retenues, plus les indemnités non imposables.",
  ],
  faq: [
    {
      pregunta: "La cotisation AMO réduit-elle l'ITS ?",
      respuesta: "Non. Elle est retenue sur le salaire mais ne se déduit pas de la base de l'ITS.",
    },
    {
      pregunta: "Le net change-t-il avec les enfants ?",
      respuesta: "Oui, par l'ITS : chaque enfant à charge réduit l'impôt de {{ml.its-reduction-famille[enfant]}}, et le mariage de {{ml.its-reduction-famille[marie]}}.",
    },
    {
      pregunta: "Qu'est-ce qu'une indemnité non imposable ?",
      respuesta: "Un remboursement de frais ou une indemnité exonérée par le CGI, par exemple l'indemnité de transport dans la limite de 10 % du traitement de base.",
    },
  ],
  glosario: [
    { termino: "INPS", definicion: "Institut national de prévoyance sociale, qui gère la retraite des salariés du privé." },
    { termino: "AMO", definicion: "Assurance maladie obligatoire." },
  ],
});
