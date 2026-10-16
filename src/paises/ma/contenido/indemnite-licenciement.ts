import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.indemnite-licenciement",
  h1: "Calcul de l'indemnité de licenciement au Maroc",
  title: "Indemnité de licenciement Maroc : calcul selon le code du travail",
  description:
    "Calculez votre indemnité de licenciement selon l'article 53 du code du travail : de {{ma.indemnite-licenciement[ans-1-a-5]}} à {{ma.indemnite-licenciement[au-dela-de-15]}} de salaire par année d'ancienneté.",
  intro: [
    "Un salarié en contrat à durée indéterminée licencié après six mois de travail dans la même entreprise a droit à une indemnité de licenciement, sauf faute grave.",
    "Elle se compte en heures de salaire par année d'ancienneté, et le nombre d'heures augmente avec l'ancienneté. Indiquez votre salaire moyen et vos dates d'embauche et de rupture.",
  ],
  comoSeCalcula: [
    "Pour chaque année ou fraction d'année : {{ma.indemnite-licenciement[ans-1-a-5]}} de salaire pour les cinq premières années, {{ma.indemnite-licenciement[ans-6-a-10]}} de la 6e à la 10e, {{ma.indemnite-licenciement[ans-11-a-15]}} de la 11e à la 15e et {{ma.indemnite-licenciement[au-dela-de-15]}} au-delà.",
    "Le salaire de référence est la moyenne des salaires des 52 semaines qui précèdent la rupture. Nous le convertissons en salaire horaire avec la durée annuelle normale de {{ma.duree-travail[annuelle]}}.",
    "Indemnité = heures dues × salaire horaire.",
  ],
  ejemplo: [
    "Avec 8 000 DH par mois et 8 ans et 9 mois d'ancienneté : 5 × 96 + 3,75 × 144 = 1 020 heures. Au salaire horaire de 41,96 DH, l'indemnité est de 42 799,20 DH.",
  ],
  faq: [
    {
      pregunta: "Quels éléments du salaire comptent ?",
      respuesta: "Le salaire proprement dit et ses accessoires énumérés par le code du travail. Le salaire retenu ne peut pas être inférieur au salaire minimum légal.",
    },
    {
      pregunta: "Quelles périodes comptent comme travail effectif ?",
      respuesta:
        "Notamment les congés annuels payés, le congé de maternité, l'incapacité due à un accident du travail ou à une maladie professionnelle, et les suspensions du contrat pour absence autorisée ou maladie.",
    },
    {
      pregunta: "Existe-t-il d'autres indemnités ?",
      respuesta:
        "Le code du travail rappelle que le salarié peut aussi bénéficier, selon la législation en vigueur, de l'indemnité pour perte d'emploi pour des raisons économiques, technologiques ou structurelles.",
    },
  ],
  glosario: [
    { termino: "Faute grave", definicion: "Une faute qui permet de licencier sans préavis ni indemnité." },
    { termino: "Ancienneté", definicion: "La durée de travail effectif dans la même entreprise." },
  ],
});
