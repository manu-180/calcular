import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.rupture-conventionnelle",
  h1: "Calcul de l'indemnité de rupture conventionnelle",
  title: "Rupture conventionnelle {{anio}} : indemnité minimale et impôt",
  description:
    "Calculez l'indemnité minimale de rupture conventionnelle et la part exonérée d'impôt et de cotisations de l'indemnité négociée avec votre employeur.",
  intro: [
    "La rupture conventionnelle permet à l'employeur et au salarié en CDI de mettre fin au contrat d'un commun accord. Le salarié perçoit une indemnité spécifique.",
    "Cette indemnité ne peut pas être inférieure à l'indemnité légale de licenciement, quelle que soit l'ancienneté. Au-delà, le montant se négocie.",
  ],
  comoSeCalcula: [
    "Minimum : 1/{{fr.lic-diviseur-1}} de mois de salaire par année d'ancienneté jusqu'à {{fr.lic-seuil-annees}}, puis 1/{{fr.lic-diviseur-2}} au-delà, avec les années incomplètes au prorata.",
    "Part exonérée d'impôt : au moins le minimum légal ou conventionnel. Si l'indemnité est plus élevée, la plus haute des deux limites suivantes : deux fois la rémunération brute de l'année précédente, ou la moitié de l'indemnité, sans dépasser {{fr.exo-indemnite-ir-max}}.",
    "Part exonérée de cotisations sociales : la part exonérée d'impôt, dans la limite de {{fr.exo-indemnite-social-max}}.",
  ],
  ejemplo: [
    "Avec 1 500 € de salaire de référence et 3 ans et 6 mois d'ancienneté, l'indemnité minimale est de 1 312,50 €.",
    "Une indemnité négociée de 120 000 €, dont 70 000 € de minimum, pour une rémunération de 40 000 € l'année précédente : 80 000 € sont exonérés d'impôt et 40 000 € sont imposables.",
  ],
  faq: [
    {
      pregunta: "Faut-il une ancienneté minimale ?",
      respuesta:
        "Non. Contrairement au licenciement, l'indemnité de rupture conventionnelle est due quelle que soit l'ancienneté. Elle est calculée au prorata des mois travaillés.",
    },
    {
      pregunta: "A-t-on droit au chômage après une rupture conventionnelle ?",
      respuesta: "Oui, si vous remplissez les conditions d'activité antérieure, vous pouvez percevoir l'allocation d'aide au retour à l'emploi (ARE).",
    },
    {
      pregunta: "Et si ma convention collective prévoit plus ?",
      respuesta:
        "L'indemnité ne peut pas être inférieure à l'indemnité conventionnelle de licenciement si elle est plus favorable. Saisissez alors ce montant comme indemnité négociée.",
    },
    {
      pregunta: "Quand l'indemnité est-elle entièrement imposable ?",
      respuesta: "Quand le salarié peut déjà bénéficier d'une pension de retraite d'un régime obligatoire au moment de la rupture.",
    },
  ],
  glosario: [
    { termino: "Indemnité spécifique", definicion: "Somme versée au salarié lors d'une rupture conventionnelle homologuée." },
    { termino: "Homologation", definicion: "Validation de la convention de rupture par l'administration du travail." },
    { termino: "PASS", definicion: "Plafond annuel de la Sécurité sociale, base des limites d'exonération." },
  ],
});
