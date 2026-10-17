import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.mietzinsrechner",
  h1: "Calcul du loyer : taux de référence et renchérissement",
  title: "Calcul du loyer Suisse : taux de référence {{ch.referenzzinssatz}}",
  description: "Calculer l'adaptation du loyer : taux de référence {{ch.referenzzinssatz}}, {{ch.mietzins-hypothekarzins}} par quart de point et {{ch.mietzins-teuerungsanteil}} du renchérissement selon l'OBLF.",
  intro: [
    "En Suisse, le loyer dépend du taux d'intérêt de référence hypothécaire, que l'Office fédéral du logement publie chaque trimestre. Il s'élève actuellement à {{ch.referenzzinssatz}}.",
    "Si le taux a baissé depuis la dernière adaptation de votre loyer, vous pouvez demander une baisse. S'il augmente, le bailleur peut augmenter le loyer. Le calculateur indique de combien.",
  ],
  comoSeCalcula: [
    "Taux de référence : par quart de point de hausse, le loyer augmente au plus de {{ch.mietzins-hypothekarzins}} pour des taux inférieurs à 5 %. En cas de baisse, le calculateur fait l'inverse : loyer divisé par 1,03 par quart de point, soit environ 2,91 % de moins.",
    "Renchérissement : le bailleur peut reporter {{ch.mietzins-teuerungsanteil}} de la hausse de l'indice suisse des prix à la consommation depuis la dernière adaptation.",
    "Les hausses générales des coûts, par exemple pour l'entretien, ne s'ajoutent que si elles sont invoquées. Le calculateur additionne les trois parts.",
  ],
  ejemplo: [
    "Un loyer de 2000 francs, adapté pour la dernière fois à 1,75 % et avec l'indice de décembre 2023, baisse d'environ 97 francs à environ 1903 francs avec un taux de référence de 1,25 %.",
  ],
  faq: [
    { pregunta: "Quand le taux de référence est-il publié ?", respuesta: "L'Office fédéral du logement le publie chaque trimestre, début mars, juin, septembre et décembre." },
    { pregunta: "Puis-je demander une baisse de loyer ?", respuesta: "Oui, par écrit auprès du bailleur et pour le prochain terme de résiliation. Il doit prendre position dans les 30 jours. Sinon, vous pouvez saisir l'autorité de conciliation dans les 30 jours. Le bailleur peut compenser l'économie avec des hausses de coûts intervenues entre-temps." },
    { pregunta: "Quelle part du renchérissement peut être reportée sur le loyer ?", respuesta: "Au plus {{ch.mietzins-teuerungsanteil}} de la hausse de l'indice suisse des prix à la consommation." },
  ],
  glosario: [
    { termino: "Taux de référence", definicion: "Taux d'intérêt moyen des hypothèques en Suisse, arrondi au quart de point. Il sert de base aux adaptations de loyer." },
    { termino: "Loyer net", definicion: "Loyer sans les frais accessoires." },
  ],
});
