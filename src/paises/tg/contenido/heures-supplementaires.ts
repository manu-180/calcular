import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.heures-supplementaires",
  h1: "Calcul des heures supplémentaires au Togo",
  title: "Heures supplémentaires Togo : calcul de la majoration",
  description:
    "Calculez le paiement de vos heures supplémentaires au Togo au-delà de {{tg.duree-legale-travail}} par semaine, de jour et de nuit.",
  intro: [
    "Les heures faites au-delà de la durée légale de travail sont des heures supplémentaires payées avec une majoration.",
    "Indiquez votre salaire mensuel et vos heures de la semaine pour estimer le montant dû.",
  ],
  comoSeCalcula: [
    "Le taux horaire de base est le salaire mensuel fois 12, divisé par 52 semaines et par la durée légale de {{tg.duree-legale-travail}}.",
    "Chaque heure supplémentaire est payée à ce taux, augmenté de la majoration de jour ou de nuit.",
    "Le Code du travail limite les heures supplémentaires à {{tg.heures-sup-max-semaine}} par semaine.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [{ termino: "Travail de nuit", definicion: "Le travail effectué entre 22 heures et 5 heures, selon le Code du travail." }],
});
