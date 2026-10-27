import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.calcul-iuts",
  h1: "Calcul de l'IUTS au Burkina Faso",
  title: "Calcul IUTS Burkina Faso : barème et charges de famille",
  description:
    "Calculez l'impôt unique sur les traitements et salaires du mois : base imposable, barème de {{bf.iuts-bareme[0].tasa}} à {{bf.iuts-bareme[-1].tasa}} et réduction pour charges.",
  intro: [
    "L'IUTS est l'impôt sur les salaires. L'employeur le calcule et le retient chaque mois avant de verser le net.",
    "Indiquez votre rémunération du mois et votre situation. Le calcul détaille chaque étape, de la base imposable à l'impôt final.",
  ],
  comoSeCalcula: [
    "Base imposable : rémunération brute, moins la cotisation retraite dans la limite de {{bf.iuts-plafond-pension}} du salaire de base, moins l'abattement forfaitaire, moins la part exonérée des indemnités.",
    "Le barème progressif s'applique par tranche au revenu mensuel imposable, de {{bf.iuts-bareme[1].tasa}} pour la première tranche taxée à {{bf.iuts-bareme[-1].tasa}} pour la dernière.",
    "La réduction pour charges de famille va de {{bf.iuts-charges-famille[1]}} pour une charge à {{bf.iuts-charges-famille[4]}} pour quatre charges et plus.",
  ],
  ejemplo: [
    "200 000 F de salaire de base, deux charges : base imposable de 139 000 F, impôt de 16 366 F selon le barème, réduit de 10 %. L'IUTS est de 14 729 F.",
  ],
  faq: [
    {
      pregunta: "La première tranche est-elle exonérée ?",
      respuesta: "Oui. Jusqu'à {{bf.iuts-bareme[0].hasta}} de revenu net imposable par mois, le taux est de {{bf.iuts-bareme[0].tasa}}.",
    },
    {
      pregunta: "Les primes et gratifications sont-elles imposables ?",
      respuesta: "Oui. Le code général des impôts soumet à l'IUTS les primes et gratifications de toute nature, ainsi que les avantages en nature.",
    },
    {
      pregunta: "Les indemnités de licenciement sont-elles soumises à l'IUTS ?",
      respuesta:
        "Non, sauf les sommes versées au titre du préavis ou des congés payés. Les indemnités de départ à la retraite et les allocations familiales sont aussi exonérées.",
    },
  ],
  glosario: [
    { termino: "Revenu net imposable", definicion: "La rémunération du mois après les déductions et abattements prévus par le code général des impôts." },
    { termino: "Charge de famille", definicion: "Conjoint ou enfant sans revenus propres pris en compte pour réduire l'impôt." },
  ],
});
