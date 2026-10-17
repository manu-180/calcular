import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.brutto-netto-rechner",
  h1: "Calcul du salaire net en Suisse",
  title: "Salaire brut-net Suisse 2026 : calculer les déductions",
  description: "Du salaire brut au salaire net : AVS/AI/APG, AC, caisse de pension et ANP avec les taux 2026. Par mois et par an, pour 12 ou 13 salaires mensuels.",
  intro: [
    "En Suisse, le salaire brut supporte les cotisations AVS, AI et APG, l'assurance-chômage, la caisse de pension et la prime d'assurance contre les accidents non professionnels. L'employeur et le salarié paient chacun la moitié de l'AVS/AI/APG ({{ch.ahv-iv-eo-beitragssatz}}) et de l'AC ({{ch.alv-beitragssatz}}).",
    "Le calculateur indique votre salaire net avant impôts. Un éventuel impôt à la source n'est pas déduit.",
  ],
  comoSeCalcula: [
    "AVS/AI/APG : la moitié de {{ch.ahv-iv-eo-beitragssatz}} sur tout le salaire brut.",
    "AC : la moitié de {{ch.alv-beitragssatz}}, mais seulement jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an.",
    "Caisse de pension : si le salaire annuel dépasse {{ch.bvg-eintrittsschwelle}}, le salaire coordonné est assuré, soit le salaire annuel jusqu'à {{ch.bvg-obere-grenze}} moins {{ch.bvg-koordinationsabzug}}. La bonification de vieillesse légale va de 7 à 18 % selon l'âge. Sans votre indication, le calculateur en retient la moitié comme votre part.",
    "ANP et perte de gain maladie : le taux que vous indiquez.",
  ],
  ejemplo: [
    "Pour 6500 francs bruts, 13 salaires mensuels et 35 ans, il faut déduire chaque mois environ 345 francs d'AVS/AI/APG, 72 francs d'AC, 242 francs de caisse de pension et 65 francs d'ANP. Il reste environ 5777 francs nets.",
  ],
  faq: [
    { pregunta: "Quelles déductions sont fixes et lesquelles ne le sont pas ?", respuesta: "L'AVS/AI/APG avec la moitié de {{ch.ahv-iv-eo-beitragssatz}} et l'AC avec la moitié de {{ch.alv-beitragssatz}} sont fixes. La cotisation à la caisse de pension dépend de l'âge et du règlement, la prime ANP de l'assureur-accidents." },
    { pregunta: "Pourquoi est-ce que je paie moins de caisse de pension avant 25 ans ?", respuesta: "Les bonifications de vieillesse légales commencent à 25 ans. Avant, la caisse de pension ne vous assure que contre les risques de décès et d'invalidité." },
    { pregunta: "Le 13e salaire est-il soumis aux déductions ?", respuesta: "Oui. Les gratifications et rémunérations semblables font partie du salaire soumis à l'AVS. Pour la LPP, le 13e salaire compte dans le salaire annuel." },
    { pregunta: "Pourquoi l'AC est-elle plus basse que prévu pour les hauts salaires ?", respuesta: "L'AC n'est perçue que jusqu'au gain maximal assuré de {{ch.hoechster-versicherter-verdienst}} par an. Au-delà, il n'y a pas de cotisation AC." },
  ],
  glosario: [
    { termino: "Salaire coordonné", definicion: "Part du salaire annuel assurée obligatoirement dans la caisse de pension." },
    { termino: "ANP", definicion: "Assurance contre les accidents non professionnels. Les personnes qui travaillent au moins huit heures par semaine chez le même employeur y sont assurées. La prime est à la charge du salarié, sauf accord plus favorable." },
    { termino: "Certificat de salaire", definicion: "Attestation annuelle de l'employeur avec le salaire brut, les déductions et le salaire net, pour la déclaration d'impôt." },
  ],
});
