import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.arbeitslosengeld-rechner",
  h1: "Calcul de l'indemnité de chômage en Suisse",
  title: "Indemnité de chômage Suisse : calculer l'indemnité AC",
  description: "Calculer l'indemnité de chômage : {{ch.alv-taggeld-reduziert}} ou {{ch.alv-taggeld-voll}} du gain assuré, indemnité journalière, montant mensuel et nombre maximal d'indemnités selon la LACI.",
  intro: [
    "Les personnes au chômage qui ont cotisé au moins douze mois au cours des deux dernières années touchent des indemnités journalières de l'assurance-chômage. Une indemnité s'élève à {{ch.alv-taggeld-voll}} ou {{ch.alv-taggeld-reduziert}} du gain assuré.",
    "Le calculateur indique l'indemnité journalière, le montant mensuel et le nombre maximal d'indemnités. Votre caisse de chômage décide de manière contraignante.",
  ],
  comoSeCalcula: [
    "Gain assuré : votre salaire mensuel moyen des six ou douze derniers mois de cotisation, la valeur la plus élevée compte. Au plus {{ch.hoechster-versicherter-verdienst}} par an.",
    "Gain journalier : gain mensuel divisé par {{ch.alv-tage-pro-monat}}.",
    "Ont droit à {{ch.alv-taggeld-voll}} les personnes avec obligation d'entretien envers des enfants de moins de 25 ans, avec une rente AI d'un taux d'invalidité d'au moins 40 % ou avec une indemnité entière ne dépassant pas {{ch.alv-schwelle-volles-taggeld}}. Les autres reçoivent {{ch.alv-taggeld-reduziert}}.",
    "Nombre maximal : 260 indemnités dès 12 mois de cotisation, 400 dès 18, 520 dès 22 mois pour les personnes de 55 ans ou plus ou avec rente AI. Avant 25 ans sans enfant, 200 au plus.",
  ],
  ejemplo: [
    "Pour un gain assuré de 6000 francs sans enfant, l'indemnité journalière s'élève à environ 194 francs, environ 4200 francs bruts par mois. Avec 24 mois de cotisation et 35 ans, il y a au plus 400 indemnités.",
  ],
  faq: [
    { pregunta: "Combien vais-je toucher ?", respuesta: "{{ch.alv-taggeld-reduziert}} du gain assuré, ou {{ch.alv-taggeld-voll}} si vous entretenez des enfants de moins de 25 ans, touchez une rente AI d'au moins 40 % ou si votre indemnité entière ne dépasse pas {{ch.alv-schwelle-volles-taggeld}}." },
    { pregunta: "Pendant combien de temps vais-je toucher des indemnités ?", respuesta: "Cela dépend de la période de cotisation et de l'âge : 260, 400 ou 520 indemnités en deux ans. Avant 25 ans et sans obligation d'entretien, 200 indemnités au plus." },
    { pregunta: "Qu'est-ce qui est déduit de l'indemnité ?", respuesta: "Les cotisations AVS/AI/APG, une cotisation à la prévoyance professionnelle pour les risques de décès et d'invalidité et au plus deux tiers de la prime d'assurance contre les accidents non professionnels." },
    { pregunta: "Comment un mois est-il compté ?", respuesta: "Un mois correspond à {{ch.alv-tage-pro-monat}} indemnités. Cinq indemnités sont versées par semaine." },
  ],
  glosario: [
    { termino: "Gain assuré", definicion: "Le salaire moyen sur lequel l'indemnité est calculée, au plus jusqu'au montant maximal de l'assurance-accidents." },
    { termino: "Délai-cadre", definicion: "Période de deux ans pour la période de cotisation et pour le versement des indemnités." },
  ],
});
