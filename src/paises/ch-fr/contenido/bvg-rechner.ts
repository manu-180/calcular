import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.bvg-rechner",
  h1: "Calcul LPP : avoir de vieillesse et rente de la caisse de pension",
  title: "Calcul LPP : avoir de vieillesse et rente à 65 ans",
  description: "Combien aurez-vous dans votre caisse de pension à 65 ans ? Bonifications LPP, intérêt {{ch.bvg-mindestzins}} et taux de conversion {{ch.bvg-umwandlungssatz}} : capital et rente.",
  intro: [
    "Dans la caisse de pension, vous épargnez chaque année une bonification de vieillesse sur le salaire coordonné. Avec les intérêts, elle forme l'avoir de vieillesse, converti en rente au moment de la retraite.",
    "Le calculateur montre le minimum légal selon la LPP. Si votre certificat de prévoyance indique un avoir plus élevé, votre caisse assure davantage que la loi.",
  ],
  comoSeCalcula: [
    "Salaire coordonné : salaire annuel jusqu'à {{ch.bvg-obere-grenze}} moins {{ch.bvg-koordinationsabzug}}, au moins {{ch.bvg-min-koordinierter-lohn}}. N'est assuré que celui qui gagne plus de {{ch.bvg-eintrittsschwelle}}.",
    "Bonification de vieillesse : 7 % de 25 à 34 ans, 10 % de 35 à 44 ans, 15 % de 45 à 54 ans et 18 % de 55 à 65 ans.",
    "Chaque année, l'intérêt sur l'avoir précédent s'ajoute, puis la nouvelle bonification. Sans votre indication, le taux minimal de {{ch.bvg-mindestzins}} s'applique.",
    "Rente : avoir de vieillesse multiplié par le taux de conversion de {{ch.bvg-umwandlungssatz}} à l'âge de référence de 65 ans.",
  ],
  ejemplo: [
    "Une personne assurée de 45 à 65 ans avec un salaire annuel de 80 000 francs atteint selon la loi un avoir de vieillesse d'environ 198 200 francs. Cela donne une rente d'environ 1123 francs par mois.",
  ],
  faq: [
    { pregunta: "Qu'est-ce que le taux de conversion ?", respuesta: "Le pourcentage qui convertit l'avoir de vieillesse en rente annuelle. Pour la part obligatoire, il s'élève au moins à {{ch.bvg-umwandlungssatz}} à l'âge de référence de 65 ans." },
    { pregunta: "Qui paie les bonifications de vieillesse ?", respuesta: "L'employeur et les salariés ensemble. L'employeur doit payer au moins autant que l'ensemble des salariés." },
    { pregunta: "Pourquoi mon certificat de prévoyance diffère-t-il ?", respuesta: "Votre caisse peut assurer davantage que la loi ne l'exige ou appliquer ses propres taux. Ce calculateur ne montre que le minimum prescrit par la LPP." },
  ],
  glosario: [
    { termino: "Avoir de vieillesse", definicion: "Le capital épargné dans la caisse de pension à partir des bonifications de vieillesse et des intérêts." },
    { termino: "Certificat de prévoyance", definicion: "Aperçu annuel de la caisse de pension avec l'avoir, le salaire assuré et la rente prévue." },
  ],
});
