import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.taxe-fonciere",
  h1: "Calcul de la taxe foncière au Togo",
  title: "Taxe foncière Togo : propriétés bâties et terrains",
  description:
    "Estimez la taxe foncière au Togo : {{tg.taxe-fonciere[bati]}} du revenu net cadastral d'un bâtiment ou {{tg.taxe-fonciere[non-bati]}} de la valeur d'un terrain non bâti.",
  intro: [
    "Les propriétaires d'immeubles bâtis et de terrains paient chaque année une taxe foncière, calculée sur des valeurs fixées par le cadastre au 1er janvier.",
    "Choisissez le type de propriété et saisissez la valeur cadastrale pour estimer la taxe de l'année.",
  ],
  comoSeCalcula: [
    "Pour une propriété bâtie, la valeur locative cadastrale est réduite de {{tg.taxe-fonciere[abattement-bati]}} pour les frais de gestion, d'entretien et d'amortissement : c'est le revenu net cadastral.",
    "La taxe est égale à {{tg.taxe-fonciere[bati]}} de ce revenu net.",
    "Pour un terrain non bâti, la taxe est égale à {{tg.taxe-fonciere[non-bati]}} de la valeur vénale.",
  ],
  ejemplo: ["Une maison d'une valeur locative de 1 200 000 F par an a un revenu net de 600 000 F et paie 45 000 F de taxe foncière."],
  faq: [
    {
      pregunta: "Qui fixe la valeur locative ?",
      respuesta:
        "Les services du cadastre, à partir des baux, par comparaison avec des loyers connus ou, à défaut, en appliquant un taux d'intérêt à la valeur vénale.",
    },
    {
      pregunta: "Tous les terrains sont-ils taxés ?",
      respuesta:
        "Non. Sont notamment exonérés les terrains publics non productifs de revenus, les terrains scolaires, les terrains cultivés en maraîchage ou en vergers et les immeubles ruraux.",
    },
    {
      pregunta: "Le terrain d'une maison est-il taxé à part ?",
      respuesta: "Non. Le sol des bâtiments et leurs dépendances immédiates entrent dans la valeur locative de la propriété bâtie.",
    },
  ],
  glosario: [
    { termino: "Valeur locative cadastrale", definicion: "Le loyer annuel qu'on peut tirer du bien, évalué par le cadastre." },
    { termino: "Valeur vénale", definicion: "Le prix auquel le bien pourrait se vendre." },
  ],
});
