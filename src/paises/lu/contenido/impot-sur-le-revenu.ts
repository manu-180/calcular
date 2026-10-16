import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.impot-sur-le-revenu",
  h1: "Calcul de l'impôt sur le revenu au Luxembourg",
  title: "Impôt sur le revenu Luxembourg : calcul par classe",
  description: "Impôt sur le revenu au Luxembourg selon le barème de l'ACD : classes 1, 1a et 2, contribution au fonds pour l'emploi de 7 % ou 9 % et taux moyen.",
  intro: [
    "Le barème de l'impôt sur le revenu dépend de la classe d'impôt. Il monte par tranches jusqu'à 42 %. Une contribution au fonds pour l'emploi s'ajoute à l'impôt.",
    "Le calculateur part du revenu imposable, c'est-à-dire du revenu après les frais d'obtention, les dépenses spéciales et les abattements.",
  ],
  comoSeCalcula: [
    "Le revenu imposable est arrondi aux 50 euros inférieurs.",
    "Impôt = taux de la tranche x revenu, moins la déduction de la tranche, arrondi à l'euro inférieur. Les formules sont celles de l'Administration des contributions directes.",
    "Fonds pour l'emploi : l'impôt est majoré de 7 %. Au-delà de 150.000 euros (300.000 euros en classe 2), la majoration passe à 9 % avec une déduction.",
  ],
  ejemplo: [
    "Une personne en classe 1 avec 60.000 euros de revenu imposable paie 11.164 euros d'impôt, soit 11.945 euros avec la contribution au fonds pour l'emploi.",
  ],
  faq: [
    { pregunta: "Qu'est-ce que la classe 2 ?", respuesta: "La classe des personnes mariées ou partenaires imposées collectivement. Son barème s'applique au revenu commun du ménage." },
    { pregunta: "Quel est le taux maximal ?", respuesta: "La dernière tranche du barème est imposée à 42 %, avant la contribution au fonds pour l'emploi." },
    { pregunta: "Les crédits d'impôt sont-ils compris ?", respuesta: "Non. Ce calculateur donne l'impôt du barème. Les crédits comme le CIS se déduisent ensuite de l'impôt dû." },
  ],
  glosario: [
    { termino: "Fonds pour l'emploi", definicion: "Contribution ajoutée à l'impôt sur le revenu, de 7 % ou 9 % selon le revenu." },
    { termino: "Revenu imposable", definicion: "Revenu après déduction des frais d'obtention, des dépenses spéciales et des abattements." },
  ],
});
