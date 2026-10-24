import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.heures-supplementaires",
  h1: "Calcul des heures supplémentaires au Maroc",
  title: "Heures supplémentaires Maroc : majorations de {{ma.heures-supplementaires[jour]}} à {{ma.heures-supplementaires[repos-nuit]}}",
  description:
    "Calculez la rémunération de vos heures supplémentaires selon le code du travail : {{ma.heures-supplementaires[jour]}} de jour, {{ma.heures-supplementaires[nuit]}} de nuit, davantage le jour du repos hebdomadaire.",
  intro: [
    "Au-delà de la durée normale du travail de {{ma.duree-travail[hebdomadaire]}} par semaine dans les activités non agricoles, chaque heure supplémentaire donne droit à une majoration de salaire.",
    "Indiquez votre salaire mensuel et vos heures supplémentaires selon le moment où elles ont été faites. Vous voyez le salaire horaire, les majorations et le total.",
  ],
  comoSeCalcula: [
    "Salaire horaire : salaire mensuel × 12 ÷ {{ma.duree-travail[annuelle]}}.",
    "Entre 6 h et 21 h : majoration de {{ma.heures-supplementaires[jour]}}. Entre 21 h et 6 h : {{ma.heures-supplementaires[nuit]}}.",
    "Le jour du repos hebdomadaire, la majoration passe à {{ma.heures-supplementaires[repos-jour]}} de jour et {{ma.heures-supplementaires[repos-nuit]}} de nuit, même si un repos compensateur est accordé.",
  ],
  ejemplo: [
    "Avec 6 000 DH par mois, le salaire horaire est de 31,47 DH. Quatre heures supplémentaires de jour rapportent 125,88 DH plus 31,47 DH de majoration.",
  ],
  faq: [
    {
      pregunta: "Ces majorations valent-elles pour l'agriculture ?",
      respuesta: "Les mêmes taux s'appliquent, mais les plages horaires sont différentes : de 5 h à 20 h pour le taux de jour et de 20 h à 5 h pour le taux de nuit.",
    },
    {
      pregunta: "Sur quel salaire la majoration est-elle calculée ?",
      respuesta: "Sur le salaire et ses accessoires, à l'exclusion de certains éléments que le code du travail énumère.",
    },
    {
      pregunta: "Quelle est la durée normale du travail ?",
      respuesta: "Dans les activités non agricoles, {{ma.duree-travail[annuelle]}} par an ou {{ma.duree-travail[hebdomadaire]}} par semaine. La durée annuelle peut être répartie selon les besoins de l'entreprise, sans dépasser dix heures par jour.",
    },
  ],
  glosario: [
    { termino: "Heure supplémentaire", definicion: "Une heure travaillée au-delà de la durée normale du travail." },
    { termino: "Repos hebdomadaire", definicion: "Le jour de repos de la semaine du salarié." },
  ],
});
