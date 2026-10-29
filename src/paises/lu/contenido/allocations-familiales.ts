import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.allocations-familiales",
  h1: "Calcul des allocations familiales au Luxembourg (CAE)",
  title: "Allocations familiales Luxembourg {{anio}} : montants",
  description: "Allocations familiales au Luxembourg : {{lu.allocation-familiale}} par enfant et par mois, majorations d'âge et allocation de rentrée scolaire.",
  intro: [
    "Depuis le 1er juin 2026, l'allocation familiale s'élève à {{lu.allocation-familiale}} par enfant et par mois. Une majoration s'ajoute à partir de 6 ans, puis à partir de 12 ans.",
    "Une allocation de rentrée scolaire est versée une fois par an pour les enfants de 6 ans et plus.",
  ],
  comoSeCalcula: [
    "Par mois : {{lu.allocation-familiale}} par enfant, plus {{lu.majoration-age[6-11]}} de 6 à 11 ans ou {{lu.majoration-age[12-plus]}} à partir de 12 ans.",
    "Rentrée scolaire : {{lu.allocation-rentree[6-11]}} de 6 à 11 ans, {{lu.allocation-rentree[12-plus]}} à partir de 12 ans.",
  ],
  ejemplo: [
    "Pour trois enfants de 4, 8 et 14 ans, les allocations s'élèvent à 1.028,37 euros par mois et la rentrée scolaire à 350 euros.",
  ],
  faq: [
    { pregunta: "Le montant dépend-il du nombre d'enfants ?", respuesta: "Non, dans le système en vigueur depuis le 1er août 2016 : le montant est le même pour chaque enfant." },
    { pregunta: "Qui verse les allocations ?", respuesta: "La Caisse pour l'avenir des enfants (CAE), aussi appelée Zukunftskeess." },
    { pregunta: "Existe-t-il une allocation de naissance ?", respuesta: "Oui, en trois tranches. Ce calculateur ne la compte pas." },
  ],
  glosario: [
    { termino: "CAE", definicion: "Caisse pour l'avenir des enfants, ou Zukunftskeess, qui verse les prestations familiales." },
  ],
});
