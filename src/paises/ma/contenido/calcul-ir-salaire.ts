import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.calcul-ir-salaire",
  h1: "Calcul de l'IR sur salaire au Maroc",
  title: "Calcul IR salaire Maroc {{anio}} : barème et charges de famille",
  description:
    "Calculez l'IR retenu sur votre salaire avec le barème {{anio}}, les frais professionnels forfaitaires et la réduction de {{ma.charges-de-famille[par-personne]}} par personne à charge.",
  intro: [
    "Au Maroc, l'employeur retient chaque mois l'impôt sur le revenu (IR) sur le salaire. Depuis 2025, la tranche jusqu'à {{ma.ir-bareme[0].hasta}} par an est exonérée et le taux marginal le plus élevé est de {{ma.ir-bareme[-1].tasa}}.",
    "Indiquez votre salaire brut imposable, les cotisations sociales retenues sur votre bulletin de paie et le nombre de personnes à charge. Vous voyez l'impôt par mois et par an.",
  ],
  comoSeCalcula: [
    "Le salaire brut mensuel est multiplié par 12.",
    "Frais professionnels : {{ma.frais-professionnels-taux[jusqu-au-seuil]}} du brut si celui-ci ne dépasse pas {{ma.frais-professionnels-limites[seuil]}} par an, sinon {{ma.frais-professionnels-taux[au-dela]}} avec un plafond de {{ma.frais-professionnels-limites[plafond]}}.",
    "Les cotisations sociales salariales (CNSS, AMO, retraite) se déduisent aussi.",
    "Le barème s'applique par tranche : 0 % jusqu'à {{ma.ir-bareme[0].hasta}}, puis {{ma.ir-bareme[1].tasa}}, {{ma.ir-bareme[2].tasa}}, {{ma.ir-bareme[3].tasa}} et {{ma.ir-bareme[4].tasa}}, et {{ma.ir-bareme[-1].tasa}} au-delà de {{ma.ir-bareme[-1].desde}}.",
    "On retire {{ma.charges-de-famille[par-personne]}} par personne à charge, avec un maximum de {{ma.charges-de-famille[plafond]}} par an. L'impôt annuel est divisé par 12.",
  ],
  ejemplo: [
    "Avec 10 000 DH bruts par mois et sans charge de famille : 120 000 DH par an, moins 30 000 DH de frais professionnels, soit 90 000 DH imposables. L'impôt est de 9 000 DH par an, soit 750 DH par mois.",
  ],
  faq: [
    {
      pregunta: "Qui est une personne à charge ?",
      respuesta:
        "L'épouse et les enfants du contribuable, ainsi que les enfants légalement recueillis, à condition qu'ils n'aient pas de revenu annuel supérieur à la tranche exonérée du barème et qu'ils n'aient pas plus de 27 ans. La limite d'âge ne s'applique pas aux enfants atteints d'une infirmité.",
    },
    {
      pregunta: "Qu'est-ce qui a changé en 2026 ?",
      respuesta:
        "La loi de finances 2026 a porté la réduction pour charges de famille de 500 à {{ma.charges-de-famille[par-personne]}} par personne, avec un plafond de {{ma.charges-de-famille[plafond]}} par an, pour les revenus acquis à partir du 1er janvier 2026.",
    },
    {
      pregunta: "Les cotisations sociales sont-elles déductibles ?",
      respuesta:
        "Oui. Les retenues pour la retraite, dont celles du régime de sécurité sociale, et les cotisations salariales de sécurité sociale et de prévoyance sociale se déduisent du salaire brut pour calculer le revenu net imposable.",
    },
  ],
  glosario: [
    { termino: "IR", definicion: "Impôt sur le revenu, retenu à la source par l'employeur sur les salaires." },
    { termino: "Frais professionnels", definicion: "Une déduction forfaitaire calculée en pourcentage du salaire brut imposable." },
    { termino: "Revenu net imposable", definicion: "Le salaire brut moins les frais professionnels et les cotisations sociales." },
  ],
});
