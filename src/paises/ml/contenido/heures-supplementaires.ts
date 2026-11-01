import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.heures-supplementaires",
  h1: "Calcul des heures supplémentaires au Mali",
  title: "Heures supplémentaires au Mali : majorations légales",
  description: "Calculez le paiement de vos heures supplémentaires au Mali avec les majorations du Code du travail : de {{ml.heures-sup-majorations[jour-41-48]}} à {{ml.heures-sup-majorations[repos-nuit]}} selon l'heure et le jour.",
  intro: [
    "Au Mali, la durée légale du travail est de {{ml.duree-legale-hebdo}} par semaine hors agriculture. Toute heure au-delà est une heure supplémentaire, payée avec une majoration.",
    "Indiquez votre salaire mensuel et vos heures supplémentaires du mois par catégorie. Vous obtenez le montant à payer.",
  ],
  comoSeCalcula: [
    "Le taux horaire est le salaire mensuel divisé par les heures mensuelles de la durée légale ({{ml.duree-legale-hebdo}} × 52 semaines / 12 mois).",
    "En jour ouvrable, l'heure est majorée de {{ml.heures-sup-majorations[jour-41-48]}} de la 41e à la 48e heure, de {{ml.heures-sup-majorations[jour-au-dela-48]}} au-delà de la 48e et de {{ml.heures-sup-majorations[nuit]}} la nuit.",
    "Un jour non ouvrable, la majoration est de {{ml.heures-sup-majorations[repos-jour]}} le jour et de {{ml.heures-sup-majorations[repos-nuit]}} la nuit.",
  ],
  ejemplo: ["Avec 150 000 F par mois, le taux horaire est de 865 F. Huit heures de la 41e à la 48e heure rapportent 8 × 865,38 × 1,10, soit 7 615 F."],
  faq: [
    {
      pregunta: "Quelles heures sont des heures de nuit ?",
      respuesta: "Le travail de nuit est celui effectué entre 21 heures et 5 heures.",
    },
    {
      pregunta: "Mon employeur peut-il me payer un forfait ?",
      respuesta: "Oui, mais un forfait ne vaut que s'il vous assure au moins la rémunération légalement due pour les heures effectuées.",
    },
    {
      pregunta: "Et dans l'agriculture ?",
      respuesta:
        "La durée légale y est fixée en heures par an. Au-delà de 48 heures par semaine, l'heure de jour est majorée de 10 % et l'heure de nuit de 50 %, et les heures faites un jour de repos ou un jour férié de 50 % le jour et 100 % la nuit.",
    },
  ],
  glosario: [
    { termino: "Durée légale", definicion: "Le nombre d'heures de travail par semaine au-delà duquel les heures sont supplémentaires." },
    { termino: "Majoration", definicion: "Le supplément ajouté au taux horaire normal." },
  ],
});
