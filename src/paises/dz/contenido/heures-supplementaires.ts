import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.heures-supplementaires",
  h1: "Calcul des heures supplémentaires en Algérie",
  title: "Heures supplémentaires Algérie : majoration de {{dz.heures-supplementaires[majoration]}}",
  description:
    "Calculez le paiement de vos heures supplémentaires en Algérie : salaire horaire, majoration d'au moins {{dz.heures-supplementaires[majoration]}} et plafond légal.",
  intro: [
    "Au-delà de la durée légale de {{dz.duree-legale}} par semaine, chaque heure travaillée est une heure supplémentaire. La loi n° 90-11 relative aux relations de travail impose de la payer avec une majoration.",
    "Indiquez votre salaire mensuel et le nombre d'heures supplémentaires du mois. Si votre convention collective prévoit une majoration plus élevée, saisissez-la.",
  ],
  comoSeCalcula: [
    "Salaire horaire : salaire mensuel ÷ {{dz.heures-mensuelles}}, la durée mensuelle qui correspond à {{dz.duree-legale}} par semaine.",
    "Paiement de base : salaire horaire × heures supplémentaires.",
    "Majoration : au moins {{dz.heures-supplementaires[majoration]}} du salaire horaire normal (article 32).",
    "Total = paiement de base + majoration.",
  ],
  ejemplo: ["Avec 60 000 DA par mois, l'heure vaut 346,16 DA. Huit heures supplémentaires majorées de 50 % rapportent 4 153,92 DA brut."],
  faq: [
    {
      pregunta: "Combien d'heures supplémentaires peut-on faire en Algérie ?",
      respuesta:
        "L'article 31 de la loi n° 90-11 les limite à {{dz.heures-supplementaires[plafond]}} de la durée légale. Elles doivent répondre à une nécessité absolue de service et rester exceptionnelles.",
    },
    {
      pregunta: "La majoration peut-elle être supérieure à {{dz.heures-supplementaires[majoration]}} ?",
      respuesta: "Oui. La loi fixe un minimum. Une convention collective ou le contrat de travail peut prévoir un taux plus favorable.",
    },
    {
      pregunta: "Et si je travaille mon jour de repos ?",
      respuesta:
        "L'article 36 de la loi n° 90-11 donne droit à un repos compensateur de même durée, en plus de la majoration des heures supplémentaires.",
    },
  ],
  glosario: [
    { termino: "Heure supplémentaire", definicion: "Heure de travail effectuée au-delà de la durée légale hebdomadaire." },
    { termino: "Majoration", definicion: "Supplément ajouté au salaire horaire normal pour chaque heure supplémentaire." },
  ],
});
