import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "ne.taxe-jeux-de-hasard",
  "h1": "Taxe sur les loteries et jeux de hasard au Niger",
  "title": "Taxe sur les jeux de hasard Niger : calcul {{anio}}",
  "description": "Calculez la taxe sur les loteries et jeux de hasard au Niger : {{ne.jeux-taux[recettes]}} des recettes brutes, {{ne.jeux-taux[cote-fixe]}} de la marge sur les paris à cote fixe.",
  "intro": [
    "Les paris mutuels et les autres jeux mis à la disposition du public paient {{ne.jeux-taux[recettes]}} de leurs recettes brutes. Les paris à cote fixe de la Loterie Nationale du Niger paient {{ne.jeux-taux[cote-fixe]}} de leur marge brute.",
    "Choisissez le type de jeu, saisissez la base et lisez la taxe due."
  ],
  "comoSeCalcula": [
    "Pour les loteries, la base est le total des sommes engagées sur les tickets du Pari Mutuel Urbain et des autres produits de la Loterie Nationale. Les paris à cote fixe font exception : leur base est la marge brute.",
    "Pour les jeux de hasard, la base est le produit brut des jeux ou le chiffre d'affaires réalisé sur l'ensemble des jeux offerts au public.",
    "On multiplie ensuite la base par le taux : {{ne.jeux-taux[recettes]}} ou {{ne.jeux-taux[cote-fixe]}} selon le jeu."
  ],
  "ejemplo": [
    "Un opérateur encaisse 10 000 000 F de recettes brutes sur des paris mutuels : la taxe est de 1 500 000 F. Sur une marge brute de 4 000 000 F en paris à cote fixe, elle est de 1 400 000 F."
  ],
  "faq": [
    {
      "pregunta": "Quels taux la loi fixe-t-elle ?",
      "respuesta": "{{ne.jeux-taux[recettes]}} des recettes brutes pour les paris mutuels et autres jeux, {{ne.jeux-taux[cote-fixe]}} de la marge brute pour les paris à cote fixe de la Loterie Nationale (article 419 du Code général des impôts)."
    },
    {
      "pregunta": "Sur quelle base la taxe est-elle calculée ?",
      "respuesta": "Sur le total des sommes engagées pour les loteries, sur la marge brute pour les paris à cote fixe, sur le produit brut ou le chiffre d'affaires pour les jeux de hasard (article 418)."
    },
    {
      "pregunta": "Depuis quand ces règles s'appliquent-elles ?",
      "respuesta": "Depuis le {{ne.jeux-taux#desde}}, date d'application des articles 418 et 419 dans leur rédaction de la loi de finances 2026."
    }
  ],
  "glosario": [
    {
      "termino": "Pari à cote fixe",
      "definicion": "Pari dont le gain est connu au moment de la mise, quel que soit le nombre de joueurs."
    },
    {
      "termino": "Marge brute",
      "definicion": "Les mises encaissées moins les gains versés aux joueurs."
    },
    {
      "termino": "PMU",
      "definicion": "Pari Mutuel Urbain, jeu de paris sur les courses."
    }
  ]
});
